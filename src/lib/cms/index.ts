import 'server-only'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

/**
 * Capa de acceso a datos del sitio. ÚNICO lugar que llama a Payload desde el frontend.
 * Los componentes importan funciones de acá; nunca a Payload directamente.
 * Cada función se cachea con tags que revalidan los hooks de src/hooks/revalidate.ts.
 */

export const cms = async () => getPayload({ config })

export const getSiteMode = unstable_cache(
  async (): Promise<'preapertura' | 'consultas' | 'reservas'> => {
    try {
      const payload = await cms()
      const integrations = await payload.findGlobal({ slug: 'integrations', depth: 0 })
      return integrations.siteMode ?? 'preapertura'
    } catch {
      // Sin base disponible (build sin DATABASE_URI, primer deploy): modo seguro.
      return 'preapertura'
    }
  },
  ['site-mode'],
  { tags: ['settings'] },
)

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await cms()
    return payload.findGlobal({ slug: 'site-settings', depth: 1 })
  },
  ['site-settings'],
  { tags: ['settings'] },
)

export const getActiveExperiences = unstable_cache(
  async () => {
    const payload = await cms()
    const { docs } = await payload.find({
      collection: 'experiences',
      where: { availability: { in: ['active', 'coming_soon'] }, _status: { equals: 'published' } },
      sort: 'order',
      depth: 1,
      limit: 50,
    })
    return docs
  },
  ['experiences-active'],
  { tags: ['experiences'] },
)

export const getExperienceBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await cms()
      const { docs } = await payload.find({
        collection: 'experiences',
        where: { slug: { equals: slug }, _status: { equals: 'published' } },
        depth: 2,
        limit: 1,
      })
      return docs[0] ?? null
    },
    ['experience', slug],
    { tags: ['experiences', `experiences:${slug}`] },
  )()
