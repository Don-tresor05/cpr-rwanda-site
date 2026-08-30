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

// ─── News Post ───────────────────────────────────────────────────────────────

export interface NewsPost {
  _id: string
  _type: 'newsPost'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: SanitySlug
  excerpt?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  publishedAt?: string
  category?: string
  author?: string
  tags?: string[]
}

// ─── Department Resource File ─────────────────────────────────────────────────

export interface DepartmentResourceFile {
  _id: string
  _type: 'departmentResourceFile'
  _createdAt: string
  title: string
  file?: SanityFile
  description?: string
  category?: string
  department?: {
    _ref: string
    _type: 'reference'
  }
  publishedAt?: string
}

// ─── Department Resource Group ────────────────────────────────────────────────

export interface DepartmentResourceGroup {
  _id: string
  _type: 'departmentResourceGroup'
  title: string
  description?: string
  department?: {
    _ref: string
    _type: 'reference'
  }
  resources?: DepartmentResourceFile[]
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description?: string
  logo?: SanityImage
  favicon?: SanityImage
  email?: string
  phone?: string
  address?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  footerText?: string
}

// ─── Member Church ────────────────────────────────────────────────────────────

export interface MemberChurch {
  _id: string
  _type: 'memberChurch'
  name: string
  slug?: SanitySlug
  logo?: SanityImage
  description?: string
  location?: string
  website?: string
  email?: string
  phone?: string
  leaderName?: string
  leaderTitle?: string
  leaderImage?: SanityImage
}

// ─── Department ───────────────────────────────────────────────────────────────

export interface Department {
  _id: string
  _type: 'department'
  name: string
  slug?: SanitySlug
  description?: string
  image?: SanityImage
  headName?: string
  headTitle?: string
  headImage?: SanityImage
  email?: string
  phone?: string
  order?: number
}

// ─── Gallery Collection ───────────────────────────────────────────────────────

export interface GalleryItem {
  _key: string
  image: SanityImage
  caption?: string
}

export interface GalleryCollection {
  _id: string
  _type: 'galleryCollection'
  title: string
  slug?: SanitySlug
  description?: string
  coverImage?: SanityImage
  images?: GalleryItem[]
  publishedAt?: string
  category?: string
}

// ─── Radio Program ────────────────────────────────────────────────────────────

export interface RadioProgram {
  _id: string
  _type: 'radioProgram'
  title: string
  slug?: SanitySlug
  description?: string
  image?: SanityImage
  host?: string
  schedule?: string
  audioFile?: SanityFile
  streamUrl?: string
  publishedAt?: string
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role?: string
  church?: string
  image?: SanityImage
  quote: string
  featured?: boolean
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug?: SanitySlug
  description?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  status?: 'ongoing' | 'completed' | 'planned'
  startDate?: string
  endDate?: string
  department?: {
    _ref: string
    _type: 'reference'
  }
  tags?: string[]
}

// ─── Departments Page ─────────────────────────────────────────────────────────

export interface DepartmentsPage {
  _id: string
  _type: 'departmentsPage'
  title: string
  subtitle?: string
  heroImage?: SanityImage
  introText?: PortableTextBlock[]
}

// ─── About Page ───────────────────────────────────────────────────────────────

export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  title: string
  subtitle?: string
  heroImage?: SanityImage
  mission?: string
  vision?: string
  history?: PortableTextBlock[]
  values?: Array<{
    _key: string
    title: string
    description: string
    icon?: SanityImage
  }>
  leadershipTeam?: Array<{
    _key: string
    name: string
    role: string
    image?: SanityImage
    bio?: string
  }>
}
