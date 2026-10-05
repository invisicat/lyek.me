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
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 mb-5 max-w-xl text-sm text-[var(--text-secondary)]">{description}</p>
      <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-20">{children}</div>
    </section>
  );
}
