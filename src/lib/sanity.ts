import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Sanity headless CMS connection for the CPR Rwanda website.
 *
 * Each developer uses their OWN Sanity project — no credentials are baked
 * into the code anymore. Configure yours locally:
 *
 *   VITE_SANITY_PROJECT_ID   (from manage.sanity.io → your project)
 *   VITE_SANITY_DATASET      (e.g. "production", "dev", "dev2", …)
 *
 * Copy `.env.example` to `.env` and fill in your own values. The dataset is
 * read-only via the CDN and needs no API token.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Sanity is not configured. Copy .env.example to .env and set " +
      "VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET (use your own Sanity project)."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-08",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/** Builds a Sanity CDN image URL from an image asset or reference. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
