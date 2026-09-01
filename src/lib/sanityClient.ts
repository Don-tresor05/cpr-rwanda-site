import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '2bpoen39',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Use CDN for faster reads on published content
  // Token is only needed for draft content or write operations
  // For public read-only access, you can remove the token
  token: import.meta.env.VITE_SANITY_TOKEN,
})

// Image URL builder — use this to generate optimized image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
