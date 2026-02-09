import { Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { difficultyColors, difficultyLabels } from "@/lib/constants";

interface ChapterHeaderProps {
  title: string;
  description: string;
  part: number;
  partTitle: string;
  chapter: number;
  readingTime: string;
  difficulty: string;
  tags: string[];
}

export function ChapterHeader({
  title,
  description,
  part,
  partTitle,
  chapter,
  readingTime,
  difficulty,
  tags,
}: ChapterHeaderProps) {
  return (
    <div className="mb-8 border-b border-border pb-8">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <span>Part {part}: {partTitle}</span>
        <span>/</span>
        <span>Tip {chapter}</span>
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight lg:text-4xl">
        {title}
      </h1>
      <p className="mb-4 text-lg text-muted-foreground">{description}</p>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            difficultyColors[difficulty]
          )}
        >
          {difficultyLabels[difficulty]}
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {readingTime}
        </span>
        {tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
