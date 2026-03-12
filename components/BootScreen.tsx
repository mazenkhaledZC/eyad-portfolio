"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "booting" | "login" | "exiting";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>("booting");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) { raf = requestAnimationFrame(tick); }
      else { setTimeout(() => setPhase("login"), 400); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleLogin = useCallback(() => {
    setPhase("exiting");
    setTimeout(onComplete, 800);
  }, [onComplete]);

  // Any key OR any click on login screen → login
  useEffect(() => {
    if (phase !== "login") return;
    const onKey = () => handleLogin();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleLogin]);

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          {/* ── BOOT PHASE ── */}
          <AnimatePresence>
            {phase === "booting" && (
              <motion.div
                key="booting"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute", inset: 0, background: "#000",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 44,
                }}
              >
                <motion.img
                  src="/icons/apple-logo.png"
                  alt="Apple"
                  style={{ width: 56, height: 68, objectFit: "contain", filter: "invert(1)" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  style={{ width: 190, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}
                >
                  <div style={{ height: "100%", background: "rgba(255,255,255,0.75)", borderRadius: 2, width: `${progress * 100}%`, transition: "width 0.05s linear" }} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── LOGIN PHASE ── */}
          <AnimatePresence>
            {phase === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55 }}
                onClick={handleLogin}
                style={{
                  position: "absolute", inset: 0, cursor: "default",
                  backgroundImage: "url(/wallpaper.jpg)",
                  backgroundSize: "cover", backgroundPosition: "center",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                {/* Blurred overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.36)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                }} />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                  style={{
                    position: "relative", zIndex: 1,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 16,
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 112, height: 112, borderRadius: "50%",
                    overflow: "hidden",
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 12px 48px rgba(0,0,0,0.55)",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/profile.jpg" alt="Eyad Ahmed"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  {/* Name & role */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 23, fontWeight: 500, color: "#fff", letterSpacing: "0.1px", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                      Eyad Ahmed
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>
                      Marketing Specialist
                    </div>
                  </div>

                  {/* Hint */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.75, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.2px",
                    }}
                  >
                    Click anywhere or press any key to continue
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
