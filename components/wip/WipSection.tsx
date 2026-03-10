import { ArrowUpRight, Hammer } from "lucide-react";
import type { WipProject } from "@/lib/types";

interface Props {
  items: WipProject[];
  heading?: string;
}

export default function WipSection({ items, heading = "In the works" }: Props) {
  return (
    <section>
      <div className="mb-6 flex items-baseline gap-3">
        <h2 className="font-serif text-3xl">{heading}</h2>
        <span className="font-mono text-xs tracking-wide text-[var(--accent)] uppercase">wip</span>
      </div>

      <div className="flex flex-col gap-0">
        {items.map((item) => (
          <div
            key={item._id ?? item.name}
            className="group relative border-l border-dashed border-[var(--border)] py-4 pl-5 transition-colors duration-200 hover:border-[var(--accent)]"
          >
            <div className="absolute top-1/2 left-[-3px] h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[var(--text-tertiary)] transition-colors duration-200 group-hover:bg-[var(--accent)]" />

            <div className="flex items-center gap-2">
              <Hammer
                size={14}
                className="shrink-0 text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[var(--accent)]"
              />
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]"
                >
                  {item.name}
                  <ArrowUpRight size={12} className="ml-1 inline text-[var(--text-tertiary)]" />
                </a>
              ) : (
                <span className="text-base font-medium text-[var(--text)]">{item.name}</span>
              )}
              {item.date ? <span className="font-mono text-xs text-[var(--text-tertiary)]">{item.date}</span> : null}
            </div>

            {item.description ? <p className="mt-1 ml-[22px] text-sm text-[var(--text-secondary)]">{item.description}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
