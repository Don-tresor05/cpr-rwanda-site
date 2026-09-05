import { defineType, defineField } from "sanity";

/**
 * Global site settings — ONE document that controls the site-wide content
 * staff edit most often: hero slides, statistics, contact details (used in
 * the header, footer and contact page), social links, radio info, and the
 * partner list. Everything is localized; empty languages fall back to
 * English on the website.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Statistics" },
    { name: "contact", title: "Contact" },
    { name: "radio", title: "Radio" },
    { name: "partners", title: "Partners" },
  ],
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      description:
        "The rotating banner on the home page. Add as many as you like — the first one shows first.",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Hero Slide",
          fields: [
            { name: "image", title: "Background image", type: "image", options: { hotspot: true } },
            { name: "label", title: "Eyebrow (small script text)", type: "localizedString" },
            { name: "title", title: "Headline", type: "localizedString" },
            { name: "subtitle", title: "Subtitle (script quote)", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            { name: "cta", title: "Main button text", type: "localizedString" },
            { name: "ctaHref", title: "Main button link", type: "string", description: "e.g. /about#vision-mission" },
            { name: "ctaSecondary", title: "Secondary button text", type: "localizedString" },
            { name: "ctaSecondaryHref", title: "Secondary button link", type: "string", description: "e.g. /departments" },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      description: "The numbers shown on the home page (member churches, schools, FM, years).",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          title: "Statistic",
          fields: [
            { name: "value", title: "Value", type: "number" },
            { name: "suffix", title: "Suffix", type: "string", description: "e.g. + or  FM" },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Church", value: "church" },
                  { title: "School", value: "school" },
                  { title: "Radio", value: "radio" },
                  { title: "Service ribbon", value: "ribbon" },
                  { title: "Users", value: "users" },
                  { title: "Heart", value: "heart" },
                  { title: "Scale", value: "scale" },
                  { title: "Briefcase", value: "briefcase" },
                ],
              },
            },
            { name: "label", title: "Label", type: "localizedString" },
          ],
        },
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      description: "Shown in the header, footer and contact page.",
      type: "object",
      group: "contact",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "addressLine1", title: "Address line 1", type: "string" },
        { name: "addressLine2", title: "Address line 2", type: "string" },
        {
          name: "socials",
          title: "Social links",
          type: "array",
          of: [
            {
              type: "object",
              name: "social",
              fields: [
                {
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  options: {
                    list: [
                      { title: "Facebook", value: "facebook" },
                      { title: "X (Twitter)", value: "x" },
                      { title: "Instagram", value: "instagram" },
                      { title: "YouTube", value: "youtube" },
                    ],
                  },
                },
                { name: "url", title: "URL", type: "url" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "radio",
      title: "Radio Inkoramutima",
      type: "object",
      group: "radio",
      fields: [
        { name: "frequency", title: "Frequency", type: "string", description: "e.g. 107.1" },
        { name: "tagline", title: "Tagline", type: "localizedString" },
        { name: "listenUrl", title: "Listen live URL", type: "url" },
      ],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      description: "The partner names shown on the home page.",
      type: "array",
      group: "partners",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Hero, statistics, contact, radio & partners",
      };
    },
  },
});
