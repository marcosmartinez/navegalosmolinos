# CMS-SPECIFICATION — Panel de administración

> Objetivo: que una persona de Marketing opere el sitio **sin depender de desarrolladores**, sin poder romper el sistema de diseño y sin acceso a lo que puede dañar el sitio (código, integraciones, usuarios).

---

## 1. Alternativas evaluadas

| Criterio | **Payload 3** (en Next.js) | Sanity | Strapi 5 | Directus | WordPress headless | Panel propio |
|---|---|---|---|---|---|---|
| Dónde vive | Dentro de la app Next.js, misma base y mismo deploy | SaaS (contenido en su nube) | Servidor Node aparte | Servidor aparte | Servidor PHP aparte | Dentro de la app |
| Costo recurrente | **USD 0** de licencia (MIT); solo hosting y base | Gratis hasta ciertos límites; planes pagos por usuario (verificar precio vigente) | USD 0 self-hosted; servidor aparte | USD 0 self-hosted (con condiciones de licencia por facturación); servidor aparte | USD 0; hosting PHP aparte | USD 0 de licencia; **alto costo de desarrollo** |
| Facilidad para Marketing | Alta (admin limpio, vista previa en vivo, borradores, programación) | Muy alta (Studio) | Alta | Media (más "base de datos") | Alta (conocido) pero el editor de bloques no respeta el sistema de diseño | Depende de lo que se construya |
| Tipado y DX con Claude Code | **Excelente**: configuración en TypeScript, tipos generados | Buena (GROQ, tipos generados) | Buena | Media | Baja | Excelente pero todo a mano |
| Formularios y consultas | Colecciones propias con acceso por rol, exportación | Posible, pero no es su foco | Posible | Posible | Plugins | A construir |
| Control de acceso por rol y por campo | **Nativo y granular** | Por plan | Nativo | Nativo | Roles fijos | A construir |
| Seguridad | Superficie única, sin servidor extra; auth propia con bloqueo por intentos | Gestionada por el proveedor | Servidor extra a mantener | Servidor extra | Superficie de ataque conocida y amplia | Toda la responsabilidad propia |
| Mantenimiento | Bajo: se actualiza con la app | Muy bajo | Medio (dos apps) | Medio (dos apps) | Alto (plugins, PHP) | Alto |
| Escalabilidad hacia reservas | Alta: endpoints, hooks y webhooks en la misma app | Media (lógica afuera) | Alta | Alta | Baja | Alta |
| Lock-in | Bajo (Postgres propio, código propio) | Medio (contenido en su plataforma) | Bajo | Bajo | Bajo | Nulo |

**Contexto 2026.** Figma compró Payload y Payload Cloud dejó de aceptar nuevas cuentas. El proyecto sigue siendo open source (MIT) con releases frecuentes (3.8x–3.9x en 2026) y soporte de Next.js 16. **Como no dependemos de Payload Cloud (hosteamos en Vercel con Postgres propio), la adquisición no nos afecta**, pero hay que seguir el roadmap del proyecto.

### Recomendación: **Payload 3**, embebido en la app Next.js

1. **Un solo proyecto, un solo deploy, una sola base.** Menos piezas que mantener y que asegurar.
2. **Costo de licencia cero** y sin cobro por usuario.
3. **El modelo de datos es código** (TypeScript): versionado en git, revisable, y es justamente lo que Claude Code maneja mejor.
4. **Acceso por rol y por campo nativo:** Marketing edita textos, precios y promociones, pero no ve integraciones ni usuarios.
5. **Bloques con variantes cerradas:** Marketing arma páginas con piezas del sistema de diseño, sin poder cambiar colores ni tipografías.
6. **Preparado para reservas:** hooks, endpoints y webhooks conviven con el contenido.

**Riesgo y mitigación.** Si en el futuro Payload perdiera soporte, los datos están en Postgres estándar y el frontend consume una capa de acceso propia (`src/lib/cms/`), así que reemplazar el CMS no obliga a rehacer el sitio.

---

## 2. Usuarios y permisos

