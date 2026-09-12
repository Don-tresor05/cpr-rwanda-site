import { defineType, defineField } from "sanity";

/**
 * One document per staff member shown in the About Page's "Staff" grid
 * (below the Executive Committee board members). Bio is optional — the
 * "Read Bio" button only appears on the site when a bio is filled in for
 * that person, unlike board members where it always shows. The site falls
 * back to the hardcoded staff list until at least one staffMember document
 * is published — once one exists, ALL staff must come from here.
 */
export const staffMember = defineType({
  name: "staffMember",
  title: "Staff Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      description: "Not localized — shown the same in every language.",
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
      title: "Biography (optional)",
      description: "Leave blank to hide the 'Read Bio' button entirely for this staff member — it only appears when a bio is filled in.",
      type: "localizedText",
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "image" },
  },
});
