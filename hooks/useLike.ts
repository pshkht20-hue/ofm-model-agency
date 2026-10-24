'use client';

import { useCallback, useEffect, useState } from 'react';
import type { LikeKind } from '@/lib/likes/storage';
import { isItemLiked, setItemLiked } from '@/lib/likes/storage';

/** Отметка «Нравится» только в браузере девушки, без счётчика (решение №6, 24.10.2026). */
export function useLike(kind: LikeKind, itemId: string) {
  const [liked, setLiked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLiked(isItemLiked(kind, itemId));
    setReady(true);
  }, [kind, itemId]);

  const toggle = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;
      setItemLiked(kind, itemId, next);
      return next;
    });
  }, [kind, itemId]);

  return { liked: ready && liked, toggle, ready };
}
