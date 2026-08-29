import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { portfolio } from "@/content/portfolio";

import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-7 lg:scroll-mt-28">
      <Reveal>
        <SectionHeading
          eyebrow="Project Experience"
          title="Business systems built for real operations"
          description="Selected work from the resume, spanning finance, team learning, e-learning, role-based panels, reporting, and communication workflows."
          action={
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </a>
          }
        />
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {portfolio.featuredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
