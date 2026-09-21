/**
 * Adds the homepage teaser copy for the Radio section and the CTA banner
 * onto the single `siteSettings` document (studio/schemas/siteSettings.ts),
 * which now has two new pieces:
 *
 *   - radio.desc     (localizedText)  — the paragraph under the tagline in
 *                                        the homepage radio teaser
 *   - radio.pillars   (array of localizedString) — the 3 value cards
 *                                        (Evangelization / Unity / Development)
 *   - cta.title / cta.desc (localizedString / localizedText) — the
 *                                        "Ready to Make an Impact?" banner
 *
 * These are brand-new fields on an EXISTING document (siteSettings.radio
 * already has frequency/tagline/listenUrl; cta is a new object), so this
 * is additive only — nothing existing is touched. Seeds from the same
 * trilingual copy the homepage components currently render via
 * t("radio.desc"/"radio.pillars"/"cta.title"/"cta.desc") in
 * src/locales/{en,fr,rw}/home.json, so what Studio shows will match what
 * the site already displays today.
 *
 * Also part of this same pass of CMS work: AboutPreview now reads
 * aboutPage.whoWeAre (already populated in Sanity — no migration needed)
 * and GalleryPreview now reads the existing `galleryEvent` collection
 * (already populated — no migration needed either). This script only
 * covers the two genuinely new fields.
 *
 * SAFE BY DEFAULT: dry-run unless you pass --apply. Skips any field that's
 * already set in Sanity, so it won't clobber edits made in Studio.
 *
 * Usage:
 *   node scripts/migrate-homepage-teasers.mjs             (dry run)
 *   node scripts/migrate-homepage-teasers.mjs --apply       (writes)
 *   node scripts/migrate-homepage-teasers.mjs --apply --token=XXX
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
const DOC_ID = "siteSettings";

const root = process.cwd();
const studioRequire = createRequire(path.join(root, "studio", "package.json"));
const { createClient } = studioRequire("@sanity/client");

// ---- client resolution (CLI login session, same as the other migration scripts) ----
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

// ---- load trilingual copy (same shape the homepage components read via t()) ----
const load = (lang) => JSON.parse(readFileSync(path.join(root, "src", "locales", lang, "home.json"), "utf8"));
const en = load("en");
const fr = load("fr");
const rw = load("rw");

const s = (e, f, r) => ({ _type: "localizedString", en: e ?? "", fr: f ?? "", rw: r ?? "" });
const t = (e, f, r) => ({ _type: "localizedText", en: e ?? "", fr: f ?? "", rw: r ?? "" });

async function migrate() {
  console.log(`Auth: ${authMode}`);
  console.log(`Project: ${PROJECT_ID} / ${DATASET}${APPLY ? "" : "  (DRY RUN — pass --apply to write)"}\n`);

  const doc = await client.fetch(
    `*[_id == $id][0]{ _id, "hasRadioDesc": defined(radio.desc), "hasCtaTitle": defined(cta.title) }`,
    { id: DOC_ID },
  );

  if (!doc) {
    console.log(`No "${DOC_ID}" document found — nothing to do. (Create the Site Settings document in Studio first.)`);
    return;
  }

  const patch = {};

  if (doc.hasRadioDesc) {
    console.log(`⏭  radio.desc / radio.pillars: already set — skipping (already migrated or edited in Studio).`);
  } else {
    patch["radio.desc"] = t(en.radio.desc, fr.radio.desc, rw.radio.desc);
    patch["radio.pillars"] = (en.radio.pillars || []).map((_, i) => ({
      _key: `pillar-${i}`,
      _type: "localizedString",
      en: en.radio.pillars?.[i] ?? "",
      fr: fr.radio.pillars?.[i] ?? "",
      rw: rw.radio.pillars?.[i] ?? "",
    }));
    console.log(`radio.desc    = ${JSON.stringify(patch["radio.desc"].en)}`);
    console.log(`radio.pillars = ${patch["radio.pillars"].map((p) => p.en).join(", ")}`);
  }

  if (doc.hasCtaTitle) {
    console.log(`⏭  cta.title / cta.desc: already set — skipping (already migrated or edited in Studio).`);
  } else {
    patch["cta.title"] = s(en.cta.title, fr.cta.title, rw.cta.title);
    patch["cta.desc"] = t(en.cta.desc, fr.cta.desc, rw.cta.desc);
    console.log(`cta.title     = ${JSON.stringify(patch["cta.title"].en)}`);
    console.log(`cta.desc      = ${JSON.stringify(patch["cta.desc"].en)}`);
  }

  if (Object.keys(patch).length === 0) {
    console.log("\nNothing to do — both fields already set.");
    return;
  }

  if (!APPLY) {
    console.log("\nDry run complete. Re-run with --apply to write these changes to Sanity.");
    return;
  }

  await client.patch(DOC_ID).set(patch).commit();
  console.log(`\n🎉 Done! Check Site Settings → Radio / Homepage CTA in Studio.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
