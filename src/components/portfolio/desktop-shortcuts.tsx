"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Folder } from "lucide-react";

export const shortcuts = [
  { label: "Projects", type: "folder" },
  { label: "Education", type: "folder" },
  { label: "Resume.pdf", type: "file" },
  { label: "Screenshots", type: "folder" },
] as const;

export type ShortcutLabel = (typeof shortcuts)[number]["label"];

type DesktopShortcutsProps = {
  onOpen: (shortcut: ShortcutLabel) => void;
};

export function DesktopShortcuts({ onOpen }: DesktopShortcutsProps) {
  const reduceMotion = useReducedMotion();
  const suppressNextClickRef = useRef(false);

  return (
    <aside
      aria-label="Desktop shortcuts"
      className="absolute left-5 top-14 z-50 hidden w-20 flex-col gap-6 xl:flex"
    >
      {shortcuts.map((shortcut) => (
        <motion.button
          type="button"
          key={shortcut.label}
          drag
          dragMomentum={false}
          whileDrag={{ scale: 1.07, zIndex: 60 }}
          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onDragStart={() => {
            suppressNextClickRef.current = true;
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              suppressNextClickRef.current = false;
            }, 0);
          }}
          onClick={(event) => {
            if (suppressNextClickRef.current || event.detail > 1) return;
            onOpen(shortcut.label);
          }}
          title={`Click to open, drag to move ${shortcut.label}`}
          className="group flex touch-none cursor-grab flex-col items-center gap-1.5 text-center select-none active:cursor-grabbing focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <div
            className={
              shortcut.type === "folder"
                ? "relative flex h-11 w-14 items-center justify-center rounded-lg border border-cyan-100/25 bg-gradient-to-b from-cyan-300 to-sky-500 text-sky-950 shadow-[0_8px_20px_rgba(8,47,73,0.35)] before:absolute before:-top-1 before:left-1 before:h-2 before:w-6 before:rounded-t-md before:bg-cyan-300"
                : "flex h-12 w-10 items-center justify-center rounded-md border border-white/70 bg-white text-rose-500 shadow-[0_8px_20px_rgba(15,23,42,0.35)]"
            }
          >
            {shortcut.type === "folder" ? (
              <Folder className="h-7 w-7 fill-white/15" />
            ) : (
              <FileText className="h-6 w-6" />
            )}
          </div>
          <span className="max-w-20 text-[11px] leading-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
            {shortcut.label}
          </span>
        </motion.button>
      ))}
    </aside>
  );
}
