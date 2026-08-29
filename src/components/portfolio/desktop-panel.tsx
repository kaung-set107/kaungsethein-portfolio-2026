"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import { FileCode2, FileText, Folder, GripHorizontal, Image as ImageIcon, MapPin, X } from "lucide-react";

import { portfolio } from "@/content/portfolio";

import type { ShortcutLabel } from "./desktop-shortcuts";

export type DesktopPanelId = ShortcutLabel | "Launchpad" | "Location" | "Calendar" | "Terminal" | "Trash";

const panelContent: Record<DesktopPanelId, { description: string; items: string[] }> = {
  Projects: {
    description: "Project experience from Kaung Set Hein's resume.",
    items: portfolio.featuredProjects.map((project) => project.title),
  },
  Education: {
    description: portfolio.education.degree,
    items: [portfolio.education.institution, portfolio.education.period, ...portfolio.languages],
  },
  "Resume.pdf": {
    description: "Kaung Set Hein - Resume",
    items: [portfolio.role, portfolio.location, portfolio.email, ...portfolio.phones],
  },
  Screenshots: {
    description: "Project interface collection.",
    items: ["POS-Finance-Dashboard.png", "Learning-Management.png", "E-Learning-Platform.png"],
  },
  Launchpad: {
    description: "Applications",
    items: ["Portfolio", "Projects", "Messages", "Settings"],
  },
  Location: {
    description: "Current location",
    items: [portfolio.location, "Current position: Origin Business Solution", "On-site"],
  },
  Calendar: {
    description: "Professional timeline",
    items: ["Origin Business Solution", "Mar 2026 - Present", "Yangon, Myanmar"],
  },
  Terminal: {
    description: "kaung@portfolio ~ %",
    items: ["whoami: Kaung Set Hein", `role: ${portfolio.role}`, "experience: 3+ years"],
  },
  Trash: {
    description: "Trash is empty.",
    items: ["No deleted portfolio projects"],
  },
};

type DesktopPanelProps = {
  panel: DesktopPanelId;
  constraintsRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export function DesktopPanel({ panel, constraintsRef, onClose }: DesktopPanelProps) {
  const content = panelContent[panel];
  const isTerminal = panel === "Terminal";

  return (
    <motion.section
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 12 }}
      className={`absolute inset-0 z-[65] m-auto h-fit w-[min(92vw,34rem)] touch-none cursor-grab select-none overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_55px_rgba(2,6,23,0.5)] transform-gpu will-change-transform active:cursor-grabbing ${isTerminal ? "bg-[#0a0d12]" : "bg-slate-900"}`}
      role="dialog"
      aria-label={panel}
    >
      <header
        className="relative flex h-11 items-center border-b border-white/10 bg-white/8 px-3"
      >
        <button
          type="button"
          aria-label={`Close ${panel}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
          className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57] text-red-950"
        >
          <X className="h-2.5 w-2.5" />
        </button>
        <div className="mx-auto pr-3 text-xs font-medium text-slate-200">{panel}</div>
        <GripHorizontal className="absolute left-1/2 top-7 h-3.5 w-3.5 -translate-x-1/2 text-white/25" aria-hidden="true" />
      </header>

      <div className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-sky-400/15 p-2.5 text-sky-300">
            {panel === "Location" ? <MapPin className="h-5 w-5" /> : panel === "Screenshots" ? <ImageIcon className="h-5 w-5" /> : panel === "Resume.pdf" ? <FileText className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
          </div>
          <p className={`text-sm ${isTerminal ? "font-mono text-emerald-300" : "text-slate-300"}`}>{content.description}</p>
        </div>
        <div className="space-y-2">
          {content.items.map((item) => (
            <div key={item} className={`flex items-center gap-3 rounded-xl border border-white/8 px-3 py-2.5 text-sm ${isTerminal ? "font-mono text-emerald-200" : "bg-white/5 text-slate-200"}`}>
              <FileCode2 className="h-4 w-4 shrink-0 text-sky-300" />
              {item}
            </div>
          ))}
        </div>
        {panel === "Resume.pdf" ? (
          <a
            href={portfolio.resumeHref}
            download
            onPointerDown={(event) => event.stopPropagation()}
            className="mt-5 inline-flex rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Download Resume PDF
          </a>
        ) : null}
      </div>
    </motion.section>
  );
}
