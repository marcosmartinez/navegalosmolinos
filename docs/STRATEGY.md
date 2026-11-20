# STRATEGY — Estrategia digital

> Fuentes: brandbook de Espíritu del Lago en Figma (archivo SOYM, páginas 00–12), documentos del proyecto SOYM (Aviso de Proyecto, brochure inversor, presentación APRHI) y RESEARCH.md.
> Convención: **[CONFIRMAR]** marca un dato que hay que validar con SOYM antes de publicar.

---

## 1. Marca y dominio

| | Decisión |
|---|---|
| Marca de cara al público | **Espíritu del Lago** (brandbook 01.10, nivel 2) |
| Endoso institucional | "Una experiencia de SOYM S.A." solo en pie de página, legales y piezas institucionales. SOYM nunca va en un titular. |
| Dominio | `navegalosmolinos.com` (dominio oficial definido por SOYM) |
| Tensión marca/dominio | El dominio no dice "Espíritu del Lago". No es un problema: el dominio funciona como **descriptor de búsqueda** ("navegar Los Molinos") y la marca aparece en logo, títulos y metadatos. Recomendación: registrar `espiritudellago.com.ar` (y variantes) y redirigir 301 al dominio oficial. **[CONFIRMAR disponibilidad]** |

## 2. Contexto de negocio que condiciona el sitio

1. **El servicio todavía no opera.** La botadura estaba prevista para diciembre de 2026 y siguen en curso la habilitación náutica comercial, el Aviso de Proyecto ante Ambiente (Ley 10.208) y la autorización de APRHI. **El sitio no puede vender salidas antes de tener las habilitaciones.**
2. **Operación solo diurna.** La Ley provincial 11.005, art. 27, establece que la actividad náutica comercial es siempre diurna. Esto afecta experiencias del brandbook:
   - *Noche de estrellas*: no se puede ofrecer. Queda fuera del sitio.
   - *Wine Cruise*: solo en horario diurno.
   - *Golden Hour*: tiene que terminar antes de la puesta del sol. Copys del brandbook como "volvemos con las primeras estrellas" hay que reescribirlos.
3. **Capacidad.** El barco (ET-228) lleva 100 personas incluida la tripulación; el plan de negocios vende 70 lugares comerciales. El sitio comunica **70 lugares** (o el número que se confirme), no 100. **[CONFIRMAR]**
4. **Desembarco en Tres Bahías.** Depende de la autorización de APRHI para el muelle flotante. Se muestra como "próximamente" hasta que esté habilitado.
5. **Precios.** El plan de negocios (no final) maneja tickets de $70.000 (regular invierno), $85.000 (regular verano y sunset) y $50.000 por persona en eventos. **No se publican hasta que SOYM los confirme.** El CMS permite mostrar "Consultá el precio" mientras tanto.

## 3. Público objetivo

El brandbook (01.08) define el público y sus prioridades. Lo traducimos a perfiles digitales:

| Prioridad | Perfil | Qué necesita encontrar en el sitio | Duda principal | Canal probable |
|---|---|---|---|---|
| 1 | **La pareja que celebra** (28–48) | Experiencias para ocasiones, qué incluye, opción de sorpresa o brindis | ¿Vale la pena? ¿Qué incluye? | Instagram → web → WhatsApp |
| 1 | **El grupo de amigos** (25–45) | Ambiente, música, gastronomía, mínimo de personas, reserva grupal | Mínimo de personas, lluvia | Instagram / TikTok → WhatsApp |
| 1 | **El turista de otra provincia** (30–55) | Logística: dónde es, cómo llegar, horarios, duración, qué pasa si llueve | ¿Cómo llego? ¿Es confiable? | Google → web → WhatsApp o formulario |
| 2 | **La familia con hijos** (3–5 personas) | Seguridad, chalecos, duración, qué comen los chicos, tarifa menor | ¿Es seguro? | Google / alojamiento → web |
| 3 | **El grupo corporativo** (10–25) | Propuesta cerrada, capacidad, catering, factura | Catering, capacidad | Google / LinkedIn → formulario |
| 3 | **El jubilado activo** (60–75) | Comodidad, accesibilidad, asientos, embarque | ¿Es cómodo subir? | Recomendación / alojamiento → teléfono |

Perfiles secundarios (no son público del brandbook, pero usan el sitio):
- **Alojamientos y agencias del valle** que recomiendan o revenden: necesitan información clara y un contacto comercial.
- **Prensa, Comuna, APRHI e inversores**: necesitan el relato institucional y el compromiso ambiental.

## 4. Propuesta de valor (para la web)

**Idea madre:** *El lago desde adentro.*

**Argumento:** la única forma de navegar el Lago Los Molinos con una experiencia completa: navegación, gastronomía artesanal, música elegida y, cuando esté habilitada, parada en Tres Bahías.

