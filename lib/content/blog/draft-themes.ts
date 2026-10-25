/**
 * Тема статьи для готового первого сообщения в Telegram (Telegram-тексты v2,
 * решение владельца 25.10.2026): «Читала у вас на сайте про <тему>».
 *
 * Отдельный лёгкий модуль без импортов: его читают клиентские кнопки Telegram
 * (шапка, подвал, CTA статьи), поэтому тянуть сюда тексты статей нельзя.
 * Группы повторяют category статьи: money = заработок, start = старт,
 * safety = безопасность. agency и marketing сюда не входят и получают общий
 * текст «Была у вас на сайте». Из start осознанно убраны чисто справочные
 * статьи (что такое OnlyFans, как он работает, кто создал, онлик): «про то,
 * как начать» к ним не подходит, у них тоже общий текст.
 *
 * Новая статья без записи здесь получает общий текст: это безопасный фолбэк,
 * но тему лучше добавить сюда в том же коммите, что и статью.
 */

export type BlogDraftTheme = 'money' | 'start' | 'safety';

export const BLOG_DRAFT_THEMES: Readonly<Record<string, BlogDraftTheme>> = {
  // money: заработок
  'onlyfans-chaty-dm-prodazhi': 'money',
  'onlyfans-tseny-podpiska-ppv': 'money',
  'onlyfans-skolko-zarabatyvayut-modeli': 'money',
  'onlyfans-kak-vyvesti-dengi-ukraina': 'money',
  'onlyfans-vs-fansly-loyalfans': 'money',
  'vebkam-ili-onlyfans': 'money',
  'kak-zarabatyvat-na-onlyfans': 'money',
  'loyalfans-fansly-chto-eto': 'money',

  // safety: безопасность и приватность
  'onlyfans-anonimnost-i-bezopasnost': 'safety',
  'onlyfans-rabota-bez-lica': 'safety',
  'onlyfans-rabota-legalno-i-bezopasno': 'safety',
  'onlyfans-zakon-nalogi-ukraina': 'safety',
  'onlyfans-nalogi-i-legalnost-v-es': 'safety',

  // start: как начать
  'onlyfans-rabota-polsha': 'start',
  'onlyfans-rabota-germaniya': 'start',
  'onlyfans-rabota-chehiya': 'start',
  'robota-dlya-ukrainok-za-kordonom': 'start',
  'onlyfans-agentstvo-dlya-nachinayushchih': 'start',
  'onlyfans-kontent-plan-i-syomki': 'start',
  'onlyfans-oshibki-novichkov': 'start',
  'rabota-modelyu-onlyfans': 'start',
  'kak-stat-onlyfans-modelyu-s-nulya': 'start',
  'kak-zaregistrirovatsya-na-onlyfans': 'start',
  'stoit-li-nachinat-onlyfans': 'start',
  'onlyfans-modeli-kto-eto': 'start',
  'rabota-dlya-mam-v-dekrete': 'start',
  'rabota-dlya-devushek-onlajn': 'start',
  'tipazhi-modelej-onlyfans': 'start',
  'onlyfans-agency-for-japanese-creators': 'start',
  'rabota-dlya-studentok': 'start',
  'mature-modeli-onlyfans': 'start',
  'plus-size-modeli-onlyfans': 'start',
  'alt-modeli-onlyfans': 'start',
  'fitness-modeli-onlyfans': 'start',
  'foto-dlya-onlyfans': 'start',
  'onlyfans-v-ukraine': 'start',
  'vysokie-modeli-onlyfans': 'start',
  'cosplay-modeli-onlyfans': 'start',
};
