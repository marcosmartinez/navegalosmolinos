# SITEMAP — Arquitectura del sitio

> Idioma del MVP: español (Argentina). Arquitectura lista para sumar `/en` y `/pt` en fase 2 (ver TECHNICAL-ARCHITECTURE.md §8).
> Las URLs van en español, en minúsculas, con guiones y sin tildes.

## 1. Evaluación de las páginas propuestas

| Página propuesta | Decisión | Por qué |
|---|---|---|
| Home | **Sí** | Puerta de entrada de Instagram y de búsquedas de marca. |
| Quiénes somos | **Sí → `/nosotros`** | Incluye historia, barco, equipo y compromiso ambiental: en un producto nuevo, la confianza se construye acá. |
| Experiencias y actividades | **Sí → `/experiencias`** | Listado con comparación rápida. |
| Detalle de cada experiencia | **Sí → `/experiencias/[slug]`** | Es la página que más convierte (RESEARCH §4.2). |
| Tarifas y precios | **No como página aparte** | El precio vive en cada ficha, junto a "qué incluye" (regla del brandbook). `/experiencias` tiene una tabla comparativa. `/tarifas` redirige ahí. |
| Promociones y paquetes | **No como sección fija** | Las promociones son temporales: aparecen como banners en Home y en fichas, y pueden tener una landing propia para campañas (`/promociones/[slug]`). Una página "Promociones" vacía durante media temporada daña la marca. |
| Galería de fotos y videos | **Fase 2** | Sin sesión de fotos real no hay material para una galería. En el MVP las fotos viven dentro de cada página. Se activa cuando haya 60+ fotos de marca. |
| Preguntas frecuentes | **Sí → `/preguntas-frecuentes`** | Responde las dudas del brandbook (01.08). Alimenta datos estructurados FAQ. |
| Ubicación y cómo llegar | **Sí → `/planifica-tu-visita`** | Hub de logística: ubicación, cómo llegar, qué llevar, clima, seguridad y accesibilidad. |
| Contacto | **Sí → `/contacto`** | Formulario general + canales + mapa. |
| Legales | **Sí → `/legales/*`** | Términos, condiciones de navegación, privacidad y cookies. |
| *(nueva)* Privados y empresas | **Sí → `/privados-y-empresas`** | Segmento con ticket alto, formulario propio (CGN, Pursuit). |
| *(nueva)* El lago | **Sí → `/el-lago`** | El destino es el argumento. Contenido evergreen para SEO. |
| *(nueva)* Lista de espera | **Sí → `/lista-de-espera`** | Modo preapertura (STRATEGY §6). |
| *(nueva)* Regalá una salida | **Fase 2 → `/regalos`** | Gift cards (Consolidación del brandbook). |
| *(nueva)* Novedades / Guía del lago | **Fase 2 → `/guia`** | Contenido educativo para SEO (pilar "Educativo" 15 %). |
| *(nueva)* Prensa | **Fase 2 → `/prensa`** | Kit de prensa y notas. |

## 2. Árbol del sitio

```
navegalosmolinos.com
│
├── /                                   Home
├── /experiencias                       Listado + tabla comparativa
│   └── /experiencias/[slug]            Ficha (golden-hour, brunch-en-el-lago, wine-cruise, ...)
├── /privados-y-empresas                Barco cerrado, celebraciones, corporate
├── /el-lago                            Lago Los Molinos, Valle de Calamuchita, Tres Bahías
├── /planifica-tu-visita                Ubicación, cómo llegar, horarios, qué llevar, clima, seguridad, accesibilidad
├── /nosotros                           Historia, barco, equipo, compromiso ambiental
├── /preguntas-frecuentes               FAQ por categoría
├── /contacto                           Formulario general + canales
├── /lista-de-espera                    Solo visible en modo preapertura
├── /promociones/[slug]                 Landing de campaña (opcional, por promoción)
├── /gracias                            Confirmación de formularios (medición)
├── /legales
│   ├── /legales/terminos-y-condiciones
│   ├── /legales/condiciones-de-navegacion   Seña, cancelación, clima, seguridad a bordo
│   ├── /legales/privacidad
│   └── /legales/cookies
│
├── (fase 2) /regalos · /galeria · /guia · /guia/[slug] · /prensa · /en/* · /pt/*
│
├── /admin                              Panel de administración (Payload, privado)
├── /api/*                              API del CMS y endpoints propios
├── /go/whatsapp                        Redirección medida a WhatsApp
├── /sitemap.xml · /robots.txt · /manifest.webmanifest
└── Redirecciones: /tarifas → /experiencias · /reservas → /experiencias · /promociones → /experiencias
```

