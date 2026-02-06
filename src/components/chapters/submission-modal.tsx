"use client";

import { Download, ExternalLink, Loader2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useScreenshots } from "@/contexts/screenshot-context";
import { generateSubmissionZip } from "@/lib/submission";
import { GOOGLE_FORM_URL, TOTAL_PRACTICE_ITEMS } from "@/lib/constants";

type Step = "name" | "download";

interface SubmissionModalProps {
  onClose: () => void;
}

export function SubmissionModal({ onClose }: SubmissionModalProps) {
  const { completedCount, getAllRecords } = useScreenshots();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const records = await getAllRecords();
      const blob = await generateSubmissionZip(name.trim(), records);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `claude-masterbook-${name.trim().replace(/\s+/g, "-")}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setStep("download");
    } finally {
      setLoading(false);
    }
  }, [name, getAllRecords]);

  const handleOpenForm = useCallback(() => {
    window.open(GOOGLE_FORM_URL, "_blank");
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full max-w-md rounded-xl bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "name" ? (
          <>
            <h3 className="mb-1 text-lg font-semibold">결과물 제출</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              완료한 실습 {completedCount}/{TOTAL_PRACTICE_ITEMS}개를 ZIP 파일로 다운로드합니다.
            </p>

            <label className="mb-1 block text-sm font-medium">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="mb-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDownload();
              }}
              autoFocus
            />

            <button
              onClick={handleDownload}
              disabled={!name.trim() || loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              ZIP 다운로드
            </button>
          </>
        ) : (
          <>
            <div className="mb-4 text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">다운로드 완료!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ZIP 파일이 다운로드되었습니다.
                <br />
                아래 버튼을 눌러 Google Form에서 제출해주세요.
              </p>
            </div>

            <button
              onClick={handleOpenForm}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              <ExternalLink className="h-4 w-4" />
              Google Form 열기
            </button>

            <button
              onClick={onClose}
              className="mt-2 flex w-full items-center justify-center rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
