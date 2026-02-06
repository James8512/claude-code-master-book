# Claude Code 마스터북 - 콘텐츠 구조

> 계획 파일 출처: `~/.claude/plans/mossy-strolling-flame.md`

---

## 개요

개발자 대상 Claude Code 세션/워크숍을 위한 학습 플랫폼. A부터 Z까지 Claude Code를 마스터할 수 있는 단계별 가이드로, 공식 문서 + 커뮤니티 팁 + 유튜브/블로그 정보를 체계적으로 정리한 "마스터북" 형태의 웹서비스.

- 한국어 전용
- 5파트 18챕터 구성 (계획 파일에는 "16챕터"로 표기되어 있으나 실제 목차는 18챕터)
- `docs/cursor_m`의 31개 YouTube 팁을 각 챕터에 자연스럽게 매핑

---

## 콘텐츠 구조 (5파트 18챕터)

### Part 1: 기초 (Ch.1 ~ Ch.3)

| 챕터 | 제목 | 주요 내용 |
|------|------|----------|
| Ch.1 | Claude Code 소개 | 정의, 핵심 기능, 왜 써야 하는지, 구독 플랜 |
| Ch.2 | 설치와 기본 설정 | 설치, 터미널 설정(`/terminal-setup`), 첫 실행, 권한 설정(`/permissions`) |
| Ch.3 | CLAUDE.md 마스터하기 | 글로벌/프로젝트 설정, 계층 구조, `#` 메모리 저장, `/init` 온보딩 |

### Part 2: 핵심 스킬 (Ch.4 ~ Ch.7)

| 챕터 | 제목 | 주요 내용 |
|------|------|----------|
| Ch.4 | 핵심 명령어와 슬래시 커맨드 | `/clear`, `/plan`, `/compact`, `/stats`, `/usage`, `/context`, `/rename`, `/export` |
| Ch.5 | 단축키와 효율적 조작 | `!` bash 즉시실행, Esc 2번 되돌리기, `/vim`, Ctrl+S 임시저장, Ctrl+R 프롬프트 검색, Shift+Tab Plan mode, `@` 멘션 |
| Ch.6 | 효과적인 프롬프팅 | 컨텍스트 엔지니어링, "think"/"ultrathink" 사고 깊이 조절, Extended Thinking, 좋은/나쁜 프롬프트 예시 |
| Ch.7 | Git 워크플로우 자동화 | 커밋, PR 생성, 머지 충돌 해결, 릴리즈 노트 |

### Part 3: 고급 기능 (Ch.8 ~ Ch.11)

| 챕터 | 제목 | 주요 내용 |
|------|------|----------|
| Ch.8 | 커스텀 슬래시 커맨드 | `.claude/commands/` 생성, 마크다운 프롬프트 파일, 프롬프트를 명령어로 저장 |
| Ch.9 | Hooks 활용하기 | 이벤트 기반 자동화, 라이프사이클 훅, 실행 흐름 제어 |
| Ch.10 | MCP 서버 연동 | Notion, GitHub, Slack, Figma 등 외부 도구 연결 |
| Ch.11 | 서브에이전트와 Agent Skills | 커스텀 에이전트, 병렬 처리(200k 컨텍스트), Agent Skills 폴더 단위 재사용, 플러그인 |

### Part 4: 프로 레벨 (Ch.12 ~ Ch.15)

| 챕터 | 제목 | 주요 내용 |
|------|------|----------|
| Ch.12 | 보안과 샌드박싱 | YOLO 모드 vs sandbox 모드, 파일시스템/네트워크 격리, 권한 관리 |
| Ch.13 | 토큰 최적화와 비용 관리 | 프롬프트 캐싱, 모델 선택, `/context` 토큰 확인, `/usage` 한도 관리, `/statusline` 커스터마이징 |
| Ch.14 | IDE 통합 | VS Code, JetBrains 플러그인, `/chrome` 브라우저 제어, LSP 연결 |
| Ch.15 | Agent SDK | Python/TypeScript로 커스텀 에이전트 프로그래밍 |

