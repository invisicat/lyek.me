import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjects, getSiteContentEntries } from "@/lib/convex";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allProjects, contentEntries] = await Promise.all([
    getProjects(),
    getSiteContentEntries(),
  ]);
  const content = mergeSiteContent(contentEntries);
  const projects = allProjects
    .filter((project) => project.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <section aria-labelledby="intro-heading">
        <h1 id="intro-heading" className="text-3xl font-semibold tracking-tight">
          {content["home.heroTitle"]}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          {content["home.intro1"]}
        </p>
        <p className="mt-3 text-[var(--text-secondary)]">
          {content["home.subtitle"]}
        </p>
        <p className="mt-5 text-sm text-[var(--text-secondary)]">
          {content["home.experience"]}
        </p>
      </section>

      <section aria-labelledby="current-heading">
        <h2 id="current-heading" className="text-base font-semibold">
          {content["home.wipHeading"]}
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          {content["home.intro2"]}
        </p>
      </section>

      {projects.length > 0 ? (
        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="text-base font-semibold">
            {content["home.projectsHeading"]}
          </h2>
          <ul className="mt-4 flex flex-col gap-5">
            {projects.map((project) => (
              <li key={project._id ?? project.name}>
                <ProjectCard project={project} compact />
              </li>
            ))}
          </ul>
          <Link
            href="/projects"
            className="text-link mt-5 inline-block text-sm text-[var(--text-secondary)]"
          >
            {content["home.projectsCtaLabel"]}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
