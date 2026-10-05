import { Fragment } from "react";
import Link from "next/link";
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
    <div className="flex flex-col gap-7 pb-4">
      <section aria-labelledby="intro-heading">
        <h1 id="intro-heading" className="text-base font-medium tracking-tight">
          {content["home.heroTitle"]}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          {content["home.intro1"]}
        </p>
        <p className="mt-3 text-[var(--text-secondary)]">
          {content["home.subtitle"]}
        </p>
        <p className="mt-5 text-xs leading-relaxed text-[var(--text-tertiary)]">
          {content["home.experience"]}
        </p>
      </section>

      <section aria-labelledby="current-heading">
        <h2 id="current-heading" className="text-sm font-medium">
          {content["home.wipHeading"]}
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          {content["home.intro2"]}
        </p>
      </section>

      {projects.length > 0 ? (
        <section aria-label="Selected projects">
          <p className="text-[var(--text-secondary)]">
            {content["home.projectsHeading"]}{" "}
            {projects.map((project, index) => (
              <Fragment key={project._id ?? project.name}>
                {index > 0 ? index === projects.length - 1 ? " and " : ", " : null}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={project.descriptionShort.trim() || project.description}
                  className="font-medium text-[var(--text)] underline-offset-4 hover:underline"
                >
                  {project.name}
                </a>
              </Fragment>
            ))}.
          </p>
          <Link
            href="/projects"
            className="text-link mt-3 inline-block text-[var(--text-secondary)]"
          >
            {content["home.projectsCtaLabel"]}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
