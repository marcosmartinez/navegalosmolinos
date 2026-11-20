import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const isProduction = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  // Previews y staging nunca se indexan (docs/TECHNICAL-ARCHITECTURE.md §9).
  if (!isProduction) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/go', '/gracias'] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
