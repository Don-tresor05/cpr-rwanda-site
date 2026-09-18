/**
 * Migrate the six Secretariat section detail pages
 * (/secretariat/:sectionId/resources) into `secretariatDetail` Sanity
 * documents — one per section (sg, events, meetings, advocacy,
 * sustainability, publications) — seeding the hero title, overview
 * paragraph and key-focus-areas checklist from the same trilingual copy
 * the Secretariat page itself already uses
 * (src/locales/{en,fr,rw}/home.json → secretariatPage.<key>).
 *
 * The resource cards (secretariatResourceGroup/File) and the
 * Activities & Milestones timeline (secretariatActivity) on that same
 * page are separate collections and are NOT touched here — add those in
 * Studio, the same way department resource groups/activities are added.
 * Photos are also NOT migrated — no file to upload from a script; add
 * each section's photo in Studio under Secretariat Detail Pages → Photo.
 *
 * This mirrors scripts/migrate-department-detail-pages.mjs, but uses the
 * CLI-login-session auth fallback from scripts/seed-secretariat-page.mjs
 * so it works without a studio/.env write token as long as you're logged
 * in (`cd studio && npx sanity login`).
 *
 * Usage:
 *   node scripts/migrate-secretariat-detail-pages.mjs                (dry run — prints what would change)
 *   node scripts/migrate-secretariat-detail-pages.mjs --apply         (writes to Sanity)
 *   node scripts/migrate-secretariat-detail-pages.mjs --apply --token=XXX   (explicit token)
 *
 * Run from the repo root (so the relative locale paths resolve).
 * SAFE TO RE-RUN: existing secretariatDetail documents are never
 * overwritten — only sections with no document yet are created, so any
 * content an editor has since added in Studio is preserved.
 */
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT_ID = "2bpoen39";
const DATASET = "production";
const SECTION_KEYS = ["sg", "events", "meetings", "advocacy", "sustainability", "publications"];
const APPLY = process.argv.includes("--apply");

const root = process.cwd();
const studioRequire = createRequire(path.join(root, "studio", "package.json"));
const { createClient } = studioRequire("@sanity/client");

// ---- client resolution ----
// Primary: reuse the Sanity CLI's stored login session (~/.config/sanity/config.json)
//   — same credential `sanity exec --with-user-token` would use. Token stays in memory.
// Fallback: explicit API token via --token=XXX, SANITY_MIGRATION_TOKEN, SANITY_WRITE_TOKEN, or .env.migration.
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
  // Dry run needs no auth at all — it only reads local locale files.
  client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", useCdn: true });
  authMode = "none (dry run — pass --apply to write)";
}

// ---- load trilingual copy ----
const load = (lang) => JSON.parse(readFileSync(path.join(root, "src", "locales", lang, "home.json"), "utf8")).secretariatPage;
const en = load("en");
const fr = load("fr");
const rw = load("rw");

const s = (e, f, r) => ({ en: e ?? "", fr: f ?? "", rw: r ?? "" });

function buildDoc(key) {
  const E = en[key] || {};
  const F = fr[key] || {};
  const R = rw[key] || {};

  return {
    _id: `secretariatDetail-${key}`,
    _type: "secretariatDetail",
    section: key,
    title: s(E.title, F.title, R.title),
    overview: s(E.desc, F.desc, R.desc),
    keyActivities: (E.body || []).map((_, i) => ({
      _key: `focus-${i}`,
      _type: "localizedString",
      en: (E.body || [])[i] ?? "",
      fr: (F.body || [])[i] ?? "",
      rw: (R.body || [])[i] ?? "",
    })),
  };
}

async function migrate() {
  console.log(`Auth: ${authMode}`);
  console.log(`Project: ${PROJECT_ID} / ${DATASET}${APPLY ? "" : "  (DRY RUN — pass --apply to write)"}\n`);

  const existing = APPLY
    ? await client.fetch(`*[_type == "secretariatDetail"]{ _id, section }`)
    : [];
  const existingKeys = new Set(existing.map((d) => d.section));
  if (APPLY) {
    console.log(`Existing secretariatDetail docs: ${existing.length} (${[...existingKeys].join(", ") || "none"})\n`);
  }

  for (const key of SECTION_KEYS) {
    const doc = buildDoc(key);
    if (!APPLY) {
      console.log(`Would create/skip secretariatDetail-${key}:`);
      console.log(`  title.en: "${doc.title.en}"`);
      console.log(`  overview.en: "${(doc.overview.en || "").slice(0, 80)}${doc.overview.en?.length > 80 ? "…" : ""}"`);
      console.log(`  keyActivities: ${doc.keyActivities.length} item(s)\n`);
      continue;
    }
    if (existingKeys.has(key)) {
      console.log(`⏭️  ${key}: already exists (${doc._id}) — skipping to preserve existing content`);
    } else {
      const result = await client.createOrReplace(doc);
      console.log(`✅ Created secretariatDetail document (${key}):`, result._id);
    }
  }

  if (!APPLY) {
    console.log("Dry run complete — no documents were written. Re-run with --apply to write them.");
  } else {
    console.log("\n   Done! Reminder: no photos were set — add each section's photo in Studio under");
    console.log("   Secretariat Detail Pages → Photo, and fill in the Section Head tab.");
    console.log("   Resource groups/files and Activities are separate collections — add those in Studio too.");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
