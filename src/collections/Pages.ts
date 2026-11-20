import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedOrEditor } from '@/access'
import { pageBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { revalidateCollection } from '@/hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    group: 'Contenido',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Home, Nosotros, El lago, Planificá tu visita, Privados y empresas, Contacto y legales.',
  },
  versions: { drafts: { autosave: { interval: 2000 }, schedulePublish: true }, maxPerDoc: 30 },
  access: { read: publishedOrEditor, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('pages')] },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'layout', label: 'Contenido', type: 'blocks', blocks: pageBlocks, localized: true },
  ],
}
