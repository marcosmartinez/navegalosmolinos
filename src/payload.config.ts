import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Banners, Promotions } from './collections/Commercial'
import { Experiences } from './collections/Experiences'
import { ConversionEvents, Inquiries } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Categories, Faqs, Galleries, Seasons, Testimonials } from './collections/Taxonomies'
import { Users } from './collections/Users'
import { globals } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default buildConfig({
  serverURL: siteUrl,
  secret: process.env.PAYLOAD_SECRET ?? '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Espíritu del Lago', robots: 'noindex, nofollow' },
    dateFormat: 'dd/MM/yyyy HH:mm',
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        if (collectionConfig?.slug === 'experiences') return `${siteUrl}/experiencias/${slug}`
        return slug === 'home' ? siteUrl : `${siteUrl}/${slug}`
      },
      collections: ['pages', 'experiences'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 812 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  // Orden = orden en el panel (lo más usado arriba). Ver docs/CMS-SPECIFICATION.md §3.
  collections: [
    Inquiries,
    ConversionEvents,
    Experiences,
    Pages,
    Faqs,
    Testimonials,
    Promotions,
    Banners,
    Seasons,
    Categories,
    Media,
    Galleries,
    Users,
  ],
  globals,
  editor: lexicalEditor(),
  localization: {
    // Un solo idioma en el MVP; la localización queda activada para sumar en/pt sin migrar datos.
    locales: [{ label: 'Español', code: 'es' }],
    defaultLocale: 'es',
    fallback: true,
  },
  // Panel en español para Marketing.
  i18n: { supportedLanguages: { es }, fallbackLanguage: 'es' },
  db: postgresAdapter({
    // Neon (integración de Vercel) inyecta DATABASE_URL; en local usamos DATABASE_URI.
    pool: { connectionString: process.env.DATABASE_URI ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '' },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: 'hola@navegalosmolinos.com',
        defaultFromName: 'Espíritu del Lago',
      })
    : undefined,
  plugins: [
    seoPlugin({
      collections: ['pages', 'experiences'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${(doc as { title?: string })?.title ?? ''} · Espíritu del Lago`,
    }),
    redirectsPlugin({
      collections: ['pages', 'experiences'],
      overrides: { admin: { group: 'Configuración' } },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],
})
