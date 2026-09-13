// scripts/migrate-departments-page.mjs
//
// Migrates the "departmentsPage" block (plus the separate "departmentStats"
// and "quickFacts" top-level keys) from src/locales/{en,fr,rw}/home.json
// into a single Sanity `departmentsPage` document, so the CMS fields start
// out matching what's already live on /departments instead of empty.
//
// Photos are NOT touched here — no file to upload from a script. Add the
// hero background photo and each department's photo in Studio under
// Departments Page → Hero & Intro / Department Sections. They fall back to
// the site's current default photos when left empty.
//
// Usage:
//   export SANITY_WRITE_TOKEN=sk...
//   node scripts/migrate-departments-page.mjs
//
// Run from the repo root (so the relative locale paths resolve).
// NOTE: this OVERWRITES the departmentsPage document if one already exists.

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const client = createClient({
  projectId: "2bpoen39",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

/** The fixed department section keys, in the order they appear on the page. */
const SECTION_KEYS = ["gs", "bnep", "diakonia", "finance", "youth", "gender", "radio"];

function loadLocale(lang) {
  const raw = readFileSync(`src/locales/${lang}/home.json`, "utf-8");
  return JSON.parse(raw);
}

const en = loadLocale("en");
const fr = loadLocale("fr");
const rw = loadLocale("rw");

const enDp = en.departmentsPage;
const frDp = fr.departmentsPage;
const rwDp = rw.departmentsPage;

// Builds a { en, fr, rw } localized value from the same key path under
// `departmentsPage` in each locale.
const L = (path) => {
  const get = (obj) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  return { en: get(enDp), fr: get(frDp), rw: get(rwDp) };
};

// Quick facts: a separate top-level `quickFacts` key (not nested under
// departmentsPage), same array length/order in all three locales.
const quickFacts = en.quickFacts.facts.map((_, i) => ({
  _key: `fact-${i}`,
  _type: "localizedText",
  en: en.quickFacts.facts[i],
  fr: fr.quickFacts.facts[i],
  rw: rw.quickFacts.facts[i],
}));

// Builds one `departmentSection` array item for a given department key.
// `nav` comes from the top-level departmentsPage.nav map; tag/title/desc/body
// come from departmentsPage[key]; stats come from the separate top-level
// departmentStats[key] list. Stat `value` is a plain (non-localized) string
// in the schema, so it's taken from the English list only.
function buildSection(key) {
  const enDept = enDp[key];
  const frDept = frDp[key];
  const rwDept = rwDp[key];
  const stats = en.departmentStats[key];

  return {
    _key: key,
    _type: "departmentSection",
    key,
    nav: {
      _type: "localizedString",
      en: enDp.nav?.[key],
      fr: frDp.nav?.[key],
      rw: rwDp.nav?.[key],
    },
    tag: {
      _type: "localizedString",
      en: enDept.tag,
      fr: frDept.tag,
      rw: rwDept.tag,
    },
    title: {
      _type: "localizedString",
      en: enDept.title,
      fr: frDept.title,
      rw: rwDept.title,
    },
    desc: {
      _type: "localizedText",
      en: enDept.desc,
      fr: frDept.desc,
      rw: rwDept.desc,
    },
    stats: stats.map((stat, i) => ({
      _key: `stat-${i}`,
      _type: "departmentStat",
      value: stat.value,
      label: {
        _type: "localizedString",
        en: en.departmentStats[key][i].label,
        fr: fr.departmentStats[key][i].label,
        rw: rw.departmentStats[key][i].label,
      },
    })),
    body: enDept.body.map((_, i) => ({
      _key: `body-${i}`,
      _type: "localizedText",
      en: enDept.body[i],
      fr: frDept.body[i],
      rw: rwDept.body[i],
    })),
  };
}

const sections = SECTION_KEYS.map(buildSection);

const doc = {
  _id: "departmentsPage",
  _type: "departmentsPage",
  heroTitle: L("heroTitle"),
  heroDesc: L("heroDesc"),
  introTag: L("introTag"),
  introTitle: L("introTitle"),
  introDesc: L("introDesc"),
  overview: {
    title: L("overview.title"),
    desc: L("overview.desc"),
  },
  quickFactsTitle: {
    en: en.quickFacts.title,
    fr: fr.quickFacts.title,
    rw: rw.quickFacts.title,
  },
  quickFacts,
  sections,
  cta: {
    title: L("cta.title"),
    desc: L("cta.desc"),
    btn: L("cta.btn"),
  },
};

const result = await client.createOrReplace(doc);
console.log("✅ Migrated departmentsPage document:", result._id);
console.log("   Reminder: no photos were set (hero background or department photos) — add them in");
console.log("   Studio under Departments Page → Hero & Intro / Department Sections.");