### Part 5: 실전 (Ch.16 ~ Ch.18)

| 챕터 | 제목 | 주요 내용 |
|------|------|----------|
| Ch.16 | 세션 관리와 워크플로우 | `--continue`/`--resume` 세션 이어가기, `-p` headless 모드, `&` 원격 세션, `--teleport`, 자동 프롬프트 제안 |
| Ch.17 | 실전 워크플로우 | Boris Cherny의 13가지 프로 셋업, 15개 세션 병렬 운영, 디버깅, 리팩토링, 테스트 작성, 코드 리뷰 패턴, 자기 검증 방법 |
| Ch.18 | 팁 & 치트시트 | 31개 팁 총정리, 커뮤니티 리소스, 자주 쓰는 패턴 모음 |

---

## YouTube 31개 팁 → 챕터 매핑

| 카테고리 | 해당 팁 | 매핑 챕터 |
|----------|---------|----------|
| 빠른 명령 실행 | `!` 프리픽스, `-p` headless, YOLO 모드, sandbox 모드 | Ch.2, Ch.5, Ch.12 |
| 세션 관리 | `--continue`, `--resume`, `&` 원격, `--teleport`, `/rename` | Ch.16 |
| 단축키 & 편집 | Esc 2번, `/vim`, Ctrl+S, Ctrl+R, Shift+Tab Plan mode | Ch.5 |
| 컨텍스트 & 메모리 | `#` 메모리, `/context`, `@` 멘션, `/init` | Ch.3, Ch.5, Ch.13 |
| 고급 AI 기능 | Extended Thinking, think/ultrathink, Subagents | Ch.6, Ch.11 |
| 자동화 & 커스터마이징 | Hooks, Agent Skills, 플러그인, 커맨드 저장 | Ch.8, Ch.9, Ch.11 |
| 모니터링 & 관리 | `/stats`, `/statusline`, `/usage` | Ch.4, Ch.13 |
| 브라우저 & IDE | `/chrome`, LSP, 자동 제안, `/export` | Ch.14, Ch.4 |
| 개발자용 | Claude Agent SDK | Ch.15 |

---

## 각 챕터 콘텐츠 패턴

모든 챕터는 아래 5단계 패턴으로 구성:

1. **개념 설명** — 간결한 텍스트
2. **GIF 데모** — `<Demo>` 플레이스홀더 (실제 GIF는 이후 촬영 후 교체)
3. **복사 가능한 코드블록** — 바로 터미널에 붙여넣을 수 있는 명령어/설정 코드
4. **직접 해보세요** — `<Practice>` 체크리스트로 실습 항목 제공
5. **Before/After** — 비효율적 방식 vs 추천 방식 비교

### MDX 사용 예시

```mdx
## ! 프리픽스로 터미널 바로 실행

"git status 실행해줘"라고 묻지 마세요. `!` 를 붙이면 bash가 즉시 실행됩니다.

<Demo
  src="/images/chapters/05/bang-prefix.gif"
  alt="! 프리픽스로 git status 즉시 실행하는 모습"
  caption="!git status 입력 시 추론 없이 바로 실행"
/>

<Practice>
- [ ] Claude Code를 열고 `!pwd`를 입력해보세요
- [ ] `!git log --oneline -5`로 최근 커밋을 확인해보세요
- [ ] 일반 "git status 실행해줘"와 `!git status`의 속도 차이를 체감해보세요
</Practice>
```

---

## MDX 프론트매터 스키마

각 챕터 MDX 파일은 Velite + Zod로 검증되는 아래 프론트매터를 포함:

```typescript
{
  slug: string,           // URL 슬러그 (예: "01-introduction")
  title: string,          // 챕터 제목
  description: string,    // 요약 설명
  part: number,           // 파트 번호 (1-5)
  partTitle: string,      // 파트 이름 (예: "기초")
  chapter: number,        // 챕터 번호 (1-18)
  order: number,          // 전체 순서 (이전/다음 네비게이션용)
  readingTime: string,    // 예상 읽기 시간 (예: "15분")
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: string[],         // 검색용 태그
  draft: boolean,         // 초안 여부
}
```

