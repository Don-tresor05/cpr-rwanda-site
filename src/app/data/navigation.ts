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
          { label: t("nav.whoWeAre"), href: "/about#who-we-are", desc: t("nav.whoWeAreDesc") },
          { label: t("nav.visionMission"), href: "/about#vision-mission", desc: t("nav.visionMissionDesc") },
          { label: t("nav.coreValues"), href: "/about#core-values", desc: t("nav.coreValuesDesc") },
        ],
      },
      {
        heading: t("nav.leadership"),
        links: [
          { label: t("nav.execCommittee"), href: "/about#executive-committee", desc: t("nav.execCommitteeDesc") },
          { label: t("nav.organigram"), href: "/about#organigram", desc: t("nav.organigramDesc") },
        ],
      },
      {
        heading: t("nav.partnerships"),
        links: [
          { label: t("nav.ourPartners"), href: "/about#our-partners", desc: t("nav.ourPartnersDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.secretariat"),
    href: "/secretariat",
    children: [
      {
        heading: t("nav.generalSecretariat"),
        links: [
          { label: t("nav.sgOffice"), href: "/secretariat#sg", desc: t("nav.sgOfficeDesc") },
          { label: t("nav.cprEvents"), href: "/secretariat#events", desc: t("nav.cprEventsDesc") },
          { label: t("nav.cprMeetings"), href: "/secretariat#meetings", desc: t("nav.cprMeetingsDesc") },
          { label: t("nav.advocacy"), href: "/secretariat#advocacy", desc: t("nav.advocacyDesc") },
          { label: t("nav.sustainability"), href: "/secretariat#sustainability", desc: t("nav.sustainabilityDesc") },
        ],
      },
      {
        heading: t("nav.publications"),
        links: [
          { label: t("nav.sgPublications"), href: "/secretariat#publications", desc: t("nav.sgPublicationsDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.departments"),
    href: "/departments",
    children: [
      {
        heading: t("nav.ourDepartments"),
        links: [
          { label: t("nav.generalSecretary"), href: "/departments#gs", desc: t("nav.generalSecretaryDesc") },
          { label: t("nav.education"), href: "/departments#bnep", desc: t("nav.educationDesc") },
          { label: t("nav.diakonia"), href: "/departments#diakonia", desc: t("nav.diakoniaDesc") },
          { label: t("nav.finance"), href: "/departments#finance", desc: t("nav.financeDesc") },
          { label: t("nav.youthProgram"), href: "/departments#youth", desc: t("nav.youthProgramDesc") },
          { label: t("nav.genderPromotion"), href: "/departments#gender", desc: t("nav.genderPromotionDesc") },
          { label: t("nav.radioStation"), href: "/departments#radio", desc: t("nav.aboutRadioDesc") },
        ],
      },
    ],
  },
  {
    label: t("nav.radio"),
    href: "/radio",
    children: [
      {
        heading: t("nav.radioStation"),
        links: [
          { label: t("nav.aboutRadio"), href: "/radio#about", desc: t("nav.aboutRadioDesc") },
          { label: t("nav.editorialLine"), href: "/radio#editorial", desc: t("nav.editorialLineDesc") },
          { label: t("nav.programs"), href: "/radio#programs", desc: t("nav.programsDesc") },
        ],
      },
    ],
  },
  { label: t("nav.gallery"), href: "/gallery" },
  { label: t("nav.news"), href: "/newsroom" },
];
