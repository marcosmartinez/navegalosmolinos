# INTEGRATIONS — Integraciones actuales y futuras

---

## 1. Canales de conversión del MVP

| Canal | Implementación | Medición | Dueño |
|---|---|---|---|
| **WhatsApp** (principal) | Botón → `/go/whatsapp` → registro → `wa.me` con mensaje precargado y código de referencia | GA4 `whatsapp_click` + `conversion-events` en el panel + código de referencia en el chat | Marketing / Ventas |
| **Formularios** | Server Action → `inquiries` + email al equipo | GA4 `generate_lead` + `inquiries` con origen completo | Marketing / Ventas |
| **Teléfono** | Enlace `tel:` (formato internacional) | GA4 `phone_click` | Ventas |
| **Redes sociales** | Enlaces a perfiles (footer, Nosotros) + UTM en los links de bio | GA4 `social_click`; tráfico entrante por UTM | Marketing |

### 1.1 WhatsApp

**Flujo**
```
Botón "Reservá por WhatsApp"
 → GET /go/whatsapp?exp=golden-hour&cta=sticky_bar
 → el servidor lee UTM/referrer de cookies propias (first-party, 30 días)
 → registra conversion-events
 → arma el código: EDL-{refCode experiencia}-{canal}  (ej. EDL-GH-IG)
 → 302 a https://wa.me/54XXXXXXXXXX?text=<mensaje precargado codificado>
```

**Mensaje precargado** (plantilla editable por experiencia en el CMS):
> Hola, quiero consultar por {experiencia}. Somos __ personas para el día __. (Ref. {ref})

**Canal en el código de referencia:** derivado de `utm_source` (IG, FB, GO = Google orgánico, GA = Google Ads, TT = TikTok, AL = alojamiento, DI = directo).

**Por qué el código:** la conversación en WhatsApp no se puede rastrear desde la web. El código permite que quien atiende registre el origen al cerrar la reserva y, en fase 2, que la API de WhatsApp lo lea automáticamente.

**Requisitos:** número de WhatsApp Business de SOYM **[CONFIRMAR]**; perfil de empresa completo (logo, horario, dirección, catálogo opcional); respuestas rápidas con el guion 02.05 del brandbook.

**Fase 2 — WhatsApp Business Platform (Cloud API de Meta):** inbox compartido, plantillas aprobadas para confirmaciones y recordatorios (48 h y 24 h, según el calendario del brandbook 10.06), lectura automática del código de referencia y alta de la conversación como consulta en el panel. Requiere verificar la empresa ante Meta (lleva semanas) y un proveedor (directo con Meta o un BSP).

### 1.2 Formularios

| Formulario | Dónde | Campos obligatorios | Destino |
|---|---|---|---|
| Consulta de experiencia | Ficha de experiencia | fecha, personas, nombre, WhatsApp | `inquiries` (type `experience`) + email |
| Corporativo / privado | Privados y empresas | tipo de evento, fecha tentativa, personas, nombre, WhatsApp o email | `inquiries` (type `corporate`) + email con prioridad |
| General | Contacto | motivo, nombre, contacto, mensaje | `inquiries` (type `general`) |
| Lista de espera | Lista de espera / Home en preapertura | nombre, WhatsApp, consentimiento | `inquiries` (type `waitlist`) |

**Antispam:** Turnstile (invisible), honeypot, rate limit (5 envíos por hora por IP hasheada), validación de teléfono argentino.
**Respuesta al usuario:** página `/gracias` con lo que pasa ahora y tiempo de respuesta comprometido **[CONFIRMAR]**.
**Email de confirmación al usuario:** opcional (si deja email), con la marca y los datos de la consulta.
**Email al equipo:** asunto `[Consulta] Golden Hour · 4 personas · sáb 12/12 · IG`, con botón "Abrir WhatsApp" y enlace al panel.

### 1.3 Teléfono
Enlace `tel:+54...` en Contacto, Planificá tu visita y footer. En desktop, se muestra el número escrito (no solo el enlace).

### 1.4 Redes sociales
- Instagram, Facebook, TikTok y YouTube (si existen) en el footer y en Nosotros.
- Links de bio siempre con UTM: `?utm_source=instagram&utm_medium=social&utm_campaign=bio`.
- **Fase 2:** feed de Instagram en la Home **solo** si el contenido sigue el brandbook (curado, no automático). Recomendación: no embeber el feed (pesa, rompe el diseño y depende de una API inestable); mostrar 3–6 fotos elegidas desde el CMS con enlace al perfil.

## 2. Medición del rendimiento

### 2.1 Herramientas
- **GA4** con Consent Mode v2 (banner de cookies propio, sin herramientas pagas).
- **Google Search Console** (propiedad de dominio verificada por DNS).
- **Panel propio** (`inquiries` + `conversion-events`): la fuente de verdad comercial.
- **Fase 2:** Meta Pixel + Conversions API (server-side desde la Server Action y `/go/whatsapp`), Google Ads Enhanced Conversions.

### 2.2 Eventos GA4

| Evento | Cuándo | Parámetros | Conversión clave |
|---|---|---|---|
| `view_item` | Se ve una ficha de experiencia | `item_id`, `item_name`, `price` | — |
| `whatsapp_click` | Click en cualquier botón de WhatsApp | `experience`, `cta_location`, `ref_code` | **Sí** |
| `generate_lead` | Formulario enviado con éxito | `form_type`, `experience`, `pax`, `occasion` | **Sí** |
| `sign_up` | Alta en lista de espera | `method=waitlist` | **Sí** |
| `phone_click` | Click en `tel:` | `cta_location` | **Sí** |
| `social_click` | Click a una red | `network` | — |
| `select_promotion` | Click en un banner de promoción | `promotion_id`, `promotion_name` | — |
| `faq_open` | Se abre una pregunta | `question_id` | — |
| `map_open` / `directions_click` | Interacción con el mapa | — | — |
| `begin_checkout` / `purchase` | **Futuro**, con el motor de reservas | `value`, `currency=ARS`, `items` | **Sí** |

