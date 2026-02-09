import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import PasswordGate from "@/components/auth/password-gate";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Claude Code 마스터북",
    template: "%s | Claude Code 마스터북",
  },
  description: "A부터 Z까지, Claude Code의 모든 것을 마스터하는 단계별 가이드",
  metadataBase: new URL("https://claude-code-masterbook.vercel.app"),
  openGraph: {
    title: "Claude Code 마스터북",
    description: "A부터 Z까지, Claude Code의 모든 것을 마스터하는 단계별 가이드",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PasswordGate>{children}</PasswordGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
