import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const sha = process.env.GITHUB_SHA;
if (!/^[a-f0-9]{40}$/.test(sha ?? '')) throw new Error('GITHUB_SHA must be a full commit SHA');
let html = await readFile('dist/index.html', 'utf8');
if (html.includes('/cpr/')) throw new Error('Build still uses the /cpr base');
const paths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(m => m[1]);
if (!paths.some(p => p.endsWith('.js')) || !paths.some(p => p.endsWith('.css'))) {
  throw new Error('Expected root-relative Vite JS and CSS in dist/index.html');
}
const files = {};
for (const path of paths) {
  files[path] = createHash('sha256').update(await readFile(`dist${path}`)).digest('hex');
}
html = html.replace('</head>', `<meta name="cpr-release" content="${sha}">\n  </head>`);
await writeFile('dist/index.html', html);
await writeFile('dist/deployment.json', JSON.stringify({ sha, files }, null, 2) + '\n');
console.log(`Stamped release ${sha}`);
