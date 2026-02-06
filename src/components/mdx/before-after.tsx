import { ThumbsDown, ThumbsUp } from "lucide-react";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = "이렇게 하지 마세요",
  afterLabel = "이렇게 하세요",
}: BeforeAfterProps) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-red-500/30 bg-red-50/50 dark:bg-red-950/10 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400">
          <ThumbsDown className="h-4 w-4" />
          {beforeLabel}
        </div>
        <div className="rounded bg-background p-3 font-mono text-sm">{before}</div>
      </div>
      <div className="rounded-lg border border-green-500/30 bg-green-50/50 dark:bg-green-950/10 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
          <ThumbsUp className="h-4 w-4" />
          {afterLabel}
        </div>
        <div className="rounded bg-background p-3 font-mono text-sm">{after}</div>
      </div>
    </div>
  );
}