### 2.3 Tablero semanal (brandbook 10.06)
Se revisa los lunes, 15 minutos:
- Conversaciones de WhatsApp iniciadas (por experiencia y canal).
- Consultas por formulario (por tipo y origen).
- Tasa de consulta = (whatsapp_click + generate_lead) / sesiones.
- Reservas confirmadas (estado `confirmed` en el panel) y tasa de cierre por canal.
- Ocupación por salida (dato de operación).
- Top páginas de entrada y búsquedas de Search Console.

Implementación: Looker Studio conectado a GA4 + exportación de `inquiries`. Fase 2: tablero dentro del panel.

## 3. Preparación para reservas (sin construir el sistema)

### 3.1 Qué ya queda listo en el MVP
1. **Modelo de datos** con horarios, tarifas por tipo de pasajero y temporada, IDs externos (`externalProductId`, `externalSlotId`, `externalRateId`) — DATA-MODEL §3.
2. **Modo de reserva** global y por experiencia: `contact` · `external_link` · `widget`.
3. **Componente de CTA único** (`<BookingCta experience={...} />`) que decide qué mostrar según el modo. Cambiar de "Consultar" a "Reservar" es un cambio de configuración, no de diseño.
4. **Interfaz de adaptador** en `src/lib/booking/`:

```ts
export interface BookingProvider {
  id: 'contact' | 'turitop' | 'bokun' | 'fareharbor' | 'custom'
  getCtaHref(experience: Experience, ctx: TrackingContext): string
  getWidgetProps?(experience: Experience): Record<string, unknown>
  getAvailability?(experienceId: string, from: Date, to: Date): Promise<Slot[]>
  verifyWebhook?(req: Request): Promise<BookingEvent | null>
}
```
   En el MVP solo existe el adaptador `contact` (WhatsApp/formulario).
5. **Endpoint de webhook** reservado (`/api/webhooks/booking`) y colección `bookings` documentada.
6. **CSP** con lugar para el dominio del proveedor.
7. **Medición** con los eventos de ecommerce de GA4 ya definidos.

### 3.2 Opciones de motor externo (evaluar en la etapa de reservas)

| Proveedor | Fortalezas para este caso | A validar |
|---|---|---|
| **TuriTop** | Widget con **Mercado Pago integrado**, en español, usado por receptivos en la Patagonia | Costo por reserva o mensual, facturación ARCA, widget en mobile |
| **Bókun** | Conexión con más de 70 OTAs y revendedores (canales de la etapa 2), API completa | Medios de pago en Argentina, costo |
| **FareHarbor** | Usado por operadores premium (ej. RealNZ), muy probado | Disponibilidad y pagos en Argentina |
| **Rezdy / Xola / TrekkSoft** | Alternativas con channel manager | Pagos locales |
| **Desarrollo propio** | Control total | Costo y mantenimiento; solo si los anteriores no cubren ARCA + Mercado Pago |

**Requisitos mínimos del proveedor:** Mercado Pago (pago total o seña), facturación compatible con ARCA, disponibilidad por salida con cupo, tipos de pasajero, códigos de descuento, API o webhooks, widget usable en mobile, exportación de pasajeros (manifiesto para Seguridad Náutica), política de cancelación configurable, botón de arrepentimiento.

**Nota:** en noviembre de 2026 SOYM recibió una propuesta externa de plataforma de venta y operación. Cualquier proveedor que se elija se integra por el mismo adaptador; el sitio no depende de esa decisión.

### 3.3 Cómo se activa la reserva online (sin rehacer el sitio)
1. Elegir proveedor y cargar productos, salidas y tarifas allá.
2. Implementar el adaptador del proveedor en `src/lib/booking/<proveedor>.ts`.
3. Cargar los IDs externos en cada experiencia (panel, rol admin).
4. Cambiar el modo de reserva a `widget` o `external_link` (global o por experiencia).
5. Agregar el dominio del proveedor a la CSP.
6. Configurar el webhook → `bookings` + `purchase` en GA4.
7. Publicar el botón de arrepentimiento y actualizar términos.

## 4. Otras integraciones

| Integración | Etapa | Detalle |
|---|---|---|
| Google Business Profile | MVP (fuera del sitio) | Ficha del punto de embarque; enlace desde el sitio; reseñas. Clave para SEO local. |
| Google Maps | MVP | Mapa embebido con carga diferida + botones "Cómo llegar" (Google Maps, Waze). |
| Resend | MVP | Notificaciones y confirmaciones. |
| Cloudflare Turnstile | MVP | Antispam. |
| Sentry | MVP | Errores. |
| TripAdvisor | Fase 2 | Perfil + widget de reseñas (si mantiene el rendimiento) o reseñas cargadas a mano con fuente. |
| Meta Pixel + CAPI | Fase 2 | Con la primera pauta. |
| WhatsApp Cloud API | Fase 2 | Ver §1.1. |
| Email marketing (Brevo / Mailchimp) | Fase 2 | Base propia de clientes y lista de espera, con consentimiento. |
| Gift cards | Fase 2 | Vía el motor de reservas o con códigos únicos + Mercado Pago. |
| Pronóstico del tiempo / viento | Fase 3 | Aviso automático de condiciones (ej. API de Open-Meteo) para sugerir el aviso operativo. |
| Revendedores y OTAs | Fase 3 | Vía channel manager del motor de reservas. |
