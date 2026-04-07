"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A full-width horizontal parallax text band that scrolls between sections.
 * Creates a cinematic "marquee parallax" effect.
 */
export default function ParallaxBand({
  texts,
  direction = "left",
  speed = 1,
  accent = false,
}: {
  texts: string[];
  direction?: "left" | "right";
  speed?: number;
  accent?: boolean;
}) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left"
      ? [`${5 * speed}%`, `${-15 * speed}%`]
      : [`${-15 * speed}%`, `${5 * speed}%`]
  );

  /* Add subtle rotation on scroll */
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "left" ? [-0.5, 0, 0.5] : [0.5, 0, -0.5]
  );

  /* GSAP for extra smooth skew */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!trackRef.current || !bandRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        skewX: direction === "left" ? -2 : 2,
        ease: "none",
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
        },
      });
    }, bandRef);

    return () => ctx.revert();
  }, [direction]);

  const repeated = [...texts, ...texts, ...texts, ...texts];

  return (
    <div
      ref={bandRef}
      style={{
        overflow: "hidden",
        paddingBlock: "clamp(20px, 3vw, 36px)",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        ref={trackRef}
        style={{
          x,
          rotate,
          display: "flex",
          width: "max-content",
          gap: "clamp(24px, 4vw, 48px)",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {repeated.map((text, i) => (
          <span
            key={`${text}-${i}`}
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              lineHeight: 1,
              ...(accent
                ? {
                    background:
                      "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.12,
                  }
                : {
                    color: "rgba(255, 255, 255, 0.03)",
                  }),
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
