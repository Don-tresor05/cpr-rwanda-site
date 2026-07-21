import type { ComponentType, ForwardRefExoticComponent } from "react";
import { Radio } from "lucide-react";
import { ChurchIcon, SchoolIcon, ServiceRibbonIcon } from "../components/icons/StatsIcons";

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  icon: ComponentType<any> | ForwardRefExoticComponent<any>;
}

export const STATS: Stat[] = [
  { value: 19, label: "Member Churches", suffix: "", icon: ChurchIcon },
  { value: 595, label: "Primary Schools", suffix: "+", icon: SchoolIcon },
  { value: 107.1, label: "FM Frequency", suffix: " FM", icon: Radio },
  { value: 60, label: "Years of Service", suffix: "+", icon: ServiceRibbonIcon },
];
