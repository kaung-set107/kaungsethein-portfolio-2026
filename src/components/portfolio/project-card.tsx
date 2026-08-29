import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/portfolio/reveal";
import type { Project } from "@/content/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-4 transition hover:-translate-y-1 hover:border-cyan-300/25">
        <div className={`h-36 rounded-[1.35rem] bg-gradient-to-br ${project.tone} p-4`}>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.3em] text-white/80">Case Study</div>
            <ArrowUpRight className="h-4 w-4 text-white/85 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="mt-10 max-w-[12rem] text-lg font-semibold leading-tight text-white">
            {project.title}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-3 pt-4">
          <p className="text-sm leading-6 text-slate-300">{project.description}</p>
          <div className="text-sm font-medium text-cyan-200">{project.outcome}</div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.stack.map((stackItem) => (
              <span
                key={stackItem}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
