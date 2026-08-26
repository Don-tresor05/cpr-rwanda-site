import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "studio/.env" });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2026-08-08",
  useCdn: false,
});

const articles = [
  {
    slug: "cpr-june-2026-highlights",
    date: "7 July 2026",
    category: "Report",
    title: "CPR Staff Visit Nyanza Genocide Memorial and Support Survivor Families in Mulinja Village",
    excerpt: "CPR staff paid tribute to victims at Nyanza Genocide Memorial in Kicukiro District and delivered targeted support to 1994 Genocide survivor families in Mulinja Village as part of annual Kwibuka 31 commemorations.",
    image: "/assets/news-kwibuka.jpg",
    imageCaption: "CPR staff and church representatives laying white flowers in honor of victims at the Nyanza Genocide Memorial in Kicukiro District.",
    author: "CPR Secretariat",
    paragraphs: [
      "Conseil Protestant du Rwanda (CPR) is the Protestant Council of Churches in Rwanda. For over twelve (12) consecutive years, conducting annual Kwibuka commemoration activities—specifically visiting and supporting families of survivors of the 1994 Genocide against the Tutsi—has remained an established annual tradition within CPR.",
      "On the occasion of Kwibuka 31, as Rwandans commemorate the 1994 Genocide against the Tutsi, CPR staff carried out two major key activities:",
      "1. Visiting the Nyanza Genocide Memorial of the 1994 Genocide against the Tutsi in Nyanza, Kicukiro District, to pay solemn tribute to the victims.",
      "2. Visiting and delivering support to families of survivors of the 1994 Genocide against the Tutsi resettled in Mulinja Village, Gahanga Sector, Kicukiro District. All of these commemorative activities were successfully conducted on 19 May 2025.",
      "At the Nyanza Genocide Memorial, which is the final resting place for over 105,600 victims of the 1994 Genocide against the Tutsi from across Kigali City, CPR staff also visited the memorial gardens. They were guided through the deep symbolism embedded within the landscape features—such as sorghum fields, winding pathways, miniature hills, flowing water, papyrus reeds, and indigenous trees—learning the enduring lessons of memory, resilience, and unity today.",
      "After visiting the memorial, CPR staff proceeded to visit families of Genocide survivors resettled in Mulinja Village. These 46 families have partnered with CPR and its staff in carrying out annual Kwibuka commemoration activities throughout the past 12+ years. Whenever resources allow, CPR visits these families to deliver essential support—including household supplies, food provisions, and other necessities.",
      "On this occasion, CPR staff were joined by the General Secretary of CPR alongside the Representative of the CPR President. The delegation gathered at the Church of the Nazarene located near Gahanga Sector headquarters, meeting with all 46 survivor families resettled by Kicukiro District in Mulinja Village for a meaningful moment of fellowship, solidarity, and mutual encouragement."
    ],
    quote: "Remembering and standing alongside survivors is our continuous sacred duty. Through faith, memory, and practical support, we strengthen unity and hope.",
  },
  {
    slug: "annual-convention-2026",
    date: "2 July 2026",
    category: "Event",
    title: "Inside CPR's Annual Convention on Ecumenical Cooperation",
    excerpt: "Rwanda's Protestant community is building sustainable partnerships across the country. Member churches met to align strategies for education, youth leadership, and socio-economic empowerment.",
    image: "/assets/news-education.webp",
    imageCaption: "Delegates from 25 member denominations at the opening ceremony of the 2026 Ecumenical Cooperation Convention in Kigali.",
    author: "Ecumenical Affairs Office",
    paragraphs: [
      "The 2026 Annual Convention of the Conseil Protestant du Rwanda brought together church leaders, theologians, and community champions from across East Africa to discuss the future of ecumenical partnership.",
      "Keynote speakers highlighted the pivotal role of Protestant institutions in driving educational excellence, healthcare access, and environmental stewardship throughout Rwanda's provinces.",
      "Bringing together more than 300 delegates, including ministers, ambassadors, development partners, academics, and youth leaders, the Convention marked the beginning of a long-term platform for advancing practical cooperation across member churches.",
      "The convention concluded with a solemn declaration affirming mutual cooperation, interfaith dialogue, and active participation in national development projects."
    ],
    quote: "Ecumenical cooperation is not merely a theological goal—it is our active responsibility to serve humanity together.",
  },
  {
    slug: "may-highlights-2026",
    date: "2 June 2026",
    category: "Youth",
    title: "CPR May 2026 Highlights & Youth Programs",
    excerpt: "May 2026 was a landmark month for CPR's Youth Program, rolling out peacebuilding workshops and digital skills training for over 800 young church leaders nationwide.",
    image: "/assets/news-trauma.jpg",
    imageCaption: "Young leaders participating in interactive peacebuilding and mental health awareness seminars in Western Province.",
    author: "CPR Youth Department",
    paragraphs: [
      "Throughout May 2026, the CPR Youth Department conducted workshops across Western and Southern provinces, empowering young leaders with digital skills, conflict resolution tools, and entrepreneurship training.",
      "Participants engaged in interactive seminars focused on digital evangelism, community service, and mental health awareness, preparing them to lead active initiatives within their parishes.",
      "The success of the May youth initiatives sets the foundation for our upcoming national youth summit scheduled for later this year."
    ],
    quote: "Empowering young people with skills and faith is the highest investment we can make for Rwanda's future.",
  },
  {
    slug: "kwibuka-31-commemoration",
    date: "28 June 2025",
    category: "Event",
    title: "Kwibuka 31 Memorial Commemoration at Gahini Diocese",
    excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to peace, reconciliation, and 'Never Again'.",
    image: "/assets/Gahini 2.webp",
    imageCaption: "CPR church leaders laying wreaths during Kwibuka 31 memorial commemoration at Gahini Diocese.",
    author: "Peace & Reconciliation Commission",
    paragraphs: [
      "As part of Kwibuka 31 commemorations, CPR leadership and member church heads gathered at the Gahini Diocese for a solemn memorial service honoring victims of the 1994 Genocide against the Tutsi.",
      "Speakers stressed the continuous duty of Christian churches to promote truth, support survivors, and nurture genocide prevention education among younger generations.",
      "CPR reaffirmed its pledge to support trauma healing clinics and community reconciliation dialogue groups throughout the country."
    ],
    quote: "Remembering is our sacred duty. Through memory, truth, and faith, we safeguard Rwanda's unity forever.",
  },
  {
    slug: "bnep-active-pedagogy-training",
    date: "14 May 2025",
    category: "Education",
    title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
    excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international development partners.",
    image: "/assets/Primary.jpg",
    imageCaption: "Primary school educators during practical active pedagogy exercises organized by BNEP.",
    author: "BNEP Department",
    paragraphs: [
      "The Bureau National de l'Éducation Protestante (BNEP) officially launched an intensive training initiative for 1,200 primary and secondary school teachers serving in CPR-affiliated schools.",
      "The program focuses on student-centered active learning, inclusive education for children with special needs, and integrating moral ethics into STEM curricula.",
      "With over 595 schools managed by CPR member churches, BNEP continues to elevate educational standards across the nation."
    ],
    quote: "Quality education with strong moral grounding transforms learners into compassionate leaders.",
  },
  {
    slug: "trauma-counselor-certification",
    date: "3 April 2025",
    category: "Health",
    title: "Gender & Health Department Completes Trauma Counselor Certification",
    excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity.",
    image: "/assets/Trauma 1.webp",
    imageCaption: "Graduating trauma counselors holding their certification credentials in Kigali.",
    author: "Gender & Health Department",
    paragraphs: [
      "CPR's Gender and Health Department celebrated the graduation of 42 certified community trauma counselors following a rigorous six-month practical training program.",
      "These counselors are deployed across rural health centers and parish counseling desks to provide accessible psychosocial support, family mediation, and trauma care.",
      "This initiative addresses mental health stigma and ensures compassionate care at the grass-roots level."
    ],
    quote: "Healing hearts and restoring mental well-being is vital for healthy families and strong communities.",
  },
  {
    slug: "agricultural-cooperatives-sustainability",
    date: "12 March 2025",
    category: "Development",
    title: "CPR Partners with Local Cooperatives for Agricultural Sustainability",
    excerpt: "A new initiative aiming to support rural communities with climate-smart farming techniques was launched in Eastern Province, impacting over 500 families.",
    image: "/assets/CPR 3 - Copy.webp",
    imageCaption: "Local farming cooperative members reviewing climate-smart crop yields in Eastern Province.",
    author: "Diakonia & Development Dept",
    paragraphs: [
      "CPR's Diakonia Department launched a climate-smart agriculture pilot project in collaboration with local farming cooperatives in Bugesera and Nyagatare districts.",
      "The project equips smallholder farmers with drought-resistant seeds, drip irrigation kits, and organic soil management techniques to enhance food security.",
      "Over 500 families have already benefited, increasing crop yields while conserving natural resources."
    ],
    quote: "Sustainable agriculture honors God's creation while securing livelihood and dignity for rural families.",
  },
  {
    slug: "youth-reconciliation-summit",
    date: "18 February 2025",
    category: "Youth",
    title: "Annual Youth Peace and Reconciliation Summit Announced",
    excerpt: "Youth leaders from various Protestant parishes across the country will gather in Kigali to discuss peacemaking, leadership, and digital evangelism.",
    image: "/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp",
    imageCaption: "Youth representatives gathered in Kigali during the announcement of the annual summit.",
    author: "CPR Youth Directorate",
    paragraphs: [
      "The CPR Youth Directorate has announced dates for the upcoming National Youth Summit, bringing together over 600 young representatives from Protestant churches nationwide.",
      "Under the theme 'Youth as Ambassadors of Peace and Innovation', the summit will feature workshops on conflict resolution, social enterprise, and digital literacy.",
      "Registration is open through local parish secretariats and CPR youth coordinators."
    ],
    quote: "When young people lead with peace and purpose, the entire nation moves forward.",
  },
];

function parseDate(dateStr) {
  return new Date(dateStr).toISOString();
}

function toPortableText(paragraphs = []) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text }],
  }));
}

async function uploadImage(relativePath) {
  const filePath = path.join("public", relativePath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ Image not found, skipping: ${filePath}`);
    return null;
  }
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function migrate() {
  for (const a of articles) {
    console.log(`Migrating: ${a.slug}...`);

    const coverImage = await uploadImage(a.image);

    const doc = {
      _type: "newsPost",
      title: { en: a.title },
      slug: { _type: "slug", current: a.slug },
      category: a.category,
      publishedAt: parseDate(a.date),
      author: a.author || "",
      featured: false,
      excerpt: { en: a.excerpt },
      body: {
        en: toPortableText(a.paragraphs),
        fr: [],
        rw: [],
      },
      quote: a.quote ? { en: a.quote } : undefined,
      coverImage: coverImage || undefined,
      imageCaption: a.imageCaption || "",
    };

    const created = await client.create(doc);
    console.log(`✔ Created: ${created._id} — ${a.slug}`);
  }
  console.log("\n🎉 Migration complete! Check localhost:3333/structure/newsPost");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