## 3. Experiencias iniciales (contenido del brandbook, ajustado a la ley)

| Slug | Nombre | Estado en el sitio | Nota |
|---|---|---|---|
| `golden-hour` | Golden Hour | Activa | Tiene que terminar antes de la puesta del sol (Ley 11.005 art. 27). Horario **[CONFIRMAR]**. |
| `brunch-en-el-lago` | Brunch en el lago | Activa | Domingos (brandbook). **[CONFIRMAR]** |
| `wine-cruise` | Wine Cruise | Activa si se confirma en horario diurno | **[CONFIRMAR]** |
| `navegacion-clasica` | Nombre a definir (salida regular de 90 min) | Activa | El plan de negocios tiene "regular invierno/verano": falta nombre de marca. **[CONFIRMAR]** |
| `privado` | Barco privado | Vive en `/privados-y-empresas` | — |
| `corporate` | Empresas | Vive en `/privados-y-empresas` | — |
| `desembarco-tres-bahias` | Desembarco en Tres Bahías | "Próximamente" | Depende de la autorización de APRHI. |
| `noche-de-estrellas` | Noche de estrellas | **No se publica** | Navegación nocturna comercial prohibida. |

---

## 4. Página por página

Formato: **Objetivo · Secciones · Contenido · Visuales · CTA · Relaciones**.

### 4.1 Home `/`

**Objetivo.** Transmitir la perspectiva en tres segundos y llevar a una experiencia o a WhatsApp.

| # | Sección | Contenido | Visual |
|---|---|---|---|
| 1 | Hero | Label "LAGO LOS MOLINOS · VALLE DE CALAMUCHITA" · H1 *El lago desde adentro.* · bajada de una línea · CTA principal · CTA secundario "Ver experiencias" | Video corto en loop (o foto) desde la proa, horizonte bajo, degradé inferior Verde Profundo |
| 2 | Banner de promoción (condicional) | Promoción destacada vigente, con fecha | Franja sobre Piedra (las promos nunca van sobre foto, brandbook 10.05) |
| 3 | Insight | *Miles de personas visitan el lago. Muy pocas lo navegan.* + párrafo de brand story | Tipográfico sobre Lino, ola en Oro |
| 4 | Experiencias | 3–4 tarjetas: foto, nombre, momento del día, duración, precio "desde" | Fotos 4:5 |
| 5 | Cómo es una salida | 4–5 pasos (embarque, zarpada, motor apagado en el medio del lago, gastronomía, regreso) | Línea de tiempo horizontal (desktop) / vertical (mobile) |
| 6 | Por qué es distinto | 3 pilares: Perspectiva · Hospitalidad · Naturaleza cuidada | Íconos lineales, sin decoración |
| 7 | El barco | Ficha corta: 19 m, aluminio naval, dos cubiertas, bar y baños, capacidad comercial | Foto real (astillero o a bordo) + 4 datos en Cormorant |
| 8 | Privados y empresas | Bloque teaser | Foto de mesa o grupo + CTA "Cerrar el barco para tu grupo" |
| 9 | Prueba social | Reseñas (cuando existan) o alianzas | Cita en Cormorant Italic |
| 10 | Planificá tu visita | Dónde estamos, cómo llegar, mapa estático | Mapa ilustrado con paleta de marca |
| 11 | Cierre | *Vení a ver Calamuchita desde donde nadie la mira.* + CTA | Foto a sangre, overlay Verde 40 % |

**CTA.** Principal: Reservá por WhatsApp (o "Enterate primero" en preapertura). Secundario: Ver experiencias.
**Relaciones.** → Experiencias, Ficha, Privados, Planificá tu visita, Nosotros.
**Modo preapertura.** Se reduce a las secciones 1, 3, 7 (barco en construcción, con fotos del astillero), 10 y lista de espera.

### 4.2 Experiencias `/experiencias`

**Objetivo.** Elegir la experiencia correcta en menos de un minuto.

| # | Sección | Contenido |
|---|---|---|
| 1 | Encabezado | H1 "Experiencias en el Lago Los Molinos" · bajada · filtros por ocasión (Pareja, Amigos, Familia, Grupos) y por momento (Mañana, Tarde) |
| 2 | Grilla de experiencias | Tarjeta por experiencia: foto 4:5, chip de momento, nombre, una línea, duración, precio "desde", CTA "Ver salida" |
| 3 | Tabla comparativa | Filas: duración, horario, qué incluye, ideal para, precio desde. Columnas: experiencias activas. En mobile: tarjetas apiladas |
| 4 | Próximamente | Experiencias con estado "próximamente" (Tres Bahías) con "Avisame" |
| 5 | Privados y empresas | Teaser |
| 6 | FAQ breve | 4–5 preguntas de precio, clima y reserva |

