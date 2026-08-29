import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { portfolio } from "@/content/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="mt-8 scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-7 lg:scroll-mt-28">
      <Reveal>
        <SectionHeading
          eyebrow="Technical Skills"
          title="Full-stack delivery from interface to deployment"
          description="Production experience across frontend architecture, REST APIs, databases, cloud deployment, workflow automation, and Agile delivery."
        />
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {portfolio.skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.07}>
            <article className="h-full rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
              <div className="text-sm font-semibold text-white">{group.title}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
