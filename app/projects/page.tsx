import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectSection from "@/components/projects/ProjectSection";
import { DEFAULT_CATEGORIES, mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjectCategories, getProjects, getSiteContentEntries, getWipProjects } from "@/lib/convex";
import { getProjectCopy } from "@/lib/projectCopy";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects - Andy Lyek",
};

function isTag2me(project: { name: string; link: string }) {
  return project.name.trim().toLowerCase().split(" - ")[0] === "tag2me"
    || /^https?:\/\/(www\.)?tag2me\.app\/?$/i.test(project.link);
}

export default async function ProjectsPage() {
  const [projectList, categoriesRaw, contentEntries, wipProjects] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getSiteContentEntries(),
    getWipProjects(),
  ]);
  const categories =
    (categoriesRaw.length > 0 ? categoriesRaw : DEFAULT_CATEGORIES)
      .filter((category) => category.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  const content = mergeSiteContent(contentEntries);
  const visibleCategories = new Set(categories.map((category) => category.slug));
  const tag2me = wipProjects.find(isTag2me);
  const tag2meSummary = content["home.projectTag2meSummary"];
  const archive: Project[] = [...projectList];
  if (!projectList.some(isTag2me)) {
    archive.push({
      name: "tag2me",
      description: tag2meSummary,
      descriptionShort: tag2meSummary,
      link: tag2me?.link || "https://tag2me.app",
      linkType: "website",
      categorySlug: "web",
      recent: true,
      featured: true,
      sortOrder: Number.MAX_SAFE_INTEGER,
      tags: [],
      icons: [],
      variant: "Short",
    });
  }
  const projects = archive
    .filter((project) => visibleCategories.has(project.categorySlug))
    .sort((a, b) => a.sortOrder - b.sortOrder || Number(b.recent) - Number(a.recent));
  const sections = categories
    .map((category) => ({
      ...category,
      projects: projects.filter((project) => project.categorySlug === category.slug),
    }))
    .filter((category) => category.projects.length > 0);

  return (
    <div className="projects-page pb-4">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="text-lg font-medium tracking-tight">
          {content["projects.pageTitle"]}
        </h1>
        <Link href="/" className="text-link text-xs text-[var(--text-secondary)]">
          Home
        </Link>
      </div>
      <p className="mt-2 text-[var(--text-secondary)]">{content["projects.intro"]}</p>

      <div className="mt-9 flex flex-col gap-10">
        {sections.map((category) => (
          <ProjectSection
            key={category.slug}
            id={category.slug}
            title={category.label}
          >
            {category.projects.map((project) => (
              <ProjectCard key={project._id ?? project.name} project={getProjectCopy(project)} />
            ))}
          </ProjectSection>
        ))}
      </div>
    </div>
  );
}
