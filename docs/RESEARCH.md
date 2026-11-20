# RESEARCH — Benchmarking de sitios de navegación y experiencias

> Proyecto: sitio web de **Espíritu del Lago** (marca de experiencia de SOYM S.A.) en `navegalosmolinos.com`.
> Fecha del relevamiento: 20/11/2026.
> Método: lectura del contenido y la estructura de cada sitio con herramientas de fetch web. **No se tomaron capturas de pantalla ni se midió la versión mobile en un dispositivo real**: donde se habla de mobile, se describe lo que se puede inferir del código y del contenido. Ver "Pendientes del research" al final.

---

## 1. Qué buscamos

Espíritu del Lago no es un operador de transporte lacustre ni una agencia de excursiones: es **una experiencia curada de 90 minutos** (navegación + gastronomía + música + parada en tierra) en un lago donde hoy no opera nadie comercialmente. El benchmark busca tres cosas:

1. **Cómo presentan una experiencia** los mejores operadores de navegación turística (no solo el barco).
2. **Cómo convierten**: CTA, precios, motores de reserva, WhatsApp, formularios.
3. **Cómo generan confianza** cuando el producto es nuevo o depende del clima.

## 2. Sitios analizados

| # | Operador | Destino | URL | Por qué está |
|---|---|---|---|---|
| 1 | RealNZ — Milford Sound Signature Cruise | Fiordland, Nueva Zelanda | https://www.realnz.com/en/experiences/cruises/milford-sound-cruises/ | Referencia mundial de ficha de producto de navegación. |
| 2 | CGN — Compagnie Générale de Navigation | Lago Lemán, Suiza | https://www.cgn.ch/en | Operador lacustre con flota patrimonial y segmentación por tipo de crucero (gourmet, privado, grupos). |
| 3 | Pursuit — Lake Minnewanka Cruise | Banff, Canadá | https://www.pursuit.com/experiences/lake-minnewanka/ | "Único crucero del parque": el mismo argumento de exclusividad que tiene Espíritu del Lago. |
| 4 | Cruce Andino | Bariloche ↔ Puerto Varas | https://www.cruceandino.com/ | Referente regional premium, bilingüe, con motor de reserva propio. |
| 5 | Turisur | Bariloche | https://www.turisur.com.ar/ | Referente regional de excursiones lacustres con promociones y pago en cuotas. |
| 6 | Sturla Viajes | Tigre / Buenos Aires | https://www.sturlaviajes.com.ar/ | Navegaciones urbanas en Argentina, venta online con precios visibles. |
| 7 | First Lady Cruises (caso de estudio de Span) | Chicago, EE. UU. | https://span.studio/projects/first-lady-website | Rediseño de marca + sitio de un operador de paseos en barco pensado como marca premium; CMS con page builder para el equipo interno. |
| 8 | Catamaranes del Lago San Roque | Villa Carlos Paz, Córdoba | (sin sitio propio relevante; presencia en agregadores como Despegar y en notas de prensa) | El comparable más cercano en la provincia. |

Sitios que no se pudieron leer completos: `firstladycruises.com` (bloqueó el acceso automatizado: se usó el caso de estudio de la agencia) y `hieloyaventura.com` (renderiza todo en el cliente; solo se leyeron los metadatos).

---

## 3. Análisis por sitio

### 3.1 RealNZ — Milford Sound Signature Cruise
**Estructura.** Hero con foto a sangre (sin video), título del producto junto al precio "From NZD $199" y botón *Book Now*. Debajo, un **panel resumen** con viñetas (barco, asientos, comida, guía, duración, salidas, cancelación) y **anclas** a Itinerario, Reseñas, Barcos, Más información, Imágenes y FAQ.
**Experiencia.** Bloques imagen + texto alternados, cada uno con su CTA. Un "Tu experiencia" en 7 pasos sobre un mapa (check-in, embarque, hitos del recorrido). Tarjetas "Elegí cómo navegás" comparando dos barcos por capacidad, horarios y comodidades.
**Información práctica.** Acordeones: qué incluye, extras opcionales, qué llevar, cómo llegar, estacionamiento, política de cancelación (24 h), riesgos naturales.
**Conversión.** *Book Now* aparece unas cinco veces; todos los botones abren un widget de **FareHarbor** embebido.
**Confianza.** Reseñas con fuente (TripAdvisor, Google), política de cancelación clara, alianza con el Departamento de Conservación, "1 % para conservación si reservás directo".
**Para nosotros.** Es el modelo de ficha de experiencia: precio junto al título, resumen escaneable, itinerario paso a paso, FAQ por producto y CTA repetido. El incentivo a reservar directo atado a conservación es trasladable a Tres Bahías.
**Debilidades.** Inconsistencias de contenido (dos tiempos distintos para la misma caminata, horarios que no coinciden entre resumen y tarjeta). Lección: **un dato, un lugar** en el CMS.

