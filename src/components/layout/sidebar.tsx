"use client";

import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { parts } from "@/lib/constants";
import { useProgress } from "@/hooks/use-progress";

interface ChapterLink {
  slug: string;
  title: string;
  chapter: number;
  part: number;
}

interface SidebarProps {
  chapters: ChapterLink[];
}

export function Sidebar({ chapters }: SidebarProps) {
  const pathname = usePathname();
  const { isComplete } = useProgress();
  const [openParts, setOpenParts] = useState<number[]>(() => {
    const current = chapters.find((c) => pathname.includes(c.slug));
    return current ? [current.part] : [1];
  });

  const togglePart = (part: number) => {
    setOpenParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  return (
    <nav className="space-y-1 py-4">
      {parts.map((part) => {
        const partChapters = chapters.filter((c) => c.part === part.number);
        const isOpen = openParts.includes(part.number);

        return (
          <div key={part.number}>
            <button
              onClick={() => togglePart(part.number)}
              className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 transition-transform",
                  isOpen && "rotate-90"
                )}
              />
              Part {part.number}: {part.title}
            </button>
            {isOpen && (
              <div className="space-y-0.5 pb-2">
                {partChapters.map((chapter) => {
                  const isActive = pathname === `/chapters/${chapter.slug}`;
                  const completed = isComplete(chapter.chapter);

                  return (
                    <Link
                      key={chapter.slug}
                      href={`/chapters/${chapter.slug}`}
                      className={cn(
                        "flex items-center gap-2 px-4 py-1.5 text-sm transition-colors",
                        isActive
                          ? "border-r-2 border-accent bg-accent/10 font-medium text-accent"
                          : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs">
                        {completed ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <span className="text-muted-foreground">
                            {chapter.chapter}
                          </span>
                        )}
                      </span>
                      <span className="truncate">{chapter.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
