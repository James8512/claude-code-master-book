"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

interface MobileSidebarProps {
  chapters?: { slug: string; title: string; chapter: number; part: number }[];
}

export function MobileSidebar({ chapters = [] }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
        aria-label="메뉴"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 top-14 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-border bg-sidebar">
            <Sidebar chapters={chapters} />
          </div>
        </>
      )}
    </div>
  );
}
