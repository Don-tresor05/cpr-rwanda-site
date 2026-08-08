import { defineType } from "sanity";

/**
 * A multi-line text field available in the site's three languages
 * (English, Français, Kinyarwanda). Empty languages fall back to English.
 */
export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text (multi-line)",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 4 },
    { name: "fr", title: "Français", type: "text", rows: 4 },
    { name: "rw", title: "Kinyarwanda", type: "text", rows: 4 },
  ],
});
