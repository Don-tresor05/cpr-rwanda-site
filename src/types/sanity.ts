// ─── Localized field helpers ──────────────────────────────────────────────────

/** A field with EN / FR / RW translations (short text). */
export interface LocalizedString {
  en?: string
  fr?: string
  rw?: string
}

/** A field with EN / FR / RW translations (multi-line text). */
export interface LocalizedText {
  en?: string
  fr?: string
  rw?: string
}

// ─── Base Sanity Types ────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityBlock {
  _type: 'block'
  _key: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  markDefs: Array<{
    _type: string
    _key: string
    href?: string
  }>
  style: string
}

export type PortableTextBlock = SanityBlock | SanityImage

// ─── Site Settings ────────────────────────────────────────────────────────────

export interface HeroSlide {
  image?: SanityImage
  label?: LocalizedString
  title?: LocalizedString
  subtitle?: LocalizedString
  desc?: LocalizedText
  cta?: LocalizedString
  ctaHref?: string
  ctaSecondary?: LocalizedString
  ctaSecondaryHref?: string
}

export interface StatItem {
  value?: number
  suffix?: string
  icon?: string
  label?: LocalizedString
}

export interface SocialLink {
  platform?: 'facebook' | 'x' | 'instagram' | 'youtube'
  url?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  heroSlides?: HeroSlide[]
  stats?: StatItem[]
  contact?: {
    phone?: string
    email?: string
    addressLine1?: string
    addressLine2?: string
    socials?: SocialLink[]
  }
  radio?: {
    frequency?: string
    tagline?: LocalizedString
    listenUrl?: string
  }
  partners?: string[]
}

// ─── News Post ───────────────────────────────────────────────────────────────

export interface NewsPost {
  _id: string
  _type: 'newsPost'
  _createdAt: string
  _updatedAt: string
  title?: LocalizedString
  slug?: SanitySlug
  excerpt?: LocalizedText
  mainImage?: SanityImage
  body?: {
    en?: PortableTextBlock[]
    fr?: PortableTextBlock[]
    rw?: PortableTextBlock[]
  }
  quote?: LocalizedString
  imageCaption?: string
  publishedAt?: string
  category?: string
  author?: string
  featured?: boolean
}

// ─── Department (home page card) ──────────────────────────────────────────────

export interface Department {
  _id: string
  _type: 'department'
  order?: number
  icon?: string
  title?: LocalizedString
  desc?: LocalizedText
  link?: string
}

// ─── Department Resource Group ────────────────────────────────────────────────

export interface DepartmentResourceGroup {
  _id: string
  _type: 'departmentResourceGroup'
  department?: string
  title?: string
  slug?: SanitySlug
  description?: string
  cardType?: 'document' | 'download' | 'link'
  order?: number
}

// ─── Department Resource File ─────────────────────────────────────────────────

export interface DepartmentResourceFile {
  _id: string
  _type: 'departmentResourceFile'
  group?: {
    _ref: string
    _type: 'reference'
  }
  title?: string
  file?: SanityFile
  fileUrl?: string
  order?: number
}

// ─── Member Church ────────────────────────────────────────────────────────────

export interface MemberChurch {
  _id: string
  _type: 'memberChurch'
  name: string
  url?: string
  order?: number
}

// ─── Gallery Collection ───────────────────────────────────────────────────────

export interface GalleryPhoto {
  _key?: string
  image?: SanityImage
  src?: string
  alt?: string
}

export interface GalleryCollection {
  _id: string
  _type: 'galleryCollection'
  order?: number
  category?: string
  title?: LocalizedString
  locationDate?: LocalizedString
  images?: GalleryPhoto[]
}

// ─── Radio Program ────────────────────────────────────────────────────────────

