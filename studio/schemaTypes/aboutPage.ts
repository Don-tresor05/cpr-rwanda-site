import { defineType, defineField } from "sanity";

/**
 * One document that controls the deep copy on the About Us page:
 * hero title, Who We Are paragraphs, Vision & Mission, the three-step
 * model, core values, executive committee headings, organigram and the
 * partners heading. Everything is localized; empty languages fall back
 * to English on the website.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "whoWeAre", title: "Who We Are" },
    { name: "visionMission", title: "Vision & Mission" },
    { name: "model", title: "Our Model" },
    { name: "coreValues", title: "Core Values" },
    { name: "execCommittee", title: "Executive Committee" },
    { name: "organigram", title: "Organigram" },
    { name: "partners", title: "Partners" },
    { name: "historyModal", title: "History Modal" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
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
        { name: "whoWeAre", title: "Who We Are", type: "localizedString" },
        { name: "visionMission", title: "Vision & Mission", type: "localizedString" },
        { name: "coreValues", title: "Core Values", type: "localizedString" },
        { name: "execCommittee", title: "Executive Committee", type: "localizedString" },
        { name: "organigram", title: "Organigram", type: "localizedString" },
        { name: "ourPartners", title: "Our Partners", type: "localizedString" },
      ],
    }),
    defineField({
      name: "whoWeAre",
      title: "Who We Are",
      type: "object",
      group: "whoWeAre",
      fields: [
        { name: "title", title: "Title", type: "localizedString" },
        { name: "p1", title: "Paragraph 1", type: "localizedText" },
        { name: "p2", title: "Paragraph 2", type: "localizedText" },
      ],
    }),
    defineField({
      name: "visionMission",
      title: "Vision & Mission",
      type: "object",
      group: "visionMission",
      fields: [
        { name: "title", title: "Section title", type: "localizedString" },
        { name: "visionTag", title: "Vision tag", type: "localizedString" },
        { name: "visionSub", title: "Vision subtitle", type: "localizedString" },
        { name: "visionDesc", title: "Vision description", type: "localizedText" },
        { name: "missionTag", title: "Mission tag", type: "localizedString" },
        { name: "missionSub", title: "Mission subtitle", type: "localizedString" },
        { name: "missionDesc", title: "Mission description", type: "localizedText" },
      ],
    }),
    defineField({
      name: "model",
      title: "Our Model",
      description: "The three-step collaborative structure shown on the About page.",
      type: "object",
      group: "model",
      fields: [
        { name: "title", title: "Section title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        { name: "step1Tag", title: "Step 1 tag", type: "localizedString" },
        { name: "step1Title", title: "Step 1 title", type: "localizedString" },
        { name: "step1Desc", title: "Step 1 description", type: "localizedText" },
        { name: "step2Tag", title: "Step 2 tag", type: "localizedString" },
        { name: "step2Title", title: "Step 2 title", type: "localizedString" },
        { name: "step2Desc", title: "Step 2 description", type: "localizedText" },
        { name: "step3Tag", title: "Step 3 tag", type: "localizedString" },
        { name: "step3Title", title: "Step 3 title", type: "localizedString" },
        { name: "step3Desc", title: "Step 3 description", type: "localizedText" },
      ],
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "object",
      group: "coreValues",
      fields: [
        { name: "title", title: "Section title", type: "localizedString" },
        {
          name: "items",
          title: "Values",
          type: "array",
          of: [
            {
              type: "object",
              name: "value",
              title: "Value",
              fields: [
                { name: "title", title: "Title", type: "localizedString" },
                { name: "desc", title: "Description", type: "localizedText" },
              ],
              preview: {
                select: { title: "title.en" },
                prepare({ title }) {
                  return { title: title || "Core value" };
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "execCommittee",
      title: "Executive Committee",
      description: "The headings around the board & staff photo cards (the people themselves stay fixed).",
      type: "object",
      group: "execCommittee",
      fields: [
        { name: "title", title: "Section title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        { name: "boardMembers", title: "'Board Members' heading", type: "localizedString" },
        { name: "staff", title: "'Staff' heading", type: "localizedString" },
        { name: "defaultName", title: "Default member name", type: "localizedString" },
        { name: "defaultRole", title: "Default role", type: "localizedString" },
      ],
    }),
    defineField({
      name: "organigram",
      title: "Organigram",
      type: "object",
      group: "organigram",
      fields: [
        { name: "title", title: "Section title", type: "localizedString" },
        { name: "comingSoon", title: "Placeholder text", type: "localizedString" },
      ],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "object",
      group: "partners",
      fields: [{ name: "title", title: "Section title", type: "localizedString" }],
    }),
    defineField({
      name: "historyModal",
      title: "History Modal",
      description: "Content for the 'Our Story' modal opened from the Who We Are section.",
      type: "object",
      group: "historyModal",
      fields: [
        { name: "learnMore", title: "'Learn More' button label", type: "localizedString" },
        { name: "badge", title: "Badge text (e.g. 'Our Story')", type: "localizedString" },
        { name: "title", title: "Modal title", type: "localizedString" },
        { name: "p1", title: "Paragraph 1", type: "localizedText" },
        { name: "p2", title: "Paragraph 2", type: "localizedText" },
        { name: "personName", title: "Person name", type: "localizedString" },
        { name: "personRole", title: "Person role", type: "localizedString" },
        { name: "cta", title: "CTA button label", type: "localizedString" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Hero, who we are, vision, model, values & committee",
      };
    },
  },
});
