import { defineType, defineField } from "sanity";

/** The fixed department section keys the /departments page renders. */
const SECTION_KEYS = [
  { title: "General Secretary", value: "gs" },
  { title: "Education / BNEP", value: "bnep" },
  { title: "Diakonia / Development", value: "diakonia" },
  { title: "Finance & Mobilization", value: "finance" },
  { title: "Youth Program", value: "youth" },
  { title: "Gender Promotion", value: "gender" },
  { title: "Radio Inkoramutima", value: "radio" },
];

/**
 * One document that controls the deep text on the Departments page
 * (/departments): hero, intro, quick facts, the sub-navigation labels,
 * every department's detailed section (tag, title, description, body
 * bullets) and the closing call-to-action. Everything is localized;
 * empty languages fall back to English on the website.
 */
export const departmentsPage = defineType({
  name: "departmentsPage",
  title: "Departments Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero & Intro" },
    { name: "quickFacts", title: "Quick Facts" },
    { name: "sections", title: "Department Sections" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroDesc",
      title: "Hero description",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "introTag",
      title: "Intro tag",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "introTitle",
      title: "Intro title",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "introDesc",
      title: "Intro description",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "quickFactsTitle",
      title: "Quick facts heading",
      type: "localizedString",
      group: "quickFacts",
    }),
    defineField({
      name: "quickFacts",
      title: "Quick facts",
      description: "The bullet list shown next to the intro (e.g. '7 specialized departments serving all provinces').",
      type: "array",
      group: "quickFacts",
      of: [{ type: "localizedText" }],
    }),
    defineField({
      name: "sections",
      title: "Department sections",
      description:
        "One entry per department. Pick the department key, then fill its sub-navigation label, tag, title, description and body bullets.",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          name: "departmentSection",
          title: "Department section",
          fields: [
            {
              name: "key",
              title: "Department",
              type: "string",
              options: { list: SECTION_KEYS },
              validation: (Rule) => Rule.required(),
            },
            { name: "nav", title: "Sub-navigation label", type: "localizedString" },
            { name: "tag", title: "Tag (small label)", type: "localizedString" },
            { name: "title", title: "Title", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            {
              name: "image",
              title: "Photo",
              description: "The large photo beside this department's section. Leave empty to keep the current default photo.",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "stats",
              title: "Stat numbers",
              description: "Up to 3 key numbers shown as mini-cards (e.g. value '595+', label 'Primary Schools'). Leave empty to keep the current numbers.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "departmentStat",
                  title: "Stat",
                  fields: [
                    {
                      name: "value",
                      title: "Value",
                      description: "e.g. 595+, 300K+, 1963",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    { name: "label", title: "Label", type: "localizedString" },
                  ],
                  preview: {
                    select: { value: "value", label: "label.en" },
                    prepare({ value, label }) {
                      return { title: value || "Stat", subtitle: label || "" };
                    },
                  },
                },
              ],
            },
            {
              name: "body",
              title: "Body bullets",
              type: "array",
              of: [{ type: "localizedText" }],
            },
          ],
          preview: {
            select: { key: "key", title: "title.en" },
            prepare({ key, title }) {
              return { title: title || (key || "Department") };
            },
          },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      group: "cta",
      fields: [
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        { name: "btn", title: "Button text", type: "localizedString" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Departments Page",
        subtitle: "Hero, quick facts, department sections & CTA",
      };
    },
  },
});
