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
    image: "/assets/1.jpeg",
    label: "Serving Rwanda Since 1963",
    title: "Bose Babe Umwe",
    subtitle: "That All of Them May Be One",
    desc: "Uniting 28 Protestant member churches to serve Rwanda's communities through faith, education, health, and sustainable development.",
    cta: "Explore Our Mission",
    ctaSecondary: "Meet Our Team",
  },
  {
    id: 2,
    image: "/assets/Primary.jpg",
    label: "Education Department (BNEP)",
    title: "Shaping Rwanda's Future",
    subtitle: "595 Protestant Primary Schools",
    desc: "The Bureau National de l'Éducation Protestante oversees quality education across Rwanda, empowering 300,000+ learners every year.",
    cta: "Learn About BNEP",
    ctaSecondary: "View Statistics",
  },
  {
    id: 3,
    image: "/assets/Inkoramutima-Logo.jpg",
    label: "Radio Inkoramutima",
    title: "107.1 FM — Broadcasting Hope",
    subtitle: "Voice of the Protestant Council in Rwanda",
    desc: "Radio Inkoramutima, the official voice of the Protestant Council of Rwanda, reaches communities across the country with messages of faith, unity, and holistic development.",
    cta: "Listen Live",
    ctaSecondary: "Program Guide",
  },
];