**CTA.** Ver salida (por tarjeta) · Reservá por WhatsApp (global).
**Relaciones.** → Ficha, Privados, FAQ.

### 4.3 Ficha de experiencia `/experiencias/[slug]`

**Objetivo.** Convertir: que la persona consulte o reserve.

| # | Sección | Contenido | Notas |
|---|---|---|---|
| 1 | Hero | Label (momento · duración) · H1 nombre · bajada sensorial · precio "desde" en Cormorant · CTA | Foto o video de la experiencia |
| 2 | Resumen | Duración · Horario de salida · Días · Capacidad · Punto de embarque · Política de clima (enlace) | Lista con íconos (reloj, calendario, grupo, pin, sol) |
| 3 | Qué incluye | Gastronomía, bebida, música, extras opcionales con precio | Cajas con marco fino Oro |
| 4 | Cómo es la salida | Itinerario paso a paso con horario relativo | Línea de tiempo |
| 5 | Galería | 3–6 fotos de la experiencia | Sin collages de más de 3 (brandbook 06.04) |
| 6 | Ideal para | Ocasiones (chips) + cita | — |
| 7 | Formulario de consulta | Fecha, personas, ocasión, nombre, WhatsApp/teléfono, email (opcional), mensaje (opcional) | Prellenado con la experiencia |
| 8 | Información importante | Qué llevar, accesibilidad, menores, dietas, cancelación | Acordeón |
| 9 | FAQ de la experiencia | Preguntas específicas + globales relacionadas | Acordeón con datos estructurados |
| 10 | Otras experiencias | 2–3 tarjetas | — |

**Mobile.** Barra fija inferior: "Desde $X por persona · [Consultar]". Anclas internas como pestañas: Resumen · Incluye · Salida · Info · Consultar.
**CTA.** Reservá por WhatsApp (principal) · Consultar disponibilidad (formulario) · Reservar (cuando el modo sea `reservas`).
**Relaciones.** → Planificá tu visita, Condiciones de navegación, FAQ, Privados.

### 4.4 Privados y empresas `/privados-y-empresas`

**Objetivo.** Generar consultas de alto valor (barco cerrado, celebraciones, corporate).

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | *Cerrar el barco para tu grupo.* · bajada · CTA "Pedí tu propuesta" |
| 2 | Para quién | Celebraciones (cumpleaños, aniversarios, propuestas), grupos de amigos, empresas (retiros, cierres de año, clientes) |
| 3 | Qué se puede personalizar | Horario (diurno), gastronomía, bebidas, música, ambientación, fotografía |
| 4 | Capacidad y formatos | Mínimo y máximo de personas, duración, distribución a bordo |
| 5 | Cómo funciona | Consulta → propuesta → seña → confirmación → día de la salida |
| 6 | Formulario corporativo | Tipo de evento, fecha tentativa, personas, empresa (opcional), presupuesto (opcional), necesidades, contacto |
| 7 | Casos o testimonios | Cuando existan |

**CTA.** Pedí tu propuesta (formulario) · WhatsApp comercial.
**Relaciones.** → Experiencias, Nosotros (el barco), Planificá tu visita.

### 4.5 El lago `/el-lago`

**Objetivo.** Vender el destino y posicionar en búsquedas del lago y del valle.

Secciones: hero panorámico · el embalse (historia, superficie, entorno serrano) **[CONFIRMAR datos]** · el lago visto desde adentro · Tres Bahías y la reserva (estado "próximamente" si no está habilitado) · las cuatro estaciones del lago · cuidado del lago · CTA a Experiencias.
**Visuales.** Fotos de paisaje con horizonte bajo, mapa ilustrado del embalse con el punto de embarque y la zona de navegación.
**Relaciones.** → Experiencias, Planificá tu visita, Nosotros (compromiso ambiental).

### 4.6 Planificá tu visita `/planifica-tu-visita`

**Objetivo.** Eliminar la incertidumbre logística (turista de otra provincia, familias, jubilados).

