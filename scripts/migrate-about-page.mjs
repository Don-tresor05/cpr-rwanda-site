// scripts/migrate-about-page.mjs
//
// Migrates the "aboutPage" block from src/locales/{en,fr,rw}/home.json
// into a single Sanity `aboutPage` document.
//
// Usage:
//   export SANITY_WRITE_TOKEN=sk...
//   node scripts/migrate-about-page.mjs
//
// Run from the repo root (so the relative locale paths resolve).

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const client = createClient({
  projectId: "7kmzwj0g",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function loadLocale(lang) {
  const raw = readFileSync(`src/locales/${lang}/home.json`, "utf-8");
  return JSON.parse(raw).aboutPage;
}

const en = loadLocale("en");
const fr = loadLocale("fr");
const rw = loadLocale("rw");

// Builds a { en, fr, rw } localized value from the same key path in each locale
const L = (path) => {
  const get = (obj) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  return { en: get(en), fr: get(fr), rw: get(rw) };
};

// Core values: same array length/order in all three locales
const coreValueItems = en.coreValues.items.map((_, i) => ({
  _key: `value-${i}`,
  title: {
    en: en.coreValues.items[i].title,
    fr: fr.coreValues.items[i].title,
    rw: rw.coreValues.items[i].title,
  },
  desc: {
    en: en.coreValues.items[i].desc,
    fr: fr.coreValues.items[i].desc,
    rw: rw.coreValues.items[i].desc,
  },
}));

const doc = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroTitle: L("heroTitle"),
  nav: {
    whoWeAre: L("nav.whoWeAre"),
    visionMission: L("nav.visionMission"),
    coreValues: L("nav.coreValues"),
    execCommittee: L("nav.execCommittee"),
    organigram: L("nav.organigram"),
    ourPartners: L("nav.ourPartners"),
  },
  whoWeAre: {
    title: L("whoWeAre.title"),
    p1: L("whoWeAre.p1"),
    p2: L("whoWeAre.p2"),
  },
  visionMission: {
    title: L("visionMission.title"),
    visionTag: L("visionMission.visionTag"),
    visionSub: L("visionMission.visionSub"),
    visionDesc: L("visionMission.visionDesc"),
    missionTag: L("visionMission.missionTag"),
    missionSub: L("visionMission.missionSub"),
    missionDesc: L("visionMission.missionDesc"),
  },
  model: {
    title: L("model.title"),
    desc: L("model.desc"),
    step1Tag: L("model.step1Tag"),
    step1Title: L("model.step1Title"),
    step1Desc: L("model.step1Desc"),
    step2Tag: L("model.step2Tag"),
    step2Title: L("model.step2Title"),
    step2Desc: L("model.step2Desc"),
    step3Tag: L("model.step3Tag"),
    step3Title: L("model.step3Title"),
    step3Desc: L("model.step3Desc"),
  },
  coreValues: {
    title: L("coreValues.title"),
    items: coreValueItems,
  },
  execCommittee: {
    title: L("execCommittee.title"),
    desc: L("execCommittee.desc"),
    boardMembers: L("execCommittee.boardMembers"),
    staff: L("execCommittee.staff"),
    defaultName: L("execCommittee.defaultName"),
    defaultRole: L("execCommittee.defaultRole"),
  },
  organigram: {
    title: L("organigram.title"),
    comingSoon: L("organigram.comingSoon"),
  },
  partners: {
    title: L("partners.title"),
  },
  historyModal: {
    learnMore: L("historyModal.learnMore"),
    badge: L("historyModal.badge"),
    title: L("historyModal.title"),
    p1: L("historyModal.p1"),
    p2: L("historyModal.p2"),
    personName: L("historyModal.personName"),
    personRole: L("historyModal.personRole"),
    cta: L("historyModal.cta"),
  },
};

const result = await client.createOrReplace(doc);
console.log("✅ Migrated aboutPage document:", result._id);
