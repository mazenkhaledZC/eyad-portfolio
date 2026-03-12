"use client";

import { useState, useEffect } from "react";

function AppleLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/apple-logo.png"
      alt="Apple"
      style={{ width: 14, height: 17, objectFit: "contain", flexShrink: 0, filter: "invert(1)" }}
    />
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 20 15" fill="none">
      <path d="M10 12.5 C10 12.5 10 12.5 10 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 9.5 C8.1 8.4 11.9 8.4 13 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M4.5 7 C6.5 5 13.5 5 15.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M2 4.5 C5 1.5 15 1.5 18 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}

function BatteryIcon({ level = 82 }: { level?: number }) {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
      <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="white" strokeOpacity="0.7" />
      <rect x="2" y="2" width={Math.round(17 * level / 100)} height="9" rx="2" fill="white" opacity="0.9" />
      <path d="M23 4.5 C24.2 4.5 24.2 8.5 23 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const LEFT_MENUS = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"];

export default function MenuBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const close = () => setActiveMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [activeMenu]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 28,
        display: "flex",
        alignItems: "center",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: 10, flex: 1 }}>
        {/* Apple logo */}
        <button
          onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === "apple" ? null : "apple"); }}
          style={{
            background: activeMenu === "apple" ? "rgba(255,255,255,0.15)" : "transparent",
            border: "none",
            borderRadius: 4,
            padding: "2px 8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: 22,
          }}
        >
          <AppleLogo />
        </button>

        {/* Menu items */}
        {LEFT_MENUS.map((menu, i) => (
          <button
            key={menu}
            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === menu ? null : menu); }}
            style={{
              background: activeMenu === menu ? "rgba(255,255,255,0.15)" : "transparent",
              border: "none",
              borderRadius: 4,
              padding: "2px 8px",
              cursor: "pointer",
              color: "white",
              fontSize: i === 0 ? 13 : 12,
              fontWeight: i === 0 ? 600 : 400,
              height: 22,
              letterSpacing: "0.1px",
              opacity: i === 0 ? 1 : 0.85,
              whiteSpace: "nowrap",
            }}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Right side - system tray */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingRight: 14,
          flexShrink: 0,
        }}
      >
        <BatteryIcon level={82} />
        <WifiIcon />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{date}</span>
          <span style={{ color: "white", fontSize: 12, fontWeight: 500 }}>{time}</span>
        </div>
      </div>
    </div>
  );
}
