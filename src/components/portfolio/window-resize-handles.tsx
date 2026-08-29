"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

export type ResizeEdge = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw";

type WindowResizeHandlesProps = {
  onResizeStart: (edge: ResizeEdge, event: ReactPointerEvent<HTMLButtonElement>) => void;
};

const edgeHandles = [
  { edge: "n", label: "Resize from top", className: "-top-1 left-3 right-3 h-2 cursor-ns-resize" },
  { edge: "e", label: "Resize from right", className: "-right-1 bottom-3 top-3 w-2 cursor-ew-resize" },
  { edge: "s", label: "Resize from bottom", className: "-bottom-1 left-3 right-3 h-2 cursor-ns-resize" },
  { edge: "w", label: "Resize from left", className: "-left-1 bottom-3 top-3 w-2 cursor-ew-resize" },
] as const;

const cornerHandles = [
  { edge: "nw", label: "Resize from top left", className: "-left-1.5 -top-1.5 cursor-nwse-resize" },
  { edge: "ne", label: "Resize from top right", className: "-right-1.5 -top-1.5 cursor-nesw-resize" },
  { edge: "se", label: "Resize from bottom right", className: "-bottom-1.5 -right-1.5 cursor-nwse-resize" },
  { edge: "sw", label: "Resize from bottom left", className: "-bottom-1.5 -left-1.5 cursor-nesw-resize" },
] as const;

export function WindowResizeHandles({ onResizeStart }: WindowResizeHandlesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 hidden lg:block">
      {edgeHandles.map(({ edge, label, className }) => (
        <button
          type="button"
          key={edge}
          aria-label={label}
          title={label}
          onPointerDown={(event) => onResizeStart(edge, event)}
          className={`pointer-events-auto absolute touch-none bg-cyan-300/0 transition-colors hover:bg-cyan-300/45 ${className}`}
        />
      ))}
      {cornerHandles.map(({ edge, label, className }) => (
        <button
          type="button"
          key={edge}
          aria-label={label}
          title={label}
          onPointerDown={(event) => onResizeStart(edge, event)}
          className={`pointer-events-auto absolute h-4 w-4 touch-none rounded-sm border-cyan-200/0 transition-colors hover:border-cyan-200/70 ${className}`}
        />
      ))}
    </div>
  );
}
