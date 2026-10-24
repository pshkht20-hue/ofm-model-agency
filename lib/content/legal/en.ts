import type { LegalSection } from './types';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '1. General provisions',
    paragraphs: [
      'This Privacy Policy describes how OFM\'s Model Agency ("we", "the agency") processes personal data when you use ofmmodels.com and submit an application.',
      'Data controller: OFM\'s Model Agency. Privacy questions and requests about personal data are accepted on Telegram: @ofmm_agency (marked "Data request").',
      'By using the website after reading this policy, you acknowledge these processing terms. Submitting an application constitutes consent to process the data you provide for the purpose of contacting you.',
    ],
  },
  {
    title: '2. Data we collect',
    paragraphs: [
      'Application data (you provide voluntarily): name, age (if provided), Telegram contact or phone number, interests (if filled in), 18+ age confirmation.',
      'Technical data when submitting an application: approximate location (country and city) based on IP address — for internal processing by our team only; full IP addresses are not included in notifications.',
      'Visit details when you apply: the page where you entered the site, the referring website (domain only, for example google.com), link tags (UTM) and the pages of our site opened in this tab, time spent on them, scroll depth and the page sections viewed, actions on the site (button and link clicks, calculator use, video views, opening FAQ questions, starting the application form), device and browser type, browser language and time zone. Without consent to analytics cookies, these details are kept only in the memory of the open tab and reach us only together with a submitted application; with consent, your first visit and the number of visits within the last 30 days are also stored.',
      'Website visit data: interface language, browser and device type, pages viewed — only if you consent to analytics cookies (Google Analytics 4).',
      'Behaviour data on pages (only with consent to analytics cookies, Microsoft Clarity service): clicks, scrolling, pointer movements, heatmaps and session recordings, that is, a replay of actions on a page. Clarity does not record what is typed into input fields, and we additionally hide the application form, the quick application and the screen shown after sending from recordings.',
      'Necessary cookies: storing your language preference and your cookie consent choice.',
    ],
  },
  {
    title: '3. Cookies and similar technologies',
    paragraphs: [
      'Necessary cookies enable core website functionality (language, remembering your cookie choice). They do not require separate consent.',
      'Analytics cookies (Google Analytics 4 and Microsoft Clarity: for example _ga, _clck, _clsk, plus Microsoft cookies on its own domains) are switched on only after explicit consent with the "Accept" button in the banner. If "Essential only" is chosen, analytics and session recordings stay off.',
      'You may change your choice at any time via "Cookie settings" in the website footer.',
      'If consent is withdrawn via "Cookie settings", analytics and session recordings switch off, and Google Analytics and Clarity cookies on this site are deleted.',
      'Your consent record is stored until you change your choice or clear browser data.',
    ],
  },
  {
    title: '4. Purposes and legal bases',
    paragraphs: [
      'Processing your application and contacting you — performance of your request / pre-contractual steps.',
      'Approximate IP-based geolocation when you apply — legitimate interest to evaluate applications and organize manager workflows.',
      'Visit details when you apply (referring source, pages and actions on the site, device): legitimate interest in understanding which site materials are useful to candidates and improving them.',
      'Visit analytics — your consent (for users in the EU/EEA and other jurisdictions where required).',
      'Heatmaps and session recordings (Microsoft Clarity): consent to analytics cookies.',
      'Website security and legal compliance — legitimate interest and legal obligations.',
    ],
  },
  {
    title: '5. Disclosure to third parties',
    paragraphs: [
      'Application data is shared with authorized agency managers and notification delivery services (Telegram Bot API) solely to handle your request.',
      'Google Analytics (Google LLC) — only with your consent to analytics cookies; data may be processed on Google servers, including outside your country.',
      'Microsoft Clarity (Microsoft Corporation): only with consent to analytics cookies; data is stored in the Microsoft Azure cloud and may be processed outside the user\'s country.',
      'Website hosting (Vercel Inc.) processes technical data to provide infrastructure.',
      'We do not sell or rent personal data to third parties for their marketing.',
    ],
  },
  {
    title: '6. Retention and security',
    paragraphs: [
      'Application data is retained in manager correspondence and Telegram notifications as long as needed to review your application and potential collaboration, but not beyond a reasonable period without your consent.',
      'GA4 analytics data is retained according to Google Analytics settings (by default up to 14 months for standard reports).',
      'Microsoft Clarity session recordings are kept for up to 30 days; individual recordings (marked manually or picked by the service in a random sample) for up to 9 months.',
      'If an application notification cannot be delivered, its data may be kept briefly in the hosting provider\'s technical logs (Vercel) so that the application is not lost.',
      'We apply organizational and technical measures: HTTPS, restricted access to notifications, server-side storage of secret keys.',
    ],
  },
  {
    title: '7. Your rights',
    paragraphs: [
      'You can request access to your data, its correction or deletion, restriction of processing, or object to processing: send the request on Telegram to @ofmm_agency marked "Data request".',
      'You may withdraw consent to analytics cookies at any time via "Cookie settings" in the footer.',
      'EU/EEA residents may lodge a complaint with their local data protection authority if they believe processing violates the GDPR.',
      'We will respond within a reasonable time, typically within 30 days.',
    ],
  },
  {
    title: '8. Age',
    paragraphs: [
      'The website and application form are intended for individuals aged 18 or older. By submitting an application, you confirm that you are at least 18 years old.',
    ],
  },
  {
    title: '9. Policy updates',
    paragraphs: [
      'We may update this policy. The current version is always published on this page. Material cookie changes may trigger the consent banner again.',
    ],
  },
];

/**
 * Абзац о резервном хранилище заявок (W1-24): показывается в разделе 6 только
 * если хранилище подключено (lib/content/legal/index.ts, переменные KV/Upstash).
 */
export const PRIVACY_STORE_PARAGRAPH = 'A copy of an application that could not be delivered to the manager right away is kept in backup storage (Upstash, via Vercel) for up to 30 days and then deleted.';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: '1. Purpose of the website',
    paragraphs: [
      'The OFM\'s Model Agency website provides information about agency services and an application form. The website is not an official OnlyFans representative.',
    ],
  },
  {
    title: '2. Applications and collaboration',
    paragraphs: [
      'Submitting an application does not create contractual obligations. Collaboration terms are agreed separately with a manager after approval.',
    ],
  },
  {
    title: '3. Accuracy of information',
    paragraphs: [
      'You agree to provide accurate contact details and confirm that you are at least 18 years old. We may decline an application without stating reasons.',
    ],
  },
  {
    title: '4. Intellectual property',
    paragraphs: [
      'Website materials (text, design, logo) are protected by copyright. Copying without permission is prohibited.',
    ],
  },
  {
    title: '5. Limitation of liability',
    paragraphs: [
      'Information on the website is for reference only. Income and results depend on many factors and are not guaranteed.',
    ],
  },
  {
    title: '6. Governing law',
    paragraphs: [
      'Use of the website is governed by these terms and applicable law. Disputes should be resolved through negotiation where possible.',
    ],
  },
];