### 3.2 CGN — Lago Lemán
**Estructura.** Hero con imagen y, inmediatamente debajo, el formulario "Horarios y tickets". Menú segmentado por tipo de experiencia: circuitos, **cruceros gastronómicos**, grupos, **privados**, crucero + descubrimiento.
**Promociones.** Tres tarjetas de temporada con imagen y fechas (cruceros nocturnos de los viernes, Navidad).
**Confianza.** Relato patrimonial ("la flota Belle Époque más prestigiosa del mundo"), pagos seguros con logos, sellos de sustentabilidad, contacto visible.
**Para nosotros.** La **segmentación por ocasión** (gastronomía, privado, grupos) en el menú es exactamente la que necesita Espíritu del Lago. Las promociones con fechas de vigencia son el modelo de "Promoción" del CMS.
**Debilidades.** Etiquetas de botón en francés en la versión inglesa: fallas de localización que el CMS tiene que evitar con campos obligatorios por idioma.

### 3.3 Pursuit — Lake Minnewanka
**Estructura.** Título + **rating agregado (4,6 · 2.443 reseñas)** + pestañas internas (Overview, Tours, Food & Drink, Hours & Location, FAQs).
**Posicionamiento.** "Las Rocosas desde una perspectiva completamente nueva" y "el único crucero del Parque Nacional Banff". Es casi la misma promesa que "el lago desde adentro".
**Reserva.** Widget en el hero con fecha + producto → "Check availability", que lleva a un subdominio de reservas. Precio "desde" por adulto con impuestos incluidos.
**Información práctica.** Tabla de horarios por fecha, check-in 15 minutos antes, estacionamiento, transporte público, accesibilidad (silla de ruedas en cubierta trasera), restricciones.
**Para nosotros.** Confirma que un producto único se vende con **perspectiva + exclusividad + logística impecable**. Las pestañas internas son útiles en mobile para fichas largas.
**Debilidades.** El precio quedó como placeholder "CA$000.00" en la versión servida: si el precio depende de un sistema externo, la web tiene que tener un *fallback* editable.

### 3.4 Cruce Andino
**Estructura.** Slider de titulares, cuatro tarjetas de producto con foto, tipo de viaje, duración, descripción corta y **precio "desde" en USD**. Menú con un "Planificá tu viaje" completo (cómo llegar, clima, qué llevar, chicos, FAQ, galería).
**Reserva.** Motor propio con pestañas (ida, ida y vuelta, Bike & Boat), fechas, pasajeros por edad y tarifa de residente. Pagos con PayPal, Webpay y Pix.
**Contacto y confianza.** WhatsApp flotante, oficinas en ambos países, sello Travelers' Choice de TripAdvisor, parques nacionales, logos de socios.
**Para nosotros.** La sección **"Planificá tu visita"** como hub de logística es clave para el turista de otra provincia (prioridad 1 del brandbook). La tarifa de residente anticipa la necesidad de **tipos de pasajero** en el modelo de precios.

