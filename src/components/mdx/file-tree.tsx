import { File, Folder } from "lucide-react";

interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="my-4 rounded-lg border border-border bg-code-bg p-4 font-mono text-sm">
      {children}
    </div>
  );
}

export function FileTreeFolder({
  name,
  children,
  defaultOpen = true,
}: {
  name: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <div className="ml-4 first:ml-0">
      <div className="flex items-center gap-1.5 py-0.5 text-foreground">
        <Folder className="h-4 w-4 text-accent" />
        <span>{name}/</span>
      </div>
      {defaultOpen && children && <div className="ml-2">{children}</div>}
    </div>
  );
}

export function FileTreeFile({ name, highlight }: { name: string; highlight?: boolean }) {
  return (
    <div className="ml-4 flex items-center gap-1.5 py-0.5">
      <File className={`h-4 w-4 ${highlight ? "text-accent" : "text-muted-foreground"}`} />
      <span className={highlight ? "font-medium text-accent" : "text-foreground"}>
        {name}
      </span>
    </div>
  );
}
