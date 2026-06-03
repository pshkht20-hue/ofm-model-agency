/**
 * Кейсы моделей. Замените image на свои файлы из public/models/
 * (см. public/models/README.md).
 */
export type ModelCase = {
  id: string;
  /** Псевдоним или «Модель A» — без реальных имён, если нужна анонимность */
  name: string;
  earnings: string;
  growth: string;
  /** Путь от public/: /models/model-1.webp */
  image: string;
  /** Крупная карточка в сетке */
  featured?: boolean;
  tag?: string;
};

export const modelCases: ModelCase[] = [
  {
    id: '1',
    name: 'Анна',
    earnings: '$28,400',
    growth: '+340%',
    image: '/models/model-1.svg',
    featured: true,
    tag: 'TOP MODEL',
  },
  {
    id: '2',
    name: 'Виктория',
    earnings: '$19,700',
    growth: '+210%',
    image: '/models/model-2.svg',
    tag: 'TOP MODEL',
  },
  {
    id: '3',
    name: 'София',
    earnings: '$32,100',
    growth: '+480%',
    image: '/models/model-3.svg',
    tag: 'TOP MODEL',
  },
];
