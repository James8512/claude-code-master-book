"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {children}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 hidden rounded-md border border-border bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground group-hover:block"
        aria-label="코드 복사"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as any).props.children);
  }
  return "";
}
