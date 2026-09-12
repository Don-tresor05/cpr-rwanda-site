import { defineType, defineField } from "sanity";

/**
 * One document per partner (e.g. WCC, AACC, CBF).
 * Displayed in the auto-scrolling marquee in the "Our Partners" section
 * on the About Page.
 */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      description: "Name of the partner organization (e.g. 'World Council of Churches').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Partner Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
