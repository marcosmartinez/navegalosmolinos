# CLAUDE.md — Instrucciones permanentes para Claude Code

Sitio web de **Espíritu del Lago**, la marca de experiencia de **SOYM S.A.** en el Lago Los Molinos (Valle de Calamuchita, Córdoba). Dominio: **navegalosmolinos.com**.

Leé esto antes de cualquier tarea. Si una instrucción de una tarea contradice este archivo, preguntá.

---

## 1. Qué es el proyecto

- Sitio institucional y comercial de una experiencia de navegación en catamarán (90 minutos, gastronomía, música, parada en tierra cuando esté habilitada).
- El objetivo del MVP es **generar consultas** (WhatsApp, formularios, teléfono), no vender online.
- Tiene que poder pasar a **reservas online con un proveedor externo** sin rehacer el sitio.
- Lo opera una persona de **Marketing** desde el panel (`/admin`), sin desarrolladores.

Documentación completa en `docs/`. Orden de lectura: `STRATEGY` → `SITEMAP` → `DESIGN-SYSTEM` → `TECHNICAL-ARCHITECTURE` → `DATA-MODEL` → `CMS-SPECIFICATION` → `INTEGRATIONS` → `SEO-STRATEGY` → `ROADMAP`.

## 2. Estado actual y qué hacer primero

- **Etapa actual:** fin de la Etapa 0 / inicio de 1A (ver `docs/ROADMAP.md`).
- Hecho: documentación, modelo de datos en Payload (colecciones y globals), tokens del brandbook, logos, fuentes, `/go/whatsapp`, sitemap, robots, tests unitarios.
- **Landing de lanzamiento** en `/` (una sola página): contenido en `src/content/landing.ts`, datos sin confirmar con `ph(...)`, fotos como placeholders de marca (`Photo`) hasta tener las reales en `public/images/`. Lista de espera funcional (Server Action → `inquiries` tipo `waitlist`). En la etapa 1C este contenido pasa al CMS.
- **No implementar el frontend completo** hasta que estén aprobados los diseños de Home, Ficha y Privados en Figma y los datos de `docs/STRATEGY.md §13`.

## 3. Stack

Next.js 16 (App Router) · React 19 · TypeScript estricto · **Payload 3** embebido (admin en `/admin`) · PostgreSQL (Neon; Docker en local) · Tailwind CSS v4 (tokens en `src/styles/tokens.css`) · Vercel · Vercel Blob · Resend · Cloudflare Turnstile · GA4. Gestor: **pnpm**.

## 4. Comandos

```bash
pnpm install
pnpm db:up                 # Postgres local (Docker)
pnpm dev                   # http://localhost:3000  ·  panel: /admin
pnpm generate:types        # después de cambiar colecciones o globals
pnpm generate:importmap    # después de agregar componentes custom al admin
pnpm migrate:create <nombre>  # después de cambiar el modelo de datos
pnpm typecheck && pnpm test && pnpm build   # antes de cada PR
```

## 5. Reglas de arquitectura

1. **El frontend no llama a Payload directamente.** Todo acceso a datos pasa por `src/lib/cms/` con caché por tags. Si necesitás un dato nuevo, agregá una función ahí.
2. **Server Components por defecto.** `"use client"` solo donde hay interacción (formularios, acordeones, menú mobile). Presupuesto de JS público < 120 KB.
3. **Un dato, un lugar.** Precios, horarios, WhatsApp, dirección viven en el CMS. Nunca hardcodear datos comerciales en componentes.
4. **Cambios de modelo de datos:** editar la colección → `pnpm generate:types` → `pnpm migrate:create` → actualizar `docs/DATA-MODEL.md` en el mismo PR.
5. **Revalidación:** toda colección o global que afecte al sitio tiene un hook `afterChange` de `src/hooks/revalidate.ts`.
6. **Reservas:** la UI usa un único `<BookingCta />` que decide según `effectiveMode()` (`src/lib/booking/types.ts`). No poner links de reserva sueltos.
7. **WhatsApp:** siempre vía `/go/whatsapp?exp=<slug>&cta=<ubicación>`, nunca `wa.me` directo en un componente (se pierde la medición).
8. **Formularios:** Server Actions + Zod + Turnstile + honeypot. `inquiries` se crea con la Local API (`overrideAccess: true`) solo desde el servidor.
9. **Seguridad:** nada de HTML o scripts libres editables desde el CMS. Secretos solo en variables de entorno. Ver `docs/TECHNICAL-ARCHITECTURE.md §12`.
10. **Accesibilidad AA** y `prefers-reduced-motion` en todo componente nuevo.