export interface RadioProgram {
  _id: string
  _type: 'radioProgram'
  order?: number
  time?: string
  title?: LocalizedString
  desc?: LocalizedText
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  order?: number
  quote?: LocalizedText
  author?: string
  role?: LocalizedString
  avatar?: SanityImage | string
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface Project {
  _id: string
  _type: 'project'
  order?: number
  icon?: string
  title?: LocalizedString
  period?: LocalizedString
  desc?: LocalizedText
  highlights?: LocalizedText[]
}

// ─── Departments Page ─────────────────────────────────────────────────────────

export interface DepartmentSectionStat {
  value?: string
  label?: LocalizedString
}

export interface DepartmentSection {
  key?: string
  nav?: LocalizedString
  tag?: LocalizedString
  title?: LocalizedString
  desc?: LocalizedText
  image?: SanityImage | string
  stats?: DepartmentSectionStat[]
  body?: LocalizedText[]
}

export interface DepartmentsPage {
  _id: string
  _type: 'departmentsPage'
  heroTitle?: LocalizedString
  heroDesc?: LocalizedText
  introTag?: LocalizedString
  introTitle?: LocalizedString
  introDesc?: LocalizedText
  quickFactsTitle?: LocalizedString
  quickFacts?: LocalizedText[]
  sections?: DepartmentSection[]
  cta?: {
    title?: LocalizedString
    desc?: LocalizedText
    btn?: LocalizedString
  }
}

// ─── About Page ───────────────────────────────────────────────────────────────

export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  heroTitle?: LocalizedString
  nav?: {
    whoWeAre?: LocalizedString
    visionMission?: LocalizedString
    coreValues?: LocalizedString
    execCommittee?: LocalizedString
    organigram?: LocalizedString
    ourPartners?: LocalizedString
  }
  whoWeAre?: {
    title?: LocalizedString
    p1?: LocalizedText
    p2?: LocalizedText
  }
  visionMission?: {
    title?: LocalizedString
    visionTag?: LocalizedString
    visionSub?: LocalizedString
    visionDesc?: LocalizedText
    missionTag?: LocalizedString
    missionSub?: LocalizedString
    missionDesc?: LocalizedText
  }
  model?: {
    title?: LocalizedString
    desc?: LocalizedText
    step1Tag?: LocalizedString
    step1Title?: LocalizedString
    step1Desc?: LocalizedText
    step2Tag?: LocalizedString
    step2Title?: LocalizedString
    step2Desc?: LocalizedText
    step3Tag?: LocalizedString
    step3Title?: LocalizedString
    step3Desc?: LocalizedText
  }
  coreValues?: {
    title?: LocalizedString
    items?: Array<{
      title?: LocalizedString
      desc?: LocalizedText
    }>
  }
  execCommittee?: {
    title?: LocalizedString
    desc?: LocalizedText
    boardMembers?: LocalizedString
    staff?: LocalizedString
    defaultName?: LocalizedString
    defaultRole?: LocalizedString
  }
  organigram?: {
    title?: LocalizedString
    comingSoon?: LocalizedString
  }
  partners?: {
    title?: LocalizedString
  }
  historyModal?: {
    learnMore?: LocalizedString
    badge?: LocalizedString
    title?: LocalizedString
    p1?: LocalizedText
    p2?: LocalizedText
    personName?: LocalizedString
    personRole?: LocalizedString
    cta?: LocalizedString
  }
}

// ─── Secretariat Page ─────────────────────────────────────────────────────────

export interface SecretariatSection {
  key?: string
  nav?: LocalizedString
  tag?: LocalizedString
  title?: LocalizedString
  desc?: LocalizedText
  body?: LocalizedText[]
}

export interface SecretariatPage {
  _id: string
  _type: 'secretariatPage'
  heroTitle?: LocalizedString
  heroDesc?: LocalizedText
  introTag?: LocalizedString
  introTitle?: LocalizedString
  introDesc?: LocalizedText
  sgProfile?: {
    role?: LocalizedString
    name?: LocalizedString
    title?: LocalizedString
    quote?: LocalizedText
  }
  sections?: SecretariatSection[]
  cta?: {
    title?: LocalizedString
    desc?: LocalizedText
    btn?: LocalizedString
  }
}
