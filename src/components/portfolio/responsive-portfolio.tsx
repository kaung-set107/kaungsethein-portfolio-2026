"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  FileText,
  Folder,
  Home,
  Link2,
  Mail,
  MapPin,
  Menu,
  Phone,
  UserRound,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { useState } from "react";

import { portfolio } from "@/content/portfolio";

type PortfolioPage = "about" | "projects" | "skills" | "experience" | "resume" | "contact";

const apps: Array<{
  id: PortfolioPage;
  label: string;
  Icon: typeof UserRound;
  gradient: string;
}> = [
  { id: "about", label: "About", Icon: UserRound, gradient: "from-violet-300 via-violet-500 to-indigo-700" },
  { id: "projects", label: "Projects", Icon: Folder, gradient: "from-sky-200 via-sky-400 to-blue-700" },
  { id: "skills", label: "Skills", Icon: Code2, gradient: "from-emerald-200 via-emerald-400 to-teal-700" },
  { id: "experience", label: "Experience", Icon: BriefcaseBusiness, gradient: "from-amber-200 via-orange-400 to-rose-700" },
  { id: "resume", label: "Resume", Icon: FileText, gradient: "from-rose-200 via-pink-400 to-fuchsia-700" },
  { id: "contact", label: "Contact", Icon: Mail, gradient: "from-cyan-100 via-cyan-400 to-blue-700" },
];

const appMap = Object.fromEntries(apps.map((app) => [app.id, app])) as Record<PortfolioPage, (typeof apps)[number]>;

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}) {
  return (
    <div className="flex gap-1.5">
      <button type="button" onClick={onClose} className="h-3 w-3 rounded-full bg-[#ff5f57] outline-none ring-white/80 focus-visible:ring-2" aria-label="Close portfolio window" title="Close" />
      <button type="button" onClick={onMinimize} className="h-3 w-3 rounded-full bg-[#febc2e] outline-none ring-white/80 focus-visible:ring-2" aria-label="Minimize portfolio window" title="Minimize" />
      <button type="button" onClick={onMaximize} className="h-3 w-3 rounded-full bg-[#28c840] outline-none ring-white/80 focus-visible:ring-2" aria-label={isMaximized ? "Restore portfolio window" : "Maximize portfolio window"} title={isMaximized ? "Restore" : "Maximize"} />
    </div>
  );
}

function AppIcon({
  page,
  onOpen,
  compact = false,
  showLabel = false,
  selected = false,
}: {
  page: PortfolioPage;
  onOpen: (page: PortfolioPage) => void;
  compact?: boolean;
  showLabel?: boolean;
  selected?: boolean;
}) {
  const app = appMap[page];
  const Icon = app.Icon;

  return (
    <button
      type="button"
      onClick={() => onOpen(page)}
      className={`group flex min-w-0 flex-col items-center rounded-2xl px-1 py-1.5 text-center text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white/80 ${
        compact ? "gap-1" : "gap-2.5"
      } ${selected ? "bg-white/10" : ""}`}
      aria-label={`Open ${app.label}`}
    >
      <span
        className={`relative flex items-center justify-center overflow-hidden border border-white/35 bg-gradient-to-br ${app.gradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_30px_rgba(2,6,23,0.4)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${
          compact ? "h-11 w-11 rounded-[0.9rem]" : "h-[4.6rem] w-[4.6rem] rounded-[1.35rem]"
        }`}
      >
        <span className="absolute inset-x-1 top-1 h-1/2 rounded-full bg-white/15 blur-md" />
        <Icon className={compact ? "relative h-5 w-5" : "relative h-9 w-9"} strokeWidth={1.65} />
      </span>
      {!compact || showLabel ? <span className={compact ? "text-[9px] text-slate-200" : "text-xs font-medium tracking-wide text-white/95"}>{app.label}</span> : null}
    </button>
  );
}

