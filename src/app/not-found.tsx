import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <BookOpen className="mb-4 h-12 w-12 text-accent" />
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Home className="h-4 w-4" />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
