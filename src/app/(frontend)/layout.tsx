import type { Metadata, Viewport } from 'next'
import type React from 'react'
import '@/styles/globals.css'
import { cormorant, montserrat } from './fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Navegá el Lago Los Molinos · Espíritu del Lago',
    template: '%s · Espíritu del Lago',
  },
  description:
    'El lago desde adentro. Navegaciones con gastronomía y música en el Lago Los Molinos, Valle de Calamuchita, Córdoba.',
  openGraph: { type: 'website', locale: 'es_AR', siteName: 'Espíritu del Lago' },
}

export const viewport: Viewport = {
  themeColor: '#2f5250',
  width: 'device-width',
  initialScale: 1,
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
