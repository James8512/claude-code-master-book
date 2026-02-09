export const siteConfig = {
  title: "Claude Code 마스터북",
  description:
    "해커톤 우승자의 70가지 파워 팁으로 Claude Code를 완전 정복하는 가이드",
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
    title: "에이전틱 개발자의 사고방식",
    description: "AI와 협업하는 개발자의 마인드셋",
    chapters: [0, 1, 2, 3, 4],
  },
  {
    number: 2,
    title: "기초부터 탄탄하게",
    description: "환경 설정과 필수 명령어",
    chapters: [5, 6, 7, 8, 9],
  },
  {
    number: 3,
    title: "생산성을 극대화하는 핵심 기술",
    description: "속도와 효율을 높이는 테크닉",
    chapters: [10, 11, 12, 13, 14, 15, 16],
  },
  {
    number: 4,
    title: "컨텍스트 관리의 예술",
    description: "AI의 기억력을 지배하는 기술",
    chapters: [17, 18, 19, 20, 21],
  },
  {
    number: 5,
    title: "Git과 GitHub 워크플로우",
    description: "버전 관리와 협업 완전 정복",
    chapters: [22, 23, 24, 25],
  },
  {
    number: 6,
    title: "고급 기능 - MCP, Hooks, Agents",
    description: "확장 기능으로 가능성 넓히기",
    chapters: [26, 27, 28, 29, 30, 31],
  },
  {
    number: 7,
    title: "시스템 최적화와 자동화",
    description: "프롬프트 최적화와 자동화 전략",
    chapters: [32, 33, 34, 35, 36],
  },
  {
    number: 8,
    title: "컨테이너와 샌드박스",
    description: "격리된 환경에서 안전하게",
    chapters: [37, 38, 39],
  },
  {
    number: 9,
    title: "브라우저 통합과 웹 자동화",
    description: "브라우저를 활용한 작업 자동화",
    chapters: [40, 41, 42],
  },
  {
    number: 10,
    title: "실전 활용 사례",
    description: "다양한 실전 워크플로우",
    chapters: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
  },
  {
    number: 11,
    title: "고급 패턴과 철학",
    description: "에이전틱 개발의 철학과 패턴",
    chapters: [53, 54, 55, 56, 57],
  },
  {
    number: 12,
    title: "고급 기능과 SDK",
    description: "Extended Thinking, LSP, Agent SDK",
    chapters: [58, 59, 60, 61],
  },
  {
    number: 13,
    title: "학습 로드맵과 다음 단계",
    description: "레벨별 성장 로드맵",
    chapters: [62, 63, 64, 65, 66],
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

/** 각 팁별 PracticeItem 개수 */
export const PRACTICE_COUNTS: Record<string, number> = {
  "00-divide-and-conquer": 1,
  "01-plan-vs-yolo": 2,
  "02-context-management": 2,
  "03-right-abstraction": 1,
  "04-be-braver": 1,
  "05-custom-status-line": 2,
  "06-slash-commands": 2,
  "07-claude-md": 2,
  "08-terminal-aliases": 1,
  "09-session-management": 2,
  "10-voice-coding": 1,
  "11-terminal-output": 1,
  "12-select-all": 1,
  "13-markdown-notion": 1,
  "14-keyboard-shortcuts": 2,
  "15-vim-mode": 1,
  "16-input-navigation": 1,
  "17-proactive-compaction": 2,
  "18-terminal-tabs": 1,
  "19-conversation-clone": 1,
  "20-context-xray": 1,
  "21-realpath": 1,
  "22-git-github-cli": 2,
  "23-git-worktrees": 2,
  "24-pr-review": 1,
  "25-audit-commands": 1,
  "26-mcp-integration": 2,
  "27-hooks": 2,
  "28-skills": 1,
  "29-agents": 2,
  "30-plugins": 1,
  "31-claude-md-vs-skills": 1,
  "32-slim-system-prompt": 2,
  "33-exponential-backoff": 1,
  "34-background-agents": 2,
  "35-automation-of-automation": 1,
  "36-headless-mode": 1,
  "37-containers": 2,
  "38-sandbox-mode": 1,
  "39-yolo-mode": 1,
  "40-browser-integration": 1,
  "41-playwright-mcp": 2,
  "42-gemini-fallback": 1,
  "43-write-test-cycle": 2,
  "44-invest-workflow": 1,
  "45-search-history": 1,
  "46-writing-assistant": 1,
  "47-research-tool": 1,
  "48-output-verification": 2,
  "49-devops-engineer": 1,
  "50-universal-interface": 1,
  "51-tdd-tests": 2,
  "52-simplify-code": 1,
  "53-plan-prototype": 2,
  "54-personalized-software": 1,
  "55-best-learning": 1,
  "56-share-knowledge": 1,
  "57-keep-learning": 1,
  "58-extended-thinking": 1,
  "59-lsp-integration": 1,
  "60-agent-sdk": 2,
  "61-team-settings": 1,
  "62-beginner-roadmap": 1,
  "63-intermediate-roadmap": 1,
  "64-advanced-roadmap": 1,
  "65-references": 1,
  "66-conclusion": 0,
};

export const TOTAL_PRACTICE_ITEMS = 88;

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1icHC8CHBYJLn6smERi_IRjlvGIyxd0Ff1CvY-wx1ByM/viewform";
