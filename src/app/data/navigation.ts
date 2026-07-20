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
        heading: "Education (BNEP)",
        links: [
          { label: "Protestant Education Bureau", href: "#bnep", desc: "Managing 595 primary schools across Rwanda" },
          { label: "Active Pedagogy (PAP)", href: "#pap", desc: "Modern participatory teaching methods" },
          { label: "Education Partners", href: "#edu-partners", desc: "Partners supporting education programs" },
        ],
      },
      {
        heading: "Gender & Health",
        links: [
          { label: "Fight Against GBV", href: "#gbv", desc: "Gender-based violence prevention and response" },
          { label: "Trauma Counseling", href: "#trauma", desc: "Post-genocide healing and reconciliation" },
          { label: "HIV/AIDS Awareness", href: "#hiv", desc: "Community health education programs" },
        ],
      },
      {
        heading: "Evangelism",
        links: [
          { label: "Youth Projects", href: "#youth", desc: "Empowering Rwanda's next generation" },
          { label: "Evangelism Centers", href: "#centers", desc: "Outreach and church planting" },
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
  { label: "Contact", href: "#contact" },
];
