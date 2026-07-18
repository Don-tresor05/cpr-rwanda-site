export interface HeroSlide {
  id: number;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  cta: string;
  ctaSecondary: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format",
    label: "Serving Rwanda Since 1963",
    title: "Bose Babe Umwe",
    subtitle: "That All of Them May Be One",
    desc: "Uniting 19 Protestant member churches to serve Rwanda's communities through faith, education, health, and sustainable development.",
    cta: "Explore Our Mission",
    ctaSecondary: "Meet Our Team",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop&auto=format",
    label: "Education Department (BNEP)",
    title: "Shaping Rwanda's Future",
    subtitle: "595 Protestant Primary Schools",
    desc: "The Bureau National de l'Éducation Protestante oversees quality education across Rwanda, empowering 300,000+ learners every year.",
    cta: "Learn About BNEP",
    ctaSecondary: "View Statistics",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&auto=format",
    label: "Radio Inkoramutima",
    title: "Voice of the Heart",
    subtitle: "107.1 FM — Broadcasting Hope",
    desc: "Radio Inkoramutima — 'Voice of the Heart' — reaches communities across Rwanda with messages of faith, unity, and holistic development.",
    cta: "Listen Live",
    ctaSecondary: "Program Guide",
  },
];
