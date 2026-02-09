"use client";

import { ArrowRight, BookOpen, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/5 via-background to-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            개발자를 위한 완벽 가이드
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Claude Code{" "}
            <span className="text-accent">마스터북</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
            A부터 Z까지, Claude Code의 모든 것을 마스터하는 단계별 가이드.
            <br className="hidden sm:block" />
            해커톤 우승자의 70가지 파워 팁으로 완성합니다.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/chapters/00-divide-and-conquer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
            >
              <BookOpen className="h-4 w-4" />
              학습 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/chapters/62-beginner-roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Terminal className="h-4 w-4" />
              학습 로드맵
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
