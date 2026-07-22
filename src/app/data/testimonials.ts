export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const getTestimonials = (t: any): Testimonial[] => {
  const items = t("testimonials.items", { returnObjects: true }) as any[];
  return [
    {
      quote: items[0].quote,
      author: "Dr. Claudine Uwimana",
      role: items[0].role,
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
    },
    {
      quote: items[1].quote,
      author: "Pastor Emmanuel Nkusi",
      role: items[1].role,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    },
    {
      quote: items[2].quote,
      author: "Marie-Louise Ingabire",
      role: items[2].role,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format",
    },
  ];
};
