# SEO-STRATEGY — SEO, analítica y performance

---

## 1. Oportunidad

Hoy no hay ninguna excursión comercial operando en el Lago Los Molinos. Eso significa:
- **Poca competencia** para búsquedas transaccionales del lago ("paseo en barco lago los molinos", "navegar lago los molinos", "excursión lago los molinos").
- **Demanda latente** en búsquedas del destino ("qué hacer en Villa General Belgrano", "qué hacer en Calamuchita", "lago los molinos") donde hoy aparecen playas, campings y agregadores.
- El dominio `navegalosmolinos.com` ya contiene la intención principal.

**Objetivo:** ser el primer resultado para las búsquedas del lago y entrar en las del valle a 90 días del lanzamiento.

## 2. Palabras clave (hipótesis a validar con Search Console y Keyword Planner)

| Grupo | Ejemplos | Página destino |
|---|---|---|
| Transaccional – lago | paseo en barco lago los molinos · navegar lago los molinos · excursión lacustre los molinos · catamarán lago los molinos | Home, `/experiencias` |
| Transaccional – experiencia | atardecer en el lago calamuchita · brunch en el lago córdoba · paseo en barco con vino córdoba | Fichas |
| Ocasión | plan para aniversario en calamuchita · regalo experiencia córdoba · festejo de cumpleaños en barco córdoba | Fichas, Privados |
| Corporativo | evento de empresa en calamuchita · team building córdoba lago | `/privados-y-empresas` |
| Destino | lago los molinos · dique los molinos · qué hacer en villa general belgrano · qué hacer en calamuchita | `/el-lago`, `/planifica-tu-visita`, guía (fase 2) |
| Logística | cómo llegar al lago los molinos · villa ciudad parque cómo llegar | `/planifica-tu-visita` |
| Marca | espíritu del lago · espíritu del lago los molinos | Home |

## 3. SEO técnico

| Requisito | Implementación |
|---|---|
| Renderizado | HTML completo desde el servidor (Server Components, estático + revalidación) |
| URLs amigables | En español, minúsculas, guiones, sin tildes, sin parámetros (SITEMAP §2) |
| Canonical | Absoluto en cada página (`metadataBase` = `NEXT_PUBLIC_SITE_URL`); parámetros UTM fuera del canonical |
| `www` → apex | Redirección 308 |
| Redirecciones | Plugin de redirecciones del CMS; experiencias pausadas → 301 a `/experiencias` |
| Sitemap XML | `src/app/sitemap.ts` dinámico desde el CMS (páginas, experiencias activas, landings de promociones vigentes), con `lastModified` |
| Robots.txt | `src/app/robots.ts`: permite todo salvo `/admin`, `/api`, `/go`, `/gracias`; previews con `Disallow: /` |
| `noindex` | `/gracias`, `/lista-de-espera` (fuera del modo preapertura), previews, staging, landings vencidas |
| 404 / 410 | 404 personalizada; 410 para contenido eliminado definitivamente |
| Hreflang | Fase 2, al sumar idiomas |
| Encabezados | Un H1 por página; jerarquía H2/H3 sin saltos |
| Breadcrumbs | En fichas y páginas internas, con datos estructurados |
| Enlazado interno | Fichas ↔ Planificá tu visita ↔ FAQ ↔ El lago |

## 4. Metadata

Generada por `src/lib/seo/metadata.ts` a partir del CMS (plugin `@payloadcms/plugin-seo`), con valores por defecto en Información general.

| Página | Title (≤ 60) | Description (≤ 160) |
|---|---|---|
| Home | Navegá el Lago Los Molinos · Espíritu del Lago | Salidas en catamarán por el Lago Los Molinos, en el Valle de Calamuchita: atardecer, brunch y salidas privadas. Consultá por WhatsApp. |
| Experiencias | Experiencias en el Lago Los Molinos · Espíritu del Lago | (desde el CMS) |
| Ficha | {Experiencia} en el Lago Los Molinos · Espíritu del Lago | {tagline} · {duración} · desde ${precio} |
| Privados | Eventos privados y de empresa en el lago · Espíritu del Lago | (desde el CMS) |

Los textos finales los ajusta Marketing en el panel, siguiendo la voz del brandbook (sin superlativos).

## 5. Open Graph y redes

- `og:title`, `og:description`, `og:image` (1200×630) por página; imagen por defecto con el lockup sobre foto del lago.
- Imagen OG generada dinámicamente para fichas (`opengraph-image.tsx`): foto de la experiencia + nombre en Cormorant + isotipo. Respeta el brandbook (degradé Verde Profundo, un solo oro).
- `twitter:card = summary_large_image`.
- Vista previa de enlaces en WhatsApp: verificar que la imagen pese < 300 KB (WhatsApp descarta imágenes pesadas).

## 6. Datos estructurados (JSON-LD)

Generados en `src/lib/seo/jsonld.ts`.

| Tipo | Dónde | Datos |
|---|---|---|
| `Organization` | Global | nombre "Espíritu del Lago", `parentOrganization` SOYM S.A., logo, redes (`sameAs`), contacto |
| `LocalBusiness` → `TouristAttraction` + `TravelAgency` (a evaluar) | Home, Planificá tu visita | nombre, dirección del embarque, geo, teléfono, horario, `priceRange`, imagen |
| `TouristTrip` + `Offer` | Cada ficha | nombre, descripción, `itinerary`, `touristType`, duración (ISO 8601: `PT90M`), `offers` (precio, `priceCurrency: ARS`, `availability`, `validFrom`, `priceValidUntil`) |
| `Product`/`Offer` alternativo | Ficha | Si Google no muestra `TouristTrip`, evaluar `Product` con `Offer` para precios en resultados |
| `FAQPage` | `/preguntas-frecuentes` y fichas | Preguntas visibles en la página |
| `BreadcrumbList` | Páginas internas | — |
| `Event` | Fase 2: salidas especiales con fecha | — |
| `AggregateRating` / `Review` | **Solo** con reseñas reales y verificables | — |

