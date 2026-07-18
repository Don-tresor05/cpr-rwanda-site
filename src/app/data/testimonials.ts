export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The CPR scholarship program transformed my life. As a child of genocide survivors, I had no hope of attending university. Today I am a medical doctor serving my community.",
    author: "Dr. Claudine Uwimana",
    role: "CPR Scholarship Beneficiary, Class of 2018",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
  },
  {
    quote: "Radio Inkoramutima reaches our village every morning. The trauma counseling programs on air have helped our whole congregation find peace and reconciliation.",
    author: "Pastor Emmanuel Nkusi",
    role: "Member Church Pastor, Eastern Province",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
  },
  {
    quote: "Through the BNEP Active Pedagogy training, our teachers now create joyful classrooms where every child participates. Student performance has increased by 40% in two years.",
    author: "Marie-Louise Ingabire",
    role: "Head Teacher, EPRK Primary School, Kigali",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format",
  },
];
