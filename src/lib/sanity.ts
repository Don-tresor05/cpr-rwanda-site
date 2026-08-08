import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Sanity headless CMS connection for the CPR Rwanda website.
 *
 * The project/dataset identifiers are public (safe to ship in the bundle) —
 * the dataset is read-only via the CDN and needs no API token. Override them
 * locally via a .env file if needed:
 *   VITE_SANITY_PROJECT_ID
 *   VITE_SANITY_DATASET
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "7kmzwj0g";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

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
