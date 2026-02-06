export const siteConfig = {
  title: "Claude Code 마스터북",
  description:
    "A부터 Z까지, Claude Code의 모든 것을 마스터하는 단계별 가이드",
  url: "https://claude-code-masterbook.vercel.app",
  github: "https://github.com/anthropics/claude-code",
};

export interface PartInfo {
  number: number;
  title: string;
  description: string;
  chapters: number[];
}

export const parts: PartInfo[] = [
  {
    number: 1,
    title: "기초",
    description: "Claude Code의 기본 개념과 설치",
    chapters: [1, 2, 3],
  },
  {
    number: 2,
    title: "핵심 스킬",
    description: "일상적으로 사용하는 핵심 기능",
    chapters: [4, 5, 6, 7],
  },
  {
    number: 3,
    title: "고급 기능",
    description: "자동화와 확장 기능",
    chapters: [8, 9, 10, 11],
  },
  {
    number: 4,
    title: "프로 레벨",
    description: "보안, 최적화, IDE 통합",
    chapters: [12, 13, 14, 15],
  },
  {
    number: 5,
    title: "실전",
    description: "실전 워크플로우와 팁",
    chapters: [16, 17, 18],
  },
];

export const difficultyLabels: Record<string, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "고급",
};

export const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};
