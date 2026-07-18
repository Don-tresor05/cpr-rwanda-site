import { GraduationCap, Heart, Megaphone, Globe, type LucideIcon } from "lucide-react";

export interface Department {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  accent: string;
  link: string;
}

export const DEPARTMENTS: Department[] = [
  {
    icon: GraduationCap,
    title: "Education (BNEP)",
    desc: "The Protestant Education Bureau manages 595 primary schools, implementing modern pedagogy to transform learning outcomes for thousands of Rwandan children.",
    color: "bg-blue-50",
    accent: "#0F2C59",
    link: "#departments",
  },
  {
    icon: Heart,
    title: "Gender & Health",
    desc: "Combating gender-based violence, providing trauma counseling for genocide survivors, empowering women, and raising HIV/AIDS awareness across communities.",
    color: "bg-amber-50",
    accent: "#B8860B",
    link: "#departments",
  },
  {
    icon: Megaphone,
    title: "Evangelism & Communication",
    desc: "Youth empowerment projects, Christian education programs, and strategic evangelism centers spreading the Gospel across Rwanda's hills and valleys.",
    color: "bg-emerald-50",
    accent: "#065F46",
    link: "#departments",
  },
  {
    icon: Globe,
    title: "Advocacy & Sustainability",
    desc: "Engaging policymakers, championing human rights, and building institutional resilience to ensure CPR's impact endures for future generations.",
    color: "bg-purple-50",
    accent: "#4C1D95",
    link: "#departments",
  },
];
