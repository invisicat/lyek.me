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
  "home.subtitle": "Outside of that, I like cooking, videography, and gaming.",
  "home.intro1": "I'm studying Electrical Engineering and CS at Stanford. I make software and tinker with hardware.",
  "home.experience": "Previously: MTS at Photon, SWE at polylabs.ai, and SWE at CraftiGames.",
  "home.intro2":
    "Lately, I've been working on local video processing for small production crews and a custom dashcam, from the PCB to the firmware.",
  "home.wipHeading": "These days",
  "home.projectsHeading": "A few things I've made",
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
