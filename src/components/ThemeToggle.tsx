"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_4px_16px_-6px_rgba(160,100,60,0.2)] backdrop-blur-xl transition duration-300 hover:bg-white/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3906a]/60 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      {/* 마운트 전에는 아이콘을 숨겨 hydration 불일치를 피한다 */}
      {isDark === null ? null : isDark ? "☀️" : "🌙"}
    </button>
  );
}
