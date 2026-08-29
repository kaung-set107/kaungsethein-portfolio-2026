import { Code2, Link2, Mail, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

import { portfolio } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { SectionLink } from "./section-link";

const iconMap = {
  github: <Code2 className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export function Sidebar() {
  return (
    <aside className="border-b border-white/10 bg-slate-950/60 p-4 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-5">
      <div className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_18px_60px_rgba(56,189,248,0.18)]">
          <Image
            src="/ksh.jpg"
            alt="Kaung Set Hein portrait"
            fill
            sizes="44px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <div className="font-heading text-lg font-semibold text-white">Portfolio</div>
          <div className="text-xs tracking-[0.28em] text-slate-400">KAUNG SET HEIN</div>
        </div>
      </div>

      <nav className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible">
        {portfolio.navItems.map((item) => (
          <SectionLink
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex min-w-max items-center gap-2 rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-300 transition",
              "hover:border-white/10 hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            )}
          >
            <Sparkles className="h-4 w-4 text-cyan-300/80" />
            {item.label}
          </SectionLink>
        ))}
      </nav>

      <div className="mt-6 rounded-[1.75rem] border border-emerald-300/15 bg-emerald-300/8 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.6)]" />
          Current position
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">{portfolio.availability}</p>
      </div>

      <div className="mt-6 space-y-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Quick Facts</div>
        {portfolio.quickFacts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border border-white/10 bg-white/5 p-2 text-cyan-200">
              {fact.icon === "location" ? (
                <MapPin className="h-4 w-4" />
              ) : fact.icon === "availability" ? (
                <Sparkles className="h-4 w-4" />
              ) : fact.icon === "focus" ? (
                <Sparkles className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{fact.label}</div>
              <div className="text-sm text-white">{fact.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {portfolio.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{link.label}</span>
            {iconMap[link.icon]}
          </a>
        ))}
      </div>
    </aside>
  );
}
