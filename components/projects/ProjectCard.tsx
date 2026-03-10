import { ArrowUpRight, Github, Smartphone, Star } from "lucide-react";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div
      className={[
        "flex flex-col border-l border-[var(--border)] py-1 pl-4",
        project.variant === "Long" ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex flex-wrap items-center gap-2 transition-colors duration-200"
      >
        {project.recent ? <Star size={14} className="shrink-0 text-[var(--accent)]" fill="currentColor" /> : null}
        <h3 className="text-base font-medium text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {project.name}
        </h3>
        {project.tags.includes("Mobile") ? (
          <Smartphone size={16} className="shrink-0 text-[var(--text-secondary)]" />
        ) : null}
        {project.linkType === "github" ? (
          <Github size={14} className="shrink-0 text-[var(--text-tertiary)]" />
        ) : (
          <ArrowUpRight size={14} className="shrink-0 text-[var(--text-tertiary)]" />
        )}
      </a>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>
    </div>
  );
}
