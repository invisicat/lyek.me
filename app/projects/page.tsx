import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectSection from "@/components/projects/ProjectSection";
import { DEFAULT_CATEGORIES, mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjectCategories, getProjects, getSiteContentEntries } from "@/lib/convex";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects - Andy Lyek",
};

function withCategory(projects: Project[], categorySlug: string) {
  return projects.filter((project) => project.categorySlug === categorySlug);
}

export default async function ProjectsPage() {
  const [projectList, categoriesRaw, contentEntries] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getSiteContentEntries(),
  ]);
  const projects = [...projectList].sort((a, b) => a.sortOrder - b.sortOrder || Number(b.recent) - Number(a.recent));
  const categories =
    (categoriesRaw.length > 0 ? categoriesRaw : DEFAULT_CATEGORIES)
      .filter((category) => category.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  const content = mergeSiteContent(contentEntries);

  return (
    <>
      <h1 className="text-base font-medium tracking-tight">
        {content["projects.pageTitle"]}
      </h1>
      <nav aria-label="Project categories" className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="text-link text-sm text-[var(--text-secondary)]"
          >
            {category.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {categories.map((category) => (
          <ProjectSection
            key={category.slug}
            id={category.slug}
            title={category.label}
            description={category.description}
          >
            {withCategory(projects, category.slug).map((project) => (
              <ProjectCard key={project._id ?? project.name} project={project} />
            ))}
          </ProjectSection>
        ))}
      </div>
    </>
  );
}
