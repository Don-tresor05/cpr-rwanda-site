import type { NavItem } from "../types";

export const getNavItems = (t: any): NavItem[] => [
  { label: t("nav.home"), href: "/" },
  {
    label: t("nav.about"),
    href: "/about",
    children: [
      {
        heading: t("nav.organization"),
        links: [
          { label: t("nav.whoWeAre"), href: "/about", desc: t("nav.whoWeAreDesc") },
          { label: t("nav.visionMission"), href: "/about", desc: t("nav.visionMissionDesc") },
          { label: t("nav.coreValues"), href: "/about", desc: t("nav.coreValuesDesc") },
        ],
      },
      {
        heading: t("nav.leadership"),
        links: [
          { label: t("nav.execCommittee"), href: "/#exec", desc: t("nav.execCommitteeDesc") },
          { label: t("nav.organigram"), href: "/#org", desc: t("nav.organigramDesc") },
        ],
      },
      {
        heading: t("nav.partnerships"),
        links: [
          { label: t("nav.ourPartners"), href: "/#partners", desc: t("nav.ourPartnersDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.secretariat"),
    href: "/#secretariat",
    children: [
      {
        heading: t("nav.generalSecretariat"),
        links: [
          { label: t("nav.sgOffice"), href: "/#sg", desc: t("nav.sgOfficeDesc") },
          { label: t("nav.cprEvents"), href: "/#events", desc: t("nav.cprEventsDesc") },
          { label: t("nav.advocacy"), href: "/#advocacy", desc: t("nav.advocacyDesc") },
          { label: t("nav.sustainability"), href: "/#sustain", desc: t("nav.sustainabilityDesc") },
        ],
      },
      {
        heading: t("nav.publications"),
        links: [
          { label: t("nav.sgPublications"), href: "/#publications", desc: t("nav.sgPublicationsDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.departments"),
    href: "/#departments",
    children: [
      {
        heading: t("nav.ourDepartments"),
        links: [
          { label: t("nav.generalSecretary"), href: "/#gs", desc: t("nav.generalSecretaryDesc") },
          { label: t("nav.education"), href: "/#bnep", desc: t("nav.educationDesc") },
          { label: t("nav.diakonia"), href: "/#diakonia", desc: t("nav.diakoniaDesc") },
          { label: t("nav.finance"), href: "/#finance", desc: t("nav.financeDesc") },
          { label: t("nav.youthProgram"), href: "/#youth", desc: t("nav.youthProgramDesc") },
          { label: t("nav.genderPromotion"), href: "/#gender", desc: t("nav.genderPromotionDesc") },
          { label: t("nav.radioStation"), href: "/#radio", desc: t("nav.aboutRadioDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.radio"),
    href: "/#radio",
    children: [
      {
        heading: t("nav.radioStation"),
        links: [
          { label: t("nav.aboutRadio"), href: "/#radio-about", desc: t("nav.aboutRadioDesc") },
          { label: t("nav.editorialLine"), href: "/#editorial", desc: t("nav.editorialLineDesc") },
          { label: t("nav.programs"), href: "/#programs", desc: t("nav.programsDesc") },
        ],
      },
    ],
  },
  { label: t("nav.gallery"), href: "/#gallery" },
  { label: t("nav.news"), href: "/#news" },
];
