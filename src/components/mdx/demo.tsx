import { Play } from "lucide-react";

interface DemoProps {
  src?: string;
  alt: string;
  caption?: string;
}

export function Demo({ src, alt, caption }: DemoProps) {
  if (src) {
    return (
      <figure className="my-6">
        <div className="overflow-hidden rounded-lg border border-border">
          <img src={src} alt={alt} className="w-full" loading="lazy" />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-6">
      <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Play className="h-8 w-8" />
          <p className="text-sm">{alt}</p>
          <p className="text-xs">데모 GIF 준비 중</p>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
