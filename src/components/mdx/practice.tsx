"use client";

import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";

interface PracticeProps {
  children: React.ReactNode;
}

export function Practice({ children }: PracticeProps) {
  return (
    <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-accent">
        <CheckSquare className="h-4 w-4" />
        직접 해보세요
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function PracticeItem({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex w-full items-start gap-2 rounded p-1 text-left text-sm transition-colors hover:bg-accent/10"
    >
      {checked ? (
        <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
      ) : (
        <Square className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      )}
      <span className={checked ? "line-through text-muted-foreground" : ""}>{children}</span>
    </button>
  );
}
