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
    image: "/assets/news-kwibuka.jpg",
  },
  {
    date: "May 14, 2025",
    category: "Education",
    title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
    excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international donors.",
    image: "/assets/news-education.webp",
  },
  {
    date: "April 3, 2025",
    category: "Health",
    title: "Gender & Health Department Completes Trauma Counselor Certification",
    excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity.",
    image: "/assets/news-trauma.jpg",
  },
  {
    date: "March 12, 2025",
    category: "Development",
    title: "CPR Partners with Local Cooperatives for Agricultural Sustainability",
    excerpt: "A new initiative aiming to support rural communities with climate-smart farming techniques was launched in Eastern Province, impacting over 500 families.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "February 18, 2025",
    category: "Youth",
    title: "Annual Youth Peace and Reconciliation Summit Announced",
    excerpt: "Youth leaders from various Protestant parishes across the country will gather in Kigali to discuss peacemaking, leadership, and digital evangelism.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop&auto=format",
  },
];
