import type { ScreenshotRecord } from "./screenshot-db";
import { PRACTICE_COUNTS, TOTAL_PRACTICE_ITEMS } from "./constants";

interface SubmissionSummary {
  name: string;
  submittedAt: string;
  totalItems: number;
  completedItems: number;
  chapters: Record<string, { total: number; completed: number }>;
}

export async function generateSubmissionZip(
  name: string,
  records: ScreenshotRecord[],
): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // 챕터별로 그룹
  const byChapter = new Map<string, ScreenshotRecord[]>();
  for (const rec of records) {
    const arr = byChapter.get(rec.chapterSlug) ?? [];
    arr.push(rec);
    byChapter.set(rec.chapterSlug, arr);
  }

  // screenshots/{chapter-slug}/{index}.png
  for (const [slug, chapterRecords] of byChapter) {
    const folder = zip.folder(`screenshots/${slug}`)!;
    for (const rec of chapterRecords) {
      folder.file(`${rec.index}.png`, rec.image);
    }
  }

  // summary.json
  const chapters: SubmissionSummary["chapters"] = {};
  for (const [slug, total] of Object.entries(PRACTICE_COUNTS)) {
    chapters[slug] = {
      total,
      completed: byChapter.get(slug)?.length ?? 0,
    };
  }

  const summary: SubmissionSummary = {
    name,
    submittedAt: new Date().toISOString(),
    totalItems: TOTAL_PRACTICE_ITEMS,
    completedItems: records.length,
    chapters,
  };

  zip.file("summary.json", JSON.stringify(summary, null, 2));

  return zip.generateAsync({ type: "blob" });
}
