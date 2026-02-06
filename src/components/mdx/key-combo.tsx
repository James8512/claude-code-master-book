import { cn } from "@/lib/utils";

interface KeyComboProps {
  keys: string[];
}

export function KeyCombo({ keys }: KeyComboProps) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
          <kbd className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium shadow-sm">
            {key}
          </kbd>
        </span>
      ))}
    </span>
  );
}
