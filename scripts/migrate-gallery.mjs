import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "studio/.env" });

/**
 * One-time migration: uploads the current hardcoded Gallery page content
 * (src/app/pages/GalleryPage.tsx's GALLERY_EVENTS — 4 collections, 8 photos
 * each) into Sanity as `galleryEvent` documents, so the Gallery page can be
 * fully staff-managed from Studio instead of relying on the code fallback.
 *
 * The Gallery page (useGalleryEvents in src/app/data/cmsContent.ts) already
 * reads from Sanity and falls back to the hardcoded GALLERY_EVENTS whenever
 * no `galleryEvent` documents exist yet — this script is what populates
 * those documents so the CMS content takes over.
 *
 * SAFE BY DEFAULT: dry-run unless you pass --apply. In dry-run mode no
 * network writes or image uploads happen — it only prints what it would do.
 * Also skips any collection whose `category` already has a galleryEvent
 * document in Sanity, so it's safe to re-run (e.g. after fixing one image).
 *
 * Usage:
 *   node scripts/migrate-gallery.mjs            # dry run — prints what it would do
 *   node scripts/migrate-gallery.mjs --apply    # actually creates the documents
 *
 * Requires the same studio/.env variables the other migrate-*.mjs scripts
 * use: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, SANITY_WRITE_TOKEN
 * (a token with write access — create one in manage.sanity.io if you don't
 * have one, and never commit it).
 */

const APPLY = process.argv.includes("--apply");

const client = createClient({
  // Falls back to the project's known public projectId/dataset (same as
  // src/lib/sanityClient.ts) so a --dry-run works even without studio/.env
  // present. --apply still needs a real SANITY_WRITE_TOKEN to write.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "2bpoen39",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2026-08-08",
  useCdn: false,
});

const GALLERY_EVENTS = [
  {
    category: "conferences",
    order: 1,
    title: "Executive Committee & Member Churches Annual Conference",
    locationDate: "Kigali, January 2026",
    images: [
      { src: "autorites.webp", alt: "CPR leadership together with national partners" },
      { src: "secretariat-meetings.webp", alt: "Plenary session on strategic Church initiatives" },
      { src: "cpr-members.webp", alt: "Delegates from Protestant member denominations" },
      { src: "handover.webp", alt: "Leadership transition and prayer of blessing" },
      { src: "secretariat-sg.webp", alt: "Office of the Secretary General delegation" },
      { src: "secretariat-events.webp", alt: "National planning symposium participants" },
      { src: "Bisanzeda.webp", alt: "Community outreach program inauguration" },
      { src: "secretariat-publications.webp", alt: "Presentation of CPR annual impact reports" },
    ],
  },
  {
    category: "commemorations",
    order: 2,
    title: "Kwibuka Commemoration & Interfaith Remembrance Service",
    locationDate: "Kigali, April 2025",
    images: [
      { src: "Kwibuka 1 - Copy.png", alt: "Interfaith leaders united in solemn remembrance" },
      { src: "Kwibuka 3.png", alt: "Wreath laying ceremony at genocide memorial" },
      { src: "Kwibuka 4 - Copy.png", alt: "Congregants praying during commemoration service" },
      { src: "Kwibuka 7.jpg", alt: "Youth lighting candles of hope and resilience" },
      { src: "news-kwibuka.jpg", alt: "CPR Secretary General delivering words of comfort" },
      { src: "3.jpeg", alt: "Church members participating in healing dialogue" },
      { src: "1.jpeg", alt: "Community reflection and mutual support group" },
      { src: "2.jpeg", alt: "Pastoral counseling sessions after remembrance" },
    ],
  },
  {
    category: "youth",
    order: 3,
    title: "Youth Empowerment, Peacebuilding & Mental Health Programs",
    locationDate: "Various Districts, 2025",
    images: [
      { src: "Trauma 1.webp", alt: "Community mental health seminar and workshops" },
      { src: "news-trauma.jpg", alt: "Group counseling and socio-economic support" },
      { src: "Mental 1.webp", alt: "Youth training session on psychosocial healing" },
      { src: "Mental 2.webp", alt: "Interactive peacebuilding dialogue among youth" },
      { src: "Mental 8.webp", alt: "Graduation of peer counselors in local parishes" },
      { src: "Youth2.webp", alt: "Youth festival celebrating harmony and faith" },
      { src: "youth.webp", alt: "Young volunteers joining environmental works" },
      { src: "school-visit.webp", alt: "Pastoral visit and mentoring at member schools" },
    ],
  },
  {
    category: "education",
    order: 4,
    title: "Education, Protestant Schools & Radio Inkoramutima Ministry",
    locationDate: "Kigali & East, 2025",
    images: [
      { src: "radio-hero.webp", alt: "Radio Inkoramutima broadcast transmitter and studios" },
      { src: "radio-studio.webp", alt: "Live studio broadcast for daily devotionals" },
      { src: "education.webp", alt: "Protestant schools leadership workshop" },
      { src: "news-education.webp", alt: "Curriculum development and values education" },
      { src: "news-pedagogy.jpg", alt: "Pedagogical excellence seminar for teachers" },
      { src: "Primary.jpg", alt: "Primary school scholarship program beneficiaries" },
      { src: "Gahini 2.webp", alt: "Historical Gahini parish church architecture" },
      { src: "Gahini 3.webp", alt: "Gahini school expansion and community health program" },
    ],
  },
];

