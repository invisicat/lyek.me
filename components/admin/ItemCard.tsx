"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface Props {
  title: string;
  subtitle?: string;
  badges?: string[];
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ItemCard({ title, subtitle, badges = [], children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="overflow-hidden rounded-xl border border-(--border) bg-(--bg-surface)/50 transition-colors duration-200 hover:border-(--accent)/40">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <p className="truncate font-medium text-(--text)">{title}</p>
          {subtitle ? <p className="truncate text-xs text-(--text-secondary)">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-(--border) px-2 py-0.5 font-mono text-[10px] tracking-wide text-(--text-secondary) uppercase"
            >
              {badge}
            </span>
          ))}
          <ChevronDown
            size={16}
            className={`text-(--text-secondary) transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {open ? <div className="border-t border-(--border) px-4 py-4">{children}</div> : null}
    </article>
  );
}
