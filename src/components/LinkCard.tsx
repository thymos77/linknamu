"use client";

type Props = {
  id: string;
  title: string;
  url: string;
};

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon을 우선 사용한다
  if (navigator.sendBeacon?.(`/api/click`, new Blob([body], { type: "application/json" }))) return;
  fetch("/api/click", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(
    () => {},
  );
}

export default function LinkCard({ id, title, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="block w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:translate-y-0 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-500"
    >
      {title}
    </a>
  );
}
