"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { parts, difficultyColors, difficultyLabels } from "@/lib/constants";
import { useProgress } from "@/hooks/use-progress";

interface ChapterInfo {
  slug: string;
  title: string;
  chapter: number;
  part: number;
  difficulty: string;
  readingTime: string;
}

interface CurriculumProps {
  chapters: ChapterInfo[];
}

export function Curriculum({ chapters }: CurriculumProps) {
  const { isComplete } = useProgress();

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          커리큘럼
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          13개 파트, 67개 팁으로 구성된 체계적인 학습 경로
        </p>
        <div className="space-y-8">
          {parts.map((part, partIdx) => {
            const partChapters = chapters.filter(
              (c) => c.part === part.number
            );
            return (
              <motion.div
                key={part.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: partIdx * 0.1, duration: 0.4 }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                    Part {part.number}
                  </span>
                  <h3 className="font-semibold">{part.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    — {part.description}
                  </span>
                </div>
                <div className="space-y-1">
                  {partChapters.map((chapter) => {
                    const completed = isComplete(chapter.chapter);
                    return (
                      <Link
                        key={chapter.slug}
                        href={`/chapters/${chapter.slug}`}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg border px-4 py-3 transition-all hover:border-accent/50 hover:bg-accent/5",
                          completed
                            ? "border-green-500/20 bg-green-50/50 dark:bg-green-950/10"
                            : "border-border"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                            completed
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {completed ? "✓" : chapter.chapter}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium">
                            {chapter.title}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "hidden rounded-full px-2 py-0.5 text-xs sm:block",
                            difficultyColors[chapter.difficulty]
                          )}
                        >
                          {difficultyLabels[chapter.difficulty]}
                        </span>
                        <span className="hidden text-xs text-muted-foreground sm:block">
                          {chapter.readingTime}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
