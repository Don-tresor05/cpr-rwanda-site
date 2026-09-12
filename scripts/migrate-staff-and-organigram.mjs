// scripts/migrate-staff-and-organigram.mjs
//
// Seeds the 8 hardcoded staff members (from AboutUs.tsx) into the new
// staffMember Sanity document type, uploading real photo assets from the
// repo for the ones that have one. Also uploads the Organigram image and
// patches it onto the existing `aboutPage` document.
//
// Usage:
//   export SANITY_PROJECT_ID=<from `cat studio/.env`>
//   export SANITY_DATASET=production
//   export SANITY_WRITE_TOKEN=sk...
//   node scripts/migrate-staff-and-organigram.mjs
//
// Run from the repo root (so the relative locale/asset paths resolve).

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, existsSync } from "fs";

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_WRITE_TOKEN) {
  console.error(
    "❌ Missing env vars. Set SANITY_PROJECT_ID, SANITY_DATASET and SANITY_WRITE_TOKEN before running.\n" +
    "   Check `cat studio/.env` for the correct project ID / dataset."
  );
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Adjust this if the `find` check shows assets live somewhere else.
const ASSETS_DIR = "public/assets";

function loadLocale(lang) {
  const raw = readFileSync(`src/locales/${lang}/home.json`, "utf-8");
  return JSON.parse(raw).aboutPage.execCommittee;
}

const en = loadLocale("en");
const fr = loadLocale("fr");
const rw = loadLocale("rw");

// Builds a { en, fr, rw } localized value from the same key path in each
// locale's execCommittee block (e.g. "staffMember" or "roles.accountant")
const L = (path) => {
  const get = (obj) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  return { en: get(en), fr: get(fr), rw: get(rw) };
};

// "/cpr/assets/Foo.webp" -> "public/assets/Foo.webp"
function localPathFor(publicPath) {
  return ASSETS_DIR + publicPath.replace(/^\/cpr\/assets/, "");
}

/** Uploads a local image file to Sanity and returns an image field value, or null. */
async function uploadImage(publicPath, label) {
  if (!publicPath) return null;
  const localPath = localPathFor(publicPath);
  if (!existsSync(localPath)) {
    console.warn(`⚠️  Skipping photo for ${label} — file not found at ${localPath}`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(localPath), {
    filename: localPath.split("/").pop(),
  });
  console.log(`   📷 Uploaded photo for ${label}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const STAFF = [
  { key: "eric-mugwaneza", name: "Eric Mugwaneza", roleKey: "staffMember", img: "/cpr/assets/MUGWANEZA Eric.webp" },
  { key: "anne-marie", name: "Anne Marie", roleKey: "staffMember", img: "/cpr/assets/Anne Marie PP.webp" },
  { key: "felicien", name: "Felicien", roleKey: "staffMember", img: "/cpr/assets/Sec Photo.webp" },
  { key: "nirere-jael", name: "Nirere Jael", roleKey: "roles.projectCoordinator", img: "/cpr/assets/Jael.webp" },
  { key: "peter-mukunzi", name: "Peter Mukunzi", roleKey: "staffMember", img: "/cpr/assets/Mukunzi Peter.jpg" },
  { key: "joselyne-iragena", name: "Joselyne Iragena", roleKey: "staffMember", img: "/cpr/assets/IRAGENA Joselyne.webp" },
  { key: "alfred-ntabanganyimana", name: "Alfred Ntabanganyimana", roleKey: "roles.financeCoordinator", img: "" },
  { key: "joseph-nyisingize", name: "Joseph Nyisingize", roleKey: "roles.accountant", img: "" },
];

async function migrateStaff() {
  console.log("Migrating staff members...");
  for (let i = 0; i < STAFF.length; i++) {
    const s = STAFF[i];
    const image = await uploadImage(s.img, s.name);
    const doc = {
      _id: `staffMember-${s.key}`,
      _type: "staffMember",
      name: s.name,
      role: L(s.roleKey),
      order: i + 1,
      ...(image ? { image } : {}),
    };
    const result = await client.createOrReplace(doc);
    console.log(`✅ ${s.name} → ${result._id}`);
  }
}

async function migrateOrganigram() {
  console.log("\nMigrating organigram image...");
  const image = await uploadImage("/cpr/assets/Organigam.jpeg", "Organigram");
  if (!image) {
    console.warn("⚠️  Organigram image not uploaded — check the ASSETS_DIR path.");
    return;
  }
  await client
    .patch("aboutPage")
    .set({ "organigram.image": image })
    .commit();
  console.log("✅ Patched aboutPage.organigram.image");
}

await migrateStaff();
await migrateOrganigram();
console.log("\nDone.");
