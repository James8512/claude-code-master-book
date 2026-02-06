"use client";

import { CheckSquare, Square, ImagePlus, X, Camera } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScreenshots } from "@/contexts/screenshot-context";

// ─── Practice Context (chapterSlug + auto-index) ────────────────────

interface PracticeContextValue {
  chapterSlug: string;
  nextIndex: () => number;
}

const PracticeCtx = createContext<PracticeContextValue | null>(null);

interface PracticeProps {
  children: React.ReactNode;
  chapterSlug?: string;
}

export function Practice({ children, chapterSlug = "" }: PracticeProps) {
  const counterRef = useRef(0);

  // 매 렌더마다 카운터 리셋
  counterRef.current = 0;

  const nextIndex = useCallback(() => {
    return counterRef.current++;
  }, []);

  return (
    <PracticeCtx.Provider value={{ chapterSlug, nextIndex }}>
      <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-accent">
          <CheckSquare className="h-4 w-4" />
          직접 해보세요
        </h4>
        <div className="space-y-1">{children}</div>
      </div>
    </PracticeCtx.Provider>
  );
}

// ─── PracticeItem ───────────────────────────────────────────────────

export function PracticeItem({ children }: { children: React.ReactNode }) {
  const ctx = useContext(PracticeCtx);
  const [index] = useState(() => ctx?.nextIndex() ?? 0);
  const chapterSlug = ctx?.chapterSlug ?? "";
  const id = `${chapterSlug}-${index}`;

  const { screenshots, upload, remove } = useScreenshots();
  const thumbnailUrl = screenshots.get(id);
  const hasScreenshot = !!thumbnailUrl;

  const [checked, setChecked] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // sync checked state with screenshot existence
  useEffect(() => {
    setChecked(hasScreenshot);
  }, [hasScreenshot]);

  const handleFileSelect = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await upload(chapterSlug, index, file);
    };
    input.click();
  }, [chapterSlug, index, upload]);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        await upload(chapterSlug, index, file);
      }
    },
    [chapterSlug, index, upload],
  );

  // 클립보드 붙여넣기 지원
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const handlePaste = async (e: ClipboardEvent) => {
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
    };

    el.addEventListener("paste", handlePaste);
    return () => el.removeEventListener("paste", handlePaste);
  }, [chapterSlug, index, upload]);

  const handleRemove = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      await remove(id);
    },
    [id, remove],
  );

  return (
    <div
      ref={dropRef}
      tabIndex={0}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`rounded-md border transition-colors ${
        isDragOver
          ? "border-accent bg-accent/10"
          : hasScreenshot
            ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
            : "border-transparent"
      }`}
    >
      {/* 체크행 */}
      <button
        onClick={() => {
          if (!hasScreenshot) setChecked(!checked);
        }}
        className="flex w-full items-start gap-2 p-1 text-left text-sm transition-colors hover:bg-accent/10 rounded"
      >
        {hasScreenshot ? (
          <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
        ) : checked ? (
          <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
        ) : (
          <Square className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
        )}
        <span
          className={
            hasScreenshot ? "text-green-700 dark:text-green-400" : checked ? "line-through text-muted-foreground" : ""
          }
        >
          {children}
        </span>
      </button>

      {/* 스크린샷 업로드 영역 */}
      <div className="ml-6 mt-1 mb-2">
        {hasScreenshot ? (
          <div className="group relative inline-block">
            <img
              src={thumbnailUrl}
              alt="업로드된 스크린샷"
              className="h-16 w-auto rounded border border-green-200 dark:border-green-800 object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute -right-1.5 -top-1.5 hidden rounded-full bg-red-500 p-0.5 text-white shadow group-hover:block"
              title="삭제"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleFileSelect}
            className="flex items-center gap-1.5 rounded border border-dashed border-muted-foreground/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Camera className="h-3.5 w-3.5" />
            스크린샷 첨부
          </button>
        )}
      </div>
    </div>
  );
}