| Capacidad | **Administrador** | **Marketing / Editor** |
|---|---|---|
| Crear, editar, publicar páginas | ✔ | ✔ |
| Editar textos, imágenes, galerías | ✔ | ✔ |
| Experiencias: crear, editar, activar/desactivar | ✔ | ✔ |
| Precios y horarios | ✔ | ✔ |
| Categorías | ✔ | ✔ |
| Promociones y banners | ✔ | ✔ |
| Ver, gestionar y exportar consultas | ✔ | ✔ |
| Eliminar consultas | ✔ | — |
| Información institucional y de contacto | ✔ | ✔ |
| Redes sociales, SEO básico | ✔ | ✔ |
| **Modo del sitio** (preapertura / consultas / reservas) | ✔ | — (lo ve, no lo edita) |
| **Integraciones** (WhatsApp, Analytics, motor de reservas, claves) | ✔ | — |
| Redirecciones | ✔ | ✔ |
| Usuarios y roles | ✔ | — |
| Eliminar experiencias o páginas | ✔ | — (puede desactivar) |

Implementación: campo `role` en la colección `users` y funciones de acceso en `src/access/`. Ver DATA-MODEL.md.

**Seguridad de acceso:** contraseña mínima de 12 caracteres, bloqueo tras 5 intentos fallidos (10 minutos), sesión de 8 horas, cookies `HttpOnly` y `Secure`, panel solo por HTTPS. Segundo factor: evaluar plugin o SSO de Google Workspace en fase 2.

---

## 3. Módulos del panel

El panel se organiza en grupos, en este orden (lo que más se usa, arriba):

```
Consultas
  ├─ Consultas
  └─ Lista de espera (vista filtrada)
Contenido
  ├─ Experiencias
  ├─ Páginas
  ├─ Preguntas frecuentes
  └─ Testimonios
Comercial
  ├─ Promociones
  ├─ Banners
  ├─ Temporadas
  └─ Categorías
Medios
  ├─ Imágenes y videos
  └─ Galerías
Configuración
  ├─ Información general (global)
  ├─ Navegación (global)
  ├─ Aviso operativo (global)
  ├─ Integraciones (global, solo admin)
  └─ Redirecciones
Sistema
  └─ Usuarios (solo admin)
```

### 3.1 Gestión de contenidos

**Páginas** (`pages`). Título, slug, estado (borrador/publicado), y un **constructor de bloques** con piezas del sistema de diseño:

| Bloque | Campos editables | Variantes permitidas |
|---|---|---|
| Hero | label, título, bajada, media (imagen/video + recorte mobile), CTA principal y secundario | video · imagen · split · sólido |
| Texto editorial | label, título, cuerpo (rich text acotado) | fondo claro · Piedra · Verde Lago |
| Insight / cita | cita, autor | — |
| Grilla de experiencias | selección manual o "todas las activas", cantidad | 3 · 4 columnas |
| Línea de tiempo | pasos (título, texto, hora relativa) | — |
| Pilares / datos | ítems (ícono de la lista de marca, título, texto) | 3 · 4 ítems |
| Ficha del barco | datos clave, foto | — |
| Galería | relación a galería | grilla · carrusel |
| Testimonios | selección | — |
| FAQ | selección de preguntas o categoría | — |
| Banner de promoción | relación a promoción | — |
| Formulario | tipo (general, experiencia, corporativo, lista de espera) | — |
| Mapa / ubicación | usa la ubicación de Información general | — |
| Cierre con CTA | título, foto, CTA | — |

Reglas: no hay campos de color, tipografía ni tamaño libres; el rich text solo permite negrita (Montserrat Medium), enlaces, listas y H2/H3. **Vista previa en vivo** antes de publicar. **Versiones** con historial y restauración. **Publicación programada** (fecha y hora).

**Información institucional:** vive en la página "Nosotros" (bloques) y en el global "Información general".

**Galerías** (`galleries`): nombre, imágenes ordenables (arrastrar), portada. Se reutilizan en páginas y experiencias.