---

## 커스텀 MDX 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| `<Callout type="tip\|info\|warning\|danger">` | 팁/주의/경고 박스 |
| `CodeBlock` | 복사 버튼 + Shiki 하이라이팅 + 파일명 표시 |
| `<Steps>` | 번호 매긴 단계별 가이드 |
| `<FileTree>` | 디렉토리 구조 시각화 |
| `<Tabs>` | 패키지 매니저 등 옵션별 탭 |
| `<Demo>` | GIF 플레이스홀더 (나중에 실제 GIF 교체용) |
| `<Practice>` | "직접 해보세요" 체크리스트 |
| `<KeyCombo>` | 단축키 시각화 (예: `⌘` + `K`) |
| `<BeforeAfter>` | 나쁜 예시 vs 좋은 예시 비교 |

---

## 콘텐츠 파일 위치

```
content/
└── chapters/
    ├── 01-introduction/index.mdx
    ├── 02-installation/index.mdx
    ├── 03-claude-md/index.mdx
    ├── 04-commands/index.mdx
    ├── 05-shortcuts/index.mdx
    ├── 06-prompting/index.mdx
    ├── 07-git-workflow/index.mdx
    ├── 08-custom-commands/index.mdx
    ├── 09-hooks/index.mdx
    ├── 10-mcp/index.mdx
    ├── 11-subagents/index.mdx
    ├── 12-security/index.mdx
    ├── 13-token-optimization/index.mdx
    ├── 14-ide-integration/index.mdx
    ├── 15-agent-sdk/index.mdx
    ├── 16-session-management/index.mdx
    ├── 17-pro-workflow/index.mdx
    └── 18-tips-cheatsheet/index.mdx
```

---

## 난이도 분류

| 레벨 | 라벨 | 대상 챕터 |
|------|------|----------|
| beginner | 입문 | Part 1 (Ch.1~3) |
| intermediate | 중급 | Part 2~3 (Ch.4~11) |
| advanced | 고급 | Part 4~5 (Ch.12~18) |

---

## 참고 리소스 (콘텐츠 작성 시 참조)

### 공식 문서
- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/sandboxing
- https://code.claude.com/docs/en/plugins
- https://platform.claude.com/docs/en/agent-sdk/overview

### Boris Cherny 13가지 프로 셋업 (Ch.17에서 집중 다룸)
1. 로컬 5개 + 웹 10개 = 15개 세션 병렬 실행
2. 항상 Opus 4.5 + Thinking 모드 사용
3. CLAUDE.md를 팀과 git 공유, 실수 기록으로 반복 방지
4. PR 리뷰 시 `/install-github-app`으로 Claude 태그
5. 대부분의 세션을 Plan 모드에서 시작
6. 반복 워크플로우를 커맨드로 저장 후 팀 공유
7. 서브에이전트 정기 사용 (code simplifier, verify agent)
8. post-tool 훅으로 코드 포매팅 자동화
9. YOLO 모드 대신 `/permissions`로 권한 사전 등록
10. MCP로 Slack, BigQuery, Sentry 등 모든 툴 권한 제공
11. 장기 작업: 백그라운드 에이전트 검증 + agent stop 훅 + 무한 이터레이션
12. Claude에게 자기 작업 검증 방법을 정확히 제공

### 커뮤니티 & 블로그
- https://github.com/hesreallyhim/awesome-claude-code
- https://github.com/VoltAgent/awesome-claude-code-subagents
- https://github.com/ykdojo/claude-code-tips
- https://shipyard.build/blog/claude-code-cheat-sheet/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://www.builder.io/blog/claude-code
- https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/
- https://www.anthropic.com/engineering/claude-code-sandboxing