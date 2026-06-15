import type { BlogBlock } from "@/lib/content/blog/types";
import type { BlogLocaleOverlayMap } from "@/lib/content/blog/locale/types";

export function getSpanishBlogOverlay(): Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    blocks: BlogBlock[];
  }
> {
  return ES_OVERLAY;
}

const ES_OVERLAY: BlogLocaleOverlayMap = {
  "kak-vybrat-onlyfans-agentstvo": {
    title: "Cómo elegir agencia OnlyFans: checklist 2026 sin estafas",
    description:
      "Guía práctica de OnlyFans management: contrato, comisión, chats, marketing, señales de alerta y preguntas para la primera llamada.",
    keywords: ["cómo elegir agencia onlyfans", "onlyfans management"],
    blocks: [
      {
        type: "p",
        text: "El mercado de OnlyFans management incluye hoy cientos de equipos en todo el mundo: desde agencias con departamento de chat hasta “managers” sin casos. Si eres creadora y buscas una agencia de OnlyFans, no se trata del landing más ruidoso, sino de entender quién controlará tus ingresos, datos y reputación.",
      },
      {
        type: "h2",
        text: "Qué debe incluir un management “completo”",
      },
      {
        type: "p",
        text: "En 2026, los equipos fuertes suelen cubrir cinco áreas: marketing (tráfico), chats 24/7 (ventas por DM), estrategia de contenido, analítica y protección de la cuenta. Una agencia “solo SMM” sin chats rara vez supera los $5–8k/mes: la mayor parte del ingreso en la plataforma está en los mensajes, no en el precio de suscripción.",
      },
      {
        type: "ul",
        items: [
          "Marketing: Reddit, X/Twitter, Instagram, TikTok, colaboraciones según nicho",
          "Chats: velocidad de respuesta, PPV, customs, retención de “ballenas”",
          "Contenido: calendario, teasers, alineación feed + exclusivo",
          "Finanzas: informes, LTV, churn, pruebas de precio",
          "Legal y privacidad: accesos, NDA, fugas",
        ],
      },
      {
        type: "h2",
        text: "Comisión: qué se considera justo",
      },
      {
        type: "p",
        text: "El referente del sector para full-service es aproximadamente 25–40% del ingreso bruto. Por debajo del 20% suele significar servicio recortado; por encima del 45% debe haber producción y PR excepcionales. Cualquier pago anticipado por “entrada” o “configuración” es una señal de alerta clásica.",
      },
      {
        type: "tip",
        text: "Consejo: pide por escrito qué incluye el porcentaje. Si el punto es vago en la llamada, seguirá vago en la operación.",
      },
      {
        type: "h2",
        text: "Contrato: 6 cláusulas imprescindibles",
      },
      {
        type: "ul",
        items: [
          "La cuenta de OnlyFans sigue siendo tuya; accesos por roles",
          "Plazo: mes a mes o periodo corto + salida de 30 días",
          "Porcentaje, reporting y frecuencia de pago a la agencia",
          "Quién posee el contenido y qué pasa al rescindir",
          "Confidencialidad y prohibición de publicar sin consentimiento",
          "KPI o al menos formato de informes semanales",
        ],
      },
      {
        type: "h2",
        text: "Cómo verificar la agencia antes de firmar",
      },
      {
        type: "p",
        text: "Envía la solicitud y valora el tiempo de respuesta. Pide 2–3 referencias (aunque sean cifras de crecimiento anonimizadas). Revisa FAQ y blog: los equipos maduros explican procesos en público. Compara al menos dos empresas.",
      },
      {
        type: "p",
        text: "En OFM's Model Agency, un manager responde por Telegram en 24 horas tras solicitar en la web; las condiciones se discuten de forma individual, sin cuota de “entrada”. Usa este artículo como base para entrevistar a cualquier equipo.",
      },
    ],
  },
  "chto-delaet-onlyfans-agentstvo": {
    title: "Qué hace una agencia de OnlyFans: 12 servicios de management",
    description:
      "12 servicios OnlyFans management 2026: discovery chats, Reddit, X, TikTok, analítica y anti-piratería — qué impulsa el net y cuándo conectar OFM.",
    keywords: ["onlyfans management", "qué hace agencia onlyfans"],
    blocks: [
      {
        type: "p",
        text: "“Agencia de OnlyFans” suena amplio. En la práctica, unos equipos solo externalizan chat; otros cubren el ciclo completo como las agencias de talento en música. Aquí van 12 servicios que incluye un management fuerte en 2026 y por qué cada uno impacta el dinero.",
      },
      { type: "h2", text: "1–4: Tráfico y visibilidad" },
      {
        type: "ul",
        items: [
          "Estrategia de nicho y posicionamiento (feet, GFE, fitness, cosplay, etc.)",
          "Gestión de X/Twitter—a menudo el canal principal de tráfico adult",
          "Reddit: posts nativos, sin spam de enlaces",
          "Instagram / TikTok: embudo SFW, Reels, Stories sin baneos",
        ],
      },
      { type: "h2", text: "5–8: Conversión en la plataforma" },
      {
        type: "ul",
        items: [
          "Perfil: bio, post fijado, mensaje de bienvenida",
          "Discovery chatting—primeras 48–72 h con un nuevo suscriptor",
          "Ventas de PPV y customs por DM",
          "Precios: la suscripción como “puerta”, no como ingreso principal",
        ],
      },
      {
        type: "tip",
        text: "En agencias grandes, hasta ~90% del ingreso de muchas cuentas viene de chats y PPV, no de la suscripción mensual.",
      },
      { type: "h2", text: "9–12: Sistema y protección" },
      {
        type: "ul",
        items: [
          "Calendario de contenido y días de rodaje",
          "Analítica semanal: churn, ARPPU, embudo",
          "Colaboraciones con otras creadoras",
          "Monitoreo de fugas, DMCA, recomendaciones de anonimato",
        ],
      },
      { type: "h2", text: "Solo chat vs full-service" },
      {
        type: "p",
        text: "Solo chat es más barato en porcentaje pero no sustituye el marketing: sin entrada de suscriptores, los chatters “venden al vacío”. Full-service cuesta más pero cierra todo el ciclo—tiene sentido si quieres superar $10k/mes y no vivir en los DM.",
      },
      {
        type: "p",
        text: "OFM's Model Agency trabaja en formato full-service: manager, marketing, chats y estrategia de contenido. Solicitud en la página principal.",
      },
    ],
  },
  "kogda-nuzhno-onlyfans-agentstvo": {
    title: "Cuándo es momento de contratar una agencia de OnlyFans",
    description:
      "Cuándo contratar agencia OnlyFans: burnout en DM, techo de ingresos, sin tiempo para marketing — y cuándo es pronto. Checklist + solicitud en OFM.",
    keywords: ["necesito agencia onlyfans", "onlyfans management cuándo"],
    blocks: [
      {
        type: "p",
        text: "No toda creadora necesita agencia el primer día. Pero hay señales claras de que el modo solo frena el crecimiento—y delegar compensa la comisión del equipo.",
      },
      { type: "h2", text: "5 señales de que toca delegar" },
      {
        type: "ul",
        items: [
          "Respondes en DM 6+ horas al día y aun así pierdes ventas por demora",
          "Los ingresos llevan 2–3 meses en meseta con contenido estable",
          "No usas Reddit/X de forma sistemática—“publiqué un par de veces”",
          "Sin calendario de contenido; rodajes caóticos",
          "Miedo a escalar por fugas o doxxing",
        ],
      },
      { type: "h2", text: "Cuándo la agencia es aún pronto" },
      {
        type: "p",
        text: "Si aún pasas verificación, no defines tu nicho y no estás lista para 10–14 piezas de contenido al mes—primero aclara el posicionamiento. La agencia acelera pero no sustituye tu concepto y disciplina.",
      },
      { type: "h2", text: "Cómo calcular el retorno" },
      {
        type: "p",
        text: "En simple: si el equipo sube el ingreso bruto 30–50%+, una comisión del 30% aún te deja más neto que en solo. Pide a la agencia un rango de casos en tu nicho, no un promedio “de todos”.",
      },
      {
        type: "p",
        text: "OFM trabaja con creadoras en distintas etapas—desde el inicio hasta $20k+. Solicita si te reconoces arriba: veremos un plan sin compromiso.",
      },
    ],
  },
  "onlyfans-agentstvo-moshennichestvo": {
    title: "Agencia OnlyFans estafas: 10 señales de fraude 2026",
    description:
      "Cómo distinguir management profesional de fraude: pagos anticipados, robo de cuenta, promesas falsas de ingresos.",
    keywords: ["estafa agencia onlyfans", "fraude onlyfans management"],
    blocks: [
      {
        type: "p",
        text: "Con el crecimiento de OnlyFans aparecieron “agencias” de un día. La víctima pierde dinero, acceso a la cuenta y contenido. Estas señales indican que conviene cortar la conversación.",
      },
      { type: "h2", text: "Señales de alerta" },
      {
        type: "ul",
        items: [
          "Pidieron pago por “promoción” antes del arranque ($500–2000+)",
          "Prometen $20k/mes fijos sin analizar tu nicho",
          "Exigen una sola contraseña de OnlyFans “por comodidad”",
          "Sin contrato o no muestran plantilla antes del pago",
          "Presión: “firma hoy o perdemos tu plaza”",
          "Publican tus fotos en portfolio sin consentimiento escrito",
          "Solo hablan desde cuenta personal, sin marca de empresa",
          "Reseñas solo en capturas, sin forma de verificar",
          "Comisión “hasta 60%” sin lista transparente de servicios",
          "Amenazas al intentar rescindir el acuerdo",
        ],
      },
      { type: "h2", text: "Cómo protegerte" },
      {
        type: "p",
        text: "Activa 2FA en OnlyFans; usa roles, no tu contraseña. Guarda los masters del contenido. Lee la cláusula de salida. No envíes cripto por “anuncios” a intermediarios desconocidos.",
      },
      {
        type: "tip",
        text: "Una agencia legítima gana con tu crecimiento, no con tu cuota de entrada.",
      },
      {
        type: "p",
        text: "OFM no cobra anticipo por “lanzamiento”. La solicitud es gratis: el manager explica condiciones en chat antes de cualquier compromiso.",
      },
    ],
  },
  "onlyfans-agentstvo-ukraina": {
    title: "Agencia OnlyFans Ucrania 2026 — elegir sin estafas",
    description:
      "Guía para creadoras en Ucrania y la diáspora: trabajo remoto, chats 24/7, marketing, señales de alerta y solicitud en OFM.",
    keywords: ["agencia onlyfans ucrania", "onlyfans agency ukraine"],
    blocks: [
      {
        type: "p",
        text: "Ucrania es uno de los mercados OnlyFans más activos en Europa del Este. Buscar «agencia OnlyFans Ucrania» lleva a Layboard y foros donde management profesional y estafa se ven igual. Esta guía explica qué debe incluir un servicio completo y cómo trabaja OFM con creadoras de UA.",
      },
      {
        type: "h2",
        text: "Por qué las creadoras de UA eligen agencia",
      },
      {
        type: "p",
        text: "Hasta el 85% del ingreso neto suele venir de los DM. Una agencia cubre chats 24/7, tráfico y analítica mientras tú te enfocas en contenido—desde Kyiv, Odesa o en remoto desde la UE.",
      },
      {
        type: "h2",
        text: "Señales de alerta",
      },
      {
        type: "ul",
        items: [
          "Pagos anticipados antes del lanzamiento",
          "Una sola contraseña de OnlyFans",
          "Promesas de ingreso fijo sin análisis",
          "Sin contrato ni NDA",
        ],
      },
      {
        type: "p",
        text: "OFM trabaja con creadoras en Ucrania y Europa de forma remota. Solicitud en ofmmodels.com—respuesta en Telegram en 24 h, sin cuota de entrada. Casos reales publicados en el sitio.",
      },
    ],
  },
  "onlyfans-marketing-strategiya-2026": {
    title: "Marketing de OnlyFans 2026: estrategia completa de crecimiento",
    description:
      "Marketing OnlyFans 2026: embudo, nicho, X, Reddit, TikTok, retención y métricas — estrategia completa de crecimiento desde OFM management.",
    keywords: ["marketing onlyfans", "promoción onlyfans 2026"],
    blocks: [
      {
        type: "p",
        text: "En 2026, OnlyFans es un escaparate saturado: millones de creadoras, algoritmos más duros con enlaces adult y fans que valoran autenticidad por encima del contenido genérico con IA. El marketing ya no es “poner el enlace en la bio”—es un embudo de varias plataformas, contenido y DM.",
      },
      { type: "h2", text: "Paso 1: Nicho y marca" },
      {
        type: "p",
        text: "Antes del tráfico, define tu suscriptor ideal, tono (GFE, dominatrix, girl-next-door, fitness, cosplay) y límites. El nicho reduce audiencia pero sube conversión y LTV.",
      },
      { type: "h2", text: "Paso 2: Embudo multip plataforma" },
      {
        type: "ul",
        items: [
          "X (Twitter): a menudo la fuente principal—3–5 posts/día, mezcla personalidad y teasers",
          "Reddit: posts nativos en 10–15 subreddits relevantes, sin spam directo",
          "TikTok / Reels: contenido SFW, humor, curiosidad—sin violar reglas",
          "Instagram: Stories diarias, lifestyle, “link in bio” fijado",
        ],
      },
      {
        type: "tip",
        text: "En 2026, las top creators rara vez dependen de una red: diversifican tráfico para sobrevivir shadowban o cambios de algoritmo.",
      },
      { type: "h2", text: "Paso 3: Contenido que convierte" },
      {
        type: "p",
        text: "El feed de OnlyFans es escaparate; los DM son caja. Los teasers deben prometer emoción, no “otra foto más”. Prueba welcome message, post fijado y bundles PPV.",
      },
      { type: "h2", text: "Paso 4: Retención y LTV" },
      {
        type: "p",
        text: "Una suscripción barata de $3 sin sistema en DM trae muchos fans “muertos”. En 2026 ganan más las que entran en $12–25 con chat fuerte que la carrera por número de subs.",
      },
      { type: "h2", text: "Métricas a seguir" },
      {
        type: "ul",
        items: [
          "Churn mensual",
          "ARPPU—ingreso medio por fan de pago",
          "Tiempo de respuesta en DM",
          "Conversión welcome → primera compra PPV",
          "Fuente de tráfico por UTM/enlaces",
        ],
      },
      {
        type: "p",
        text: "Si el marketing consume más tiempo que rodar, es señal de delegar. OFM construye el embudo llave en mano: solicitud en la web, respuesta del manager en 24 h.",
      },
    ],
  },
  "onlyfans-prodvizhenie-reddit-twitter": {
    title: "Promocionar OnlyFans en Reddit y X (Twitter)",
    description:
      "Promoción OnlyFans Reddit y X 2026: subreddits, calendario, conversión de perfil y tráfico sin spam — guía de promotion desde OFM.",
    keywords: ["onlyfans reddit", "onlyfans twitter promoción"],
    blocks: [
      {
        type: "p",
        text: "Reddit y X siguen siendo canales viables para promoción OnlyFans si no actúas como spammer. Ambos castigan enlaces directos y posts duplicados; premian contenido nativo y perfil reconocible.",
      },
      { type: "h2", text: "Reddit: reglas del juego" },
      {
        type: "ul",
        items: [
          "Lee las reglas de cada subreddit—karma, antigüedad, flairs",
          "Publica contenido, no titulares de “suscríbete a mi OF”",
          "Perfil Reddit = escaparate: bio, fijado, enlace",
          "5–15 subs objetivo mejor que 50 al azar",
          "Variedad: foto, gif, historias en texto",
        ],
      },
      { type: "h2", text: "X (Twitter): volumen + personalidad" },
      {
        type: "p",
        text: "Mezcla ~60% personalidad (opiniones, BTS, humor), ~20% teasers, ~20% promo. Responde en quote-tweets a cuentas del nicho. Hay shadowban—ten cuenta de respaldo y no pongas enlace en cada post.",
      },
      { type: "h2", text: "Puente Reddit/X → OnlyFans" },
      {
        type: "p",
        text: "Optimiza el perfil OnlyFans para tráfico frío: bio clara, fijado con mejor contenido, welcome con CTA suave. Las primeras 48 h en DM son críticas—ver nuestro artículo de chats.",
      },
      {
        type: "tip",
        text: "Tráfico sin chats es agua en un cubo con fugas: el suscriptor llega y se va sin comprar.",
      },
    ],
  },
  "onlyfans-instagram-tiktok-bez-bana": {
    title: "Instagram y TikTok para OnlyFans: crecer sin baneos",
    description:
      "OnlyFans Instagram y TikTok sin baneos 2026: embudo SFW, Reels, reglas Meta y link in bio — promoción segura desde OFM.",
    keywords: ["onlyfans instagram", "onlyfans tiktok"],
    blocks: [
      {
        type: "p",
        text: "Instagram y TikTok no favorecen marketing adult explícito. Siguen siendo discovery potentes si construyes imagen SFW y diriges tráfico por un hub de enlaces (Beacons, Linktree en tu dominio, etc.).",
      },
      { type: "h2", text: "Qué publicar" },
      {
        type: "ul",
        items: [
          "Lifestyle, fitness, moda, humor—dentro de tu nicho",
          "Reels con gancho en los primeros 2 segundos",
          "Stories: encuestas, BTS, “pregúntame”",
          "Sin desnudo que viole las guidelines",
        ],
      },
      { type: "h2", text: "Qué evitar" },
      {
        type: "p",
        text: "La palabra “OnlyFans” en captions suele disparar moderación. No compres bots. No cambies el tema del perfil de golpe. Calienta cuentas nuevas poco a poco.",
      },
      { type: "h2", text: "El embudo" },
      {
        type: "p",
        text: "Reels → perfil → enlace → landing/mensaje → OnlyFans. Prueba CTAs en bio (“contenido exclusivo”, “club VIP”). Mide qué red trae fans de pago, no solo clics.",
      },
    ],
  },
  "onlyfans-uderzhanie-podpischikov": {
    title: "Retención de suscriptores en OnlyFans: churn y LTV",
    description:
      "Retención suscriptores OnlyFans 2026: bajar churn, subir LTV con chats, contenido y precios — práctica de management OFM.",
    keywords: ["retención suscriptores onlyfans", "onlyfans churn"],
    blocks: [
      {
        type: "p",
        text: "Captar un suscriptor es caro. Perderlo a los 30 días quema el presupuesto de marketing. En 2026 la retención importa más que la carrera por suscripciones de $3.",
      },
      { type: "h2", text: "Por qué se van" },
      {
        type: "ul",
        items: [
          "Sin contenido nuevo en el feed",
          "Respuestas lentas o plantillas en DM",
          "Sensación de “engaño” tras la promo",
          "PPV agresivo sin calentamiento",
          "Sin personalización para fans activos",
        ],
      },
      { type: "h2", text: "Sistema de retención" },
      {
        type: "p",
        text: "Mínimo 2–3 posts en feed por semana, un “motivo para quedarse” semanal (exclusivo, serie, aviso de stream). Segmenta fans: nuevo, activo, ballena—scripts distintos en DM. Reactiva antes de la renovación.",
      },
      { type: "h2", text: "Métrica de churn" },
      {
        type: "p",
        text: "Cuenta el % de bajas sobre la base activa. Si el churn supera 15–20%/mes sin nuevas ballenas, el problema es producto (contenido + chat), no solo anuncios.",
      },
    ],
  },
  "onlyfans-chaty-dm-prodazhi": {
    title: "Chats y DM en OnlyFans: dónde está el ingreso principal",
    description:
      "Chats y DM OnlyFans 2026: discovery chatting, PPV, customs, KPIs y velocidad — guía de ventas y crecimiento net desde OFM.",
    keywords: ["onlyfans chats", "ventas dm onlyfans", "onlyfans chatting"],
    blocks: [
      {
        type: "p",
        text: "Muchas principiantes miran el precio de suscripción; creadoras y agencias con experiencia saben que el ingreso bruto suele construirse 70–90% en DM: tips, PPV, customs, renovaciones. No son “respuestas amables”; es un embudo de ventas por etapas.",
      },
      { type: "h2", text: "4 fases del discovery chatting" },
      { type: "h3", text: "1. Welcome (primeros minutos)" },
      {
        type: "p",
        text: "Saludo personalizado, no copia-pega. Objetivo: abrir diálogo y saber de dónde viene el fan.",
      },
      { type: "h3", text: "2. Discovery (hasta 24 h)" },
      {
        type: "p",
        text: "Preguntas sobre preferencias, calificación suave de “ballena”. Gran parte del gasto ocurre en las primeras 48–72 h—no se puede perder esa ventana.",
      },
      { type: "h3", text: "3. Connection (1–2 días)" },
      {
        type: "p",
        text: "Vínculo emocional, inside jokes, exclusividad—sin manipulación, pero con intención.",
      },
      { type: "h3", text: "4. Offer (PPV / custom)" },
      {
        type: "p",
        text: "Oferta concreta según el interés del fan, no un blast “cómpralo todos”.",
      },
      { type: "h2", text: "Velocidad de respuesta = dinero" },
      {
        type: "p",
        text: "Equipos fuertes apuntan a responder en minutos en horas activas. Una hora de retraso es lead frío. De noche cubren turnos de chat.",
      },
      {
        type: "tip",
        text: "Si duermes mientras llegan subs de pago por anuncios—literalmente quemas presupuesto publicitario.",
      },
      { type: "h2", text: "IA + humano" },
      {
        type: "p",
        text: "Algunas agencias usan IA en fases tempranas y pasan ballenas a personas. Pregunta quién escribe en tu voz y cómo controlan el tono.",
      },
      {
        type: "p",
        text: "OFM gestiona chats 24/7 dentro del management—los detalles se discuten al conectar.",
      },
    ],
  },
  "onlyfans-tseny-podpiska-ppv": {
    title: "Precios en OnlyFans: suscripción, PPV y customs",
    description:
      "Precios OnlyFans 2026: suscripción, PPV, prueba gratis y packs — por qué pierde la carrera por $3 subs y cómo fijar precios con OFM.",
    keywords: [
      "precios onlyfans",
      "onlyfans ppv",
      "precio suscripción onlyfans",
    ],
    blocks: [
      {
        type: "p",
        text: "El pricing en OnlyFans es psicología y matemáticas. La suscripción es entrada al embudo; PPV y tips son margen. En 2026 la carrera al fondo en $3 pierde frente a entrada $12–25 con DM fuerte.",
      },
      { type: "h2", text: "Suscripción: tres modelos" },
      {
        type: "ul",
        items: [
          "Sub de pago—MRR estable, requiere feed constante",
          "Página gratis + PPV—más tráfico, más carga de chat",
          "De pago + trial / promo—pruebas de conversión",
        ],
      },
      { type: "h2", text: "PPV y customs" },
      {
        type: "p",
        text: "El PPV funciona con narrativa (“continuación de la serie de ayer”). Los customs son premium por personalización; limita slots para no quemarte. El chat debe compartir una misma lista de precios.",
      },
      { type: "h2", text: "Errores de pricing" },
      {
        type: "ul",
        items: [
          "Demasiado barato → muchos no pagan en DM",
          "Demasiado caro al inicio sin marca",
          "Descuentos cada semana—entrenas a esperar rebajas",
          "Mismo precio PPV para novato y ballena",
        ],
      },
      {
        type: "tip",
        text: "Prueba precio cada 6–8 semanas con tráfico nuevo; no cambies todo a la vez.",
      },
    ],
  },
  "onlyfans-skolko-zarabatyvayut-modeli": {
    title: "Cuánto se gana en OnlyFans: cifras realistas",
    description:
      "Cuánto se gana en OnlyFans en 2026: rangos reales de principiantes a top models, de qué depende el ingreso, gross vs neto y el papel de una agencia OFM.",
    keywords: [
      "cuánto se gana en onlyfans",
      "ingresos modelo onlyfans",
      "ganar dinero en onlyfans",
      "cuánto gana una modelo de onlyfans",
      "ingresos onlyfans 2026",
    ],
    blocks: [
      {
        type: "p",
        text: "Los titulares de «$100k al mes» venden cursos, pero la mediana real del mercado es mucho más modesta. Un análisis honesto te evita la decepción y te ayuda a trazar un plan que de verdad funcione.",
      },
      {
        type: "h2",
        text: "Referencias por etapa (facturación bruta)",
      },
      {
        type: "ul",
        items: [
          "Primeros 1–3 meses: $500–3.000 con trabajo sistemático",
          "$3.000–10.000: contenido constante + al menos 1–2 canales de tráfico",
          "$10.000–30.000+: chats fuertes, marketing y un nicho definido",
          "$30.000+: nicho top, equipo y marca; a menudo 2+ años de sistema",
        ],
      },
      {
        type: "p",
        text: "En OFM una parte de las modelos se mueve en el rango de $12.000–35.000+/mes. No es una garantía ni la mediana para todas las solicitudes.",
      },
      {
        type: "h2",
        text: "De qué depende el ingreso",
      },
      {
        type: "ul",
        items: [
          "El nicho y la competencia",
          "Las horas de contenido y la disciplina",
          "La calidad del marketing y de los chats",
          "Tus límites y tu sostenibilidad (el burnout = caída de ingresos)",
        ],
      },
      {
        type: "h2",
        text: "Neto vs bruto",
      },
      {
        type: "p",
        text: "OnlyFans cobra la comisión de la plataforma. La agencia, su porcentaje. Los impuestos dependen de tu país. Calcula lo que te queda «en mano», no la cifra bruta del landing.",
      },
      {
        type: "nav",
        intro: "Unas expectativas realistas van de la mano con:",
        links: [
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Empezar desde cero",
          },
          {
            href: "/faq",
            label: "FAQ: qué es OFM",
          },
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "Cómo elegir agencia",
          },
          {
            href: "/blog/rabota-modelyu-onlyfans",
            label: "Trabajar como modelo de OnlyFans",
          },
        ],
      },
      {
        type: "cta",
        title: "¿Quieres conocer tu potencial en tu nicho?",
        body: "En ofmmodels.com encontrarás casos con capturas (facturación bruta) y una calculadora. Envía tu solicitud y te escribimos por Telegram (@Azalia_agency) en 24 horas.",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Los casos y la calculadora son orientativos, no una garantía de ingresos. Las cifras son la facturación bruta del balance de la página de OnlyFans, no el pago neto de la modelo.",
      },
    ],
  },
  "onlyfans-agentstvo-dlya-nachinayushchih": {
    title: "OnlyFans para principiantes: agencia o sola en 2026",
    description:
      "Cómo empezar en OnlyFans paso a paso: verificación, nicho, primer contenido, tráfico y cuándo sumar una agencia que promociona y vende por ti.",
    keywords: [
      "cómo empezar en onlyfans",
      "onlyfans para principiantes",
      "trabajar en onlyfans sin experiencia",
      "agencia onlyfans para empezar",
      "ganar dinero en onlyfans",
    ],
    blocks: [
      {
        type: "p",
        text: "Empezar en OnlyFans en 2026 es técnicamente más fácil que hace cinco años, y a la vez más competitivo. La plataforma está madura y el suscriptor es exigente. Aquí tienes el orden de pasos que reduce el caos, tanto si arrancas sola como si lo haces con una agencia de OnlyFans.",
      },
      {
        type: "h2",
        text: "Etapa 0: Reglas y límites",
      },
      {
        type: "p",
        text: "Solo 18+, con verificación de identidad según las reglas de la plataforma. Decide de antemano: con cara o sin cara, qué formatos haces y qué es tabú para ti. Tus límites son la base de tu marca.",
      },
      {
        type: "h2",
        text: "Etapa 1: Nicho y empaque",
      },
      {
        type: "p",
        text: "Nombre, estilo visual y tono de voz. La bio de OnlyFans se escribe pensando en un suscriptor frío que llega desde Reddit, no en un «hola, soy nueva por aquí».",
      },
      {
        type: "h2",
        text: "Etapa 2: Pack de contenido inicial",
      },
      {
        type: "ul",
        items: [
          "10–20 posts en el feed antes de la promo activa",
          "Post fijado + welcome message",
          "2–3 plantillas de PPV para los chats",
          "Un set «hero» para el avatar y los banners",
        ],
      },
      {
        type: "h2",
        text: "Etapa 3: Primer tráfico",
      },
      {
        type: "p",
        text: "Elige 1–2 canales (a menudo X + Reddit). No te disperses en cinco redes en la primera semana. Tus primeros suscriptores ponen a prueba el embudo; no son una sentencia de ingresos bajos.",
      },
      {
        type: "h2",
        text: "Cuándo sumar una agencia al empezar",
      },
      {
        type: "p",
        text: "Tiene sentido si quieres recorrer el camino en 7–14 días con un equipo, en lugar de aprender a base de errores en los DM de madrugada. OFM acepta principiantes: dejas tu solicitud en la web y un manager te escribe por Telegram en 24 horas.",
      },
      {
        type: "nav",
        intro: "Arranca sin caos y sigue leyendo:",
        links: [
          {
            href: "/blog/onlyfans-kontent-plan-i-syomki",
            label: "Plan de contenido y rodajes",
          },
          {
            href: "/blog/onlyfans-oshibki-novichkov",
            label: "15 errores de principiante",
          },
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "Cómo elegir agencia",
          },
          {
            href: "/blog/onlyfans-skolko-zarabatyvayut-modeli",
            label: "Cuánto se gana",
          },
        ],
      },
      {
        type: "cta",
        title: "¿Lista para lanzarte con un equipo?",
        body: "OFM acompaña a las principiantes durante 7–14 días: perfil, contenido, chats y primer tráfico. Solicitud sin pago «de entrada» ni costes ocultos.",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Las cifras son facturación bruta del balance de la página de OnlyFans, no un pago neto garantizado. El ingreso depende del nicho, el volumen de contenido y la implicación: es una orientación, no una garantía.",
      },
    ],
  },
  "onlyfans-kontent-plan-i-syomki": {
    title: "Plan de contenido OnlyFans: sesiones, feed y PPV",
    description:
      "Plan de contenido OnlyFans 2026: cuántas sesiones grabar al mes, batching y cómo unir tu feed con los PPV en DM. La estrategia del management de OFM.",
    keywords: [
      "plan de contenido onlyfans",
      "estrategia de contenido onlyfans",
      "sesiones de fotos onlyfans",
      "cuánto contenido onlyfans",
      "agencia onlyfans modelos",
    ],
    blocks: [
      {
        type: "p",
        text: "El contenido es el combustible del embudo. Sin un calendario vives en modo «hay que grabar algo ya», y el equipo de chats no puede vender un PPV que todavía no existe.",
      },
      {
        type: "h2",
        text: "Volumen mínimo",
      },
      {
        type: "p",
        text: "La referencia de las agencias fuertes es de 10 a 14 piezas al mes en el feed como base, más material exclusivo para los PPV. Cuanto más, mejor, siempre que la calidad no baje.",
      },
      {
        type: "h2",
        text: "Día de grabación",
      },
      {
        type: "ul",
        items: [
          "Lista de sets preparada de antemano (3–5 looks por sesión)",
          "Luz, fondo y atrezzo: los setups repetibles ahorran tiempo",
          "Clasifica al momento: feed / PPV / promo para redes",
          "Batching: una sola sesión = dos semanas de contenido",
        ],
      },
      {
        type: "h2",
        text: "Conectar el feed con los DM",
      },
      {
        type: "p",
        text: "El post del feed es el teaser de la historia; en el DM va «la continuación, solo aquí por $X». Las series retienen mucho mejor que las fotos sueltas.",
      },
      {
        type: "tip",
        text: "Guarda los originales en local y en la nube: nunca le des a la agencia la única copia que tienes.",
      },
      {
        type: "nav",
        intro: "El plan de contenido dentro del sistema de OFM:",
        links: [
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Empezar de cero",
          },
          {
            href: "/blog/onlyfans-chaty-dm-prodazhi",
            label: "Chats y ventas por DM",
          },
          {
            href: "/blog/onlyfans-tseny-podpiska-ppv",
            label: "Precios: suscripción y PPV",
          },
          {
            href: "/blog/rabota-modelyu-onlyfans",
            label: "Trabajar como modelo de OnlyFans",
          },
        ],
      },
      {
        type: "cta",
        title: "¿Necesitas un calendario de sesiones para todo el mes?",
        body: "La estrategia de contenido está incluida en el management de OFM: lo vemos juntos cuando envíes tu solicitud, sin pagos de «entrada».",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Los ingresos son facturación bruta del balance de la página y dependen del nicho, el volumen de contenido y la constancia: es una referencia, no una cifra garantizada.",
      },
    ],
  },
  "onlyfans-oshibki-novichkov": {
    title: "15 errores de novata en OnlyFans (y cómo corregirlos)",
    description:
      "15 errores de novata en OnlyFans 2026: precios, chats, marketing y burnout. Un checklist que te ahorra meses de prueba y error. Consejos de OFM.",
    keywords: [
      "errores onlyfans",
      "consejos onlyfans para principiantes",
      "empezar en onlyfans",
      "cómo ganar en onlyfans",
      "onlyfans sin experiencia",
    ],
    blocks: [
      {
        type: "p",
        text: "La mayoría de las cuentas que se quedan estancadas en $500–1k repiten los mismos errores una y otra vez. No es «mal contenido»: es la falta de un sistema.",
      },
      {
        type: "ul",
        items: [
          "Suscripción de $3 sin estrategia en los DM",
          "No tener mensaje de bienvenida",
          "Responder en los DM con 2–3 horas de retraso",
          "Promocionar solo en Stories, sin Reddit/X",
          "Spamear tu enlace en cada publicación",
          "No tener fijado tu mejor contenido",
          "Grabar sin plan → burnout",
          "Subir gratis al feed contenido de nivel PPV",
          "Ignorar a las «ballenas» en los chats",
          "No llevar el control del churn",
          "Comprar bots y engagement falso",
          "Mezclar la cuenta personal y la de trabajo en redes",
          "Proteger mal tus archivos originales",
          "Trabajar con la primera agencia sin contrato",
          "Compararte con el top 1% en tu primer mes",
        ],
      },
      {
        type: "h2",
        text: "Por dónde empezar a corregirlos",
      },
      {
        type: "p",
        text: "Semana 1: perfil + mensaje de bienvenida. Semana 2: un solo canal de tráfico. Semana 3: velocidad en los DM o chatter. Semana 4: testear el precio del PPV. O envía tu solicitud a OFM y recorre el camino con una manager al lado.",
      },
      {
        type: "nav",
        intro: "Corrige tus errores con estas guías:",
        links: [
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Empezar desde cero",
          },
          {
            href: "/blog/onlyfans-marketing-strategiya-2026",
            label: "Marketing 2026",
          },
          {
            href: "/blog/onlyfans-chaty-dm-prodazhi",
            label: "Chats y ventas por DM",
          },
          {
            href: "/blog/onlyfans-anonimnost-i-bezopasnost",
            label: "Anonimato y seguridad",
          },
        ],
      },
      {
        type: "cta",
        title: "¿Cansada de repetir los mismos errores?",
        body: "OFM construye el sistema desde cero: perfil, tráfico y chats. Una manager te escribe por Telegram en 24 horas.",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Las cifras de los casos del sitio son la facturación bruta del balance de la página de OnlyFans (gross), no el pago neto de la modelo ni un ingreso garantizado.",
      },
    ],
  },
  "onlyfans-anonimnost-i-bezopasnost": {
    title: "Anonimato y seguridad en OnlyFans: guía 2026",
    description:
      "Anonimato en OnlyFans 2026: cómo evitar el doxxing y las filtraciones con 2FA, bloqueos por zona y DMCA. Guía de seguridad para modelos creadoras de OFM.",
    keywords: [
      "anonimato onlyfans",
      "seguridad onlyfans modelo",
      "onlyfans sin mostrar cara",
      "evitar filtraciones onlyfans",
      "trabajar onlyfans segura",
    ],
    blocks: [
      {
        type: "p",
        text: "OnlyFans es un negocio con un riesgo de privacidad alto. El anonimato total no existe, pero un proceso bien montado reduce muchísimo las probabilidades de doxxing y de filtraciones de tu contenido.",
      },
      {
        type: "h2",
        text: "Higiene técnica",
      },
      {
        type: "ul",
        items: [
          "Activa el 2FA en OnlyFans y en tu correo",
          "Usa un número y un email aparte solo para el trabajo",
          "No uses tu Instagram personal para promocionarte",
          "VPN cuando lo necesites: ayuda, pero no es una solución mágica",
          "Marcas de agua en las vistas previas",
        ],
      },
      {
        type: "h2",
        text: "Trabajar con una agencia",
      },
      {
        type: "p",
        text: "Pregunta siempre: quién ve tu contraseña, si usan roles de OnlyFans o VPS, qué pasa cuando un empleado de la agencia se va, si hay NDA y cuál es la política ante filtraciones. Y nunca dejes que publiquen tu contenido en su portafolio sin tu permiso.",
      },
      {
        type: "h2",
        text: "Filtraciones y DMCA",
      },
      {
        type: "p",
        text: "Monitoreo de webs piratas, avisos DMCA y reacción rápida. Las agencias del nivel de OFM incluyen las recomendaciones de protección como parte del management.",
      },
      {
        type: "h2",
        text: "Seguridad psicológica",
      },
      {
        type: "p",
        text: 'Pon límites con los fans, usa listas de bloqueo y no confundas una relación "de verdad" con una venta. El burnout es un riesgo de seguridad tan serio como un hackeo.',
      },
      {
        type: "nav",
        intro: "Seguridad y cómo elegir bien tu equipo:",
        links: [
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "Cómo elegir agencia",
          },
          {
            href: "/blog/onlyfans-rabota-bez-lica",
            label: "OnlyFans sin mostrar la cara",
          },
          {
            href: "/blog/onlyfans-oshibki-novichkov",
            label: "15 errores de principiantes",
          },
          {
            href: "/faq",
            label: "FAQ: qué es OFM",
          },
        ],
      },
      {
        type: "cta",
        title: "¿Te importan el anonimato y el NDA?",
        body: "En OFM los accesos se dan según el principio del mínimo necesario; el NDA y la respuesta ante filtraciones forman parte del management.",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Las cifras de los casos en la web son la facturación bruta (gross) del balance de la página de OnlyFans, no el ingreso neto de la modelo.",
      },
    ],
  },
  "onlyfans-rabota-bez-lica": {
    title: "OnlyFans sin mostrar la cara: estrategia no-face",
    description:
      "OnlyFans sin mostrar la cara en 2026: construye marca no-face con nichos, marketing, anonimato y crecimiento real junto al management de OFM.",
    keywords: [
      "onlyfans sin mostrar la cara",
      "onlyfans sin cara",
      "no face onlyfans",
      "modelo onlyfans anonima",
      "onlyfans sin rostro",
    ],
    blocks: [
      {
        type: "p",
        text: "Trabajar sin cara no es un techo de ingresos, es otra forma de construir marca. Las cuentas que mejor funcionan compensan la ausencia de rostro con un cuerpo reconocible, una voz propia, una estética marcada y secciones de contenido recurrentes.",
      },
      {
        type: "h2",
        text: "Nichos que funcionan",
      },
      {
        type: "ul",
        items: [
          "Feet y fetiches parciales",
          "POV y primera persona sin mostrar la cara",
          "Máscaras, cosplay y personajes",
          "ASMR / voz + contenido de audio",
          "Fitness / lifestyle sin cara",
        ],
      },
      {
        type: "h2",
        text: "Marketing no-face",
      },
      {
        type: "p",
        text: "Reddit y X funcionan muy bien cuando el foco está en el contenido y no en la «personalidad influencer». Instagram es más difícil: ahí conviene construir un código visual propio (color, ángulo, un tatuaje o un accesorio que actúe como ancla de tu marca).",
      },
      {
        type: "h2",
        text: "Riesgos",
      },
      {
        type: "p",
        text: "El fondo de la habitación, un tatuaje o tu voz pueden delatarte. Acuerda con la agencia las reglas de encuadre y la limpieza de metadatos de las fotos para mantener tu anonimato.",
      },
      {
        type: "p",
        text: "En OFM trabajamos con modelos no-face: definimos tu estrategia cuando envías la solicitud.",
      },
      {
        type: "nav",
        intro: "No-face y crecimiento:",
        links: [
          {
            href: "/blog/onlyfans-anonimnost-i-bezopasnost",
            label: "Anonimato y seguridad",
          },
          {
            href: "/blog/onlyfans-marketing-strategiya-2026",
            label: "Marketing 2026",
          },
          {
            href: "/blog/onlyfans-kontent-plan-i-syomki",
            label: "Plan de contenido y rodajes",
          },
          {
            href: "/blog/onlyfans-skolko-zarabatyvayut-modeli",
            label: "Cuánto ganan las modelos",
          },
        ],
      },
      {
        type: "cta",
        title: "No-face no es un techo de ingresos",
        body: "OFM construye tu embudo por estilo, no por tu cara: marketing, chats y plan de contenido. Envía tu solicitud y te respondemos por Telegram (@Azalia_agency) en 24 h.",
        buttonHref: "/#contact",
        buttonLabel: "Enviar solicitud",
        note: "Las cifras se refieren a la facturación bruta (gross) del balance de la página, no a un pago garantizado. Solo +18.",
      },
    ],
  },
  "onlyfans-agentstvo-moldova": {
    title: "Agencia OnlyFans Moldova 2026 — elegir sin estafas",
    description:
      "Guía para creadoras en Moldova y la diáspora: Chișinău, trabajo remoto, chats 24/7, marketing, señales de alerta y solicitud en OFM.",
    keywords: [
      "agencia onlyfans moldova",
      "onlyfans agenție moldova",
      "onlyfans agency moldova",
    ],
    blocks: [
      {
        type: "p",
        text: "Moldova es un mercado OnlyFans en crecimiento: ruso y rumano fuertes, trabajo remoto habitual y muchas creadoras que buscan agencia con condiciones claras. «Agencia OnlyFans Moldova» en Google lleva a Telegram y tablones donde management profesional y estafa se ven igual. Esta guía explica qué debe incluir full-service y cómo trabaja OFM con creadoras de MD y la diáspora en la UE.",
      },
      { type: "h2", text: "Por qué las creadoras de Moldova eligen agencia" },
      {
        type: "p",
        text: "Hasta el 85% del ingreso neto suele venir de los DM. Una agencia cubre chats 24/7, tráfico y analítica mientras tú te enfocas en contenido—desde Chișinău o en remoto desde Rumanía, Italia o Alemania.",
      },
      { type: "h2", text: "Señales de alerta" },
      {
        type: "ul",
        items: [
          "Pagos anticipados antes del lanzamiento",
          "Una sola contraseña de OnlyFans",
          "Promesas de ingreso fijo sin análisis",
          "Sin contrato ni NDA",
        ],
      },
      {
        type: "p",
        text: "OFM trabaja con creadoras en Moldova, Ucrania, Europa y Latinoamérica—100% remoto. Solicitud en ofmmodels.com, respuesta en Telegram en 24 h, sin cuota de entrada.",
      },
    ],
  },
  "onlyfans-agentstvo-latinskaya-amerika": {
    title:
      "Agencia OnlyFans Latinoamérica 2026 — México, Colombia, Brasil y más",
    description:
      "Guía para México, Colombia, Argentina, Chile, Perú, Ecuador, Uruguay, Paraguay, Bolivia, Centroamérica y Brasil: chats 24/7, marketing, red flags y solicitud en OFM.",
    keywords: [
      "agencia onlyfans latinoamerica",
      "agencia onlyfans latinoamérica",
      "agencia onlyfans méxico",
      "agencia onlyfans colombia",
      "agencia onlyfans argentina",
      "agencia onlyfans brasil",
      "agencia onlyfans chile",
      "agencia onlyfans peru",
    ],
    blocks: [
      {
        type: "p",
        text: "Latinoamérica es una de las regiones de mayor crecimiento en OnlyFans: México, Colombia, Argentina, Chile, Perú, Ecuador, Uruguay, Paraguay, Bolivia, Venezuela, Centroamérica (Costa Rica, Panamá, Guatemala) y Brasil. Buscar «agencia OnlyFans Latinoamérica», «agencia OnlyFans México» o «agencia OnlyFans Brasil» lleva a cientos de anuncios—desde estudios profesionales hasta estafas. Esta guía cubre todo el región hispanohablante y Brasil: qué debe incluir management, red flags y cómo OFM trabaja 100% remoto en español, portugués e inglés.",
      },
      {
        type: "h2",
        text: "Por qué las creadoras de LatAm y Brasil eligen agencia",
      },
      {
        type: "p",
        text: "Hasta el 85% del ingreso neto suele venir de los DM. Una creadora en São Paulo, Bogotá o Ciudad de México pierde ventas de noche cuando los fans de EE. UU. y Europa están en línea. La agencia cubre chats 24/7, tráfico y analítica.",
      },
      {
        type: "ul",
        items: [
          "México, Colombia, Argentina, Chile, Perú—totalmente remoto, sin estudio obligatorio",
          "Brasil: mercado enorme en portugués; OFM trabaja PT/ES/EN con creadoras de Rio, SP, BH",
          "Diáspora hispana en EE. UU. y UE: cuentas bilingües EN + ES",
          "Zonas horarias LatAm cruzan con US East—ideal para chats en horario pico americano",
        ],
      },
      { type: "h2", text: "Regiones: qué comparten todas las países" },
      {
        type: "p",
        text: "Cada país es distinto, pero las expectativas son las mismas: anonimato, pagos claros, marketing sin ban en Instagram/TikTok, chats en tono GFE y comisión transparente. Da igual si estás en Buenos Aires, Medellín, Lima o Santiago—full-service se construye sobre cinco pilares.",
      },
      {
        type: "ul",
        items: [
          "México y Colombia—mayores flujos hispanohablantes en adult",
          "Argentina y Chile—fuerte EN/ES, salida a fans US/EU",
          "Perú, Ecuador, Uruguay, Paraguay, Bolivia—nichos en crecimiento",
          "Brasil—escala propia: contenido PT, tendencias TikTok/Reels locales",
          "Centroamérica—Costa Rica, Panamá: a menudo bilingüe ES/EN",
        ],
      },
      { type: "h2", text: "Red flags al elegir agencia" },
      {
        type: "ul",
        items: [
          "Pago adelantado «por publicidad» antes del lanzamiento",
          "Una sola contraseña de OnlyFans",
          "Promesa de ingreso fijo sin análisis de nicho",
          "Sin contrato, NDA ni lista de servicios",
          "Presión «firma hoy» sin salida en 30 días",
        ],
      },
      { type: "h2", text: "Brasil: nota para creadoras en portugués" },
      {
        type: "p",
        text: "Brasil es el mayor mercado de Sudamérica y un pool lingüístico aparte. OFM trabaja con creadoras brasileñas en remoto: managers en PT/ES/EN, marketing en X y TikTok BR, chats en portugués. Sitio en /es y /en; solicitud en ofmmodels.com—respuesta en Telegram en 24 h.",
      },
      { type: "h2", text: "Cómo trabaja OFM con Latinoamérica" },
      {
        type: "p",
        text: "OFM es agencia OnlyFans internacional: México, Colombia, Argentina, Chile, Perú, Brasil, Europa y más—100% remoto. Tras la solicitud en ofmmodels.com un manager escribe por Telegram en 24 h. Sin cuota de entrada. Casos reales en el sitio.",
      },
      {
        type: "p",
        text: "Si buscas agencia OnlyFans en Latinoamérica—México, Colombia, Argentina, Chile, Perú, Brasil o cualquier país hispanohablante—solicita en ofmmodels.com. Manager OFM responde sin compromiso.",
      },
    ],
  },
};
