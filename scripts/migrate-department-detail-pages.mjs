// scripts/migrate-department-detail-pages.mjs
//
// Migrates the "departmentResourcesData" block from
// src/locales/{en,fr,rw}/home.json into seven `departmentDetail` Sanity
// documents (one per department) — the hero title, overview paragraph and
// key-activities checklist on each department's detail page
// (/departments/:deptId/resources), reached via "Learn More" from the
// Departments page.
//
// The resource cards on that same page are a separate collection
// (departmentResourceGroup / departmentResourceFile) and are NOT touched
// here. Photos are also NOT migrated — no file to upload from a script; add
// each department's photo in Studio under Department Detail Pages → Photo.
//
// Usage:
//   node scripts/migrate-department-detail-pages.mjs
//
// Run from the repo root (so the relative locale paths resolve).
// NOTE: this OVERWRITES each departmentDetail document if one already exists
// (document _id is "departmentDetail-<key>", so it's safe to re-run).

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "studio/.env" });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: "2026-08-08",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const SECTION_KEYS = ["gs", "bnep", "diakonia", "finance", "youth", "gender", "radio"];

function loadLocale(lang) {
  const raw = readFileSync(`src/locales/${lang}/home.json`, "utf-8");
  return JSON.parse(raw).departmentResourcesData;
}

const en = loadLocale("en");
const fr = loadLocale("fr");
const rw = loadLocale("rw");

function buildDoc(key) {
  const enDept = en[key];
  const frDept = fr[key];
  const rwDept = rw[key];

  return {
    _id: `departmentDetail-${key}`,
    _type: "departmentDetail",
    department: key,
    title: {
      en: enDept.title,
      fr: frDept.title,
      rw: rwDept.title,
    },
    overview: {
      en: enDept.overview,
      fr: frDept.overview,
      rw: rwDept.overview,
    },
    keyActivities: enDept.keyActivities.map((_, i) => ({
      _key: `activity-${i}`,
      _type: "localizedString",
      en: enDept.keyActivities[i],
      fr: frDept.keyActivities[i],
      rw: rwDept.keyActivities[i],
    })),
  };
}

async function migrate() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("✗ SANITY_WRITE_TOKEN is not set (check studio/.env).");
    process.exit(1);
  }

  console.log(`Project: ${process.env.SANITY_STUDIO_PROJECT_ID} / ${process.env.SANITY_STUDIO_DATASET}\n`);

  // First check which departments already exist
  const existing = await client.fetch(
    `*[_type == "departmentDetail"]{ _id, department }`
  );
  const existingKeys = new Set(existing.map((d) => d.department));
  console.log(`Existing department detail docs: ${existing.length} (${[...existingKeys].join(", ") || "none"})\n`);

  for (const key of SECTION_KEYS) {
    const doc = buildDoc(key);
    if (existingKeys.has(key)) {
      // Don't overwrite existing documents — only fill in missing ones
      console.log(`⏭️  ${key}: already exists (${doc._id}) — skipping to preserve existing content`);
    } else {
      const result = await client.createOrReplace(doc);
      console.log(`✅ Created departmentDetail document (${key}):`, result._id);
    }
  }

  console.log("\n   Done! Reminder: no photos were set — add each department's photo in Studio under");
  console.log("   Department Detail Pages → Photo, and fill in the Department Head tab.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
