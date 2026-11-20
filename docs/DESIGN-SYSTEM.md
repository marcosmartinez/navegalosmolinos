# DESIGN-SYSTEM — Sistema de diseño web

> **Fuente de verdad:** brandbook de Espíritu del Lago en Figma — https://www.figma.com/design/Ct99yTgciSUepI2j8MbNlI/SOYM (páginas 03 Logo, 04 Color, 05 Typography, 06 Design System, 07 Fotografía, 12 Components).
> Este documento **traduce** el brandbook a la web; no lo reemplaza. Si hay conflicto, gana el brandbook.
> Lo que el brandbook marca como **Propuesta** (tipografías, paleta extendida, logo horizontal) se usa igual, pero queda señalado.
> Tokens en código: `src/styles/tokens.css` (bloque `@theme` de Tailwind CSS v4).

---

## 1. Principios (del brandbook 06.05, aplicados a web)

1. **Horizonte bajo, mucho cielo.** En heros, la imagen ocupa el 60–70 % superior; el texto vive abajo, apoyado en el borde.
2. **Un solo protagonista por pantalla.** Una foto, un título, un dato, un CTA.
3. **Serif grande, sans chica.** Contraste de escala entre Cormorant Garamond y Montserrat. Sin tamaños intermedios que lo diluyan.
4. **Oro como puntuación.** Un uso de Oro por pantalla: la ola, la regla, el precio o el isotipo. Nunca dos.
5. **Verde de noche, piedra de día.** Secciones institucionales, de cierre y de atardecer sobre Verde Lago; el resto sobre Blanco/Piedra.
6. **Aire antes que información.** Si no entra, se saca: la información completa vive en la ficha y en WhatsApp.
7. **Esquinas rectas, trazos finos, sin sombras.** La profundidad la da el color de fondo.

## 2. Color

### 2.1 Paleta primaria (identidad final)

| Token | Nombre | HEX | Uso en web |
|---|---|---|---|
| `--color-verde-lago` | Verde Lago | `#2F5250` | Color madre. Botón primario, secciones institucionales, footer, menú mobile. |
| `--color-oro-sierra` | Oro Sierra | `#CFA368` | Acento: isotipo, ola, regla de 2 px, precio destacado. **Nunca texto sobre claro.** |
| `--color-piedra` | Piedra | `#EFEFEA` | Superficies: bandas, cajas, promociones. |
| `--color-grafito` | Grafito | `#404040` | Texto principal sobre claro. |
| `--color-lino` | Lino | `#FFFFFF` | Tarjetas y campos sobre Piedra; texto sobre Verde Lago. |

### 2.2 Paleta extendida (Propuesta del brandbook)

| Token | Nombre | HEX | Uso en web |
|---|---|---|---|
| `--color-verde-profundo` | Verde Profundo | `#1F3937` | Hover del primario, degradés sobre foto, menú abierto. |
| `--color-verde-bruma` | Verde Bruma | `#7A9A96` | Bordes y líneas sobre verde, íconos sobre verde, mapas. **No como texto sobre verde.** |
| `--color-verde-niebla` | Verde Niebla | `#DCE5E2` | Fondos de tarjetas y chips, resaltados suaves. |
| `--color-oro-claro` | Oro Claro | `#E6CFA9` | Labels y textos de acento sobre Verde Lago. |
| `--color-oro-oscuro` | Oro Oscuro | `#A8804A` | Hover de oro, avisos y errores. |
| `--color-blanco` | Blanco | `#F8F7F3` | **Fondo por defecto de la web** ("fondo de documentos largos y web"). |
| `--color-gris-piedra` | Gris Piedra | `#8C8C88` | Texto secundario, captions, metadatos (≥ 14 px). |
| `--color-gris-niebla` | Gris Niebla | `#D8D8D3` | Divisores y bordes de 1 px. |

### 2.3 Proporción en pantalla (brandbook 04.03)
Fondos claros (Blanco/Lino) ≈ 55 % · Piedra ≈ 20 % · Verde Lago ≈ 15 % · Oro ≈ 5 % · Grafito ≈ 5 %.

### 2.4 Combinaciones permitidas (AA o superior, brandbook 04.04)

