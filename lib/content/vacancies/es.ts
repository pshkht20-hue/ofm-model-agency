/**
 * Textos de la sección «Vacantes» — ES.
 * Etapa 2 de docs/VACANCIES-SECTION-PLAN-2026-07-08.md; refleja 1:1 la
 * estructura de ru.ts (la localización base).
 *
 * Líneas rojas (CLAUDE.md): sin palabras «contrato/acuerdo» sobre la agencia;
 * solo OnlyFans; tono — atraer, no asustar.
 * Política de vacantes 25.07.2026 (for-girls + modelCard): rango visible
 * $3 000–10 000/mes (espacios como separadores de miles), SIN porcentajes/
 * gross/reinversión ni reservas, sin enlaces a /calculator; los detalles de
 * dinero van a Telegram; estilo — job board breve (bullets de beneficios).
 * $15 000–50 000 solo como balances de páginas top, nunca como garantía.
 */
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';

export const VACANCY_UI_ES: VacancyUi = {
  breadcrumbHome: 'Inicio',
  breadcrumbHub: 'Vacantes',
  eyebrow: 'Vacantes de la agencia · 2026',
  postedLabel: 'Publicado',
  updatedLabel: 'Actualizado',
  validThroughLabel: 'Recepción de candidaturas hasta',
  activeUntilLabel: 'Activa hasta',
  directEmployer: 'Empleador directo · agencia OFM',
  geoClusterHeading: 'Trabajo de modelo por país',
  salaryLabel: 'Pago',
  formatLabel: 'Formato',
  locationLabel: 'Ubicación',
  remoteLabel: 'Remoto',
  respondCta: 'Postular',
  detailsCta: 'Ver la vacante',
  backToHub: 'Todas las vacantes',
  openBadge: 'Abierta',
  cityNames: {
    kyiv: 'Kyiv',
    kharkiv: 'Járkiv',
    lviv: 'Lviv',
    dnipro: 'Dnipró',
    odesa: 'Odesa',
  },
};

