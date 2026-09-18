/**
 * Fixes the 2 `project` documents so they match the CURRENT project schema
 * (studio/schemas/project.ts): order, icon, title (localizedString),
 * period (localizedString), desc (localizedText), highlights (array of
 * localizedText).
 *
 * Checked the live data first (via a direct GROQ query): the 2 existing
 * project-* documents were created against an OLDER, different shape —
 * plain-string title, description, slug, startDate/endDate, status, tags,
 * a portable-text body — none of which the current schema reads. This is
 * the exact same "schema redefined without a data migration" issue found
 * and fixed for `department` documents earlier (see
 * migrate-department-cards.mjs): Sanity never deletes the old field
 * values, Studio just can't show them under the new field names, and the
 * homepage's useProjects() hook — which reads title/icon/desc/highlights —
 * finds nothing usable and silently falls back to the hardcoded PROJECTS
 * array in src/app/data/departments.ts. Both documents currently show as
 * "Untitled project" in Studio.
 *
 * This script sets the new fields from the same trilingual copy the
 * homepage's hardcoded fallback already uses (src/locales/{en,fr,rw}/
 * home.json -> projects.items), so what Studio shows will match what the
 * site currently renders. It only ADDS title/period/desc/highlights/icon/
 * order — the legacy description/slug/startDate/endDate/status/tags/body
 * fields are left untouched, so nothing is lost.
 *
 * SAFE BY DEFAULT: dry-run unless you pass --apply. Skips any document
 * that already has title.en set, so it won't clobber edits made in Studio
 * after this runs once.
 *
 * Usage:
 *   node scripts/migrate-project-cards.mjs                (dry run)
 *   node scripts/migrate-project-cards.mjs --apply          (writes)
 *   node scripts/migrate-project-cards.mjs --apply --token=XXX
 *
 * Run from the repo root (so the relative locale paths resolve).
 */
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT_ID = "2bpoen39";
const DATASET = "production";
const APPLY = process.argv.includes("--apply");

const root = process.cwd();
const studioRequire = createRequire(path.join(root, "studio", "package.json"));
const { createClient } = studioRequire("@sanity/client");

// ---- client resolution (CLI login session, same as the other recent migration scripts) ----
let client;
let authMode;
const cliConfigPath = path.join(os.homedir(), ".config", "sanity", "config.json");
let cliToken = "";
if (existsSync(cliConfigPath)) {
  try {
    cliToken = JSON.parse(readFileSync(cliConfigPath, "utf8")).authToken || "";
  } catch {}
}

let token = process.env.SANITY_MIGRATION_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN || "";
const tokenArg = process.argv.find((a) => a.startsWith("--token="));
if (tokenArg) token = tokenArg.slice("--token=".length);
if (!token && existsSync(path.join(root, ".env.migration"))) {
  const m = readFileSync(path.join(root, ".env.migration"), "utf8").match(/SANITY_MIGRATION_TOKEN=(.+)/);
  if (m) token = m[1].trim();
}

if (APPLY) {
  if (token) {
    client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token, useCdn: false });
    authMode = "explicit API token";
  } else if (cliToken) {
    client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token: cliToken, useCdn: false });
    authMode = "CLI login session (~/.config/sanity/config.json)";
  } else {
    console.error("No credentials found. Log in first (`cd studio && npx sanity login`) or provide an API token:");
    console.error("  --token=XXX | SANITY_MIGRATION_TOKEN env | .env.migration file");
    process.exit(2);
  }
} else {
  client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", useCdn: true });
  authMode = "none (dry run — pass --apply to write)";
}

// Maps each existing document id to its position in projects.items (below)
// and the card icon it should show — matches PROJECT_ICON_MAP in
// src/app/data/cmsContent.ts.
const PROJECT_META = {
  "project-capacity-building": { index: 0, icon: "briefcase" },
  "project-psychotraumatology": { index: 1, icon: "heart" },
};

// ---- load trilingual copy (same shape the homepage fallback reads) ----
const load = (lang) => JSON.parse(readFileSync(path.join(root, "src", "locales", lang, "home.json"), "utf8")).projects.items;
const en = load("en");
const fr = load("fr");
const rw = load("rw");

const s = (e, f, r) => ({ en: e ?? "", fr: f ?? "", rw: r ?? "" });

function buildPatch(index) {
  const E = en[index];
  const F = fr[index] || {};
  const R = rw[index] || {};
  return {
    title: s(E.title, F.title, R.title),
    period: s(E.period, F.period, R.period),
    desc: s(E.desc, F.desc, R.desc),
    highlights: (E.highlights || []).map((_, i) => ({
      _key: `highlight-${index}-${i}`,
      _type: "localizedText",
      en: (E.highlights || [])[i] ?? "",
      fr: (F.highlights || [])[i] ?? "",
      rw: (R.highlights || [])[i] ?? "",
    })),
  };
}

async function migrate() {
  console.log(`Auth: ${authMode}`);
  console.log(`Project: ${PROJECT_ID} / ${DATASET}${APPLY ? "" : "  (DRY RUN — pass --apply to write)"}\n`);

  const docs = await client.fetch(
    `*[_type == "project"]{_id, title, "hasTitleEn": defined(title.en)} | order(_id asc)`,
  );

  if (!docs.length) {
    console.log("No project documents found — nothing to do.");
    return;
  }

  for (const doc of docs) {
    const meta = PROJECT_META[doc._id];
    if (!meta) {
      console.warn(`⚠ ${doc._id}: no index/icon mapping known for this id — skipping. Add it to PROJECT_META.`);
      continue;
    }
    if (doc.hasTitleEn) {
      console.log(`⏭  ${doc._id}: title.en already set — skipping (already migrated or edited in Studio).`);
      continue;
    }

    const patch = { ...buildPatch(meta.index), icon: meta.icon, order: meta.index + 1 };

    console.log(`${doc._id}:`);
    console.log(`  title.en  = ${JSON.stringify(patch.title.en)}`);
    console.log(`  period.en = ${JSON.stringify(patch.period.en)}`);
    console.log(`  desc.en   = ${JSON.stringify(patch.desc.en)}`);
    console.log(`  highlights = ${patch.highlights.length} item(s)`);
    console.log(`  icon      = ${patch.icon}`);
    console.log(`  order     = ${patch.order}`);

    if (!APPLY) continue;

    await client.patch(doc._id).set(patch).commit();
    console.log(`  ✔ Patched\n`);
  }

  if (!APPLY) {
    console.log("\nDry run complete. Re-run with --apply to write these changes to Sanity.");
  } else {
    console.log("\n🎉 Done! Check the Projects list in Studio — cards should show real titles now.");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
