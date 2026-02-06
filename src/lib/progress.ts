const STORAGE_KEY = "claude-code-masterbook-progress";

export function getCompletedChapters(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleChapterComplete(chapter: number): number[] {
  const completed = getCompletedChapters();
  const index = completed.indexOf(chapter);
  if (index === -1) {
    completed.push(chapter);
  } else {
    completed.splice(index, 1);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  return completed;
}

export function isChapterComplete(chapter: number): boolean {
  return getCompletedChapters().includes(chapter);
}
