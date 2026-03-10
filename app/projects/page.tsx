import type { Metadata } from "next";
import { Smartphone, Star } from "lucide-react";
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
      <div className="stagger-1 animate-fade-in-up">
        <h1 className="font-serif text-4xl md:text-5xl">{content["projects.pageTitle"]}</h1>

        <nav className="mt-8 flex items-center gap-4">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="text-sm text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {category.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex items-center gap-5 text-xs text-[var(--text-tertiary)]">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-[var(--accent)]" fill="currentColor" />
            {content["projects.badgeRecent"]}
          </span>
          <span className="flex items-center gap-1">
            <Smartphone size={12} className="text-[var(--text-secondary)]" />
            {content["projects.badgeMobile"]}
          </span>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-20">
        {categories.map((category, index) => (
          <div key={category.slug} className={`stagger-${index + 2} animate-fade-in-up`}>
            <ProjectSection
              id={category.slug}
              title={category.label}
              description={category.description}
            >
              {withCategory(projects, category.slug).map((project) => (
                <ProjectCard key={project._id ?? project.name} project={project} />
              ))}
            </ProjectSection>
          </div>
        ))}
      </div>
    </>
  );
}
