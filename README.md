# CPR Rwanda — Website + Sanity CMS

React + TypeScript + Vite SPA with a Sanity headless CMS. This is a **multi-developer** repo — every developer uses **their own Sanity project**, and no Sanity credentials are committed to git.

## Sanity setup (every developer)

1. **Create your own Sanity project** at [manage.sanity.io](https://manage.sanity.io) (free tier is fine).
2. From the project dashboard, copy your **Project ID** and **Dataset** name (e.g. `production`, `dev`, or `dev2`).
3. Copy the env templates and fill in **your** values:

   ```bash
   # Front-end (site reads from your project)
   cp .env.example .env
   # edit .env → set VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET

   # Studio (the content editor connects to your project)
   cp studio/.env.example studio/.env
   # edit studio/.env → set SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET
   ```

4. `.env` files are gitignored — they **never** get pushed. Never commit them.
5. Log in to the CLI with your own account: `cd studio && pnpm sanity login`.

> If you don't set your own env vars, the app will **fail loudly** with a clear error instead of silently connecting to someone else's project.

## Development

```bash
pnpm install
pnpm dev        # site → http://localhost:5173

cd studio
pnpm install
pnpm dev        # CMS editor → http://localhost:3333
```

## Deployments

- **Vercel / cPanel**: set the same `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET` as **build-time environment variables** in the hosting dashboard — they are no longer baked into the code.
- **Studio**: `cd studio && pnpm deploy` after configuring `studio/.env`.

---

## Original Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
