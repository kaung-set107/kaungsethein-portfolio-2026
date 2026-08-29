"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { scrollToSection } from "./scroll-to-section";

type SectionLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function SectionLink({ href, children, onClick, ...props }: SectionLinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || !href.startsWith("#")) return;

        event.preventDefault();
        window.history.replaceState(null, "", href);
        scrollToSection(href);
      }}
    >
      {children}
    </a>
  );
}