**Medios** (`media`): carga de imágenes y videos con **texto alternativo obligatorio**, punto focal (para recortes), crédito, registro fotográfico (paisaje, experiencia, detalle) y etiquetas. Las imágenes se optimizan automáticamente (WebP/AVIF, varios tamaños). Límite de video: 20 MB. Aviso si una imagen pesa más de 8 MB o mide menos de 1600 px.

### 3.2 Banners y promociones

**Promociones** (`promotions`):
- Título interno y título público, texto, imagen, CTA (texto + destino), código (ej. `APERTURA15`).
- Tipo de beneficio: porcentaje, monto fijo, 2x1, beneficio no monetario (texto libre).
- Experiencias alcanzadas (relación múltiple) o "todas".
- **Fecha y hora de inicio y fin** (zona horaria America/Argentina/Cordoba).
- Activa sí/no (interruptor manual además de las fechas).
- **Destacar en Home** sí/no y prioridad.
- Landing propia sí/no (`/promociones/[slug]`).
- Condiciones (texto legal breve).
- Estado calculado y visible en la lista: *Programada · Vigente · Vencida · Pausada*.

**Banners** (`banners`): piezas visuales para ubicaciones fijas.
- Ubicación: barra superior global, Home bajo el hero, ficha de experiencia, listado de experiencias.
- Contenido: texto, imagen opcional, CTA, relación opcional a una promoción.
- Fechas de inicio y fin, activo, prioridad (si dos coinciden, gana la mayor).
- Estilo: solo variantes de marca (Piedra / Verde Lago).

### 3.3 Productos y experiencias

**Experiencias** (`experiences`), organizadas en pestañas:

| Pestaña | Campos |
|---|---|
| **General** | nombre, slug, estado (activa · próximamente · pausada · archivada), categorías, ocasiones (pareja, amigos, familia, grupos, empresas), momento del día, orden, destacada |
| **Contenido** | bajada sensorial, descripción, "Cómo es la salida" (pasos), "Qué incluye" (lista), extras opcionales (nombre + precio), ideal para, información importante |
| **Medios** | imagen principal (con recorte mobile), video opcional, galería |
| **Operación** | duración (min), punto de embarque, capacidad por salida, mínimo de personas, edad mínima, accesibilidad, política de clima (relación a texto común) |
| **Horarios** | salidas: días de la semana, hora, temporada, notas; texto de disponibilidad manual ("Quedan 8 lugares el sábado") con vencimiento |
| **Precios** | tarifas: tipo de pasajero (adulto, menor, jubilado, residente), temporada, monto en ARS, "precio desde" sí/no; texto alternativo cuando no hay precio publicado ("Consultá el precio"); fecha de vigencia del precio |
| **Conversión** | mensaje precargado de WhatsApp, código de referencia (ej. `GH`), CTA personalizado, **modo de reserva** (heredar · consulta · link externo · widget), datos del proveedor de reservas (solo admin) |
| **FAQ** | preguntas propias y relación a preguntas globales |
| **SEO** | título, descripción, imagen para compartir, no indexar |

Activar o desactivar es un solo campo (`estado`). Las experiencias pausadas desaparecen del sitio pero no se borran; sus URLs redirigen a `/experiencias`.

**Categorías** (`categories`): nombre, slug, descripción, orden. Ejemplos: Navegaciones, Gastronómicas, Privadas.

**Temporadas** (`seasons`): nombre (Alta, Baja, Fines de semana largos…), fechas desde/hasta. Los precios y horarios se asocian a temporadas; el sitio muestra el que corresponde a la fecha actual.

### 3.4 Contactos y consultas

**Consultas** (`inquiries`). Se crean solas desde los formularios del sitio; Marketing las gestiona:

- **Datos de contacto:** nombre, WhatsApp/teléfono, email.
- **Datos de la consulta:** tipo (experiencia, corporativo, general, lista de espera, regalo), experiencia, fecha deseada, personas, ocasión, mensaje.
- **Origen (solo lectura):** página de origen, ubicación del CTA, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, referrer, `gclid`, `fbclid`, código de promoción, dispositivo, fecha y hora.
- **Gestión:** estado (*Nueva · En curso · Propuesta enviada · Confirmada · Perdida · Spam*), responsable, notas internas, valor estimado.
- **Consentimiento:** acepta comunicaciones sí/no, versión de la política aceptada.

