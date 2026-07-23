import {
  Crown,
  GraduationCap,
  Handshake,
  Coins,
  Cog,
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
    { icon: Crown, title: items[0].title, desc: items[0].desc, link: "#departments" },
    { icon: GraduationCap, title: items[1].title, desc: items[1].desc, link: "#departments" },
    { icon: Handshake, title: items[2].title, desc: items[2].desc, link: "#departments" },
    { icon: Coins, title: items[3].title, desc: items[3].desc, link: "#departments" },
    { icon: Cog, title: items[4].title, desc: items[4].desc, link: "#departments" },
    { icon: Scale, title: items[5].title, desc: items[5].desc, link: "#departments" },
    { icon: Radio, title: items[6].title, desc: items[6].desc, link: "#departments" },
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
