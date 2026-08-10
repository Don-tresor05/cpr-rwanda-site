import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Each developer uses their OWN Sanity project. Copy studio/.env.example to
// studio/.env and set SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Sanity Studio is not configured. Copy studio/.env.example to studio/.env and set " +
      "SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET (use your own Sanity project)."
  );
}

export default defineConfig({
  name: "cpr-rwanda",
  title: "CPR Rwanda",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },

  // Show News Posts first, newest first, so staff see the latest at a glance.
  structure: (S: StructureBuilder) =>
    S.list()
      .title("Content")
      .items([
        S.listItem()
          .title("Site Settings")
          .id("siteSettings")
          .schemaType("siteSettings")
          .child(
            S.editor()
              .id("siteSettings")
              .schemaType("siteSettings")
              .title("Site Settings")
          ),
        // Page editors — one document per page, controlling the deep text.
        S.listItem()
          .title("Departments Page")
          .id("departmentsPage")
          .schemaType("departmentsPage")
          .child(
            S.editor()
              .id("departmentsPage")
              .schemaType("departmentsPage")
              .title("Departments Page")
          ),
        S.listItem()
          .title("About Page")
          .id("aboutPage")
          .schemaType("aboutPage")
          .child(
            S.editor()
              .id("aboutPage")
              .schemaType("aboutPage")
              .title("About Page")
          ),
        S.listItem()
          .title("Secretariat Page")
          .id("secretariatPage")
          .schemaType("secretariatPage")
          .child(
            S.editor()
              .id("secretariatPage")
              .schemaType("secretariatPage")
              .title("Secretariat Page")
          ),
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
        S.listItem()
          .title("Member Churches")
          .id("memberChurches")
          .schemaType("memberChurch")
          .child(
            S.documentList()
              .title("Member Churches")
              .schemaType("memberChurch")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        S.listItem()
          .title("Departments")
          .id("departments")
          .schemaType("department")
          .child(
            S.documentList()
              .title("Departments")
              .schemaType("department")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        S.listItem()
          .title("Gallery Collections")
          .id("galleryEvents")
          .schemaType("galleryEvent")
          .child(
            S.documentList()
              .title("Gallery Collections")
              .schemaType("galleryEvent")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        S.listItem()
          .title("Radio Programs")
          .id("radioPrograms")
          .schemaType("radioProgram")
          .child(
            S.documentList()
              .title("Radio Programs")
              .schemaType("radioProgram")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        S.listItem()
          .title("Testimonials")
          .id("testimonials")
          .schemaType("testimonial")
          .child(
            S.documentList()
              .title("Testimonials")
              .schemaType("testimonial")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        S.listItem()
          .title("Projects")
          .id("projects")
          .schemaType("project")
          .child(
            S.documentList()
              .title("Projects")
              .schemaType("project")
              .defaultOrdering([{ field: "order", direction: "asc" }])
          ),
        ...S.documentTypeListItems(),
      ]),
});
