"use client";

import { useCallback, useRef } from "react";
import { useScreenshots } from "@/contexts/screenshot-context";

export function useScreenshotUpload(chapterSlug: string, index: number) {
  const { upload } = useScreenshots();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const id = `${chapterSlug}-${index}`;

  const handleFileSelect = useCallback(() => {
    if (!inputRef.current) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";
      document.body.appendChild(input);
      inputRef.current = input;
    }

    const input = inputRef.current;
    // clear previous value so same file can be re-selected
    input.value = "";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await upload(chapterSlug, index, file);
    };
    input.click();
  }, [chapterSlug, index, upload]);

  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (blob) await upload(chapterSlug, index, blob);
          return;
        }
      }
    },
    [chapterSlug, index, upload],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        await upload(chapterSlug, index, file);
      }
    },
    [chapterSlug, index, upload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return { id, handleFileSelect, handlePaste, handleDrop, handleDragOver };
}
