import { BriefcaseBusiness, Clock3, MapPin, Sparkles } from "lucide-react";

import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { portfolio } from "@/content/portfolio";

const iconMap = {
  location: MapPin,
  availability: Clock3,
  focus: Sparkles,
  stack: BriefcaseBusiness,
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl sm:p-7 lg:scroll-mt-28"
    >
      <Reveal>
        <SectionHeading
          eyebrow="About Me"
          title="Software engineering grounded in business systems"
          description="Based in Yangon, I build scalable interfaces and full-stack applications while supporting teams through Agile delivery, technical leadership, and clear communication."
        />
      </Reveal>

      <div className="mt-6 space-y-3">
        {portfolio.quickFacts.map((fact, index) => {
          const Icon = iconMap[fact.icon];
          return (
            <Reveal key={fact.label} delay={index * 0.05}>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-2 text-cyan-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{fact.label}</div>
                  <div className="text-sm text-white">{fact.value}</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.16}>
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Education</div>
          <div className="mt-2 text-sm font-semibold text-white">{portfolio.education.degree}</div>
          <div className="mt-1 text-sm leading-6 text-slate-300">
            {portfolio.education.institution} / {portfolio.education.period}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolio.languages.map((language) => (
              <span key={language} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                {language}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 via-white/5 to-fuchsia-300/10 p-5">
          <p className="text-sm leading-7 text-slate-200">{portfolio.highlight}</p>
        </div>
      </Reveal>
    </section>
  );
}
