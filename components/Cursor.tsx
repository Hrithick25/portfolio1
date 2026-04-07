"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "text" | "clicking";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState({ x: -200, y: -200 });
  const [state, setCursorState] = useState<CursorState>("default");
  const [clicking, setClicking] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const updatePos = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  const updateState = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a");
    const button = target.closest("button");
    const isText =
      ["P", "SPAN", "H1", "H2", "H3", "H4", "LI"].includes(target.tagName) &&
      !link && !button;

    if (link || button) {
      setCursorState("hover");
      // Grab label from data-cursor or textContent snippet
      const el = (link || button) as HTMLElement;
      const label = el.getAttribute("data-cursor") || "";
      setHoverLabel(label);
    } else if (isText) {
      setCursorState("text");
      setHoverLabel("");
    } else {
      setCursorState("default");
      setHoverLabel("");
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    let targetX = -200, targetY = -200;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      updatePos(e);
      updateState(e);
    };

    const animateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      rafId = requestAnimationFrame(animateTrail);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [updatePos, updateState]);

  const isHover = state === "hover";
  const isText = state === "text";

  return (
    <>
      {/* Hide native cursor via CSS injected here */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* ── Dot (instant follow) ── */}
      <motion.div
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: clicking ? 0.5 : isHover ? 0 : isText ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0, ease: "linear" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--accent-cyan)",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: "0 0 10px var(--accent-cyan)",
        }}
      />

      {/* ── Text cursor (I-beam) ── */}
      <AnimatePresence>
        {isText && (
          <motion.div
            key="text-cursor"
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{
              opacity: visible ? 0.9 : 0,
              x: pos.x - 1,
              y: pos.y - 12,
              scaleY: 1,
            }}
            exit={{ opacity: 0, scaleY: 0.4 }}
            transition={{ type: "tween", duration: 0, ease: "linear" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "2px",
              height: "24px",
              background: "linear-gradient(180deg, var(--accent-cyan), var(--accent-violet))",
              borderRadius: "2px",
              pointerEvents: "none",
              zIndex: 99999,
              boxShadow: "0 0 8px var(--accent-cyan)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Hover pill ── */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            key="hover-pill"
            initial={{ opacity: 0, scale: 0.6, x: pos.x - 28, y: pos.y - 28 }}
            animate={{
              opacity: visible ? 1 : 0,
              scale: clicking ? 0.88 : 1,
              x: pos.x - 28,
              y: pos.y - 28,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "tween", duration: 0, ease: "linear" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(0, 216, 255, 0.1)",
              border: "1px solid rgba(0, 216, 255, 0.4)",
              backdropFilter: "blur(4px)",
              pointerEvents: "none",
              zIndex: 99998,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(0, 216, 255, 0.15), inset 0 0 20px rgba(0, 216, 255, 0.05)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Trailing glow ring (spring lag) ── */}
      <motion.div
        animate={{
          x: trail.x - 20,
          y: trail.y - 20,
          scale: isHover ? 0 : clicking ? 2.2 : 1,
          opacity: visible ? (isHover ? 0 : isText ? 0.3 : 0.5) : 0,
        }}
        transition={{ type: "tween", duration: 0, ease: "linear" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: `1px solid ${isText ? "rgba(168,85,247,0.5)" : "rgba(0, 216, 255, 0.35)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          transition: "border-color 0.3s ease",
        }}
      />

      {/* ── Click burst ── */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="click-burst"
            initial={{ scale: 0, opacity: 0.6, x: pos.x - 30, y: pos.y - 30 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "1px solid var(--accent-cyan)",
              pointerEvents: "none",
              zIndex: 99996,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
