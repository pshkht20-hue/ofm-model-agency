import type { BlogBlock } from '@/lib/content/blog/types';
import type { BlogLocaleOverlayMap } from '@/lib/content/blog/locale/types';

export function getSpanishBlogOverlay(): Record<
  string,
  { title: string; description: string; keywords: string[]; blocks: BlogBlock[] }
> {
  return ES_OVERLAY;
}

const ES_OVERLAY: BlogLocaleOverlayMap = {
  'kak-vybrat-onlyfans-agentstvo': {
    title: 'Cómo elegir una agencia de OnlyFans: checklist completo 2026',
    description:
      'Guía práctica de OnlyFans management: contrato, comisión, chats, marketing, señales de alerta y preguntas para la primera llamada.',
    keywords: ['cómo elegir agencia onlyfans', 'onlyfans management'],
    blocks: [
      {
        type: 'p',
        text: 'El mercado de OnlyFans management incluye hoy cientos de equipos en todo el mundo: desde agencias con departamento de chat hasta “managers” sin casos. Si eres creadora y buscas una agencia de OnlyFans, no se trata del landing más ruidoso, sino de entender quién controlará tus ingresos, datos y reputación.',
      },
      {
        type: 'h2',
        text: 'Qué debe incluir un management “completo”',
      },
      {
        type: 'p',
        text: 'En 2026, los equipos fuertes suelen cubrir cinco áreas: marketing (tráfico), chats 24/7 (ventas por DM), estrategia de contenido, analítica y protección de la cuenta. Una agencia “solo SMM” sin chats rara vez supera los $5–8k/mes: la mayor parte del ingreso en la plataforma está en los mensajes, no en el precio de suscripción.',
      },
      {
        type: 'ul',
        items: [
          'Marketing: Reddit, X/Twitter, Instagram, TikTok, colaboraciones según nicho',
          'Chats: velocidad de respuesta, PPV, customs, retención de “ballenas”',
          'Contenido: calendario, teasers, alineación feed + exclusivo',
          'Finanzas: informes, LTV, churn, pruebas de precio',
          'Legal y privacidad: accesos, NDA, fugas',
        ],
      },
      {
        type: 'h2',
        text: 'Comisión: qué se considera justo',
      },
      {
        type: 'p',
        text: 'El referente del sector para full-service es aproximadamente 25–40% del ingreso bruto. Por debajo del 20% suele significar servicio recortado; por encima del 45% debe haber producción y PR excepcionales. Cualquier pago anticipado por “entrada” o “configuración” es una señal de alerta clásica.',
      },
      {
        type: 'tip',
        text: 'Consejo: pide por escrito qué incluye el porcentaje. Si el punto es vago en la llamada, seguirá vago en la operación.',
      },
      {
        type: 'h2',
        text: 'Contrato: 6 cláusulas imprescindibles',
      },
      {
        type: 'ul',
        items: [
          'La cuenta de OnlyFans sigue siendo tuya; accesos por roles',
          'Plazo: mes a mes o periodo corto + salida de 30 días',
          'Porcentaje, reporting y frecuencia de pago a la agencia',
          'Quién posee el contenido y qué pasa al rescindir',
          'Confidencialidad y prohibición de publicar sin consentimiento',
          'KPI o al menos formato de informes semanales',
        ],
      },
      {
        type: 'h2',
        text: 'Cómo verificar la agencia antes de firmar',
      },
      {
        type: 'p',
        text: 'Envía la solicitud y valora el tiempo de respuesta. Pide 2–3 referencias (aunque sean cifras de crecimiento anonimizadas). Revisa FAQ y blog: los equipos maduros explican procesos en público. Compara al menos dos empresas.',
      },
      {
        type: 'p',
        text: 'En OFM\'s Model Agency, un manager responde por Telegram en 24 horas tras solicitar en la web; las condiciones se discuten de forma individual, sin cuota de “entrada”. Usa este artículo como base para entrevistar a cualquier equipo.',
      },
    ],
  },
  'chto-delaet-onlyfans-agentstvo': {
    title: 'Qué hace una agencia de OnlyFans: 12 servicios de management',
    description:
      'OnlyFans management desglosado: desde discovery chats hasta marketing en Reddit, analítica y anti-piratería.',
    keywords: ['onlyfans management', 'qué hace agencia onlyfans'],
    blocks: [
      {
        type: 'p',
        text: '“Agencia de OnlyFans” suena amplio. En la práctica, unos equipos solo externalizan chat; otros cubren el ciclo completo como las agencias de talento en música. Aquí van 12 servicios que incluye un management fuerte en 2026 y por qué cada uno impacta el dinero.',
      },
      { type: 'h2', text: '1–4: Tráfico y visibilidad' },
      {
        type: 'ul',
        items: [
          'Estrategia de nicho y posicionamiento (feet, GFE, fitness, cosplay, etc.)',
          'Gestión de X/Twitter—a menudo el canal principal de tráfico adult',
          'Reddit: posts nativos, sin spam de enlaces',
          'Instagram / TikTok: embudo SFW, Reels, Stories sin baneos',
        ],
      },
      { type: 'h2', text: '5–8: Conversión en la plataforma' },
      {
        type: 'ul',
        items: [
          'Perfil: bio, post fijado, mensaje de bienvenida',
          'Discovery chatting—primeras 48–72 h con un nuevo suscriptor',
          'Ventas de PPV y customs por DM',
          'Precios: la suscripción como “puerta”, no como ingreso principal',
        ],
      },
      {
        type: 'tip',
        text: 'En agencias grandes, hasta ~90% del ingreso de muchas cuentas viene de chats y PPV, no de la suscripción mensual.',
      },
      { type: 'h2', text: '9–12: Sistema y protección' },
      {
        type: 'ul',
        items: [
          'Calendario de contenido y días de rodaje',
          'Analítica semanal: churn, ARPPU, embudo',
          'Colaboraciones con otras creadoras',
          'Monitoreo de fugas, DMCA, recomendaciones de anonimato',
        ],
      },
      { type: 'h2', text: 'Solo chat vs full-service' },
      {
        type: 'p',
        text: 'Solo chat es más barato en porcentaje pero no sustituye el marketing: sin entrada de suscriptores, los chatters “venden al vacío”. Full-service cuesta más pero cierra todo el ciclo—tiene sentido si quieres superar $10k/mes y no vivir en los DM.',
      },
      {
        type: 'p',
        text: 'OFM\'s Model Agency trabaja en formato full-service: manager, marketing, chats y estrategia de contenido. Solicitud en la página principal.',
      },
    ],
  },
  'kogda-nuzhno-onlyfans-agentstvo': {
    title: 'Cuándo es momento de contratar una agencia de OnlyFans',
    description:
      'Señales para delegar: burnout en DM, techo de ingresos, sin tiempo para marketing—y cuándo aún es pronto.',
    keywords: ['necesito agencia onlyfans', 'onlyfans management cuándo'],
    blocks: [
      {
        type: 'p',
        text: 'No toda creadora necesita agencia el primer día. Pero hay señales claras de que el modo solo frena el crecimiento—y delegar compensa la comisión del equipo.',
      },
      { type: 'h2', text: '5 señales de que toca delegar' },
      {
        type: 'ul',
        items: [
          'Respondes en DM 6+ horas al día y aun así pierdes ventas por demora',
          'Los ingresos llevan 2–3 meses en meseta con contenido estable',
          'No usas Reddit/X de forma sistemática—“publiqué un par de veces”',
          'Sin calendario de contenido; rodajes caóticos',
          'Miedo a escalar por fugas o doxxing',
        ],
      },
      { type: 'h2', text: 'Cuándo la agencia es aún pronto' },
      {
        type: 'p',
        text: 'Si aún pasas verificación, no defines tu nicho y no estás lista para 10–14 piezas de contenido al mes—primero aclara el posicionamiento. La agencia acelera pero no sustituye tu concepto y disciplina.',
      },
      { type: 'h2', text: 'Cómo calcular el retorno' },
      {
        type: 'p',
        text: 'En simple: si el equipo sube el ingreso bruto 30–50%+, una comisión del 30% aún te deja más neto que en solo. Pide a la agencia un rango de casos en tu nicho, no un promedio “de todos”.',
      },
      {
        type: 'p',
        text: 'OFM trabaja con creadoras en distintas etapas—desde el inicio hasta $20k+. Solicita si te reconoces arriba: veremos un plan sin compromiso.',
      },
    ],
  },
  'onlyfans-agentstvo-moshennichestvo': {
    title: 'Estafas y agencias de OnlyFans: 10 señales de alerta',
    description:
      'Cómo distinguir management profesional de fraude: pagos anticipados, robo de cuenta, promesas falsas de ingresos.',
    keywords: ['estafa agencia onlyfans', 'fraude onlyfans management'],
    blocks: [
      {
        type: 'p',
        text: 'Con el crecimiento de OnlyFans aparecieron “agencias” de un día. La víctima pierde dinero, acceso a la cuenta y contenido. Estas señales indican que conviene cortar la conversación.',
      },
      { type: 'h2', text: 'Señales de alerta' },
      {
        type: 'ul',
        items: [
          'Pidieron pago por “promoción” antes del arranque ($500–2000+)',
          'Prometen $20k/mes fijos sin analizar tu nicho',
          'Exigen una sola contraseña de OnlyFans “por comodidad”',
          'Sin contrato o no muestran plantilla antes del pago',
          'Presión: “firma hoy o perdemos tu plaza”',
          'Publican tus fotos en portfolio sin consentimiento escrito',
          'Solo hablan desde cuenta personal, sin marca de empresa',
          'Reseñas solo en capturas, sin forma de verificar',
          'Comisión “hasta 60%” sin lista transparente de servicios',
          'Amenazas al intentar rescindir el acuerdo',
        ],
      },
      { type: 'h2', text: 'Cómo protegerte' },
      {
        type: 'p',
        text: 'Activa 2FA en OnlyFans; usa roles, no tu contraseña. Guarda los masters del contenido. Lee la cláusula de salida. No envíes cripto por “anuncios” a intermediarios desconocidos.',
      },
      {
        type: 'tip',
        text: 'Una agencia legítima gana con tu crecimiento, no con tu cuota de entrada.',
      },
      {
        type: 'p',
        text: 'OFM no cobra anticipo por “lanzamiento”. La solicitud es gratis: el manager explica condiciones en chat antes de cualquier compromiso.',
      },
    ],
  },
  'onlyfans-agentstvo-ukraina': {
    title: 'Agencia OnlyFans en Ucrania: cómo elegir equipo y evitar estafas',
    description:
      'Guía para creadoras en Ucrania y la diáspora: trabajo remoto, chats 24/7, marketing, señales de alerta y solicitud en OFM.',
    keywords: ['agencia onlyfans ucrania', 'onlyfans agency ukraine'],
    blocks: [
      {
        type: 'p',
        text: 'Ucrania es uno de los mercados OnlyFans más activos en Europa del Este. Buscar «agencia OnlyFans Ucrania» lleva a Layboard y foros donde management profesional y estafa se ven igual. Esta guía explica qué debe incluir un servicio completo y cómo trabaja OFM con creadoras de UA.',
      },
      {
        type: 'h2',
        text: 'Por qué las creadoras de UA eligen agencia',
      },
      {
        type: 'p',
        text: 'Hasta el 85% del ingreso neto suele venir de los DM. Una agencia cubre chats 24/7, tráfico y analítica mientras tú te enfocas en contenido—desde Kyiv, Odesa o en remoto desde la UE.',
      },
      {
        type: 'h2',
        text: 'Señales de alerta',
      },
      {
        type: 'ul',
        items: [
          'Pagos anticipados antes del lanzamiento',
          'Una sola contraseña de OnlyFans',
          'Promesas de ingreso fijo sin análisis',
          'Sin contrato ni NDA',
        ],
      },
      {
        type: 'p',
        text: 'OFM trabaja con creadoras en Ucrania y Europa de forma remota. Solicitud en ofmmodels.com—respuesta en Telegram en 24 h, sin cuota de entrada. Casos reales publicados en el sitio.',
      },
    ],
  },
  'onlyfans-marketing-strategiya-2026': {
    title: 'Marketing de OnlyFans 2026: estrategia completa de crecimiento',
    description:
      'Embudo 2026: nicho, multiplataforma, teasers, retención y métricas—guía de marketing OnlyFans desde la práctica de management.',
    keywords: ['marketing onlyfans', 'promoción onlyfans 2026'],
    blocks: [
      {
        type: 'p',
        text: 'En 2026, OnlyFans es un escaparate saturado: millones de creadoras, algoritmos más duros con enlaces adult y fans que valoran autenticidad por encima del contenido genérico con IA. El marketing ya no es “poner el enlace en la bio”—es un embudo de varias plataformas, contenido y DM.',
      },
      { type: 'h2', text: 'Paso 1: Nicho y marca' },
      {
        type: 'p',
        text: 'Antes del tráfico, define tu suscriptor ideal, tono (GFE, dominatrix, girl-next-door, fitness, cosplay) y límites. El nicho reduce audiencia pero sube conversión y LTV.',
      },
      { type: 'h2', text: 'Paso 2: Embudo multip plataforma' },
      {
        type: 'ul',
        items: [
          'X (Twitter): a menudo la fuente principal—3–5 posts/día, mezcla personalidad y teasers',
          'Reddit: posts nativos en 10–15 subreddits relevantes, sin spam directo',
          'TikTok / Reels: contenido SFW, humor, curiosidad—sin violar reglas',
          'Instagram: Stories diarias, lifestyle, “link in bio” fijado',
        ],
      },
      {
        type: 'tip',
        text: 'En 2026, las top creators rara vez dependen de una red: diversifican tráfico para sobrevivir shadowban o cambios de algoritmo.',
      },
      { type: 'h2', text: 'Paso 3: Contenido que convierte' },
      {
        type: 'p',
        text: 'El feed de OnlyFans es escaparate; los DM son caja. Los teasers deben prometer emoción, no “otra foto más”. Prueba welcome message, post fijado y bundles PPV.',
      },
      { type: 'h2', text: 'Paso 4: Retención y LTV' },
      {
        type: 'p',
        text: 'Una suscripción barata de $3 sin sistema en DM trae muchos fans “muertos”. En 2026 ganan más las que entran en $12–25 con chat fuerte que la carrera por número de subs.',
      },
      { type: 'h2', text: 'Métricas a seguir' },
      {
        type: 'ul',
        items: [
          'Churn mensual',
          'ARPPU—ingreso medio por fan de pago',
          'Tiempo de respuesta en DM',
          'Conversión welcome → primera compra PPV',
          'Fuente de tráfico por UTM/enlaces',
        ],
      },
      {
        type: 'p',
        text: 'Si el marketing consume más tiempo que rodar, es señal de delegar. OFM construye el embudo llave en mano: solicitud en la web, respuesta del manager en 24 h.',
      },
    ],
  },
  'onlyfans-prodvizhenie-reddit-twitter': {
    title: 'Promocionar OnlyFans en Reddit y X (Twitter)',
    description:
      'Práctica 2026: subreddits, calendario de posts, X sin baneos, conversión de perfil—promoción OnlyFans sin spam.',
    keywords: ['onlyfans reddit', 'onlyfans twitter promoción'],
    blocks: [
      {
        type: 'p',
        text: 'Reddit y X siguen siendo canales viables para promoción OnlyFans si no actúas como spammer. Ambos castigan enlaces directos y posts duplicados; premian contenido nativo y perfil reconocible.',
      },
      { type: 'h2', text: 'Reddit: reglas del juego' },
      {
        type: 'ul',
        items: [
          'Lee las reglas de cada subreddit—karma, antigüedad, flairs',
          'Publica contenido, no titulares de “suscríbete a mi OF”',
          'Perfil Reddit = escaparate: bio, fijado, enlace',
          '5–15 subs objetivo mejor que 50 al azar',
          'Variedad: foto, gif, historias en texto',
        ],
      },
      { type: 'h2', text: 'X (Twitter): volumen + personalidad' },
      {
        type: 'p',
        text: 'Mezcla ~60% personalidad (opiniones, BTS, humor), ~20% teasers, ~20% promo. Responde en quote-tweets a cuentas del nicho. Hay shadowban—ten cuenta de respaldo y no pongas enlace en cada post.',
      },
      { type: 'h2', text: 'Puente Reddit/X → OnlyFans' },
      {
        type: 'p',
        text: 'Optimiza el perfil OnlyFans para tráfico frío: bio clara, fijado con mejor contenido, welcome con CTA suave. Las primeras 48 h en DM son críticas—ver nuestro artículo de chats.',
      },
      {
        type: 'tip',
        text: 'Tráfico sin chats es agua en un cubo con fugas: el suscriptor llega y se va sin comprar.',
      },
    ],
  },
  'onlyfans-instagram-tiktok-bez-bana': {
    title: 'Instagram y TikTok para OnlyFans: crecer sin baneos',
    description:
      'Embudo SFW, Reels, reglas de Meta y TikTok, link in bio—cómo traer suscriptores a OnlyFans con seguridad.',
    keywords: ['onlyfans instagram', 'onlyfans tiktok'],
    blocks: [
      {
        type: 'p',
        text: 'Instagram y TikTok no favorecen marketing adult explícito. Siguen siendo discovery potentes si construyes imagen SFW y diriges tráfico por un hub de enlaces (Beacons, Linktree en tu dominio, etc.).',
      },
      { type: 'h2', text: 'Qué publicar' },
      {
        type: 'ul',
        items: [
          'Lifestyle, fitness, moda, humor—dentro de tu nicho',
          'Reels con gancho en los primeros 2 segundos',
          'Stories: encuestas, BTS, “pregúntame”',
          'Sin desnudo que viole las guidelines',
        ],
      },
      { type: 'h2', text: 'Qué evitar' },
      {
        type: 'p',
        text: 'La palabra “OnlyFans” en captions suele disparar moderación. No compres bots. No cambies el tema del perfil de golpe. Calienta cuentas nuevas poco a poco.',
      },
      { type: 'h2', text: 'El embudo' },
      {
        type: 'p',
        text: 'Reels → perfil → enlace → landing/mensaje → OnlyFans. Prueba CTAs en bio (“contenido exclusivo”, “club VIP”). Mide qué red trae fans de pago, no solo clics.',
      },
    ],
  },
  'onlyfans-uderzhanie-podpischikov': {
    title: 'Retención de suscriptores en OnlyFans: churn y LTV',
    description:
      'Por qué se van los fans, cómo bajar el churn y subir LTV con chats, contenido y precios.',
    keywords: ['retención suscriptores onlyfans', 'onlyfans churn'],
    blocks: [
      {
        type: 'p',
        text: 'Captar un suscriptor es caro. Perderlo a los 30 días quema el presupuesto de marketing. En 2026 la retención importa más que la carrera por suscripciones de $3.',
      },
      { type: 'h2', text: 'Por qué se van' },
      {
        type: 'ul',
        items: [
          'Sin contenido nuevo en el feed',
          'Respuestas lentas o plantillas en DM',
          'Sensación de “engaño” tras la promo',
          'PPV agresivo sin calentamiento',
          'Sin personalización para fans activos',
        ],
      },
      { type: 'h2', text: 'Sistema de retención' },
      {
        type: 'p',
        text: 'Mínimo 2–3 posts en feed por semana, un “motivo para quedarse” semanal (exclusivo, serie, aviso de stream). Segmenta fans: nuevo, activo, ballena—scripts distintos en DM. Reactiva antes de la renovación.',
      },
      { type: 'h2', text: 'Métrica de churn' },
      {
        type: 'p',
        text: 'Cuenta el % de bajas sobre la base activa. Si el churn supera 15–20%/mes sin nuevas ballenas, el problema es producto (contenido + chat), no solo anuncios.',
      },
    ],
  },
  'onlyfans-chaty-dm-prodazhi': {
    title: 'Chats y DM en OnlyFans: dónde está el ingreso principal',
    description:
      'Discovery chatting, PPV, customs, velocidad de respuesta y KPIs—guía de ventas por mensajes en OnlyFans.',
    keywords: ['onlyfans chats', 'ventas dm onlyfans', 'onlyfans chatting'],
    blocks: [
      {
        type: 'p',
        text: 'Muchas principiantes miran el precio de suscripción; creadoras y agencias con experiencia saben que el ingreso bruto suele construirse 70–90% en DM: tips, PPV, customs, renovaciones. No son “respuestas amables”; es un embudo de ventas por etapas.',
      },
      { type: 'h2', text: '4 fases del discovery chatting' },
      { type: 'h3', text: '1. Welcome (primeros minutos)' },
      {
        type: 'p',
        text: 'Saludo personalizado, no copia-pega. Objetivo: abrir diálogo y saber de dónde viene el fan.',
      },
      { type: 'h3', text: '2. Discovery (hasta 24 h)' },
      {
        type: 'p',
        text: 'Preguntas sobre preferencias, calificación suave de “ballena”. Gran parte del gasto ocurre en las primeras 48–72 h—no se puede perder esa ventana.',
      },
      { type: 'h3', text: '3. Connection (1–2 días)' },
      {
        type: 'p',
        text: 'Vínculo emocional, inside jokes, exclusividad—sin manipulación, pero con intención.',
      },
      { type: 'h3', text: '4. Offer (PPV / custom)' },
      {
        type: 'p',
        text: 'Oferta concreta según el interés del fan, no un blast “cómpralo todos”.',
      },
      { type: 'h2', text: 'Velocidad de respuesta = dinero' },
      {
        type: 'p',
        text: 'Equipos fuertes apuntan a responder en minutos en horas activas. Una hora de retraso es lead frío. De noche cubren turnos de chat.',
      },
      {
        type: 'tip',
        text: 'Si duermes mientras llegan subs de pago por anuncios—literalmente quemas presupuesto publicitario.',
      },
      { type: 'h2', text: 'IA + humano' },
      {
        type: 'p',
        text: 'Algunas agencias usan IA en fases tempranas y pasan ballenas a personas. Pregunta quién escribe en tu voz y cómo controlan el tono.',
      },
      {
        type: 'p',
        text: 'OFM gestiona chats 24/7 dentro del management—los detalles se discuten al conectar.',
      },
    ],
  },
  'onlyfans-tseny-podpiska-ppv': {
    title: 'Precios en OnlyFans: suscripción, PPV y customs',
    description:
      'Cómo fijar la suscripción en 2026, packs PPV, prueba gratis y por qué pierde la carrera por subs de $3.',
    keywords: ['precios onlyfans', 'onlyfans ppv', 'precio suscripción onlyfans'],
    blocks: [
      {
        type: 'p',
        text: 'El pricing en OnlyFans es psicología y matemáticas. La suscripción es entrada al embudo; PPV y tips son margen. En 2026 la carrera al fondo en $3 pierde frente a entrada $12–25 con DM fuerte.',
      },
      { type: 'h2', text: 'Suscripción: tres modelos' },
      {
        type: 'ul',
        items: [
          'Sub de pago—MRR estable, requiere feed constante',
          'Página gratis + PPV—más tráfico, más carga de chat',
          'De pago + trial / promo—pruebas de conversión',
        ],
      },
      { type: 'h2', text: 'PPV y customs' },
      {
        type: 'p',
        text: 'El PPV funciona con narrativa (“continuación de la serie de ayer”). Los customs son premium por personalización; limita slots para no quemarte. El chat debe compartir una misma lista de precios.',
      },
      { type: 'h2', text: 'Errores de pricing' },
      {
        type: 'ul',
        items: [
          'Demasiado barato → muchos no pagan en DM',
          'Demasiado caro al inicio sin marca',
          'Descuentos cada semana—entrenas a esperar rebajas',
          'Mismo precio PPV para novato y ballena',
        ],
      },
      {
        type: 'tip',
        text: 'Prueba precio cada 6–8 semanas con tráfico nuevo; no cambies todo a la vez.',
      },
    ],
  },
  'onlyfans-skolko-zarabatyvayut-modeli': {
    title: '¿Cuánto se gana en OnlyFans? Cifras realistas',
    description:
      'Rangos de ingreso para principiantes y top creators, de qué depende y por qué las agencias no pueden garantizar una cifra.',
    keywords: ['cuánto gana onlyfans', 'ingresos modelo onlyfans'],
    blocks: [
      {
        type: 'p',
        text: 'Titulares de “$100k al mes” venden cursos, pero la mediana del mercado es más modesta. Un desglose honesto evita decepciones y ayuda a planificar.',
      },
      { type: 'h2', text: 'Referencias por etapa (bruto)' },
      {
        type: 'ul',
        items: [
          'Primeros 1–3 meses: $500–3 000 con trabajo sistemático',
          '$3 000–10 000: contenido estable + al menos 1–2 canales de tráfico',
          '$10 000–30 000+: chats y marketing fuertes, nicho claro',
          '$30 000+: top de nicho, equipo, marca, a menudo 2+ años de sistema',
        ],
      },
      {
        type: 'p',
        text: 'En OFM, parte de las modelos está en $12 000–35 000+/mes—no es garantía ni mediana de toda solicitud.',
      },
      { type: 'h2', text: 'De qué depende el ingreso' },
      {
        type: 'ul',
        items: [
          'Nicho y competencia',
          'Horas de contenido y disciplina',
          'Calidad de marketing y chats',
          'Límites y sostenibilidad (burnout = caída)',
        ],
      },
      { type: 'h2', text: 'Neto vs bruto' },
      {
        type: 'p',
        text: 'OnlyFans cobra comisión de plataforma. La agencia, la suya. Impuestos según tu jurisdicción. Cuenta lo que te queda, no el bruto del landing.',
      },
    ],
  },
  'onlyfans-agentstvo-dlya-nachinayushchih': {
    title: 'OnlyFans para principiantes: empezar con agencia o en solo',
    description:
      'Arranque paso a paso: verificación, nicho, primer contenido, marketing y cuándo sumar management.',
    keywords: ['cómo empezar onlyfans', 'onlyfans para principiantes'],
    blocks: [
      {
        type: 'p',
        text: 'Empezar en OnlyFans en 2026 es técnicamente más fácil que hace cinco años—y más duro en competencia. La plataforma está madura; el suscriptor es exigente. Aquí va el orden de pasos que reduce el caos, vayas solo o con agencia.',
      },
      { type: 'h2', text: 'Etapa 0: Reglas y límites' },
      {
        type: 'p',
        text: 'Solo 18+, verificación de identidad según reglas. Decide de antemano: cara / sin cara, formatos, tabúes. Los límites son la base de la marca.',
      },
      { type: 'h2', text: 'Etapa 1: Nicho y empaque' },
      {
        type: 'p',
        text: 'Nombre, estilo visual, tono. Escribe la bio de OnlyFans para un suscriptor frío de Reddit, no “hola, soy nueva”.',
      },
      { type: 'h2', text: 'Etapa 2: Pack de contenido inicial' },
      {
        type: 'ul',
        items: [
          '10–20 posts en feed antes de promo activa',
          'Fijado + welcome message',
          '2–3 plantillas PPV para chats',
          'Un set “hero” para avatar y banners',
        ],
      },
      { type: 'h2', text: 'Etapa 3: Primer tráfico' },
      {
        type: 'p',
        text: 'Elige 1–2 canales (a menudo X + Reddit). No te disperses en cinco redes la primera semana. Los primeros subs prueban el embudo—no sentencian el ingreso a largo plazo.',
      },
      { type: 'h2', text: 'Cuándo conectar agencia al inicio' },
      {
        type: 'p',
        text: 'Tiene sentido si quieres el camino en 7–14 días con equipo, no aprender errores de DM de noche. OFM recibe principiantes: solicitud en la web, manager por Telegram en 24 h.',
      },
    ],
  },
  'onlyfans-kontent-plan-i-syomki': {
    title: 'Plan de contenido OnlyFans: rodajes, feed y PPV',
    description:
      'Cómo planificar rodajes, cuánto contenido al mes necesitas y cómo enlazar feed con ventas en DM.',
    keywords: ['plan de contenido onlyfans', 'estrategia de contenido onlyfans'],
    blocks: [
      {
        type: 'p',
        text: 'El contenido es combustible del embudo. Sin calendario vives en “urgente, rodar algo”—y los chatters no pueden vender PPV que no existe.',
      },
      { type: 'h2', text: 'Volumen mínimo' },
      {
        type: 'p',
        text: 'Agencias fuertes apuntan a 10–14 piezas en feed al mes como base, más exclusivos para PPV. Más está bien si no cae la calidad.',
      },
      { type: 'h2', text: 'Día de rodaje' },
      {
        type: 'ul',
        items: [
          'Lista de sets con antelación (3–5 looks por sesión)',
          'Luz, fondo, props—setups repetibles ahorran tiempo',
          'Clasifica al momento: feed / PPV / promo redes',
          'Batching: un rodaje = dos semanas de contenido',
        ],
      },
      { type: 'h2', text: 'Enlace feed + DM' },
      {
        type: 'p',
        text: 'Un post en feed es teaser de la historia; en DM—“continuación solo aquí por $X”. Las series retienen mejor que fotos sueltas.',
      },
      {
        type: 'tip',
        text: 'Guarda masters en local y nube—no entregues la única copia a la agencia.',
      },
    ],
  },
  'onlyfans-oshibki-novichkov': {
    title: '15 errores de principiante en OnlyFans (y cómo corregirlos)',
    description:
      'Fallos típicos: precios, chats, marketing, burnout—checklist que ahorra meses.',
    keywords: ['errores onlyfans', 'consejos onlyfans principiantes'],
    blocks: [
      {
        type: 'p',
        text: 'La mayoría de cuentas atascadas en $500–1k repiten los mismos errores. No es “mal contenido”—falta de sistema.',
      },
      {
        type: 'ul',
        items: [
          'Sub de $3 sin estrategia en DM',
          'Sin welcome message',
          'Respuesta en DM a las 2–3 horas',
          'Promo solo en Stories, sin Reddit/X',
          'Spam de enlace en cada post',
          'Sin mejor contenido fijado',
          'Rodar sin plan → burnout',
          'Contenido nivel PPV gratis en el feed',
          'Ignorar ballenas en el chat',
          'Sin seguimiento de churn',
          'Comprar bots y engagement falso',
          'Mezclar cuenta personal y laboral en redes',
          'Protección débil de archivos fuente',
          'Trabajar con la primera agencia sin contrato',
          'Compararse con el top 1% en el primer mes',
        ],
      },
      { type: 'h2', text: 'Por dónde empezar a corregir' },
      {
        type: 'p',
        text: 'Semana 1: perfil + welcome. Semana 2: un canal de tráfico. Semana 3: velocidad DM o chat manager. Semana 4: prueba de precio PPV. O solicita en OFM y recorre el camino con un manager.',
      },
    ],
  },
  'onlyfans-anonimnost-i-bezopasnost': {
    title: 'Anonimato y seguridad en OnlyFans',
    description:
      'Doxxing, fugas, accesos, 2FA, geo-bloques y DMCA—guía práctica de protección para creadoras.',
    keywords: ['anonimato onlyfans', 'seguridad onlyfans'],
    blocks: [
      {
        type: 'p',
        text: 'OnlyFans es un negocio con riesgo elevado de privacidad. No existe anonimato total, pero el proceso reduce probabilidad de doxxing y fugas.',
      },
      { type: 'h2', text: 'Higiene técnica' },
      {
        type: 'ul',
        items: [
          '2FA en OnlyFans y correo',
          'SIM/email separados para trabajo',
          'No usar Instagram personal para promo',
          'VPN cuando haga falta—no es panacea',
          'Marcas de agua en previews',
        ],
      },
      { type: 'h2', text: 'Trabajar con agencia' },
      {
        type: 'p',
        text: 'Aclara: quién ve la contraseña, roles/VPS de OnlyFans, offboarding si sale personal, NDA, política de fugas. No dejes que la agencia use tu contenido en portfolio sin consentimiento.',
      },
      { type: 'h2', text: 'Fugas y DMCA' },
      {
        type: 'p',
        text: 'Monitorea sitios de piratería, presenta DMCA, reacciona rápido. Agencias como OFM incluyen orientación de protección en el management.',
      },
      { type: 'h2', text: 'Seguridad psicológica' },
      {
        type: 'p',
        text: 'Límites con fans, listas de bloqueo, no confundir relaciones “reales” con ventas. El burnout es riesgo de seguridad como un hackeo.',
      },
    ],
  },
  'onlyfans-rabota-bez-lica': {
    title: 'OnlyFans sin mostrar la cara: estrategia no-face',
    description:
      'Cómo construir marca, marketing y confianza sin cara—nichos, ángulos, voz, anonimato.',
    keywords: ['onlyfans sin cara', 'onlyfans no face'],
    blocks: [
      {
        type: 'p',
        text: 'No-face no es techo de ingresos—es otro branding. Las cuentas exitosas compensan con reconocimiento corporal, voz, estética y series recurrentes.',
      },
      { type: 'h2', text: 'Nichos que funcionan' },
      {
        type: 'ul',
        items: [
          'Feet y fetish parcial',
          'POV y primera persona sin cara',
          'Máscaras, cosplay, personajes',
          'ASMR / voz + contenido de audio',
          'Fitness / lifestyle sin cara',
        ],
      },
      { type: 'h2', text: 'Marketing no-face' },
      {
        type: 'p',
        text: 'Reddit y X funcionan bien cuando el foco es contenido, no “personalidad influencer”. Instagram es más difícil—construye código visual (color, ángulo, tatuaje/accesorio como ancla de marca).',
      },
      { type: 'h2', text: 'Riesgos' },
      {
        type: 'p',
        text: 'Fondo de habitación, tatuajes, voz—todo puede doxxear. Alinea encuadre y reglas de limpieza de metadatos con tu agencia.',
      },
      {
        type: 'p',
        text: 'OFM trabaja con modelos no-face—definimos estrategia en la solicitud.',
      },
    ],
  },
};
