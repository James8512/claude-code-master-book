"use client";

import { Check, Circle } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

interface CompletionButtonProps {
  chapter: number;
}

export function CompletionButton({ chapter }: CompletionButtonProps) {
  const { toggle, isComplete } = useProgress();
  const completed = isComplete(chapter);

  return (
    <button
      onClick={() => toggle(chapter)}
      className={cn(
        "mt-8 flex w-full items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all",
        completed
          ? "border-green-500/50 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-950/30"
          : "border-accent/50 bg-accent/5 text-accent hover:bg-accent/10"
      )}
    >
      {completed ? (
        <>
          <Check className="h-4 w-4" />
          완료! 다시 클릭하면 해제됩니다
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          이 팁을 완료로 표시하기
        </>
      )}
    </button>
  );
}