| # | Sección | Contenido |
|---|---|---|
| 1 | Dónde estamos | Dirección del embarque, mapa embebido (con carga diferida), botones "Cómo llegar" (Google Maps, Waze) |
| 2 | Cómo llegar | Desde Córdoba Capital, Villa General Belgrano, Santa Rosa de Calamuchita, Potrero de Garay, Los Reartes. Tiempos y rutas **[CONFIRMAR]** |
| 3 | Cuándo llegar | Check-in X minutos antes, estacionamiento |
| 4 | Qué llevar | Abrigo, protector solar, calzado, documentos |
| 5 | Clima | Qué pasa si llueve o hay viento: reprogramación o devolución (enlace a condiciones) |
| 6 | Seguridad a bordo | Chalecos para todos, tripulación habilitada, capacidad, menores |
| 7 | Accesibilidad | Embarque, movilidad reducida, baños |
| 8 | Dónde dormir / comer (fase 2) | Alojamientos aliados |

**CTA.** Llamar · WhatsApp · Ver experiencias.
**Relaciones.** → FAQ, Condiciones de navegación, Experiencias.

### 4.7 Nosotros `/nosotros`

**Objetivo.** Confianza: quién está detrás, qué barco, qué compromisos.

Secciones: brand story (*Abrir el lago*) · propósito, misión y visión (versión corta) · el catamarán (ET-228: datos, construcción en Tecnao SRL, fotos de obra) · el equipo de a bordo · compromiso ambiental (cero vertidos, casco sin antifouling, combustible en tierra, plan de gestión ambiental) · habilitaciones y seguros · aliados (Club Náutico Calamuchita, Comuna) · endoso SOYM S.A.
**CTA.** Ver experiencias.
**Relaciones.** → El lago, Experiencias, Prensa (fase 2).

### 4.8 Preguntas frecuentes `/preguntas-frecuentes`

**Objetivo.** Responder antes de que pregunten y ganar resultados enriquecidos en Google.
Categorías: Reservas y pagos · Clima y cancelaciones · A bordo (gastronomía, bebidas, música, baños) · Seguridad · Chicos y mascotas · Accesibilidad · Cómo llegar · Privados y empresas.
Buscador simple + acordeones + "¿No encontraste tu respuesta?" → WhatsApp.

### 4.9 Contacto `/contacto`

Canales (WhatsApp, teléfono, email, redes), horario de atención, formulario general (motivo, nombre, contacto, mensaje), mapa y dirección, datos comerciales de SOYM S.A.

### 4.10 Lista de espera `/lista-de-espera`

Solo en modo preapertura. Titular *Algo está llegando al lago.*, formulario mínimo (nombre, WhatsApp, email opcional, interés), consentimiento de comunicaciones, confirmación. En los demás modos redirige a `/experiencias`.

### 4.11 Landing de promoción `/promociones/[slug]`

Opcional por promoción. Hero de la campaña, condiciones, vigencia, experiencias alcanzadas, CTA con código. Al vencer, redirige a la experiencia o a `/experiencias` (lo resuelve el sistema).

### 4.12 Gracias `/gracias`

Confirmación con lo que pasa ahora ("Te escribimos por WhatsApp en menos de X horas"), enlace a Planificá tu visita y redes. Permite medir conversiones como página de destino.

### 4.13 Legales `/legales/*`

- **Términos y condiciones** del sitio.
- **Condiciones de navegación**: seña, pagos, cancelación, reprogramación por clima, menores, conducta a bordo, objetos perdidos.
- **Privacidad**: Ley 25.326 de protección de datos personales; finalidad, responsable (SOYM S.A.), derechos de acceso, rectificación y supresión.
- **Cookies**: categorías, consentimiento.
- **Botón de arrepentimiento** (Res. SCI 424/2020): obligatorio cuando haya venta online; se deja previsto.
Textos a redactar por el estudio jurídico de SOYM. **[CONFIRMAR]**

### 4.14 Página 404

Titular *Esta orilla no existe.*, enlaces a Home y Experiencias, WhatsApp.

---

## 5. Relaciones entre páginas

```
                 ┌──────────────── Home ────────────────┐
                 │            │             │           │
          Experiencias   Privados y    El lago     Planificá tu visita
                 │        empresas        │           │
           Ficha [slug] ◄─────┼───────────┘           │
            │    │            │                       │
            │    └──── FAQ ◄──┴───────────────────────┘
            │           │
            ▼           ▼
   WhatsApp · Formulario · Teléfono  ──►  /gracias
            │
   (futuro) Motor de reservas externo
```

## 6. Componentes globales

- Header (cambia de transparente sobre hero a sólido Lino al hacer scroll).
- Footer.
- Botón flotante de WhatsApp (mobile, fuera de las fichas).
- Barra de acción fija (fichas, mobile).
- Banner de promoción global (opcional, programado).
- Aviso de cookies.
- Aviso operativo (ej. "Hoy no hay salidas por viento"), editable desde el CMS, con vencimiento.
