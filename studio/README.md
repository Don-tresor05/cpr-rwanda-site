# CPR Rwanda — Sanity Studio (content editor)

This folder is the **editor** that CPR staff use to publish news and
announcements to the website. It is completely separate from the website build
(Vercel ignores this folder).

## What staff can edit

- **News & Announcements** — headline, category, publish date, author, cover
  image, summary, rich article body, pull quote — all in **English, Français
  and Kinyarwanda**. Leaving a language empty falls back to English.

Published posts appear instantly on the website (Newsroom page, home page news
section, and the article's own page). No code or redeploy needed.

## Test everything locally (no deploy needed)

1. **Let the website read the CMS** (one time, from this folder — needs `sanity login` first):

   ```bash
   cd studio
   pnpm install --ignore-workspace
   pnpm sanity login
   pnpm cors:add http://localhost:5173 --no-credentials   # dev website
   pnpm cors:add https://cpr-rwanda.vercel.app --no-credentials   # production
   ```

   (Or do it in the dashboard: project → Settings → API settings → CORS Origins.)
   `http://localhost:3333` is already allowed by default for the Studio itself.

2. **Start the editor** (terminal 1):

   ```bash
   cd studio && pnpm dev   # opens http://localhost:3333
   ```

3. **Start the website** (terminal 2, from the project root):

   ```bash
   pnpm dev   # opens http://localhost:5173
   ```

4. Write a post in the Studio, hit **Publish**, then reload the website — the post
   appears on the Newsroom page instantly. Posts published from the local editor
   go to the real project, so remember to delete test posts when done.

## Deploying the editor (one time)

```bash
cd studio
pnpm install --ignore-workspace
pnpm sanity login   # browser sign-in to the Sanity account
pnpm deploy         # publishes the editor to https://cpr-rwanda.sanity.studio
```

## Deploying the editor (one time)

```bash
cd studio
pnpm install --ignore-workspace
pnpm sanity login   # browser sign-in to the Sanity account
pnpm deploy         # publishes the editor to https://cpr-rwanda.sanity.studio
```

After deploying, staff can open that URL and sign in. To give CPR colleagues
access, add them under **Sanity → Manage → Members**.

## Re-deploying after schema changes

If the content schema ever changes, run `pnpm deploy` again from `studio/`.
