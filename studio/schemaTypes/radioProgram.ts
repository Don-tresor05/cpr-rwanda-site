import { defineType, defineField } from "sanity";

/**
 * A programme in Radio Inkoramutima's daily schedule, shown as a card on
 * the radio page. Titles and descriptions are localized (EN/FR/RW); the
 * `order` field controls where the programme appears in the schedule.
 */
export const radioProgram = defineType({
  name: "radioProgram",
  title: "Radio Program",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "1 = shown first in the schedule. Use 1, 2, 3…",
      type: "number",
    }),
    defineField({
      name: "time",
      title: "Time slot",
      description: "e.g. 5:00 — 7:00",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Program title",
      type: "localizedString",
    }),
    defineField({
      name: "desc",
      title: "Short description",
      type: "localizedText",
    }),
  ],
  preview: {
    select: { title: "title.en", time: "time", order: "order" },
    prepare({ title, time, order }) {
      const parts: string[] = [];
      if (order !== undefined && order !== null) parts.push(`#${order}`);
      if (time) parts.push(time);
      return {
        title: title || "Untitled program",
        subtitle: parts.length > 0 ? parts.join(" · ") : undefined,
      };
    },
  },
});
