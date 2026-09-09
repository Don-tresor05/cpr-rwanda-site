import { defineType, defineField } from "sanity";

/** Icon choices that match the icons the site renders for each project. */
const PROJECT_ICONS = [
  { title: "Briefcase — Capacity Building", value: "briefcase" },
  { title: "Heart — Trauma Healing", value: "heart" },
];

/**
 * A featured project shown on the home page. All text is localized
 * (EN/FR/RW); the `order` field controls the display position and `icon`
 * picks the card icon. Highlights are one bullet point per array row.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first on the home page. Use 1, 2, 3…",
      type: "number",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: PROJECT_ICONS },
    }),
    defineField({
      name: "title",
      title: "Project title",
      type: "localizedString",
    }),
    defineField({
      name: "period",
      title: "Period",
      description: "e.g. 2019 — 2022 or Ongoing",
      type: "localizedString",
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "highlights",
      title: "Key highlights",
      description: "Add one bullet point per row; each can be translated into the three languages.",
      type: "array",
      of: [{ type: "localizedText" }],
    }),
  ],
  preview: {
    select: { title: "title.en", order: "order" },
    prepare({ title, order }) {
      return {
        title: title || "Untitled project",
        subtitle:
          order !== undefined && order !== null ? `Position ${order}` : undefined,
      };
    },
  },
});
