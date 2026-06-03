'use client';

import { useCallback, useEffect, useState } from 'react';
import type { LikeKind } from '@/lib/likes/storage';
import { isItemLiked, setItemLiked } from '@/lib/likes/storage';

export function useLike(kind: LikeKind, itemId: string, baseCount: number) {
  const [liked, setLiked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLiked(isItemLiked(kind, itemId));
    setReady(true);
  }, [kind, itemId]);

  const count = baseCount + (ready && liked ? 1 : 0);

  const toggle = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;
      setItemLiked(kind, itemId, next);
      return next;
    });
  }, [kind, itemId]);

  return { liked: ready && liked, count, toggle, ready };
}
