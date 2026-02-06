"use client";

import { BookOpen, Github, Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { MobileSidebar } from "./mobile-sidebar";

interface HeaderProps {
  onSearchOpen?: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-2 font-bold">
          <BookOpen className="h-5 w-5 text-accent" />
          <span className="hidden sm:inline">Claude Code 마스터북</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">검색...</span>
            <kbd className="pointer-events-none hidden select-none rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono sm:inline">
              ⌘K
            </kbd>
          </button>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
