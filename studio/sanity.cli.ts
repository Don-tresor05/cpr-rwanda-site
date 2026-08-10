import { defineCliConfig } from "sanity/cli";

// NOTE: the Sanity CLI evaluates this file BEFORE .env is loaded, so we must
// not throw here (that would break `sanity dev`/`sanity deploy`). Pass the
// env vars through — when they're missing, the CLI prompts interactively.
// The strict "fail loudly" guard lives in sanity.config.ts, where Vite has
// already loaded studio/.env.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
});