**Regla:** nada en los datos estructurados que no esté visible en la página (Google lo penaliza) y ningún precio sin confirmar.

## 7. SEO local

1. **Google Business Profile** del punto de embarque (categoría principal sugerida: "Servicio de paseos en barco" o equivalente; secundarias: atracción turística) **[CONFIRMAR dirección y acceso del Club Náutico Calamuchita]**.
2. **NAP consistente** (nombre, dirección, teléfono) en el sitio, la ficha de Google, Instagram, TripAdvisor y directorios.
3. Página `/planifica-tu-visita` con dirección, mapa, accesos desde cada localidad y fotos del embarque.
4. Reseñas: pedido de reseña en WhatsApp el día después de cada salida (brandbook 10.06, domingo: "agradecimiento + pedido de reseña"), con enlace directo a Google.
5. Directorios y prensa: Agencia Córdoba Turismo, sitio de turismo de Calamuchita y de la Comuna de Villa Ciudad Parque, alojamientos aliados (enlaces de calidad).
6. Contenido local evergreen (fase 2, `/guia`): "El Lago Los Molinos en invierno", "Cómo llegar desde Córdoba", "Qué hacer en Villa Ciudad Parque", "Tres Bahías: la reserva".

## 8. Imágenes

- `next/image` con AVIF/WebP, `sizes` correctos por breakpoint, `priority` solo en el hero.
- Tamaños generados por Payload (DATA-MODEL §2.2). Original máximo 3000 px de lado.
- `alt` obligatorio y descriptivo (no "foto 1"; sí "Cubierta del catamarán al atardecer con las sierras de fondo").
- Nombres de archivo descriptivos (`golden-hour-cubierta-atardecer.jpg`).
- Arte dirigido: recorte vertical para mobile en heros.
- Lazy loading en todo lo que está debajo del primer pliegue.

## 9. Core Web Vitals

| Métrica | Objetivo (p75, mobile) | Cómo |
|---|---|---|
| LCP | < 2,5 s | Hero estático y optimizado, fuentes con `next/font`, sin sliders, CDN de Vercel |
| CLS | < 0,1 | Dimensiones en todas las imágenes y videos; fuentes con `size-adjust`; banners con espacio reservado |
| INP | < 200 ms | Server Components, JS mínimo, terceros diferidos (GA4 con `afterInteractive`, mapa al click) |
| TTFB | < 0,8 s | Páginas estáticas con revalidación |

Monitoreo: Vercel Speed Insights (datos reales) + Lighthouse CI en los PR (umbral mínimo: Performance ≥ 90 mobile, SEO 100, Accesibilidad ≥ 95).

## 10. Analítica

### 10.1 GA4
- Propiedad GA4 + flujo web de `navegalosmolinos.com`.
- Eventos personalizados y conversiones definidos en INTEGRATIONS §2.2.
- Dimensiones personalizadas: `experience`, `cta_location`, `ref_code`, `form_type`, `site_mode`.
- Exclusión de tráfico interno (IP de oficina / parámetro `?internal=1`).
- Consent Mode v2: por defecto `analytics_storage` denegado hasta aceptar; señales anónimas.
- Retención de datos: 14 meses.

### 10.2 Google Search Console
- Propiedad de dominio verificada por DNS (TXT).
- Envío del sitemap.
- Revisión semanal de consultas, CTR y cobertura.

### 10.3 Seguimiento de conversiones
- **Conversiones clave en GA4:** `whatsapp_click`, `generate_lead`, `sign_up`, `phone_click` (y `purchase` en el futuro).
- **Atribución:** UTM obligatorios en todos los enlaces propios (bio, pauta, QR de alojamientos, email). Convención:
  - `utm_source`: instagram · facebook · tiktok · google · alojamiento-{nombre} · email · prensa
  - `utm_medium`: social · paid · qr · referral · email
  - `utm_campaign`: intriga-2026 · lanzamiento-2026 · temporada-alta · {promo}
- Los UTM y el referrer se guardan en una cookie first-party (30 días) para que viajen con la consulta y el clic a WhatsApp aunque la persona navegue varias páginas.
- **Importación a Google Ads** de las conversiones de GA4 cuando haya pauta.

### 10.4 Eventos de WhatsApp y formularios (detalle)
- `whatsapp_click` se dispara en el cliente **y** se registra en el servidor (`/go/whatsapp`), así se mide aunque el bloqueador de anuncios impida GA4.
- `generate_lead` se dispara solo con respuesta exitosa del servidor (no al hacer click en "Enviar").
- La página `/gracias` registra `page_view` como respaldo de conversión.

## 11. Checklist de lanzamiento SEO

- [ ] Títulos y descripciones cargados en todas las páginas.
- [ ] Sitemap enviado y sin errores en Search Console.
- [ ] Datos estructurados validados (Rich Results Test) en Home, fichas y FAQ.
- [ ] Google Business Profile verificado.
- [ ] Imagen OG por defecto y por ficha.
- [ ] Redirecciones de `www`, `/tarifas`, `/reservas`, `/promociones`.
- [ ] Previews con `noindex`.
- [ ] Lighthouse mobile ≥ 90 en Home y una ficha.
- [ ] GA4 con conversiones marcadas y prueba en DebugView.
- [ ] Banner de cookies funcionando con Consent Mode.