**Pruebas que el sitio tiene que mostrar:**
- 90 minutos de navegación en un catamarán de 19 metros, construido a medida en aluminio naval.
- Salidas de mañana y de tarde, con experiencias por ocasión.
- Equipo de a bordo, seguridad y habilitación.
- Compromiso ambiental verificable: cero vertidos, casco sin antifouling, combustible cargado en tierra.

**Invitación:** *Vení a ver Calamuchita desde donde nadie la mira.*

## 5. Objetivos comerciales del sitio

| # | Objetivo | Indicador | Meta inicial (propuesta) |
|---|---|---|---|
| O1 | Generar consultas calificadas | Consultas por WhatsApp + formularios por semana | Se fija con la ocupación objetivo del plan **[CONFIRMAR]** |
| O2 | Capturar demanda antes del lanzamiento | Inscriptos en la lista de espera | 300 contactos en la fase de intriga (brandbook 10.03) |
| O3 | Ser la respuesta en Google | Posición para "navegar lago los molinos", "paseo en barco calamuchita", "excursión lago los molinos" | Top 3 a 90 días del lanzamiento |
| O4 | Vender privados y empresas | Consultas corporate/privado por mes | A definir con SOYM |
| O5 | Construir confianza institucional | Visitas a "Nosotros" y "Compromiso ambiental"; descargas del kit de prensa | Seguimiento, sin meta |
| O6 | Preparar la venta online | Arquitectura lista para el motor de reservas sin rehacer el sitio | Criterio técnico (ROADMAP) |

## 6. Modos de operación del sitio

El sitio tiene que acompañar las fases del lanzamiento del brandbook (10.01) sin rediseño. Se controla con un único ajuste en el CMS: **Modo del sitio**.

| Modo | Fase del brandbook | Qué muestra | CTA principal |
|---|---|---|---|
| `preapertura` | Silencio / Intriga | Home de una pantalla (o pocas secciones), marca, lago, barco en construcción, lista de espera | **"Enterate primero"** → formulario de lista de espera + WhatsApp |
| `consultas` | Lanzamiento → Consolidación (MVP) | Sitio completo, precios si están confirmados, disponibilidad por consulta | **"Reservá por WhatsApp"** / "Consultar disponibilidad" |
| `reservas` | Futuro | Igual que `consultas`, con botón de reserva online por experiencia | **"Reservar"** → motor externo; WhatsApp como secundario |

El modo se puede sobreescribir por experiencia: por ejemplo, Golden Hour con reserva online y Corporate solo por consulta.

## 7. Recorridos principales

Resumen; el detalle está en USER-FLOWS.md.

1. **Descubrir y consultar** (Instagram → ficha de experiencia → WhatsApp precargado).
2. **Planificar el viaje** (Google → Planificá tu visita → experiencias → formulario).
3. **Celebrar una ocasión** (Home → experiencia por ocasión → formulario con "¿Celebran algo?").
4. **Empresa o grupo privado** (Google → Privados y empresas → formulario corporativo).
5. **Lista de espera** (pre-lanzamiento → formulario mínimo → confirmación).
6. **Marketing opera el sitio** (admin → promoción con fechas → aparece en Home → mide consultas).

## 8. Arquitectura de información

### 8.1 Menú principal (desktop)

```
[Logo]   Experiencias   Privados y empresas   El lago   Planificá tu visita   Nosotros      [Reservá por WhatsApp]
```

- Cinco ítems como máximo, ordenados por intención de compra.
- "Experiencias" abre un panel con las experiencias activas (foto, nombre, duración) y un enlace a "Ver todas".
- El botón de la derecha cambia según el modo del sitio ("Enterate primero" / "Reservá por WhatsApp" / "Reservar").

### 8.2 Navegación mobile

- Header compacto: isotipo + wordmark horizontal reducido + botón de menú.
- Menú a pantalla completa sobre Verde Lago, con los mismos ítems en Cormorant Garamond grande, y contacto (WhatsApp, teléfono, redes) abajo.
- **Barra de acción inferior fija** en fichas de experiencia: precio "desde" + botón "Consultar" (WhatsApp). En el resto de las páginas, botón flotante de WhatsApp. Nunca los dos juntos.

### 8.3 Navegación secundaria (footer)

Experiencias · Privados y empresas · Regalá una salida (fase 2) · El lago · Planificá tu visita · Preguntas frecuentes · Nosotros · Compromiso ambiental · Prensa · Contacto · Términos y condiciones · Condiciones de navegación · Privacidad · Botón de arrepentimiento (cuando haya venta online) · Endoso "Una experiencia de SOYM S.A." · Redes.

## 9. Jerarquía de contenidos

Regla del brandbook (06.05, 05.03): **un protagonista por pantalla, tres niveles tipográficos como máximo, aire antes que información.**

Orden de prioridad del contenido en todo el sitio:
1. La perspectiva (foto desde el agua + titular).
2. La experiencia concreta (qué, cuánto dura, cuándo sale, qué incluye).
3. El precio y cómo consultar.
4. La logística (dónde, cómo llegar, clima).
5. La confianza (barco, seguridad, equipo, ambiente, reseñas).
6. Lo institucional (SOYM, Comuna, APRHI, prensa).

