import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Override via studio/.env if needed (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "7kmzwj0g";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "cpr-rwanda",
  title: "CPR Rwanda",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },

  // Show News Posts first, newest first, so staff see the latest at a glance.
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        S.listItem()
          .title("News & Announcements")
          .id("newsPosts")
          .schemaType("newsPost")
          .child(
            S.documentList()
              .title("News & Announcements")
              .schemaType("newsPost")
              .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
          ),
        ...S.documentTypeListItems(),
      ]),
});
