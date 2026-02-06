"use client";

import { useCallback, useEffect, useState } from "react";
import { getCompletedChapters, toggleChapterComplete } from "@/lib/progress";

export function useProgress() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompletedChapters());
  }, []);

  const toggle = useCallback((chapter: number) => {
    const updated = toggleChapterComplete(chapter);
    setCompleted([...updated]);
  }, []);

  const isComplete = useCallback(
    (chapter: number) => completed.includes(chapter),
    [completed]
  );

  return { completed, toggle, isComplete, total: 18 };
}
