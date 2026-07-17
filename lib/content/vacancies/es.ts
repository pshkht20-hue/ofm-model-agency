/**
 * Textos de la sección «Vacantes» — ES.
 * Etapa 2 de docs/VACANCIES-SECTION-PLAN-2026-07-08.md; refleja 1:1 la
 * estructura de ru.ts (la localización base).
 *
 * Líneas rojas (CLAUDE.md): sin palabras «contrato/acuerdo» sobre la agencia;
 * 20–30% solo CON la justificación de la reinversión; cifras de ingresos solo
 * como $15K–$50K de saldo bruto de las páginas de las top-modelos, ancla de
 * principiante $500–1000 el primer mes; solo OnlyFans; tono — atraer, no asustar.
 */
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';

export const VACANCY_UI_ES: VacancyUi = {
  breadcrumbHome: 'Inicio',
  breadcrumbHub: 'Vacantes',
  eyebrow: 'Vacantes de la agencia · 2026',
  postedLabel: 'Publicado',
  updatedLabel: 'Actualizado',
  validThroughLabel: 'Recepción de candidaturas hasta',
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
    'Trabajo en OnlyFans — vacantes actuales de la agencia 2026: chatter, modelo, manager | OFM Model Agency',
  seoDescription:
    'Vacantes abiertas en la agencia de OnlyFans OFM Models: chatter (operador de chat), modelo, manager, asistente, SMM. Trabajo remoto, formación desde cero, postula en 2 minutos.',
  keywords: [
    'trabajo onlyfans',
    'vacantes onlyfans',
    'trabajar en agencia onlyfans',
    'trabajo remoto onlyfans',
    'chatter onlyfans empleo',
  ],
  trustLine:
    '{count} vacantes abiertas · Actualizado {date} · Kyiv, Járkiv, Lviv, Dnipró, Odesa + remoto',
  intro: [
    'Estas son las vacantes de la propia agencia, no un tablón de anuncios: OFM Models incorpora personas a su propio equipo — desde chatters y managers hasta las modelos cuyas páginas gestionamos de principio a fin desde 2022. Todos los puestos son remotos: puedes trabajar desde cualquier ciudad de Ucrania o desde el extranjero.',
    'Elige un puesto en el listado, postula por Telegram o mediante el formulario — respondemos en el día, y empezar lleva unos días sin papeleo.',
  ],
  sections: [
    {
      heading: 'Los roles del equipo: quién hace qué',
      paragraphs: [
        'Detrás de cada página de OnlyFans exitosa trabaja todo un equipo — y casi todos esos roles son de texto y operativos, no de cámara:',
      ],
      bullets: [
        'Chatter (operador de chat) — mensajería con los suscriptores en nombre de la página y venta de PPV con guiones listos; el pago es una tarifa base + % de las ventas del chat; formación desde cero',
        'Modelo de OnlyFans — contenido 2–3 horas al día según un plan acordado; el registro, la promoción, el chat y las finanzas de la página los lleva por completo la agencia',
        'Manager — gestión de 2–4 páginas de modelos: plan de contenido, coordinación del equipo, analítica; $1000–3000/mes',
        'Asistente — la operativa de la agencia: calendario de contenido, hojas de cálculo, gestión de candidaturas; desde $600/mes, sin experiencia',
        'Especialista SMM — las redes sociales de las modelos: Instagram, TikTok, Twitter/X, Reddit; tarifa base + bonos por crecimiento',
      ],
    },
    {
      heading: '¿En qué consiste el trabajo en OnlyFans?',
      paragraphs: [
        'OnlyFans es una plataforma de suscripciones de pago, y «trabajo en OnlyFans» es mucho más que las propias modelos. En equipo con la agencia, la modelo solo se ocupa del contenido: 2–3 horas de grabación al día según un plan listo. Todo lo demás lo hace el equipo: los chatters venden contenido en las conversaciones con los suscriptores, el manager arma el plan de contenido y vigila las cifras, el SMM lleva las redes y trae tráfico, el asistente mantiene los procesos para que nada se pierda.',
        'El dato clave del nicho: el 70–90% de los ingresos de una página vienen de la conversación, no de la suscripción — por eso la vacante más común de la agencia es precisamente la de chatter. Si es tu primera vez en el tema, empieza por la guía [qué es OnlyFans](/blog/chto-takoe-onlyfans) y luego vuelve al listado de arriba.',
      ],
    },
    {
      heading: '¿Cómo conseguir un trabajo en OnlyFans?',
      paragraphs: [
        'Con una agencia es más simple de lo que parece: elige un puesto, escríbenos por Telegram o rellena el formulario, haz una pequeña prueba y una entrevista online. A chatters y asistentes los formamos desde cero — guiones, checklists, un mentor para los primeros turnos; a los managers los formamos a partir de experiencia afín (SMM, producción, proyectos); a las modelos las lanzamos mediante un casting y un onboarding con el equipo.',
        'Lo importante al empezar: ser mayor de 18, una conexión a internet estable y una respuesta honesta sobre cuántas horas por semana puedes dedicar. El chatter necesita además inglés escrito desde B1 — toda la mensajería con los suscriptores es en inglés.',
      ],
    },
    {
      heading: '¿Se puede ganar de verdad en OnlyFans?',
      paragraphs: [
        'Sí — pero con cifras honestas, sin cuentos. Roles de equipo: asistente — desde $600/mes, manager — $1000–3000/mes, chatter — tarifa base + un porcentaje de las ventas de tu propio chat (el rango lo decimos en la entrevista tras la prueba, para no pintar un publicitario «hasta $X»). La modelo recibe el 20–30% del saldo bruto de la página: la agencia financia por completo la promoción, el tráfico y el equipo de chat, y parte de los ingresos de la página se reinvierte en su crecimiento — por eso el saldo y el porcentaje de la modelo crecen juntos.',
        'Referencias por páginas: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — eso es el arranque, no el techo; las páginas de las top-modelos de la agencia hacen $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo. El desglose completo de las cifras está en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'Trabajo en OnlyFans para hombres',
      paragraphs: [
        'La mayoría de los roles de la agencia no dependen del género: se contrata por igual a mujeres y hombres como chatters, managers, especialistas SMM y asistentes. En el chat el suscriptor ve la página de la modelo, no a quien escribe — deciden las habilidades de redacción y venta. Por la experiencia del sector, una parte importante de los chatters fuertes son hombres: más fríos en la negociación del precio y más sistemáticos con los informes.',
        'Si buscas trabajo remoto con inglés — empieza por la vacante de chatter: es la entrada más rápida al nicho, con formación desde cero y un recorrido claro hasta team lead.',
      ],
    },
    {
      heading: 'Trabajo en OnlyFans en Kyiv, Járkiv, Lviv, Dnipró y Odesa',
      paragraphs: [
        'Todas las vacantes de la agencia son remotas: no hace falta oficina, el equipo está distribuido, los procesos viven en Telegram y en hojas de trabajo. Con más frecuencia llegan candidaturas de Kyiv, Járkiv, Lviv, Dnipró y Odesa, pero la ciudad no influye ni en las condiciones ni en el pago — se puede trabajar desde cualquier lugar, incluso desde el extranjero.',
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
        'Ahora hay cinco roles abiertos: chatter (operador de chat), modelo, manager, asistente y especialista SMM. Todos remotos; el listado con fechas y rangos de pago está arriba en esta página.',
    },
    {
      question: '¿Se puede empezar sin experiencia?',
      answer:
        'Sí: a chatters y asistentes los formamos desde cero — guiones, checklists, un mentor; a las modelos las lanzamos mediante un casting y un onboarding. El manager y el especialista SMM necesitan experiencia afín: gestión de proyectos o llevar redes sociales.',
    },
    {
      question: '¿El trabajo en OnlyFans es adecuado para hombres?',
      answer:
        'Sí: chatter, manager, asistente y SMM no dependen del género. En la mensajería el suscriptor ve la página de la modelo, no al autor de los mensajes — deciden las habilidades de redacción y venta, no el género.',
    },
    {
      question: '¿Cuánto paga una agencia de OnlyFans?',
      answer:
        'Asistente — desde $600/mes, manager — $1000–3000/mes, chatter — tarifa base + % de las ventas del chat (rango en la entrevista). La modelo recibe el 20–30% del saldo bruto de la página: la agencia financia la promoción, el tráfico y el equipo y reinvierte parte de los ingresos de la página en su crecimiento.',
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
  seoTitle: 'Vacante de chatter de OnlyFans (operador de chat) — remoto, tarifa base + % de ventas',
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
  formatLabel: 'Remoto · turnos · desde 25 h/sem',
  locationLabel: 'Remoto (toda Ucrania)',
  intro: [
    'La agencia OFM Models incorpora chatters (operadores de chat) de OnlyFans para trabajo remoto. La esencia del trabajo: llevas la mensajería con los suscriptores de las páginas de nuestras modelos con guiones listos y vendes contenido de pago (PPV), mientras nosotros te formamos desde cero y pagamos una tarifa base + un porcentaje de las ventas de tu chat. Totalmente online, empiezas sin experiencia, apto para mujeres y hombres — hace falta inglés escrito desde nivel B1 y disposición a dedicar desde 25 horas por semana.',
    'No es un tablón de anuncios ni un «trabajo en algún sitio de internet»: contratamos para el propio equipo de chat de la agencia, que gestiona páginas de modelos en OnlyFans — del plan de contenido a la promoción y las finanzas. El chat es el corazón de ese sistema: es en la mensajería donde la página gana la mayor parte del dinero, y necesitamos gente que sepa — o quiera aprender a — vender con palabras.',
  ],
  sections: [
    {
      heading: 'Quién es un chatter y por qué es la profesión clave en una agencia de OnlyFans',
      paragraphs: [
        'El chatter es un especialista que se comunica con los suscriptores en nombre de la página de la modelo: responde a los mensajes, mantiene el interés de los fans y vende contenido de pago en los mensajes privados. En OnlyFans el 70–90% de los ingresos de una página vienen precisamente de la mensajería, no de la suscripción — por eso un buen operador de chat literalmente hace la caja de la página.',
        '¿Quieres entender la profesión más a fondo? Tenemos un análisis detallado: [quién es un chatter de OnlyFans y cómo trabaja](/blog/chatter-onlyfans-kto-eto). Y si es la primera vez que oyes hablar de la plataforma, empieza por la guía [qué es OnlyFans](/blog/chto-takoe-onlyfans).',
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
        'Por qué el porcentaje es algo serio: las páginas de las top-modelos bajo nuestra gestión llegan a $15K–$50K brutos al mes, y la mayor parte de esas ventas nacen en la mensajería. Cuanto mejor venda tu chat, mayor es tu porcentaje en cifras absolutas. Cuánto ganan las propias páginas y de qué se compone su ingreso — mira el análisis [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'Cómo es un día de trabajo de un chatter',
      paragraphs: [
        'El turno empieza con el traspaso: lees las notas del operador anterior — qué fans están «calientes», a quién se le prometió un custom, quién cumple años mañana. Luego abres las conversaciones: con los suscriptores habituales la mensajería va en paralelo, los guiones sugieren la estructura, pero la naturalidad y la memoria para los detalles son tuyas. En el prime time de EE. UU. (tarde y noche por Kyiv) el ritmo es el más alto: los nuevos fans llegan en oleadas tras las publicaciones promocionales, y los primeros diez minutos de la conversación deciden si la persona se convierte en comprador.',
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
      '¿No buscas trabajo en el chat, sino tu propia página? Si eres una chica y piensas en tu propio perfil en OnlyFans — [rellena la solicitud de modelo](/join): la agencia se encarga de la promoción, el chat y las finanzas de la página. Puedes estimar tu ingreso potencial en la [calculadora](/calculator).',
  },
};

const MODEL_ES: VacancyContent = {
  slug: 'model-onlyfans',
  role: 'Modelo de OnlyFans',
  h1: 'Vacante de modelo de OnlyFans — trabajo remoto, la página la gestiona por completo la agencia',
  seoTitle: 'Vacante de modelo de OnlyFans — páginas top $15 000–$50 000/mes, la cuenta la lleva la agencia',
  seoDescription:
    'Incorporación de modelos de OnlyFans en la agencia OFM Models: registro, promoción, chat y finanzas los lleva el equipo, tú aportas 2–3 horas de contenido al día. Sin experiencia, empieza sin papeleo.',
  keywords: [
    'vacante modelo onlyfans',
    'trabajo modelo onlyfans',
    'trabajar como modelo onlyfans',
    'trabajo onlyfans para mujeres',
    'vacantes agencia onlyfans',
  ],
  cardSummary:
    'Grabación de contenido 2–3 horas al día según un plan listo — el registro, la promoción, el chat y las finanzas los asume el equipo de la agencia. Sin experiencia.',
  salaryLabel: 'Porcentaje del saldo bruto de la página',
  formatLabel: 'Remoto · contenido 2–3 h/día',
  locationLabel: 'Remoto · Kyiv, Járkiv, Lviv, Dnipró, Odesa',
  intro: [
    'La agencia OFM Models incorpora modelos de OnlyFans para trabajo remoto desde casa. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, y el equipo de la agencia hace todo lo demás — del registro y la verificación de la página a la promoción, la mensajería con los suscriptores y las finanzas. No hacen falta experiencia, portafolio ni equipo profesional: la mayoría de nuestras modelos empezaron desde cero.',
    'Esta es una vacante de la propia agencia, no un anuncio de un tablón: desde 2022 gestionamos páginas de principio a fin — 220+ modelos en cartera. Se puede trabajar desde cualquier ciudad — Kyiv, Járkiv, Lviv, Dnipró, Odesa o desde el extranjero; solo importan ser mayor de 18 y estar dispuesta a grabar con regularidad.',
  ],
  sections: [
    {
      heading: 'Qué asume la agencia',
      bullets: [
        'Registro y verificación de la página, configuración de los sistemas de pago (Paxum, Skrill y otros)',
        'Plan de contenido y análisis: qué grabar y cómo, ángulos y formatos que funcionan',
        'Promoción y tráfico: campañas promocionales, redes sociales, audiencia con capacidad de pago de EE. UU., Canadá y Australia',
        'Mensajería con los suscriptores: el equipo de chat trabaja 24/7 y hace las ventas por ti',
        'Finanzas y pagos según un calendario fijo — no tienes que lidiar con las comisiones de las pasarelas',
        'Analítica y un manager personal que te acompaña del casting a los mejores indicadores',
      ],
      outro: [
        'Qué hace exactamente la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
      ],
    },
    {
      heading: 'Responsabilidades: qué queda de tu parte',
      bullets: [
        'Grabar contenido según el plan 2–3 horas al día — con el smartphone, sin estudio',
        'Estar en contacto con el manager y el equipo en Telegram',
        'Acordar formatos y límites: nada se publica «por defecto»',
        'Mantener la regularidad: la constancia del contenido es el principal factor de crecimiento de la página',
      ],
    },
    {
      heading: 'Requisitos',
      bullets: [
        'Mayor de 18 (la plataforma verifica los documentos en la verificación)',
        'Un smartphone con una cámara decente e internet estable',
        '2–3 horas libres al día y disposición a grabar con regularidad',
        'Responsabilidad: el plan de contenido y los plazos son parte del trabajo',
        'La experiencia y el físico «de modelo» no son obligatorios — el perfil y el plan los definimos de forma individual',
      ],
    },
    {
      heading: 'Pago: porcentaje del saldo bruto de la página',
      paragraphs: [
        'La modelo recibe el 20–30% del saldo bruto total de la página — según el plan de trabajo, el perfil y el equipo. Por qué así: la agencia financia por completo la promoción — promo, tráfico, un equipo de chat 24/7, gestión; tú no pones ni un céntimo, y parte de los ingresos de la página se reinvierte en su crecimiento. Sin reinversión el saldo no crece — por eso el 25% de un saldo creciente en medio año es más que el 100% de un cero en solitario.',
        'Referencias honestas: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — eso es el arranque, no el techo. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático con el equipo, no un punto de partida. De qué se compone el ingreso — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
      ],
    },
    {
      heading: 'Privacidad y límites',
      paragraphs: [
        'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a tu país y a los vecinos para que los conocidos no la vean, mientras la audiencia la traemos de EE. UU., Canadá y Australia. Los formatos de contenido se acuerdan de antemano y se fijan en el plan de contenido — el equipo trabaja estrictamente dentro de tus límites, nada se publica «por defecto».',
      ],
    },
    {
      heading: 'Cómo es un día de trabajo de una modelo',
      paragraphs: [
        'Por la mañana el manager envía el plan del día: por ejemplo, dos sesiones de fotos con referencias listas y un vídeo corto. Grabas a la hora que te venga bien — a la mayoría le bastan 2–3 horas incluyendo la luz y volver a grabar las tomas fallidas. Envías el material al chat de trabajo: el content manager elige lo mejor, prepara las publicaciones y le pasa al equipo de chat las entradas para las ventas.',
        'Después la página funciona sin ti: la promo trae nuevos suscriptores, los chatters responden a los mensajes y venden contenido en la mensajería. Por la tarde puedes echar un vistazo al informe — cuántos fans nuevos, qué compraron, qué formatos funcionaron; una vez por semana el manager repasa las cifras contigo y ajusta el plan. Nada de directos por horario, turnos de noche ni comunicación directa con los suscriptores: la mensajería la cubre por completo el equipo.',
      ],
    },
    {
      heading: 'Ciudades: Kyiv, Járkiv, Lviv, Dnipró, Odesa — y no solo',
      paragraphs: [
        'El trabajo es totalmente remoto: puedes grabar desde casa en cualquier ciudad de Ucrania o desde el extranjero. Recibimos más candidaturas de Kyiv, Járkiv, Lviv, Dnipró y Odesa, pero la ubicación no influye ni en las condiciones ni en el porcentaje — el equipo, el plan y la promoción son iguales para todas.',
      ],
    },
  ],
  hiringHeading: 'Cómo es la selección',
  hiringSteps: [
    {
      title: 'Solicitud',
      text: 'Rellena una solicitud corta en el sitio — 2–3 minutos, gratis y sin compromiso.',
    },
    {
      title: 'Llamada con un manager',
      text: 'Un manager te escribirá por Telegram en 24 horas: responderá a tus preguntas y contará los detalles.',
    },
    {
      title: 'Casting y plan',
      text: 'Hablamos del perfil, los límites, la privacidad y los objetivos — en torno a ellos se arman el plan de contenido y el equipo.',
    },
    {
      title: 'Onboarding',
      text: 'Registro y verificación de la página, configuración de los pagos, primeras grabaciones según el plan.',
    },
    { title: 'Lanzamiento', text: 'La página entra en promo — aparecen las primeras suscripciones y ventas.' },
  ],
  hiringNote:
    'Empezar lleva unos días y no requiere papeleo, y puedes terminar la colaboración en cualquier momento — la página está registrada con tus documentos.',
  faqHeading: 'Preguntas frecuentes sobre la vacante de modelo',
  faq: [
    {
      question: '¿Hace falta experiencia para ser modelo de OnlyFans?',
      answer:
        'No. La mayoría de nuestras modelos empezaron desde cero: en el onboarding damos un plan de contenido, mostramos ángulos y formatos que funcionan, y el equipo asume el marketing y la mensajería con los suscriptores. Tu tarea al empezar es grabar con regularidad según el plan.',
    },
    {
      question: '¿Cuánto recibe una modelo?',
      answer:
        'La modelo recibe el 20–30% del saldo bruto total de la página — según el plan, el perfil y el equipo. La agencia financia la promoción, el tráfico y el equipo de chat y reinvierte parte de los ingresos de la página en su crecimiento, por eso el saldo crece mes a mes. Ningún pago de tu parte: la agencia gana solo cuando ganas tú.',
    },
    {
      question: '¿Cuánto sale el primer mes?',
      answer:
        'Un ancla honesta son $500–1000 de saldo bruto de la página el primer mes: la audiencia apenas se está formando. Cuenta 1–3 meses para el arranque, después el crecimiento depende de la regularidad del contenido. Las páginas de las top-modelos llegan a $15 000–$50 000 brutos al mes — es el resultado de meses de trabajo, no el inicio.',
    },
    {
      question: '¿Es anónimo?',
      answer:
        'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a tu país y a los vecinos para que los conocidos no la vean, mientras la audiencia con capacidad de pago la traemos de EE. UU., Canadá y Australia. Los formatos de contenido también se acuerdan de antemano.',
    },
    {
      question: '¿Quién lleva la página y el dinero?',
      answer:
        'Una agencia de ciclo completo: registro, verificación, sistemas de pago (Paxum, Skrill), control de los ingresos y pagos según un calendario fijo. La página está registrada con tus documentos, y conoces todos los datos de tu perfil.',
    },
    {
      question: '¿Desde qué ciudad se puede trabajar?',
      answer:
        'Desde cualquiera: el trabajo es totalmente remoto. Kyiv, Járkiv, Lviv, Dnipró y Odesa son las ciudades más frecuentes de nuestras modelos, pero las condiciones son iguales para todas, incluidas las que están ahora en el extranjero.',
    },
  ],
  cta: {
    heading: 'Rellenar la solicitud de modelo',
    text: 'La solicitud lleva 2–3 minutos: nombre, edad, ciudad y unas palabras sobre ti. Un manager te escribirá por Telegram en 24 horas — gratis y sin compromiso.',
    primaryLabel: 'Rellenar la solicitud',
    bridgeNote:
      '¿Dudas de las cifras? Estima el potencial de tu página en la [calculadora de ingresos](/calculator) — 4 preguntas, sin registro.',
  },
};

const MANAGER_ES: VacancyContent = {
  slug: 'manager-onlyfans',
  role: 'Manager de OnlyFans',
  h1: 'Vacante de manager de OnlyFans — gestión de cuentas de modelos, remoto',
  seoTitle: 'Vacante de manager de OnlyFans — gestión de cuentas, $1000–$3000/mes',
  seoDescription:
    'La agencia OFM Models busca un manager de OnlyFans: gestión de 2–4 páginas de modelos, plan de contenido, coordinación del equipo de chat, analítica. Remoto, $1000–$3000/mes.',
  keywords: [
    'manager onlyfans',
    'vacante manager onlyfans',
    'trabajar como manager onlyfans',
    'gestion onlyfans',
  ],
  cardSummary:
    'Gestión de 2–4 páginas de modelos: plan de contenido, coordinación del equipo de chat, promo y analítica. Para quienes saben gestionar proyectos.',
  salaryLabel: '$1000–3000/mes',
  formatLabel: 'Remoto · jornada completa',
  locationLabel: 'Remoto (toda Ucrania)',
  intro: [
    'La agencia OFM Models busca un manager de proyectos de OnlyFans para trabajo remoto. El manager es el director de orquesta de la página: reúne el contenido de la modelo, el trabajo del equipo de chat y la promo, vigila las cifras y responde por el crecimiento del saldo bruto de sus páginas. Hay 2–4 páginas de modelos en marcha a la vez.',
    'Es un rol para quienes disfrutan gestionando procesos y personas. La experiencia específica en OnlyFans no es obligatoria: a los candidatos fuertes de SMM, producción, e-commerce o gestión de proyectos los formamos internamente — los procesos están afinados con 220+ modelos desde 2022, y los primeros meses damos un mentor.',
  ],
  sections: [
    {
      heading: 'Responsabilidades',
      bullets: [
        'Gestionar 2–4 páginas de modelos: objetivos, plan de contenido, calendario de publicaciones',
        'Asignar tareas al equipo de chat y a SMM: entradas a los drops, campañas promocionales, coordinación de turnos',
        'Analizar la analítica: suscripciones, ventas, conversión del chat, eficacia de la promo',
        'Estar en contacto con las modelos: feedback sobre el contenido, apoyo a la regularidad, repaso de cifras una vez por semana',
        'Proponer y probar hipótesis de crecimiento: nuevos formatos, precios, canales de promo',
      ],
    },
    {
      heading: 'Requisitos',
      bullets: [
        'Experiencia gestionando proyectos, un equipo o clientes desde un año: SMM, producción, e-commerce, agencias',
        'Inglés desde B1: parte de los materiales y de las herramientas de promo están en inglés',
        'Buena relación con las cifras: hojas de cálculo, embudos y métricas son tu idioma de trabajo',
        'Autoorganización en remoto y disposición a responder por el resultado de las páginas',
        'Un plus, pero no obligatorio: experiencia en el nicho de OnlyFans o el marketing adulto',
      ],
    },
    {
      heading: 'Qué ofrecemos',
      bullets: [
        '$1000–3000 al mes: tarifa fija + bonos por el crecimiento del saldo bruto de tus páginas',
        'Un formato totalmente remoto y planificación flexible del día',
        'Onboarding y un mentor: procesos, guiones, plantillas de informes — todo ya afinado',
        'Crecimiento hasta responsable de dirección: el equipo se expande, y a los responsables los formamos internamente',
      ],
    },
    {
      heading: 'Pago y horario',
      paragraphs: [
        'El rango es de $1000–3000 al mes: la cifra concreta depende de la experiencia, el número de páginas y los resultados. La tarifa es fija, la parte de bono está ligada al crecimiento del saldo bruto de las páginas a tu cargo — las páginas de las top-modelos de la agencia llegan a $15 000–$50 000 brutos al mes, y el manager de una página así gana notablemente por encima de la mitad del rango.',
        'El horario es de jornada completa con planificación flexible: importan el resultado y la disponibilidad para el equipo en las horas clave (el prime time de la tarde de EE. UU.), no «calentar la silla» de 9 a 18.',
      ],
    },
    {
      heading: 'Cómo es un día de trabajo de un manager',
      paragraphs: [
        'El día empieza con las cifras: miras el dashboard de tus páginas — ventas del día, conversión del chat, entrada de suscriptores. Luego breves syncs: con el team lead del chat — sobre las conversaciones de ayer y los planes para el prime time, con SMM — sobre las publicaciones promocionales. Antes del mediodía — trabajo con las modelos: feedback sobre el contenido grabado, ajuste del plan de grabación, acuerdo de un nuevo drop.',
        'Después — una hora de analítica e hipótesis: qué cambiar en los precios, qué formato probar, dónde se atasca el embudo. Por la tarde compruebas la preparación para el prime time de EE. UU.: contenido subido, entradas con los chatters, promo planificada. Una vez por semana — repaso de los resultados con el responsable y planificación de la siguiente: objetivos por cada página, experimentos, qué escalamos.',
      ],
    },
  ],
  hiringHeading: 'Cómo es la selección',
  hiringSteps: [
    {
      title: 'Candidatura',
      text: 'Escríbenos por Telegram: unas palabras sobre tu experiencia de gestión y por qué te interesa el nicho.',
    },
    {
      title: 'Caso de prueba',
      text: 'Un breve análisis de las cifras de una página y un plan de acción para un mes — 1–2 horas de trabajo.',
    },
    { title: 'Entrevista', text: 'Llamada online: experiencia, el caso, el rango y el ámbito de responsabilidad.' },
    {
      title: 'Onboarding',
      text: 'Un mes con un mentor: procesos, herramientas, tu primera página a tu cargo.',
    },
  ],
  hiringNote: 'Respondemos en el día; de la candidatura al onboarding suele pasar menos de una semana.',
  faqHeading: 'Preguntas frecuentes sobre la vacante de manager',
  faq: [
    {
      question: '¿Hace falta experiencia en OnlyFans para ser manager?',
      answer:
        'No: importa más la experiencia gestionando proyectos, un equipo o clientes. Las particularidades del nicho — los procesos, la promo, el trabajo del equipo de chat — las damos en el onboarding con un mentor.',
    },
    {
      question: '¿Cuánto gana un manager de OnlyFans?',
      answer:
        'En nuestro equipo el rango es de $1000–3000 al mes: tarifa fija + bonos por el crecimiento del saldo bruto de las páginas a tu cargo. La cifra concreta la comunicamos en la entrevista según el caso de prueba.',
    },
    {
      question: '¿Es trabajo remoto?',
      answer:
        'Sí, totalmente: el equipo está distribuido, los procesos viven en Telegram y en hojas de trabajo. Importa estar en contacto en las horas clave — el prime time de la tarde de EE. UU.',
    },
    {
      question: '¿En qué se diferencia un manager de un chatter?',
      answer:
        'El chatter vende en la mensajería durante sus turnos; el manager gestiona las páginas en su conjunto: plan, equipo, promo, analítica. Si te resulta más cercana la mensajería y las ventas — mira la vacante de chatter en esta misma sección.',
    },
  ],
  cta: {
    heading: 'Postular a la vacante',
    text: 'Escríbenos por Telegram: tu experiencia de gestión, tu conocimiento del nicho (si lo tienes) y una hora conveniente para una llamada. Respondemos en el día.',
    primaryLabel: 'Escribir por Telegram',
  },
};

const ASSISTANT_ES: VacancyContent = {
  slug: 'assistant-onlyfans',
  role: 'Asistente de la agencia',
  h1: 'Vacante de asistente de agencia de OnlyFans — remoto, sin experiencia',
  seoTitle: 'Vacante de asistente de agencia de OnlyFans — remoto, desde $600/mes, sin experiencia',
  seoDescription:
    'OFM Models busca un asistente: ayuda a los managers, calendario de contenido, hojas de cálculo e informes, primera atención de candidaturas. Remoto, desde $600/mes, sin experiencia — te formamos.',
  keywords: [
    'asistente agencia onlyfans',
    'vacantes onlyfans',
    'trabajo remoto asistente',
    'trabajo online sin experiencia',
  ],
  cardSummary:
    'Ayuda a los managers: calendario de contenido, hojas de cálculo, informes, gestión de candidaturas. Entrada al sector sin experiencia — con crecimiento a manager.',
  salaryLabel: 'desde $600/mes',
  formatLabel: 'Remoto · media jornada o jornada completa',
  locationLabel: 'Remoto (toda Ucrania)',
  intro: [
    'La agencia OFM Models busca un asistente para trabajo remoto. Es el corazón operativo del equipo: ayudas a los managers a llevar las páginas de las modelos — armas el calendario de contenido, llevas hojas de cálculo e informes, preparas materiales para publicar y gestionas las candidaturas entrantes. No hace falta experiencia: te enseñamos todos los procesos en el primer par de semanas.',
    'El rol encaja con quienes quieren entrar al nicho desde cero y crecer: el asistente ve toda la cocina de la agencia desde dentro — del contenido a la promo y la analítica — y en 6–12 meses puede pasar a manager o SMM. El formato es flexible: se puede compaginar con los estudios, empezando desde 20 horas por semana.',
  ],
  sections: [
    {
      heading: 'Responsabilidades',
      bullets: [
        'Llevar el calendario de contenido: recopilar materiales de las modelos, organizarlos en carpetas, vigilar los plazos',
        'Preparar publicaciones: descripciones, etiquetas, programación de posts con plantillas',
        'Actualizar las hojas de trabajo: turnos, informes, checklists del equipo',
        'Gestionar las candidaturas entrantes: primeras respuestas con plantilla, agendar llamadas con un manager',
        'Ayudar al manager con la rutina: recordatorios, recogida de estados, pequeñas tareas del día',
      ],
    },
    {
      heading: 'Requisitos',
      bullets: [
        'Mayor de 18, atención y precisión: la mitad del trabajo es «no perder ni confundir nada»',
        'Buen manejo de Google Sheets y Docs — o disposición a dominarlos rápido',
        'Inglés básico (A2–B1): las interfaces y parte de los materiales están en inglés',
        'Desde 20 horas por semana e internet estable',
        'Actitud tranquila hacia el nicho 18+: el contenido de las modelos es parte de los materiales de trabajo',
      ],
    },
    {
      heading: 'Pago y horario',
      paragraphs: [
        'El inicio es desde $600 al mes a media jornada; al pasar a jornada completa y ampliar tareas la tarifa crece, con revisión cada 3 meses según resultados. El horario es flexible: acordamos «ventanas» diarias de contacto, el resto lo planificas tú.',
        'Es la entrada más simple al sector: el siguiente escalón es manager con un rango de $1000–3000 al mes, y las vacantes de manager las cubrimos en primer lugar con nuestros propios asistentes.',
      ],
    },
    {
      heading: 'Cómo es un día de trabajo de un asistente',
      paragraphs: [
        'La mañana empieza con un checklist: compruebas que el contenido de los plazos de ayer llegó de las modelos, organizas los archivos, marcas los huecos. Luego — publicaciones: con plantillas preparas las descripciones y programas los posts del día. Durante el día gestionas las candidaturas entrantes: respondes con plantilla, aclaras detalles, agendas llamadas para el manager.',
        'Un par de veces al día te coordinas con el manager en Telegram: qué urge, qué mover, dónde hace falta ayuda. Hacia la tarde actualizas las hojas de cálculo — turnos del equipo de chat, estados de las tareas, un mini informe del día. En los días pico (lanzamiento de una página nueva, un gran drop de contenido) el foco se desplaza a preparar los materiales. No hay caos: cada tarea tiene una plantilla y un checklist.',
      ],
    },
  ],
  hiringHeading: 'Cómo es la selección',
  hiringSteps: [
    {
      title: 'Candidatura',
      text: 'Escríbenos por Telegram unas palabras sobre ti: edad, ciudad, cuántas horas por semana estás dispuesto/a a trabajar.',
    },
    { title: 'Prueba', text: 'Una pequeña práctica de 30–40 minutos: una hoja de cálculo + un par de tareas con plantilla.' },
    { title: 'Entrevista', text: 'Una breve llamada online: nos conocemos, hablamos del horario y la tarifa.' },
    {
      title: 'Formación e inicio',
      text: 'La primera semana — con un mentor según checklists, luego por tu cuenta con el apoyo del equipo.',
    },
  ],
  hiringNote:
    'Empezar lleva unos días. Compaginar con los estudios está bien: lo importante es que tus «ventanas» de contacto sean estables.',
  faqHeading: 'Preguntas frecuentes sobre la vacante de asistente',
  faq: [
    {
      question: '¿Se puede trabajar como asistente sin experiencia?',
      answer:
        'Sí, el rol está pensado para empezar desde cero: los procesos están descritos con checklists y plantillas, y la primera semana trabajas con un mentor. Importan más la atención y la constancia que las líneas del CV.',
    },
    {
      question: '¿Cuánto pagan a un asistente?',
      answer:
        'Desde $600 al mes a media jornada, con crecimiento al pasar a jornada completa y ampliar tareas. La tarifa se revisa cada 3 meses. El siguiente escalón es manager con un rango de $1000–3000.',
    },
    {
      question: '¿Tendré que hablar con los suscriptores?',
      answer:
        'No: la mensajería con los fans la lleva el equipo de chat. El asistente trabaja con tareas internas — contenido, hojas de cálculo, candidaturas y calendario.',
    },
    {
      question: '¿Este trabajo es adecuado para hombres?',
      answer:
        'Sí: como en los roles de chatter, manager y SMM, el género no importa — cuentan la precisión y la disciplina.',
    },
  ],
  cta: {
    heading: 'Postular a la vacante',
    text: 'Escríbenos por Telegram: unas palabras sobre ti, las horas por semana y cuándo puedes empezar. Respondemos en el día.',
    primaryLabel: 'Escribir por Telegram',
  },
};

const SMM_ES: VacancyContent = {
  slug: 'smm-onlyfans',
  role: 'Especialista SMM',
  h1: 'Vacante de especialista SMM de agencia de OnlyFans — remoto',
  seoTitle: 'Vacante de especialista SMM de agencia de OnlyFans — redes de las modelos, remoto',
  seoDescription:
    'OFM Models busca un especialista SMM: redes sociales de las modelos (Instagram, TikTok, Twitter/X, Reddit), adaptación de contenido, crecimiento del alcance y tráfico a las páginas. Remoto.',
  keywords: ['smm onlyfans', 'vacante smm onlyfans', 'especialista smm remoto'],
  cardSummary:
    'Redes sociales de las modelos: Instagram, TikTok, Twitter/X, Reddit — adaptación de contenido, publicaciones, crecimiento del alcance y tráfico a las páginas.',
  salaryLabel: 'Tarifa base + bonos (se habla en la entrevista)',
  formatLabel: 'Remoto · horario flexible',
  locationLabel: 'Remoto (toda Ucrania)',
  intro: [
    'La agencia OFM Models busca un especialista SMM para trabajo remoto. La tarea es el tráfico: llevas las redes sociales de las modelos (Instagram, TikTok, Twitter/X, Reddit), adaptas el contenido a las reglas de cada plataforma y conviertes el alcance en suscriptores de las páginas.',
    'La experiencia en el nicho adulto no es obligatoria: importa más el olfato para las plataformas — qué explota en TikTok, cómo funciona Reddit, por qué los posts de plantilla mueren. Las reglas del nicho y la presentación segura las enseñamos.',
  ],
  sections: [
    {
      heading: 'Responsabilidades',
      bullets: [
        'Llevar las cuentas de las modelos en Instagram, TikTok, Twitter/X y Reddit: plan de contenido, publicaciones, stories',
        'Adaptar los materiales a las reglas de las plataformas: presentación segura, evitar lo genérico, tendencias',
        'Hacer crecer el alcance y convertirlo en suscriptores de las páginas de las modelos',
        'Probar combinaciones: formatos, ganchos, horarios de publicación — y registrar los resultados',
      ],
    },
    {
      heading: 'Requisitos',
      bullets: [
        'Experiencia llevando redes sociales — proyectos propios o de clientes, con ejemplos',
        'Comprensión de los algoritmos de TikTok e Instagram Reels',
        'Inglés básico para trabajar con una audiencia internacional',
        'Actitud tranquila hacia el nicho 18+',
      ],
    },
    {
      heading: 'Pago y formato',
      paragraphs: [
        'Tarifa base + bonos por el crecimiento de los indicadores; el rango concreto lo hablamos en la entrevista — depende de la experiencia y el número de proyectos. El horario es flexible, el trabajo totalmente remoto. Dentro — combinaciones listas, análisis y un mentor el primer mes.',
      ],
    },
  ],
  hiringHeading: 'Cómo es la selección',
  hiringSteps: [
    { title: 'Candidatura', text: 'Telegram + ejemplos de trabajos o cuentas que hayas llevado.' },
    { title: 'Prueba', text: 'Una pequeña adaptación de contenido para 1–2 plataformas.' },
    { title: 'Llamada', text: 'Hablamos del rango, los proyectos y el inicio.' },
  ],
  faqHeading: 'Preguntas frecuentes sobre la vacante de SMM',
  faq: [
    {
      question: '¿Hace falta experiencia en el nicho 18+?',
      answer:
        'No: importa más la experiencia haciendo crecer cuentas en TikTok e Instagram. Las particularidades del nicho — las reglas de las plataformas y la presentación segura — las enseñamos.',
    },
    {
      question: '¿Es trabajo remoto?',
      answer:
        'Sí, totalmente, con horario flexible: importan el resultado y la regularidad de las publicaciones, no las horas en línea.',
    },
    {
      question: '¿Cómo postular?',
      answer:
        'Escríbenos por Telegram con ejemplos de cuentas que hayas llevado. Respondemos en el día, después vienen una prueba corta y una llamada.',
    },
  ],
  cta: {
    heading: 'Postular a la vacante',
    text: 'Escríbenos por Telegram con ejemplos de cuentas o casos — respondemos en el día.',
    primaryLabel: 'Escribir por Telegram',
  },
};

export const VACANCIES_ES: Record<VacancySlug, VacancyContent> = {
  'chatter-onlyfans': CHATTER_ES,
  'model-onlyfans': MODEL_ES,
  'manager-onlyfans': MANAGER_ES,
  'assistant-onlyfans': ASSISTANT_ES,
  'smm-onlyfans': SMM_ES,
};
