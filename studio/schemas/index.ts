import newsPost from './newsPost'
import department from './department'
import departmentResourceFile from './departmentResourceFile'
import departmentResourceGroup from './departmentResourceGroup'
import siteSettings from './siteSettings'
import memberChurch from './memberChurch'
import galleryCollection from './galleryCollection'
import radioProgram from './radioProgram'
import testimonial from './testimonial'
import project from './project'
import departmentsPage from './departmentsPage'
import aboutPage from './aboutPage'

export const schemaTypes = [
  // Singleton pages
  siteSettings,
  aboutPage,
  departmentsPage,

  // Collections
  newsPost,
  department,
  departmentResourceFile,
  departmentResourceGroup,
  memberChurch,
  galleryCollection,
  radioProgram,
  testimonial,
  project,
]
