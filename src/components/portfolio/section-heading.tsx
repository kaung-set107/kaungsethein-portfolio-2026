import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "right";
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  const alignment = align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <div className={cn("flex flex-col gap-3", alignment, className)}>
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
        {eyebrow}
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            {description}
          </p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
