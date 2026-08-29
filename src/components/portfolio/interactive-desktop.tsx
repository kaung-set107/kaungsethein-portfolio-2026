"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { BrowserChrome } from "./browser-chrome";
import { DesktopPanel, type DesktopPanelId } from "./desktop-panel";
import { DesktopShortcuts, type ShortcutLabel } from "./desktop-shortcuts";
import { MacOSDock, type DockAppId } from "./macos-dock";
import { MacOSMenuBar, type MenuAction } from "./macos-menu-bar";
import { scrollToSection } from "./scroll-to-section";
import { WindowResizeHandles, type ResizeEdge } from "./window-resize-handles";

type WindowState = "open" | "minimized" | "closed";

type InteractiveDesktopProps = {
  children: ReactNode;
};

const LOCK_STATE_STORAGE_KEY = "portfolio-lock-state";

export function InteractiveDesktop({ children }: InteractiveDesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const portfolioWindowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const windowX = useMotionValue(0);
  const windowY = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [isLocked, setIsLocked] = useState(true);
  const [hasLoadedLockState, setHasLoadedLockState] = useState(false);
  const [windowState, setWindowState] = useState<WindowState>("open");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activePanel, setActivePanel] = useState<DesktopPanelId | null>(null);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const storedLockState = window.localStorage.getItem(LOCK_STATE_STORAGE_KEY);
      setIsLocked(storedLockState !== "unlocked");
      setHasLoadedLockState(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedLockState) return;
    window.localStorage.setItem(LOCK_STATE_STORAGE_KEY, isLocked ? "locked" : "unlocked");
  }, [hasLoadedLockState, isLocked]);

  useEffect(() => {
    if (windowState !== "open" || !pendingSection) return;

    const timer = window.setTimeout(() => {
      scrollToSection(pendingSection, { behavior: reduceMotion ? "auto" : "smooth" });
      setPendingSection(null);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pendingSection, reduceMotion, windowState]);

  const showPortfolio = (section?: string) => {
    setWindowState("open");
    if (section) setPendingSection(section);
  };

  const openPanel = (panel: DesktopPanelId) => setActivePanel(panel);

  const launchDockApp = (appId: DockAppId) => {
    const actions: Record<DockAppId, () => void> = {
      finder: () => openPanel("Projects"),
      launchpad: () => openPanel("Launchpad"),
      safari: () => showPortfolio(),
      messages: () => showPortfolio("#contact"),
      mail: () => showPortfolio("#contact"),
      maps: () => openPanel("Location"),
      photos: () => openPanel("Screenshots"),
      calendar: () => openPanel("Calendar"),
      "app-store": () => showPortfolio("#skills"),
      settings: () => showPortfolio("#about"),
      vscode: () => showPortfolio("#projects"),
      terminal: () => openPanel("Terminal"),
      trash: () => openPanel("Trash"),
    };

    actions[appId]();
  };

  const runMenuAction = (action: MenuAction) => {
    if (action === "Close Window") return setWindowState("closed");
    if (action === "Minimize Window") return setWindowState("minimized");
    if (action === "Sleep Mode") {
      setActivePanel(null);
      setWindowState("open");
      return setIsLocked(true);
    }
    if (action === "Enter Full Screen") {
      setWindowState("open");
      return setIsMaximized(true);
    }
    if (action === "Exit Full Screen") {
      setWindowState("open");
      return setIsMaximized(false);
    }
    if (action === "Copy Portfolio URL") {
      navigator.clipboard?.writeText(window.location.href);
      return;
    }
    if (action === "Open Projects") return openPanel("Projects");
    if (action === "Open Education") return openPanel("Education");
    if (action === "About Me" || action === "About This Portfolio") return showPortfolio("#about");
    if (action === "Projects") return showPortfolio("#projects");
    if (action === "Contact") return showPortfolio("#contact");
    if (action === "Portfolio Help") return openPanel("Launchpad");
    showPortfolio();
  };

  const handleShortcutOpen = (shortcut: ShortcutLabel) => openPanel(shortcut);
  const unlockDesktop = () => setIsLocked(false);

  const startWindowResize = (edge: ResizeEdge, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (isMaximized || !portfolioWindowRef.current || !desktopRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    const windowRect = portfolioWindowRef.current.getBoundingClientRect();
    const desktopRect = desktopRef.current.getBoundingClientRect();
    const start = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      width: windowRect.width,
      height: windowRect.height,
      x: windowX.get(),
      y: windowY.get(),
    };
    const minWidth = Math.min(640, desktopRect.width - 24);
    const minHeight = Math.min(420, desktopRect.height - 48);
    const maxWidth = desktopRect.width - 24;
    const maxHeight = desktopRect.height - 48;

    const clamp = (value: number, minimum: number, maximum: number) =>
      Math.min(Math.max(value, minimum), maximum);

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const deltaX = pointerEvent.clientX - start.pointerX;
      const deltaY = pointerEvent.clientY - start.pointerY;
      let width = start.width;
      let height = start.height;
      let x = start.x;
      let y = start.y;

      if (edge.includes("e")) {
        width = clamp(start.width + deltaX, minWidth, maxWidth);
        x = start.x + (width - start.width) / 2;
      }
      if (edge.includes("w")) {
        width = clamp(start.width - deltaX, minWidth, maxWidth);
        x = start.x + (start.width - width) / 2;
      }
      if (edge.includes("s")) {
        height = clamp(start.height + deltaY, minHeight, maxHeight);
      }
      if (edge.includes("n")) {
        height = clamp(start.height - deltaY, minHeight, maxHeight);
        y = start.y + (start.height - height);
      }

      windowX.set(x);
      windowY.set(y);
      setWindowSize({ width, height });
    };

    const stopResize = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  };

  return (
    <div ref={desktopRef} className="macos-desktop relative min-h-svh overflow-x-hidden text-white lg:h-svh lg:overflow-hidden">
      <AnimatePresence>
        {hasLoadedLockState && isLocked ? (
          <motion.div
            key="lock-screen"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#02050d]"
          >
            <Image
              src="/maclock.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,13,0.3),rgba(2,5,13,0.62)_65%,rgba(2,5,13,0.84))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.06),transparent_36%),radial-gradient(circle_at_50%_18%,rgba(103,232,249,0.15),transparent_28%)]" />
            <button
              type="button"
              aria-label="Unlock portfolio"
              onClick={unlockDesktop}
              className="relative flex flex-col items-center gap-4 rounded-[2rem] border border-white/15 bg-slate-950/30 px-8 py-10 text-center text-white shadow-[0_30px_120px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition hover:bg-slate-950/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="h-6 w-6 rounded-full border-2 border-white/80" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-slate-300/80">Locked</div>
                <div className="mt-2 text-2xl font-semibold">Click to unlock</div>
                <div className="mt-2 text-sm text-slate-300">Open the portfolio</div>
              </div>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {hasLoadedLockState && !isLocked ? (
        <>
          <div className="lg:hidden relative min-h-svh overflow-x-hidden text-white">
            <div className="macos-desktop__ridge" aria-hidden="true" />
            <div className="relative min-h-svh">
              {children}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="macos-desktop__ridge" aria-hidden="true" />
            <MacOSMenuBar isMaximized={isMaximized} onAction={runMenuAction} />
            <DesktopShortcuts onOpen={handleShortcutOpen} />

            <main className="pointer-events-none relative z-[60] flex min-h-svh w-full justify-center px-2 pb-3 pt-11 sm:px-4 lg:h-svh lg:min-h-0 lg:items-start lg:px-6 lg:pb-20 lg:pt-14 xl:px-0">
              <AnimatePresence>
                {windowState === "open" ? (
                  <motion.div
                    ref={portfolioWindowRef}
                    key={isMaximized ? "maximized" : "normal"}
                    drag={!isMaximized}
                    dragListener={false}
                    dragControls={dragControls}
                    dragConstraints={desktopRef}
                    dragMomentum={false}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.82, y: 70 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.72, y: "40vh" }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    style={{
                      x: isMaximized ? 0 : windowX,
                      y: isMaximized ? 0 : windowY,
                      width: isMaximized ? undefined : windowSize?.width,
                      height: isMaximized ? undefined : windowSize?.height,
                    }}
                    className={
                      isMaximized
                        ? "pointer-events-auto fixed inset-x-2 bottom-2 top-9 z-[60] flex transform-gpu will-change-transform flex-col overflow-hidden rounded-xl border border-white/15 bg-[#050916] shadow-[0_24px_70px_rgba(1,4,18,0.55)]"
                        : "pointer-events-auto flex w-full max-w-[1500px] transform-gpu will-change-transform flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#050916] shadow-[0_24px_70px_rgba(1,4,18,0.55),0_0_0_1px_rgba(0,0,0,0.45)] lg:h-[calc(100svh-8.25rem)] lg:min-h-[34rem] lg:w-[92vw] xl:w-[84vw]"
                    }
                  >
                    <BrowserChrome
                      isMaximized={isMaximized}
                      onClose={() => setWindowState("closed")}
                      onMinimize={() => setWindowState("minimized")}
                      onMaximize={() => setIsMaximized((current) => !current)}
                      onToggleSidebar={() => setIsSidebarVisible((current) => !current)}
                      onDragStart={(event) => {
                        if (!isMaximized) dragControls.start(event);
                      }}
                    />
                    <div data-sidebar-visible={isSidebarVisible} className="pointer-events-auto contents">
                      {children}
                    </div>
                    {!isMaximized ? <WindowResizeHandles onResizeStart={startWindowResize} /> : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </main>

            <AnimatePresence>
              {windowState !== "open" ? (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  onClick={() => showPortfolio()}
                  className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/25 bg-slate-950/55 px-5 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl lg:hidden"
                >
                  Open Portfolio
                </motion.button>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {activePanel ? (
                <DesktopPanel
                  key={activePanel}
                  panel={activePanel}
                  constraintsRef={desktopRef}
                  onClose={() => setActivePanel(null)}
                />
              ) : null}
            </AnimatePresence>

            <MacOSDock constraintsRef={desktopRef} isPortfolioOpen={windowState === "open"} onLaunch={launchDockApp} />
          </div>
        </>
      ) : null}
    </div>
  );
}
