"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  CalendarDays,
  Code2,
  Compass,
  Grid3X3,
  Image,
  Mail,
  Map,
  MessageCircle,
  Settings,
  Terminal,
  Trash2,
} from "lucide-react";

const dockItems = [
  { id: "finder", label: "Finder", Icon: AppWindow, colors: "from-sky-300 to-blue-500" },
  { id: "launchpad", label: "Launchpad", Icon: Grid3X3, colors: "from-slate-100 to-slate-300 text-slate-700" },
  { id: "safari", label: "Safari", Icon: Compass, colors: "from-cyan-300 to-blue-600" },
  { id: "messages", label: "Messages", Icon: MessageCircle, colors: "from-emerald-300 to-green-500" },
  { id: "mail", label: "Mail", Icon: Mail, colors: "from-sky-300 to-blue-600" },
  { id: "maps", label: "Maps", Icon: Map, colors: "from-emerald-200 to-sky-400" },
  { id: "photos", label: "Photos", Icon: Image, colors: "from-amber-200 via-rose-300 to-fuchsia-500" },
  { id: "calendar", label: "Calendar", Icon: CalendarDays, colors: "from-white to-slate-200 text-rose-500" },
  { id: "app-store", label: "App Store", Icon: AppWindow, colors: "from-sky-400 to-blue-600" },
  { id: "settings", label: "Settings", Icon: Settings, colors: "from-slate-300 to-slate-600" },
  { id: "vscode", label: "VS Code", Icon: Code2, colors: "from-sky-400 to-blue-700" },
  { id: "terminal", label: "Terminal", Icon: Terminal, colors: "from-slate-600 to-slate-950" },
] as const;

export type DockAppId = (typeof dockItems)[number]["id"] | "trash";

type MacOSDockProps = {
  constraintsRef: RefObject<HTMLDivElement | null>;
  isPortfolioOpen: boolean;
  onLaunch: (appId: DockAppId) => void;
};

export function MacOSDock({ constraintsRef, isPortfolioOpen, onLaunch }: MacOSDockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="macOS Dock"
      className="absolute bottom-2 left-1/2 z-50 hidden -translate-x-1/2 items-end gap-1 rounded-[1.4rem] border border-white/20 bg-slate-200/15 p-2 shadow-[0_18px_55px_rgba(2,6,23,0.45)] backdrop-blur-2xl lg:flex"
    >
      {dockItems.map(({ id, label, Icon, colors }) => (
        <motion.button
          type="button"
          key={label}
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          dragElastic={0}
          onTap={() => onLaunch(id)}
          aria-label={label}
          title={label}
          whileHover={reduceMotion ? undefined : { y: -10, scale: 1.18 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          whileDrag={{ zIndex: 60 }}
          className={`relative flex h-10 w-10 cursor-grab items-center justify-center rounded-[0.7rem] border border-white/30 bg-gradient-to-br ${colors} text-white shadow-[0_6px_14px_rgba(2,6,23,0.35)] touch-none select-none active:cursor-grabbing xl:h-11 xl:w-11`}
        >
          <Icon className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={1.8} />
          {id === "safari" && isPortfolioOpen ? (
            <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-white/90" />
          ) : null}
        </motion.button>
      ))}
      <span className="mx-1 h-9 w-px bg-white/25" />
      <motion.button
        type="button"
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        onTap={() => onLaunch("trash")}
        aria-label="Trash"
        title="Trash"
        whileHover={reduceMotion ? undefined : { y: -10, scale: 1.18 }}
        whileDrag={{ zIndex: 60 }}
        className="flex h-10 w-10 cursor-grab items-center justify-center rounded-[0.7rem] border border-white/35 bg-gradient-to-br from-slate-100 to-slate-400 text-slate-700 shadow-[0_6px_14px_rgba(2,6,23,0.35)] touch-none select-none active:cursor-grabbing xl:h-11 xl:w-11"
      >
        <Trash2 className="h-5 w-5 xl:h-6 xl:w-6" />
      </motion.button>
    </nav>
  );
}
