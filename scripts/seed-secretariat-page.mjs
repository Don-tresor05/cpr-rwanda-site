/**
 * Seed the secretariatPage singleton document.
 *
 * Usage:
 *   node scripts/seed-secretariat-page.mjs                (uses SANITY_MIGRATION_TOKEN / SANITY_AUTH_TOKEN env)
 *   node scripts/seed-secretariat-page.mjs --token=XXX    (explicit token)
 *   npx sanity exec --with-user-token scripts/seed-secretariat-page.mjs   (from studio/, uses CLI login)
 *
 * The script is CREATE-ONLY: if a secretariatPage document already exists
 * it prints a notice and exits without touching anything.
 */
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const PROJECT_ID = "2bpoen39";
const DATASET = "production";
const DOC_ID = "secretariatPage";

const root = process.cwd();
const studioRequire = createRequire(path.join(root, "studio", "package.json"));
const { createClient } = studioRequire("@sanity/client");

// ---- client resolution ----
// Primary: reuse the Sanity CLI's stored login session (~/.config/sanity/config.json)
//   — same credential `sanity exec --with-user-token` would use. Token stays in memory.
// Fallback: explicit API token via --token=XXX, SANITY_MIGRATION_TOKEN, or .env.migration.
import os from "node:os";

let client;
let authMode;
const cliConfigPath = path.join(os.homedir(), ".config", "sanity", "config.json");
let cliToken = "";
if (existsSync(cliConfigPath)) {
  try {
    cliToken = JSON.parse(readFileSync(cliConfigPath, "utf8")).authToken || "";
  } catch {}
}

let token = process.env.SANITY_MIGRATION_TOKEN || process.env.SANITY_AUTH_TOKEN || "";
const tokenArg = process.argv.find((a) => a.startsWith("--token="));
if (tokenArg) token = tokenArg.slice("--token=".length);
if (!token && existsSync(path.join(root, ".env.migration"))) {
  const m = readFileSync(path.join(root, ".env.migration"), "utf8").match(/SANITY_MIGRATION_TOKEN=(.+)/);
  if (m) token = m[1].trim();
}

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

// ---- load trilingual fallback copy ----
const load = (lang) => JSON.parse(readFileSync(path.join(root, "src", "locales", lang, "home.json"), "utf8")).secretariatPage;
const en = load("en");
const fr = load("fr");
const rw = load("rw");

const ls = (e, f, r) => ({ _type: "localizedString", en: e ?? "", fr: f ?? "", rw: r ?? "" });
const lt = (e, f, r) => ({ _type: "localizedText", en: e ?? "", fr: f ?? "", rw: r ?? "" });

// localizedString/localizedText store raw objects under singleton fields (no _type/_key needed as field values)
const s = (e, f, r) => ({ en: e ?? "", fr: f ?? "", rw: r ?? "" });

const SECTION_ORDER = ["sg", "events", "meetings", "advocacy", "sustainability", "publications"];
const NAV = en.nav || {};

const sections = SECTION_ORDER.map((key, i) => {
  const E = en[key], F = fr[key] || {}, R = rw[key] || {};
  return {
    _key: key,
    _type: "secretariatSection",
    key,
    nav: s(NAV[key], (fr.nav || {})[key], (rw.nav || {})[key]),
    tag: s(E?.tag, F?.tag, R?.tag),
    title: s(E?.title, F?.title, R?.title),
    desc: s(E?.desc, F?.desc, R?.desc),
    stats: (E?.stats || []).map((st, j) => ({
      _key: `stat-${key}-${j}`,
      _type: "secretariatStat",
      value: st?.value ?? "",
      label: s(st?.label, F?.stats?.[j]?.label, R?.stats?.[j]?.label),
    })),
    body: (E?.body || []).map((b, j) => ({
      _key: `body-${key}-${j}`,
      _type: "localizedText",
      en: b ?? "",
      fr: (F?.body || [])[j] ?? "",
      rw: (R?.body || [])[j] ?? "",
    })),
    // images intentionally left empty -> website falls back to current defaults
  };
});

const doc = {
  _id: DOC_ID,
  _type: "secretariatPage",
  heroTitle: s(en.heroTitle, fr.heroTitle, rw.heroTitle),
  heroDesc: s(en.heroDesc, fr.heroDesc, rw.heroDesc),
  introTag: s(en.introTag, fr.introTag, rw.introTag),
  introTitle: s(en.introTitle, fr.introTitle, rw.introTitle),
  introDesc: s(en.introDesc, fr.introDesc, rw.introDesc),
  sgProfile: {
    _type: "sgProfile",
    role: s(en.sgProfile?.role, fr.sgProfile?.role, rw.sgProfile?.role),
    name: s(en.sgProfile?.name, fr.sgProfile?.name, rw.sgProfile?.name),
    title: s(en.sgProfile?.title, fr.sgProfile?.title, rw.sgProfile?.title),
    quote: s(en.sgProfile?.quote, fr.sgProfile?.quote, rw.sgProfile?.quote),
    photoAlt: s(en.sgProfile?.photoAlt, fr.sgProfile?.photoAlt, rw.sgProfile?.photoAlt),
  },
  sections,
  cta: {
    _type: "cta",
    title: s(en.cta?.title, fr.cta?.title, rw.cta?.title),
    desc: s(en.cta?.desc, fr.cta?.desc, rw.cta?.desc),
    btn: s(en.cta?.btn, fr.cta?.btn, rw.cta?.btn),
  },
};

// ---- create-only guard ----
console.log(`Auth: ${authMode}`);
const existing = await client.getDocument(DOC_ID).catch(() => null);
if (existing) {
  console.log(`ℹ️  A "${DOC_ID}" document already exists (${existing._id}). Nothing was changed.`);
  console.log("   If you want to REPLACE it, delete it in Studio first, then re-run this script.");
  process.exit(0);
}

await client.create(doc);
console.log(`✅ Created "${DOC_ID}" in ${PROJECT_ID}/${DATASET}`);
console.log("   Seeded with EN + FR + RW copy from src/locales/*/home.json");
console.log("   Hero/SG/section images left empty on purpose (site falls back to current photos).");
console.log("   → Refresh Studio: the Secretariat Page is now fully editable.");
