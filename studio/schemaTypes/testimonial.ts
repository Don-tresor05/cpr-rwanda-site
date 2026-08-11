import { defineType, defineField } from "sanity";

/**
 * A testimonial shown in the carousel on the home page. Quotes and roles
 * are localized (EN/FR/RW); the author name is a single string and the
 * photo is optional. The `order` field controls the carousel position.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first in the carousel. Use 1, 2, 3…",
      type: "number",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "localizedText",
    }),
    defineField({
      name: "author",
      title: "Author name",
      description: "e.g. Dr. Claudine Uwimana",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role / title",
      description: "e.g. Education Specialist, BNEP",
      type: "localizedString",
    }),
    defineField({
      name: "avatar",
      title: "Photo (optional)",
      description: "If left empty, a default profile photo is shown.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "author", quote: "quote.en", order: "order", media: "avatar" },
    prepare({ title, quote, order, media }) {
      const parts: string[] = [];
      if (order !== undefined && order !== null) parts.push(`#${order}`);
      if (quote) parts.unshift(quote.slice(0, 60));
      return {
        title: title || "Untitled testimonial",
        subtitle: parts.length > 0 ? parts.join(" · ") : undefined,
        media,
      };
    },
  },
});
