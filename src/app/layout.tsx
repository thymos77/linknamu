import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "링크나무",
  description: "내 모든 링크를 한 페이지에",
};

// 첫 렌더 전에 테마를 적용해 화면 깜빡임을 막는다
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-[#fdf8f1] font-sans text-stone-800 antialiased dark:bg-[#1a1512] dark:text-stone-100">
        {/* 배경: 크림 → 연한 살구 그라데이션과 은은한 빛 번짐 (스크롤해도 고정) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f1] via-[#fcecdc] to-[#f9d9c4] dark:from-[#1a1512] dark:via-[#211915] dark:to-[#2a1d17]" />
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#ffe3c2] opacity-70 blur-3xl dark:bg-[#5a3a24] dark:opacity-30" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#f7b99a] opacity-40 blur-3xl dark:bg-[#6b3a2a] dark:opacity-25" />
        </div>
        {children}
      </body>
    </html>
  );
}
