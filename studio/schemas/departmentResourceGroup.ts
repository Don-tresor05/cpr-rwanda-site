import { defineType, defineField } from "sanity";

/**
 * A resource "folder" shown as a card on a department's Resources page
 * (e.g. "School Directory", "Past Papers"). Staff can create new groups
 * here without any code changes — they appear automatically as cards.
 */
export const departmentResourceGroup = defineType({
  name: "departmentResourceGroup",
  title: "Department Resource Group",
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
      title: "Group title",
      type: "string",
      description: "e.g. 'Past Papers', 'School Directory', 'Annual Reports'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Short blurb shown on the resource card.",
    }),
    defineField({
      name: "cardType",
      title: "Card type",
      type: "string",
      description: "Controls the icon/label on the card.",
      options: {
        list: [
          { title: "Document (View)", value: "document" },
          { title: "Download", value: "download" },
          { title: "External link", value: "link" },
        ],
      },
      initialValue: "document",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "department" },
  },
});
