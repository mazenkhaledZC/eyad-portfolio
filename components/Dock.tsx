"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type AppId = "about" | "experience" | "portfolio" | "analytics" | "skills" | "contact";

export interface DockApp {
  id: AppId;
  label: string;
  isOpen: boolean;
  isMinimized: boolean;
}

interface DockProps {
  apps: DockApp[];
  onAppClick: (id: AppId) => void;
}

const ICON_MAP: Record<AppId, string> = {
  about:      "/icons/finder.png",
  experience: "/icons/pages.png",
  portfolio:  "/icons/photos.png",
  analytics:  "/icons/activity-monitor.png",
  skills:     "/icons/terminal.png",
  contact:    "/icons/mail.png",
};

const LABEL_MAP: Record<AppId, string> = {
  about:      "About",
  experience: "Experience",
  portfolio:  "Portfolio",
  analytics:  "Analytics",
  skills:     "Terminal",
  contact:    "Mail",
};

export default function Dock({ apps, onAppClick }: DockProps) {
  const [hovered, setHovered] = useState<AppId | null>(null);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 500,
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        padding: "8px 14px 10px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: 18,
        border: "0.5px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {apps.map((app) => {
        const isHovered = hovered === app.id;
        const iconSize = isHovered ? 62 : 50;

        return (
          <div
            key={app.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              position: "relative",
            }}
          >
            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(28,28,30,0.88)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(12px)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  pointerEvents: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {LABEL_MAP[app.id]}
              </motion.div>
            )}

            {/* Icon */}
            <motion.div
              animate={{ width: iconSize, height: iconSize }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onAppClick(app.id)}
              whileTap={{ scale: 0.88, y: -2 }}
              whileHover={{ y: -6 }}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                filter: app.isOpen
                  ? "drop-shadow(0 4px 14px rgba(0,0,0,0.5))"
                  : "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ICON_MAP[app.id]}
                alt={LABEL_MAP[app.id]}
                style={{ width: iconSize, height: iconSize, objectFit: "contain", display: "block" }}
              />
            </motion.div>

            {/* Open dot */}
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: app.isOpen ? "rgba(255,255,255,0.85)" : "transparent",
                transition: "background 0.25s",
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
