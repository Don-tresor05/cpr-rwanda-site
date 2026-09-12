/**
 * One-time merge migration: 7kmzwj0g (rich dataset) → 2bpoen39 (org project).
 *
 * ADDITIVE ONLY: copies documents that are MISSING in the target, matched by
 * natural keys (slug / english title / name). Never overwrites existing target
 * docs. Re-uploads every referenced image/file asset into the target project
 * and remaps references.
 *
 * Auth: run `npx sanity login` (as cprrwanda@gmail.com) first — the target
 * project belongs to the CPR org. The CLI session token is used for writes.
 * The source project is public and needs no token.
 *
 * Usage: node scripts/migrate-to-org-project.mjs
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@sanity/client";

const SOURCE = { projectId: "7kmzwj0g", dataset: "production" };
const TARGET = { projectId: "2bpoen39", dataset: "production" };
const API_VERSION = "2024-01-01";

const source = createClient({ ...SOURCE, apiVersion: API_VERSION, useCdn: true });

function readCliToken() {
  for (const file of [
    path.join(os.homedir(), ".config/sanity/config.json"),
    path.join(os.homedir(), ".sanity/config.json"),
  ]) {
    try {
      const cfg = JSON.parse(fs.readFileSync(file, "utf8"));
      const token = cfg.authToken || cfg.token || (cfg.auth && cfg.auth.token);
      if (token) return token;
    } catch { /* next */ }
  }
  throw new Error("No CLI token found. Run `npx sanity login` first.");
}

const target = createClient({
  ...TARGET,
  apiVersion: API_VERSION,
  useCdn: false,
  token: readCliToken(),
});

// english text extractor for localized-string fields
const en = (v) =>
  v && typeof v === "object" && !Array.isArray(v) && typeof v.en === "string"
    ? v.en.trim().toLowerCase()
    : typeof v === "string"
      ? v.trim().toLowerCase()
      : "";

const stats = { docs: 0, skipped: 0, assets: 0 };
const assetMap = new Map();

function collectAssetRefs(node, refs = []) {
  if (Array.isArray(node)) node.forEach((n) => collectAssetRefs(n, refs));
  else if (node && typeof node === "object") {
    if (
      node._type === "reference" &&
      typeof node._ref === "string" &&
      (node._ref.startsWith("image-") || node._ref.startsWith("file-"))
    )
      refs.push(node._ref);
    Object.values(node).forEach((n) => collectAssetRefs(n, refs));
  }
  return refs;
}

function remapAssetRefs(node) {
  if (Array.isArray(node)) return node.map(remapAssetRefs);
  if (node && typeof node === "object") {
    if (node._type === "reference" && assetMap.has(node._ref))
      return { ...node, _ref: assetMap.get(node._ref) };
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = remapAssetRefs(v);
    return out;
  }
  return node;
}

function assetUrl(ref) {
  // image-<hash>-<WxH>-<ext> → images/<hash>-<WxH>.<ext>
  // file-<hash>-<ext>        → files/<hash>.<ext>
  const kind = ref.startsWith("image-") ? "images" : "files";
  const body = ref.slice(ref.indexOf("-") + 1);
  const lastDash = body.lastIndexOf("-");
  return `https://cdn.sanity.io/${kind}/${SOURCE.projectId}/${SOURCE.dataset}/${body.slice(0, lastDash)}.${body.slice(lastDash + 1)}`;
}