Vistas: lista con filtros por estado, tipo, experiencia, fecha y origen; búsqueda por nombre/teléfono; botón **Abrir WhatsApp** que abre el chat con el número de la consulta. **Exportación a CSV** de la vista filtrada (por ejemplo, la lista de espera para difusión). Notificación por email al equipo con cada consulta nueva (destinatarios configurables por tipo).

**Clics de conversión** (`conversion-events`): registro de solo lectura de los clics a WhatsApp que pasan por `/go/whatsapp`, con experiencia, CTA, página, UTM y código de referencia. Sirve para ver en el panel cuántas conversaciones se iniciaron por canal, aunque el contenido del chat no se pueda rastrear.

**Tablero simple** (pantalla inicial del panel): consultas de los últimos 7 y 30 días por tipo y por origen, clics a WhatsApp por experiencia, promociones vigentes y próximas a vencer.

### 3.5 Configuración general

**Información general** (global `site-settings`):
- Nombre comercial, endoso ("Una experiencia de SOYM S.A."), razón social, CUIT, domicilio legal.
- Contacto: WhatsApp principal (formato internacional), teléfono, email comercial, horario de atención.
- Ubicación: nombre del punto de embarque, dirección, coordenadas, link a Google Maps, indicaciones.
- Información comercial: credenciales (habilitación náutica, matrícula, seguros), medios de pago aceptados, política de seña (texto corto).
- Redes sociales: Instagram, Facebook, TikTok, YouTube, TripAdvisor, Google Business.
- **SEO básico:** título por defecto, plantilla de títulos ("%s · Espíritu del Lago"), descripción por defecto, imagen para compartir por defecto, verificación de Search Console.

**Navegación** (global `navigation`): ítems del menú principal y del footer (etiqueta + destino), CTA del header.

**Aviso operativo** (global `announcement`): texto, enlace opcional, activo, vence el (fecha y hora).

**Integraciones** (global `integrations`, **solo admin**): modo del sitio (preapertura / consultas / reservas), ID de GA4, ID de Meta Pixel, proveedor de reservas y credenciales públicas, destinatarios de notificaciones, número de WhatsApp de cada área. Las claves secretas **no** se cargan en el CMS: van en variables de entorno.

**Redirecciones** (`redirects`): origen, destino, tipo (301/302). Plugin oficial.

---

## 4. Flujo editorial

1. Toda edición se guarda como **borrador**.
2. **Vista previa** del borrador en el sitio real (modo draft de Next.js).
3. **Publicar** ahora o **programar**.
4. Al publicar, el sitio se revalida en segundos (revalidación por tags, sin redeploy).
5. Historial de versiones: se puede comparar y restaurar.

## 5. Validaciones que protegen el sitio

- Texto alternativo obligatorio en imágenes.
- Título SEO ≤ 60 caracteres y descripción ≤ 160, con contador.
- Una experiencia "activa" exige: imagen principal, duración, al menos una salida y precio o texto alternativo de precio.
- Una promoción no puede tener fecha de fin anterior a la de inicio.
- No se puede borrar una experiencia con consultas asociadas (se archiva).
- Slugs únicos, en minúsculas y sin tildes (generados automáticamente desde el nombre).
- Aviso si se publica una experiencia marcada como nocturna (campo de horario después de la puesta del sol): la operación comercial es solo diurna.

## 6. Capacitación y soporte

- Guía de uso del panel en `docs/GUIA-MARKETING.md` (a escribir en la etapa de entrega, con capturas).
- Sesión de capacitación de 1 hora con la persona de Marketing.
- Usuario de prueba en el entorno de preview para practicar.

## 7. Evolución del CMS (resumen; detalle en ROADMAP.md)

- **Fase 2:** gift cards, galería pública, guía/blog, testimonios con moderación, segundo idioma, integración con WhatsApp Business (inbox), recordatorios automáticos.
- **Fase 3:** sincronización con el motor de reservas (disponibilidad y precios en vivo), reportes de ocupación, CRM.
