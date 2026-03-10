import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function ProjectSection({ id, title, description, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-16">
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="mt-1 mb-8 text-sm text-[var(--text-tertiary)]">{description}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
    </section>
  );
}
