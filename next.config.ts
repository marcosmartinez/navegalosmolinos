import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // La CSP estricta se define en la etapa 1C, cuando estén cerradas las integraciones
  // (GA4, Turnstile, Google Maps, proveedor de reservas). Ver docs/TECHNICAL-ARCHITECTURE.md §12.
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/tarifas', destination: '/experiencias', permanent: true },
      { source: '/reservas', destination: '/experiencias', permanent: true },
      { source: '/promociones', destination: '/experiencias', permanent: false },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
