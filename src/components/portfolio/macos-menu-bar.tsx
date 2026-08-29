"use client";

import { useState } from "react";
import { Apple, BatteryFull, Search, SlidersHorizontal, Wifi } from "lucide-react";

const menus = {
  Finder: ["About This Portfolio", "Open Projects", "Open Education"],
  File: ["Open Portfolio", "Sleep Mode", "Close Window"],
  Edit: ["Copy Portfolio URL"],
  Go: ["About Me", "Projects", "Contact"],
  Window: ["Bring All to Front", "Minimize Window"],
  Help: ["Portfolio Help"],
} as const;

type StaticMenuAction = (typeof menus)[keyof typeof menus][number];
export type MenuAction = StaticMenuAction | "Enter Full Screen" | "Exit Full Screen";
const menuOrder = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"] as const;
type MenuName = (typeof menuOrder)[number];

type MacOSMenuBarProps = {
  isMaximized: boolean;
  onAction: (action: MenuAction) => void;
};

export function MacOSMenuBar({ isMaximized, onAction }: MacOSMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const viewMenuItems = isMaximized ? (["Exit Full Screen", "Minimize Window"] as const) : (["Enter Full Screen", "Minimize Window"] as const);

  const selectAction = (action: MenuAction) => {
    onAction(action);
    setActiveMenu(null);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-[70] flex h-8 items-center justify-between border-b border-white/10 bg-[#11132f]/85 px-3 text-[11px] text-white shadow-sm backdrop-blur-xl sm:px-5 sm:text-xs">
      <div className="flex items-center gap-4">
        <button type="button" aria-label="Apple menu" onClick={() => setActiveMenu(activeMenu === "Finder" ? null : "Finder")}>
          <Apple className="h-3.5 w-3.5 fill-current" />
        </button>
        <nav aria-label="macOS menu" className="flex items-center gap-4">
          {menuOrder.map((item, index) => (
            <div
              key={item}
              className={`relative ${index > 1 ? "hidden sm:block" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                className={index === 0 ? "font-semibold" : undefined}
              >
                {item}
              </button>
              {activeMenu === item ? (
                <div className="absolute left-0 top-6 min-w-48 rounded-xl border border-white/20 bg-slate-900/88 p-1.5 shadow-[0_18px_60px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
                  {(item === "View" ? viewMenuItems : menus[item as keyof typeof menus]).map((action) => (
                    <button
                      type="button"
                      key={action}
                      onClick={() => selectAction(action)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-100 hover:bg-blue-500/80"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Search className="hidden h-3.5 w-3.5 sm:block" />
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-4 w-4" />
        <SlidersHorizontal className="hidden h-3.5 w-3.5 sm:block" />
        <time dateTime="2026-05-25T10:30:00">Sun 25 May&nbsp;&nbsp;10:30 AM</time>
      </div>
    </header>
  );
}
