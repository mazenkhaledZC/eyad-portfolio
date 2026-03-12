"use client";

import { useState, useCallback, useEffect } from "react";
import Window from "./Window";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import PortfolioApp from "./apps/PortfolioApp";
import AnalyticsApp from "./apps/AnalyticsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";

type AppId = "about" | "experience" | "portfolio" | "analytics" | "skills" | "contact";

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const APPS: { id: AppId; label: string; icon: string; title: string }[] = [
  { id: "about",      label: "About",      icon: "/icons/finder.png",           title: "About Eyad" },
  { id: "experience", label: "Experience", icon: "/icons/pages.png",            title: "Work Experience" },
  { id: "portfolio",  label: "Portfolio",  icon: "/icons/photos.png",           title: "Portfolio" },
  { id: "analytics",  label: "Analytics",  icon: "/icons/activity-monitor.png", title: "Analytics" },
  { id: "skills",     label: "Terminal",   icon: "/icons/terminal.png",         title: "Terminal — Skills" },
  { id: "contact",    label: "Mail",       icon: "/icons/mail.png",             title: "Contact" },
];

const WIN_ICONS: Record<AppId, string> = {
  about: "👤", experience: "💼", portfolio: "📱",
  analytics: "📊", skills: "⚡", contact: "✉️",
};

// Staggered starting positions so windows don't perfectly overlap
const WIN_DEFAULTS: Record<AppId, { x: number; y: number; width: number; height: number }> = {
  about:      { x: 16, y: 48,  width: 330, height: 460 },
  experience: { x: 28, y: 58,  width: 330, height: 460 },
  portfolio:  { x: 20, y: 52,  width: 340, height: 480 },
  analytics:  { x: 24, y: 56,  width: 330, height: 460 },
  skills:     { x: 22, y: 54,  width: 330, height: 440 },
  contact:    { x: 30, y: 60,  width: 320, height: 420 },
};

const DEFAULT_OPEN: AppId[] = ["about", "portfolio"];
let zCounter = 10;

function renderApp(id: AppId) {
  switch (id) {
    case "about":      return <AboutApp />;
    case "experience": return <ExperienceApp />;
    case "portfolio":  return <PortfolioApp />;
    case "analytics":  return <AnalyticsApp />;
    case "skills":     return <SkillsApp />;
    case "contact":    return <ContactApp />;
  }
}

export default function MobileLayout() {
  const [windows, setWindows] = useState<WindowState[]>(
    APPS.map((app, i) => ({
      id: app.id,
      isOpen: DEFAULT_OPEN.includes(app.id),
      isMinimized: false,
      zIndex: DEFAULT_OPEN.includes(app.id) ? 10 + DEFAULT_OPEN.indexOf(app.id) : 5,
    }))
  );

  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleAppClick = useCallback((id: AppId) => {
    setWindows((prev) => {
      const win = prev.find((w) => w.id === id)!;
      if (!win.isOpen) {
        return prev.map((w) =>
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: ++zCounter } : w
        );
      }
      if (win.isMinimized) {
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: ++zCounter } : w
        );
      }
      const maxZ = Math.max(...prev.map((w) => w.zIndex));
      if (win.zIndex === maxZ) {
        return prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w));
      }
      return prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w));
    });
  }, []);

  const handleClose = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
  }, []);

  const handleMinimize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const handleFocus = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w))
    );
  }, []);

  const MENU_H = 28;

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {/* Wallpaper */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />

      {/* macOS menu bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: MENU_H, zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 12px",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/icons/apple-logo.png" alt="Apple"
            style={{ width: 11, height: 14, objectFit: "contain", filter: "invert(1)", opacity: 0.9 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Finder</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Wifi */}
          <svg width="13" height="10" viewBox="0 0 20 15" fill="none">
            <path d="M10 12.5C10 12.5 10 12.5 10 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M7 9.5C8.1 8.4 11.9 8.4 13 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8"/>
            <path d="M4.5 7C6.5 5 13.5 5 15.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6"/>
            <path d="M2 4.5C5 1.5 15 1.5 18 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4"/>
          </svg>
          {/* Battery */}
          <svg width="20" height="10" viewBox="0 0 25 13" fill="none">
            <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="white" strokeOpacity="0.7"/>
            <rect x="2" y="2" width="15" height="9" rx="2" fill="white" opacity="0.9"/>
            <path d="M23 4.5C24.2 4.5 24.2 8.5 23 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#fff" }}>{time}</span>
        </div>
      </div>

      {/* Desktop hint when no windows are open */}
      {windows.every(w => !w.isOpen || w.isMinimized) && (
        <div style={{
          position: "fixed", top: MENU_H, bottom: 90, left: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 1, pointerEvents: "none",
        }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>
            Portfolio
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-1px", textAlign: "center", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
            Eyad Ahmed
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
            Tap an icon to explore
          </p>
        </div>
      )}

      {/* Windows — rendered with the shared Window component */}
      {windows.map((win) => {
        const app = APPS.find((a) => a.id === win.id)!;
        const cfg = WIN_DEFAULTS[win.id];
        return (
          <Window
            key={win.id}
            id={win.id}
            title={app.title}
            icon={WIN_ICONS[win.id]}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            zIndex={win.zIndex}
            defaultWidth={cfg.width}
            defaultHeight={cfg.height}
            defaultX={cfg.x}
            defaultY={cfg.y + MENU_H}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onFocus={handleFocus}
          >
            {renderApp(win.id)}
          </Window>
        );
      })}

      {/* Floating dock pill — no background stripe, just the pill */}
      <div style={{
        position: "fixed", bottom: 10, left: 0, right: 0,
        zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 4,
          padding: "8px 10px 10px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
          borderRadius: 20,
          border: "0.5px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          pointerEvents: "auto",
        }}>
          {APPS.map((app) => {
            const win = windows.find((w) => w.id === app.id)!;
            const isOpen   = win.isOpen && !win.isMinimized;
            const isActive = win.isOpen;

            return (
              <div key={app.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <button
                  onClick={() => handleAppClick(app.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(255,255,255,0.5))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                    transform: "translateY(0)",
                    transition: "transform 0.15s",
                  }}
                  onPointerDown={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.84) translateY(-2px)";
                  }}
                  onPointerUp={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  onPointerLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  <img
                    src={app.icon}
                    alt={app.label}
                    style={{ width: 42, height: 42, objectFit: "contain", opacity: isActive ? 1 : 0.88 }}
                  />
                </button>
                {/* Open indicator dot */}
                <div style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: isOpen ? "rgba(255,255,255,0.85)" : "transparent",
                  transition: "background 0.2s",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
