/**
 * Contenido de la landing de lanzamiento.
 *
 * Fuente: brandbook de Espíritu del Lago (Figma SOYM: 01 Brand Foundation, 02 Brand Voice,
 * 10 Launch Strategy) y documentos del proyecto (ficha del ET-228, Aviso de Proyecto).
 *
 * Todo lo que va dentro de ph(...) es un PLACEHOLDER: dato sin confirmar por SOYM.
 * Se ve marcado en el sitio mientras NEXT_PUBLIC_SHOW_PLACEHOLDERS no sea "false".
 * Lista completa de pendientes: docs/STRATEGY.md §13.
 *
 * Etapa 1C: este contenido pasa al CMS (Pages + Experiences). Mientras tanto vive acá.
 */

export type Text = string | { ph: string }
export const ph = (value: string): Text => ({ ph: value })

/** Espacios de foto. `src` vacío = se muestra el placeholder de marca con la indicación de dirección de arte. */
export type PhotoSlot = {
  src?: string
  alt: string
  /** Indicación de dirección de arte (brandbook 07). Se muestra en el placeholder. */
  brief: string
  tone: 'atardecer' | 'lago' | 'sierra' | 'cubierta' | 'obra' | 'detalle'
}

export const photos = {
  hero: { alt: 'El Lago Los Molinos desde la proa del catamarán, con las sierras al fondo', brief: 'Paisaje · golden hour · horizonte bajo con proa', tone: 'atardecer' },
  insight: { alt: 'Vista del lago desde el medio del agua', brief: 'Paisaje · desde el medio del lago, la orilla lejos', tone: 'lago' },
  goldenHour: { alt: 'Copa contra el agua al atardecer', brief: 'Experiencia · copa contra el sol en cubierta', tone: 'atardecer' },
  brunch: { alt: 'Mesa servida en cubierta a la mañana', brief: 'Experiencia · mesa de brunch, luz de mañana', tone: 'cubierta' },
  wine: { alt: 'Copas de vino en cubierta con las sierras de fondo', brief: 'Detalle · copas y sierra, tarde', tone: 'sierra' },
  privados: { alt: 'Grupo brindando en cubierta', brief: 'Experiencia · grupo brindando de espaldas al lago', tone: 'cubierta' },
  barco: { alt: 'El catamarán Espíritu del Lago en construcción en el astillero', brief: 'Obra · casco y puente en el astillero (fotos de oct-2026)', tone: 'obra' },
  tresBahias: { alt: 'Costa de Tres Bahías vista desde el agua', brief: 'Paisaje · costa de Tres Bahías desde el agua', tone: 'sierra' },
  cierre: { alt: 'Atardecer sobre el Lago Los Molinos', brief: 'Paisaje · sol bajando atrás de las sierras', tone: 'atardecer' },
} satisfies Record<string, PhotoSlot>

