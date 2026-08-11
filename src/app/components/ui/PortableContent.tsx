import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { urlFor } from "../../../lib/sanity";

/**
 * Renders Sanity "portable text" article bodies with the site's visual style.
 * Used on the News detail page when an article comes from the CMS.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#374151] text-sm sm:text-base leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-['Outfit'] font-bold text-xl sm:text-2xl text-[#4E6132] mt-6 mb-3 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-['Outfit'] font-bold text-lg text-[#4E6132] mt-5 mb-2 leading-snug">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#8B6543] bg-[#F8F9FA] p-4 my-4 text-sm sm:text-base font-['Outfit'] font-bold text-[#4E6132] italic leading-snug shadow-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-1.5 text-[#374151] text-sm sm:text-base leading-relaxed my-3">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-1.5 text-[#374151] text-sm sm:text-base leading-relaxed my-3">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#4E6132]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-4">
          <img
            src={urlFor(value.asset).width(1600).url()}
            alt={value.alt || "Article image"}
            className="w-full aspect-[16/10] object-cover shadow-sm bg-[#EDF1F7]"
          />
          {value.caption && (
            <figcaption className="text-xs text-[#6B7280] mt-1.5 border-b border-[#4E6132]/10 pb-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableContent({ blocks }: { blocks: unknown[] }) {
  // Sanity delivers plain JSON — cast to the typed block shape for the renderer.
  return <PortableText value={blocks as PortableTextBlock[]} components={components} />;
}
