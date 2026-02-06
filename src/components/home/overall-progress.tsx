"use client";

import { Trophy } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

export function OverallProgress() {
  const { completed, total } = useProgress();
  const percentage = Math.round((completed.length / total) * 100);

  if (completed.length === 0) return null;

  return (
    <section className="border-b border-border bg-muted/50 py-6">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-4">
        <Trophy className="h-5 w-5 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="font-medium">학습 진행률</span>
            <span className="text-muted-foreground">
              {completed.length}/{total} 챕터 ({percentage}%)
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
