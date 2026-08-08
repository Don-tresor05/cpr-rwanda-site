import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "7kmzwj0g",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