function AboutContent({ tablet = false }: { tablet?: boolean }) {
  return (
    <div className={tablet ? "grid items-center gap-7 sm:grid-cols-[180px_minmax(0,1fr)]" : "text-center"}>
      <div className={tablet ? "mx-auto" : "mx-auto"}>
        <div className={`relative overflow-hidden rounded-full border border-white/20 bg-violet-300/15 shadow-[0_24px_60px_rgba(15,23,42,0.45)] ${tablet ? "h-36 w-36" : "h-28 w-28"}`}>
          <Image src="/ksh.jpg" alt="Kaung Set Hein" fill sizes={tablet ? "144px" : "112px"} className="object-cover object-center" priority />
        </div>
      </div>
      <div className={tablet ? "text-left" : "mt-5"}>
        <p className="text-sm text-slate-300">Hi, I&apos;m</p>
        <h2 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white">{portfolio.name}</h2>
        <p className="mt-1 text-sm font-medium text-violet-300">{portfolio.role}</p>
        <p className="mt-4 text-sm leading-6 text-slate-300">{portfolio.summary}</p>
        <div className={`mt-5 flex gap-2 ${tablet ? "justify-start" : "justify-center"}`}>
          {portfolio.socialLinks.map((link) => {
            const Icon = link.icon === "github" ? Code2 : link.icon === "linkedin" ? Link2 : Mail;
            return (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={link.label} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        <a href={portfolio.resumeHref} download className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110 ${tablet ? "" : "mx-auto"}`}>
          <Download className="h-3.5 w-3.5" />
          Download CV
        </a>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="grid gap-3">
      {portfolio.featuredProjects.map((project, index) => (
        <article key={project.title} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 shadow-[0_14px_38px_rgba(2,6,23,0.3)]">
          <div className="relative h-28 overflow-hidden">
            <Image src="/maclock.jpg" alt="" fill sizes="(max-width: 767px) 100vw, 620px" className={`object-cover ${index === 0 ? "object-[center_65%]" : index === 1 ? "object-[35%_55%]" : "object-[75%_58%]"}`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.tone} mix-blend-color`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" />
            <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/45 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-lg">Project 0{index + 1}</div>
          </div>
          <div className="p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="text-sm font-semibold leading-tight text-white">{project.title}</h3><p className="mt-1 text-[9px] text-violet-300">Web Application</p></div>
              <a href={`mailto:${portfolio.email}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white" aria-label={`Contact me about ${project.title}`}><ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
            <p className="mt-2 text-[10px] leading-[1.05rem] text-slate-300">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => <span key={item} className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[9px] text-slate-300">{item}</span>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {portfolio.skillGroups.map((group) => (
        <article key={group.title} className="rounded-2xl border border-white/10 bg-[#0b1020]/75 p-3.5 shadow-[0_12px_34px_rgba(2,6,23,0.24)]">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-violet-400" /><h3 className="text-xs font-semibold text-white">{group.title}</h3></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => <span key={item} className="rounded-full border border-white/8 bg-white/[0.045] px-2.5 py-1.5 text-[9px] text-slate-300">{item}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="grid gap-3">
      {portfolio.experience.map((item) => (
        <article key={item.title} className="relative rounded-2xl border border-white/10 bg-[#0b1020]/75 p-4 pl-5 shadow-[0_12px_34px_rgba(2,6,23,0.24)]">
          <span className="absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-gradient-to-b from-cyan-300 to-violet-500" />
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-200">{item.period}</div>
          <h3 className="mt-1 text-xs font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-[10px] leading-[1.05rem] text-slate-300">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function ResumeContent({ tablet = false }: { tablet?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0b1020]/65 px-5 text-center shadow-[0_18px_50px_rgba(2,6,23,0.3)] ${tablet ? "min-h-[430px] py-10" : "min-h-[calc(100svh-12rem)] py-8"}`}>
      <div className="relative flex h-24 w-20 items-center justify-center rounded-[1.35rem] border border-white/30 bg-gradient-to-br from-violet-300 via-indigo-500 to-blue-800 shadow-[0_20px_60px_rgba(99,102,241,0.35)]">
        <FileText className="h-12 w-12 text-white" strokeWidth={1.25} />
      </div>
      <h2 className="font-heading mt-5 text-xl font-semibold text-white">{portfolio.name}</h2>
      <p className="mt-1 text-xs text-violet-300">{portfolio.role}</p>
      <p className="mt-4 max-w-sm text-[10px] leading-[1.1rem] text-slate-300">Download my resume for a complete overview of my professional experience, technical skills, and education.</p>
      <a href={portfolio.resumeHref} download className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110">
        <Download className="h-4 w-4" />
        Download CV
      </a>
    </div>
  );
}

function ContactContent() {
  return (
    <div>
      <div className="rounded-2xl border border-white/10 bg-[#0b1020]/75 p-4 shadow-[0_16px_44px_rgba(2,6,23,0.3)]">
        <div className="text-[10px] uppercase tracking-[0.22em] text-violet-300">Let&apos;s work together</div>
        <h2 className="font-heading mt-2 text-xl font-semibold text-white">Start a conversation</h2>
        <p className="mt-2 text-[10px] leading-[1.1rem] text-slate-300">Have a project in mind or a role that fits? Reach me directly using any option below.</p>
        <div className="mt-5 grid gap-2.5">
          <a href={`mailto:${portfolio.email}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-[10px] text-white transition hover:bg-white/10"><Mail className="h-4 w-4 shrink-0 text-violet-300" /><span className="min-w-0 truncate">{portfolio.email}</span></a>
          {portfolio.phones.map((phone) => <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-[10px] text-white transition hover:bg-white/10"><Phone className="h-4 w-4 shrink-0 text-violet-300" />{phone}</a>)}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-[10px] text-white"><MapPin className="h-4 w-4 shrink-0 text-violet-300" />{portfolio.location}</div>
        </div>
      </div>
    </div>
  );
}

function PageContent({ page, tablet = false }: { page: PortfolioPage; tablet?: boolean }) {
  if (page === "about") return <AboutContent tablet={tablet} />;
  if (page === "projects") return <ProjectsContent />;
  if (page === "skills") return <SkillsContent />;
  if (page === "experience") return <ExperienceContent />;
  if (page === "resume") return <ResumeContent tablet={tablet} />;
  return <ContactContent />;
}

const mobileSkills = portfolio.skillGroups.flatMap((group) => group.items).slice(0, 8);

function MobileHome({ onOpen }: { onOpen: (page: PortfolioPage) => void }) {
  const [featuredProjectIndex, setFeaturedProjectIndex] = useState(0);
  const project = portfolio.featuredProjects[featuredProjectIndex];

  return (
    <main className="pb-24">
      <section className="relative overflow-hidden border-b border-white/8 px-5 pb-5 pt-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(236,72,153,0.22),transparent_34%),radial-gradient(circle_at_78%_14%,rgba(99,102,241,0.34),transparent_38%)]" />
        <div className="relative">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-violet-200/20 bg-violet-300/10 shadow-[0_18px_45px_rgba(76,29,149,0.38)]">
            <Image src="/ksh.jpg" alt="Kaung Set Hein" fill sizes="96px" className="object-cover object-center" priority />
          </div>
          <h1 className="font-heading mt-3 text-[1.35rem] font-semibold tracking-tight text-white">Kaung Set Hein</h1>
          <p className="mt-0.5 text-xs font-medium text-violet-300">{portfolio.role}</p>
          <p className="mx-auto mt-3 max-w-[19rem] text-[11px] leading-[1.15rem] text-slate-300">
            I create clean, scalable web applications that solve real business problems and provide a smooth user experience.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button type="button" onClick={() => onOpen("projects")} className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-[10px] font-semibold text-white shadow-[0_8px_25px_rgba(99,102,241,0.3)] transition active:scale-95">
              View Projects
            </button>
            <a href={portfolio.resumeHref} download className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-medium text-slate-200 transition active:scale-95">
              <Download className="h-3 w-3" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className="px-3 pt-4">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-white">Featured Projects</h2>
          <button type="button" onClick={() => onOpen("projects")} className="text-[10px] text-violet-300">View All</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={project.title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 shadow-[0_16px_45px_rgba(2,6,23,0.38)]">
            <button type="button" onClick={() => onOpen("projects")} className="relative block h-28 w-full overflow-hidden text-left" aria-label={`View ${project.title}`}>
              <Image src="/maclock.jpg" alt="" fill sizes="(max-width: 767px) 100vw, 0px" className="object-cover object-[center_62%]" />
              <span className={`absolute inset-0 bg-gradient-to-br ${project.tone} mix-blend-color`} />
              <span className="absolute inset-0 bg-gradient-to-t from-[#090d1b] via-transparent to-transparent" />
            </button>
            <div className="relative p-3 pr-12">
              <h3 className="text-[11px] font-semibold text-white">{project.title}</h3>
              <p className="mt-0.5 text-[9px] text-slate-400">Web Application</p>
              <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-slate-300">{project.description}</p>
              <button type="button" onClick={() => onOpen("projects")} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-white transition active:scale-90" aria-label={`Open ${project.title}`}>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-2.5 flex justify-center gap-1.5" aria-label="Featured project selector">
          {portfolio.featuredProjects.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setFeaturedProjectIndex(index)} className={`h-1.5 rounded-full transition-all ${featuredProjectIndex === index ? "w-4 bg-violet-400" : "w-1.5 bg-white/20"}`} aria-label={`Show project ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="px-3 pt-4">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-white">Skills</h2>
          <button type="button" onClick={() => onOpen("skills")} className="text-[10px] text-violet-300">View All</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {mobileSkills.map((skill, index) => (
            <span key={skill} className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.045] px-2.5 py-1.5 text-[9px] text-slate-300">
              <span className={`h-1.5 w-1.5 rounded-full ${index % 3 === 0 ? "bg-violet-400" : index % 3 === 1 ? "bg-cyan-400" : "bg-emerald-400"}`} />
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

function MobilePortfolio() {
  const [activePage, setActivePage] = useState<PortfolioPage | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const openPage = (page: PortfolioPage) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };
  const openHome = () => {
    setActivePage(null);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#080b18] md:hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(168,85,247,0.16),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.16),transparent_32%),linear-gradient(180deg,#11142b_0%,#080b18_48%,#050712_100%)]" />

      <div className="relative z-10 min-h-svh">
        <header className="sticky top-0 z-40 flex h-9 items-center justify-between border-b border-white/8 bg-[#12152e]/88 px-3 text-[10px] text-white shadow-sm backdrop-blur-2xl">
          <button type="button" onClick={openHome} className="flex items-center gap-2 rounded-lg px-1.5 py-1 font-medium outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
            <span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden="true" />
            Portfolio
          </button>
          <button type="button" onClick={() => setIsMenuOpen((current) => !current)} className={`rounded-lg p-1.5 transition ${isMenuOpen ? "bg-violet-500/25 text-violet-200" : "text-slate-200 hover:bg-white/10"}`} aria-label="Open portfolio menu" aria-expanded={isMenuOpen} aria-controls="mobile-portfolio-menu">
            <Menu className="h-4 w-4" />
          </button>
        </header>

        {isMenuOpen ? <button type="button" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-30 cursor-default" aria-label="Close portfolio menu" /> : null}
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav id="mobile-portfolio-menu" initial={{ opacity: 0, y: -10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.96 }} className="fixed right-3 top-11 z-50 w-52 rounded-2xl border border-white/15 bg-[#0b0f20]/92 p-2 shadow-[0_22px_65px_rgba(2,6,23,0.65)] backdrop-blur-2xl" aria-label="Mobile sections">
              <button type="button" onClick={openHome} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs ${activePage === null ? "bg-violet-500/20 text-white" : "text-slate-300 hover:bg-white/8"}`}><Home className="h-4 w-4 text-violet-300" />Home</button>
              {apps.map((app) => {
                const Icon = app.Icon;
                return <button key={app.id} type="button" onClick={() => openPage(app.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs ${activePage === app.id ? "bg-violet-500/20 text-white" : "text-slate-300 hover:bg-white/8"}`}><Icon className="h-4 w-4 text-violet-300" />{app.label}</button>;
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activePage === null ? (
            <motion.div key="home" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}><MobileHome onOpen={openPage} /></motion.div>
          ) : (
            <motion.main key={activePage} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} className="min-h-[calc(100svh-2.25rem)] px-4 pb-24 pt-3">
              <div className="sticky top-9 z-20 -mx-1 mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1022]/80 px-2 py-2 backdrop-blur-2xl">
                <button type="button" onClick={openHome} className="flex h-9 items-center gap-1 rounded-xl px-2 text-sm text-slate-200 hover:bg-white/10" aria-label="Back to home"><ArrowLeft className="h-4 w-4" /> Home</button>
                <span className="text-sm font-semibold text-white">{appMap[activePage].label}</span>
                <span className="w-[68px]" aria-hidden="true" />
              </div>
              <PageContent page={activePage} />
            </motion.main>
          )}
        </AnimatePresence>

        <nav aria-label="Mobile portfolio navigation" className="fixed inset-x-2 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-30 grid grid-cols-4 rounded-[1.25rem] border border-white/15 bg-[#171a35]/82 p-1.5 shadow-[0_16px_50px_rgba(2,6,23,0.6)] backdrop-blur-2xl">
          <button type="button" onClick={openHome} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9px] transition ${activePage === null ? "bg-violet-500/25 text-white" : "text-slate-400"}`}><Home className="h-4 w-4" /><span>Home</span></button>
          <button type="button" onClick={() => openPage("projects")} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9px] transition ${activePage === "projects" ? "bg-violet-500/25 text-white" : "text-slate-400"}`}><Folder className="h-4 w-4" /><span>Projects</span></button>
          <button type="button" onClick={() => openPage("about")} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9px] transition ${activePage === "about" ? "bg-violet-500/25 text-white" : "text-slate-400"}`}><UserRound className="h-4 w-4" /><span>About</span></button>
          <button type="button" onClick={() => openPage("contact")} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9px] transition ${activePage === "contact" ? "bg-violet-500/25 text-white" : "text-slate-400"}`}><Mail className="h-4 w-4" /><span>Contact</span></button>
        </nav>
      </div>
    </div>
  );
}

function TabletPortfolio() {
  const [activePage, setActivePage] = useState<PortfolioPage>("about");
  const [isWindowVisible, setIsWindowVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);
  const activeApp = appMap[activePage];
  const ActiveIcon = activeApp.Icon;
  const openPage = (page: PortfolioPage) => {
    setActivePage(page);
    setIsWindowVisible(true);
    setIsMenuOpen(false);
  };
  const hideWindow = () => {
    setIsWindowVisible(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative hidden min-h-svh overflow-hidden px-6 pb-24 pt-12 md:block lg:hidden">
      <header className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between border-b border-white/10 bg-[#11132f]/80 px-5 text-[11px] text-white backdrop-blur-xl">
        <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden="true" /><strong>Portfolio</strong></div>
        <div className="flex items-center gap-3"><span>Sun 30 Aug</span><span>10:30 AM</span><Wifi className="h-3.5 w-3.5" /><BatteryFull className="h-4 w-4" /></div>
      </header>

      {isMenuOpen ? <button type="button" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-20 cursor-default" aria-label="Close portfolio menu" /> : null}
      <div className="absolute right-5 top-12 z-30">
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className={`rounded-xl border p-2 text-white shadow-lg backdrop-blur-xl transition ${isMenuOpen ? "border-violet-300/40 bg-violet-500/25" : "border-white/10 bg-slate-950/30 hover:bg-white/10"}`}
          aria-label="Portfolio menu"
          aria-expanded={isMenuOpen}
          aria-controls="tablet-portfolio-menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              id="tablet-portfolio-menu"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020]/90 p-2 shadow-[0_24px_70px_rgba(2,6,23,0.6)] backdrop-blur-2xl"
            >
              <div className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">Open section</div>
              {apps.map((app) => {
                const Icon = app.Icon;
                return (
                  <button key={app.id} type="button" onClick={() => openPage(app.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${activePage === app.id && isWindowVisible ? "bg-violet-500/20 text-white" : "text-slate-200 hover:bg-white/8 hover:text-white"}`}>
                    <Icon className="h-4 w-4 text-violet-300" />
                    {app.label}
                  </button>
                );
              })}
              <div className="my-1 h-px bg-white/10" />
              <button type="button" onClick={hideWindow} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-amber-200 transition hover:bg-white/8">
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                Hide window
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <main className="relative z-10 mx-auto flex min-h-[calc(100svh-8.5rem)] max-w-3xl flex-col justify-center">
        <AnimatePresence mode="wait">
          {isWindowVisible ? (
            <motion.section
              key="tablet-window"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 80 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`overflow-y-auto rounded-[1.6rem] border border-white/15 bg-[#0c101c]/88 shadow-[0_30px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl [scrollbar-width:thin] ${isWindowMaximized ? "max-h-[72svh]" : "max-h-[58svh]"}`}
            >
              <div className="sticky top-0 z-10 grid h-11 grid-cols-[1fr_auto_1fr] items-center border-b border-white/8 bg-[#0c101c]/90 px-4 backdrop-blur-xl">
                <TrafficLights onClose={hideWindow} onMinimize={hideWindow} onMaximize={() => setIsWindowMaximized((current) => !current)} isMaximized={isWindowMaximized} />
                <div className="flex items-center gap-2 text-xs font-medium text-white"><ActiveIcon className="h-3.5 w-3.5 text-violet-300" />{activeApp.label}</div>
              </div>
              <div className="p-7"><PageContent page={activePage} tablet /></div>
            </motion.section>
          ) : (
            <motion.button
              key="restore-tablet-window"
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setIsWindowVisible(true)}
              className="mx-auto rounded-2xl border border-white/15 bg-slate-950/45 px-6 py-4 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl transition hover:bg-white/10"
            >
              Open Portfolio
            </motion.button>
          )}
        </AnimatePresence>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {(["projects", "skills"] as PortfolioPage[]).map((page) => {
            const item = appMap[page];
            const Icon = item.Icon;
            return (
              <button type="button" key={page} onClick={() => openPage(page)} className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-[#111522]/75 p-4 text-left shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}><Icon className="h-6 w-6 text-white" /></span>
                <span><strong className="block text-sm text-white">{item.label}</strong><span className="mt-1 block text-xs text-slate-400">{page === "projects" ? "Selected work and case studies" : "Technologies I work with"}</span></span>
                <ArrowRight className="ml-auto h-4 w-4 text-violet-300 transition group-hover:translate-x-1" />
              </button>
            );
          })}
        </div>
      </main>

      <nav aria-label="Tablet portfolio dock" className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-[1.5rem] border border-white/20 bg-white/10 p-2 shadow-[0_20px_60px_rgba(2,6,23,0.5)] backdrop-blur-2xl">
        {apps.map((app) => <AppIcon key={app.id} page={app.id} onOpen={openPage} compact selected={isWindowVisible && activePage === app.id} />)}
      </nav>
    </div>
  );
}

export function ResponsivePortfolio() {
  return (
    <div className="lg:hidden">
      <MobilePortfolio />
      <TabletPortfolio />
    </div>
  );
}
