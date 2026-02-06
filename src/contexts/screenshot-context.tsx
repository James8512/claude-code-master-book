"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type ScreenshotRecord,
  getAllScreenshots,
  saveScreenshot,
  deleteScreenshot,
} from "@/lib/screenshot-db";

interface ScreenshotContextValue {
  /** id → thumbnail URL */
  screenshots: Map<string, string>;
  /** 전체 완료 개수 */
  completedCount: number;
  /** 챕터별 완료 개수 */
  chapterCounts: Map<string, number>;
  /** 스크린샷 업로드 */
  upload: (chapterSlug: string, index: number, file: Blob) => Promise<void>;
  /** 스크린샷 삭제 */
  remove: (id: string) => Promise<void>;
  /** 원본 이미지 가져오기 (ZIP용) */
  getAllRecords: () => Promise<ScreenshotRecord[]>;
}

const ScreenshotContext = createContext<ScreenshotContextValue | null>(null);

export function ScreenshotProvider({ children }: { children: React.ReactNode }) {
  // id → thumbnail object URL
  const [screenshots, setScreenshots] = useState<Map<string, string>>(new Map());
  // id → ScreenshotRecord (thumbnail Blob 캐시)
  const [records, setRecords] = useState<Map<string, ScreenshotRecord>>(new Map());

  // 초기 로드
  useEffect(() => {
    let cancelled = false;
    getAllScreenshots().then((all) => {
      if (cancelled) return;
      const urlMap = new Map<string, string>();
      const recMap = new Map<string, ScreenshotRecord>();
      for (const rec of all) {
        urlMap.set(rec.id, URL.createObjectURL(rec.thumbnail));
        recMap.set(rec.id, rec);
      }
      setScreenshots(urlMap);
      setRecords(recMap);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      screenshots.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chapterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const rec of records.values()) {
      counts.set(rec.chapterSlug, (counts.get(rec.chapterSlug) ?? 0) + 1);
    }
    return counts;
  }, [records]);

  const upload = useCallback(
    async (chapterSlug: string, index: number, file: Blob) => {
      const rec = await saveScreenshot(chapterSlug, index, file);
      setScreenshots((prev) => {
        const next = new Map(prev);
        const old = next.get(rec.id);
        if (old) URL.revokeObjectURL(old);
        next.set(rec.id, URL.createObjectURL(rec.thumbnail));
        return next;
      });
      setRecords((prev) => {
        const next = new Map(prev);
        next.set(rec.id, rec);
        return next;
      });
    },
    [],
  );

  const remove = useCallback(async (id: string) => {
    await deleteScreenshot(id);
    setScreenshots((prev) => {
      const next = new Map(prev);
      const old = next.get(id);
      if (old) URL.revokeObjectURL(old);
      next.delete(id);
      return next;
    });
    setRecords((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const value: ScreenshotContextValue = useMemo(
    () => ({
      screenshots,
      completedCount: screenshots.size,
      chapterCounts,
      upload,
      remove,
      getAllRecords: getAllScreenshots,
    }),
    [screenshots, chapterCounts, upload, remove],
  );

  return (
    <ScreenshotContext.Provider value={value}>
      {children}
    </ScreenshotContext.Provider>
  );
}

export function useScreenshots() {
  const ctx = useContext(ScreenshotContext);
  if (!ctx) throw new Error("useScreenshots must be used inside ScreenshotProvider");
  return ctx;
}
