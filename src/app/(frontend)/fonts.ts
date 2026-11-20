import localFont from 'next/font/local'

/**
 * Tipografías del brandbook (05 · Typography), self-hosted (licencia OFL, ver src/fonts/OFL-LICENSE.txt).
 * Fuente: Google Fonts vía Fontsource, subset latin (incluye tildes y ñ). Archivos variables: un solo
 * archivo cubre todos los pesos. Self-hosting = builds sin depender de fonts.googleapis.com.
 */
export const cormorant = localFont({
  src: [
    { path: '../../fonts/cormorant-garamond-latin-wght-normal.woff2', weight: '300 500', style: 'normal' },
    { path: '../../fonts/cormorant-garamond-latin-wght-italic.woff2', weight: '300 500', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-cormorant',
  fallback: ['Georgia', 'serif'],
})

export const montserrat = localFont({
  src: [{ path: '../../fonts/montserrat-latin-wght-normal.woff2', weight: '400 600', style: 'normal' }],
  display: 'swap',
  variable: '--font-montserrat',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
})
