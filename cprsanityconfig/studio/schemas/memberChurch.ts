import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'memberChurch',
  title: 'Member Church',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Church Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'leaderName', title: 'Leader Name', type: 'string' }),
    defineField({ name: 'leaderTitle', title: 'Leader Title', type: 'string' }),
    defineField({ name: 'leaderImage', title: 'Leader Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', media: 'logo', subtitle: 'location' } },
})
