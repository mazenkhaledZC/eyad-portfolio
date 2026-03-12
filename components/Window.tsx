"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

type ResizeDir = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

interface ResizeState {
  dir: ResizeDir;
  startX: number; startY: number;
  startW: number; startH: number;
  startPx: number; startPy: number;
}

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

const MIN_W = 320;
const MIN_H = 220;

const CURSOR_MAP: Record<ResizeDir, string> = {
  n: "n-resize", ne: "ne-resize", e: "e-resize", se: "se-resize",
  s: "s-resize", sw: "sw-resize", w: "w-resize", nw: "nw-resize",
};

export default function Window({
  id, title, icon, isOpen, isMinimized, zIndex,
  defaultWidth = 700, defaultHeight = 520,
  defaultX, defaultY,
  children, onClose, onMinimize, onFocus,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: defaultX ?? 80, y: defaultY ?? 80 });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [savedState, setSavedState] = useState({ pos: { x: defaultX ?? 80, y: defaultY ?? 80 }, size: { width: defaultWidth, height: defaultHeight } });

  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const resizing = useRef<ResizeState | null>(null);

  const handleTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus(id);
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
    e.preventDefault();
  }, [id, isMaximized, onFocus, pos]);

  const handleResizeMouseDown = useCallback((dir: ResizeDir) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus(id);
    resizing.current = {
      dir, startX: e.clientX, startY: e.clientY,
      startW: size.width, startH: size.height,
      startPx: pos.x, startPy: pos.y,
    };
  }, [id, onFocus, size, pos]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Drag
      if (dragging.current) {
        setPos({
          x: Math.max(0, dragStart.current.px + e.clientX - dragStart.current.x),
          y: Math.max(28, dragStart.current.py + e.clientY - dragStart.current.y),
        });
      }
      // Resize
      if (resizing.current) {
        const { dir, startX, startY, startW, startH, startPx, startPy } = resizing.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newW = startW, newH = startH, newX = startPx, newY = startPy;

        if (dir.includes("e")) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes("w")) { newW = Math.max(MIN_W, startW - dx); newX = startPx + (startW - newW); }
        if (dir.includes("s")) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes("n")) { newH = Math.max(MIN_H, startH - dy); newY = Math.max(28, startPy + (startH - newH)); }

        setSize({ width: newW, height: newH });
        setPos({ x: newX, y: newY });
      }
    };
    const onUp = () => { dragging.current = false; resizing.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const toggleMaximize = () => {
    if (!isMaximized) {
      setSavedState({ pos, size });
      setPos({ x: 0, y: 28 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 - 84 });
    } else {
      setPos(savedState.pos);
      setSize(savedState.size);
    }
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  const radius = isMaximized ? 0 : 12;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ scale: 0.82, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.82, opacity: 0, y: 18 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          onMouseDown={() => onFocus(id)}
          style={{
            position: "fixed",
            left: pos.x, top: pos.y,
            width: size.width, height: size.height,
            zIndex,
            borderRadius: radius,
            overflow: "hidden",
            background: "rgba(18,18,22,0.93)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow: "0 28px 80px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.06)",
            display: "flex", flexDirection: "column",
            // Prevent iframe pointer events from blocking our resize during resize
          }}
        >
          {/* ── RESIZE HANDLES ── */}
          {!isMaximized && (<>
            {/* Edges */}
            <div onMouseDown={handleResizeMouseDown("n")}   style={{ position:"absolute", top:0,    left:8,   right:8,  height:5, cursor:"n-resize",  zIndex:10 }} />
            <div onMouseDown={handleResizeMouseDown("s")}   style={{ position:"absolute", bottom:0, left:8,   right:8,  height:5, cursor:"s-resize",  zIndex:10 }} />
            <div onMouseDown={handleResizeMouseDown("e")}   style={{ position:"absolute", right:0,  top:8,   bottom:8,  width:5,  cursor:"e-resize",  zIndex:10 }} />
            <div onMouseDown={handleResizeMouseDown("w")}   style={{ position:"absolute", left:0,   top:8,   bottom:8,  width:5,  cursor:"w-resize",  zIndex:10 }} />
            {/* Corners */}
            <div onMouseDown={handleResizeMouseDown("nw")}  style={{ position:"absolute", top:0,    left:0,              width:10, height:10, cursor:"nw-resize", zIndex:11 }} />
            <div onMouseDown={handleResizeMouseDown("ne")}  style={{ position:"absolute", top:0,    right:0,             width:10, height:10, cursor:"ne-resize", zIndex:11 }} />
            <div onMouseDown={handleResizeMouseDown("sw")}  style={{ position:"absolute", bottom:0, left:0,              width:10, height:10, cursor:"sw-resize", zIndex:11 }} />
            <div onMouseDown={handleResizeMouseDown("se")}  style={{ position:"absolute", bottom:0, right:0,             width:10, height:10, cursor:"se-resize", zIndex:11 }} />
          </>)}

          {/* ── TITLE BAR ── */}
          <div
            onMouseDown={handleTitleBarMouseDown}
            style={{
              height: 44, flexShrink: 0,
              display: "flex", alignItems: "center", padding: "0 16px",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              cursor: isMaximized ? "default" : "move",
              userSelect: "none",
              borderRadius: isMaximized ? 0 : "12px 12px 0 0",
            }}
          >
            {/* Traffic lights */}
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {[
                { color:"#ff5f57", hover:"#e04040", action:() => onClose(id),     icon: <X size={7} color="#7a1a1a" /> },
                { color:"#febc2e", hover:"#d4900a", action:() => onMinimize(id),  icon: <svg width="7" height="2" viewBox="0 0 7 2"><rect width="7" height="2" rx="1" fill="#7a5500"/></svg> },
                { color:"#28c840", hover:"#1aa030", action: toggleMaximize,       icon: <Maximize2 size={7} color="#0a5a1a" /> },
              ].map((btn, i) => (
                <button
                  key={i}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={btn.action}
                  className="group"
                  style={{
                    width:13, height:13, borderRadius:"50%",
                    background: btn.color, border:"none",
                    cursor:"pointer", display:"flex",
                    alignItems:"center", justifyContent:"center",
                    transition:"filter 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.filter="brightness(0.85)"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.filter="brightness(1)"}
                >
                  <span style={{ opacity:0, transition:"opacity 0.1s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.opacity="1"}
                    onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.opacity="0"}
                  >{btn.icon}</span>
                </button>
              ))}
            </div>

            {/* Title */}
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
              <span style={{ fontSize:14 }}>{icon}</span>
              <span style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.82)", letterSpacing:"0.1px" }}>{title}</span>
            </div>
            <div style={{ width:55 }} />
          </div>

          {/* ── CONTENT ── */}
          <div style={{ flex:1, overflow:"auto", minHeight:0 }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
