"use client";

type ScrollIntoSectionOptions = {
  behavior?: ScrollBehavior;
};

export function findVisibleSectionTarget(selector: string) {
  const matches = Array.from(document.querySelectorAll(selector));

  return (
    matches.find((element) => element.getClientRects().length > 0) ??
    matches[0] ??
    null
  ) as HTMLElement | null;
}

export function scrollToSection(selector: string, options?: ScrollIntoSectionOptions) {
  const target = findVisibleSectionTarget(selector);

  if (!target) return false;

  target.scrollIntoView({
    behavior: options?.behavior ?? "smooth",
    block: "start",
  });

  return true;
}
