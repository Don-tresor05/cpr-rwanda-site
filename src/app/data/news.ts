export interface NewsArticle {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

export const NEWS: NewsArticle[] = [
  {
    date: "June 28, 2025",
    category: "Event",
    title: "Kwibuka 31 Memorial Commemoration at Gahini Diocese",
    excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to never again.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "May 14, 2025",
    category: "Education",
    title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
    excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international donors.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "April 3, 2025",
    category: "Health",
    title: "Gender & Health Department Completes Trauma Counselor Certification",
    excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
  },
];
