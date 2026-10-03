import type { Project } from "@/lib/types";

interface Props {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact = false }: Props) {
  const description = compact
    ? project.descriptionShort.trim() || project.description
    : project.description;

  return (
    <article>
      <h3 className="text-[15px] font-medium">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-[var(--text)]"
        >
          {project.name}
        </a>
      </h3>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
    </article>
  );
}
