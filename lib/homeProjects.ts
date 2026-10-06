import type { Project, WipProject } from "@/lib/types";

interface HomeProject {
  name: string;
  link: string;
  description: string;
}

const knownProjects = [
  {
    name: "ICS Filter",
    link: "https://remorse.lyek.me",
    summaryKey: "home.projectIcsSummary",
    description: "Filter unwanted events out of calendar feeds.",
  },
  {
    name: "RiceStats",
    link: "https://github.com/invisicat/RiceStats",
    summaryKey: "home.projectRiceStatsSummary",
    description: "Track Minecraft player activity and server performance.",
  },
  {
    name: "tag2me",
    link: "https://tag2me.app",
    summaryKey: "home.projectTag2meSummary",
    description: "Tag and describe videos from social media.",
  },
] as const;

function normalizeName(name: string) {
  const normalized = name.trim().toLowerCase();
  return normalized === "tag2me - media tagging at scale" ? "tag2me" : normalized;
}

function getDescription(project: { description: string; descriptionShort?: string }) {
  return project.descriptionShort?.trim() || project.description;
}

export function getHomeProjects(
  projects: Project[],
  wip: WipProject[],
  content: Record<string, string>,
): HomeProject[] {
  const selection = content["home.featuredProjects"] ?? "ICS Filter, RiceStats, tag2me";
  const names = selection.split(",").map((name) => name.trim()).filter(Boolean);

  if (names.length === 0) {
    return projects
      .filter((project) => project.featured)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, 3)
      .map((project) => {
        const known = knownProjects.find((item) => normalizeName(item.name) === normalizeName(project.name));
        return {
          name: project.name,
          link: project.link,
          description: known ? content[known.summaryKey] ?? getDescription(project) : getDescription(project),
        };
      });
  }

  const sources = [...projects, ...wip];
  const selected: HomeProject[] = [];
  const seen = new Set<string>();

  for (const name of names) {
    const normalized = normalizeName(name);
    if (seen.has(normalized)) continue;
    seen.add(normalized);

    const known = knownProjects.find((item) => normalizeName(item.name) === normalized);
    const source = sources.find((project) => normalizeName(project.name) === normalized)
      ?? (known ? sources.find((project) => project.link.replace(/\/$/, "") === known.link) : undefined);
    const project = source ?? known;

    if (project) {
      selected.push({
        name: known?.name ?? project.name,
        link: source?.link || known?.link || project.link,
        description: known
          ? content[known.summaryKey] ?? known.description
          : getDescription(project),
      });
    }
    if (selected.length === 3) break;
  }

  return selected;
}