### 3.5 Turisur — Bariloche
**Estructura.** Menú: Excursiones, **Tarifas**, **Promociones**, Eventos, Empresa, Contacto, Blog, y carrito "Comprá online".
**Excursiones.** Tarjetas con foto, nombre, horario y "Reservar". Los precios viven en una página de tarifas aparte.
**Promociones.** Seis tarjetas de descuento: combos, grupo familiar de 4+, compra anticipada de 30+ días, descuento por combinar lacustre + terrestre.
**Conversión.** Reserva online + WhatsApp ("¿Te podemos ayudar?") + formulario + teléfonos. Cuotas sin interés con Mercado Pago.
**Confianza.** Testimonios, TripAdvisor, número de legajo de agencia y QR fiscal.
**Para nosotros.** La mecánica de promociones es buena, pero el sitio se ve como un catálogo: muchas cosas compitiendo, nada protagonista. Es **el modelo a evitar en lo visual** y a imitar en lo comercial (cuotas, combos, compra anticipada).

### 3.6 Sturla Viajes — Tigre
**Estructura.** **Video en loop en el hero**, slider de destinos y tarjetas por categoría con foto, tagline, **precio visible con precio tachado**, duración y "Comprar Online".
**Precios.** Adulto/menor, ida/ida y vuelta, mesa VIP para 10 personas.
**Conversión.** WhatsApp con mensaje precargado, venta online, tres oficinas con horarios.
**Confianza.** Legajo, logos institucionales y de socios, términos en PDF.
**Para nosotros.** Precios en pesos visibles y descuentos tachados funcionan en el mercado argentino, pero el tachado permanente erosiona la credibilidad y choca con la voz de marca ("evitamos promo, oferta imperdible"). El **WhatsApp precargado** es directamente aplicable.

### 3.7 First Lady Cruises (Chicago) — caso de estudio
**Qué hicieron.** Rebranding + sitio rehecho "desde el casco": la experiencia digital traduce la gracia y el refinamiento de estar a bordo. Construido sobre Craft CMS con un **modelo de contenido propio y un page builder modular** para que el equipo interno controle diseño editorial y cambios de temporada **sin romper el sistema de diseño**.
**Para nosotros.** Es el antecedente más parecido a lo que pide SOYM: marca premium de paseo en barco + CMS operado por marketing + sistema de diseño protegido. Valida el enfoque de **bloques predefinidos con variantes acotadas** en lugar de un editor libre.

### 3.8 Lago San Roque (Villa Carlos Paz)
Hay varios catamaranes y embarcaciones que salen de la costanera, con paseos de unas dos horas que narran la historia del dique. Aparecen en agregadores como Despegar con un precio por adulto y descuentos, pero **sin una marca digital fuerte ni una experiencia curada**.
**Para nosotros.** El comparable provincial compite por precio y por relato histórico, no por experiencia. Confirma el hueco del brandbook (cuadrante "experiencia curada + sobre el agua" vacío) y que **los agregadores son un canal real** para la segunda etapa.

---

## 4. Análisis comparativo

### 4.1 Matriz de prácticas

| Práctica | RealNZ | CGN | Pursuit | Cruce Andino | Turisur | Sturla | ¿La adoptamos? |
|---|---|---|---|---|---|---|---|
| Hero con foto a sangre | ✔ | ✔ | ✔ | ✔ (slider) | ✔ (slider) | Video | **Sí, foto o video corto en loop** |
| Video en el hero | — | — | — | — | — | ✔ | **Sí, cuando exista material real** (fallback a foto) |
| Precio "desde" junto al título | ✔ | — | ✔ | ✔ | — (página aparte) | ✔ | **Sí** |
| Página de tarifas separada | — | — | — | ✔ | ✔ | — | **No**: precios en cada ficha + tabla comparativa en `/experiencias` |
| Resumen escaneable (duración, incluye, salidas) | ✔ | — | ✔ | ✔ | parcial | parcial | **Sí** |
| Itinerario paso a paso | ✔ | — | — | ✔ (mapa) | — | — | **Sí** ("Cómo es la salida") |
| FAQ por producto | ✔ | — | ✔ | ✔ | — | — | **Sí** (FAQ global + FAQ por experiencia) |
| Segmentación por ocasión | — | ✔ | ✔ | — | — | ✔ | **Sí** (parejas, amigos, familias, empresas) |
| Privados / grupos / empresas | ✔ | ✔ | ✔ | — | — | ✔ | **Sí, página propia con formulario** |
| Promociones con vigencia | ✔ | ✔ | ✔ (pase) | — | ✔ | ✔ (tachado) | **Sí, sin tachado permanente** |
| Motor de reservas externo | FareHarbor | Propio | Propio (subdominio) | Propio | Carrito | Carrito | **No en MVP**; arquitectura lista |
| WhatsApp | — | — | — | ✔ flotante | ✔ | ✔ precargado | **Sí, canal principal** |
| Rating agregado | — | — | ✔ | badge TA | badge TA | — | **Cuando haya reseñas reales** |
| Testimonios | ✔ | — | ✔ | — | ✔ | — | **Sí, después del lanzamiento** |
| Info de accesibilidad | ✔ | — | ✔ | ✔ (chicos) | — | — | **Sí** |
| Política de clima / cancelación visible | ✔ | — | ✔ | ✔ | — | ✔ (PDF) | **Sí, en cada ficha** |
| Bilingüe | ✔ | ✔ (3) | ✔ | ✔ (3) | ✔ (3) | ✔ (3) | **Fase 2** (arquitectura i18n desde el día 1) |
| Credenciales regulatorias | — | sellos | permisos | parques | legajo + QR | legajo | **Sí**: habilitación náutica, seguros, SOYM S.A. |

