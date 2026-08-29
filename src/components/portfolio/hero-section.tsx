import { Code2, Download, Link2, Mail, MessageCircleMore } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/portfolio/reveal";
import { portfolio } from "@/content/portfolio";

const socialIconMap = {
  github: Code2,
  linkedin: Link2,
  mail: Mail,
};

export function HeroSection() {
  return (
    <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
      <Reveal className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8">
        <div className="max-w-2xl">
          <div className="text-sm font-medium text-cyan-300">{portfolio.heroNote}</div>
          <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
            I&apos;m {portfolio.name}
          </h1>
          <p className="mt-4 text-xl text-slate-200 sm:text-2xl">{portfolio.role}</p>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            {portfolio.summary}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={portfolio.resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Download Resume
            <Download className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
          >
            <MessageCircleMore className="h-4 w-4" />
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {portfolio.socialLinks.map((link) => {
            const Icon = socialIconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="rounded-[2rem] border border-white/10 bg-[#101827]/90 p-5 shadow-[0_30px_120px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(232,121,249,0.5),transparent_34%),radial-gradient(circle_at_75%_25%,rgba(56,189,248,0.45),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="flex items-start justify-between">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Profile Card</div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative h-44 w-44 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.92),rgba(147,197,253,0.35)_36%,rgba(15,23,42,0.1)_70%)] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_100px_rgba(59,130,246,0.18)] sm:h-56 sm:w-56">
              <Image
                src="/ksh.jpg"
                alt="Kaung Set Hein portrait"
                fill
                sizes="(min-width: 1536px) 224px, 176px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_20%,transparent_28%,rgba(15,23,42,0.12)_72%)]" />
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 font-mono text-[0.86rem] leading-7 text-slate-200">
            <span className="text-emerald-300">const</span> developer ={" "}
            <span className="text-slate-400">{`{`}</span>
            <br />
            <span className="ml-4 block">
              name: <span className="text-cyan-200">&quot;{portfolio.name}&quot;</span>,
            </span>
            <span className="ml-4 block">
              focus: <span className="text-cyan-200">[&quot;frontend&quot;, &quot;ERP&quot;, &quot;automation&quot;]</span>,
            </span>
            <span className="ml-4 block">
              tools: <span className="text-cyan-200">[&quot;Next.js&quot;, &quot;Node.js&quot;, &quot;n8n&quot;]</span>,
            </span>
            <span className="text-slate-400">{`}`}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
