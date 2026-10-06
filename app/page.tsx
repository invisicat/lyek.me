import Link from "next/link";
import ContactLinks from "@/components/base/ContactLinks";
import PreviousRoles from "@/components/home/PreviousRoles";
import { mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjects, getSiteContentEntries, getWipProjects } from "@/lib/convex";
import { getHomeProjects } from "@/lib/homeProjects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allProjects, contentEntries, wipProjects] = await Promise.all([
    getProjects(),
    getSiteContentEntries(),
    getWipProjects(),
  ]);
  const content = mergeSiteContent(contentEntries);
  const projects = getHomeProjects(allProjects, wipProjects, content);

  return (
    <div className="flex flex-col gap-7 pb-4">
      <section aria-labelledby="intro-heading">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 id="intro-heading" className="text-base font-medium tracking-tight">
            {content["home.heroTitle"]}
          </h1>
          <ContactLinks />
        </div>
        <p className="mt-4 text-[var(--text-secondary)]">
          {content["home.intro1"]}
        </p>
        <p className="mt-3 text-[var(--text-secondary)]">
          {content["home.subtitle"]}
        </p>
        <PreviousRoles text={content["home.experience"]} />
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
            {content["home.projectsHeading"]}
          </p>
          <ul className="mt-3 space-y-2 text-[var(--text-secondary)]">
            {projects.map((project) => (
              <li key={project.name}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--text)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-current"
                >
                  {project.name}
                </a>
                {project.description ? `: ${project.description}` : null}
              </li>
            ))}
          </ul>
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
