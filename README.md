# Espíritu del Lago — navegalosmolinos.com

Sitio web de **Espíritu del Lago**, la experiencia de navegación de **SOYM S.A.** en el Lago Los Molinos, Valle de Calamuchita, Córdoba.

> *El lago desde adentro.*

Sitio institucional y comercial con panel de administración para Marketing, preparado para sumar reservas online con un proveedor externo sin rehacer el sitio.

---

## Estado

**Etapa 0 → 1A.** Investigación, estrategia, arquitectura y modelo de datos documentados. Estructura inicial lista y verificada: `typecheck`, tests y `build` pasan; la migración inicial crea la base; el panel funciona en español con roles; `/go/whatsapp` registra el clic y redirige con el código de referencia. El frontend completo se construye después de aprobar los diseños en Figma (ver `docs/ROADMAP.md`).

## Landing de lanzamiento

La home (`/`) es una página de presentación completa: hero, historia, experiencias, cómo es una salida, el barco, el lago y Tres Bahías, compromiso ambiental, privados, ubicación, lista de espera y cierre.

- **Textos:** `src/content/landing.ts`. Lo que está en `ph(...)` es un dato sin confirmar y se ve subrayado en oro punteado (`NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` lo oculta).
- **Fotos:** hoy son placeholders con la indicación de dirección de arte. Para cargar una foto: copiarla a `public/images/` y completar `src` del slot en `photos` dentro de `landing.ts`.
- **Lista de espera:** guarda en el panel (**Consultas → filtro tipo Lista de espera**) y se exporta a CSV.

## Documentación

| Documento | Contenido |
|---|---|
| [`docs/RESEARCH.md`](docs/RESEARCH.md) | Benchmarking de 8 referentes internacionales y regionales, patrones y oportunidades |
| [`docs/STRATEGY.md`](docs/STRATEGY.md) | Públicos, propuesta de valor, objetivos, modos del sitio, arquitectura de información, CTAs, conversión y **datos a confirmar** |
| [`docs/SITEMAP.md`](docs/SITEMAP.md) | Árbol del sitio y especificación de cada página |
| [`docs/USER-FLOWS.md`](docs/USER-FLOWS.md) | Recorridos principales con eventos de medición |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | Brandbook traducido a web: color, tipografía, grilla, componentes, foto, movimiento, responsive |
| [`docs/TECHNICAL-ARCHITECTURE.md`](docs/TECHNICAL-ARCHITECTURE.md) | Stack, estructura, APIs, auth, entornos, deploy, seguridad, backups, decisiones |
| [`docs/DATA-MODEL.md`](docs/DATA-MODEL.md) | Entidades, relaciones y reglas de negocio |
| [`docs/CMS-SPECIFICATION.md`](docs/CMS-SPECIFICATION.md) | Comparación de CMS, recomendación y especificación del panel |
| [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) | WhatsApp, formularios, teléfono, redes, medición y preparación para reservas |
| [`docs/SEO-STRATEGY.md`](docs/SEO-STRATEGY.md) | SEO técnico y local, datos estructurados, Core Web Vitals, GA4 |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Etapas con entregables, dependencias y criterios de aceptación |
| [`CLAUDE.md`](CLAUDE.md) | Reglas permanentes para desarrollar con Claude Code |

**Fuente de verdad de marca:** brandbook en Figma — https://www.figma.com/design/Ct99yTgciSUepI2j8MbNlI/SOYM

## Stack

Next.js 16 · React 19 · TypeScript · Payload CMS 3 (embebido, panel en `/admin`) · PostgreSQL (Neon) · Tailwind CSS v4 · Vercel · Vercel Blob · Resend · Cloudflare Turnstile · GA4.

## Cómo trabajar

### Requisitos
- Node.js ≥ 22.12
- pnpm 10 (`corepack enable`)
- Docker (para Postgres local)

### Primer arranque
```bash
cp .env.example .env.local          # completar PAYLOAD_SECRET (openssl rand -hex 32)
pnpm install
pnpm db:up                          # Postgres en Docker
pnpm dev                            # http://localhost:3000
```
Abrí `http://localhost:3000/admin` y creá el primer usuario: queda como **administrador** automáticamente. Los siguientes se crean desde **Sistema → Usuarios**, con rol Marketing/Editor por defecto. Después, en **Configuración → Integraciones**, el modo del sitio arranca en `preapertura`.

### Día a día
```bash
pnpm dev                            # desarrollo
pnpm generate:types                 # tras cambiar colecciones/globals
pnpm migrate:create <nombre>        # tras cambiar el modelo de datos
pnpm typecheck && pnpm test         # antes de abrir un PR
pnpm build                          # verificación de producción
```

### Con Claude Code
Abrí la carpeta con Claude Code: va a leer `CLAUDE.md` automáticamente. Para una tarea nueva, indicá la etapa y el ítem del roadmap (por ejemplo: *"Etapa 1A: implementá los componentes base Button, Chip y PriceBadge según DESIGN-SYSTEM §10"*).

## Estructura

```
docs/                Documentación del proyecto
public/brand/        Logos, isotipo y ola en SVG (exportados del Figma)
src/app/(frontend)/  Sitio público
src/app/(payload)/   Panel y API de Payload
src/collections/     Modelo de datos (colecciones)
src/globals/         Configuración global (contacto, navegación, aviso, integraciones)
src/blocks/          Bloques del constructor de páginas
src/lib/             Acceso a datos, conversión (WhatsApp), reservas, SEO
src/styles/          Tokens del brandbook y estilos globales
src/fonts/           Cormorant Garamond y Montserrat (OFL, self-hosted)
tests/               Tests unitarios (Vitest) y e2e (Playwright, etapa 1D)
```

## Producción

- Dominio: **https://navegalosmolinos.com** (apex; `www` redirige).
- Deploy: merge a `main` → Vercel. Previews automáticos por PR, con `noindex`.
- Variables de entorno: ver `.env.example` y `docs/TECHNICAL-ARCHITECTURE.md §7`.

## Pendientes clave antes de construir

Ver `docs/STRATEGY.md §13`. Los más urgentes: experiencias y horarios definitivos (operación solo diurna), precios, capacidad comercial, punto de embarque exacto, número de WhatsApp Business, fecha de la sesión de fotos y textos legales.
