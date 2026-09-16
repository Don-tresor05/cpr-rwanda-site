import { defineType, defineField } from "sanity";

/** The fixed section keys the /secretariat page renders. */
const SECTION_KEYS = [
  { title: "SG Office", value: "sg" },
  { title: "CPR Events", value: "events" },
  { title: "CPR Meetings", value: "meetings" },
  { title: "Advocacy", value: "advocacy" },
  { title: "Sustainability", value: "sustainability" },
  { title: "Publications", value: "publications" },
];

/**
 * One document that controls the deep copy on the Secretariat page:
 * hero, intro, the Secretary General profile, the six sub-sections
 * (SG office, events, meetings, advocacy, sustainability, publications)
 * and the closing call-to-action. Everything is localized; empty
 * languages fall back to English on the website.
 */
export const secretariatPage = defineType({
  name: "secretariatPage",
  title: "Secretariat Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero & Intro" },
    { name: "sgProfile", title: "Secretary General" },
    { name: "sections", title: "Sections" },
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
      name: "heroImage",
      title: "Hero background image",
      description: "The full-width background photo behind the hero title. Falls back to the current default if left empty.",
      type: "image",
      options: { hotspot: true },
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
      name: "sgProfile",
      title: "Secretary General profile",
      type: "object",
      group: "sgProfile",
      fields: [
        { name: "role", title: "Role tag", type: "localizedString" },
        { name: "name", title: "Name", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "quote", title: "Quote", type: "localizedText" },
        {
          name: "photo",
          title: "Profile photo",
          description: "The Secretary General's portrait. Falls back to the current photo if left empty.",
          type: "image",
          options: { hotspot: true },
        },
        { name: "photoAlt", title: "Photo alt text", type: "localizedString" },
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "One entry per section. Pick the section key, then fill its sub-navigation label, tag, title, description and body bullets.",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          name: "secretariatSection",
          title: "Secretariat section",
          fields: [
            {
              name: "key",
              title: "Section",
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
              description: "The large photo beside this section. Leave empty to keep the current default photo.",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "stats",
              title: "Stat numbers",
              description: "Up to 3 key numbers shown as mini-cards (e.g. value '28', label 'Members'). Leave empty to keep the current numbers.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "secretariatStat",
                  title: "Stat",
                  fields: [
                    {
                      name: "value",
                      title: "Value",
                      description: "e.g. 28, 50+, 60+",
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
              return { title: title || (key || "Section") };
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
        {
          name: "contact",
          title: "Contact details",
          description:
            "Shown in the Secretary General card and the closing CTA. Leave empty to use the global Site Settings contact details.",
          type: "object",
          fields: [
            {
              name: "phone",
              title: "Phone",
              type: "string",
              initialValue: "+250 788 314 718",
            },
            {
              name: "email",
              title: "Email",
              type: "string",
              initialValue: "cprgs@cpr-rwanda.rw",
            },
            {
              name: "addressLine1",
              title: "Address line 1",
              type: "string",
              initialValue: "KG 2 Av 4, B.P 79",
            },
            {
              name: "addressLine2",
              title: "Address line 2",
              type: "string",
              initialValue: "Kigali, Rwanda",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Secretariat Page",
        subtitle: "Hero, SG profile, sections & CTA",
      };
    },
  },
});
