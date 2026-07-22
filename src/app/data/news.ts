export interface NewsArticle {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

export const getNews = (t: any): NewsArticle[] => {
  const items = t("news.items", { returnObjects: true }) as any[];
  return [
    {
      date: "June 28, 2025",
      category: items[0].category,
      title: items[0].title,
      excerpt: items[0].excerpt,
      image: "/assets/news-kwibuka.jpg",
    },
    {
      date: "May 14, 2025",
      category: items[1].category,
      title: items[1].title,
      excerpt: items[1].excerpt,
      image: "/assets/news-education.webp",
    },
    {
      date: "April 3, 2025",
      category: items[2].category,
      title: items[2].title,
      excerpt: items[2].excerpt,
      image: "/assets/news-trauma.jpg",
    },
    {
      date: "March 12, 2025",
      category: items[3].category,
      title: items[3].title,
      excerpt: items[3].excerpt,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&auto=format",
    },
    {
      date: "February 18, 2025",
      category: items[4].category,
      title: items[4].title,
      excerpt: items[4].excerpt,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop&auto=format",
    },
  ];
};
