import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'cpr-website',
  title: 'CPR Website',

  projectId: '2bpoen39',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton pages
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('About Page').id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('Departments Page').id('departmentsPage')
              .child(S.document().schemaType('departmentsPage').documentId('departmentsPage')),
            S.listItem().title('Secretariat Page').id('secretariatPage')
              .child(S.document().schemaType('secretariatPage').documentId('secretariatPage')),
            S.listItem().title('Radio Inkoramutima Page').id('radioPage')
              .child(S.document().schemaType('radioPage').documentId('radioPage')),
            S.divider(),
            // Collections
            S.documentTypeListItem('newsPost').title('News Posts'),
            S.documentTypeListItem('department').title('Departments'),
            S.documentTypeListItem('departmentResourceFile').title('Department Resource Files'),
            S.documentTypeListItem('departmentResourceGroup').title('Department Resource Groups'),
            S.documentTypeListItem('memberChurch').title('Member Churches'),
            S.documentTypeListItem('galleryEvent').title('Gallery Events'),
            S.documentTypeListItem('radioProgram').title('Radio Programs'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('boardMember').title('Board Members'),
            S.documentTypeListItem('staffMember').title('Staff Members'),
            S.documentTypeListItem('partner').title('Partners'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
