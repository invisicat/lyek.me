import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

export default function ProjectSection({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-8">
      <h2 id={`${id}-heading`} className="text-sm font-medium text-[var(--text-secondary)]">{title}</h2>
      <div className="mt-4 flex flex-col gap-5">{children}</div>
    </section>
  );
}