export const landing = {
  meta: {
    title: 'Espíritu del Lago · Navegá el Lago Los Molinos',
    description:
      'El lago desde adentro. Salidas en catamarán por el Lago Los Molinos, Valle de Calamuchita, con gastronomía y música. Sumate para navegar primero.',
  },

  nav: [
    { label: 'Experiencias', href: '#experiencias' },
    { label: 'El barco', href: '#el-barco' },
    { label: 'El lago', href: '#el-lago' },
    { label: 'Dónde estamos', href: '#donde-estamos' },
  ],

  cta: {
    primary: { label: 'Enterate primero', href: '#lista-de-espera' },
    whatsapp: { label: 'Consultar por WhatsApp', href: '/go/whatsapp?cta=landing' },
  },

  hero: {
    label: 'Lago Los Molinos · Valle de Calamuchita',
    title: 'El lago desde adentro.',
    subtitle: 'Salidas en catamarán con gastronomía, música y la mejor vista del valle. Desde el medio del agua.',
    launch: ph('Primeras salidas: temporada 2026–27'),
  },

  insight: {
    title: 'Miles de personas visitan el lago. Muy pocas lo navegan.',
    body: 'El Lago Los Molinos está ahí, enorme y tranquilo, en el corazón del Valle de Calamuchita. Lo fotografiamos desde la orilla, pasamos las vacaciones mirándolo. Pero casi nadie sabe lo que se siente alejarse de la costa, girar, y ver las sierras desde el medio del agua.',
    closing: 'Espíritu del Lago nació para eso: para abrir el lago.',
  },

  pillars: [
    { icon: 'compass', title: 'Perspectiva', text: 'Alejarse de la orilla y ver el valle como no se ve desde ningún otro lugar.' },
    { icon: 'glass', title: 'Hospitalidad', text: 'Gastronomía artesanal, música elegida y un equipo que se acuerda de tu nombre.' },
    { icon: 'wave', title: 'Naturaleza cuidada', text: 'El lago, las sierras y el silencio son parte de la salida. Los cuidamos como tal.' },
  ],

  experiences: {
    label: 'Experiencias',
    title: 'Una salida para cada momento del día.',
    items: [
      {
        slug: 'golden-hour',
        chip: 'Tarde',
        title: 'Golden Hour',
        text: 'La hora en que el lago se pone de oro. Tabla de la sierra, una copa y el motor apagado en el medio del agua.',
        duration: ph('90 min'),
        schedule: ph('Todos los días de temporada'),
        price: ph('Consultá el precio'),
        photo: 'goldenHour',
      },
      {
        slug: 'brunch-en-el-lago',
        chip: 'Mañana',
        title: 'Brunch en el lago',
        text: 'Medialunas, café y la mejor mesa del valle, que además se mueve.',
        duration: ph('90 min'),
        schedule: ph('Domingos'),
        price: ph('Consultá el precio'),
        photo: 'brunch',
      },
      {
        slug: 'wine-cruise',
        chip: 'Tarde',
        title: 'Wine Cruise',
        text: 'Una selección de vinos servida a bordo, con las sierras de fondo y tiempo para probarlos sin apuro.',
        duration: ph('2 h'),
        schedule: ph('Sábados'),
        price: ph('Consultá el precio'),
        photo: 'wine',
      },
    ],
    note: 'Navegamos de día: todas las salidas vuelven al embarcadero antes de que caiga el sol.',
  },

  timeline: {
    label: 'Cómo es una salida',
    title: 'Noventa minutos, sin apuro.',
    steps: [
      { time: ph('Min 0'), title: 'Embarque', text: 'Te recibimos en el embarcadero por tu nombre. Chalecos para todos y una breve charla de seguridad.' },
      { time: ph('Min 10'), title: 'Zarpamos', text: 'Dejamos la orilla atrás. A los pocos minutos el valle empieza a verse distinto.' },
      { time: ph('Min 35'), title: 'El medio del lago', text: 'Apagamos el motor. Silencio, sierras de los dos lados y el agua alrededor.' },
      { time: ph('Min 45'), title: 'A la mesa', text: 'Llega la gastronomía de la salida y la primera copa. La música acompaña, no tapa.' },
      { time: ph('Min 90'), title: 'De vuelta', text: 'Volvemos al embarcadero con otra idea de Calamuchita.' },
    ],
  },

  boat: {
    label: 'El barco',
    title: 'Un catamarán hecho a medida para este lago.',
    text: 'Diecinueve metros de aluminio naval, dos cubiertas abiertas al paisaje, bar y baños a bordo. Lo están construyendo en el astillero Tecnao y llega al lago en su primera temporada.',
    status: ph('Botadura prevista: diciembre de 2026'),
    specs: [
      { value: '19 m', label: 'de eslora' },
      { value: '2', label: 'cubiertas' },
      { value: ph('70'), label: 'lugares por salida' },
      { value: 'Aluminio', label: 'naval 5083' },
    ],
  },

  lake: {
    label: 'El lago',
    title: 'Un espejo de agua entre sierras, en el corazón del valle.',
    text: 'El Lago Los Molinos está en el Valle de Calamuchita, rodeado de sierras y con una luz que cambia cada hora.',
    facts: [
      { value: ph('21 km²'), label: 'de espejo de agua' },
      { value: ph('70 km'), label: 'de Córdoba capital' },
    ],
    tresBahias: {
      chip: 'Próximamente',
      title: 'Desembarco en Tres Bahías',
      text: 'Una parada en tierra en la reserva de Tres Bahías: senderos, miradores y la costa vista desde adentro. La sumamos cuando esté habilitada.',
    },
  },

  care: {
    label: 'Compromiso ambiental',
    title: 'Navegamos una reserva natural. La cuidamos así.',
    items: [
      { title: 'Cero vertidos', text: 'Las aguas servidas se retienen a bordo y se descargan en tierra.' },
      { title: 'Casco sin antifouling', text: 'Aluminio con protección que no libera pinturas tóxicas al agua.' },
      { title: 'Carga segura', text: 'El combustible llega en camión al muelle y se carga con kit antiderrame a bordo.' },
      { title: 'Velocidad cuidada', text: 'Navegación tranquila cerca de la costa, sin ruido de más.' },
    ],
  },

  private: {
    label: 'Privados y empresas',
    title: 'Cerrá el barco para tu grupo.',
    text: 'Cumpleaños, aniversarios, una propuesta, el cierre de año de tu empresa. Armamos la salida a medida: horario, gastronomía, música y ambientación.',
    capacity: ph('Grupos de 10 a 70 personas'),
    cta: { label: 'Pedí tu propuesta', href: '/go/whatsapp?cta=landing_privados' },
  },

  location: {
    label: 'Dónde estamos',
    title: 'Salimos desde Villa Ciudad Parque.',
    place: ph('Embarcadero del Club Náutico Calamuchita'),
    address: ph('Dirección exacta a confirmar'),
    distances: [
      { from: 'Córdoba capital', time: ph('1 h 15 min') },
      { from: 'Villa General Belgrano', time: ph('20 min') },
      { from: 'Santa Rosa de Calamuchita', time: ph('25 min') },
    ],
  },

  waitlist: {
    label: 'Lista de espera',
    title: 'Sé de los primeros en navegar el lago.',
    text: 'Dejanos tu WhatsApp y te avisamos antes que a nadie cuándo zarpa la primera salida.',
    benefit: ph('Beneficio de apertura para la lista de espera'),
    interests: ['Golden Hour', 'Brunch en el lago', 'Wine Cruise', 'Privado / empresa', 'Todavía no sé'],
  },

  closing: {
    title: 'Vení a ver Calamuchita desde donde nadie la mira.',
  },

  footer: {
    endorsement: 'Una experiencia de SOYM S.A.',
    tagline: 'El lago desde adentro.',
    social: [
      { label: 'Instagram', href: ph('https://instagram.com/[usuario]') },
      { label: 'Facebook', href: ph('https://facebook.com/[pagina]') },
    ],
    contact: [ph('WhatsApp: +54 9 351 000 0000'), ph('hola@navegalosmolinos.com')],
  },
} as const
