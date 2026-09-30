import {
  Landmark, CalendarDays, Megaphone, Leaf, BookOpen, Users,
  FileText, Download, type LucideIcon,
} from "lucide-react";

export interface SecretariatResourceFile {
  name: string;
  url: string;
  info?: string;
  modified?: string;
}

export interface SecretariatResource {
  slug: string;
  title: string;
  description: string;
  type: "document" | "link" | "download";
  url?: string;
  icon: LucideIcon;
  files: SecretariatResourceFile[];
}

export interface SecretariatResourceData {
  id: string;
  title: string;
  tag: string;
  accent: string;
  icon: LucideIcon;
  overview: string;
  keyActivities: string[];
  resources: SecretariatResource[];
  image: string;
}

export const getSecretariatResources = (t: any): Record<string, SecretariatResourceData> => {
  return {
    sg: {
      id: "sg",
      title: t("secretariatPage.sg.title", { defaultValue: "General Secretary" }),
      tag: t("secretariatPage.sg.tag", { defaultValue: "Leadership" }),
      accent: "#4E6132",
      icon: Landmark,
      overview: t("secretariatPage.sg.desc", { defaultValue: "The Office of the General Secretary provides strategic leadership and administrative oversight for all CPR activities." }),
      keyActivities: t("secretariatPage.sg.body", { returnObjects: true, defaultValue: [
        "Strategic leadership",
        "Administrative oversight",
        "Church coordination"
      ] }),
      resources: [
        { slug: "leadership-reports", title: "Leadership Reports", description: "Annual and quarterly leadership updates.", type: "document", icon: FileText, files: [] },
        { slug: "strategic-documents", title: "Strategic Documents", description: "CPR's core strategic frameworks.", type: "download", icon: Download, files: [] },
      ],
      image: "/assets/secretariat-sg.webp",
    },
    events: {
      id: "events",
      title: t("secretariatPage.events.title", { defaultValue: "Events" }),
      tag: t("secretariatPage.events.tag", { defaultValue: "Gatherings" }),
      accent: "#8B6543",
      icon: CalendarDays,
      overview: t("secretariatPage.events.desc", { defaultValue: "Coordinating major national assemblies, synods, and faith gatherings." }),
      keyActivities: t("secretariatPage.events.body", { returnObjects: true, defaultValue: [
        "Annual Assemblies",
        "Biennial Synods",
        "Youth Summits"
      ] }),
      resources: [
        { slug: "event-schedules", title: "Event Schedules", description: "Upcoming national assemblies and synods.", type: "document", icon: FileText, files: [] },
        { slug: "assembly-reports", title: "Assembly Reports", description: "Outcomes from past major gatherings.", type: "document", icon: FileText, files: [] },
      ],
      image: "/assets/secretariat-events.webp",
    },
    meetings: {
      id: "meetings",
      title: t("secretariatPage.meetings.title", { defaultValue: "Meetings" }),
      tag: t("secretariatPage.meetings.tag", { defaultValue: "Governance" }),
      accent: "#4E6132",
      icon: Users,
      overview: t("secretariatPage.meetings.desc", { defaultValue: "Facilitating governance meetings and board retreats." }),
      keyActivities: t("secretariatPage.meetings.body", { returnObjects: true, defaultValue: [
        "Committee Sessions",
        "Board Meetings",
        "Retreats"
      ] }),
      resources: [
        { slug: "meeting-minutes", title: "Meeting Minutes", description: "Official records of CPR board meetings.", type: "document", icon: FileText, files: [] },
      ],
      image: "/assets/secretariat-meetings.webp",
    },
    advocacy: {
      id: "advocacy",
      title: t("secretariatPage.advocacy.title", { defaultValue: "Advocacy" }),
      tag: t("secretariatPage.advocacy.tag", { defaultValue: "Voice" }),
      accent: "#8B6543",
      icon: Megaphone,
      overview: t("secretariatPage.advocacy.desc", { defaultValue: "Representing the Protestant voice in national and international forums." }),
      keyActivities: t("secretariatPage.advocacy.body", { returnObjects: true, defaultValue: [
        "Policy Areas",
        "National Forums",
        "International Platforms"
      ] }),
      resources: [
        { slug: "policy-briefs", title: "Policy Briefs", description: "CPR's stance on key national policies.", type: "document", icon: FileText, files: [] },
        { slug: "advocacy-reports", title: "Advocacy Reports", description: "Impact reports from our advocacy efforts.", type: "download", icon: Download, files: [] },
      ],
      image: "/assets/secretariat-advocacy.webp",
    },
    sustainability: {
      id: "sustainability",
      title: t("secretariatPage.sustainability.title", { defaultValue: "Sustainability" }),
      tag: t("secretariatPage.sustainability.tag", { defaultValue: "Environment" }),
      accent: "#4E6132",
      icon: Leaf,
      overview: t("secretariatPage.sustainability.desc", { defaultValue: "Championing environmental stewardship and green initiatives." }),
      keyActivities: t("secretariatPage.sustainability.body", { returnObjects: true, defaultValue: [
        "Tree Initiatives",
        "Green Schools",
        "Partnerships"
      ] }),
      resources: [
        { slug: "green-school-guides", title: "Green School Guides", description: "Manuals for implementing green initiatives in schools.", type: "document", icon: FileText, files: [] },
        { slug: "sustainability-reports", title: "Sustainability Reports", description: "Progress on our environmental goals.", type: "download", icon: Download, files: [] },
      ],
      image: "/assets/secretariat-sustainability.webp",
    },
    publications: {
      id: "publications",
      title: t("secretariatPage.publications.title", { defaultValue: "Publications" }),
      tag: t("secretariatPage.publications.tag", { defaultValue: "Media" }),
      accent: "#8B6543",
      icon: BookOpen,
      overview: t("secretariatPage.publications.desc", { defaultValue: "Publishing newsletters, communiqués, and official reports." }),
      keyActivities: t("secretariatPage.publications.body", { returnObjects: true, defaultValue: [
        "Annual Reports",
        "Newsletters",
        "Communiqués"
      ] }),
      resources: [
        { slug: "newsletters", title: "Newsletters", description: "Archive of CPR's monthly newsletters.", type: "document", icon: FileText, files: [] },
        { slug: "official-communiques", title: "Official Communiqués", description: "Public statements from CPR.", type: "document", icon: FileText, files: [] },
      ],
      image: "/assets/secretariat-publications.webp",
    },
  };
};
