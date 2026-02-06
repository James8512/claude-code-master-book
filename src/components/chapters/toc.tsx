"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const activeId = useActiveHeading(headings.map((h) => h.id));

  useEffect(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    const items: TocItem[] = [];
    elements.forEach((el) => {
      if (el.id) {
        items.push({
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      }
    });
    setHeadings(items);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        목차
      </p>
      <ul className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-0.5 transition-colors hover:text-foreground",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "font-medium text-accent"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
