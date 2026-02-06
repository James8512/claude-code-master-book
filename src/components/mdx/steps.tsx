import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 ml-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative pb-6 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[1.9rem] flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent bg-background text-xs font-bold text-accent before:content-[counter(step)]" />
      {title && <h4 className="mb-2 font-semibold">{title}</h4>}
      <div className="[&>p]:my-1">{children}</div>
    </div>
  );
}
