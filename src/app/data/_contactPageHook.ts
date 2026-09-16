import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../../lib/sanityClient";

/* ── Resolved (public) types ── */

export interface ContactPageContent {
  heroTag?: string;
  heroTitle?: string;
  heroDesc?: string;
  heroImage?: string;
  heroChip1?: string;
  heroChip2?: string;
  nav?: { form?: string; info?: string; hours?: string; faq?: string };
  info?: {
    tag?: string;
    title?: string;
    desc?: string;
    cards?: {
      title?: string;
      icon?: string;
      line1?: string;
      line2?: string;
      color?: string;
    }[];
  };
  map?: {
    tag?: string;
    title?: string;
    desc?: string;
    cardTitle?: string;
    directionsBtn?: string;
    openInMaps?: string;
    mapPlace?: string;
  };
  form?: {
    tag?: string;
    title?: string;
    desc?: string;
    subjectOptions?: string[];
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    subjectLabel?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    sendBtn?: string;
    sendingText?: string;
    successTitle?: string;
    successDesc?: string;
    sendAnother?: string;
    errorTitle?: string;
    errorDesc?: string;
    tryAgain?: string;
    errors?: { name?: string; email?: string; message?: string };
  };
  hours?: {
    tag?: string;
    title?: string;
    desc?: string;
    days?: { day?: string; time?: string }[];
  };
  faq?: {
    tag?: string;
    title?: string;
    desc?: string;
    items?: { q?: string; a?: string }[];
  };
  cta?: {
    title?: string;
    desc?: string;
    callBtn?: string;
    emailBtn?: string;
    chatLabel?: string;
  };
}

/* ── Sanity raw types ── */

type LF = { en?: string; fr?: string; rw?: string } | null | undefined;

interface Raw {
  heroTag?: LF;
  heroTitle?: LF;
  heroDesc?: LF;
  heroImage?: string | null;
  heroChip1?: LF;
  heroChip2?: LF;
  nav?: { form?: LF; info?: LF; hours?: LF; faq?: LF };
  info?: {
    tag?: LF;
    title?: LF;
    desc?: LF;
    cards?: {
      title?: LF;
      icon?: string;
      line1?: LF;
      line2?: LF;
      color?: string;
    }[];
  };
  map?: {
    tag?: LF;
    title?: LF;
    desc?: LF;
    cardTitle?: LF;
    directionsBtn?: LF;
    openInMaps?: LF;
    mapPlace?: string;
  };
  form?: {
    tag?: LF;
    title?: LF;
    desc?: LF;
    subjectOptions?: string[];
    nameLabel?: LF;
    namePlaceholder?: LF;
    emailLabel?: LF;
    emailPlaceholder?: LF;
    phoneLabel?: LF;
    phonePlaceholder?: LF;
    subjectLabel?: LF;
    messageLabel?: LF;
    messagePlaceholder?: LF;
    sendBtn?: LF;
    sendingText?: LF;
    successTitle?: LF;
    successDesc?: LF;
    sendAnother?: LF;
    errorTitle?: LF;
    errorDesc?: LF;
    tryAgain?: LF;
    errors?: { name?: string; email?: string; message?: string };
  };
  hours?: {
    tag?: LF;
    title?: LF;
    desc?: LF;
    days?: { day?: LF; time?: LF }[];
  };
  faq?: {
    tag?: LF;
    title?: LF;
    desc?: LF;
    items?: { q?: LF; a?: LF }[];
  };
  cta?: {
    title?: LF;
    desc?: LF;
    callBtn?: LF;
    emailBtn?: LF;
    chatLabel?: LF;
  };
}

const CONTACT_PAGE_QUERY = `*[_type == "contactPage" && _id == "contactPage"][0] {
  "heroTag": heroTag,
  "heroTitle": heroTitle,
  "heroDesc": heroDesc,
  "heroImage": heroImage.asset->url,
  "heroChip1": heroChip1,
  "heroChip2": heroChip2,
  nav { form, info, hours, faq },
  info {
    tag, title, desc,
    cards[] { title, icon, line1, line2, color }
  },
  map { tag, title, desc, cardTitle, directionsBtn, openInMaps, mapPlace },
  form {
    tag, title, desc, subjectOptions,
    nameLabel, namePlaceholder, emailLabel, emailPlaceholder,
    phoneLabel, phonePlaceholder, subjectLabel,
    messageLabel, messagePlaceholder,
    sendBtn, sendingText, successTitle, successDesc, sendAnother,
    errorTitle, errorDesc, tryAgain,
    errors
  },
  hours { tag, title, desc, days[] { day, time } },
  faq { tag, title, desc, items[] { q, a } },
  cta { title, desc, callBtn, emailBtn, chatLabel }
}`;

function pick(v: LF | undefined, lang: string): string | undefined {
  if (!v || typeof v !== "object") return v as string | undefined;
  return (v as Record<string, string | undefined>)[lang]
    || (v as Record<string, string | undefined>).en
    || undefined;
}

/** Resolve a single field value from CMS, falling back to locale (i18n) object. */
function resolveField(
  cmsVal: LF | string | undefined,
  fallbackLocaleObj: Record<string, unknown> | undefined,
  lang: string
): string | undefined {
  if (cmsVal !== undefined && cmsVal !== null) {
    return typeof cmsVal === "string" ? cmsVal : pick(cmsVal, lang);
  }
  // Try locale fallback (the i18n object from t("contactPage"))
  if (fallbackLocaleObj) {
    const val = fallbackLocaleObj[lang] || fallbackLocaleObj.en;
    return typeof val === "string" ? val : undefined;
  }
  return undefined;
}