### 4.2 Patrones de diseño que se repiten en los mejores

1. **Un producto, una promesa, un CTA.** Los sitios premium (RealNZ, Pursuit, First Lady) tienen poca información por pantalla y un único botón dominante. Los catálogos (Turisur, Sturla) ponen todo al mismo nivel.
2. **La ficha de experiencia es la página que más convierte.** Todos le dedican más estructura a la ficha que a la home: resumen, itinerario, incluye, logística, FAQ, CTA repetido.
3. **La logística genera confianza.** Check-in, estacionamiento, qué llevar, accesibilidad, qué pasa si llueve. En un producto nuevo y que depende del clima, esto pesa más que las reseñas.
4. **La exclusividad se dice con datos, no con adjetivos.** "El único crucero del parque", "la única excursión con gastronomía del lago". Coincide con la voz del brandbook.
5. **El incentivo a reservar directo.** RealNZ (1 % a conservación), Pursuit (mejor tarifa reservando antes), Turisur (compra anticipada).

### 4.3 Fotografía y video

- Los sitios premium usan **pocas fotos y grandes**, con horizonte bajo y espacio para texto. Coincide exactamente con 07 · Fotografía del brandbook.
- El video aparece como loop silencioso de fondo (Sturla) o como galería aparte (Cruce Andino, CGN). **Ninguno usa video con sonido autoplay**.
- **Riesgo propio:** hoy no hay fotos reales del lago desde el barco (solo imágenes generadas con IA y fotos del astillero). El brandbook dice explícitamente: *"Lanzar sin fotos propias. Si la sesión no está lista, se corre L"*. El sitio tiene que poder publicarse en modo pre-lanzamiento con muy pocas imágenes.

### 4.4 Precios, promociones y paquetes

- Mercado argentino: precio en pesos visible, cuotas sin interés y promos por grupo o anticipación (Turisur, Sturla).
- Mercado premium internacional: precio "desde" por adulto, extras opcionales con precio, impuestos incluidos.
- **Decisión:** precio "desde" por persona en Cormorant Garamond (regla 06 de tipografía), con "qué incluye" al lado (regla del guion de WhatsApp: *precio y qué incluye siempre juntos*). Promociones con fecha de inicio y fin, sin tachado permanente. Packs (ej. "regalá una salida") en fase 2.

### 4.5 Formularios y consultas

- Los operadores argentinos combinan **WhatsApp + formulario + teléfono**. WhatsApp domina.
- Los formularios relevados son genéricos (nombre, email, mensaje). Ninguno pide fecha, cantidad de personas u ocasión, que son exactamente los datos que el guion de WhatsApp del brandbook pregunta primero.
- **Oportunidad:** formularios cortos y contextuales (precargados con la experiencia de la página) que capturan fecha, personas y ocasión, más el origen (página, CTA, UTM) para medir.

