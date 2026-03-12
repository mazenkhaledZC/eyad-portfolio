"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import MenuBar from "./MenuBar";
import Dock, { AppId, DockApp } from "./Dock";
import Window from "./Window";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import PortfolioApp from "./apps/PortfolioApp";
import AnalyticsApp from "./apps/AnalyticsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";

const BootScreen = dynamic(() => import("./BootScreen"), { ssr: false });

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const initialApps: DockApp[] = [
  { id: "about", label: "About", isOpen: false, isMinimized: false },
  { id: "experience", label: "Experience", isOpen: false, isMinimized: false },
  { id: "portfolio", label: "Portfolio", isOpen: false, isMinimized: false },
  { id: "analytics", label: "Analytics", isOpen: false, isMinimized: false },
  { id: "skills", label: "Skills", isOpen: false, isMinimized: false },
  { id: "contact", label: "Contact", isOpen: false, isMinimized: false },
];

const windowConfig: Record<AppId, {
  title: string;
  icon: string;
  width: number;
  height: number;
  x: number;
  y: number;
}> = {
  about:      { title: "About Eyad", icon: "👤", width: 520, height: 520, x: 55,  y: 45 },
  experience: { title: "Work Experience", icon: "💼", width: 660, height: 580, x: 150, y: 55 },
  portfolio:  { title: "Portfolio", icon: "📱", width: 980, height: 700, x: 80,  y: 40 },
  analytics:  { title: "Analytics", icon: "📊", width: 700, height: 620, x: 140, y: 48 },
  skills:     { title: "Terminal — Skills", icon: "⚡", width: 580, height: 480, x: 200, y: 70 },
  contact:    { title: "Contact", icon: "✉️", width: 460, height: 490, x: 240, y: 80 },
};

// Apps that start open (shown after boot)
const DEFAULT_OPEN: AppId[] = ["about", "portfolio"];

let zCounter = 10;

export default function Desktop() {
  const [booted, setBooted] = useState(false);

  const [windows, setWindows] = useState<WindowState[]>(
    initialApps.map((app, i) => ({
      id: app.id,
      isOpen: DEFAULT_OPEN.includes(app.id),
      isMinimized: false,
      zIndex: DEFAULT_OPEN.includes(app.id) ? zCounter + i : zCounter++,
    }))
  );

  const [apps, setApps] = useState<DockApp[]>(
    initialApps.map((a) => ({
      ...a,
      isOpen: DEFAULT_OPEN.includes(a.id),
    }))
  );

  // Stagger the default-open windows' z-indices so about is on top
  useEffect(() => {
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        zIndex: DEFAULT_OPEN.includes(w.id)
          ? 10 + DEFAULT_OPEN.indexOf(w.id)
          : 5,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAppClick = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const win = prev.find((w) => w.id === id)!;
        if (!win.isOpen) {
          return prev.map((w) =>
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: ++zCounter }
              : w
          );
        }
        if (win.isMinimized) {
          return prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: ++zCounter }
              : w
          );
        }
        // If already on top, minimize; otherwise focus
        const maxZ = Math.max(...prev.map((w) => w.zIndex));
        if (win.zIndex === maxZ) {
          return prev.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
          );
        }
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: ++zCounter } : w
        );
      });
      setApps((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;
          const win = windows.find((w) => w.id === id)!;
          if (!win.isOpen) return { ...a, isOpen: true, isMinimized: false };
          if (win.isMinimized) return { ...a, isMinimized: false };
          return a;
        })
      );
    },
    [windows]
  );

  const handleClose = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isOpen: false, isMinimized: false } : a))
    );
  }, []);

  const handleMinimize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isMinimized: true } : a))
    );
  }, []);

  const handleFocus = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w))
    );
  }, []);

  const renderApp = (id: AppId) => {
    switch (id) {
      case "about":      return <AboutApp />;
      case "experience": return <ExperienceApp />;
      case "portfolio":  return <PortfolioApp />;
      case "analytics":  return <AnalyticsApp />;
      case "skills":     return <SkillsApp />;
      case "contact":    return <ContactApp />;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Wallpaper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/wallpaper.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Subtle dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
        }}
      />

      {/* Menu bar */}
      <MenuBar />

      {/* Windows */}
      {windows.map((win) => {
        const cfg = windowConfig[win.id];
        return (
          <Window
            key={win.id}
            id={win.id}
            title={cfg.title}
            icon={cfg.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            zIndex={win.zIndex}
            defaultWidth={cfg.width}
            defaultHeight={cfg.height}
            defaultX={cfg.x}
            defaultY={cfg.y + 28}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onFocus={handleFocus}
          >
            {renderApp(win.id)}
          </Window>
        );
      })}

      {/* Dock */}
      <Dock apps={apps} onAppClick={handleAppClick} />

      {/* Boot screen — renders on top, fades away */}
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
    </div>
  );
}
