import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectSection from "@/components/projects/ProjectSection";
import { DEFAULT_CATEGORIES, mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjectCategories, getProjects, getSiteContentEntries, getWipProjects } from "@/lib/convex";
import { getHomeProjects } from "@/lib/homeProjects";
import { getProjectCopy } from "@/lib/projectCopy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects - Andy Lyek",
};

function normalizeLink(link: string) {
  return link.replace(/\/$/, "");
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
  const selected = getHomeProjects(projectList, wipProjects, content).filter((project) =>
    !projectList.some((record) =>
      normalizeLink(record.link) === normalizeLink(project.link) && !visibleCategories.has(record.categorySlug),
    ),
  );
  const selectedLinks = new Set(selected.map((project) => normalizeLink(project.link)));
  const projects = projectList
    .filter((project) => visibleCategories.has(project.categorySlug) && !selectedLinks.has(normalizeLink(project.link)))
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
        {selected.length > 0 ? (
          <ProjectSection id="selected" title={content["projects.selectedHeading"]}>
            {selected.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ProjectSection>
        ) : null}
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
