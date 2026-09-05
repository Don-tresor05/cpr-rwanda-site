import { defineType, defineField } from "sanity";

/**
 * A single file belonging to a resource group. Staff pick the group from a
 * dropdown (no free-text slugs to mistype) and upload the file.
 */
export const departmentResourceFile = defineType({
  name: "departmentResourceFile",
  title: "Department Resource File",
  type: "document",
  fields: [
    defineField({
      name: "group",
      title: "Resource group",
      type: "reference",
      to: [{ type: "departmentResourceGroup" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "File title",
      type: "string",
      description: "The name shown in the document list, e.g. 'BNEP School Directory 2026.pdf'.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: { accept: ".pdf,.doc,.docx,.xls,.xlsx" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "group.title" },
  },
});
