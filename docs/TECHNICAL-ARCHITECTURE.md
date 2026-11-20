# TECHNICAL-ARCHITECTURE — Arquitectura técnica

> Principio rector: **una sola aplicación** (Next.js + Payload) sobre **una sola base** (Postgres), con servicios externos solo donde aportan algo que no conviene construir (email, almacenamiento, antispam, analítica, reservas).

---

## 1. Stack recomendado

| Capa | Elección | Alternativas evaluadas | Por qué |
|---|---|---|---|
| Framework | **Next.js 16** (App Router, Server Components) | Astro, Remix | Pedido explícito; mejor soporte de Payload y de Claude Code; ISR y revalidación por tags. |
| Lenguaje | **TypeScript** estricto | — | Tipos generados desde el CMS hasta la UI. |
| CMS + backend | **Payload 3** embebido en Next.js | Sanity, Strapi, Directus, panel propio | Ver CMS-SPECIFICATION §1. |
| Base de datos | **PostgreSQL** en **Neon** (vía Vercel Marketplace) | Supabase, Railway, MongoDB | Postgres estándar, branching por preview, backups. |
| ORM | Drizzle (interno de `@payloadcms/db-postgres`) | — | Viene con el adapter; migraciones versionadas. |
| Estilos | **Tailwind CSS v4** con tokens en CSS (`@theme`) | CSS Modules, vanilla-extract | Tokens del brandbook como única fuente; rápido de iterar. |
| Componentes accesibles | **Radix UI** primitives (acordeón, diálogo, menú) | Headless UI, React Aria | Accesibilidad sin imponer estilo. |
| Íconos | **lucide-react** (trazo 1,5) | — | Coincide con el brandbook 06.03. |
| Imágenes | `next/image` + tamaños de Payload + `sharp` | Cloudinary, Imgix | Sin costo extra; AVIF/WebP. |
| Almacenamiento de archivos | **Vercel Blob** (`@payloadcms/storage-vercel-blob`) | Cloudflare R2 (S3), AWS S3 | Integración directa. Si el volumen de video crece, migrar a R2 (sin costo de salida). |
| Video | MP4/WebM cortos en Blob + póster | Mux, Cloudflare Stream, YouTube | Los videos del sitio son loops de 8–15 s; no justifican un servicio de streaming. |
| Formularios | Server Actions + validación con **Zod** + **Cloudflare Turnstile** + honeypot + rate limit | Formspree, HubSpot Forms | Datos propios en el panel, sin costo por envío. |
| Email transaccional | **Resend** (`@payloadcms/email-resend`) | Postmark, SES | Plan gratuito suficiente para notificaciones; buen DX. |
| Analítica | **GA4** (`@next/third-parties`) + Consent Mode v2 + **Search Console** | Plausible, PostHog | Estándar para pauta y Search Console; gratis. |
| Pixel publicitario | Meta Pixel + Conversions API (fase 2) | — | Cuando haya pauta. |
| Hosting | **Vercel Pro** | Railway, Fly.io, Cloudflare (OpenNext) | Mejor soporte de Next.js; previews por PR. El plan Hobby no permite uso comercial. |
| DNS / dominio | `navegalosmolinos.com` apuntado a Vercel | Cloudflare DNS | — |
| Monitoreo | Vercel Analytics (Web Vitals) + **Sentry** (plan gratuito) | — | Errores y rendimiento real. |
| Tests | **Vitest** (unitarios) + **Playwright** (e2e de flujos críticos) | — | Flujos de consulta y WhatsApp siempre probados. |
| Calidad | ESLint + Prettier + `tsc --noEmit` en CI | Biome | — |
| CI/CD | GitHub + Vercel (preview por PR, producción en `main`) + GitHub Actions | — | — |
| Gestor de paquetes | **pnpm** | npm | Rápido; lockfile estable. |

### 1.1 Costos recurrentes estimados (a validar con precios vigentes)

| Servicio | Plan | Costo aproximado |
|---|---|---|
| Vercel | Pro, 1 usuario | ~USD 20/mes |
| Neon | Free al inicio → Launch si hace falta | USD 0 → ~USD 19/mes |
| Vercel Blob | Por uso (pocos GB) | < USD 5/mes |
| Resend | Free (3.000 emails/mes) | USD 0 |
| Cloudflare Turnstile | Free | USD 0 |
| Sentry | Developer (free) | USD 0 |
| GA4 / Search Console | — | USD 0 |
| Dominio `.com` | anual | ~USD 12/año |
| **Total MVP** | | **≈ USD 25–45/mes** |

Sin licencias por usuario ni por cantidad de contenido.

## 2. Vista de arquitectura

