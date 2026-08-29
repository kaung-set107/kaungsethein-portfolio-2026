"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  LockKeyhole,
  PanelLeft,
  Plus,
  RotateCw,
  Share,
} from "lucide-react";

type BrowserChromeProps = {
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onToggleSidebar: () => void;
  onDragStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

export function BrowserChrome({
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onToggleSidebar,
  onDragStart,
}: BrowserChromeProps) {
  const copyAddress = () => navigator.clipboard?.writeText(window.location.href);
  const sharePage = async () => {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
      return;
    }
    await copyAddress();
  };

  return (
    <div
      className="flex h-12 shrink-0 touch-none select-none cursor-default items-center gap-3 border-b border-white/8 bg-[#0b0c16]/95 px-3 text-slate-400 sm:gap-5 sm:px-4 lg:cursor-grab lg:active:cursor-grabbing"
      onPointerDown={onDragStart}
      onDoubleClick={onMaximize}
    >
      <div className="group flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Close portfolio window"
          title="Close"
          onPointerDown={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onClick={onClose}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] font-bold leading-none text-red-950 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
        >
          <span className="opacity-0 group-hover:opacity-70">x</span>
        </button>
        <button
          type="button"
          aria-label="Minimize portfolio window"
          title="Minimize"
          onPointerDown={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onClick={onMinimize}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-bold leading-none text-amber-950 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
        >
          <span className="opacity-0 group-hover:opacity-70">-</span>
        </button>
        <button
          type="button"
          aria-label={isMaximized ? "Restore portfolio window" : "Maximize portfolio window"}
          title={isMaximized ? "Restore" : "Maximize"}
          onPointerDown={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onClick={onMaximize}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[7px] font-bold leading-none text-green-950 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
        >
          <span className="opacity-0 group-hover:opacity-70">+</span>
        </button>
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        <button type="button" aria-label="Toggle sidebar" title="Sidebar" onPointerDown={(event) => event.stopPropagation()} onClick={onToggleSidebar}>
          <PanelLeft className="h-4 w-4" />
        </button>
        <span className="h-5 w-px bg-white/10" />
        <button type="button" aria-label="Go back" title="Back" onPointerDown={(event) => event.stopPropagation()} onClick={() => window.history.back()}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Go forward" title="Forward" onPointerDown={(event) => event.stopPropagation()} onClick={() => window.history.forward()}>
          <ChevronRight className="h-4 w-4 text-slate-600" />
        </button>
      </div>

      <div className="mx-auto flex h-8 max-w-[34rem] flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.04] bg-[#151827] px-3 text-[11px] text-slate-300 shadow-inner sm:text-xs">
        <LockKeyhole className="h-3 w-3 text-slate-400" />
        <button type="button" title="Copy page address" onPointerDown={(event) => event.stopPropagation()} onClick={copyAddress} className="truncate">
          Kaung Set Hein - Portfolio
        </button>
        <button type="button" aria-label="Reload portfolio" title="Reload" onPointerDown={(event) => event.stopPropagation()} onClick={() => window.location.reload()} className="ml-auto hidden sm:block">
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="hidden shrink-0 items-center gap-4 sm:flex">
        <button type="button" aria-label="Share portfolio" title="Share" onPointerDown={(event) => event.stopPropagation()} onClick={sharePage}>
          <Share className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Open a new tab" title="New tab" onPointerDown={(event) => event.stopPropagation()} onClick={() => window.open(window.location.href, "_blank", "noopener,noreferrer")}>
          <Plus className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Copy portfolio address" title="Copy address" onPointerDown={(event) => event.stopPropagation()} onClick={copyAddress}>
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
