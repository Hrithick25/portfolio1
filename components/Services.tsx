"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const services = [
  {
    id: 1,
    title: "AI Systems & Backend Engineering",
    description:
      "Designing scalable AI-powered systems using FastAPI, RAG pipelines, and LLM orchestration (LangChain, LlamaIndex) for real-world applications.",
    color: "#00d8ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Full-Stack AI Development",
    description:
      "Building end-to-end intelligent applications combining React / React Native frontends with high-performance ML-driven backends.",
    color: "#ff6b35",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Generative AI & LLM Engineering",
    description:
      "Developing production-grade GenAI systems using vector databases (FAISS), prompt engineering, and multimodal pipelines.",
    color: "#c084fc",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Real-Time & Interactive Systems",
    description:
      "Engineering low-latency pipelines with WebSockets, streaming inference, and real-time AI interactions for 3D and AR experiences.",
    color: "#00ffaa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="parallax-section"
      style={{ paddingBlock: "var(--section-padding)" }}
    >
      {/* Parallax orb */}
      <motion.div
        style={{ y: bgY }}
        className="orb orb-orange"
        aria-hidden
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "20%",
            right: "-5%",
          }}
        />
      </motion.div>

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: "clamp(48px, 5vw, 72px)" }}
        >
          <p className="section-label">Core Capabilities</p>
          <h2 className="section-title">
            What I <span>Do</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(16px, 2vw, 24px)",
          }}
          className="mobile-stack"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card"
              style={{
                padding: "clamp(28px, 3vw, 44px)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                cursor: "default",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
              }}
            >
              {/* Number + Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: `${s.color}60`,
                    fontWeight: 500,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  0{i + 1}
                </span>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}12`,
                    color: s.color,
                    opacity: 0.7,
                    transition: "all 0.4s ease",
                  }}
                >
                  {s.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-tertiary)",
                  lineHeight: 1.75,
                }}
              >
                {s.description}
              </p>

              {/* Bottom glow line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "10%",
                  right: "10%",
                  height: "2px",
                  borderRadius: "999px",
                  background: `linear-gradient(90deg, transparent, ${s.color}30, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                }}
                className="service-glow"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .glass-card:hover .service-glow {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
