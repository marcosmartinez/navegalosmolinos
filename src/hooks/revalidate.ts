import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * Revalida el caché de Next.js por tags cuando cambia contenido en el CMS.
 * Los tags se consumen en src/lib/cms (unstable_cache / fetch con tags).
 */
const safeRevalidate = async (tags: string[]) => {
  try {
    const { revalidateTag } = await import('next/cache')
    for (const tag of tags) revalidateTag(tag, 'max')
  } catch {
    // Fuera del runtime de Next (scripts, migraciones): no hay caché que invalidar.
  }
}

export const revalidateCollection =
  (baseTag: string): CollectionAfterChangeHook =>
  async ({ doc }) => {
    const tags = [baseTag]
    if (doc && typeof doc === 'object' && 'slug' in doc && typeof doc.slug === 'string') {
      tags.push(`${baseTag}:${doc.slug}`)
    }
    await safeRevalidate(tags)
    return doc
  }

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  async ({ doc }) => {
    await safeRevalidate([tag])
    return doc
  }
