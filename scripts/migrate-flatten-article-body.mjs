import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: "studio/.env" });

/**
 * One-time migration: copies existing Article Body content from the old
 * nested shape —
 *
 *   body: { en: [...], fr: [...], rw: [...] }
 *
 * — into the new top-level fields —
 *
 *   bodyEn: [...], bodyFr: [...], bodyRw: [...]
 *
 * — on `newsPost`, `departmentActivity` and `departmentDetail` documents.
 * This matches the schema change in localizedArticleBody.ts, made to avoid
 * a long-standing Sanity Studio editor bug where inserting an image into a
 * portable-text field nested inside a plain object field throws "Cannot
 * apply deep operations on primitive values" (see
 * https://github.com/sanity-io/sanity/issues/1993 and
 * https://github.com/sanity-io/sanity/issues/9764).
 *
 * SAFE BY DEFAULT: this only ever ADDS the new bodyEn/bodyFr/bodyRw fields.
 * It never deletes or modifies the old `body` field, so nothing is lost —
 * the old field just becomes unused (Studio no longer shows it, since it's
 * not in the schema anymore, but the data stays on the document). You can
 * always re-run this safely; it skips documents that already have the new
 * fields set.
 *
 * Usage:
 *   node scripts/migrate-flatten-article-body.mjs            # dry run — prints what it would do
 *   node scripts/migrate-flatten-article-body.mjs --apply    # actually writes the changes
 *
 * Requires the same studio/.env variables the other migrate-*.mjs scripts
 * use: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, SANITY_WRITE_TOKEN
 * (a token with write access — create one in manage.sanity.io if you don't
 * have one, and never commit it).
 */

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2026-08-08",
  useCdn: false,
});

const DOC_TYPES = ["newsPost", "departmentActivity", "departmentDetail"];

async function migrate() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error(
      "✗ SANITY_WRITE_TOKEN is not set (check studio/.env). A write token is required even for --dry-run's document fetch of drafts, and definitely for --apply.",
    );
    process.exit(1);
  }

  console.log(APPLY ? "Running LIVE — this will write to Sanity.\n" : "Dry run — no changes will be written. Pass --apply to actually migrate.\n");

  let totalDocs = 0;
  let totalUpdated = 0;
  let totalSkippedNoBody = 0;
  let totalSkippedAlready = 0;

  for (const type of DOC_TYPES) {
    const query = `*[_type == $type && defined(body)]{ _id, _rev, body, bodyEn, bodyFr, bodyRw }`;
    const docs = await client.fetch(query, { type });
    console.log(`${type}: ${docs.length} document(s) with an old-shape "body" field`);

    for (const doc of docs) {
      totalDocs++;
      const oldBody = doc.body || {};
      const hasOldContent =
        (Array.isArray(oldBody.en) && oldBody.en.length > 0) ||
        (Array.isArray(oldBody.fr) && oldBody.fr.length > 0) ||
        (Array.isArray(oldBody.rw) && oldBody.rw.length > 0);

      if (!hasOldContent) {
        totalSkippedNoBody++;
        continue;
      }

      const alreadyMigrated =
        (Array.isArray(doc.bodyEn) && doc.bodyEn.length > 0) ||
        (Array.isArray(doc.bodyFr) && doc.bodyFr.length > 0) ||
        (Array.isArray(doc.bodyRw) && doc.bodyRw.length > 0);

      if (alreadyMigrated) {
        totalSkippedAlready++;
        console.log(`  = ${doc._id} already has bodyEn/bodyFr/bodyRw content — skipping`);
        continue;
      }

      const patch = {};
      if (Array.isArray(oldBody.en) && oldBody.en.length > 0) patch.bodyEn = oldBody.en;
      if (Array.isArray(oldBody.fr) && oldBody.fr.length > 0) patch.bodyFr = oldBody.fr;
      if (Array.isArray(oldBody.rw) && oldBody.rw.length > 0) patch.bodyRw = oldBody.rw;

      console.log(
        `  → ${doc._id}: would set ${Object.keys(patch).join(", ")} (${(patch.bodyEn || []).length} en / ${(patch.bodyFr || []).length} fr / ${(patch.bodyRw || []).length} rw block(s))`,
      );

      if (APPLY) {
        await client.patch(doc._id).setIfMissing(patch).commit();
        totalUpdated++;
      }
    }
  }

  console.log("\n— Summary —");
  console.log(`Documents inspected: ${totalDocs}`);
  console.log(`No content to migrate: ${totalSkippedNoBody}`);
  console.log(`Already migrated: ${totalSkippedAlready}`);
  console.log(APPLY ? `Updated: ${totalUpdated}` : `Would update: ${totalDocs - totalSkippedNoBody - totalSkippedAlready}`);

  if (!APPLY) {
    console.log("\nThis was a dry run — nothing was written. Re-run with --apply once this looks right.");
  } else {
    console.log("\n🎉 Migration complete. Open each document in Studio, confirm the new Article Body / Full Article tab shows the right content, then (optional, later) remove the old body field's data manually if you want to tidy it up.");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
