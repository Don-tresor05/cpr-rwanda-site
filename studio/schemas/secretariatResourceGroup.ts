import { defineType, defineField } from "sanity";

/**
 * A resource "folder" shown as a card on a Secretariat section's Resources
 * page (e.g. "Meeting Minutes", "Policy Briefs"). Staff can create new
 * groups here without any code changes — they appear automatically as
 * cards.
 */
export const secretariatResourceGroup = defineType({
  name: "secretariatResourceGroup",
  title: "Secretariat Resource Group",
  type: "document",
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "SG Office", value: "sg" },
          { title: "CPR Events", value: "events" },
          { title: "CPR Meetings", value: "meetings" },
          { title: "Advocacy", value: "advocacy" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Publications", value: "publications" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Group title",
      type: "string",
      description: "e.g. 'Meeting Minutes', 'Policy Briefs', 'Annual Reports'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Short blurb shown on the resource card.",
    }),
    defineField({
      name: "cardType",
      title: "Card type",
      type: "string",
      description: "Controls the icon/label on the card.",
      options: {
        list: [
          { title: "Document (View)", value: "document" },
          { title: "Download", value: "download" },
          { title: "External link", value: "link" },
        ],
      },
      initialValue: "document",
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
    select: { title: "title", subtitle: "section" },
  },
});