function findAssetFile(filename) {
  // The GalleryPage fallback references images as /cpr/assets/<file> — the
  // app's base path is /cpr/, and the actual files live in public/assets/.
  const candidate = path.join("public", "assets", filename);
  if (fs.existsSync(candidate)) return candidate;
  return null;
}

async function uploadImage(filename) {
  const filePath = findAssetFile(filename);
  if (!filePath) {
    console.warn(`  ⚠ Image not found, skipping: ${filename}`);
    return null;
  }
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function migrate() {
  if (!APPLY) {
    console.log("── DRY RUN ── (pass --apply to actually write to Sanity)\n");
  }

  if (APPLY && !process.env.SANITY_WRITE_TOKEN) {
    console.error(
      "✗ SANITY_WRITE_TOKEN is not set (check studio/.env). A write token is required for --apply.",
    );
    process.exit(1);
  }

  let existingCategories = new Set();
  if (APPLY) {
    const existing = await client.fetch(`*[_type == "galleryEvent"]{category}`);
    existingCategories = new Set(existing.map((d) => d.category));
  }

  for (const event of GALLERY_EVENTS) {
    if (existingCategories.has(event.category)) {
      console.log(`⏭  Skipping "${event.category}" — a galleryEvent document already exists for it.`);
      continue;
    }

    console.log(`Migrating collection: ${event.category} — "${event.title}"`);

    for (const img of event.images) {
      const filePath = findAssetFile(img.src);
      console.log(`  ${filePath ? "✔" : "⚠"} ${img.src}${filePath ? "" : "  (NOT FOUND)"}`);
    }

    if (!APPLY) continue;

    const uploadedImages = [];
    for (const img of event.images) {
      const uploaded = await uploadImage(img.src);
      if (uploaded) {
        uploadedImages.push({
          _type: "photo",
          _key: Math.random().toString(36).slice(2),
          image: uploaded,
          alt: img.alt,
        });
      }
    }

    const doc = {
      _type: "galleryEvent",
      order: event.order,
      category: event.category,
      title: { en: event.title },
      locationDate: { en: event.locationDate },
      images: uploadedImages,
    };

    const created = await client.create(doc);
    console.log(`  ✔ Created: ${created._id}\n`);
  }

  if (!APPLY) {
    console.log("\nDry run complete. Re-run with --apply to create these documents in Sanity.");
  } else {
    console.log("\n🎉 Migration complete! Check localhost:3333/structure/galleryEvent");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