| Texto / Fondo | Contraste | Uso |
|---|---|---|
| Grafito / Piedra | 9,6:1 | Texto corrido |
| Lino / Verde Lago | 8,4:1 | Texto sobre secciones verdes |
| Oro Claro / Verde Lago | 6,9:1 | Labels sobre verde |
| Verde Lago / Piedra | 7,4:1 | Títulos y links sobre claro |
| Verde Lago / Blanco | 8,9:1 | Títulos, botón secundario |
| Oro / Verde Profundo | 5,8:1 | Precio sobre verde |
| Verde Lago / Oro | 3,6:1 | **Solo títulos grandes** |
| Gris Piedra / Piedra | 3,1:1 | **Solo captions ≥ 14 px** |

**Prohibido:** Oro sobre claro como texto (2,2:1) · Oro Claro sobre claro · Bruma sobre Verde como texto · Blanco sobre Oro · Grafito sobre Verde · celestes turísticos · rojos de alerta (las alertas se resuelven con Oro Oscuro) · negro puro.

### 2.5 Estados semánticos (derivados, sin colores nuevos)

| Estado | Resolución |
|---|---|
| Error de formulario | Borde y texto Oro Oscuro `#A8804A` + ícono + mensaje. Nunca rojo. |
| Éxito | Verde Lago + ícono check. |
| Aviso operativo | Banda Verde Profundo con texto Lino. |
| Foco | Contorno 2 px Oro Sierra con 2 px de separación (sobre claro y sobre verde). |

## 3. Tipografía

### 3.1 Familias (Propuesta del brandbook, Google Fonts, licencia OFL)

| Rol | Familia | Pesos | Carga |
|---|---|---|---|
| Display, titulares, citas, **números y precios** | **Cormorant Garamond** | Light 300, Regular 400, Medium 500, Italic 400 | `next/font/local` (archivo variable self-hosted en `src/fonts/`), `display: swap`, subset latin |
| Texto, UI, labels, CTAs | **Montserrat** | Regular 400, Medium 500, SemiBold 600 | `next/font/local` (archivo variable self-hosted) |

**Nunca:** Cormorant en Bold · Cormorant en texto corrido menor a 20 px · una tercera familia · retipear "Espíritu del Lago" (siempre logo vectorial).

### 3.2 Escala tipográfica web

Desktop = brandbook 05.02 (1600 px de referencia). Mobile = escala reducida. Entre ambos, `clamp()` fluido.

| Token | Familia / peso | Mobile (375) | Desktop (1440+) | Line-height | Tracking |
|---|---|---|---|---|---|
| `display-xl` | Cormorant Light | 56 px | 112 px | 100 % | −1 % |
| `display-l` | Cormorant Light | 44 px | 72 px | 105 % | −1 % |
| `h1` | Cormorant Regular | 36 px | 48 px | 110 % | 0 |
| `h2` | Cormorant Medium | 26 px | 32 px | 120 % | 0 |
| `h3` | Montserrat SemiBold | 18 px | 20 px | 130 % | 0 |
| `quote` | Cormorant Italic | 26 px | 36 px | 130 % | 0 |
| `label` | Montserrat Medium, MAYÚSCULAS | 11 px | 12 px | 140 % | +16 % |
| `body-l` | Montserrat Regular | 17 px | 18 px | 160 % | 0 |
| `body-m` | Montserrat Regular | 15 px | 15 px | 160 % | 0 |
| `caption` | Montserrat Regular | 12 px | 11–12 px | 140 % | +2 % |
| `cta` | Montserrat SemiBold, MAYÚSCULAS | 13 px | 14 px | 100 % | +8 % |
| `price` | Cormorant Regular (símbolo $ a 45 %) | 44 px | 64 px | 100 % | 0 |

> Nota: el brandbook define *caption* en 11 px. En web se usa 12 px como mínimo por legibilidad en pantallas; queda como ajuste a validar.

### 3.3 Reglas (brandbook 05.03)
1. Dos familias, nunca tres. 2. Títulos en Light o Regular. 3. Mayúsculas siempre con tracking 16–22 % y ≤ 14 px. 4. Texto corrido a 60–75 caracteres (`max-width: 34rem`), interlineado 160 %, nunca justificado. 5. Alineación a la izquierda (centrado solo en logo, citas y piezas de una línea). 6. Números, precios y horas en Cormorant. 7. Tildes siempre, también en mayúsculas (ESPÍRITU). 8. Énfasis con Montserrat Medium, no con SemiBold ni color. 9. Tres niveles por bloque como máximo.

