import type { LegalSection } from './types';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '1. General provisions',
    paragraphs: [
      'This Privacy Policy describes how OFM\'s Model Agency ("we", "the agency") processes personal data when you use ofmmodels.com and submit an application.',
      'Data controller: OFM\'s Model Agency. For privacy inquiries, contact us via the application form on the website.',
      'By using the website after reading this policy, you acknowledge these processing terms. Submitting an application constitutes consent to process the data you provide for the purpose of contacting you.',
    ],
  },
  {
    title: '2. Data we collect',
    paragraphs: [
      'Application data (you provide voluntarily): name, age (if provided), Telegram contact or phone number, interests (if filled in), 18+ age confirmation.',
      'Technical data when submitting an application: approximate location (country and city) based on IP address — for internal processing by our team only; full IP addresses are not included in notifications.',
      'Website visit data: interface language, browser and device type, pages viewed — only if you consent to analytics cookies (Google Analytics 4).',
      'Necessary cookies: storing your language preference and your cookie consent choice.',
    ],
  },
  {
    title: '3. Cookies and similar technologies',
    paragraphs: [
      'Necessary cookies enable core website functionality (language, remembering your cookie choice). They do not require separate consent.',
      'Analytics cookies (Google Analytics 4) are used only after your explicit consent via the "Accept all" banner. If you choose "Necessary only", analytics is not activated.',
      'You may change your choice at any time via "Cookie settings" in the website footer.',
      'Your consent record is stored until you change your choice or clear browser data.',
    ],
  },
  {
    title: '4. Purposes and legal bases',
    paragraphs: [
      'Processing your application and contacting you — performance of your request / pre-contractual steps.',
      'Approximate IP-based geolocation when you apply — legitimate interest to evaluate applications and organize manager workflows.',
      'Visit analytics — your consent (for users in the EU/EEA and other jurisdictions where required).',
      'Website security and legal compliance — legitimate interest and legal obligations.',
    ],
  },
  {
    title: '5. Disclosure to third parties',
    paragraphs: [
      'Application data is shared with authorized agency managers and notification delivery services (Telegram Bot API) solely to handle your request.',
      'Google Analytics (Google LLC) — only with your consent to analytics cookies; data may be processed on Google servers, including outside your country.',
      'Website hosting (Vercel Inc.) processes technical data to provide infrastructure.',
      'We do not sell or rent personal data to third parties for their marketing.',
    ],
  },
  {
    title: '6. Retention and security',
    paragraphs: [
      'Application data is retained in manager correspondence and Telegram notifications as long as needed to review your application and potential collaboration, but not beyond a reasonable period without your consent.',
      'GA4 analytics data is retained according to Google Analytics settings (by default up to 14 months for standard reports).',
      'We apply organizational and technical measures: HTTPS, restricted access to notifications, server-side storage of secret keys.',
    ],
  },
  {
    title: '7. Your rights',
    paragraphs: [
      'You may request access, correction, deletion, restriction of processing, or object to processing — via the application form on the website.',
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
      'Last updated: June 2026.',
    ],
  },
];

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
