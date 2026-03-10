import type { ProjectCategory, SiteContentEntry } from "@/lib/types";

export const DEFAULT_CATEGORIES: ProjectCategory[] = [
  {
    slug: "general",
    label: "General",
    description: "A collection of projects from my hobbies over the years.",
    visible: true,
    sortOrder: 0,
  },
  {
    slug: "web",
    label: "Web",
    description: "Projects built with React, Tailwind, TypeScript, and other web technologies.",
    visible: true,
    sortOrder: 1,
  },
  {
    slug: "game",
    label: "Games",
    description: "Mods, plugins, servers, and other game projects.",
    visible: true,
    sortOrder: 2,
  },
];

export const SITE_CONTENT_DEFAULTS: Record<string, string> = {
  "home.heroTitle": "Hello, I'm Andy.",
  "home.subtitle": "Stanford - Electrical Engineering & CS",
  "home.intro1": "I design and build backend systems and full stack software from web apps to infrastructure.",
  "home.intro2":
    "As of Spring 2026, I'm currently working on a project to bring real-time AI video processing to affordable hardware for budget productions.",
  "home.wipHeading": "In the works",
  "home.projectsHeading": "Projects",
  "home.projectsCtaLabel": "All projects",
  "projects.pageTitle": "Projects",
  "projects.badgeRecent": "Recent",
  "projects.badgeMobile": "Mobile",
};

export function mergeSiteContent(entries: SiteContentEntry[]) {
  const merged = { ...SITE_CONTENT_DEFAULTS };
  for (const entry of entries) {
    merged[entry.key] = entry.value;
  }
  return merged;
}