```mermaid
flowchart TB
  subgraph Cliente
    B[Navegador / mobile]
  end
  subgraph Vercel["Vercel (navegalosmolinos.com)"]
    N[Next.js 16 App Router]
    P[Payload 3 Admin /admin + API /api]
    SA[Server Actions: formularios]
    GO[/go/whatsapp: redirección medida]
    WH[/api/webhooks/booking - futuro]
  end
  DB[(Neon Postgres)]
  BL[(Vercel Blob: medios)]
  RS[Resend: emails]
  TS[Cloudflare Turnstile]
  GA[GA4 + Search Console]
  WA[WhatsApp]
  BK[Motor de reservas externo - futuro]

  B --> N
  B --> P
  N <--> P
  P <--> DB
  P <--> BL
  SA --> TS
  SA --> P
  SA --> RS
  GO --> P
  GO --> WA
  B --> GA
  BK --> WH --> P
```

## 3. Estructura de carpetas

```
soym/
├── CLAUDE.md                      Instrucciones permanentes para Claude Code
├── README.md
├── docs/                          Documentación del proyecto (esta carpeta)
│   └── research/capturas/         Capturas del benchmarking (pendiente)
├── public/
│   ├── brand/                     Logos, isotipo, ola (SVG exportados del Figma)
├── src/
│   ├── app/
│   │   ├── (frontend)/            Sitio público
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           Home
│   │   │   ├── experiencias/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── privados-y-empresas/page.tsx
│   │   │   ├── el-lago/page.tsx
│   │   │   ├── planifica-tu-visita/page.tsx
│   │   │   ├── nosotros/page.tsx
│   │   │   ├── preguntas-frecuentes/page.tsx
│   │   │   ├── contacto/page.tsx
│   │   │   ├── lista-de-espera/page.tsx
│   │   │   ├── promociones/[slug]/page.tsx
│   │   │   ├── gracias/page.tsx
│   │   │   ├── legales/[slug]/page.tsx
│   │   │   ├── go/whatsapp/route.ts
│   │   │   ├── fonts.ts           Cormorant Garamond + Montserrat (next/font/local)
│   │   │   └── not-found.tsx
│   │   ├── sitemap.ts             (en la raíz de app/, requisito de Next)
│   │   ├── robots.ts
│   │   ├── (payload)/             Admin y API de Payload (generado)
│   │   │   ├── admin/[[...segments]]/page.tsx
│   │   │   └── api/[...slug]/route.ts
│   │   └── api/
│   │       ├── revalidate/route.ts
│   │       └── webhooks/booking/route.ts   (futuro)
│   ├── collections/               Users, Media, Galleries, Categories, Seasons,
│   │                              Experiences, Pages, Faqs, Testimonials,
│   │                              Promotions, Banners, Inquiries, ConversionEvents
│   ├── globals/                   SiteSettings, Navigation, Announcement, Integrations
│   ├── blocks/                    Bloques del page builder (config + componente)
│   ├── fields/                    Campos reutilizables (slug, link, cta, source)
│   ├── access/                    isAdmin, isAdminOrEditor, publishedOnly
│   ├── hooks/                     revalidate, normalizePhone, computeStatus
│   ├── components/
│   │   ├── ui/                    Button, Chip, PriceBadge, Accordion, Input...
│   │   ├── brand/                 Logo, Isotipo, OlaDivider, HorizonRule
│   │   ├── layout/                SiteHeader, Footer, StickyActionBar, WhatsAppFab, AnnouncementBar
│   │   ├── sections/              Hero, ExperienceGrid, Timeline, FactList, ComparisonTable...
│   │   └── forms/                 InquiryForm, CorporateForm, WaitlistForm
│   ├── lib/
│   │   ├── cms/                   Capa de acceso a datos (único lugar que llama a Payload)
│   │   ├── conversion/            whatsapp.ts (links y ref codes), tracking.ts (eventos GA4)
│   │   ├── booking/               Adaptadores de proveedores (interfaz + 'contact')
│   │   ├── seo/                   metadata.ts, jsonld.ts
│   │   ├── validation/            Esquemas Zod de formularios
│   │   └── utils/                 fechas (zona Córdoba), formato de precios ARS
│   ├── fonts/                     Archivos .woff2 variables (OFL), subset latin
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css             Tokens del brandbook (@theme de Tailwind v4)
│   ├── migrations/                Migraciones de Postgres
│   ├── payload.config.ts
│   └── payload-types.ts           Generado (no editar)
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── docker-compose.yml             Postgres local
└── package.json
```

**Regla clave:** los componentes no llaman a Payload directamente. Todo pasa por `src/lib/cms/` (por ejemplo `getExperienceBySlug`, `getActivePromotions`). Así el CMS se puede reemplazar sin tocar la UI, y el cacheo por tags queda centralizado.

