function hashId(value: string, modulo: number): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h + value.charCodeAt(i) * (i + 3)) % 1009;
  }
  return h % modulo;
}

/** Стабильное «базовое» число лайков для статей блога (социальное доказательство). */
export function getBlogLikeSeed(slug: string): number {
  return 18 + hashId(slug, 74);
}

export function getReviewLikeBase(id: string, helpfulCount?: number): number {
  if (helpfulCount !== undefined) return helpfulCount;
  return 4 + hashId(id, 11);
}
