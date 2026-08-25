import {
  Crown, GraduationCap, Handshake, Coins, Users, Scale, Radio,
  BookOpen, FileText, Download, ExternalLink, type LucideIcon,
} from "lucide-react";

export interface DepartmentResourceFile {
  name: string;
  url: string;
  info?: string;     // e.g. "1.2 MB"
  modified?: string; // e.g. "Jun 15, 2026"
}

export interface DepartmentResource {
  slug: string;
  title: string;
  description: string;
  type: "document" | "link" | "download";
  url?: string;
  icon: LucideIcon;
  files: DepartmentResourceFile[];
}

export interface DepartmentResourceData {
  id: string;
  title: string;
  tag: string;
  accent: string;
  icon: LucideIcon;
  overview: string;
  keyActivities: string[];
  resources: DepartmentResource[];
  image: string;
}

export const getDepartmentResources = (t: any): Record<string, DepartmentResourceData> => {
  const data = t("departmentResourcesData", { returnObjects: true });
  
  return {
    gs: {
      id: "gs",
      title: data.gs.title,
      tag: data.gs.tag,
      accent: "#4E6132",
      icon: Crown,
      overview: data.gs.overview,
      keyActivities: data.gs.keyActivities,
      resources: [
        { slug: "annual-report-2024", title: data.gs.resources[0].title, description: data.gs.resources[0].description, type: "document", icon: FileText, files: [] },
        { slug: "strategic-plan-2023-2028", title: data.gs.resources[1].title, description: data.gs.resources[1].description, type: "document", icon: BookOpen, files: [] },
        { slug: "member-church-directory", title: data.gs.resources[2].title, description: data.gs.resources[2].description, type: "download", icon: Download, files: [] },
      ],
      image: "/assets/cpr-members.webp",
    },
    bnep: {
      id: "bnep",
      title: data.bnep.title,
      tag: data.bnep.tag,
      accent: "#8B6543",
      icon: GraduationCap,
      overview: data.bnep.overview,
      keyActivities: data.bnep.keyActivities,
      resources: [
        { slug: "school-directory", title: data.bnep.resources[0].title, description: data.bnep.resources[0].description, type: "document", icon: FileText, files: [] },
        { slug: "teacher-training-handbook", title: data.bnep.resources[1].title, description: data.bnep.resources[1].description, type: "download", icon: Download, files: [] },
        { slug: "education-statistics-report", title: data.bnep.resources[2].title, description: data.bnep.resources[2].description, type: "document", icon: BookOpen, files: [] },
      ],
      image: "/assets/education.webp",
    },
    diakonia: {
      id: "diakonia",
      title: data.diakonia.title,
      tag: data.diakonia.tag,
      accent: "#4E6132",
      icon: Handshake,
      overview: data.diakonia.overview,
      keyActivities: data.diakonia.keyActivities,
      resources: [
        { slug: "trauma-healing-program-guide", title: data.diakonia.resources[0].title, description: data.diakonia.resources[0].description, type: "document", icon: BookOpen, files: [] },
        { slug: "ropre-certification-standards", title: data.diakonia.resources[1].title, description: data.diakonia.resources[1].description, type: "document", icon: FileText, files: [] },
        { slug: "community-development-toolkit", title: data.diakonia.resources[2].title, description: data.diakonia.resources[2].description, type: "download", icon: Download, files: [] },
      ],
      image: "/assets/handover.webp",
    },
    finance: {
      id: "finance",
      title: data.finance.title,
      tag: data.finance.tag,
      accent: "#8B6543",
      icon: Coins,
      overview: data.finance.overview,
      keyActivities: data.finance.keyActivities,
      resources: [
        { slug: "financial-transparency-report", title: data.finance.resources[0].title, description: data.finance.resources[0].description, type: "document", icon: FileText, files: [] },
        { slug: "donor-partnership-guidelines", title: data.finance.resources[1].title, description: data.finance.resources[1].description, type: "document", icon: BookOpen, files: [] },
      ],
      image: "/assets/autorites.webp",
    },
    youth: {
      id: "youth",
      title: data.youth.title,
      tag: data.youth.tag,
      accent: "#4E6132",
      icon: Users,
      overview: data.youth.overview,
      keyActivities: data.youth.keyActivities,
      resources: [
        { slug: "youth-leadership-curriculum", title: data.youth.resources[0].title, description: data.youth.resources[0].description, type: "document", icon: BookOpen, files: [] },
        { slug: "summit-reports-outcomes", title: data.youth.resources[1].title, description: data.youth.resources[1].description, type: "document", icon: FileText, files: [] },
        { slug: "youth-ministry-resources", title: data.youth.resources[2].title, description: data.youth.resources[2].description, type: "download", icon: Download, files: [] },
      ],
      image: "/assets/Youth2.webp",
    },
    gender: {
      id: "gender",
      title: data.gender.title,
      tag: data.gender.tag,
      accent: "#8B6543",
      icon: Scale,
      overview: data.gender.overview,
      keyActivities: data.gender.keyActivities,
      resources: [
        { slug: "gbv-prevention-training-manual", title: data.gender.resources[0].title, description: data.gender.resources[0].description, type: "document", icon: BookOpen, files: [] },
        { slug: "womens-cooperative-handbook", title: data.gender.resources[1].title, description: data.gender.resources[1].description, type: "download", icon: Download, files: [] },
        { slug: "gender-policy-framework", title: data.gender.resources[2].title, description: data.gender.resources[2].description, type: "document", icon: FileText, files: [] },
      ],
      image: "/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp",
    },
    radio: {
      id: "radio",
      title: data.radio.title,
      tag: data.radio.tag,
      accent: "#4E6132",
      icon: Radio,
      overview: data.radio.overview,
      keyActivities: data.radio.keyActivities,
      resources: [
        { slug: "radio-program-schedule", title: data.radio.resources[0].title, description: data.radio.resources[0].description, type: "document", icon: FileText, files: [] },
        { slug: "listener-feedback-reports", title: data.radio.resources[1].title, description: data.radio.resources[1].description, type: "document", icon: BookOpen, files: [] },
        { slug: "media-partnership-guidelines", title: data.radio.resources[2].title, description: data.radio.resources[2].description, type: "link", icon: ExternalLink, files: [] },
      ],
      image: "/assets/radio-studio.webp",
    },
  };
};
