export type LikeKind = 'blog' | 'review';

const STORAGE_KEY = 'ofm-likes-v1';

type LikeStorage = {
  liked: string[];
};

function likeKey(kind: LikeKind, id: string): string {
  return `${kind}:${id}`;
}

function readStorage(): LikeStorage {
  if (typeof window === 'undefined') return { liked: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { liked: [] };
    const parsed = JSON.parse(raw) as LikeStorage;
    if (!Array.isArray(parsed.liked)) return { liked: [] };
    return { liked: parsed.liked.filter((k) => typeof k === 'string') };
  } catch {
    return { liked: [] };
  }
}

function writeStorage(data: LikeStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

export function isItemLiked(kind: LikeKind, id: string): boolean {
  return readStorage().liked.includes(likeKey(kind, id));
}

export function setItemLiked(kind: LikeKind, id: string, liked: boolean): void {
  const key = likeKey(kind, id);
  const data = readStorage();
  const set = new Set(data.liked);
  if (liked) set.add(key);
  else set.delete(key);
  writeStorage({ liked: [...set] });
}