## 4. Renderizado y cacheo

| Página | Estrategia |
|---|---|
| Home, Experiencias, fichas, páginas de contenido | **Estático + revalidación por tags** (`revalidateTag` desde hooks de Payload). Sin tiempo fijo. |
| Promociones y banners | Estático con revalidación por tags + `revalidate` de respaldo de 15 min (por las fechas de inicio y fin). |
| Formularios | Server Actions (dinámico). |
| `/go/whatsapp` | Route handler dinámico (registra y redirige). |
| Vista previa | Draft Mode de Next.js. |
| Admin | Dinámico (Payload). |

## 5. APIs y endpoints

| Endpoint | Tipo | Uso |
|---|---|---|
| `/api/*` | Payload REST (y GraphQL desactivado si no se usa) | Admin y acceso interno. Lectura pública solo de contenido publicado. |
| Payload Local API | En servidor | Lo que usa el frontend (sin HTTP). |
| `submitInquiry` | Server Action | Valida con Zod, verifica Turnstile, rate limit por IP (hash), crea `inquiries`, envía email, devuelve estado. |
| `GET /go/whatsapp?exp=&cta=&ref=` | Route handler | Registra `conversion-events`, arma el mensaje y redirige 302 a `https://wa.me/<numero>?text=...`. |
| `POST /api/revalidate` | Route handler con secreto | Revalidación manual de emergencia. |
| `POST /api/webhooks/booking` | Route handler con firma | **Futuro**: recibe reservas del proveedor. |
| `GET /api/availability?exp=` | Route handler | **Futuro**: consulta disponibilidad al proveedor (cacheado). |

## 6. Autenticación y autorización

- **Panel:** auth de Payload (email + contraseña, cookies `HttpOnly`/`Secure`/`SameSite=Lax`), roles `admin` y `editor` (CMS-SPECIFICATION §2). Bloqueo por intentos. Solo admin crea usuarios.
- **Sitio público:** sin usuarios en el MVP.
- **API:** lectura pública solo de documentos publicados; escritura solo autenticada. `inquiries` no se puede crear por REST público: solo por la Server Action.
- **Webhooks:** verificación de firma HMAC con secreto por proveedor.

## 7. Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Dónde | Descripción |
|---|---|---|
| `DATABASE_URI` | servidor | Conexión Postgres (Neon) |
| `PAYLOAD_SECRET` | servidor | Secreto de Payload (≥ 32 caracteres) |
| `NEXT_PUBLIC_SITE_URL` | público | `https://navegalosmolinos.com` en producción |
| `BLOB_READ_WRITE_TOKEN` | servidor | Vercel Blob |
| `RESEND_API_KEY` | servidor | Emails |
| `EMAIL_FROM` | servidor | `Espíritu del Lago <hola@navegalosmolinos.com>` |
| `NOTIFY_INQUIRIES_TO` | servidor | Destinatarios por defecto |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | servidor / público | Antispam |
| `NEXT_PUBLIC_GA4_ID` | público | GA4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | público | Fase 2 |
| `REVALIDATE_SECRET` | servidor | Endpoint de revalidación |
| `PREVIEW_SECRET` | servidor | Vista previa |
| `SENTRY_DSN` | servidor/público | Monitoreo |
| `BOOKING_PROVIDER`, `BOOKING_API_KEY`, `BOOKING_WEBHOOK_SECRET` | servidor | Futuro |

Los números de WhatsApp y teléfonos **no** van en variables de entorno: viven en el CMS para que Marketing los cambie.

## 8. Internacionalización

- MVP: solo `es-AR`, URLs sin prefijo.
- Payload con localización activada (`locales: ['es']`, `defaultLocale: 'es'`) desde el día 1.
- Fase 2: agregar `en` y `pt` en Payload y rutas `/en/...`, `/pt/...` con `middleware`, `hreflang` y sitemaps por idioma. Las URLs en español no cambian.

## 9. Ambientes

| Ambiente | URL | Base | Datos | Deploy |
|---|---|---|---|---|
| Local | `http://localhost:3000` | Postgres en Docker | Seed de ejemplo (`pnpm seed`) | `pnpm dev` |
| Preview | `*.vercel.app` por PR | **Branch de Neon** por PR | Copia de staging | Automático por PR |
| Staging (opcional) | `staging.navegalosmolinos.com` | Branch `staging` de Neon | Copia de producción | Rama `staging` |
| Producción | `https://navegalosmolinos.com` | Neon `main` | Reales | Merge a `main` |

Preview y staging llevan `noindex` y protección con contraseña de Vercel.

## 10. Dominio y producción

