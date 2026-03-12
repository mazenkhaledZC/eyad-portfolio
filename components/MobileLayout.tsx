"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import PortfolioApp from "./apps/PortfolioApp";
import AnalyticsApp from "./apps/AnalyticsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";

type AppId = "about" | "experience" | "portfolio" | "analytics" | "skills" | "contact";

const TABS: { id: AppId; label: string; icon: string }[] = [
  { id: "about",      label: "About",      icon: "/icons/finder.png" },
  { id: "experience", label: "Experience", icon: "/icons/pages.png" },
  { id: "portfolio",  label: "Portfolio",  icon: "/icons/photos.png" },
  { id: "analytics",  label: "Analytics",  icon: "/icons/activity-monitor.png" },
  { id: "skills",     label: "Skills",     icon: "/icons/terminal.png" },
  { id: "contact",    label: "Contact",    icon: "/icons/mail.png" },
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

function MobileStatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 44, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 18px",
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "0.5px solid rgba(255,255,255,0.1)",
    }}>
      {/* Apple logo */}
      <img src="/icons/apple-logo.png" alt="Apple"
        style={{ width: 12, height: 15, objectFit: "contain", filter: "invert(1)", opacity: 0.9 }} />

      {/* Center name */}
      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.1px" }}>
        Eyad Ahmed
      </span>

      {/* Right: wifi + battery + time */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Wifi */}
        <svg width="14" height="10" viewBox="0 0 20 15" fill="none">
          <path d="M10 12.5C10 12.5 10 12.5 10 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M7 9.5C8.1 8.4 11.9 8.4 13 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8"/>
          <path d="M4.5 7C6.5 5 13.5 5 15.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M2 4.5C5 1.5 15 1.5 18 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4"/>
        </svg>
        {/* Battery */}
        <svg width="22" height="11" viewBox="0 0 25 13" fill="none">
          <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="white" strokeOpacity="0.7"/>
          <rect x="2" y="2" width="15" height="9" rx="2" fill="white" opacity="0.9"/>
          <path d="M23 4.5C24.2 4.5 24.2 8.5 23 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{time}</span>
      </div>
    </div>
  );
}

export default function MobileLayout() {
  const [activeApp, setActiveApp] = useState<AppId>("about");
  const [prev, setPrev] = useState<AppId>("about");

  const handleTabChange = (id: AppId) => {
    if (id === activeApp) return;
    setPrev(activeApp);
    setActiveApp(id);
  };

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {/* Wallpaper */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

      {/* Status bar */}
      <MobileStatusBar />

      {/* Content */}
      <div style={{
        position: "absolute",
        top: 44, bottom: 80, left: 0, right: 0,
        overflowY: "auto", overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp}
            initial={{ opacity: 0, x: TABS.findIndex(t => t.id === activeApp) > TABS.findIndex(t => t.id === prev) ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ minHeight: "100%", color: "#fff" }}
          >
            {renderApp(activeApp)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        height: 80,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        borderTop: "0.5px solid rgba(255,255,255,0.12)",
        display: "flex", alignItems: "flex-start",
        paddingTop: 8,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        {TABS.map((tab) => {
          const active = activeApp === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 3,
                background: "none", border: "none", cursor: "pointer",
                padding: "4px 0",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div style={{
                width: 32, height: 32,
                borderRadius: 8,
                background: active ? "rgba(255,255,255,0.15)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}>
                <img
                  src={tab.icon}
                  alt={tab.label}
                  style={{
                    width: 28, height: 28, objectFit: "contain",
                    opacity: active ? 1 : 0.55,
                    filter: active ? "drop-shadow(0 0 4px rgba(255,255,255,0.4))" : "none",
                    transition: "opacity 0.2s, filter 0.2s",
                    transform: active ? "scale(1.1)" : "scale(1)",
                  }}
                />
              </div>
              <span style={{
                fontSize: 10, fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.2px",
                transition: "color 0.2s",
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