## 4. Espaciado

Base 8 (brandbook 06.01).

| Token | Valor | Uso |
|---|---|---|
| `space-1` | 8 px | Ícono ↔ texto |
| `space-2` | 16 px | Líneas de un bloque, padding de chips y botones |
| `space-3` | 24 px | Padding de tarjetas chicas |
| `space-4` | 32 px | Entre bloques de contenido |
| `space-6` | 48 px | Entre secciones (mobile) |
| `space-8` | 64 px | Padding de módulos grandes |
| `space-12` | 96 px | Entre secciones (desktop), margen de página a 1600 px |
| `space-16` | 128 px | Aire de heros y cierres (desktop) |

**Ritmo vertical de secciones:** 64 px mobile · 96 px tablet · 128 px desktop. Ante la duda, más aire.

## 5. Grilla y breakpoints

| Breakpoint | Ancho | Columnas | Margen lateral | Gutter |
|---|---|---|---|---|
| `xs` (base) | 0–639 | 4 | 20 px | 16 px |
| `sm` | 640 | 6 | 32 px | 16 px |
| `md` | 768 | 8 | 40 px | 16 px |
| `lg` | 1024 | 12 | 56 px | 16 px |
| `xl` | 1280 | 12 | 6 % (≈ 77 px) | 16 px |
| `2xl` | 1600 | 12 | 96 px (6 %) | 16 px |

Contenedor máximo: 1600 px. Contenido de lectura: 560 px máx. (regla de 60–75 caracteres).

## 6. Formas, líneas y elevación

- **Radio 0** en cajas, tarjetas, botones, fotos e inputs. **2 px** en chips y tags. **Pill** solo en etiquetas de atributo y burbujas de chat.
- Bordes de 1 px Gris Niebla (sobre claro) o Verde Bruma (sobre verde).
- **Regla de horizonte:** 2 px de alto, 48–72 px de ancho, Oro, bajo un label o título.
- **Marco fino:** 1 px Oro para cajas de datos; sobre foto, 1 px Lino con 16 px de separación.
- **Sin sombras.** Excepción técnica: el header sólido al hacer scroll usa un borde inferior de 1 px Gris Niebla, no sombra.

## 7. Iconografía

Lineal, trazo 1,5 px, grilla de 24, terminaciones redondeadas, sin relleno. Librería: **Lucide** (`lucide-react`) en `strokeWidth={1.5}`. Íconos de marca del brandbook: sol, ola, copa, ancla, reloj, pin, grupo, estrella, barco, brújula, calendario, WhatsApp.
Verde Lago sobre claro, Oro Claro sobre verde. **Informan, no decoran.**

## 8. Elementos gráficos de marca

| Elemento | Web |
|---|---|
| **La ola** | SVG (`public/brand/ola-oro.svg`) como divisor de secciones y cierre. Un gesto, no una trama. |
| **Línea de horizonte** | Componente `<HorizonRule />` (2 × 48 px Oro). |
| **Marco fino** | Utilidad `.frame-fine` (borde interior 1 px). |
| **Isotipo** | Favicon, avatar, sello en cierres de página. |

## 9. Logo en web (brandbook 03)

| Contexto | Versión | Archivo |
|---|---|---|
| Header desktop | Horizontal (Propuesta) full color o Oro + Lino sobre foto/verde | `public/brand/logo-horizontal-*.svg` |
| Header mobile | Isotipo + wordmark horizontal reducido; isotipo solo debajo de 180 px de ancho | `isotipo-oro.svg` |
| Footer | Vertical (principal) Oro + Lino sobre Verde Lago + endoso "UNA EXPERIENCIA DE SOYM S.A." | `logo-vertical-oro-blanco.svg` |
| Favicon / app icon | Isotipo sobre Verde Lago | `src/app/icon.svg` |

Tamaños mínimos digitales: lockup vertical 110 px de ancho · horizontal 180 px · isotipo 32 px · wordmark 140 px. Área de protección = altura de las dos olas del isotipo.
Sobre foto: monocromo Lino, siempre con overlay verde ≥ 40 % o zona limpia.

## 10. Componentes

