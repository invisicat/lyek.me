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
  "home.heroTitle": "Andy Lyek",
  "home.subtitle": "I also like cooking, videography, and gaming.",
  "home.intro1": "I study Electrical Engineering and CS at Stanford, building software and hardware.",
  "home.experience": "Previously: Photon (MTS), polylabs.ai (SWE), CraftiGames (SWE).",
  "home.intro2":
    "I'm working on local video processing for small production crews and building a custom dashcam, from the PCB to the firmware.",
  "home.wipHeading": "These days",
  "home.projectsHeading": "A few things I've made:",
  "home.featuredProjects": "ICS Filter, RiceStats, tag2me",
  "home.projectIcsSummary": "Filter unwanted events out of calendar feeds.",
  "home.projectRiceStatsSummary": "Track Minecraft player activity and server performance.",
  "home.projectTag2meSummary": "Tag and describe videos from social media.",
  "home.projectsCtaLabel": "All projects",
  "projects.pageTitle": "Projects",
  "projects.intro": "A few things I've built, from video tools to Minecraft plugins.",
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