### 4.6 Integración de reservas externas

| Patrón | Ejemplo | Pros | Contras |
|---|---|---|---|
| Widget embebido en la página | RealNZ (FareHarbor) | No sale del sitio | Dependencia de JS de terceros, problemas en modo privado |
| Subdominio de reservas | Pursuit | Separa responsabilidades | Salto visual entre sitio y checkout |
| Motor propio | Cruce Andino, CGN | Control total | Caro de construir y mantener |
| Carrito propio | Turisur, Sturla | Venta directa | Fuera de alcance |

Para Argentina, **TuriTop** tiene integración directa con **Mercado Pago** en su widget y casos de uso en receptivos de la Patagonia; **Bókun** conecta con más de 70 OTAs. Ambos son candidatos para la etapa de reservas (ver INTEGRATIONS.md).

### 4.7 Confianza y profesionalismo

En orden de impacto para un producto nuevo:
1. Logística clara y política de clima/cancelación (todos los premium).
2. Credenciales: habilitación náutica, seguros, empresa responsable (Turisur y Sturla muestran legajo; nosotros: SOYM S.A. como endoso, según el brandbook).
3. Fotos reales desde el barco (ninguno usa stock).
4. Reseñas con fuente (cuando existan).
5. Alianzas con instituciones y conservación (RealNZ, Pursuit, CGN).

### 4.8 UX/UI que hace intuitiva la navegación

- Menú corto con ocasiones (CGN), "Planificá tu visita" como hub (Cruce Andino, Pursuit).
- Anclas o pestañas internas en fichas largas (RealNZ, Pursuit).
- CTA persistente: botón flotante de WhatsApp (Cruce Andino, Turisur, Sturla).
- FAQ con acordeón y "expandir todo" (RealNZ).

### 4.9 Mobile (inferido)

- Todos usan imágenes responsivas en varios tamaños (RealNZ sirve 220, 568 y 1920 px).
- WhatsApp flotante en mobile es la convención regional.
- Ningún sitio relevado tiene un **CTA fijo inferior contextual** ("Consultar Golden Hour") en la ficha: es una oportunidad para nosotros.
- Sliders de hero (Cruce Andino, Turisur): en mobile empujan el contenido y diluyen el mensaje. **No usaremos sliders.**

---

## 5. Oportunidades para Espíritu del Lago

1. **Ser la marca digital más cuidada del turismo lacustre argentino.** Ningún comparable regional tiene una identidad editorial: el lugar está libre.
2. **Vender perspectiva, no transporte.** Las fichas se ordenan por momento del día y ocasión, no por recorrido.
3. **Formulario contextual + WhatsApp con referencia.** Cada consulta llega con experiencia, fecha, personas, ocasión y origen medido.
4. **Logística impecable como argumento de confianza** para un producto que todavía no tiene reseñas.
5. **Modo pre-lanzamiento** con lista de espera, para no vender antes de tener las habilitaciones.
6. **Tres Bahías y el compromiso ambiental** como diferencial de confianza, como hacen RealNZ y Pursuit con conservación.

## 6. Elementos que NO vamos a adoptar

- Sliders en el hero.
- Precios tachados permanentes, "promo imperdible", signos de admiración (choca con 02 · Brand Voice).
- Página de tarifas desconectada de las experiencias.
- Carrito propio o motor de reservas propio en el MVP.
- Stock de yates o lifestyle (07 · Fotografía lo prohíbe).

## 7. Pendientes del research

- [ ] Capturas desktop y mobile de los sitios 1–6 en `docs/research/capturas/` (no se pudieron tomar en esta sesión).
- [ ] Prueba real en celular de los flujos de reserva de RealNZ, Pursuit y Cruce Andino.
- [ ] Relevar los operadores del Lago San Roque y de Embalse Río Tercero: precios, duración, canales.
- [ ] Confirmar qué operó comercialmente en Los Molinos antes y por qué dejó de hacerlo (pendiente del proyecto).
- [ ] Demo de TuriTop y Bókun con Mercado Pago (ver INTEGRATIONS.md).
