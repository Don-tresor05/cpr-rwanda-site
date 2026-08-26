import { defineType } from "sanity";

/**
 * A single-line text field available in the site's three languages
 * (English, Français, Kinyarwanda). Empty languages fall back to English
 * on the website.
 */
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "fr", title: "Français", type: "string" },
    { name: "rw", title: "Kinyarwanda", type: "string" },
  ],
});
