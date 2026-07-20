import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "About Us",
    href: "#about",
    children: [
      {
        heading: "Organization",
        links: [
          { label: "Who We Are", href: "#who", desc: "Founded in 1963, uniting Rwanda's Protestant churches" },
          { label: "Vision & Mission", href: "#vision", desc: "Our guiding principles and long-term goals" },
          { label: "Core Values", href: "#values", desc: "Faith, unity, service, and transformation" },
        ],
      },
      {
        heading: "Leadership",
        links: [
          { label: "Executive Committee", href: "#exec", desc: "Board of directors and governance structure" },
          { label: "Organigram", href: "#org", desc: "Organizational structure and departments" },
        ],
      },
      {
        heading: "Partnerships",
        links: [
          { label: "Our Partners", href: "#partners", desc: "National and international partner organizations" },
        ],
      },
    ],
  },
  {
    label: "Secretariat",
    href: "#secretariat",
    children: [
      {
        heading: "General Secretariat",
        links: [
          { label: "SG Office", href: "#sg", desc: "Office of the Secretary General" },
          { label: "CPR Events", href: "#events", desc: "Conferences, synods, and assemblies" },
          { label: "Advocacy", href: "#advocacy", desc: "Policy engagement and civic leadership" },
          { label: "Sustainability", href: "#sustain", desc: "Environmental and institutional sustainability" },
        ],
      },
      {
        heading: "Publications",
        links: [
          { label: "SG Publications", href: "#publications", desc: "Reports, newsletters, and communiqués" },
        ],
      },
    ],
  },
  {
    label: "Departments",
    href: "#departments",
    children: [
      {
        heading: "Our Departments",
        links: [
          { label: "General Secretary", href: "#gs", desc: "Office of the Secretary General and governance" },
          { label: "Education/BNEP", href: "#bnep", desc: "Managing Protestant primary and secondary schools" },
          { label: "Diakonia/Development", href: "#diakonia", desc: "Social services, development and relief work" },
          { label: "Finance/Mobilization", href: "#finance", desc: "Resource mobilization and financial administration" },
          { label: "Youth Program", href: "#youth", desc: "Empowering youth in faith, peace and reconciliation" },
          { label: "Gender Promotion", href: "#gender", desc: "Promoting gender equality and GBV prevention" },
          { label: "Radio Inkoramutima", href: "#radio", desc: "Broadcasting messages of unity and development" },
        ],
      },
    ],
  },
  {
    label: "Radio Inkoramutima",
    href: "#radio",
    children: [
      {
        heading: "Radio Station",
        links: [
          { label: "About the Radio", href: "#radio-about", desc: "107.1 FM — Voice of the Heart" },
          { label: "Editorial Line", href: "#editorial", desc: "Evangelization, unity & development" },
          { label: "Programs & Activities", href: "#programs", desc: "Schedule, shows, and podcasts" },
        ],
      },
    ],
  },
  { label: "Gallery", href: "#gallery" },
  { label: "News", href: "#news" },
];
