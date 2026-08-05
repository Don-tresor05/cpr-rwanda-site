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

export interface MemberChurch {
  name: string;
  url?: string;
}

export const MEMBER_CHURCHES: MemberChurch[] = [
  { name: "Eglise Presbytérienne au Rwanda (EPR)", url: "https://www.epr.rw" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Kigali (EAR-D/Kigali)" },
  { name: "Union des Eglises Baptistes au Rwanda (UEBR)" },
  { name: "Eglise Méthodiste Libre au Rwanda (EMLR)" },
  { name: "Association des Eglises Baptistes au Rwanda (AEBR)", url: "https://aebr.org.rw/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Byumba (EAR-D/Byumba)" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Butare (EAR-D/Butare)", url: "https://www.earbutarediocese.org/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Shyogwe (EAR-D/Shyogwe)", url: "https://earshyogwe.com/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Cyangugu (EAR-D/Cyangugu)", url: "https://www.earcyangugudiocese.rw/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Kibungo (EAR-D/Kibungo)" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Kigeme (EAR-D/Kigeme)", url: "https://kigemediocese.rw/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Gahini (EAR-D/Gahini)" },
  { name: "Eglise Adventiste du Septième Jour au Rwanda (EASJR)", url: "https://www.rumadventist.org/" },
  { name: "Association des Eglises de Pentecôte au Rwanda (ADEPR)", url: "http://www.adeprchurch.rw/" },
  { name: "Eglise Évangélique des Amis au Rwanda (EEAR)", url: "https://www.evangelicalfriendschurchofrwanda.com/" },
  { name: "Harvest Christian Church (HCC)" },
  { name: "Lutheran Church of Rwanda (LCR)", url: "https://lutheranchurchofrwanda.org/" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Karongi (EAR-D/Karongi)" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Shyira (EAR-D/Shyira)" },
  { name: "Eglise Anglicane au Rwanda, Diocèse de Gasabo (EAR-D/Gasabo)", url: "https://eargasabo.rw/" },
  { name: "The Salvation Army Church", url: "https://www.salvationarmy.org/territories/rwanda" },
  { name: "Believers Eastern Church (BEC)", url: "https://www.bec.org/" },
  { name: "SEIRA Community Church", url: "https://www.seirachurch.org" },
  { name: "Ligue pour La Lecture de la Bible (LLBR)", url: "https://scriptureunion.rw/" },
  { name: "Jeunesse Pour Christ (JPC)", url: "https://www.christchurch.us/" },
  { name: "African Leadership and Reconciliation Ministries (ALARM)", url: "https://www.alarm-inc.org/" },
  { name: "African Evangelistics Enterprises (AEE)", url: "https://www.aeerwanda.ngo/" },
  { name: "BARAKABAHO Foundation" },
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