export const VACANCY_HUB_ES: VacancyHubContent = {
  h1: 'Vacantes actuales en OFM Model Agency',
  seoTitle:
    'Trabajo en OnlyFans — vacantes 2026: chatter y modelo',
  seoDescription:
    'Vacantes de la agencia OnlyFans: chatter y modelo — $3 000–10 000/mes. Trabajo remoto, formación desde cero, postula en 2 minutos. Europa, EE. UU. y todo el mundo.',
  keywords: [
    'trabajo onlyfans',
    'vacantes onlyfans',
    'trabajar en agencia onlyfans',
    'trabajo remoto onlyfans',
    'chatter onlyfans empleo',
  ],
  trustLine:
    '{count} roles abiertos · Actualizado {date} · Europa, EE. UU., Canadá y todo el mundo · remoto',
  intro: [
    'Estas son las vacantes de la propia agencia, no un tablón de anuncios: OFM Models incorpora personas a su propio equipo — desde chatters hasta las modelos cuyas páginas gestionamos de principio a fin desde 2022. Ambos puestos son totalmente remotos: puedes trabajar desde cualquier lugar — Europa, EE. UU., Canadá, Latinoamérica o cualquier otro país del mundo.',
    'Elige un puesto abajo, postula por Telegram o mediante el formulario — respondemos en el día, y empezar lleva unos días sin papeleo.',
  ],
  sections: [
    {
      heading: 'Dos roles abiertos: chatter y modelo',
      paragraphs: [
        'Ahora mismo hay dos roles clave abiertos en la agencia — y son opuestos por el tipo de trabajo: la modelo se ocupa del contenido, el chatter de la mensajería y las ventas:',
      ],
      bullets: [
        'Chatter (operador de chat) — mensajería con los suscriptores en nombre de la página y venta de PPV con guiones listos; el pago es una tarifa base + % de las ventas del chat; formación desde cero, también para hombres',
        'Modelo de OnlyFans — contenido 2–3 horas al día según un plan listo; ingresos $3 000–10 000/mes, y del registro, la promoción, el chat y el crecimiento de la página se encarga por completo el equipo. Elige tu país en la [página «Trabajo de modelo»](/vacancies/model)',
      ],
    },
    {
      heading: '¿En qué consiste el trabajo en OnlyFans?',
      paragraphs: [
        'OnlyFans es una plataforma de suscripciones de pago, y «trabajo en OnlyFans» es mucho más que las propias modelos. En equipo con la agencia, la modelo solo se ocupa del contenido: 2–3 horas de grabación al día según un plan listo. Todo lo demás lo hace el equipo de la agencia: los chatters venden contenido en las conversaciones con los suscriptores, la gestión arma el plan de contenido y vigila las cifras, y la promo trae tráfico con capacidad de pago.',
        'El dato clave del nicho: el 70–90% de los ingresos de una página vienen de la conversación, no de la suscripción — por eso el rol de chatter es la segunda vacante clave de la agencia junto a la de modelo. Si es tu primera vez en el tema, empieza por la guía [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli) y luego vuelve a los roles de arriba.',
      ],
    },
    {
      heading: '¿Cómo conseguir un trabajo en OnlyFans?',
      paragraphs: [
        'Con una agencia es más simple de lo que parece: elige un puesto, escríbenos por Telegram o rellena el formulario, haz una pequeña prueba (para el chatter) y una entrevista online. A los chatters los formamos desde cero — guiones, checklists, un mentor para los primeros turnos; a las modelos las lanzamos mediante un casting y un onboarding con el equipo, que asume la página por completo.',
        'Lo importante al empezar: ser mayor de 18, una conexión a internet estable y una respuesta honesta sobre cuántas horas por semana puedes dedicar. El chatter necesita además inglés escrito desde B1 — toda la mensajería con los suscriptores es en inglés.',
      ],
    },
    {
      heading: '¿Se puede ganar de verdad en OnlyFans?',
      paragraphs: [
        'Sí — pero con cifras honestas, sin cuentos. Chatter: tarifa base + un porcentaje de las ventas de tu propio chat (el rango lo decimos en la entrevista tras la prueba, para no pintar un publicitario «hasta $X»). Modelo: ingresos de $3 000 a $10 000/mes, las top-modelos superan los $10 000 — tu rango personal y el plan te los mostramos por Telegram.',
        'Referencias por páginas: los saldos de las páginas de las top-modelos de la agencia llegan a $15 000–50 000 al mes — detrás de esas cifras está el trabajo sistemático de todo el equipo: promoción, chat y gestión. El desglose completo de las cifras está en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'Trabajo en OnlyFans para hombres',
      paragraphs: [
        'El rol de chatter no depende del género: se contrata por igual a mujeres y hombres como operadores de chat. En el chat el suscriptor ve la página de la modelo, no a quien escribe — deciden las habilidades de redacción y venta. Por la experiencia del sector, una parte importante de los chatters fuertes son hombres: más fríos en la negociación del precio y más sistemáticos con los informes.',
        'Si buscas trabajo remoto con inglés — empieza por la vacante de chatter: es la entrada más rápida al nicho, con formación desde cero y un recorrido claro hasta team lead.',
      ],
    },
    {
      heading: 'Trabajo remoto en OnlyFans en Europa, EE. UU. y todo el mundo',
      paragraphs: [
        'Todas las vacantes de la agencia son remotas: no hace falta oficina, el equipo está distribuido, los procesos viven en Telegram y en hojas de trabajo. Incorporamos gente de toda Europa, EE. UU., Canadá, Latinoamérica y más — ni la ciudad ni el país influyen en las condiciones o en el pago; solo necesitas una conexión a internet estable.',
      ],
    },
    {
      heading: 'En qué se diferencian las vacantes de la agencia de los anuncios de un tablón',
      paragraphs: [
        'Postulas directamente al equipo con el que vas a trabajar: sin intermediarios, sin reventa de perfiles ni «curadores» con comisión. Cada rol tiene formación, un mentor y un recorrido de crecimiento claro — a los team leads y responsables los formamos internamente. Respondemos en el día, y si un puesto ya está cubierto, lo diremos con honestidad y volveremos cuando se abra de nuevo.',
      ],
    },
  ],
  faqHeading: 'Preguntas frecuentes sobre trabajar en una agencia de OnlyFans',
  faq: [
    {
      question: '¿El trabajo en OnlyFans es legal?',
      answer:
        'Sí. OnlyFans es una plataforma legal, y los roles de la agencia son trabajo remoto normal: mensajería, gestión, redes sociales, contenido. Todo se hace con una audiencia adulta dentro de las reglas de la plataforma.',
    },
    {
      question: '¿Qué vacantes tiene la agencia de OnlyFans?',
      answer:
        'Ahora hay dos roles abiertos: chatter (operador de chat) y modelo. Ambos remotos; las tarjetas de los roles están arriba en esta página, y cada país de modelo tiene sus condiciones en la página «Trabajo de modelo».',
    },
    {
      question: '¿Se puede empezar sin experiencia?',
      answer:
        'Sí: a los chatters los formamos desde cero — guiones, checklists, un mentor; a las modelos las lanzamos mediante un casting y un onboarding, y el equipo lleva la página por completo (promo, chat, finanzas). Solo hace falta ser mayor de 18, tener internet estable y estar dispuesta a trabajar con regularidad.',
    },
    {
      question: '¿El trabajo en OnlyFans es adecuado para hombres?',
      answer:
        'Sí: chatter, manager, asistente y SMM no dependen del género. En la mensajería el suscriptor ve la página de la modelo, no al autor de los mensajes — deciden las habilidades de redacción y venta, no el género.',
    },
    {
      question: '¿Cuánto paga una agencia de OnlyFans?',
      answer:
        'Chatter — tarifa base + % de las ventas de tu propio chat (rango en la entrevista tras la prueba). Modelo — de $3 000 a $10 000/mes; las páginas top de la agencia alcanzan saldos de $15 000–50 000/mes. Tu rango personal y el plan te los mostramos por Telegram.',
    },
    {
      question: '¿Es trabajo remoto?',
      answer:
        'Sí, todos los roles son totalmente remotos. Hace falta una conexión a internet estable y horas acordadas en línea; la ciudad y el país no importan.',
    },
    {
      question: '¿Con qué rapidez respondéis a una candidatura?',
      answer:
        'En el día. Después vienen una prueba corta (para chatter, manager y SMM), una entrevista online y la formación: de la candidatura al primer turno suele pasar menos de una semana.',
    },
  ],
  modelCard: {
    role: 'Modelo de OnlyFans',
    cardSummary:
      'Contenido 2–3 horas al día según un plan listo — del registro, la promoción, el chat y las finanzas se encarga por completo el equipo de la agencia.',
    salaryLabel: '$3 000–10 000/mes',
    formatLabel: 'Remoto · contenido 2–3 h/día',
    locationLabel: 'Remoto · Europa, EE. UU., Canadá y todo el mundo',
  },
  cta: {
    heading: '¿No encontraste tu rol?',
    text: 'Escríbenos por Telegram unas palabras sobre ti y sobre lo que sabes hacer: el equipo crece, y parte de los roles se abren antes de llegar al listado.',
    primaryLabel: 'Escribir por Telegram',
  },
};

const CHATTER_ES: VacancyContent = {
  slug: 'chatter-onlyfans',
  role: 'Chatter / operador de chat',
  h1: 'Trabajo de chatter de OnlyFans — vacante remota de operador de chat',
  seoTitle: 'Vacante de chatter OnlyFans — remoto, tarifa + % de ventas',
  seoDescription:
    'Vacante de chatter de OnlyFans en la agencia OFM Models: trabajo remoto en el chat, formación desde cero, tarifa base + % de ventas, desde 25 h/sem. También para hombres. ¡Postula!',
  keywords: [
    'chatter onlyfans',
    'chatter onlyfans empleo',
    'operador de chat onlyfans',
    'trabajo chat onlyfans',
    'trabajo onlyfans para hombres',
    'trabajar como chatter onlyfans',
  ],
  cardSummary:
    'Mensajería con los suscriptores de las páginas de modelos con guiones listos y venta de PPV. Formación desde cero, inglés desde B1, también para hombres.',
  salaryLabel: 'Tarifa base + % de las ventas del chat',
  chips: [
    'Formación desde cero',
    'En remoto',
    'Turnos flexibles',
    'Tarifa base + % de ventas',
    'Inglés desde B1',
    'Hombres bienvenidos',
  ],
  formatLabel: 'Remoto · turnos · desde 25 h/sem',
  locationLabel: 'Remoto · Europa, EE. UU., Canadá y todo el mundo',
  intro: [
    'La agencia OFM Models incorpora chatters (operadores de chat) de OnlyFans para trabajo remoto. La esencia del trabajo: llevas la mensajería con los suscriptores de las páginas de nuestras modelos con guiones listos y vendes contenido de pago (PPV), mientras nosotros te formamos desde cero y pagamos una tarifa base + un porcentaje de las ventas de tu chat. Totalmente online, empiezas sin experiencia, apto para mujeres y hombres — hace falta inglés escrito desde nivel B1 y disposición a dedicar desde 25 horas por semana.',
    'No es un tablón de anuncios ni un «trabajo en algún sitio de internet»: contratamos para el propio equipo de chat de la agencia, que gestiona páginas de modelos en OnlyFans — del plan de contenido a la promoción y las finanzas. El chat es el corazón de ese sistema: es en la mensajería donde la página gana la mayor parte del dinero, y necesitamos gente que sepa — o quiera aprender a — vender con palabras.',
  ],
  sections: [
    {
      heading: 'Quién es un chatter y por qué es la profesión clave en una agencia de OnlyFans',
      paragraphs: [
        'El chatter es un especialista que se comunica con los suscriptores en nombre de la página de la modelo: responde a los mensajes, mantiene el interés de los fans y vende contenido de pago en los mensajes privados. En OnlyFans el 70–90% de los ingresos de una página vienen precisamente de la mensajería, no de la suscripción — por eso un buen operador de chat literalmente hace la caja de la página.',
        '¿Quieres entender mejor cómo funciona el trabajo por dentro? Mira cómo se estructuran [los chats y las ventas por DM](/blog/onlyfans-chaty-dm-prodazhi). Y si es la primera vez que oyes hablar de la plataforma, empieza por la guía [trabajo de modelo en OnlyFans](/blog/rabota-modelyu-onlyfans).',
      ],
    },
    {
      heading: 'Responsabilidades: qué harás cada día',
      bullets: [
        'Llevar la mensajería con los suscriptores en inglés en nombre de la modelo — con guiones listos, en su tono y sus límites',
        'Vender contenido PPV (fotos y vídeos de pago en privado), customs y propinas — te damos guiones y precios',
        'Fidelizar a los fans: recordar detalles de las conversaciones, recuperar suscriptores «enfriados», felicitar por ocasiones',
        'Trabajar por turnos — el horario se acuerda; los turnos de tarde y noche para el prime time de EE. UU. se pagan mejor',
        'Llevar un informe sencillo: turno, ventas, notas sobre los fans — en las hojas de trabajo del equipo',
      ],
      outro: [
        'Cómo funcionan las ventas en los mensajes privados y por qué generan el grueso de los ingresos de la página — lo analizamos en el artículo [cómo los chats y los DM generan ventas en OnlyFans](/blog/onlyfans-chaty-dm-prodazhi).',
      ],
    },
    {
      heading: 'Qué ofrecemos',
      bullets: [
        'Trabajo remoto desde cualquier ciudad — solo necesitas un portátil e internet estable',
        'Formación desde cero: una base de guiones, análisis de conversaciones reales, un mentor durante el periodo de prueba — no hace falta experiencia en el nicho',
        'Pago = tarifa base + % de las ventas de tu chat: tus ingresos no tienen techo rígido',
        'Un recorrido profesional claro hasta chatter sénior y team lead — formamos a los responsables internamente',
        'Un horario por turnos que de verdad puedes compaginar con los estudios u otra ocupación',
        'Equipo y apoyo: chats de trabajo, análisis de conversaciones difíciles, nada de «apáñatelas tú»',
      ],
    },
    {
      heading: 'Requisitos: a quién buscamos',
      bullets: [
        'Inglés desde B1: toda la mensajería es en inglés (no hace falta hablar — solo escribir)',
        'Desde 25 horas por semana: el chat debe funcionar de forma estable, «una hora al día» no sirve',
        'Mayor de 18',
        'Texto escrito correcto y rapidez: en un turno llevas decenas de conversaciones en paralelo',
        'Interés por las ventas y la comunicación: empatía, paciencia, saber escuchar al interlocutor',
        'Disciplina y confidencialidad: trabajamos con páginas de modelos y datos de los fans',
        'La experiencia en ventas, soporte o mensajería es un plus, pero no obligatoria: lo principal lo enseñamos',
      ],
    },
    {
      heading: 'Trabajo en OnlyFans para hombres: también se contrata a chicos como chatters',
      paragraphs: [
        'Sí. El género no importa en esta profesión: el suscriptor ve la página de la modelo, no a quien responde. Lo que importa es cómo escribes y vendes. Por la experiencia del sector, una parte importante de los chatters fuertes son hombres: más fríos en la negociación del precio y más sistemáticos con los informes. Así que si eres un chico y buscas trabajo remoto con inglés — esta es una de las pocas vacantes del nicho de OnlyFans donde se te espera igual que a las chicas.',
      ],
    },
    {
      heading: 'Pago: tarifa base + porcentaje de las ventas del chat',
      paragraphs: [
        'El esquema es transparente: una tarifa fija por turnos + un porcentaje de las ventas que hizo tu chat. Las cifras concretas dependen del horario, la experiencia y los resultados de la prueba — las comunicamos en la entrevista para nombrar tu rango real, no un publicitario «hasta $X».',
        'Por qué el porcentaje es algo serio: las páginas de las top-modelos bajo nuestra gestión llegan a $15 000–50 000 al mes, y la mayor parte de esas ventas nacen en la mensajería. Cuanto mejor venda tu chat, mayor es tu porcentaje en cifras absolutas. Cuánto ganan las propias páginas y de qué se compone su ingreso — mira el análisis [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'Cómo es un día de trabajo de un chatter',
      paragraphs: [
        'El turno empieza con el traspaso: lees las notas del operador anterior — qué fans están «calientes», a quién se le prometió un custom, quién cumple años mañana. Luego abres las conversaciones: con los suscriptores habituales la mensajería va en paralelo, los guiones sugieren la estructura, pero la naturalidad y la memoria para los detalles son tuyas. En el prime time de EE. UU. (tarde y noche en Europa) el ritmo es el más alto: los nuevos fans llegan en oleadas tras las publicaciones promocionales, y los primeros diez minutos de la conversación deciden si la persona se convierte en comprador.',
        'En las horas tranquilas — trabajo con la base: recuperas suscriptores «enfriados», preparas las entradas al nuevo drop de contenido, actualizas las notas. Una vez por turno te coordinas con el team lead — el análisis de una conversación difícil o de un guion nuevo lleva 10–15 minutos. Cierras el turno con un breve informe: ventas, conversión, observaciones sobre los fans — el siguiente operador empezará con esas notas. Al principio llevar muchas conversaciones a la vez resulta poco familiar, pero los guiones y los turnos de prueba quitan el caos en un par de semanas.',
      ],
    },
    {
      heading: 'Crecimiento profesional: de becario a team lead',
      paragraphs: [
        'El recorrido en el equipo es así: becario → chatter → chatter sénior → team lead. El chatter sénior lleva las conversaciones VIP y a los fans más difíciles, el team lead gestiona los turnos, forma a los nuevos y responde por los indicadores de la dirección. A los team leads no los contratamos de fuera — los formamos a partir de nuestros propios chatters, por eso el recorrido es real, no una línea en una oferta de empleo.',
      ],
    },
  ],
  hiringHeading: 'Cómo es la selección: sin burocracia',
  hiringSteps: [
    { title: 'Candidatura', text: 'Escríbenos por Telegram o rellena un formulario corto — 2–3 minutos.' },
    {
      title: 'Prueba',
      text: 'Una pequeña conversación en inglés según un guion: miramos el idioma y el olfato para las ventas.',
    },
    { title: 'Entrevista online', text: 'Nos conocemos, hablamos del horario, la tarifa y el porcentaje.' },
    { title: 'Formación', text: 'Guiones, reglas, turnos de prueba con un mentor.' },
    { title: 'Primer turno', text: 'Entras en el horario con el apoyo de un mentor — y ya estás en el equipo.' },
  ],
  hiringNote:
    'Empezar lleva unos días, sin papeleo. Y con honestidad: si tras la formación ves que la mensajería no es lo tuyo, solo lo dices y te vas en cualquier momento — sin retenciones ni condiciones incómodas.',
  faqHeading: 'Preguntas frecuentes sobre trabajar como chatter',
  faq: [
    {
      question: 'Chatter de OnlyFans — ¿qué tipo de trabajo es?',
      answer:
        'El chatter es el operador de chat de OnlyFans: lleva la mensajería con los suscriptores en nombre de la página de la modelo, responde a los mensajes y vende contenido de pago (PPV) en los privados. Es un trabajo a caballo entre las ventas y la comunicación: la suscripción da solo una pequeña parte de los ingresos de la página, lo principal se gana en el chat.',
    },
    {
      question: '¿Se puede trabajar como chatter de OnlyFans sin experiencia?',
      answer:
        'Sí. Formamos desde cero: guiones, análisis de conversaciones, un mentor y turnos de prueba. Importan más que las líneas del CV el inglés escrito desde B1, la disciplina y las ganas de aprender a vender en la mensajería.',
    },
    {
      question: '¿El trabajo en el chat de OnlyFans es legal?',
      answer:
        'Sí: es trabajo remoto como especialista en mensajería y ventas online. No publicas contenido ni llevas tu propia página — solo te comunicas con la audiencia adulta de la plataforma dentro de sus reglas. OnlyFans es una plataforma legal, y la mensajería y las ventas son un trabajo normal de atención al cliente.',
    },
    {
      question: '¿El trabajo en OnlyFans es adecuado para hombres?',
      answer:
        'Sí, se contrata por igual a mujeres y hombres como chatters: los suscriptores ven la página de la modelo, no al autor de los mensajes. Una parte importante de los operadores de chat fuertes del sector son hombres. Deciden las habilidades de redacción y venta, no el género.',
    },
    {
      question: '¿Qué nivel de inglés necesita un operador de chat?',
      answer:
        'Escrito B1 y superior: hace falta escribir rápido y correctamente, entender el argot y el humor. No hace falta inglés hablado — no hay llamadas, solo texto. Comprobamos el nivel con una prueba corta, no con certificados.',
    },
    {
      question: '¿Cuánto gana un chatter de OnlyFans?',
      answer:
        'El ingreso se compone de una tarifa fija por turnos y un porcentaje de las ventas de tu chat, por eso no hay techo rígido: más ventas — mayor cifra. El rango concreto lo comunicamos en la entrevista tras la prueba — depende del horario, los turnos y el nivel.',
    },
  ],
  cta: {
    heading: 'Postular a la vacante',
    text: 'Escríbenos por Telegram unas palabras sobre ti: tu nivel de inglés, experiencia en ventas o mensajería (si la tienes) y cuántas horas por semana estás dispuesto/a a trabajar. Respondemos en el día.',
    primaryLabel: 'Escribir por Telegram',
    bridgeNote:
      '¿No buscas trabajo en el chat, sino tu propia página? Si eres una chica y piensas en tu propio perfil en OnlyFans — [rellena la solicitud de modelo](/join): la agencia se encarga de la promoción, el chat y las finanzas de la página, y la solicitud lleva 2–3 minutos.',
  },
};
const FOR_GIRLS_ES: VacancyContent = {
  slug: 'for-girls',
  role: 'Trabajo online para chicas',
  h1: 'Trabajo online para chicas — vacantes remotas en la agencia OFM Models',
  seoTitle: 'Trabajo online para chicas — $3 000–10 000/mes remoto',
  seoDescription:
    'Trabajo online para chicas en OFM Models: modelo de OnlyFans u operadora de soporte. $3 000–10 000/mes, remoto, sin experiencia, con formación. ¡Postula en 2 minutos!',
  keywords: [
    'trabajo para chicas',
    'trabajo online para chicas',
    'trabajo para mujeres online',
    'trabajo remoto para chicas',
    'trabajo online para chicas sin experiencia',
  ],
  cardSummary:
    'Trabajo remoto para chicas 18+: de $3 000 a $10 000/mes, contenido 2–3 horas al día — de todo lo demás se encarga el equipo de la agencia.',
  salaryLabel: '$3 000–10 000/mes',
  chips: [
    'Sin experiencia',
    'Remoto',
    'Horario flexible',
    'Formación desde cero',
    'Soporte 24/7',
    '18+',
  ],
  formatLabel: 'Remoto · desde 2–3 h/día',
  locationLabel: 'Remoto · Ucrania, Europa y todo el mundo',
  intro: [
    'La agencia OFM Models busca chicas 18+ para trabajo remoto: la dirección [modelo de OnlyFans](/vacancies/model) paga de $3 000 a $10 000/mes por 2–3 horas de contenido al día, mientras el equipo se encarga por completo del registro, la promoción, los mensajes y las finanzas de la página.',
    '¿Prefieres no grabar? Existe la [vacante de operador de chat](/vacancies/chatter-onlyfans) — escríbenos por Telegram y elegimos tu dirección y te contamos las condiciones.',
  ],
  sections: [
    {
      heading: 'Qué obtienes',
      bullets: [
        'Ingresos de $3 000 a $10 000/mes; las páginas top de la agencia alcanzan balances de $15 000–50 000/mes',
        'El equipo lleva la página: registro, promo, chat y finanzas dejan de ser tu problema',
        'Contenido 2–3 horas al día según un plan listo — compatible con estudios u otro empleo',
        'Formación y onboarding desde cero — no hacen falta experiencia ni portafolio',
        'Mánager disponible 24/7 — de lo técnico a los límites personales',
        'Arranque en unos días: sin cuotas y sin papeleo',
      ],
      outro: [
        'Las condiciones por país están en la página [«Trabajo de modelo»](/vacancies/model); los detalles, por Telegram.',
      ],
    },
    {
      heading: 'Qué necesitamos de ti',
      bullets: [
        'Edad 18+ — estricto, sin excepciones',
        '2–3 horas al día con horario flexible',
        'Un smartphone con buena cámara e internet estable',
        'Disposición a seguir el plan junto con el equipo',
      ],
    },
    {
      heading: 'Seguridad y privacidad',
      bullets: [
        'El registro, la verificación y los pagos se gestionan del lado de la agencia',
        'Los moderadores filtran los mensajes; los límites del contenido los defines tú',
        'Todo el trabajo ocurre online, dentro de la plataforma — sin encuentros ni «servicios offline»',
      ],
    },
  ],
  hiringHeading: 'Cómo es el arranque: 4 pasos',
  hiringSteps: [
    {
      title: 'Solicitud',
      text: 'Escríbenos por Telegram o rellena el formulario del sitio — 2–3 minutos, sin CV.',
    },
    {
      title: 'Llamada',
      text: 'Un breve encuentro online: respondemos tus preguntas y elegimos la dirección — modelo u operadora.',
    },
    {
      title: 'Plan',
      text: 'El equipo arma tu plan personal: imagen, contenido y promoción de la página.',
    },
    {
      title: 'Primeros pagos',
      text: 'Lanzamos la página — el primer dinero suele llegar ya en el primer mes.',
    },
  ],
  hiringNote:
    'Arranque sin papeleo: sin cuotas, sin «depósitos» y sin obligación de quedarte — puedes salir en cualquier momento.',
  faqHeading: 'Preguntas frecuentes sobre el trabajo online para chicas',
  faq: [
    {
      question: '¿Desde qué edad se puede empezar?',
      answer:
        'Estrictamente desde los 18 años — es la regla de la plataforma y de la agencia, sin excepciones. No hay límite superior: en el nicho triunfan chicas tanto de 20 como de 35+.',
    },
    {
      question: '¿Puedo empezar sin experiencia?',
      answer:
        'Sí: recibes un plan de contenido listo, formación y un equipo que se encarga del registro, la promoción y las finanzas de la página.',
    },
    {
      question: '¿Cuánto se puede ganar?',
      answer:
        'El rango visible es de $3 000 a $10 000/mes; las páginas top de la agencia alcanzan balances de $15 000–50 000/mes. Las condiciones exactas para tu caso te las contamos por Telegram.',
    },
    {
      question: '¿Cuándo llega el primer dinero?',
      answer:
        'Normalmente ya en el primer mes de la página. Cómo funcionan los pagos te lo explicamos por Telegram antes del arranque.',
    },
    {
      question: '¿Es legal?',
      answer:
        'Sí. OnlyFans es una plataforma legal, y el trabajo de modelo y de operadora es un empleo remoto común: contenido, mensajería, ventas online. Todo el trabajo es con audiencia adulta y dentro de las reglas de la plataforma.',
    },
    {
      question: '¿Es obligatorio grabar o hay trabajo sin cámara?',
      answer:
        'Lo hay: la operadora de soporte no crea contenido en absoluto — es trabajo de mensajería con los suscriptores de las páginas de las modelos. Y si eliges la dirección de modelo, el formato y los límites del contenido se acuerdan contigo antes del arranque.',
    },
  ],
  cta: {
    heading: 'Empieza con un mensaje en Telegram',
    text: 'Escríbenos unas palabras sobre ti: edad, ciudad y qué dirección te interesa — modelo u operadora de soporte. Respondemos en el día.',
    primaryLabel: 'Escribir por Telegram',
    bridgeNote:
      '¿Ya decidiste que quieres tu propia página? [Rellena la solicitud de modelo](/join) — el equipo asume el registro, la promoción y las finanzas.',
  },
};

export const VACANCIES_ES: Record<VacancySlug, VacancyContent> = {
  'chatter-onlyfans': CHATTER_ES,
  'for-girls': FOR_GIRLS_ES,
};
