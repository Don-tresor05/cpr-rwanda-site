/**
 * One-time consolidation script: copy the docs that exist only in the OLD
 * Sanity project (2bpoen39, owned by cprrwanda@gmail.com's org) into the
 * single target project (7kmzwj0g), so the team works in one place.
 *
 * Copies: boardMember, staffMember, partner, plus any departmentResourceGroup /
 * departmentResourceFile that does not already exist in the target (matched by
 * slug / title+group). Re-uploads every image/file asset so references resolve.
 *
 * Read from the old project is public (no token needed).
 * Writes to the target use the local Sanity CLI session token.
 *
 * Usage: node scripts/migrate-org-consolidation.mjs
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@sanity/client";

const SOURCE = { projectId: "2bpoen39", dataset: "production" };
const TARGET = { projectId: "7kmzwj0g", dataset: "production" };
const API_VERSION = "2024-01-01";

// ---- clients -------------------------------------------------------------
const source = createClient({ ...SOURCE, apiVersion: API_VERSION, useCdn: true });

function readCliToken() {
  const candidates = [
    path.join(os.homedir(), ".config/sanity/config.json"),
    path.join(os.homedir(), ".sanity/config.json"),
  ];
  for (const file of candidates) {
    try {
      const cfg = JSON.parse(fs.readFileSync(file, "utf8"));
      const token =
        cfg.authToken || cfg.token || (cfg.auth && cfg.auth.token);
      if (token) return token;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "No Sanity CLI token found. Run `npx sanity login` first (as an owner of project " +
      TARGET.projectId +
      ")."
  );
}

const target = createClient({
  ...TARGET,
  apiVersion: API_VERSION,
  useCdn: false,
  token: readCliToken(),
});

// ---- helpers -------------------------------------------------------------
const copied = { docs: 0, assets: 0 };
const assetMap = new Map(); // old asset ref -> new asset ref

/** Find every { _type: "reference", _ref } pointing at an image/file asset. */
function collectAssetRefs(node, refs = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectAssetRefs(child, refs));
  } else if (node && typeof node === "object") {
    if (
      node._type === "reference" &&
      typeof node._ref === "string" &&
      (node._ref.startsWith("image-") || node._ref.startsWith("file-"))
    ) {
      refs.push(node._ref);
    }
    Object.values(node).forEach((child) => collectAssetRefs(child, refs));
  }
  return refs;
}

/** Replace every asset reference using the migrated mapping. */
function remapAssetRefs(node) {
  if (Array.isArray(node)) return node.map(remapAssetRefs);
  if (node && typeof node === "object") {
    if (
      node._type === "reference" &&
      assetMap.has(node._ref)
    ) {
      return { ...node, _ref: assetMap.get(node._ref) };
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = remapAssetRefs(v);
    return out;
  }
  return node;
}

function assetUrl(ref) {
  // image-<hash>-<WxH>-<ext> → <hash>-<WxH>.<ext>
  // file-<hash>-<ext>        → <hash>.<ext>
  const kind = ref.startsWith("image-") ? "images" : "files";
  const body = ref.slice(ref.indexOf("-") + 1); // drop leading "image-"/"file-"
  const lastDash = body.lastIndexOf("-");
  const ext = body.slice(lastDash + 1);
  const filename = `${body.slice(0, lastDash)}.${ext}`;
  return `https://cdn.sanity.io/${kind}/${SOURCE.projectId}/${SOURCE.dataset}/${filename}`;
}

async function migrateAsset(ref) {
  if (assetMap.has(ref)) return;
  const url = assetUrl(ref);
  const ext = ref.split("-").pop();
  const kind = ref.startsWith("image-") ? "image" : "file";
  process.stdout.write(`  asset ${kind} ${ref} … `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed (${res.status}) ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const uploaded = await target.assets.upload(kind, buffer, {
    filename: `migrated-${ref}.${ext}`,
  });
  assetMap.set(ref, uploaded._id);
  copied.assets += 1;
  console.log(`→ ${uploaded._id}`);
}

// ---- main ----------------------------------------------------------------
async function main() {
  console.log(
    `Consolidating ${SOURCE.projectId} → ${TARGET.projectId} (dataset: ${TARGET.dataset})\n`
  );

  // 1. Plain document types: copy everything the target is missing.
  const types = ["boardMember", "staffMember", "partner"];
  for (const type of types) {
    const docs = await source.fetch(`*[_type == $type]`, { type });
    const existing = await target.fetch(`count(*[_type == $type])`, { type });
    console.log(
      `${type}: ${docs.length} in source, ${existing} already in target`
    );
    for (const doc of docs) {
      const { _rev, ...clean } = doc;
      for (const ref of collectAssetRefs(clean)) await migrateAsset(ref);
      await target.createOrReplace(remapAssetRefs(clean));
      copied.docs += 1;
      console.log(`  ✓ copied ${doc._type}: ${JSON.stringify(doc.title || doc.name || doc._id).slice(0, 80)}`);
    }
  }

  // 2. Resource groups: copy when the slug is not used in the target yet.
  const groups = await source.fetch(
    `*[_type == "departmentResourceGroup"]{ _id, _rev, title, slug, department, description, cardType, order }`
  );
  const targetSlugs = new Set(
    (
      await target.fetch(`*[_type == "departmentResourceGroup"]{ "s": slug.current }`)
    ).map((g) => g.s)
  );
  console.log(`departmentResourceGroup: ${groups.length} in source`);
  for (const g of groups) {
    if (targetSlugs.has(g.slug?.current)) {
      console.log(`  = skip (slug exists in target): ${g.slug?.current}`);
      continue;
    }
    const { _rev, ...clean } = g;
    await target.createOrReplace({ ...clean, _type: "departmentResourceGroup" });
    copied.docs += 1;
    console.log(`  ✓ copied group ${g.title} (${g.slug?.current})`);
  }

  // 3. Resource files: copy when (title + group slug) not already in target.
  const files = await source.fetch(
    `*[_type == "departmentResourceFile"]{ _id, _rev, title, "groupSlug": group->slug.current, group, file, order }`
  );
  const targetFiles = new Set(
    (
      await target.fetch(
        `*[_type == "departmentResourceFile"]{ "t": title, "g": group->slug.current }`
      )
    ).map((f) => `${f.t}::${f.g}`)
  );
  console.log(`departmentResourceFile: ${files.length} in source`);
  for (const f of files) {
    const key = `${f.title}::${f.groupSlug}`;
    if (targetFiles.has(key)) {
      console.log(`  = skip (exists in target): ${key}`);
      continue;
    }
    const { _rev, ...clean } = f;
    for (const ref of collectAssetRefs(clean)) await migrateAsset(ref);
    await target.createOrReplace({ ...clean, _type: "departmentResourceFile" });
    copied.docs += 1;
    console.log(`  ✓ copied file "${f.title}" → group ${f.groupSlug}`);
  }

  console.log(
    `\nDone: ${copied.docs} documents copied, ${copied.assets} assets re-uploaded.`
  );
  console.log(
    "Note: the new docs are published immediately (createOrReplace). Refresh the website to see them."
  );
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
