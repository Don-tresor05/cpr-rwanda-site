import { defineField } from "sanity";

/**
 * Three top-level, per-language portable-text array fields for a long-form
 * article body — English, French, Kinyarwanda.
 *
 * IMPORTANT — these are deliberately three separate TOP-LEVEL document
 * fields (bodyEn / bodyFr / bodyRw), not one field of type "object" that
 * wraps three arrays inside it. Nesting a portable-text array inside a
 * plain object field is a known trigger for a long-standing Sanity Studio
 * editor bug where inserting an image throws "Cannot apply deep operations
 * on primitive values ... path [\"progress\"] ... value \"undefined\"" —
 * see https://github.com/sanity-io/sanity/issues/1993 and
 * https://github.com/sanity-io/sanity/issues/9764 (the latter closed by the
 * Sanity team as "not planned" for this editor version). Keeping each
 * language's array as its own top-level field sidesteps that nesting
 * entirely and matches Sanity's own most-tested field shape.
 *
 * Used by News Posts, Department Activities and Department Detail pages.
 * Editors still see one "Article Body" (or "Full Article") tab in Studio —
 * the three fields just share the same `group`.
 */
export function localizedArticleBodyFields(
  group: string,
  titlePrefix = "Article Body",
  description?: string,
) {
  const imageFields = [
    { name: "alt", type: "string", title: "Alt text" },
    { name: "caption", type: "string", title: "Caption" },
    {
      name: "size",
      type: "string",
      title: "Size",
      options: {
        list: [
          { title: "Full width", value: "full" },
          { title: "Small (portrait)", value: "small" },
        ],
      },
    },
  ];

  const bodyBlockTypes = [
    { type: "block" },
    { type: "image", options: { hotspot: true }, fields: imageFields },
  ];

  return [
    defineField({
      name: "bodyEn",
      title: `${titlePrefix} — English`,
      description,
      type: "array",
      group,
      of: bodyBlockTypes,
    }),
    defineField({
      name: "bodyFr",
      title: `${titlePrefix} — Français`,
      type: "array",
      group,
      of: bodyBlockTypes,
    }),
    defineField({
      name: "bodyRw",
      title: `${titlePrefix} — Kinyarwanda`,
      type: "array",
      group,
      of: bodyBlockTypes,
    }),
  ];
}
