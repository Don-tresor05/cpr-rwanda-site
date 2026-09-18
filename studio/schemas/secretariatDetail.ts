import { defineType, defineField } from "sanity";
import { localizedArticleBodyFields } from "./localizedArticleBody";

/** The fixed Secretariat section keys — matches secretariatPage.ts. */
const SECTION_KEYS = [
  { title: "SG Office", value: "sg" },
  { title: "CPR Events", value: "events" },
  { title: "CPR Meetings", value: "meetings" },
  { title: "Advocacy", value: "advocacy" },
  { title: "Sustainability", value: "sustainability" },
  { title: "Publications", value: "publications" },
];

/**
 * The hero, overview, key-activities and section-head copy on one
 * Secretariat section's detail page (/secretariat/:sectionId/resources) —
 * the page a visitor lands on after clicking through from the Secretariat
 * page. One document per section. The resource cards and the activity/
 * milestone timeline on that same page are managed separately, under
 * Secretariat Resource Groups/Files and Secretariat Activities. Everything
 * is localized; empty languages fall back to English on the website.
 */
export const secretariatDetail = defineType({
  name: "secretariatDetail",
  title: "Secretariat Detail Page",
  type: "document",
  groups: [
    { name: "main", title: "Main" },
    { name: "body", title: "Full Article" },
    { name: "head", title: "Section Head" },
  ],
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      group: "main",
      options: { list: SECTION_KEYS },
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
        'A single short paragraph under "About <Section>". Only used when "Full Article" below is empty — fill in the Full Article tab instead for a longer, multi-paragraph write-up with headings and lists.',
      type: "localizedText",
      group: "main",
    }),
    defineField({
      name: "keyActivities",
      title: "Key focus areas (short version)",
      description:
        'A simple checklist shown under "Key Focus Areas", right after the short Overview paragraph above. Only used when "Full Article" below is empty — for a richer write-up, list activities as a bullet list inside the Full Article text instead.',
      type: "array",
      of: [{ type: "localizedString" }],
      group: "main",
    }),
    ...localizedArticleBodyFields(
      "body",
      "Full Article",
      "The complete section write-up — as many paragraphs, headings and bullet lists as you need. When the English one has content it replaces the short Overview paragraph and Key Focus Areas checklist above. Leave empty to keep using those simpler fields instead.",
    ),
    defineField({
      name: "headName",
      title: "Full name",
      description: "Not localized — shown the same in every language. Leave empty to hide the Section Head card.",
      type: "string",
      group: "head",
    }),
    defineField({
      name: "headRole",
      title: "Role / Title",
      description: 'e.g. "Head of Section", "Coordinator".',
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
    select: { title: "title.en", section: "section" },
    prepare({ title, section }) {
      return {
        title: title || (section ? `Section: ${section}` : "Untitled section detail"),
        subtitle: section ? `section = ${section}` : "No section key set",
      };
    },
  },
});
