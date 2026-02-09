import { notFound } from "next/navigation";
import { chapters } from "#site";
import { MDXContent } from "@/components/mdx/mdx-content";
import { ChapterHeader } from "@/components/chapters/chapter-header";
import { ChapterNav } from "@/components/chapters/chapter-nav";
import { TableOfContents } from "@/components/chapters/toc";
import { CompletionButton } from "@/components/chapters/completion-button";
import { AchievementSidebar } from "@/components/chapters/achievement-sidebar";
import { AchievementFab } from "@/components/chapters/achievement-fab";

const sortedChapters = chapters
  .filter((c) => !c.draft)
  .sort((a, b) => a.order - b.order);

export function generateStaticParams() {
  return sortedChapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = sortedChapters.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `Tip ${chapter.chapter} ${chapter.title}`,
    description: chapter.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapterIndex = sortedChapters.findIndex((c) => c.slug === slug);
  const chapter = sortedChapters[chapterIndex];

  if (!chapter) notFound();

  const prev = chapterIndex > 0 ? sortedChapters[chapterIndex - 1] : undefined;
  const next =
    chapterIndex < sortedChapters.length - 1
      ? sortedChapters[chapterIndex + 1]
      : undefined;

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-6 py-8 lg:px-12 lg:py-10">
        <ChapterHeader
          title={chapter.title}
          description={chapter.description}
          part={chapter.part}
          partTitle={chapter.partTitle}
          chapter={chapter.chapter}
          readingTime={chapter.readingTime}
          difficulty={chapter.difficulty}
          tags={chapter.tags}
        />
        <MDXContent code={chapter.content} chapterSlug={chapter.slug} />
        <CompletionButton chapter={chapter.chapter} />
        <ChapterNav
          prev={prev ? { slug: prev.slug, title: prev.title, chapter: prev.chapter } : undefined}
          next={next ? { slug: next.slug, title: next.title, chapter: next.chapter } : undefined}
        />
      </article>
      <aside className="hidden w-56 flex-shrink-0 px-4 py-10 xl:block">
        <AchievementSidebar />
        <TableOfContents />
      </aside>
      <AchievementFab />
    </div>
  );
}
