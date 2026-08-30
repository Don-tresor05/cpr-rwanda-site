import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'mission', title: 'Mission Statement', type: 'text', rows: 3 }),
    defineField({ name: 'vision', title: 'Vision Statement', type: 'text', rows: 3 }),
    defineField({ name: 'history', title: 'History', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'values', title: 'Core Values', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Value Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'icon', title: 'Icon', type: 'image' },
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'leadershipTeam', title: 'Leadership Team', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
          { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
      }],
    }),
  ],
  preview: { select: { title: 'title' } },
})
