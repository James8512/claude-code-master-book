const DB_NAME = "claude-masterbook-db";
const STORE_NAME = "screenshots";
const DB_VERSION = 1;

export interface ScreenshotRecord {
  /** e.g. "01-introduction-0" */
  id: string;
  chapterSlug: string;
  index: number;
  image: Blob;
  thumbnail: Blob;
  createdAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("chapterSlug", "chapterSlug", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(
  db: IDBDatabase,
  mode: IDBTransactionMode,
): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

/** 이미지를 Canvas로 리사이즈 */
function resizeImage(blob: Blob, maxSize: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      if (width <= maxSize && height <= maxSize) {
        resolve(blob);
        return;
      }
      const ratio = Math.min(maxSize / width, maxSize / height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error("toBlob failed"))),
        "image/png",
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    img.src = url;
  });
}

export async function saveScreenshot(
  chapterSlug: string,
  index: number,
  file: Blob,
): Promise<ScreenshotRecord> {
  const [image, thumbnail] = await Promise.all([
    resizeImage(file, 1920),
    resizeImage(file, 200),
  ]);

  const record: ScreenshotRecord = {
    id: `${chapterSlug}-${index}`,
    chapterSlug,
    index,
    image,
    thumbnail,
    createdAt: Date.now(),
  };

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = tx(db, "readwrite").put(record);
    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
}

export async function getScreenshot(
  id: string,
): Promise<ScreenshotRecord | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = tx(db, "readonly").get(id);
    req.onsuccess = () => resolve(req.result ?? undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllScreenshots(): Promise<ScreenshotRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = tx(db, "readonly").getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getScreenshotsByChapter(
  chapterSlug: string,
): Promise<ScreenshotRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = tx(db, "readonly");
    const idx = store.index("chapterSlug");
    const req = idx.getAll(chapterSlug);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteScreenshot(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = tx(db, "readwrite").delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