Cada componente tiene: variantes, estados (default, hover, focus-visible, active, disabled, loading) y su comportamiento responsive. Los nombres coinciden con `src/components/`.

### 10.1 Botón `Button`

| Variante | Fondo / texto | Hover | Uso |
|---|---|---|---|
| `primary` | Verde Lago / Lino | Verde Profundo | CTA principal (uno por pantalla) |
| `secondary` | Transparente, borde 1 px Verde Lago / Verde Lago | Fondo Verde Niebla | CTA secundario |
| `accent` | Oro Sierra / Verde Profundo | Oro Oscuro | **Solo sobre Verde Lago**, uno por pieza |
| `ghost-light` | Transparente, borde 1 px Lino / Lino | Fondo Lino 10 % | Sobre foto o verde |
| `link` | Montserrat Medium + flecha → en Oro (sobre verde) o Verde Lago (sobre claro) | Flecha se desplaza 4 px | Enlaces de "Ver más" |

Tamaños: `M` (alto 48 px, padding 24 px) y `S` (alto 40 px, padding 16 px). Texto `cta` en mayúsculas. Radio 0. Área táctil mínima 44 × 44 px.
Estados: `disabled` al 40 % de opacidad; `loading` con indicador lineal fino, sin spinner circular.
**Variante WhatsApp:** `primary` con ícono de WhatsApp de Lucide a la izquierda (sin el verde de WhatsApp: el botón respeta la marca).

### 10.2 Chip / Tag
Variantes: Verde, Oro (solo sobre verde), Piedra, Outline. Radio 2 px, `label` 11 px. Usos: momento del día ("GOLDEN HOUR"), estado ("PRÓXIMAMENTE", "NUEVO"), escasez real ("QUEDAN 8 LUGARES").

### 10.3 Precio `PriceBadge`
`DESDE` (label) · `$` (Cormorant 45 %) + `85.000` (Cormorant Regular) · `por persona` (caption) · `incluye tabla + bebida` (caption). Variantes claro/oscuro. Si no hay precio publicado: "Consultá el precio" en `h3`.

### 10.4 Tarjeta de experiencia `ExperienceCard`
Foto 4:5 (sin radio) → chip de momento → nombre (`h2`) → una línea (`body-m`) → fila de datos (duración · horario) → precio "desde" → link "Ver salida →". Hover desktop: zoom de foto 1,03 en 600 ms y la regla de horizonte crece de 48 a 72 px. Toda la tarjeta es clicable.

### 10.5 Hero `Hero`
Variantes: `video` (MP4/WebM en loop, sin sonido, con póster), `image`, `split` (foto + bloque Piedra), `solid` (Verde Lago, para preapertura). Texto abajo a la izquierda sobre degradé Verde Profundo 0 → 85 % desde la mitad. Altura: 100svh mobile (máx. 760 px), 88vh desktop.

### 10.6 Header `SiteHeader`
Transparente sobre hero con logo monocromo Lino; al pasar 80 px de scroll, fondo Blanco con borde inferior 1 px y logo full color. Mobile: alto 64 px; desktop: 88 px. Menú mobile a pantalla completa sobre Verde Lago con ítems en Cormorant 36 px.

### 10.7 Barra de acción `StickyActionBar` (mobile)
Fija abajo en fichas. Fondo Lino, borde superior 1 px. Izquierda: "Desde $X / por persona". Derecha: botón `primary` S "Consultar". Respeta `safe-area-inset-bottom`. Se oculta cuando el formulario de consulta está visible.

### 10.8 Formularios
Inputs con radio 0, borde 1 px Gris Niebla, fondo Lino, alto 52 px, label siempre visible arriba (no placeholder como label). Foco: borde Verde Lago + contorno Oro. Error: borde Oro Oscuro + mensaje debajo con ícono. Selector de cantidad de personas con botones −/+ (táctil). Fecha con selector nativo en mobile. Checkbox de consentimiento con texto legal en `caption`.

