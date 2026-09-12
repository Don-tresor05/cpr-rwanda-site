import { defineType, defineField } from "sanity";

/**
 * One document that controls the deep copy on the Radio Inkoramutima page:
 * hero, the historical background, vision & mission, editorial line,
 * programs schedule intro, coverage & reach, beneficiaries and the closing
 * call-to-action. The programme schedule itself is a separate `radioProgram`
 * collection. Everything is localized; empty languages fall back to English
 * on the website.
 */
export const radioPage = defineType({
  name: "radioPage",
  title: "Radio Inkoramutima Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About / History" },
    { name: "vision", title: "Vision & Mission" },
    { name: "editorial", title: "Editorial Line" },
    { name: "programs", title: "Programs" },
    { name: "coverage", title: "Coverage & Reach" },
    { name: "beneficiaries", title: "Beneficiaries" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    defineField({
      name: "heroTag",
      title: "Hero badge text",
      description: 'The small pill above the hero title, e.g. "Radio Inkoramutima".',
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroDesc",
      title: "Hero description",
      description: "The subtitle shown under the hero title.",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero background image",
      description: "The full-width background photo behind the hero title. Falls back to the site default if left empty.",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroCta",
      title: 'Main button text ("Listen Live")',
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: 'Secondary button text ("About the Radio")',
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "nav",
      title: "Sub-navigation labels",
      description: "The pills in the sticky bar under the hero.",
      type: "object",
      group: "hero",
      fields: [
        { name: "about", title: "About Radio", type: "localizedString" },
        { name: "vision", title: "Vision & Mission", type: "localizedString" },
        { name: "editorial", title: "Editorial Line", type: "localizedString" },
        { name: "programs", title: "Programs", type: "localizedString" },
        { name: "coverage", title: "Coverage & Reach", type: "localizedString" },
        { name: "beneficiaries", title: "Beneficiaries", type: "localizedString" },
      ],
    }),
    defineField({
      name: "about",
      title: "About / Historical Background",
      type: "object",
      group: "about",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        { name: "hours", title: "Broadcast hours caption", description: 'e.g. "5:00 — 22:00 daily"', type: "localizedString" },
        {
          name: "body",
          title: "History timeline",
          description: "One entry per numbered timeline item.",
          type: "array",
          of: [{ type: "localizedText" }],
        },
      ],
    }),
    defineField({
      name: "introTag",
      title: "Vision & Mission — intro tag",
      type: "localizedString",
      group: "vision",
    }),
    defineField({
      name: "introTitle",
      title: "Vision & Mission — intro title",
      type: "localizedString",
      group: "vision",
    }),
    defineField({
      name: "introDesc",
      title: "Vision & Mission — intro description",
      type: "localizedText",
      group: "vision",
    }),
    defineField({
      name: "vision",
      title: "Vision & Mission cards",
      type: "object",
      group: "vision",
      fields: [
        { name: "tag", title: "Section tag (small label)", type: "localizedString" },
        { name: "visionTag", title: "Vision tag", type: "localizedString" },
        { name: "visionSub", title: "Vision subtitle", type: "localizedString" },
        { name: "visionDesc", title: "Vision description", type: "localizedText" },
        { name: "missionTag", title: "Mission tag", type: "localizedString" },
        { name: "missionSub", title: "Mission subtitle", type: "localizedString" },
        { name: "missionDesc", title: "Mission description", type: "localizedText" },
      ],
    }),
    defineField({
      name: "editorial",
      title: "Editorial Line",
      type: "object",
      group: "editorial",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "items",
          title: "Pillars",
          description: "The three editorial pillar cards.",
          type: "array",
          of: [
            {
              type: "object",
              name: "editorialItem",
              fields: [
                { name: "title", title: "Title", type: "localizedString" },
                { name: "desc", title: "Description", type: "localizedText" },
              ],
              preview: { select: { title: "title.en" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "programs",
      title: "Programs section",
      description: "The intro copy above the schedule. The schedule itself is managed under Radio Programs.",
      type: "object",
      group: "programs",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        { name: "footerTag", title: "Footer caption", type: "localizedString" },
      ],
    }),
    defineField({
      name: "coverage",
      title: "Coverage & Reach",
      type: "object",
      group: "coverage",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "stats",
          title: "Stats",
          description: 'e.g. "107.1" / "FM Frequency", "65%" / "Countrywide Coverage".',
          type: "array",
          of: [
            {
              type: "object",
              name: "coverageStat",
              fields: [
                { name: "value", title: "Value", type: "string" },
                { name: "label", title: "Label", type: "localizedString" },
              ],
              preview: {
                select: { value: "value", label: "label.en" },
                prepare({ value, label }) {
                  return { title: label ? `${value} — ${label}` : value };
                },
              },
            },
          ],
        },
        {
          name: "regions",
          title: "Neighbouring regions reached",
          type: "array",
          of: [{ type: "localizedString" }],
        },
      ],
    }),
    defineField({
      name: "beneficiaries",
      title: "Beneficiaries",
      type: "object",
      group: "beneficiaries",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "stats",
          title: "Stats",
          description: 'e.g. "23" / "Member Churches".',
          type: "array",
          of: [
            {
              type: "object",
              name: "beneficiaryStat",
              fields: [
                { name: "value", title: "Value", type: "string" },
                { name: "label", title: "Label", type: "localizedString" },
              ],
              preview: {
                select: { value: "value", label: "label.en" },
                prepare({ value, label }) {
                  return { title: label ? `${value} — ${label}` : value };
                },
              },
            },
          ],
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
        { name: "btn", title: "Main button text", type: "localizedString" },
        { name: "btnSecondary", title: "Secondary button text", type: "localizedString" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Radio Inkoramutima Page",
        subtitle: "Hero, history, vision, editorial, coverage & CTA",
      };
    },
  },
});
