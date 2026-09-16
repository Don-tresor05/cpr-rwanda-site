import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: "studio/.env" });

/**
 * Fixes the 7 `department` documents so they match the CURRENT department
 * schema (studio/schemas/department.ts), which was redefined on 2026-09-05
 * (commit fdc5f89, "Fixed cpr sanity structure to match the structure with
 * cpr live site") without a data migration.
 *
 * Before that commit, `department` documents used: name (string), slug,
 * description (text), image, headName, headTitle, headImage, email, phone.
 * After that commit, the schema instead expects: order, icon, title
 * (localizedString), desc (localizedText), link — completely different
 * field keys. Sanity never deletes data when a schema field is removed, so
 * the old name/shortDescription/description/slug values are still sitting
 * on these 7 documents — Studio just can't see them anymore under the new
 * field names, which is why every department shows as "Untitled
 * department" with empty fields in the editor (and why the homepage
 * Departments cards, which read `title`/`icon`/`desc`/`link`, don't have
 * real CMS content to show and fall back to the hardcoded cards instead).
 *
 * This script copies the old data into the new field shape:
 *   name              -> title.en
 *   shortDescription  -> desc.en
 *   (fixed map)        -> icon, link (see DEPT_META below — matches the
 *                         DEPT_ICON_MAP / section keys already used
 *                         elsewhere in the codebase, e.g.
 *                         scripts/migrate-departments-page.mjs)
 *
 * SAFE BY DEFAULT: dry-run unless you pass --apply. Only ever ADDS the new
 * title/desc/icon/link fields — never touches or removes the old
 * name/slug/shortDescription/description fields, so nothing is lost and
 * this is safe to re-run. Skips any document that already has title.en set
 * (so it won't clobber manual edits made in Studio after this runs once).
 *
 * Usage:
 *   node scripts/migrate-department-cards.mjs            # dry run
 *   node scripts/migrate-department-cards.mjs --apply     # actually writes
 *
 * Requires studio/.env: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET,
 * SANITY_WRITE_TOKEN (a token with write access).
 */

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "2bpoen39",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2026-08-08",
  useCdn: false,
});

// Matches the "department" option values used on departmentDetail
// documents, and the DEPT_ICON_MAP keys in src/app/data/cmsContent.ts.
const DEPT_META = {
  "department-general-secretary": { key: "gs", icon: "crown" },
  "department-bnep": { key: "bnep", icon: "graduation-cap" },
  "department-diakonia": { key: "diakonia", icon: "handshake" },
  "department-finance": { key: "finance", icon: "coins" },
  "department-youth": { key: "youth", icon: "users" },
  "department-gender": { key: "gender", icon: "scale" },
  "department-radio": { key: "radio", icon: "radio" },
};

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

  const docs = await client.fetch(
    `*[_type == "department"]{_id, name, shortDescription, "hasTitle": defined(title.en)} | order(_id asc)`,
  );

  if (!docs.length) {
    console.log("No department documents found — nothing to do.");
    return;
  }

  for (const doc of docs) {
    const meta = DEPT_META[doc._id];
    if (!meta) {
      console.warn(`⚠ ${doc._id}: no icon/link mapping known for this id — skipping. Add it to DEPT_META.`);
      continue;
    }
    if (doc.hasTitle) {
      console.log(`⏭  ${doc._id}: title.en already set — skipping (already migrated or edited in Studio).`);
      continue;
    }
    if (!doc.name) {
      console.warn(`⚠ ${doc._id}: no legacy "name" field to migrate from — skipping.`);
      continue;
    }

    const patch = {
      title: { en: doc.name },
      desc: { en: doc.shortDescription || "" },
      icon: meta.icon,
      link: `/departments#${meta.key}`,
    };

    console.log(`${doc._id}:`);
    console.log(`  title.en = ${JSON.stringify(patch.title.en)}`);
    console.log(`  desc.en  = ${JSON.stringify(patch.desc.en)}`);
    console.log(`  icon     = ${patch.icon}`);
    console.log(`  link     = ${patch.link}`);

    if (!APPLY) continue;

    await client.patch(doc._id).set(patch).commit();
    console.log(`  ✔ Patched\n`);
  }

  if (!APPLY) {
    console.log("\nDry run complete. Re-run with --apply to write these changes to Sanity.");
  } else {
    console.log("\n🎉 Done! Check localhost:3333/structure/department — cards should show real titles now.");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
