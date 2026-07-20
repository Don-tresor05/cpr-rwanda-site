import { Users, GraduationCap, Radio, Star, type LucideIcon } from "lucide-react";

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  icon: LucideIcon;
}

export const STATS: Stat[] = [
  { value: 19, label: "Member Churches", suffix: "", icon: Users },
  { value: 595, label: "Primary Schools", suffix: "+", icon: GraduationCap },
  { value: 107.1, label: "FM Frequency", suffix: " FM", icon: Radio },
  { value: 60, label: "Years of Service", suffix: "+", icon: Star },
];
