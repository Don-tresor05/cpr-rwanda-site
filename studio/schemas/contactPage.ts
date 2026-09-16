import { defineType, defineField } from "sanity";

/**
 * One document that controls every piece of copy on the Contact page:
 * hero banner, sticky sub-navigation, info cards, map, contact form,
 * office hours, FAQ accordion, and the closing call-to-action.
 *
 * Everything is localized; empty languages fall back to English on the
 * website.  The phone / email / address shown in the info cards, map
 * overlay and CTA pull from the global Site Settings by default — but
 * can be overridden per-card here.
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "nav", title: "Sub-navigation" },
    { name: "info", title: "Info Cards" },
    { name: "map", title: "Map" },
    { name: "form", title: "Contact Form" },
    { name: "hours", title: "Office Hours" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // ─── HERO ──────────────────────────────────────────────
    defineField({
      name: "heroTag",
      title: "Hero badge / tag",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroDesc",
      title: "Hero description",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero background image",
      description:
        "Full-width photo behind the hero title. Leave empty to keep the current default.",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroChip1",
      title: "Hero chip 1",
      description: "Small chip text, e.g. 'KG 2 Av 4, Kigali'",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroChip2",
      title: "Hero chip 2",
      description: "Small chip text, e.g. 'Mon – Fri, 8:00 – 17:00'",
      type: "localizedString",
      group: "hero",
    }),

    // ─── SUB-NAVIGATION ────────────────────────────────────
    defineField({
      name: "nav",
      title: "Sticky sub-navigation labels",
      type: "object",
      group: "nav",
      fields: [
        { name: "form", title: "Form tab", type: "localizedString" },
        { name: "info", title: "Info tab", type: "localizedString" },
        { name: "hours", title: "Hours tab", type: "localizedString" },
        { name: "faq", title: "FAQ tab", type: "localizedString" },
      ],
    }),

    // ─── INFO CARDS ────────────────────────────────────────
    defineField({
      name: "info",
      title: "Contact Info section",
      type: "object",
      group: "info",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "cards",
          title: "Info cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "infoCard",
              title: "Info Card",
              fields: [
                { name: "title", title: "Card title", type: "localizedString" },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Building", value: "building" },
                      { title: "Phone", value: "phone" },
                      { title: "Mail", value: "mail" },
                      { title: "Radio", value: "radio" },
                      { title: "Map Pin", value: "mapPin" },
                      { title: "Clock", value: "clock" },
                    ],
                  },
                },
                {
                  name: "line1",
                  title: "Line 1 (main text)",
                  type: "localizedString",
                },
                {
                  name: "line2",
                  title: "Line 2 (sub text)",
                  type: "localizedString",
                },
                {
                  name: "color",
                  title: "Accent color",
                  description: "Hex color for the top border, e.g. #4E6132",
                  type: "string",
                },
              ],
              preview: {
                select: { title: "title.en", subtitle: "line1.en" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "(no title)",
                    subtitle: subtitle || "",
                  };
                },
              },
            },
          ],
        },
      ],
    }),

    // ─── MAP ───────────────────────────────────────────────
    defineField({
      name: "map",
      title: "Map section",
      type: "object",
      group: "map",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "cardTitle",
          title: "Floating card title",
          type: "localizedString",
        },
        {
          name: "directionsBtn",
          title: "Directions button text",
          type: "localizedString",
        },
        {
          name: "openInMaps",
          title: "Open in Maps link text",
          type: "localizedString",
        },
        {
          name: "mapPlace",
          title: "Google Maps search query",
          description:
            "Used to pin the map. Defaults to 'Protestant Council of Rwanda, Kigali, Rwanda'.",
          type: "string",
        },
      ],
    }),

    // ─── CONTACT FORM ──────────────────────────────────────
    defineField({
      name: "form",
      title: "Contact Form",
      type: "object",
      group: "form",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "subjectOptions",
          title: "Subject dropdown options",
          type: "array",
          of: [{ type: "string" }],
          description: "List of choices shown in the Subject dropdown.",
        },
        { name: "nameLabel", title: "Name field label", type: "localizedString" },
        {
          name: "namePlaceholder",
          title: "Name placeholder",
          type: "localizedString",
        },
        {
          name: "emailLabel",
          title: "Email field label",
          type: "localizedString",
        },
        {
          name: "emailPlaceholder",
          title: "Email placeholder",
          type: "localizedString",
        },
        {
          name: "phoneLabel",
          title: "Phone field label",
          type: "localizedString",
        },
        {
          name: "phonePlaceholder",
          title: "Phone placeholder",
          type: "localizedString",
        },
        {
          name: "subjectLabel",
          title: "Subject field label",
          type: "localizedString",
        },
        {
          name: "messageLabel",
          title: "Message field label",
          type: "localizedString",
        },
        {
          name: "messagePlaceholder",
          title: "Message placeholder",
          type: "localizedString",
        },
        { name: "sendBtn", title: "Send button text", type: "localizedString" },
        {
          name: "sendingText",
          title: "Sending spinner text",
          type: "localizedString",
        },
        {
          name: "successTitle",
          title: "Success title",
          type: "localizedString",
        },
        {
          name: "successDesc",
          title: "Success description",
          type: "localizedText",
        },
        {
          name: "sendAnother",
          title: "Send another button text",
          type: "localizedString",
        },
        {
          name: "errorTitle",
          title: "Error title",
          type: "localizedString",
        },
        {
          name: "errorDesc",
          title: "Error description",
          type: "localizedText",
        },
        {
          name: "tryAgain",
          title: "Try Again button text",
          type: "localizedString",
        },
        {
          name: "errors",
          title: "Validation error messages",
          type: "object",
          fields: [
            { name: "name", title: "Name error", type: "string" },
            { name: "email", title: "Email error", type: "string" },
            { name: "message", title: "Message error", type: "string" },
          ],
        },
      ],
    }),

    // ─── OFFICE HOURS ──────────────────────────────────────
    defineField({
      name: "hours",
      title: "Office Hours",
      type: "object",
      group: "hours",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "days",
          title: "Days",
          type: "array",
          of: [
            {
              type: "object",
              name: "officeDay",
              title: "Office Day",
              fields: [
                { name: "day", title: "Day name", type: "localizedString" },
                { name: "time", title: "Hours", type: "localizedString" },
              ],
              preview: {
                select: { day: "day.en", time: "time.en" },
                prepare({ day, time }) {
                  return { title: day || "Day", subtitle: time || "" };
                },
              },
            },
          ],
        },
      ],
    }),

    // ─── FAQ ───────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "faq",
      fields: [
        { name: "tag", title: "Tag (small label)", type: "localizedString" },
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [
            {
              type: "object",
              name: "faqItem",
              title: "FAQ Item",
              fields: [
                { name: "q", title: "Question", type: "localizedString" },
                { name: "a", title: "Answer", type: "localizedText" },
              ],
              preview: {
                select: { q: "q.en" },
                prepare({ q }) {
                  return { title: q || "(no question)" };
                },
              },
            },
          ],
        },
      ],
    }),

    // ─── CTA ───────────────────────────────────────────────
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "object",
      group: "cta",
      fields: [
        { name: "title", title: "Title", type: "localizedString" },
        { name: "desc", title: "Description", type: "localizedText" },
        {
          name: "callBtn",
          title: "Call button text",
          type: "localizedString",
        },
        {
          name: "emailBtn",
          title: "Email button text",
          type: "localizedString",
        },
        {
          name: "chatLabel",
          title: "Floating chat button label",
          type: "localizedString",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page",
        subtitle:
          "Hero, info cards, map, form, hours, FAQ & CTA",
      };
    },
  },
});
