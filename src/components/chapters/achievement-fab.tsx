"use client";

import { Trophy, X, Download } from "lucide-react";
import { useState } from "react";
import { useScreenshots } from "@/contexts/screenshot-context";
import { PRACTICE_COUNTS, TOTAL_PRACTICE_ITEMS } from "@/lib/constants";
import { SubmissionModal } from "./submission-modal";

const CHAPTER_SLUGS = Object.keys(PRACTICE_COUNTS);

export function AchievementFab() {
  const { completedCount, chapterCounts } = useScreenshots();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const progress = TOTAL_PRACTICE_ITEMS > 0 ? completedCount / TOTAL_PRACTICE_ITEMS : 0;

  return (
    <>
      {/* FAB 버튼 - 모바일/태블릿 only (xl:hidden) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95 xl:hidden"
        aria-label="업적 현황"
      >
        <Trophy className="h-6 w-6" />
        {completedCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 px-1 text-[10px] font-bold text-white">
            {completedCount}
          </span>
        )}
      </button>

      {/* 슬라이드업 패널 */}
      {open && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-50 bg-black/40 xl:hidden"
            onClick={() => setOpen(false)}
          />

          {/* 패널 */}
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-card p-5 shadow-2xl animate-in slide-in-from-bottom duration-300 xl:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <Trophy className="h-5 w-5 text-accent" />
                실습 진행 현황
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 전체 진행률 */}
            <div className="mb-4 text-center">
              <p className="text-2xl font-bold text-accent">
                {Math.round(progress * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {completedCount} / {TOTAL_PRACTICE_ITEMS} 실습 완료
              </p>
            </div>

            {/* 챕터별 현황 */}
            <div className="space-y-2 mb-4">
              {CHAPTER_SLUGS.map((slug) => {
                const total = PRACTICE_COUNTS[slug];
                const done = chapterCounts.get(slug) ?? 0;
                const pct = total > 0 ? (done / total) * 100 : 0;
                const chNum = slug.split("-")[0];
                return (
                  <div key={slug} className="flex items-center gap-2 text-sm">
                    <span className="w-6 text-right text-muted-foreground tabular-nums">
                      {chNum}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-muted-foreground/15 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-muted-foreground tabular-nums">
                      {done}/{total}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 제출 버튼 */}
            {completedCount > 0 && (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowModal(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                <Download className="h-4 w-4" />
                결과물 제출
              </button>
            )}
          </div>
        </>
      )}

      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}
    </>
  );
}
