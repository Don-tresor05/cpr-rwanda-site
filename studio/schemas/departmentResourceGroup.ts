import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'departmentResourceGroup',
  title: 'Department Resource Group',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }] }),
    defineField({ name: 'resources', title: 'Resources', type: 'array', of: [{ type: 'reference', to: [{ type: 'departmentResourceFile' }] }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'department.name' } },
})
