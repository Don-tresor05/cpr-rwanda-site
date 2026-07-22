import { GraduationCap, Heart, Megaphone, Globe, Briefcase, type LucideIcon } from "lucide-react";

export interface Department {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
  color: string;
  accent: string;
  link: string;
}

export const DEPARTMENTS: Department[] = [
  {
    icon: GraduationCap,
    title: "Education (BNEP)",
    desc: "The Bureau National de l'Éducation Protestante oversees 595 primary schools across Rwanda, implementing active pedagogy to transform learning outcomes for 300,000+ students annually.",
    details: [
      "Manages 595 Protestant primary schools nationwide",
      "Participatory Active Pedagogy (PAP) teacher training",
      "Peace Building Through Schools initiative",
      "ReDiCo — resilience and disaster recovery in education",
      "International partnerships for quality education",
    ],
    color: "bg-[#4E6132]/10",
    accent: "#4E6132",
    link: "#departments",
  },
  {
    icon: Heart,
    title: "Women, Family & Counseling (MCF)",
    desc: "Empowering women for holistic change — trauma counseling, gender-based violence prevention, and family wellbeing through three counseling centers nationwide.",
    details: [
      "Motto: 'Femme outillée pour une résilience à toute épreuve'",
      "3 counseling centers: Kigali, Musanze, Kayonza",
      "Psychotraumatology and post-genocide trauma healing",
      "Anti-trauma clubs in schools and communities",
      "GBV awareness, HIV/AIDS education, and AGR support",
    ],
    color: "bg-amber-50",
    accent: "#B8860B",
    link: "#departments",
  },
  {
    icon: Megaphone,
    title: "Communication & Evangelism (MCM)",
    desc: "Spreading the Gospel and promoting unity through Radio Inkoramutima, joint evangelistic campaigns, choir competitions, pastor training, and youth empowerment.",
    details: [
      "Radio Inkoramutima 107.1 FM — 'Voice of the Heart'",
      "Joint evangelistic campaigns across member churches",
      "Annual Christian Unity Week celebrations",
      "Choir competitions and gospel music production",
      "Fighting heretical teachings and cultural preservation",
    ],
    color: "bg-emerald-50",
    accent: "#065F46",
    link: "#departments",
  },
  {
    icon: Globe,
    title: "Advocacy & Sustainability",
    desc: "Engaging policymakers, championing human rights, and building institutional resilience to ensure CPR's impact endures for future generations.",
    details: [
      "Policy engagement and civic leadership",
      "Environmental and institutional sustainability",
      "Human rights advocacy and social justice",
      "Interfaith dialogue and ecumenical relations",
      "Capacity building for member church staff",
    ],
    color: "bg-purple-50",
    accent: "#4C1D95",
    link: "#departments",
  },
];

export const MEMBER_CHURCHES = [
  "Eglise Presbytérienne au Rwanda (EPR)",
  "Eglise Méthodiste Libre au Rwanda (EMLR)",
  "Union des Eglises Baptistes au Rwanda (UEBR)",
  "Association des Eglises Baptistes au Rwanda (AEBR)",
  "Association des Eglises Pentecôte au Rwanda (ADEPR)",
  "Eglise Évangélique des Amis au Rwanda (EEAR)",
  "Harvest Christian Church (HCC)",
  "Eglise Luthérienne du Rwanda (ELR)",
  "The Salvation Army (SA)",
  "Believers Eastern Church (BEC)",
  "SIERRA Community Church (SIERRA CC)",
  "EAR — Diocese of Kigali",
  "EAR — Diocese of Shyira",
  "EAR — Diocese of Butare",
  "EAR — Diocese of Gahini",
  "EAR — Diocese of Gasabo",
  "EAR — Diocese of Byumba",
  "EAR — Diocese of Kigeme",
  "EAR — Diocese of Shyogwe",
  "EAR — Diocese of Kibungo",
  "EAR — Diocese of Cyangugu",
  "EAR — Diocese of Karongi",
  "Eglise Adventiste du Septième Jour (EASJ)",
  "African Evangelistic Enterprises (AEE)",
  "African Leadership & Reconciliation Ministries (ALARM)",
  "BARAKABAHO Foundation",
  "Rwanda Youth for Christ (RYC)",
  "Ligue pour la Lecture de la Bible (LLBR)",
];

export interface Project {
  title: string;
  period: string;
  desc: string;
  highlights: string[];
  icon: LucideIcon;
}

export const PROJECTS: Project[] = [
  {
    title: "Capacity Building in Churches",
    period: "2019 — 2022",
    desc: "Strengthening professional capacities of staff across 20 CPR-member churches and 5 associations. Focus areas include ICT, entrepreneurship, leadership, public health, gender, and peace studies.",
    highlights: [
      "ICT & Entrepreneurship training programs",
      "Leadership and administration capacity building",
      "Environmental theology and public health education",
      "Scholarship alumni network for ongoing collaboration",
    ],
    icon: Briefcase,
  },
  {
    title: "Psychotraumatology & Trauma Healing",
    period: "Ongoing",
    desc: "Comprehensive psychosocial support in post-conflict contexts — certifying counselors, running anti-trauma clubs in schools, and providing therapeutic accompaniment for survivors.",
    highlights: [
      "Certifying mental health providers in psychotraumatology",
      "Anti-trauma clubs in schools nationwide",
      "Faith-based counseling integration in communities",
      "Rwanda Organization of Psychotraumatology Experts (ROPRE)",
    ],
    icon: Heart,
  },
];
