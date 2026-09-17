import type { Locale } from '@/i18n/routing';
import { resolveLocale } from '@/lib/content/locale';

/**
 * Автор-персона блога — Оксана Ткаченко (утверждено владельцем 18.09.2026).
 *
 * E-E-A-T-актив: то же имя и та же роль, что в интервью Washington Post
 * («Оксана, керівниця відділу менеджменту OFM Models») — автор блога и публичный
 * спикер агентства — один человек. Фактура согласована и приукрашивать её
 * ЗАПРЕЩЕНО: агентство работает с 2022 года; за каждой моделью закреплены
 * персональный менеджер, помощник, чат-команда и трафик-отдел; в одной команде
 * 3–8 моделей.
 *
 * Аватар — фирменная ИЛЛЮСТРАЦИЯ, а не фотография. В alt честно пишем
 * «иллюстрированный портрет»: выдавать рисунок за фото реального человека
 * нельзя (пресса рядом, фейковая личность = удар по репутации).
 */

export type BlogAuthorLocaleContent = {
  name: string;
  /** Короткая роль для байлайна под шапкой статьи. */
  role: string;
  /** Биография для страницы автора — текст утверждён дословно, не менять без владельца. */
  bio: string;
  /** alt аватара: это иллюстрация, НЕ фото. */
  avatarAlt: string;
  meta: { title: string; description: string };
  ui: {
    eyebrow: string;
    articlesHeading: string;
    /** Шаблон со счётчиком: {count} подставляется на странице. */
    articlesCount: string;
  };
};

export const BLOG_AUTHOR = {
  slug: 'oksana-tkachenko',
  avatar: '/blog/authors/oksana-tkachenko.jpg',
  /** 512×512, public/blog/authors/oksana-tkachenko.jpg */
  avatarWidth: 512,
  avatarHeight: 512,
} as const;

/** Единый путь страницы автора (используют байлайн, схемы и sitemap). */
export const BLOG_AUTHOR_PATH = `/blog/author/${BLOG_AUTHOR.slug}`;

const AUTHOR_BY_LOCALE: Record<Locale, BlogAuthorLocaleContent> = {
  ru: {
    name: 'Оксана Ткаченко',
    role: 'руководитель отдела менеджмента OFM Models',
    bio: 'Оксана Ткаченко — руководитель отдела менеджмента OFM Models. В индустрии с 2022 года. Курирует менеджерские команды агентства: за каждой моделью закреплены персональный менеджер, помощник, чат-команда и трафик-отдел, в одной команде — от 3 до 8 моделей. В блоге пишет о том, с чем девушки сталкиваются каждый день: старт с нуля, безопасность и анонимность, налоги и реальные цифры заработка. Все советы — из практики агентства.',
    avatarAlt: 'Оксана Ткаченко — иллюстрированный портрет',
    meta: {
      title: 'Оксана Ткаченко — автор блога OFM Models',
      description:
        'Оксана Ткаченко — руководитель отдела менеджмента OFM Models, в индустрии с 2022 года. Статьи о старте на OnlyFans с нуля, безопасности, налогах и реальных цифрах заработка.',
    },
    ui: {
      eyebrow: 'Автор блога',
      articlesHeading: 'Статьи автора',
      articlesCount: 'Статей в блоге: {count}',
    },
  },
  uk: {
    name: 'Оксана Ткаченко',
    role: 'керівниця відділу менеджменту OFM Models',
    bio: 'Оксана Ткаченко — керівниця відділу менеджменту OFM Models. В індустрії з 2022 року. Керує менеджерськими командами агентства: за кожною моделлю закріплені персональний менеджер, помічник, чат-команда і трафік-відділ, в одній команді — від 3 до 8 моделей. У блозі пише про те, з чим дівчата стикаються щодня: старт із нуля, безпека й анонімність, податки та реальні цифри заробітку. Усі поради — з практики агентства.',
    avatarAlt: 'Оксана Ткаченко — ілюстрований портрет',
    meta: {
      title: 'Оксана Ткаченко — авторка блогу OFM Models',
      description:
        'Оксана Ткаченко — керівниця відділу менеджменту OFM Models, в індустрії з 2022 року. Статті про старт на OnlyFans із нуля, безпеку, податки та реальні цифри заробітку.',
    },
    ui: {
      eyebrow: 'Авторка блогу',
      articlesHeading: 'Статті авторки',
      articlesCount: 'Статей у блозі: {count}',
    },
  },
  en: {
    name: 'Oksana Tkachenko',
    role: 'Head of Talent Management, OFM Models',
    bio: "Oksana Tkachenko is Head of Talent Management at OFM Models, working in the creator industry since 2022. She oversees the agency's management teams: each model works with a dedicated manager, an assistant, a chat team and a traffic department, with 3 to 8 models per team. On the blog she writes about what creators face every day: starting from zero, safety and anonymity, taxes and real earning numbers. Every guide is based on the agency's hands-on experience.",
    avatarAlt: 'Oksana Tkachenko — illustrated portrait',
    meta: {
      title: 'Oksana Tkachenko — OFM Models Blog Author',
      description:
        'Oksana Tkachenko is Head of Talent Management at OFM Models, in the creator industry since 2022. Guides on starting on OnlyFans from zero, safety, taxes and real earning numbers.',
    },
    ui: {
      eyebrow: 'Blog author',
      articlesHeading: 'Articles by Oksana Tkachenko',
      articlesCount: 'Articles on the blog: {count}',
    },
  },
  es: {
    name: 'Oksana Tkachenko',
    role: 'Jefa de Management, OFM Models',
    bio: 'Oksana Tkachenko es jefa del departamento de management de OFM Models y trabaja en la industria desde 2022. Supervisa los equipos de la agencia: cada modelo cuenta con un manager personal, un asistente, un equipo de chat y un departamento de tráfico, con 3 a 8 modelos por equipo. En el blog escribe sobre lo que las creadoras enfrentan cada día: empezar desde cero, seguridad y anonimato, impuestos y cifras reales de ingresos. Todos los consejos salen de la práctica de la agencia.',
    avatarAlt: 'Oksana Tkachenko — retrato ilustrado',
    meta: {
      title: 'Oksana Tkachenko — autora del blog de OFM Models',
      description:
        'Oksana Tkachenko es jefa del departamento de management de OFM Models, en la industria desde 2022. Guías sobre empezar en OnlyFans desde cero, seguridad, impuestos y cifras reales de ingresos.',
    },
    ui: {
      eyebrow: 'Autora del blog',
      articlesHeading: 'Artículos de Oksana Tkachenko',
      articlesCount: 'Artículos en el blog: {count}',
    },
  },
};

export function getBlogAuthorContent(locale?: string | Locale): BlogAuthorLocaleContent {
  return AUTHOR_BY_LOCALE[resolveLocale(locale as string | undefined)];
}
