import {
  Crown,
  GraduationCap,
  Handshake,
  Coins,
  Cog,
  Scale,
  Radio,
  type LucideIcon
} from "lucide-react";

export interface Department {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}

export const DEPARTMENTS: Department[] = [
  {
    icon: Crown,
    title: "General Secretary",
    desc: "Oversees the strategic direction, coordination, and overall governance of the Conseil Protestant du Rwanda.",
    link: "#departments",
  },
  {
    icon: GraduationCap,
    title: "Education/BNEP",
    desc: "Manages Protestant primary and secondary schools, implementing modern pedagogical methodologies across the country.",
    link: "#departments",
  },
  {
    icon: Handshake,
    title: "Diakonia/Development",
    desc: "Coordinates social services, humanitarian relief operations, and sustainable community development programs.",
    link: "#departments",
  },
  {
    icon: Coins,
    title: "Finance/Mobilization",
    desc: "Ensures institutional financial sustainability, transparent administration, and strategic resource mobilization.",
    link: "#departments",
  },
  {
    icon: Cog,
    title: "Youth Program",
    desc: "Empowers the next generation through peacebuilding, reconciliation projects, and active leadership training.",
    link: "#departments",
  },
  {
    icon: Scale,
    title: "Gender Promotion",
    desc: "Promotes gender equality, fights gender-based violence (GBV), and empowers women in economic and social spheres.",
    link: "#departments",
  },
  {
    icon: Radio,
    title: "Radio Inkoramutima",
    desc: "Spreads messages of evangelization, national unity, healing, and community development across Rwanda on 107.1 FM.",
    link: "#departments",
  },
];
