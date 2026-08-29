import { Download, Mail, Phone } from "lucide-react";

import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { portfolio } from "@/content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="mt-8 scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-7 lg:scroll-mt-28">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Connect with Kaung Set Hein"
          description="Get in touch about full-stack development, frontend architecture, business systems, or workflow automation."
        />
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <Reveal>
          <div className="h-full rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Contact details
            </div>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              I&apos;m {portfolio.name}, a Full-Stack Software Engineer in Yangon with experience
              delivering local and international platforms, ERP modules, learning systems,
              finance applications, REST APIs, and automated workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${portfolio.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                <Mail className="h-4 w-4" />
                {portfolio.email}
              </a>
              {portfolio.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replaceAll(" ", "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              ))}
              <a
                href={portfolio.resumeHref}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div id="experience" className="scroll-mt-24 grid h-full gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 lg:scroll-mt-28">
            <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Experience</div>
            {portfolio.experience.map((item) => (
              <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-cyan-200">{item.period}</div>
                <div className="mt-1 text-sm font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
