import { defineType, defineField } from "sanity";

/**
 * The hero, overview, key-activities and department-head copy on one
 * department's detail page (/departments/:deptId/resources) — the page a
 * visitor lands on after clicking "Learn More" from the Departments page.
 * One document per department. The resource cards and the activity/
 * milestone timeline on that same page are managed separately, under
 * Department Resource Groups/Files and Department Activities. Everything
 * is localized; empty languages fall back to English on the website.
 */
export const departmentDetail = defineType({
  name: "departmentDetail",
  title: "Department Detail Page",
  type: "document",
  groups: [
    { name: "main", title: "Main" },
    { name: "body", title: "Full Article" },
    { name: "head", title: "Department Head" },
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
      description: "Shown as the big hero heading and next to the overview photo.",
      type: "localizedString",
      group: "main",
    }),
    defineField({
      name: "image",
      title: "Photo",
      description: "Used as both the hero background and the overview photo card. Leave empty to keep the current default photo.",
      type: "image",
      options: { hotspot: true },
      group: "main",
    }),
    defineField({
      name: "overview",
      title: "Overview paragraph (short version)",
      description:
        'A single short paragraph under "About <Department>". Only used when "Full Article" below is empty — fill in the Full Article tab instead for a longer, multi-paragraph write-up with headings and lists, like epr.rw.',
      type: "localizedText",
      group: "main",
    }),
    defineField({
      name: "keyActivities",
      title: "Key activities (short version)",
      description:
        'A simple checklist shown under "Key Activities", right after the short Overview paragraph above. Only used when "Full Article" below is empty — for a richer write-up, list activities as a bullet list inside the Full Article text instead.',
      type: "array",
      of: [{ type: "localizedString" }],
      group: "main",
    }),
    defineField({
      name: "body",
      title: "Full Article",
      description:
        "The complete department write-up — as many paragraphs, headings and bullet lists as you need, like the article on epr.rw. When this has content it replaces the short Overview paragraph and Key Activities checklist above. Leave empty to keep using those simpler fields instead.",
      type: "object",
      group: "body",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt text" },
                { name: "caption", type: "string", title: "Caption" },
                {
                  name: "size",
                  type: "string",
                  title: "Size",
                  options: {
                    list: [
                      { title: "Full width", value: "full" },
                      { title: "Small (portrait)", value: "small" },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          name: "fr",
          title: "Français",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt text" },
                { name: "caption", type: "string", title: "Caption" },
                {
                  name: "size",
                  type: "string",
                  title: "Size",
                  options: {
                    list: [
                      { title: "Full width", value: "full" },
                      { title: "Small (portrait)", value: "small" },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          name: "rw",
          title: "Kinyarwanda",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt text" },
                { name: "caption", type: "string", title: "Caption" },
                {
                  name: "size",
                  type: "string",
                  title: "Size",
                  options: {
                    list: [
                      { title: "Full width", value: "full" },
                      { title: "Small (portrait)", value: "small" },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "headName",
      title: "Full name",
      description: "Not localized — shown the same in every language. Leave empty to hide the Department Head card.",
      type: "string",
      group: "head",
    }),
    defineField({
      name: "headRole",
      title: "Role / Title",
      description: 'e.g. "Head of Department", "Coordinator".',
      type: "localizedString",
      group: "head",
    }),
    defineField({
      name: "headPhoto",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      group: "head",
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