## 10. Llamados a la acción

Según 02.04 del brandbook: infinitivo o voseo, sin signos de admiración y **un solo CTA principal por pantalla**.

| CTA | Dónde | Destino | Evento |
|---|---|---|---|
| **Reservá por WhatsApp** | Header, fichas, Home | WhatsApp con mensaje precargado y código de referencia | `whatsapp_click` |
| **Consultar disponibilidad** | Ficha de experiencia (formulario) | Formulario contextual | `generate_lead` (form) |
| **Ver salidas de esta semana** | Home, Experiencias | `/experiencias` | navegación |
| **Cerrar el barco para tu grupo** | Privados y empresas | Formulario corporativo | `generate_lead` (form) |
| **Pedí tu propuesta** | Empresas | Formulario corporativo | `generate_lead` (form) |
| **Enterate primero** | Modo preapertura | Lista de espera | `sign_up` (waitlist) |
| **Regalá una salida en el lago** | Fase 2 | Gift card | `generate_lead` / `purchase` |
| **Llamar** | Planificá tu visita, Contacto, footer | `tel:` | `phone_click` |
| **Seguinos** | Footer, Nosotros | Instagram / Facebook / TikTok | `social_click` |

## 11. Estrategia de conversión

### 11.1 Embudo

```
Descubrimiento (Instagram, TikTok, Google, alojamiento)
        ↓
Ficha de experiencia o Home (perspectiva + datos concretos)
        ↓
Microconversión: ver precio, ver horarios, leer "qué pasa si llueve"
        ↓
Conversión: WhatsApp precargado · formulario · teléfono
        ↓
Cierre humano en WhatsApp (guion de 02.05: nombre, una pregunta, precio + qué incluye, seña)
```

### 11.2 Palancas

1. **Fricción mínima en WhatsApp**: mensaje precargado con experiencia, fecha (si la eligieron) y código de referencia (`EDL-GH-IG`) para saber de dónde vino la consulta.
2. **Formulario contextual de tres campos visibles** (fecha, personas, ocasión) más contacto. El resto, opcional.
3. **Escasez real** cuando exista ("Para el sábado quedan 8 lugares"): un campo editable por salida, nunca automático ni falso.
4. **Logística que elimina dudas** antes de que lleguen a WhatsApp: duración, punto de embarque, qué pasa si llueve, accesibilidad.
5. **Prueba social** desde la primera temporada: reseñas con fuente y permiso.
6. **Promociones con vigencia** (apertura 15 %, temporada baja, grupos), administradas por marketing con fechas de inicio y fin.

### 11.3 Medición

GA4 + Google Search Console + registro propio de consultas en el CMS. Cada consulta guarda la página de origen, el CTA, los parámetros UTM, el referrer y los identificadores de campaña (`gclid`, `fbclid`). Detalle en INTEGRATIONS.md y SEO-STRATEGY.md.

## 12. Qué no es este sitio

- No es un catálogo de turismo genérico ni una plantilla.
- No es un e-commerce en el MVP.
- No promete lo que la operación no puede cumplir (navegación nocturna, Tres Bahías antes de la habilitación, capacidad de 100 personas comerciales).

## 13. Información a confirmar con SOYM

| # | Dato | Dónde impacta |
|---|---|---|
| 1 | Experiencias definitivas, nombres y horarios (con operación solo diurna) | Experiencias, Home, SEO |
| 2 | Precios por experiencia, temporada y tipo de pasajero (adulto, menor, jubilado, residente) | Fichas, datos estructurados |
| 3 | Política de seña, cancelación, reprogramación y clima | Fichas, Condiciones de navegación |
| 4 | Capacidad comercial por salida (¿70?) y mínimo para privados | Fichas, Privados |
| 5 | Punto exacto de embarque (Club Náutico Calamuchita): dirección, coordenadas, estacionamiento, accesibilidad | Planificá tu visita, SEO local |
| 6 | Número de WhatsApp Business, teléfono, email comercial | Global |
| 7 | Redes sociales activas (handles) | Global |
| 8 | Fecha estimada de inicio de operación | Modo del sitio, lista de espera |
| 9 | Número de habilitación náutica y matrícula para mostrar como credencial | Confianza, footer |
| 10 | Seguros contratados (responsabilidad civil, pasajeros) | Confianza, FAQ |
| 11 | Gastronomía por experiencia (qué incluye exactamente) y opciones para dietas | Fichas, FAQ |
| 12 | Accesibilidad del barco y del embarque | Planificá tu visita, FAQ |
| 13 | Datos técnicos del embalse para publicar (superficie, distancia a Córdoba) | El lago |
| 14 | Equipo visible (capitán, anfitriones) y autorizaciones de imagen | Nosotros |
| 15 | Sesión de fotos y video: fecha | Todo el sitio |
| 16 | Razón social, CUIT y domicilio de SOYM S.A. para legales | Legales |
