import { client } from './sanityClient'
import type {
  NewsPost,
  DepartmentResourceFile,
  DepartmentResourceGroup,
  SiteSettings,
  MemberChurch,
  Department,
  GalleryCollection,
  RadioProgram,
  Testimonial,
  Project,
  DepartmentsPage,
  AboutPage,
} from '../types/sanity'

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

// ─── News Posts ───────────────────────────────────────────────────────────────

export async function getNewsPosts(limit = 10): Promise<NewsPost[]> {
  return client.fetch(
    `*[_type == "newsPost"] | order(publishedAt desc) [0...$limit] {
      _id, _type, _createdAt, _updatedAt,
      title, slug, excerpt, mainImage, publishedAt, category, author, tags
    }`,
    { limit: limit - 1 }
  )
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  return client.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      _id, _type, _createdAt, _updatedAt,
      title, slug, excerpt, mainImage, body, publishedAt, category, author, tags
    }`,
    { slug }
  )
}

export async function getFeaturedNews(limit = 3): Promise<NewsPost[]> {
  return client.fetch(
    `*[_type == "newsPost"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, mainImage, publishedAt, category
    }`,
    { limit: limit - 1 }
  )
}

// ─── Departments ──────────────────────────────────────────────────────────────

export async function getDepartments(): Promise<Department[]> {
  return client.fetch(
    `*[_type == "department"] | order(order asc, name asc) {
      _id, name, slug, description, image, headName, headTitle, headImage, email, phone, order
    }`
  )
}

export async function getDepartment(slug: string): Promise<Department | null> {
  return client.fetch(
    `*[_type == "department" && slug.current == $slug][0]`,
    { slug }
  )
}

// ─── Department Resources ─────────────────────────────────────────────────────

export async function getDepartmentResources(departmentId?: string): Promise<DepartmentResourceFile[]> {
  const filter = departmentId
    ? `*[_type == "departmentResourceFile" && department._ref == $departmentId]`
    : `*[_type == "departmentResourceFile"]`

  return client.fetch(
    `${filter} | order(publishedAt desc) {
      _id, title, description, category, publishedAt,
      "fileUrl": file.asset->url,
      department->{ _id, name }
    }`,
    departmentId ? { departmentId } : {}
  )
}

export async function getDepartmentResourceGroups(): Promise<DepartmentResourceGroup[]> {
  return client.fetch(
    `*[_type == "departmentResourceGroup"] {
      _id, title, description,
      department->{ _id, name },
      resources[]->{ _id, title, description, category, "fileUrl": file.asset->url }
    }`
  )
}

// ─── Member Churches ──────────────────────────────────────────────────────────

export async function getMemberChurches(): Promise<MemberChurch[]> {
  return client.fetch(
    `*[_type == "memberChurch"] | order(name asc) {
      _id, name, slug, logo, description, location, website, email, phone,
      leaderName, leaderTitle, leaderImage
    }`
  )
}

export async function getMemberChurch(slug: string): Promise<MemberChurch | null> {
  return client.fetch(
    `*[_type == "memberChurch" && slug.current == $slug][0]`,
    { slug }
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getGalleryCollections(): Promise<GalleryCollection[]> {
  return client.fetch(
    `*[_type == "galleryCollection"] | order(publishedAt desc) {
      _id, title, slug, description, coverImage, publishedAt, category
    }`
  )
}

export async function getGalleryCollection(slug: string): Promise<GalleryCollection | null> {
  return client.fetch(
    `*[_type == "galleryCollection" && slug.current == $slug][0] {
      _id, title, slug, description, coverImage, images, publishedAt, category
    }`,
    { slug }
  )
}

// ─── Radio Programs ───────────────────────────────────────────────────────────

export async function getRadioPrograms(): Promise<RadioProgram[]> {
  return client.fetch(
    `*[_type == "radioProgram"] | order(publishedAt desc) {
      _id, title, slug, description, image, host, schedule, streamUrl, publishedAt,
      "audioUrl": audioFile.asset->url
    }`
  )
}

export async function getRadioProgram(slug: string): Promise<RadioProgram | null> {
  return client.fetch(
    `*[_type == "radioProgram" && slug.current == $slug][0]`,
    { slug }
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(featuredOnly = false): Promise<Testimonial[]> {
  const filter = featuredOnly
    ? `*[_type == "testimonial" && featured == true]`
    : `*[_type == "testimonial"]`

  return client.fetch(`${filter} | order(_createdAt desc) {
    _id, name, role, church, image, quote, featured
  }`)
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(status?: string): Promise<Project[]> {
  const filter = status
    ? `*[_type == "project" && status == $status]`
    : `*[_type == "project"]`

  return client.fetch(
    `${filter} | order(startDate desc) {
      _id, title, slug, description, mainImage, status, startDate, endDate, tags,
      department->{ _id, name }
    }`,
    status ? { status } : {}
  )
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, description, mainImage, body, status, startDate, endDate, tags,
      department->{ _id, name }
    }`,
    { slug }
  )
}

// ─── Static Pages ─────────────────────────────────────────────────────────────

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getDepartmentsPage(): Promise<DepartmentsPage | null> {
  return client.fetch(`*[_type == "departmentsPage"][0]`)
}
