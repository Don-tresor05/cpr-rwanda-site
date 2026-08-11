import { defineType, defineField } from "sanity";

/** Icon choices that match the icons the site renders for each department. */
const DEPT_ICONS = [
  { title: "Crown — General Secretariat", value: "crown" },
  { title: "Graduation cap — Education (BNEP)", value: "graduation-cap" },
  { title: "Handshake — Diakonia", value: "handshake" },
  { title: "Coins — Finance", value: "coins" },
  { title: "Users — Youth", value: "users" },
  { title: "Scale — Gender", value: "scale" },
  { title: "Radio — Radio Inkoramutima", value: "radio" },
];

/**
 * A CPR department shown as a card on the home page. Titles and short
 * descriptions are localized (EN/FR/RW); the `order` field controls the
 * display position on the page.
 */
export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first on the home page. Use 1, 2, 3…",
      type: "number",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: DEPT_ICONS },
    }),
    defineField({
      name: "title",
      title: "Department name",
      type: "localizedString",
    }),
    defineField({
      name: "desc",
      title: "Short description",
      type: "localizedText",
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "e.g. /departments#bnep — where the card leads.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title.en", order: "order" },
    prepare({ title, order }) {
      return {
        title: title || "Untitled department",
        subtitle: order !== undefined && order !== null ? `Position ${order}` : "No order set",
      };
    },
  },
});
