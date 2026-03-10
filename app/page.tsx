import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import WipSection from "@/components/wip/WipSection";
import { mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjects, getSiteContentEntries, getWipProjects } from "@/lib/convex";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allProjects, wipProjects, contentEntries] = await Promise.all([
    getProjects(),
    getWipProjects(),
    getSiteContentEntries(),
  ]);
  const content = mergeSiteContent(contentEntries);
  const projects = allProjects
    .filter((project) => project.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="animate-fade-in-up stagger-1">
        <h1 className="font-serif text-5xl leading-tight md:text-6xl">
          {content["home.heroTitle"]}
        </h1>
      </section>

      <section className="stagger-2 animate-fade-in-up mt-4">
        <p className="text-lg text-(--text-secondary)">
          {content["home.subtitle"]}
        </p>
      </section>

      <section className="stagger-3 animate-fade-in-up mt-12 flex flex-col gap-5">
        <p className="leading-relaxed text-[var(--text-secondary)]">
          {content["home.intro1"]}
        </p>
        <p className="leading-relaxed text-[var(--text-secondary)]">
          {content["home.intro2"]}
        </p>
      </section>

      <section className="stagger-4 animate-fade-in-up mt-16">
        <WipSection items={wipProjects} heading={content["home.wipHeading"]} />
      </section>

      <section className="stagger-5 animate-fade-in-up mt-20">
        <h2 className="mb-10 font-serif text-3xl">{content["home.projectsHeading"]}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._id ?? project.name} project={project} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 after:content-[''] group-hover:after:w-full">
              {content["home.projectsCtaLabel"]}
            </span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