### 10.9 Otros componentes
`SectionHeader` (label + regla + título) · `Timeline` ("Cómo es la salida") · `FactList` (íconos + datos) · `IncludedList` · `Accordion` (FAQ, con "Expandir todo") · `ComparisonTable` (se convierte en tarjetas en mobile) · `Quote` · `Gallery` (máx. 3 por fila; lightbox) · `MapEmbed` (carga diferida al click, póster estático) · `PromoBanner` (sobre Piedra, nunca sobre foto) · `AnnouncementBar` (aviso operativo) · `WhatsAppFab` · `CookieBanner` · `Footer` · `Breadcrumbs` · `OlaDivider` · `HorizonRule`.

## 11. Fotografía y video en web (brandbook 07)

- **Tres registros:** paisaje, experiencia, detalle. Siempre desde el barco hacia afuera, horizonte en el tercio inferior.
- **Formatos:** heros 16:9 desktop y 4:5 o 9:16 mobile (**arte dirigido**: dos recortes, no un solo recorte forzado). Tarjetas 4:5. Detalles 1:1.
- **Tratamientos permitidos:** sin tratamiento · overlay Verde 40 % · degradé inferior Verde Profundo · marco fino. **No:** filtros, viñetas, B/N, duotonos, HDR, radios en fotos, collages de más de 3.
- **Video hero:** 8–15 s en loop, sin sonido, sin cortes rápidos (calma). H.264 MP4 + WebM, 1080p desktop / 720p vertical mobile, ≤ 4 MB mobile. Póster obligatorio. No se reproduce con `prefers-reduced-motion` ni con ahorro de datos (`Save-Data`).
- **Hasta tener la sesión de fotos:** modo preapertura con heros `solid` y fotos reales del astillero (registro "detalle"). Las imágenes generadas con IA **no** se usan como fotos de la experiencia (el brandbook pide luz real y nada de stock).
- Cada imagen en el CMS tiene: texto alternativo obligatorio, punto focal, crédito y registro (paisaje/experiencia/detalle).

## 12. Movimiento

Calma: nada rebota, nada gira.
- Duraciones: 200 ms (hover, foco) · 400 ms (aperturas) · 600–800 ms (entradas de sección).
- Curva: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out suave).
- Entradas: desvanecido + desplazamiento de 16 px, una vez, al entrar en pantalla.
- Parallax mínimo (≤ 8 %) solo en heros de paisaje, desactivado en mobile.
- `prefers-reduced-motion`: sin animaciones de entrada ni video automático.

## 13. Responsive: mobile primero

El 70 % del uso de la marca es vertical (brandbook 07.03). El sitio se diseña **primero a 375 px** y se expande:
- Heros con recorte vertical propio, no la foto horizontal achicada.
- Navegación de ficha con anclas tipo pestañas pegadas bajo el header.
- Barra de acción inferior en fichas; botón flotante de WhatsApp en el resto (nunca los dos).
- Tablas → tarjetas apiladas.
- Formularios a una columna, teclados correctos (`inputmode="tel"`, `type="email"`, `autocomplete`).
- Objetivos táctiles ≥ 44 px, separación ≥ 8 px.
- Rendimiento en 4G como requisito de diseño (SEO-STRATEGY §6).

## 14. Accesibilidad (WCAG 2.2 AA)

Contrastes de §2.4 · foco visible siempre · navegación completa por teclado · `alt` obligatorio · formularios con labels y errores asociados (`aria-describedby`) · acordeones accesibles · `lang="es-AR"` · saltar al contenido · animaciones respetan `prefers-reduced-motion` · video sin sonido y con pausa.

## 15. Voz en la interfaz (brandbook 02)

- Voseo, frases cortas, concretas. "Consultar disponibilidad", no "Enviar".
- Sin signos de admiración, sin mayúsculas de grito, sin "promo imperdible".
- Errores humanos: "Revisá el número de WhatsApp: le faltan dígitos."
- Confirmaciones cálidas: "Listo, Sofi. Te escribimos por WhatsApp para confirmar."
- Palabras evitadas en UI: crucero, tour, paquete, VIP, lujo, oferta, promo, increíble.

## 16. Pendientes de diseño

- [ ] Diseño en Figma de Home, Ficha y Privados (desktop + mobile) sobre la base de este sistema, antes de implementar el frontend completo.
- [ ] Recortes verticales de heros cuando exista la sesión de fotos.
- [ ] Mapa ilustrado del embalse con la paleta de marca.
- [ ] Validar el caption a 12 px en web (el brandbook dice 11 px).
- [ ] Validar logo horizontal (Propuesta) para el header.
