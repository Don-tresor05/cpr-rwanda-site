import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

const expected = JSON.parse(await readFile('dist/deployment.json', 'utf8'));
const origin = process.env.SITE_URL || 'https://cpr-rwanda.rw';
const marker = `<meta name="cpr-release" content="${expected.sha}">`;
async function get(path, redirect = 'follow') {
  const url = new URL(path, origin);
  url.searchParams.set('release_check', `${expected.sha}-${Date.now()}`);
  return fetch(url, { redirect, headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(20000) });
}

async function verify() {
  // Check the actual homepage and a deep route, not only a marker file.
  for (const path of ['/', '/about']) {
    const response = await get(path);
    if (!response.ok || !(await response.text()).includes(marker)) {
      throw new Error(`${path} does not serve release ${expected.sha}; check FTP directory and server cache`);
    }
  }
  for (const [path, hash] of Object.entries(expected.files)) {
    const response = await get(path);
    const actual = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
    if (!response.ok || actual !== hash) throw new Error(`Deployed asset mismatch: ${path}`);
  }
  const legacy = await get('/cpr/about?source=legacy', 'manual');
  const target = new URL(legacy.headers.get('location') || '/', origin);
  if (legacy.status !== 308 || target.pathname !== '/about' || target.searchParams.get('source') !== 'legacy') {
    throw new Error('Legacy /cpr links are not redirecting correctly');
  }
  const logo = await get('/assets/logo-1.jpg');
  if (!logo.ok || !logo.headers.get('content-type')?.startsWith('image/')) throw new Error('Root logo is not served as an image');
  // GET checks the PHP endpoint without submitting a form or sending email.
  const contact = await get('/contact.php');
  if (contact.status !== 405 || (await contact.json()).error !== 'Method not allowed') throw new Error('Root contact.php is not executing correctly');
}

let verified = false;
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    await verify();
    console.log(`Verified public release ${expected.sha}, bundles, routing, logo, and PHP endpoint`);
    verified = true;
    break;
  } catch (error) {
    console.error(`Attempt ${attempt}: ${error.message}`);
    if (attempt < 6) await delay(10000);
  }
}
if (!verified) process.exitCode = 1;
