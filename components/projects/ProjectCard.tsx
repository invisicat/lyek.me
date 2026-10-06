import type { Project } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface Props {
  project: Pick<Project, "name" | "link" | "description">;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="grid gap-1 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-x-6">
      <h3 className="text-sm font-medium">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          title="Opens in a new tab"
          className="inline-flex items-baseline gap-1 text-[var(--text)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-current"
        >
          <span>{project.name}</span>
          <ArrowUpRight aria-hidden="true" size={12} className="shrink-0 text-[var(--text-tertiary)]" />
        </a>
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">{project.description}</p>
    </article>
  );
}
