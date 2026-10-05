"use client";

type Props = {
  id: string;
  title: string;
  url: string;
  count: number;
  onClick: () => void;
};

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon을 우선 사용한다
  if (navigator.sendBeacon?.(`/api/click`, new Blob([body], { type: "application/json" }))) return;
  fetch("/api/click", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(
    () => {},
  );
}

export default function LinkCard({ id, title, url, count, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(id);
        onClick();
      }}
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-16 py-[18px] text-center text-[15px] font-semibold tracking-tight text-stone-800 shadow-[0_4px_24px_-8px_rgba(160,100,60,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-8px_rgba(160,100,60,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3906a]/60 active:translate-y-0 active:bg-white/55 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-100 dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {title}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
