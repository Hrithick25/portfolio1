"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Large parallax text statements that reveal on scroll
 * — cinematic scroll-triggered typography
 */
const statements = [
  {
    line1: "I build",
    line2: "AI-powered systems.",
    highlight: 1,
    align: "left" as const,
  },
  {
    line1: "From models",
    line2: "to production.",
    highlight: 1,
    align: "right" as const,
  },
];

export default function ParallaxStatements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".statement-block");

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const lines = section.querySelectorAll(".statement-line");

        // Stagger lines from below
        gsap.fromTo(
          lines,
          {
            y: 80,
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {statements.map((s, idx) => (
        <section
          key={idx}
          className="statement-block parallax-section"
          style={{
            paddingBlock: "clamp(80px, 10vw, 140px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Parallax background orb */}
          <ParallaxOrb
            position={s.align === "left" ? "right" : "left"}
            color={idx === 0 ? "cyan" : "violet"}
          />

          <div
            className="container"
            style={{
              textAlign: s.align,
            }}
          >
            <p
              className="statement-line"
              style={{
                fontSize: "clamp(40px, 7vw, 90px)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                opacity: 0,
              }}
            >
              {s.line1}
            </p>
            <p
              className="statement-line"
              style={{
                fontSize: "clamp(40px, 7vw, 90px)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                background:
                  "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0,
              }}
            >
              {s.line2}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

function ParallaxOrb({
  position,
  color,
}: {
  position: "left" | "right";
  color: "cyan" | "violet";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [position]: "-5%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background:
          color === "cyan"
            ? "rgba(0, 216, 255, 0.03)"
            : "rgba(168, 85, 247, 0.03)",
        filter: "blur(100px)",
        pointerEvents: "none",
      }}
    />
  );
}
