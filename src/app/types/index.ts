export interface NavItem {
  label: string;
  href: string;
  children?: {
    heading?: string;
    links: { label: string; href: string; desc?: string }[];
  }[];
}
