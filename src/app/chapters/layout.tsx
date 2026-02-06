import { chapters } from "#site";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const sortedChapters = chapters
  .filter((c) => !c.draft)
  .sort((a, b) => a.order - b.order)
  .map((c) => ({
    slug: c.slug,
    title: c.title,
    chapter: c.chapter,
    part: c.part,
  }));

export default function ChaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 flex-shrink-0 overflow-y-auto border-r border-border bg-sidebar lg:block">
          <Sidebar chapters={sortedChapters} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
