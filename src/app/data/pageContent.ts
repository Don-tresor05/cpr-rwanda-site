import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";
import { pickOrUndef, type LocalizedField } from "./siteSettings";

/**
 * Deep page-text CMS layer.
 *
 * Staff edit ONE document per page in the Sanity Studio — "Departments
 * Page", "About Page" and "Secretariat Page" — to control the long-form
 * copy of each page. Every hook resolves localized fields to the current
 * UI language and returns `null` while the document is missing or Sanity
 * is unreachable, so the pages keep showing their current i18n content
 * until staff fill the CMS in. The pages merge these values over their
 * i18n fallbacks field by field, so a partially-filled document still
 * works perfectly.
 */

/* ── Shared section shape (used by Departments & Secretariat) ── */

export interface PageStatContent {
  value: string;
  label?: string;
}

export interface PageSectionContent {
  key: string;
  nav?: string;
  tag?: string;
  title?: string;
  desc?: string;
  image?: string;
  stats?: PageStatContent[];
  body?: string[];
}

/* ── Departments page ── */

export interface DepartmentsPageContent {
  heroTitle?: string;
  heroDesc?: string;
  introTag?: string;
  introTitle?: string;
  introDesc?: string;
  quickFactsTitle?: string;
  quickFacts?: string[];
  sections?: PageSectionContent[];
  cta?: { title?: string; desc?: string; btn?: string };
}

const DEPARTMENTS_PAGE_QUERY = `*[_type == "departmentsPage"][0] {
  heroTitle,
  heroDesc,
  introTag,
  introTitle,
  introDesc,
  quickFactsTitle,
  quickFacts,
  sections[] {
    key,
    nav,
    tag,
    title,
    desc,
    "image": image.asset->url,
    stats[] { value, label },
    body
  },
  cta { title, desc, btn }
}`;

interface DepartmentsPageRaw {
  heroTitle?: LocalizedField;
  heroDesc?: LocalizedField;
  introTag?: LocalizedField;
  introTitle?: LocalizedField;
  introDesc?: LocalizedField;
  quickFactsTitle?: LocalizedField;
  quickFacts?: LocalizedField[];
  sections?: {
    key?: string;
    nav?: LocalizedField;
    tag?: LocalizedField;
    title?: LocalizedField;
    desc?: LocalizedField;
    image?: string | null;
    stats?: { value?: string; label?: LocalizedField }[];
    body?: LocalizedField[];
  }[];
  cta?: {
    title?: LocalizedField;
    desc?: LocalizedField;
    btn?: LocalizedField;
  };
}

/** Resolves an array of localized texts, dropping empty entries. */
function resolveTexts(items: LocalizedField[] | undefined, lang: string): string[] {
  return (items || [])
    .map((item) => pickOrUndef(item, lang) || "")
    .filter(Boolean);
}

/** Resolves the CMS section list, keeping only keyed sections with content. */
function resolveSections(
  sections: DepartmentsPageRaw["sections"],
  lang: string
): PageSectionContent[] {
  return (sections || [])
    .filter((s) => s.key)
    .map((s) => ({
      key: s.key as string,
      nav: pickOrUndef(s.nav, lang),
      tag: pickOrUndef(s.tag, lang),
      title: pickOrUndef(s.title, lang),
      desc: pickOrUndef(s.desc, lang),
      image: s.image || undefined,
      stats: (s.stats || [])
        .map((st) => ({
          value: st.value || "",
          label: st.label ? pickOrUndef(st.label, lang) : undefined,
        }))
        .filter((st) => st.value),
      body: resolveTexts(s.body, lang),
    }))
    .filter(
      (s) =>
        s.tag ||
        s.title ||
        s.desc ||
        s.nav ||
        s.body.length > 0 ||
        !!s.image ||
        s.stats.length > 0
    );
}

/**
 * Loads the Departments page content from Sanity. Returns `null` when the
 * document doesn't exist yet so the page keeps showing its translated
 * hardcoded copy. Re-fetches when the UI language changes.
 */
