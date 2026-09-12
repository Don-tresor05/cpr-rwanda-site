// scripts/migrate-radio-page.mjs
//
// Migrates the "radioPage" block from src/locales/{en,fr,rw}/home.json
// into a single Sanity `radioPage` document, so the new CMS fields start
// out matching what's already live on /radio instead of empty.
//
// The programme schedule itself is NOT touched here — it already lives in
// the separate `radioProgram` collection. The hero background image is
// also left empty (no file to upload from a script); add it in Studio
// under Radio Inkoramutima Page → Hero → Hero background image.
//
// Usage:
//   export SANITY_WRITE_TOKEN=sk...
//   node scripts/migrate-radio-page.mjs
//
// Run from the repo root (so the relative locale paths resolve).
// NOTE: this OVERWRITES the radioPage document if one already exists.

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const client = createClient({
  projectId: "2bpoen39",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function loadLocale(lang) {
  const raw = readFileSync(`src/locales/${lang}/home.json`, "utf-8");
  return JSON.parse(raw).radioPage;
}

const en = loadLocale("en");
const fr = loadLocale("fr");
const rw = loadLocale("rw");

// Builds a { en, fr, rw } localized value from the same key path in each locale
const L = (path) => {
  const get = (obj) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  return { en: get(en), fr: get(fr), rw: get(rw) };
};

// History timeline: same array length/order in all three locales
const aboutBody = en.about.body.map((_, i) => ({
  _key: `body-${i}`,
  _type: "localizedText",
  en: en.about.body[i],
  fr: fr.about.body[i],
  rw: rw.about.body[i],
}));

// Editorial pillars: same array length/order in all three locales
const editorialItems = en.editorial.items.map((_, i) => ({
  _key: `pillar-${i}`,
  _type: "editorialItem",
  title: {
    en: en.editorial.items[i].title,
    fr: fr.editorial.items[i].title,
    rw: rw.editorial.items[i].title,
  },
  desc: {
    en: en.editorial.items[i].desc,
    fr: fr.editorial.items[i].desc,
    rw: rw.editorial.items[i].desc,
  },
}));

// Coverage stats: value is a plain (non-localized) string; label is localized
const coverageStats = en.coverage.stats.map((stat, i) => ({
  _key: `stat-${i}`,
  _type: "coverageStat",
  value: stat.value,
  label: {
    en: en.coverage.stats[i].label,
    fr: fr.coverage.stats[i].label,
    rw: rw.coverage.stats[i].label,
  },
}));

// Coverage regions: localized strings, same order in all three locales
const coverageRegions = en.coverage.regions.map((_, i) => ({
  _key: `region-${i}`,
  _type: "localizedString",
  en: en.coverage.regions[i],
  fr: fr.coverage.regions[i],
  rw: rw.coverage.regions[i],
}));

const beneficiaryStats = en.beneficiaries.stats.map((stat, i) => ({
  _key: `stat-${i}`,
  _type: "beneficiaryStat",
  value: stat.value,
  label: {
    en: en.beneficiaries.stats[i].label,
    fr: fr.beneficiaries.stats[i].label,
    rw: rw.beneficiaries.stats[i].label,
  },
}));

const doc = {
  _id: "radioPage",
  _type: "radioPage",
  heroTag: L("heroTag"),
  heroTitle: L("heroTitle"),
  heroDesc: L("heroDesc"),
  heroCta: L("heroCta"),
  heroCtaSecondary: L("heroCtaSecondary"),
  nav: {
    about: L("nav.about"),
    vision: L("nav.vision"),
    editorial: L("nav.editorial"),
    programs: L("nav.programs"),
    coverage: L("nav.coverage"),
    beneficiaries: L("nav.beneficiaries"),
  },
  about: {
    tag: L("about.tag"),
    title: L("about.title"),
    desc: L("about.desc"),
    hours: L("about.hours"),
    body: aboutBody,
  },
  introTag: L("introTag"),
  introTitle: L("introTitle"),
  introDesc: L("introDesc"),
  vision: {
    tag: L("vision.tag"),
    visionTag: L("vision.visionTag"),
    visionSub: L("vision.visionSub"),
    visionDesc: L("vision.visionDesc"),
    missionTag: L("vision.missionTag"),
    missionSub: L("vision.missionSub"),
    missionDesc: L("vision.missionDesc"),
  },
  editorial: {
    tag: L("editorial.tag"),
    title: L("editorial.title"),
    desc: L("editorial.desc"),
    items: editorialItems,
  },
  programs: {
    tag: L("programs.tag"),
    title: L("programs.title"),
    desc: L("programs.desc"),
    footerTag: L("programs.footerTag"),
  },
  coverage: {
    tag: L("coverage.tag"),
    title: L("coverage.title"),
    desc: L("coverage.desc"),
    stats: coverageStats,
    regions: coverageRegions,
  },
  beneficiaries: {
    tag: L("beneficiaries.tag"),
    title: L("beneficiaries.title"),
    desc: L("beneficiaries.desc"),
    stats: beneficiaryStats,
  },
  cta: {
    title: L("cta.title"),
    desc: L("cta.desc"),
    btn: L("cta.btn"),
    btnSecondary: L("cta.btnSecondary"),
  },
};

const result = await client.createOrReplace(doc);
console.log("✅ Migrated radioPage document:", result._id);
console.log("   Reminder: the hero background image was NOT set — add it in Studio under");
console.log("   Radio Inkoramutima Page → Hero → Hero background image.");
