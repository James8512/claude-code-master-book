import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface NavChapter {
  slug: string;
  title: string;
  chapter: number;
}

interface ChapterNavProps {
  prev?: NavChapter;
  next?: NavChapter;
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          href={`/chapters/${prev.slug}`}
          className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-accent hover:bg-accent/5 sm:max-w-[50%]"
        >
          <ArrowLeft className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">이전</div>
            <div className="truncate text-sm font-medium">
              Tip {prev.chapter} {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/chapters/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-lg border border-border p-4 transition-colors hover:border-accent hover:bg-accent/5 sm:max-w-[50%]"
        >
          <div className="min-w-0 text-right">
            <div className="text-xs text-muted-foreground">다음</div>
            <div className="truncate text-sm font-medium">
              Tip {next.chapter} {next.title}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
