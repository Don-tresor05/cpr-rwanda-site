#!/usr/bin/env node
/**
 * seed-contact-page.mjs
 * Creates the `contactPage` singleton in Sanity project 2bpoen39/production
 * using the CLI's stored login session token.
 *
 * Usage: node scripts/seed-contact-page.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Read locale files
const enHome = JSON.parse(
  readFileSync(path.join(PROJECT_ROOT, "src/locales/en/home.json"), "utf8")
);
const frHome = JSON.parse(
  readFileSync(path.join(PROJECT_ROOT, "src/locales/fr/home.json"), "utf8")
);
const rwHome = JSON.parse(
  readFileSync(path.join(PROJECT_ROOT, "src/locales/rw/home.json"), "utf8")
);

// Read stored CLI session token
const configPath = path.join(
  process.env.HOME,
  ".config",
  "sanity",
  "config.json"
);
const config = JSON.parse(readFileSync(configPath, "utf8"));
const token = config.authToken || config.auth?.token;
if (!token) {
  console.error("No Sanity CLI token found. Run `npx sanity login` first.");
  process.exit(1);
}

const client = createClient({
  projectId: "2bpoen39",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// Helper: build localized field { en, fr, rw }
const loc = (key) => ({
  en: enHome?.contactPage?.[key] ?? "",
  fr: frHome?.contactPage?.[key] ?? "",
  rw: rwHome?.contactPage?.[key] ?? "",
});

// Helper: build localized field for nested object
const locNested = (objKey, field) => ({
  en: enHome?.contactPage?.[objKey]?.[field] ?? "",
  fr: frHome?.contactPage?.[objKey]?.[field] ?? "",
  rw: rwHome?.contactPage?.[objKey]?.[field] ?? "",
});

// Build the document
const contactPage = {
  _type: "contactPage",
  _id: "singleton.contactPage",

  // Hero
  heroTag: loc("heroTag"),
  heroTitle: loc("heroTitle"),
  heroDesc: loc("heroDesc"),
  heroChip1: loc("heroChip1"),
  heroChip2: loc("heroChip2"),

  // Nav
  nav: {
    form: locNested("nav", "form"),
    info: locNested("nav", "info"),
    hours: locNested("nav", "hours"),
    faq: locNested("nav", "faq"),
  },

  // Info cards
  info: {
    tag: locNested("info", "tag"),
    title: locNested("info", "title"),
    desc: locNested("info", "desc"),
    cards: (enHome?.contactPage?.info?.cards || []).map((card, i) => ({
      title: {
        en: card.title || "",
        fr: frHome?.contactPage?.info?.cards?.[i]?.title || "",
        rw: rwHome?.contactPage?.info?.cards?.[i]?.title || "",
      },
      icon: ["building", "phone", "mail", "radio"][i] || "building",
      line1: {
        en: card.line1 || "",
        fr: frHome?.contactPage?.info?.cards?.[i]?.line1 || "",
        rw: rwHome?.contactPage?.info?.cards?.[i]?.line1 || "",
      },
      line2: {
        en: card.line2 || "",
        fr: frHome?.contactPage?.info?.cards?.[i]?.line2 || "",
        rw: rwHome?.contactPage?.info?.cards?.[i]?.line2 || "",
      },
      color: ["#4E6132", "#8B6543", "#BC8A5F", "#4E6132"][i] || "#4E6132",
    })),
  },

  // Map
  map: {
    tag: locNested("map", "tag"),
    title: locNested("map", "title"),
    desc: locNested("map", "desc"),
    cardTitle: locNested("map", "cardTitle"),
    directionsBtn: locNested("map", "directionsBtn"),
    openInMaps: locNested("map", "openInMaps"),
  },

  // Form
  form: {
    tag: locNested("form", "tag"),
    title: locNested("form", "title"),
    desc: locNested("form", "desc"),
    subjectOptions: enHome?.contactPage?.form?.subjectOptions || [],
    nameLabel: { en: enHome?.contactPage?.form?.name || "", fr: frHome?.contactPage?.form?.name || "", rw: rwHome?.contactPage?.form?.name || "" },
    namePlaceholder: { en: enHome?.contactPage?.form?.namePh || "", fr: frHome?.contactPage?.form?.namePh || "", rw: rwHome?.contactPage?.form?.namePh || "" },
    emailLabel: { en: enHome?.contactPage?.form?.email || "", fr: frHome?.contactPage?.form?.email || "", rw: rwHome?.contactPage?.form?.email || "" },
    emailPlaceholder: { en: enHome?.contactPage?.form?.emailPh || "", fr: frHome?.contactPage?.form?.emailPh || "", rw: rwHome?.contactPage?.form?.emailPh || "" },
    phoneLabel: { en: enHome?.contactPage?.form?.phone || "", fr: frHome?.contactPage?.form?.phone || "", rw: rwHome?.contactPage?.form?.phone || "" },
    phonePlaceholder: { en: enHome?.contactPage?.form?.phonePh || "", fr: frHome?.contactPage?.form?.phonePh || "", rw: rwHome?.contactPage?.form?.phonePh || "" },
    subjectLabel: { en: enHome?.contactPage?.form?.subject || "", fr: frHome?.contactPage?.form?.subject || "", rw: rwHome?.contactPage?.form?.subject || "" },
    messageLabel: { en: enHome?.contactPage?.form?.message || "", fr: frHome?.contactPage?.form?.message || "", rw: rwHome?.contactPage?.form?.message || "" },
    messagePlaceholder: { en: enHome?.contactPage?.form?.messagePh || "", fr: frHome?.contactPage?.form?.messagePh || "", rw: rwHome?.contactPage?.form?.messagePh || "" },
    sendBtn: { en: enHome?.contactPage?.form?.send || "", fr: frHome?.contactPage?.form?.send || "", rw: rwHome?.contactPage?.form?.send || "" },
    sendingText: { en: enHome?.contactPage?.form?.sending || "", fr: frHome?.contactPage?.form?.sending || "", rw: rwHome?.contactPage?.form?.sending || "" },
    successTitle: { en: enHome?.contactPage?.form?.successTitle || "", fr: frHome?.contactPage?.form?.successTitle || "", rw: rwHome?.contactPage?.form?.successTitle || "" },
    successDesc: { en: enHome?.contactPage?.form?.successDesc || "", fr: frHome?.contactPage?.form?.successDesc || "", rw: rwHome?.contactPage?.form?.successDesc || "" },
    sendAnother: { en: enHome?.contactPage?.form?.sendAnother || "", fr: frHome?.contactPage?.form?.sendAnother || "", rw: rwHome?.contactPage?.form?.sendAnother || "" },
    errorTitle: { en: enHome?.contactPage?.form?.errorTitle || "", fr: frHome?.contactPage?.form?.errorTitle || "", rw: rwHome?.contactPage?.form?.errorTitle || "" },
    errorDesc: { en: enHome?.contactPage?.form?.errorDesc || "", fr: frHome?.contactPage?.form?.errorDesc || "", rw: rwHome?.contactPage?.form?.errorDesc || "" },
    tryAgain: { en: enHome?.contactPage?.form?.tryAgain || "", fr: frHome?.contactPage?.form?.tryAgain || "", rw: rwHome?.contactPage?.form?.tryAgain || "" },
    errors: enHome?.contactPage?.form?.errors || {},
  },

  // Hours
  hours: {
    tag: locNested("hours", "tag"),
    title: locNested("hours", "title"),
    desc: locNested("hours", "desc"),
    days: (enHome?.contactPage?.hours?.days || []).map((d, i) => ({
      day: {
        en: d.day || "",
        fr: frHome?.contactPage?.hours?.days?.[i]?.day || "",
        rw: rwHome?.contactPage?.hours?.days?.[i]?.day || "",
      },
      time: {
        en: d.time || "",
        fr: frHome?.contactPage?.hours?.days?.[i]?.time || "",
        rw: rwHome?.contactPage?.hours?.days?.[i]?.time || "",
      },
    })),
  },

  // FAQ
  faq: {
    tag: locNested("faq", "tag"),
    title: locNested("faq", "title"),
    desc: locNested("faq", "desc"),
    items: (enHome?.contactPage?.faq?.items || []).map((item, i) => ({
      q: {
        en: item.q || "",
        fr: frHome?.contactPage?.faq?.items?.[i]?.q || "",
        rw: rwHome?.contactPage?.faq?.items?.[i]?.q || "",
      },
      a: {
        en: item.a || "",
        fr: frHome?.contactPage?.faq?.items?.[i]?.a || "",
        rw: rwHome?.contactPage?.faq?.items?.[i]?.a || "",
      },
    })),
  },

  // CTA
  cta: {
    title: locNested("cta", "title"),
    desc: locNested("cta", "desc"),
    callBtn: locNested("cta", "callBtn"),
    emailBtn: locNested("cta", "emailBtn"),
    chatLabel: loc("chatLabel"),
  },
};

async function main() {
  // Check if the document already exists
  const existing = await client.getDocument("singleton.contactPage").catch(() => null);
  if (existing) {
    console.log("contactPage document already exists — updating...");
  } else {
    console.log("Creating contactPage document...");
  }

  const result = await client.createOrReplace(contactPage);
  console.log(`✅ contactPage ${existing ? "updated" : "created"}: ${result._id}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
