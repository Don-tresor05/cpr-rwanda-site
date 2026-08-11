import { defineType, defineField } from "sanity";

/**
 * A member church of the Protestant Council of Rwanda (CPR).
 *
 * Staff can add, remove or rename churches from the grid shown on the home
 * page. The optional website URL turns the card into an external link.
 */
export const memberChurch = defineType({
  name: "memberChurch",
  title: "Member Church",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Church name",
      description: "e.g. Eglise Presbytérienne au Rwanda (EPR)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Website (optional)",
      description: "e.g. https://www.epr.rw — shown as a link on the card.",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first on the home page. Use 1, 2, 3…",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", url: "url", order: "order" },
    prepare({ title, url, order }) {
      return {
        title: title || "Untitled church",
        subtitle:
          order !== undefined && order !== null
            ? `Position ${order}`
            : url
              ? `Website: ${url}`
              : "No website",
      };
    },
  },
});
