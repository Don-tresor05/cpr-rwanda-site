import { defineType, defineField } from "sanity";
import { localizedArticleBodyFields } from "./localizedArticleBody";

/**
 * One past activity or milestone shown in the "Activities & Milestones"
 * timeline on a department's detail page (/departments/:deptId/resources),
 * between the overview and the resource cards. Staff add one document per
 * activity; newest first, matching the News Post cards elsewhere on the
 * site. Titles and summaries are localized; leaving French/Kinyarwanda
 * empty falls back to English.
 */
export const departmentActivity = defineType({
  name: "departmentActivity",
  title: "Department Activity",
  type: "document",
  groups: [
    { name: "main", title: "Main" },
    { name: "body", title: "Article Body" },
  ],
  fields: [
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "General Secretary", value: "gs" },
          { title: "Education / BNEP", value: "bnep" },
          { title: "Diakonia / Development", value: "diakonia" },
          { title: "Finance & Mobilization", value: "finance" },
          { title: "Youth Program", value: "youth" },
          { title: "Gender Promotion", value: "gender" },
          { title: "Radio Inkoramutima", value: "radio" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      group: "main",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      group: "main",
      description: "Auto-generated from the English title — leave as is.",
      options: {
        source: (doc) => {
          const t = doc.title as
            | { en?: string; fr?: string; rw?: string }
            | undefined;
          return t?.en || t?.fr || t?.rw || "activity";
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author / Byline",
      type: "string",
      group: "main",
      description: "e.g. CPR Secretariat, BNEP Department",
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Controls sort order (newest first) and the date shown on the card.",
      type: "datetime",
      group: "main",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "periodLabel",
      title: "Period label (optional)",
      description: 'Overrides the displayed date with a custom range, e.g. "Q1 2026" or "2019 – 2021". Leave empty to show the Date above instead.',
      type: "string",
      group: "main",
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "localizedText",
      group: "main",
      description: "One or two sentences shown on the activity card.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      group: "main",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageCaption",
      title: "Cover image caption",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "quote",
      title: "Pull quote",
      type: "localizedString",
      group: "body",
      description: "Optional — a highlighted quotation shown in the article.",
    }),
    ...localizedArticleBodyFields("body"),
  ],
  preview: {
    select: { title: "title.en", department: "department", date: "date", media: "image" },
    prepare({ title, department, date, media }) {
      return {
        title: title || "Untitled activity",
        subtitle: [department, date ? new Date(date).toDateString() : undefined].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