export function useDepartmentsPage(): DepartmentsPageContent | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [content, setContent] = useState<DepartmentsPageContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<DepartmentsPageRaw>(DEPARTMENTS_PAGE_QUERY)
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setContent(null);
          return;
        }
        const sections = resolveSections(doc.sections, lang);
        setContent({
          heroTitle: pickOrUndef(doc.heroTitle, lang),
          heroDesc: pickOrUndef(doc.heroDesc, lang),
          introTag: pickOrUndef(doc.introTag, lang),
          introTitle: pickOrUndef(doc.introTitle, lang),
          introDesc: pickOrUndef(doc.introDesc, lang),
          quickFactsTitle: pickOrUndef(doc.quickFactsTitle, lang),
          quickFacts: resolveTexts(doc.quickFacts, lang),
          sections,
          cta: doc.cta
            ? {
                title: pickOrUndef(doc.cta.title, lang),
                desc: pickOrUndef(doc.cta.desc, lang),
                btn: pickOrUndef(doc.cta.btn, lang),
              }
            : undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setContent(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return content;
}

/* ── About page ── */

export interface AboutPageContent {
  heroTitle?: string;
  nav?: {
    whoWeAre?: string;
    visionMission?: string;
    coreValues?: string;
    execCommittee?: string;
    organigram?: string;
    ourPartners?: string;
  };
  whoWeAre?: { title?: string; p1?: string; p2?: string };
  visionMission?: {
    title?: string;
    visionTag?: string;
    visionSub?: string;
    visionDesc?: string;
    missionTag?: string;
    missionSub?: string;
    missionDesc?: string;
  };
  model?: {
    title?: string;
    desc?: string;
    step1Tag?: string;
    step1Title?: string;
    step1Desc?: string;
    step2Tag?: string;
    step2Title?: string;
    step2Desc?: string;
    step3Tag?: string;
    step3Title?: string;
    step3Desc?: string;
  };
  coreValues?: {
    title?: string;
    items?: { title: string; desc: string }[];
  };
  execCommittee?: {
    title?: string;
    desc?: string;
    boardMembers?: string;
    staff?: string;
    defaultName?: string;
    defaultRole?: string;
  };
  organigram?: { title?: string; comingSoon?: string };
  partners?: { title?: string };
  historyModal?: {
    learnMore?: string;
    badge?: string;
    title?: string;
    p1?: string;
    p2?: string;
    personName?: string;
    personRole?: string;
    cta?: string;
  };
}

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  heroTitle,
  nav {
    whoWeAre, visionMission, coreValues, execCommittee, organigram, ourPartners
  },
  whoWeAre { title, p1, p2 },
  visionMission {
    title, visionTag, visionSub, visionDesc,
    missionTag, missionSub, missionDesc
  },
  model {
    title, desc,
    step1Tag, step1Title, step1Desc,
    step2Tag, step2Title, step2Desc,
    step3Tag, step3Title, step3Desc
  },
  coreValues {
    title,
    items[] { title, desc }
  },
  execCommittee { title, desc, boardMembers, staff, defaultName, defaultRole },
  organigram { title, comingSoon },
  partners { title },
  historyModal { learnMore, badge, title, p1, p2, personName, personRole, cta }
}`;

interface AboutPageRaw {
  heroTitle?: LocalizedField;
  nav?: {
    whoWeAre?: LocalizedField;
    visionMission?: LocalizedField;
    coreValues?: LocalizedField;
    execCommittee?: LocalizedField;
    organigram?: LocalizedField;
    ourPartners?: LocalizedField;
  };
  whoWeAre?: { title?: LocalizedField; p1?: LocalizedField; p2?: LocalizedField };
  visionMission?: {
    title?: LocalizedField;
    visionTag?: LocalizedField;
    visionSub?: LocalizedField;
    visionDesc?: LocalizedField;
    missionTag?: LocalizedField;
    missionSub?: LocalizedField;
    missionDesc?: LocalizedField;
  };
  model?: {
    title?: LocalizedField;
    desc?: LocalizedField;
    step1Tag?: LocalizedField;
    step1Title?: LocalizedField;
    step1Desc?: LocalizedField;
    step2Tag?: LocalizedField;
    step2Title?: LocalizedField;
    step2Desc?: LocalizedField;
    step3Tag?: LocalizedField;
    step3Title?: LocalizedField;
    step3Desc?: LocalizedField;
  };
  coreValues?: {
    title?: LocalizedField;
    items?: { title?: LocalizedField; desc?: LocalizedField }[];
  };
  execCommittee?: {
    title?: LocalizedField;
    desc?: LocalizedField;
    boardMembers?: LocalizedField;
    staff?: LocalizedField;
    defaultName?: LocalizedField;
    defaultRole?: LocalizedField;
  };
  organigram?: { title?: LocalizedField; comingSoon?: LocalizedField };
  partners?: { title?: LocalizedField };
  historyModal?: {
    learnMore?: LocalizedField;
    badge?: LocalizedField;
    title?: LocalizedField;
    p1?: LocalizedField;
    p2?: LocalizedField;
    personName?: LocalizedField;
    personRole?: LocalizedField;
    cta?: LocalizedField;
  };
}

/**
 * Loads the About page copy from Sanity. Returns `null` when the document
 * doesn't exist yet so the page keeps showing its translated hardcoded
 * copy. Re-fetches when the UI language changes.
 */
export function useAboutPage(): AboutPageContent | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [content, setContent] = useState<AboutPageContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<AboutPageRaw>(ABOUT_PAGE_QUERY)
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setContent(null);
          return;
        }
        setContent({
          heroTitle: pickOrUndef(doc.heroTitle, lang),
          nav: doc.nav
            ? {
                whoWeAre: pickOrUndef(doc.nav.whoWeAre, lang),
                visionMission: pickOrUndef(doc.nav.visionMission, lang),
                coreValues: pickOrUndef(doc.nav.coreValues, lang),
                execCommittee: pickOrUndef(doc.nav.execCommittee, lang),
                organigram: pickOrUndef(doc.nav.organigram, lang),
                ourPartners: pickOrUndef(doc.nav.ourPartners, lang),
              }
            : undefined,
          whoWeAre: doc.whoWeAre
            ? {
                title: pickOrUndef(doc.whoWeAre.title, lang),
                p1: pickOrUndef(doc.whoWeAre.p1, lang),
                p2: pickOrUndef(doc.whoWeAre.p2, lang),
              }
            : undefined,
          visionMission: doc.visionMission
            ? {
                title: pickOrUndef(doc.visionMission.title, lang),
                visionTag: pickOrUndef(doc.visionMission.visionTag, lang),
                visionSub: pickOrUndef(doc.visionMission.visionSub, lang),
                visionDesc: pickOrUndef(doc.visionMission.visionDesc, lang),
                missionTag: pickOrUndef(doc.visionMission.missionTag, lang),
                missionSub: pickOrUndef(doc.visionMission.missionSub, lang),
                missionDesc: pickOrUndef(doc.visionMission.missionDesc, lang),
              }
            : undefined,
          model: doc.model
            ? {
                title: pickOrUndef(doc.model.title, lang),
                desc: pickOrUndef(doc.model.desc, lang),
                step1Tag: pickOrUndef(doc.model.step1Tag, lang),
                step1Title: pickOrUndef(doc.model.step1Title, lang),
                step1Desc: pickOrUndef(doc.model.step1Desc, lang),
                step2Tag: pickOrUndef(doc.model.step2Tag, lang),
                step2Title: pickOrUndef(doc.model.step2Title, lang),
                step2Desc: pickOrUndef(doc.model.step2Desc, lang),
                step3Tag: pickOrUndef(doc.model.step3Tag, lang),
                step3Title: pickOrUndef(doc.model.step3Title, lang),
                step3Desc: pickOrUndef(doc.model.step3Desc, lang),
              }
            : undefined,
          coreValues: doc.coreValues
            ? {
                title: pickOrUndef(doc.coreValues.title, lang),
                items: (doc.coreValues.items || [])
                  .map((v) => ({
                    title: pickOrUndef(v.title, lang) || "",
                    desc: pickOrUndef(v.desc, lang) || "",
                  }))
                  .filter((v) => v.title || v.desc),
              }
            : undefined,
          execCommittee: doc.execCommittee
            ? {
                title: pickOrUndef(doc.execCommittee.title, lang),
                desc: pickOrUndef(doc.execCommittee.desc, lang),
                boardMembers: pickOrUndef(doc.execCommittee.boardMembers, lang),
                staff: pickOrUndef(doc.execCommittee.staff, lang),
                defaultName: pickOrUndef(doc.execCommittee.defaultName, lang),
                defaultRole: pickOrUndef(doc.execCommittee.defaultRole, lang),
              }
            : undefined,
          organigram: doc.organigram
            ? {
                title: pickOrUndef(doc.organigram.title, lang),
                comingSoon: pickOrUndef(doc.organigram.comingSoon, lang),
              }
            : undefined,
          partners: doc.partners
            ? { title: pickOrUndef(doc.partners.title, lang) }
            : undefined,
          historyModal: doc.historyModal
            ? {
                learnMore: pickOrUndef(doc.historyModal.learnMore, lang),
                badge: pickOrUndef(doc.historyModal.badge, lang),
                title: pickOrUndef(doc.historyModal.title, lang),
                p1: pickOrUndef(doc.historyModal.p1, lang),
                p2: pickOrUndef(doc.historyModal.p2, lang),
                personName: pickOrUndef(doc.historyModal.personName, lang),
                personRole: pickOrUndef(doc.historyModal.personRole, lang),
                cta: pickOrUndef(doc.historyModal.cta, lang),
              }
            : undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setContent(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return content;
}

/* ── Secretariat page ── */

export interface SecretariatPageContent {
  heroTitle?: string;
  heroDesc?: string;
  introTag?: string;
  introTitle?: string;
  introDesc?: string;
  sgProfile?: { role?: string; name?: string; title?: string; quote?: string };
  sections?: PageSectionContent[];
  cta?: { title?: string; desc?: string; btn?: string };
}

const SECRETARIAT_PAGE_QUERY = `*[_type == "secretariatPage"][0] {
  heroTitle,
  heroDesc,
  introTag,
  introTitle,
  introDesc,
  sgProfile { role, name, title, quote },
  sections[] {
    key,
    nav,
    tag,
    title,
    desc,
    body
  },
  cta { title, desc, btn }
}`;

interface SecretariatPageRaw {
  heroTitle?: LocalizedField;
  heroDesc?: LocalizedField;
  introTag?: LocalizedField;
  introTitle?: LocalizedField;
  introDesc?: LocalizedField;
  sgProfile?: {
    role?: LocalizedField;
    name?: LocalizedField;
    title?: LocalizedField;
    quote?: LocalizedField;
  };
  sections?: {
    key?: string;
    nav?: LocalizedField;
    tag?: LocalizedField;
    title?: LocalizedField;
    desc?: LocalizedField;
    body?: LocalizedField[];
  }[];
  cta?: {
    title?: LocalizedField;
    desc?: LocalizedField;
    btn?: LocalizedField;
  };
}

/**
 * Loads the Secretariat page copy from Sanity. Returns `null` when the
 * document doesn't exist yet so the page keeps showing its translated
 * hardcoded copy. Re-fetches when the UI language changes.
 */
export function useSecretariatPage(): SecretariatPageContent | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [content, setContent] = useState<SecretariatPageContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<SecretariatPageRaw>(SECRETARIAT_PAGE_QUERY)
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setContent(null);
          return;
        }
        setContent({
          heroTitle: pickOrUndef(doc.heroTitle, lang),
          heroDesc: pickOrUndef(doc.heroDesc, lang),
          introTag: pickOrUndef(doc.introTag, lang),
          introTitle: pickOrUndef(doc.introTitle, lang),
          introDesc: pickOrUndef(doc.introDesc, lang),
          sgProfile: doc.sgProfile
            ? {
                role: pickOrUndef(doc.sgProfile.role, lang),
                name: pickOrUndef(doc.sgProfile.name, lang),
                title: pickOrUndef(doc.sgProfile.title, lang),
                quote: pickOrUndef(doc.sgProfile.quote, lang),
              }
            : undefined,
          sections: resolveSections(doc.sections, lang),
          cta: doc.cta
            ? {
                title: pickOrUndef(doc.cta.title, lang),
                desc: pickOrUndef(doc.cta.desc, lang),
                btn: pickOrUndef(doc.cta.btn, lang),
              }
            : undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setContent(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return content;
}
