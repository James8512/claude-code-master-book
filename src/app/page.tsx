import { chapters } from "#site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Curriculum } from "@/components/home/curriculum";
import { OverallProgress } from "@/components/home/overall-progress";

const sortedChapters = chapters
  .filter((c) => !c.draft)
  .sort((a, b) => a.order - b.order)
  .map((c) => ({
    slug: c.slug,
    title: c.title,
    chapter: c.chapter,
    part: c.part,
    difficulty: c.difficulty,
    readingTime: c.readingTime,
  }));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OverallProgress />
      <Curriculum chapters={sortedChapters} />
      <Footer />
    </div>
  );
}
