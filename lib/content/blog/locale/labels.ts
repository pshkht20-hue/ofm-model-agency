import type { Locale } from '@/i18n/routing';
import type { BlogCategory } from '@/lib/content/blog/types';

const LABELS_RU: Record<BlogCategory, string> = {
  agency: 'Агентство и management',
  marketing: 'Маркетинг и рост',
  money: 'Деньги и монетизация',
  start: 'Старт и контент',
  safety: 'Безопасность',
};

const LABELS_EN: Record<BlogCategory, string> = {
  agency: 'Agency & management',
  marketing: 'Marketing & growth',
  money: 'Money & monetization',
  start: 'Getting started & content',
  safety: 'Safety & privacy',
};

const LABELS_ES: Record<BlogCategory, string> = {
  agency: 'Agencia y management',
  marketing: 'Marketing y crecimiento',
  money: 'Dinero y monetización',
  start: 'Inicio y contenido',
  safety: 'Seguridad y privacidad',
};

const LABELS_UK: Record<BlogCategory, string> = {
  agency: 'Агентство та management',
  marketing: 'Маркетинг і зростання',
  money: 'Гроші та монетизація',
  start: 'Старт і контент',
  safety: 'Безпека та конфіденційність',
};

export function getBlogCategoryLabels(locale: Locale): Record<BlogCategory, string> {
  switch (locale) {
    case 'en':
      return LABELS_EN;
    case 'es':
      return LABELS_ES;
    case 'uk':
      return LABELS_UK;
    case 'ru':
    default:
      return LABELS_RU;
  }
}