## 6. Convenciones de código

- TypeScript estricto, sin `any` (usar `unknown` y estrechar).
- Componentes en PascalCase (`ExperienceCard.tsx`), funciones en camelCase, carpetas en kebab-case.
- Rutas públicas en español, minúsculas, sin tildes (`/planifica-tu-visita`).
- Código y nombres técnicos en inglés; **textos de UI, labels del CMS y documentación en español rioplatense**.
- Imports con alias `@/` (`@/lib/cms`).
- Commits en español, imperativo: "Agrega formulario corporativo".
- Comentarios solo para el *por qué*, no para el *qué*.

## 7. Reglas de marca (resumen del brandbook — obligatorias)

**Fuente de verdad:** brandbook en Figma — https://www.figma.com/design/Ct99yTgciSUepI2j8MbNlI/SOYM (páginas 00–12). Detalle en `docs/DESIGN-SYSTEM.md`.

- **Marca:** "Espíritu del Lago". SOYM S.A. aparece solo como endoso ("Una experiencia de SOYM S.A.") en pie de página y legales. **Nunca "SOYM" en un titular.**
- **Idea madre:** *El lago desde adentro.*
- **Colores:** usar solo los tokens de `tokens.css`. Verde Lago `#2F5250` (madre), Oro Sierra `#CFA368` (acento, **nunca como texto sobre fondo claro**), Piedra `#EFEFEA`, Grafito `#404040`, Blanco `#F8F7F3` (fondo web). Sin rojos, sin celestes, sin negro puro.
- **Oro como puntuación:** un solo uso de oro por pantalla.
- **Tipografía:** Cormorant Garamond (títulos, citas, números y precios; nunca Bold; nunca texto corrido < 20 px) + Montserrat (texto, UI, labels, CTAs). Nunca una tercera familia. Mayúsculas siempre con tracking 16–22 %.
- **Formas:** esquinas rectas (radio 0; 2 px en chips). Sin sombras. Bordes de 1 px.
- **Logo:** siempre SVG de `public/brand/`, nunca retipeado. Tamaños mínimos: vertical 110 px, horizontal 180 px, isotipo 32 px.
- **Fotos:** desde el barco hacia afuera, horizonte bajo, sin filtros, sin stock, sin radios. Las imágenes generadas con IA no se usan como fotos de la experiencia.
- **Composición:** un protagonista por pantalla, máximo tres niveles tipográficos, aire antes que información.

## 8. Voz y textos

- Voseo, frases cortas, concretas, cálidas. Sin signos de admiración. Un solo CTA principal por pantalla.
- CTAs aprobados: "Reservá por WhatsApp", "Consultar disponibilidad", "Ver salidas de esta semana", "Cerrar el barco para tu grupo", "Pedí tu propuesta", "Regalá una salida en el lago", "Enterate primero".
- **Palabras prohibidas:** crucero, tour, excursión turística, paquete, servicio, VIP, lujo, aventura extrema, full, promo, oferta imperdible, top, increíble, mega, "¡¡!!".
- Precio y qué incluye siempre juntos.

## 9. Restricciones del negocio (no negociables)

1. **No inventar información comercial.** Precios, horarios, capacidad, dirección, teléfonos, políticas: si no están confirmados, usar el texto alternativo del CMS ("Consultá el precio") o marcar `[CONFIRMAR]`. La lista de pendientes está en `docs/STRATEGY.md §13`.
2. **Operación solo diurna** (Ley provincial 11.005, art. 27). No publicar "Noche de estrellas" ni copys como "volvemos con las primeras estrellas". El CMS valida horarios.
3. **Capacidad comercial:** comunicar los lugares comerciales confirmados (el plan habla de 70), no las 100 personas de la ficha técnica.
4. **Tres Bahías:** "Próximamente" hasta que APRHI autorice el desembarco.
5. **No vender antes de tener las habilitaciones:** el sitio arranca en modo `preapertura` (global `integrations.siteMode`).
6. Datos personales según Ley 25.326: consentimiento explícito, retención definida, IP hasheada.

## 10. Definición de terminado (cada PR)

- [ ] `pnpm typecheck`, `pnpm test` y `pnpm build` pasan.
- [ ] Probado a 375 px y 1440 px.
- [ ] Contraste AA y navegación por teclado.
- [ ] Sin datos comerciales hardcodeados ni inventados.
- [ ] Textos revisados contra la voz de marca (§8).
- [ ] Docs actualizadas si cambió el modelo, una integración o una decisión (registro de decisiones en `docs/TECHNICAL-ARCHITECTURE.md §15`).
