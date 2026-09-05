import { defineType, defineField } from "sanity";

/**
 * News & Announcements document.
 *
 * Staff write a post here and hit Publish — it appears on the website's
 * Newsroom, home page news section, and its own article page automatically.
 * Titles, summaries, quotes and article bodies are localized in the site's
 * three languages; leaving French/Kinyarwanda empty falls back to English.
 */
export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  groups: [
    { name: "main", title: "Main" },
    { name: "body", title: "Article Body" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "localizedString",
      group: "main",
      description: "The headline in each language. English is required.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      group: "main",
      description: "Auto-generated from the English headline — leave as is.",
      options: {
        source: (doc) => {
          const t = doc.title as
            | { en?: string; fr?: string; rw?: string }
            | undefined;
          return t?.en || t?.fr || t?.rw || "post";
        },
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Announcement", value: "Announcement" },
          { title: "Report", value: "Report" },
          { title: "Event", value: "Event" },
          { title: "Education", value: "Education" },
          { title: "Health", value: "Health" },
          { title: "Youth", value: "Youth" },
          { title: "Development", value: "Development" },
        ],
      },
      initialValue: "Announcement",
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "main",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Author / Department",
      type: "string",
      group: "main",
      description: "e.g. CPR Secretariat, BNEP Department",
    }),
    defineField({
      name: "featured",
      title: "Featured story",
      type: "boolean",
      group: "main",
      initialValue: false,
      description: "Pinned stories are highlighted first.",
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "localizedText",
      group: "main",
      description: "One or two sentences shown on the news cards.",
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "object",
      group: "body",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true }, fields: [
              { name: "alt", type: "string", title: "Alt text" },
              { name: "caption", type: "string", title: "Caption" },
            ] },
          ],
        },
        {
          name: "fr",
          title: "Français",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true }, fields: [
              { name: "alt", type: "string", title: "Alt text" },
              { name: "caption", type: "string", title: "Caption" },
            ] },
          ],
        },
        {
          name: "rw",
          title: "Kinyarwanda",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true }, fields: [
              { name: "alt", type: "string", title: "Alt text" },
              { name: "caption", type: "string", title: "Caption" },
            ] },
          ],
        },
      ],
    }),
    defineField({
      name: "quote",
      title: "Pull quote",
      type: "localizedString",
      group: "body",
      description: "Optional — a highlighted quotation shown in the article.",
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "imageCaption",
      title: "Cover image caption",
      type: "string",
      group: "media",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }: { title?: string; media?: any; date?: string }) {
      return {
        title: title || "Untitled post",
        media,
        subtitle: date ? new Date(date).toDateString() : undefined,
      };
    },
  },
});
