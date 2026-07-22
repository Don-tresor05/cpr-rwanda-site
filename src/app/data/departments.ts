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

export const getDepartments = (t: any): Department[] => {
  const items = t("departments.items", { returnObjects: true }) as {title: string, desc: string}[];
  return [
    {
      icon: Crown,
      title: items[0].title,
      desc: items[0].desc,
      link: "#departments",
    },
    {
      icon: GraduationCap,
      title: items[1].title,
      desc: items[1].desc,
      link: "#departments",
    },
    {
      icon: Handshake,
      title: items[2].title,
      desc: items[2].desc,
      link: "#departments",
    },
    {
      icon: Coins,
      title: items[3].title,
      desc: items[3].desc,
      link: "#departments",
    },
    {
      icon: Cog,
      title: items[4].title,
      desc: items[4].desc,
      link: "#departments",
    },
    {
      icon: Scale,
      title: items[5].title,
      desc: items[5].desc,
      link: "#departments",
    },
    {
      icon: Radio,
      title: items[6].title,
      desc: items[6].desc,
      link: "#departments",
    },
  ];
};
