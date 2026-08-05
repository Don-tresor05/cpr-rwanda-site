import {
  Crown,
  GraduationCap,
  Handshake,
  Coins,
  Users,
  Scale,
  Radio,
  Heart,
  Briefcase,
  type LucideIcon
} from "lucide-react";

export interface Department {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}

export const getDepartments = (t: any): Department[] => {
  const items = t("departments.items", { returnObjects: true }) as {title: string, desc: string}[];
  return [
    { icon: Crown, title: items[0].title, desc: items[0].desc, link: "/departments#gs" },
    { icon: GraduationCap, title: items[1].title, desc: items[1].desc, link: "/departments#bnep" },
    { icon: Handshake, title: items[2].title, desc: items[2].desc, link: "/departments#diakonia" },
    { icon: Coins, title: items[3].title, desc: items[3].desc, link: "/departments#finance" },
    { icon: Users, title: items[4].title, desc: items[4].desc, link: "/departments#youth" },
    { icon: Scale, title: items[5].title, desc: items[5].desc, link: "/departments#gender" },
    { icon: Radio, title: items[6].title, desc: items[6].desc, link: "/departments#radio" },
  ];
};

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
  "BARAKABAHO Foundation",
];

export interface Project {
  title: string;
  period: string;
  desc: string;
  highlights: string[];
  icon: LucideIcon;
}

export const getProjects = (t: any): Project[] => {
  const items = t("projects.items", { returnObjects: true }) as {
    title: string;
    period: string;
    desc: string;
    highlights: string[];
  }[];
  if (!Array.isArray(items) || items.length < 2) return PROJECTS;
  const icons = [Briefcase, Heart];
  return items.map((item, index) => ({
    title: item.title,
    period: item.period,
    desc: item.desc,
    highlights: item.highlights || [],
    icon: icons[index % icons.length],
  }));
};

export const PROJECTS: Project[] = [
  {
    title: "Capacity Building in Churches",
    period: "2019 — 2022",
    desc: "Strengthening professional capacities of staff across 20 CPR-member churches and 5 associations.",
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
    desc: "Comprehensive psychosocial support in post-conflict contexts — certifying counselors and running anti-trauma clubs.",
    highlights: [
      "Certifying mental health providers in psychotraumatology",
      "Anti-trauma clubs in schools nationwide",
      "Faith-based counseling integration in communities",
      "Rwanda Organization of Psychotraumatology Experts (ROPRE)",
    ],
    icon: Heart,
  },
];

