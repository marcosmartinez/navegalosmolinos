import type { MetadataRoute } from 'next'
import { getActiveExperiences } from '@/lib/cms'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** Páginas fijas del MVP (docs/SITEMAP.md §2). Se suman a medida que se publican. */
const STATIC_PATHS = ['/']

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({ url: `${siteUrl}${path}` }))
  try {
    const experiences = await getActiveExperiences()
    for (const exp of experiences) {
      if (exp.availability !== 'active') continue
      entries.push({ url: `${siteUrl}/experiencias/${exp.slug}`, lastModified: exp.updatedAt })
    }
  } catch {
    // Sin base disponible: se publica solo lo estático.
  }
  return entries
}
