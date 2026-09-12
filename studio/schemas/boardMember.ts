import { defineType, defineField } from "sanity";
 
/**
 * One document per Executive Committee board member (President, Vice
 * President, Treasurer, Advisor, Secretary General). Shown on the About
 * Page's "Board Members" grid. The site falls back to a hardcoded list
 * until at least one boardMember document is published — once one exists,
 * ALL board members must come from here, so keep the full committee
 * populated together.
 */
export const boardMember = defineType({
  name: "boardMember",
  title: "Board Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      description: "Not localized — shown the same in every language (e.g. 'Mgr Dr Manasseh Gahima').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      description: "Shown in the 'Read Bio' modal. Leave blank to show 'Bio coming soon'.",
      type: "localizedText",
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first (e.g. President = 1, Secretary General = 5).",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "image" },
  },
});