async function migrateAsset(ref) {
  if (assetMap.has(ref)) return;
  const res = await fetch(assetUrl(ref));
  if (!res.ok) throw new Error(`asset download failed (${res.status}): ${ref}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const uploaded = await target.assets.upload(
    ref.startsWith("image-") ? "image" : "file",
    buffer,
    { filename: `migrated-${ref}` }
  );
  assetMap.set(ref, uploaded._id);
  stats.assets += 1;
  console.log(`    asset → ${uploaded._id}`);
}

async function copyMissing({
  label,
  sourceQuery,
  targetKeyQuery,
  keyOf,
  transform = (d) => d,
}) {
  const srcDocs = await source.fetch(sourceQuery);
  const tKeys = new Set(
    (await target.fetch(targetKeyQuery)).map(keyOf)
  );
  console.log(`\n== ${label}: ${srcDocs.length} in source =========`);
  for (const doc of srcDocs) {
    const key = keyOf(doc);
    if (!key || tKeys.has(key)) {
      stats.skipped += 1;
      console.log(`  = skip (exists): ${key || doc._id}`);
      continue;
    }
    const { _rev, ...clean } = doc;
    for (const ref of collectAssetRefs(clean)) await migrateAsset(ref);
    await target.createOrReplace({ ...remapAssetRefs(clean), _type: doc._type });
    tKeys.add(key);
    stats.docs += 1;
    console.log(`  ✓ copied: ${key}`);
  }
}

async function main() {
  console.log(`Merging ${SOURCE.projectId} → ${TARGET.projectId} (additive only)\n`);

  // 1. News posts — key: english title
  await copyMissing({
    label: "newsPost",
    sourceQuery: `*[_type=="newsPost"]`,
    targetKeyQuery: `*[_type=="newsPost"]{t: title}`,
    keyOf: (d) => en(d.title),
  });

  // 2. Radio programs — key: english title
  await copyMissing({
    label: "radioProgram",
    sourceQuery: `*[_type=="radioProgram"]`,
    targetKeyQuery: `*[_type=="radioProgram"]{t: title}`,
    keyOf: (d) => en(d.title),
  });

  // 3. Gallery events — key: english title
  await copyMissing({
    label: "galleryEvent",
    sourceQuery: `*[_type=="galleryEvent"]`,
    targetKeyQuery: `*[_type=="galleryEvent"]{t: title}`,
    keyOf: (d) => en(d.title),
  });

  // 4. Resource groups — key: slug
  await copyMissing({
    label: "departmentResourceGroup",
    sourceQuery: `*[_type=="departmentResourceGroup"]`,
    targetKeyQuery: `*[_type=="departmentResourceGroup"]{t: slug.current}`,
    keyOf: (d) => d.slug?.current,
  });

  // 5. Resource files — key: group slug + english title (needs group deref)
  const srcFiles = await source.fetch(
    `*[_type=="departmentResourceFile"]{..., "gs": group->slug.current}`
  );
  const tFileKeys = new Set(
    (
      await target.fetch(
        `*[_type=="departmentResourceFile"]{t: title, "gs": group->slug.current}`
      )
    ).map((f) => `${f.gs}::${en(f.t)}`)
  );
  // map: group slug -> ACTUAL target group _id (pre-existing or newly copied)
  const targetGroupIdBySlug = {};
  for (const g of await target.fetch(
    `*[_type=="departmentResourceGroup"]{_id, "s": slug.current}`
  ))
    targetGroupIdBySlug[g.s] = g._id;
  console.log(`\n== departmentResourceFile: ${srcFiles.length} in source ========`);
  for (const f of srcFiles) {
    const key = `${f.gs}::${en(f.title)}`;
    if (tFileKeys.has(key)) {
      stats.skipped += 1;
      console.log(`  = skip (exists): ${key}`);
      continue;
    }
    const { _rev, ...clean } = f;
    for (const ref of collectAssetRefs(clean)) await migrateAsset(ref);
    const remapped = remapAssetRefs(clean);
    if (f.gs && targetGroupIdBySlug[f.gs]) {
      remapped.group = { _type: "reference", _ref: targetGroupIdBySlug[f.gs] };
    } else {
      console.log(`    ! warning: no target group for slug "${f.gs}" — reference kept as-is`);
    }
    await target.createOrReplace({ ...remapped, _type: "departmentResourceFile" });
    tFileKeys.add(key);
    stats.docs += 1;
    console.log(`  ✓ copied: ${key}`);
  }

  // 6. Member churches — key: english name/title (schema varies)
  await copyMissing({
    label: "memberChurch",
    sourceQuery: `*[_type=="memberChurch"]`,
    targetKeyQuery: `*[_type=="memberChurch"]{t: coalesce(name, title)}`,
    keyOf: (d) => en(d.name ?? d.title),
  });

  console.log(
    `\nDone: ${stats.docs} docs copied, ${stats.assets} assets uploaded, ${stats.skipped} skipped (already present).`
  );
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
