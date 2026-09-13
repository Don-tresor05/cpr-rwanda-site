import { defineType, defineField } from "sanity";

/**
 * The hero, overview and key-activities copy on one department's detail
 * page (/departments/:deptId/resources) — the page a visitor lands on
 * after clicking "Learn More" from the Departments page. One document per
 * department. The resource cards on that same page are managed separately
 * under Department Resource Groups/Files. Everything is localized; empty
 * languages fall back to English on the website.
 */
export const departmentDetail = defineType({
  name: "departmentDetail",
  title: "Department Detail Page",
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
      description: "Shown as the big hero heading and next to the overview photo.",
      type: "localizedString",
    }),
    defineField({
      name: "image",
      title: "Photo",
      description: "Used as both the hero background and the overview photo card. Leave empty to keep the current default photo.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "Overview paragraph",
      description: 'The description under "About <Department>".',
      type: "localizedText",
    }),
    defineField({
      name: "keyActivities",
      title: "Key activities",
      description: "The checklist of bullet points under Key Activities.",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
  preview: {
    select: { title: "title.en", department: "department" },
    prepare({ title, department }) {
      return {
        title: title || (department ? `Department: ${department}` : "Untitled department detail"),
        subtitle: department ? `department = ${department}` : "No department key set",
      };
    },
  },
});
