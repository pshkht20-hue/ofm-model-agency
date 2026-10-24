import { ANALYTICS_EVENTS } from '@/lib/analytics/events';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const API_SECRET = process.env.GA4_API_SECRET;

type ServerEventParams = Record<string, string | number | boolean>;

/**
 * GA4 Measurement Protocol — server-side conversion (works without cookie consent).
 * Set GA4_API_SECRET in Vercel (Admin → Data streams → Measurement Protocol API secrets).
 */
export async function trackServerEvent(
  eventName: string,
  params: ServerEventParams,
): Promise<void> {
  if (!MEASUREMENT_ID || !API_SECRET) return;

  const clientId = crypto.randomUUID();

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          events: [{ name: eventName, params }],
        }),
        // Вызывающий код ждёт этот запрос (иначе serverless-инстанс замерзает
        // раньше, чем событие уйдёт). Потолок, чтобы аналитика не тормозила ответ.
        signal: AbortSignal.timeout(2500),
      },
    );
  } catch {
    // Non-blocking — never fail the application API for analytics
  }
}

export async function trackContactSubmitServer(params: {
  locale: string;
  has_calc_prefill: boolean;
  country?: string;
  landing_page?: string;
  traffic_source?: string;
  /** «Окно 1»: роль, тип формы и ступень, с которой заявка дошла (lib/lead-delivery.ts). */
  role?: 'model' | 'chatter';
  form_type?: 'full' | 'quick';
  delivery?: string;
}) {
  await trackServerEvent(ANALYTICS_EVENTS.CONTACT_SUBMIT_SERVER, {
    locale: params.locale,
    has_calc_prefill: params.has_calc_prefill,
    ...(params.role ? { role: params.role } : {}),
    ...(params.form_type ? { form_type: params.form_type } : {}),
    ...(params.delivery ? { delivery: params.delivery } : {}),
    ...(params.country ? { country: params.country } : {}),
    ...(params.landing_page ? { landing_page: params.landing_page } : {}),
    ...(params.traffic_source ? { traffic_source: params.traffic_source } : {}),
  });
}
