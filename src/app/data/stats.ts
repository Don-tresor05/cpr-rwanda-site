import type { ComponentType, ForwardRefExoticComponent } from "react";
import { Radio } from "lucide-react";
import { ChurchIcon, SchoolIcon, ServiceRibbonIcon } from "../components/icons/StatsIcons";

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  icon: ComponentType<any> | ForwardRefExoticComponent<any>;
}

export const getStats = (t: any): Stat[] => [
  { value: 25, label: t("stats.churches"), suffix: "", icon: ChurchIcon },
  { value: 595, label: t("stats.schools"), suffix: "+", icon: SchoolIcon },
  { value: 107.1, label: t("stats.fm"), suffix: " FM", icon: Radio },
  { value: 60, label: t("stats.years"), suffix: "+", icon: ServiceRibbonIcon },
];
