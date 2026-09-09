import { defineType, defineField } from "sanity";

export default defineType({
  name: "boardMember",
  title: "Board Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "localizedString",
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
      type: "localizedText",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Use numbers to sort the board members (lower numbers appear first)",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.en",
      media: "image",
    },
  },
});
