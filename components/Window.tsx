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

const MIN_W = 280;
const MIN_H = 200;

export default function Window({
  id, title, icon, isOpen, isMinimized, zIndex,
  defaultWidth = 700, defaultHeight = 520,
  defaultX, defaultY,
  children, onClose, onMinimize, onFocus,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos,  setPos]  = useState({ x: defaultX ?? 80, y: defaultY ?? 80 });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [saved, setSaved] = useState({ pos: { x: defaultX ?? 80, y: defaultY ?? 80 }, size: { width: defaultWidth, height: defaultHeight } });

  const dragging  = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const resizing  = useRef<ResizeState | null>(null);

  // Double-tap detection for mobile
  const lastTapTime = useRef(0);

  // ── toggleMaximize ────────────────────────────────────────
  const toggleMaximize = useCallback(() => {
    if (!isMaximized) {
      setSaved({ pos, size });
      setPos({ x: 0, y: 28 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 - 84 });
    } else {
      setPos(saved.pos);
      setSize(saved.size);
    }
    setIsMaximized(v => !v);
  }, [isMaximized, pos, size, saved]);

  // ── Title bar pointer down (drag + double-tap) ────────────
  const handleTitlePointerDown = useCallback((e: React.PointerEvent) => {
    onFocus(id);

    // Double-tap on touch = maximize
    if (e.pointerType === "touch") {
      const now = Date.now();
      if (now - lastTapTime.current < 320) {
        toggleMaximize();
        lastTapTime.current = 0;
        return;
      }
      lastTapTime.current = now;
    }

    if (isMaximized) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
    e.preventDefault();
  }, [id, isMaximized, onFocus, pos, toggleMaximize]);

  const handleTitlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos({
      x: Math.max(0, dragStart.current.px + e.clientX - dragStart.current.x),
      y: Math.max(28, dragStart.current.py + e.clientY - dragStart.current.y),
    });
  }, []);

  const handleTitlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // ── Resize handle pointer events ──────────────────────────
  const handleResizePointerDown = useCallback((dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus(id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizing.current = {
      dir,
      startX: e.clientX, startY: e.clientY,
      startW: size.width, startH: size.height,
      startPx: pos.x,    startPy: pos.y,
    };
  }, [id, onFocus, size, pos]);

  const handleResizePointerMove = useCallback((e: React.PointerEvent) => {
    if (!resizing.current) return;
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
  }, []);

  const handleResizePointerUp = useCallback(() => {
    resizing.current = null;
  }, []);

  // Keep global pointer listeners as fallback (handles pointer leaving element before capture)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) {
        setPos({
          x: Math.max(0, dragStart.current.px + e.clientX - dragStart.current.x),
          y: Math.max(28, dragStart.current.py + e.clientY - dragStart.current.y),
        });
      }
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
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, []);

  const radius = isMaximized ? 0 : 12;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ scale: 0.82, opacity: 0, y: 18 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={   { scale: 0.82, opacity: 0, y: 18 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          onPointerDown={() => onFocus(id)}
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
          }}
        >
          {/* ── RESIZE HANDLES (desktop only — hidden on narrow screens) ── */}
          {!isMaximized && (<>
            <div onPointerDown={handleResizePointerDown("n")}  onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", top:0,    left:8,   right:8,  height:5, cursor:"n-resize",  zIndex:10, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("s")}  onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", bottom:0, left:8,   right:8,  height:5, cursor:"s-resize",  zIndex:10, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("e")}  onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", right:0,  top:8,    bottom:8, width:5,  cursor:"e-resize",  zIndex:10, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("w")}  onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", left:0,   top:8,    bottom:8, width:5,  cursor:"w-resize",  zIndex:10, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("nw")} onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", top:0,    left:0,   width:10, height:10, cursor:"nw-resize", zIndex:11, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("ne")} onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", top:0,    right:0,  width:10, height:10, cursor:"ne-resize", zIndex:11, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("sw")} onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", bottom:0, left:0,   width:10, height:10, cursor:"sw-resize", zIndex:11, touchAction:"none" }} />
            <div onPointerDown={handleResizePointerDown("se")} onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} style={{ position:"absolute", bottom:0, right:0,  width:10, height:10, cursor:"se-resize", zIndex:11, touchAction:"none" }} />
          </>)}

          {/* ── TITLE BAR ── */}
          <div
            onPointerDown={handleTitlePointerDown}
            onPointerMove={handleTitlePointerMove}
            onPointerUp={handleTitlePointerUp}
            onDoubleClick={toggleMaximize}
            style={{
              height: 44, flexShrink: 0,
              display: "flex", alignItems: "center", padding: "0 16px",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              cursor: isMaximized ? "default" : "move",
              userSelect: "none",
              touchAction: "none",
              borderRadius: isMaximized ? 0 : "12px 12px 0 0",
            }}
          >
            {/* Traffic lights */}
            <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink: 0 }}>
              {[
                { color:"#ff5f57", action: () => onClose(id),    sym: <X size={7} color="#7a1a1a"/> },
                { color:"#febc2e", action: () => onMinimize(id), sym: <svg width="7" height="2" viewBox="0 0 7 2"><rect width="7" height="2" rx="1" fill="#7a5500"/></svg> },
                { color:"#28c840", action: toggleMaximize,       sym: <Maximize2 size={7} color="#0a5a1a"/> },
              ].map((btn, i) => (
                <button key={i}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={btn.action}
                  style={{
                    width:13, height:13, borderRadius:"50%",
                    background:btn.color, border:"none", cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.filter="brightness(0.85)"}
                  onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.filter="brightness(1)"}
                >
                  <span style={{opacity:0, transition:"opacity 0.1s"}}
                    onMouseEnter={e=>(e.currentTarget as HTMLSpanElement).style.opacity="1"}
                    onMouseLeave={e=>(e.currentTarget as HTMLSpanElement).style.opacity="0"}
                  >{btn.sym}</span>
                </button>
              ))}
            </div>

            {/* Title */}
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:7, minWidth:0 }}>
              <span style={{ fontSize:14, flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.82)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {title}
              </span>
            </div>
            <div style={{ width:55, flexShrink:0 }} />
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
