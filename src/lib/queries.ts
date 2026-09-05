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
  SecretariatPage,
} from '../types/sanity'

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0] {
    _id, _type,
    heroSlides[] {
      image,
      label, title, subtitle, desc,
      cta, ctaHref, ctaSecondary, ctaSecondaryHref
    },
    stats[] { value, suffix, icon, label },
    contact {
      phone, email, addressLine1, addressLine2,
      socials[] { platform, url }
    },
    radio { frequency, tagline, listenUrl },
    partners
  }`)
}

// ─── News Posts ───────────────────────────────────────────────────────────────

export async function getNewsPosts(limit = 10): Promise<NewsPost[]> {
  return client.fetch(
    `*[_type == "newsPost"] | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] {
      _id, _type, _createdAt, _updatedAt,
      title, slug, excerpt, mainImage, publishedAt, category, author, featured
    }`,
    { limit: limit - 1 }
  )
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  return client.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      _id, _type, _createdAt, _updatedAt,
      title, slug, excerpt, mainImage, body, quote, imageCaption,
      publishedAt, category, author, featured
    }`,
    { slug }
  )
}

export async function getFeaturedNews(limit = 3): Promise<NewsPost[]> {
  return client.fetch(
    `*[_type == "newsPost"] | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] {
      _id, title, slug, excerpt, mainImage, publishedAt, category
    }`,
    { limit: limit - 1 }
  )
}

// ─── Departments (home page cards) ───────────────────────────────────────────

export async function getDepartments(): Promise<Department[]> {
  return client.fetch(
    `*[_type == "department"] | order(order asc) {
      _id, order, icon, title, desc, link
    }`
  )
}

// ─── Department Resources ─────────────────────────────────────────────────────

export async function getDepartmentResourceGroups(department?: string): Promise<DepartmentResourceGroup[]> {
  const filter = department
    ? `*[_type == "departmentResourceGroup" && department == $department]`
    : `*[_type == "departmentResourceGroup"]`

  return client.fetch(
    `${filter} | order(order asc) {
      _id, department, title, slug, description, cardType, order
    }`,
    department ? { department } : {}
  )
}

export async function getDepartmentResourceFiles(groupId?: string): Promise<DepartmentResourceFile[]> {
  const filter = groupId
    ? `*[_type == "departmentResourceFile" && group._ref == $groupId]`
    : `*[_type == "departmentResourceFile"]`

  return client.fetch(
    `${filter} | order(order asc) {
      _id, title, order,
      "fileUrl": file.asset->url,
      group->{ _id, title, department }
    }`,
    groupId ? { groupId } : {}
  )
}

// ─── Member Churches ──────────────────────────────────────────────────────────

export async function getMemberChurches(): Promise<MemberChurch[]> {
  return client.fetch(
    `*[_type == "memberChurch"] | order(order asc, name asc) {
      _id, name, url, order
    }`
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getGalleryCollections(): Promise<GalleryCollection[]> {
  return client.fetch(
    `*[_type == "galleryCollection"] | order(order asc) {
      _id, order, category, title, locationDate,
      images[] {
        "src": image.asset->url,
        alt
      }
    }`
  )
}

// ─── Radio Programs ───────────────────────────────────────────────────────────

export async function getRadioPrograms(): Promise<RadioProgram[]> {
  return client.fetch(
    `*[_type == "radioProgram"] | order(order asc) {
      _id, order, time, title, desc
    }`
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) {
      _id, order, quote, author, role,
      "avatar": avatar.asset->url
    }`
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, order, icon, title, period, desc,
      highlights[] { en, fr, rw }
    }`
  )
}

// ─── Static Pages ─────────────────────────────────────────────────────────────

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getDepartmentsPage(): Promise<DepartmentsPage | null> {
  return client.fetch(`*[_type == "departmentsPage"][0] {
    _id, _type,
    heroTitle, heroDesc,
    introTag, introTitle, introDesc,
    quickFactsTitle,
    quickFacts,
    sections[] {
      key, nav, tag, title, desc,
      "image": image.asset->url,
      stats[] { value, label },
      body
    },
    cta { title, desc, btn }
  }`)
}

export async function getSecretariatPage(): Promise<SecretariatPage | null> {
  return client.fetch(`*[_type == "secretariatPage"][0] {
    _id, _type,
    heroTitle, heroDesc,
    introTag, introTitle, introDesc,
    sgProfile { role, name, title, quote },
    sections[] {
      key, nav, tag, title, desc, body
    },
    cta { title, desc, btn }
  }`)
}
