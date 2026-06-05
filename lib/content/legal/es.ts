import type { LegalSection } from './types';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '1. Disposiciones generales',
    paragraphs: [
      'Esta Política de Privacidad describe cómo OFM\'s Model Agency («nosotros», «la agencia») trata los datos personales al usar ofmmodels.com y enviar una solicitud.',
      'Responsable del tratamiento: OFM\'s Model Agency. Para consultas de privacidad, utilice el formulario de solicitud del sitio web.',
      'Al usar el sitio tras leer esta política, usted reconoce estas condiciones. Enviar una solicitud implica consentir el tratamiento de los datos indicados para contactarle.',
    ],
  },
  {
    title: '2. Datos que recopilamos',
    paragraphs: [
      'Datos de la solicitud (los proporciona voluntariamente): nombre, edad (si se indica), contacto de Telegram o número de teléfono, intereses (si se completan), confirmación de edad 18+.',
      'Datos técnicos al enviar la solicitud: ubicación aproximada (país y ciudad) basada en la dirección IP — solo para procesamiento interno; la IP completa no se incluye en las notificaciones.',
      'Datos de visita: idioma de la interfaz, tipo de navegador y dispositivo, páginas vistas — solo con su consentimiento a cookies analíticas (Google Analytics 4).',
      'Cookies necesarias: guardar el idioma elegido y su decisión sobre cookies.',
    ],
  },
  {
    title: '3. Cookies y tecnologías similares',
    paragraphs: [
      'Las cookies necesarias permiten el funcionamiento básico del sitio (idioma, recordar su elección de cookies). No requieren consentimiento separado.',
      'Las cookies analíticas (Google Analytics 4) solo se usan tras su consentimiento explícito con «Aceptar todas». Si elige «Solo necesarias», la analítica no se activa.',
      'Puede cambiar su elección en cualquier momento mediante «Configuración de cookies» en el pie de página.',
      'El registro de consentimiento se guarda hasta que cambie su elección o borre los datos del navegador.',
    ],
  },
  {
    title: '4. Finalidades y bases legales',
    paragraphs: [
      'Tramitar su solicitud y contactarle — ejecución de su petición / medidas precontractuales.',
      'Geolocalización aproximada por IP al solicitar — interés legítimo para evaluar solicitudes y organizar el trabajo del equipo.',
      'Analítica de visitas — su consentimiento (para usuarios de la UE/EEE y otras jurisdicciones donde sea obligatorio).',
      'Seguridad del sitio y cumplimiento legal — interés legítimo y obligaciones legales.',
    ],
  },
  {
    title: '5. Cesión a terceros',
    paragraphs: [
      'Los datos de la solicitud se comparten con gestores autorizados y servicios de notificación (Telegram Bot API) únicamente para procesar su consulta.',
      'Google Analytics (Google LLC) — solo con su consentimiento a cookies analíticas; los datos pueden procesarse en servidores de Google, incluso fuera de su país.',
      'El alojamiento web (Vercel Inc.) procesa datos técnicos para proporcionar la infraestructura.',
      'No vendemos ni alquilamos datos personales a terceros para su marketing.',
    ],
  },
  {
    title: '6. Conservación y seguridad',
    paragraphs: [
      'Los datos de la solicitud se conservan en la correspondencia de gestores y notificaciones de Telegram el tiempo necesario para revisar la solicitud y una posible colaboración.',
      'Los datos analíticos de GA4 se conservan según la configuración de Google Analytics (por defecto hasta 14 meses en informes estándar).',
      'Aplicamos medidas organizativas y técnicas: HTTPS, acceso restringido a notificaciones, claves secretas en el servidor.',
    ],
  },
  {
    title: '7. Sus derechos',
    paragraphs: [
      'Puede solicitar acceso, rectificación, supresión, limitación u oposición al tratamiento — mediante el formulario del sitio web.',
      'Puede retirar el consentimiento a cookies analíticas en cualquier momento mediante «Configuración de cookies» en el pie de página.',
      'Los residentes de la UE/EEE pueden presentar una reclamación ante su autoridad de protección de datos si consideran que el tratamiento infringe el RGPD.',
      'Responderemos en un plazo razonable, normalmente en 30 días.',
    ],
  },
  {
    title: '8. Edad',
    paragraphs: [
      'El sitio y el formulario están destinados a personas de 18 años o más. Al enviar una solicitud, confirma que tiene al menos 18 años.',
    ],
  },
  {
    title: '9. Cambios en la política',
    paragraphs: [
      'Podemos actualizar esta política. La versión vigente siempre está publicada en esta página. Cambios sustanciales en cookies pueden mostrar el banner de consentimiento de nuevo.',
      'Última actualización: junio de 2026.',
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: '1. Finalidad del sitio',
    paragraphs: [
      'El sitio de OFM\'s Model Agency ofrece información sobre los servicios de la agencia y un formulario de solicitud. No es un representante oficial de OnlyFans.',
    ],
  },
  {
    title: '2. Solicitud y colaboración',
    paragraphs: [
      'Enviar una solicitud no crea obligaciones contractuales. Las condiciones de colaboración se acuerdan por separado con un manager tras la aprobación.',
    ],
  },
  {
    title: '3. Veracidad de la información',
    paragraphs: [
      'Usted se compromete a proporcionar datos de contacto veraces y confirma que tiene al menos 18 años. Podemos rechazar una solicitud sin dar explicaciones.',
    ],
  },
  {
    title: '4. Propiedad intelectual',
    paragraphs: [
      'Los materiales del sitio (textos, diseño, logotipo) están protegidos por derechos de autor. Queda prohibida su copia sin consentimiento.',
    ],
  },
  {
    title: '5. Limitación de responsabilidad',
    paragraphs: [
      'La información del sitio es orientativa. Los ingresos y resultados dependen de muchos factores y no están garantizados.',
    ],
  },
  {
    title: '6. Ley aplicable',
    paragraphs: [
      'El uso del sitio se rige por estos términos y la legislación aplicable. Las disputas se resolverán mediante negociación cuando sea posible.',
    ],
  },
];
