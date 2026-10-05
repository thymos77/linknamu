"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 서버 응답 전에는 모든 링크를 0회로 보여 준다
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (cancelled || !data?.counts) return;
        const fetched = data.counts;
        // 응답 전에 누른 클릭은 서버 값에 이미 반영됐을 수 있으므로 더 큰 쪽을 유지한다
        setCounts((prev) => {
          const next: Record<string, number> = { ...fetched };
          for (const [id, value] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, value);
          return next;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const increment = (id: string) => setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            id={link.id}
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => increment(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