/**
 * Loads the Contact page content from Sanity, merging CMS data with
 * locale (i18n) fallbacks so the page never breaks when a field is empty.
 */
export function useContactPage(): ContactPageContent | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);

  // Get the locale fallback object (same as what ContactPage currently reads)
  const { t } = useTranslation("home");
  const cpFallback = (t("contactPage", { returnObjects: true }) as Record<string, unknown>) ?? {};

  const [content, setContent] = useState<ContactPageContent | null>(null);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<Raw>(CONTACT_PAGE_QUERY)
      .then((doc: Raw | null) => {
        if (cancelled || !doc) {
          if (!cancelled) setContent(null);
          return;
        }

        // Helper to resolve a localized field with locale fallback
        const rf = (
          cmsVal: LF | string | undefined,
          fallbackKey: string
        ): string | undefined => {
          const fallback = cpFallback[fallbackKey] as Record<string, unknown> | undefined;
          return resolveField(cmsVal, fallback, lang);
        };

        setContent({
          heroTag: rf(doc.heroTag, "heroTag"),
          heroTitle: rf(doc.heroTitle, "heroTitle"),
          heroDesc: rf(doc.heroDesc, "heroDesc"),
          heroImage: doc.heroImage || undefined,
          heroChip1: rf(doc.heroChip1, "heroChip1"),
          heroChip2: rf(doc.heroChip2, "heroChip2"),
          nav: doc.nav
            ? {
                form: rf(doc.nav.form, "nav"),
                info: rf(doc.nav.info, "nav"),
                hours: rf(doc.nav.hours, "nav"),
                faq: rf(doc.nav.faq, "nav"),
              }
            : undefined,
          info: doc.info
            ? {
                tag: rf(doc.info.tag, "info"),
                title: rf(doc.info.title, "info"),
                desc: rf(doc.info.desc, "info"),
                cards: (doc.info.cards || []).map((c) => ({
                  title: rf(c.title, "info"),
                  icon: c.icon,
                  line1: rf(c.line1, "info"),
                  line2: rf(c.line2, "info"),
                  color: c.color,
                })),
              }
            : undefined,
          map: doc.map
            ? {
                tag: rf(doc.map.tag, "map"),
                title: rf(doc.map.title, "map"),
                desc: rf(doc.map.desc, "map"),
                cardTitle: rf(doc.map.cardTitle, "map"),
                directionsBtn: rf(doc.map.directionsBtn, "map"),
                openInMaps: rf(doc.map.openInMaps, "map"),
                mapPlace: doc.map.mapPlace,
              }
            : undefined,
          form: doc.form
            ? {
                tag: rf(doc.form.tag, "form"),
                title: rf(doc.form.title, "form"),
                desc: rf(doc.form.desc, "form"),
                subjectOptions: doc.form.subjectOptions,
                nameLabel: rf(doc.form.nameLabel, "form"),
                namePlaceholder: rf(doc.form.namePlaceholder, "form"),
                emailLabel: rf(doc.form.emailLabel, "form"),
                emailPlaceholder: rf(doc.form.emailPlaceholder, "form"),
                phoneLabel: rf(doc.form.phoneLabel, "form"),
                phonePlaceholder: rf(doc.form.phonePlaceholder, "form"),
                subjectLabel: rf(doc.form.subjectLabel, "form"),
                messageLabel: rf(doc.form.messageLabel, "form"),
                messagePlaceholder: rf(doc.form.messagePlaceholder, "form"),
                sendBtn: rf(doc.form.sendBtn, "form"),
                sendingText: rf(doc.form.sendingText, "form"),
                successTitle: rf(doc.form.successTitle, "form"),
                successDesc: rf(doc.form.successDesc, "form"),
                sendAnother: rf(doc.form.sendAnother, "form"),
                errorTitle: rf(doc.form.errorTitle, "form"),
                errorDesc: rf(doc.form.errorDesc, "form"),
                tryAgain: rf(doc.form.tryAgain, "form"),
                errors: doc.form.errors,
              }
            : undefined,
          hours: doc.hours
            ? {
                tag: rf(doc.hours.tag, "hours"),
                title: rf(doc.hours.title, "hours"),
                desc: rf(doc.hours.desc, "hours"),
                days: (doc.hours.days || []).map((d) => ({
                  day: rf(d.day, "hours"),
                  time: rf(d.time, "hours"),
                })),
              }
            : undefined,
          faq: doc.faq
            ? {
                tag: rf(doc.faq.tag, "faq"),
                title: rf(doc.faq.title, "faq"),
                desc: rf(doc.faq.desc, "faq"),
                items: (doc.faq.items || []).map((fi) => ({
                  q: rf(fi.q, "faq"),
                  a: rf(fi.a, "faq"),
                })),
              }
            : undefined,
          cta: doc.cta
            ? {
                title: rf(doc.cta.title, "cta"),
                desc: rf(doc.cta.desc, "cta"),
                callBtn: rf(doc.cta.callBtn, "cta"),
                emailBtn: rf(doc.cta.emailBtn, "cta"),
                chatLabel: rf(doc.cta.chatLabel, "cta"),
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
  }, [lang, t]);

  return content;
}
