"use client";

import { Search, X, FileText } from "lucide-react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  chapter: number;
  part: number;
  partTitle: string;
  tags: string[];
}

interface SearchDialogProps {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ items, open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        includeMatches: true,
      }),
    [items]
  );

  const results = useMemo(
    () => (query.length > 0 ? fuse.search(query).slice(0, 8) : []),
    [fuse, query]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="챕터 검색..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              검색어를 입력하세요
            </p>
          ) : results.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다
            </p>
          ) : (
            results.map(({ item }) => (
              <Link
                key={item.slug}
                href={`/chapters/${item.slug}`}
                onClick={onClose}
                className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
              >
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="text-sm font-medium">
                    Ch.{item.chapter} {item.title}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    Part {item.part}: {item.partTitle} — {item.description}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
