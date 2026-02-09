"use client";

import { Trophy, Download } from "lucide-react";
import { useState } from "react";
import { useScreenshots } from "@/contexts/screenshot-context";
import { PRACTICE_COUNTS, TOTAL_PRACTICE_ITEMS } from "@/lib/constants";
import { SubmissionModal } from "./submission-modal";

function ProgressRing({
  progress,
  size = 72,
  stroke = 5,
}: {
  progress: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-muted-foreground/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-accent transition-all duration-500"
      />
    </svg>
  );
}

const CHAPTER_SLUGS = Object.keys(PRACTICE_COUNTS);

export function AchievementSidebar() {
  const { completedCount, chapterCounts } = useScreenshots();
  const [showModal, setShowModal] = useState(false);
  const progress = TOTAL_PRACTICE_ITEMS > 0 ? completedCount / TOTAL_PRACTICE_ITEMS : 0;

  return (
    <>
      <div className="mb-6 rounded-lg border border-border bg-card p-3">
        {/* 프로그레스 링 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <ProgressRing progress={progress} size={56} stroke={4} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-accent" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {completedCount} / {TOTAL_PRACTICE_ITEMS}
            </p>
            <p className="text-xs text-muted-foreground">
              실습 완료 ({Math.round(progress * 100)}%)
            </p>
          </div>
        </div>

        {/* 챕터별 미니 진행바 */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {CHAPTER_SLUGS.map((slug) => {
            const total = PRACTICE_COUNTS[slug];
            const done = chapterCounts.get(slug) ?? 0;
            const pct = total > 0 ? (done / total) * 100 : 0;
            const chNum = slug.split("-")[0];
            return (
              <div key={slug} className="flex items-center gap-2 text-xs">
                <span className="w-5 text-right text-muted-foreground tabular-nums">
                  {chNum}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-muted-foreground/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-muted-foreground tabular-nums">
                  {done}/{total}
                </span>
              </div>
            );
          })}
        </div>

        {/* 제출 버튼 */}
        {completedCount > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent/90"
          >
            <Download className="h-3.5 w-3.5" />
            결과물 제출
          </button>
        )}
      </div>

      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}
    </>
  );
}
