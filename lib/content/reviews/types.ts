export type AgencyReply = {
  text: string;
  /** См. ModelReview.dateLabel — то же правило. */
  dateLabel?: string;
};

export type ModelReview = {
  id: string;
  name: string;
  meta: string;
  /**
   * Опционально и СОЗНАТЕЛЬНО пусто (29.07.2026). Раньше здесь стояли
   * захардкоженные строки вида «4 дня назад», которые не менялись месяцами —
   * это читается как накрутка отзывов и бьёт по доверию сильнее, чем польза
   * от самой датировки. Заполнять только реальной датой отзыва; если реальной
   * даты нет — оставлять пустым, карточка отрендерится без времени.
   */
  dateLabel?: string;
  text: string;
  rating: number;
  resultNote?: string;
  initials: string;
  avatarHue: number;
  tags?: string[];
  helpfulCount?: number;
  agencyReply?: AgencyReply;
  featured?: boolean;
};
