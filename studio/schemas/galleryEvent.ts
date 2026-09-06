import { defineType, defineField } from "sanity";

/** The four filter categories shown on the gallery page. */
const GALLERY_CATEGORIES = [
  { title: "Conferences & Meetings", value: "conferences" },
  { title: "Commemorations", value: "commemorations" },
  { title: "Youth & Wellness", value: "youth" },
  { title: "Education & Media", value: "education" },
];

/**
 * A photo collection on the gallery page. Staff create one document per
 * collection (e.g. "Kwibuka Commemoration"), upload its photos, and the
 * `order` field controls where it appears. Titles, locations and dates are
 * localized; empty languages fall back to English on the website.
 */
export const galleryEvent = defineType({
  name: "galleryEvent",
  title: "Gallery Collection",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first on the gallery page. Use 1, 2, 3…",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Determines which filter the collection appears under.",
      type: "string",
      options: { list: GALLERY_CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Collection title",
      type: "localizedString",
    }),
    defineField({
      name: "locationDate",
      title: "Location & date",
      description: "e.g. Kigali, January 2026",
      type: "localizedString",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "object",
          name: "photo",
          title: "Photo",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "alt",
              title: "Description (alt text)",
              description: "Short text describing the photo, shown to screen readers.",
              type: "string",
            },
          ],
          preview: {
            select: { media: "image", title: "alt" },
            prepare({ media, title }) {
              return { media, title: title || "Photo" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.en", category: "category", order: "order", images: "images" },
    prepare({ title, category, order, images }) {
      const parts = [
        category ? category : "no category",
        `${images?.length ?? 0} photos`,
      ];
      if (order !== undefined && order !== null) parts.push(`position ${order}`);
      return {
        title: title || "Untitled collection",
        subtitle: parts.join(" · "),
      };
    },
  },
});
