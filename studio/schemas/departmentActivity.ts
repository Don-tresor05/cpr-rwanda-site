import { defineType, defineField } from "sanity";

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
  fields: [
    defineField({
      name: "department",
      title: "Department",
      type: "string",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Controls sort order (newest first) and the date shown on the card.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "periodLabel",
      title: "Period label (optional)",
      description: 'Overrides the displayed date with a custom range, e.g. "Q1 2026" or "2019 – 2021". Leave empty to show the Date above instead.',
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "localizedText",
      description: "One or two sentences shown on the activity card.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
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