- `navegalosmolinos.com` como dominio principal; `www.navegalosmolinos.com` redirige 308 al apex.
- HTTPS automático (Vercel). HSTS con `includeSubDomains` una vez estable.
- Email del dominio: registros SPF, DKIM y DMARC para Resend (`hola@navegalosmolinos.com` o el que defina SOYM).
- Dominios secundarios (si se registran, ej. `espiritudellago.com.ar`): redirección 301 al dominio principal.

## 11. Estrategia de deploy

1. Trabajo en ramas `feat/*` → PR → preview automático en Vercel con branch de Neon.
2. CI (GitHub Actions): `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`; e2e de Playwright contra el preview en flujos críticos (consulta, WhatsApp, lista de espera).
3. Las migraciones de base (`pnpm payload migrate:create`) se versionan en el PR y se aplican en el build de producción (`payload migrate` antes de `next build`).
4. Merge a `main` → producción. Rollback instantáneo desde Vercel (las migraciones se escriben compatibles hacia atrás).

## 12. Seguridad

- Cabeceras: CSP estricta (con excepciones explícitas para GA4, Turnstile, Google Maps y el futuro widget de reservas), `X-Frame-Options: DENY` (salvo vista previa), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` mínima.
- Formularios: Zod en servidor, Turnstile, honeypot, rate limit, sanitización; nunca se renderiza HTML enviado por usuarios.
- CMS: roles, bloqueo por intentos, sin campos de HTML/JS libre para editores (el widget de reservas se configura con parámetros, no con código).
- Secretos solo en variables de entorno de Vercel; `.env*` en `.gitignore`.
- Dependencias: Dependabot/Renovate semanal; actualizar Payload y Next en ventanas controladas.
- Datos personales: IP hasheada, retención definida (DATA-MODEL §6), acceso a consultas solo autenticado.
- `/admin` con `noindex` y sin enlaces públicos.

## 13. Backups y recuperación

| Qué | Cómo | Frecuencia | Retención |
|---|---|---|---|
| Base de datos | Restauración a un punto en el tiempo de Neon (según plan) | Continua | 7 días (Free) / más en planes pagos |
| Base de datos (independiente) | GitHub Action: `pg_dump` comprimido y cifrado a un bucket (R2/S3) | Diaria | 30 diarias + 12 mensuales |
| Medios | Vercel Blob (durable) + copia semanal al mismo bucket | Semanal | 4 semanas |
| Código y modelo de datos | Git (GitHub) | Cada cambio | Permanente |

**Prueba de restauración** trimestral en un branch de Neon. Objetivo: RPO ≤ 24 h, RTO ≤ 4 h.

## 14. Rendimiento (presupuesto)

- LCP < 2,5 s en 4G (p75), CLS < 0,1, INP < 200 ms.
- JS de cliente en páginas públicas < 120 KB comprimidos (Server Components por defecto; `"use client"` solo donde hay interacción).
- Hero: imagen AVIF/WebP con `priority` y `sizes` correctos; video con `preload="none"` y póster.
- Fuentes self-hosted con `next/font/local` (archivos variables en `src/fonts/`, `display: swap`, subset latin). No dependen de fonts.googleapis.com en el build.
- Mapas y widgets de terceros con carga diferida al interactuar.

## 15. Decisiones técnicas (registro)

| # | Decisión | Motivo | Alternativa descartada |
|---|---|---|---|
| D1 | Payload embebido en Next.js | Un deploy, una base, roles nativos, costo cero | Sanity (SaaS, costo por usuario), panel propio (costo de desarrollo) |
| D2 | Postgres (Neon) | Estándar, branching, relacional para reservas futuras | MongoDB |
| D3 | Sin motor de reservas propio | Fuera de alcance; proveedores maduros con Mercado Pago | Construirlo |
| D4 | WhatsApp medido vía `/go/whatsapp` | Saber de dónde vienen las conversaciones sin API de WhatsApp | Link directo `wa.me` (sin medición propia) |
| D5 | Tailwind v4 con tokens del brandbook | Una sola fuente de tokens, velocidad | CSS-in-JS |
| D6 | Video corto self-hosted | Loops breves, sin costo de streaming | Mux / YouTube embebido |
| D7 | Localización activada con un idioma | Evita migrar datos al sumar idiomas | Activarla después |
| D8 | Capa `src/lib/cms` | Independencia del CMS y cacheo centralizado | Llamadas directas a Payload desde componentes |
| D9 | Modo del sitio global (preapertura/consultas/reservas) | Acompaña el lanzamiento sin rediseño | Ramas o sitios distintos |
| D10 | Fuentes self-hosted (`next/font/local`) | Builds reproducibles sin red a Google Fonts; mismo rendimiento | `next/font/google` |
