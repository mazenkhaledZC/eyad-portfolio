"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus } from "lucide-react";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import PortfolioApp from "./apps/PortfolioApp";
import AnalyticsApp from "./apps/AnalyticsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";

type AppId = "about" | "experience" | "portfolio" | "analytics" | "skills" | "contact";

const APPS: { id: AppId; label: string; icon: string }[] = [
  { id: "about",      label: "About",      icon: "/icons/finder.png" },
  { id: "experience", label: "Experience", icon: "/icons/pages.png" },
  { id: "portfolio",  label: "Portfolio",  icon: "/icons/photos.png" },
  { id: "analytics",  label: "Analytics",  icon: "/icons/activity-monitor.png" },
  { id: "skills",     label: "Terminal",   icon: "/icons/terminal.png" },
  { id: "contact",    label: "Mail",       icon: "/icons/mail.png" },
];

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

// Apps open on first load (like macOS after restart)
const DEFAULT_OPEN: AppId[] = ["about", "portfolio"];

export default function MobileLayout() {
  const [openApps, setOpenApps]   = useState<AppId[]>(DEFAULT_OPEN);
  const [activeApp, setActiveApp] = useState<AppId>("about");

  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const activeLabel = APPS.find(a => a.id === activeApp)?.label ?? "";

  const handleDockTap = (id: AppId) => {
    if (openApps.includes(id)) {
      // Already open — bring to front (or keep active if already active)
      setActiveApp(id);
    } else {
      // Open fresh
      setOpenApps(prev => [...prev, id]);
      setActiveApp(id);
    }
  };

  const handleClose = (id: AppId) => {
    const remaining = openApps.filter(a => a !== id);
    setOpenApps(remaining);
    if (activeApp === id) {
      setActiveApp(remaining[remaining.length - 1] ?? ("" as AppId));
    }
  };

  const handleMinimize = () => {
    // "Minimize" on mobile = just hide the window (user sees desktop + dock)
    setActiveApp("" as AppId);
  };

  const MENU_H  = 28;  // px — macOS menu bar
  const DOCK_H  = 78;  // px — dock
  const WIN_TOP = MENU_H;
  const WIN_BOT = DOCK_H;

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>

      {/* ── WALLPAPER ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />

      {/* ── macOS MENU BAR ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: MENU_H, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 12px",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
      }}>
        {/* Left: Apple + active app name */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/icons/apple-logo.png" alt="Apple"
            style={{ width: 11, height: 14, objectFit: "contain", filter: "invert(1)", opacity: 0.9 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
            {activeApp ? activeLabel : "Finder"}
          </span>
        </div>

        {/* Right: wifi + battery + time */}
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

      {/* ── DESKTOP AREA (when no window is covering) ── */}
      {!activeApp && (
        <div style={{
          position: "fixed", top: MENU_H, bottom: DOCK_H, left: 0, right: 0,
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

      {/* ── FULL-SCREEN WINDOW ── */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            key={activeApp}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            style={{
              position: "fixed",
              top: WIN_TOP, bottom: WIN_BOT,
              left: 0, right: 0,
              zIndex: 200,
              display: "flex", flexDirection: "column",
              background: "rgba(18,18,22,0.95)",
              backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* Title bar */}
            <div style={{
              height: 44, flexShrink: 0,
              display: "flex", alignItems: "center", padding: "0 16px",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              userSelect: "none",
            }}>
              {/* Traffic lights */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Red — close */}
                <button
                  onClick={() => handleClose(activeApp)}
                  style={{
                    width: 13, height: 13, borderRadius: "50%",
                    background: "#ff5f57", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={7} color="#7a1a1a" />
                </button>
                {/* Yellow — minimize (hide window, back to desktop) */}
                <button
                  onClick={handleMinimize}
                  style={{
                    width: 13, height: 13, borderRadius: "50%",
                    background: "#febc2e", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Minus size={7} color="#7a5500" />
                </button>
                {/* Green — disabled on mobile (already full screen) */}
                <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#28c840", opacity: 0.4 }} />
              </div>

              {/* Title */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <img
                  src={APPS.find(a => a.id === activeApp)?.icon}
                  alt={activeLabel}
                  style={{ width: 18, height: 18, objectFit: "contain" }}
                />
                <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                  {activeLabel}
                </span>
              </div>

              {/* Open app switcher pills (other open apps) */}
              <div style={{ display: "flex", gap: 4 }}>
                {openApps.filter(id => id !== activeApp).map(id => (
                  <button
                    key={id}
                    onClick={() => setActiveApp(id)}
                    style={{
                      padding: "2px 8px", borderRadius: 10, border: "none",
                      background: "rgba(255,255,255,0.1)", cursor: "pointer",
                    }}
                  >
                    <img
                      src={APPS.find(a => a.id === id)?.icon}
                      alt={id}
                      style={{ width: 14, height: 14, objectFit: "contain" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflow: "auto", WebkitOverflowScrolling: "touch" }}>
              {renderApp(activeApp)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── macOS DOCK ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: DOCK_H, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 8px",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        borderTop: "0.5px solid rgba(255,255,255,0.15)",
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 6,
          padding: "8px 12px 10px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: 16,
          border: "0.5px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}>
          {APPS.map((app) => {
            const isOpen   = openApps.includes(app.id);
            const isActive = activeApp === app.id;

            return (
              <div key={app.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <motion.button
                  onClick={() => handleDockTap(app.id)}
                  whileTap={{ scale: 0.84, y: -2 }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                    filter: isActive
                      ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                  }}
                >
                  <img
                    src={app.icon}
                    alt={app.label}
                    style={{
                      width: 44, height: 44, objectFit: "contain",
                      opacity: isActive ? 1 : 0.9,
                    }}
                  />
                </motion.button>
                {/* Open indicator dot */}
                <div style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: isOpen ? "rgba(255,255,255,0.8)" : "transparent",
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
