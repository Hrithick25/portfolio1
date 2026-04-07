"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const orbScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.5]);

  /* GSAP big text horizontal scroll */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!bigTextRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigTextRef.current,
        { xPercent: 10 },
        {
          xPercent: -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Ambient orbs with parallax */}
      <motion.div
        style={{
          scale: orbScale,
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "600px",
          height: "600px",
        }}
        className="orb orb-cyan"
      />
      <motion.div
        style={{
          scale: orbScale,
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "500px",
          height: "500px",
        }}
        className="orb orb-violet"
      />

      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              maxWidth: "800px",
            }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 216, 255, 0.15)",
                  background: "rgba(0, 216, 255, 0.04)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent-cyan)",
                    animation: "pulse-glow 2s ease infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent-cyan)",
                    fontWeight: 500,
                  }}
                >
                  Open to Opportunities
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <div>
              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ margin: 0, padding: 0 }}
              >
                Hrithick
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "3px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))",
                  marginTop: "16px",
                }}
              />
            </div>

            {/* Role title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                AI Engineer &amp; GenAI Developer
              </p>
              <p
                style={{
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: "600px",
                  fontWeight: 400,
                }}
              >
                Architecting production-ready AI systems — from scalable RAG pipelines and conversational agents
                to AI-driven healthcare solutions. I turn complex machine learning challenges into elegant, high-impact products.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}
            >
              <a href="#work" className="btn-primary">
                View Projects
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </motion.div>


          </div>
        </div>
      </motion.div>

      {/* Big scrolling text behind */}
      <div
        ref={bigTextRef}
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          whiteSpace: "nowrap",
          fontSize: "clamp(120px, 18vw, 280px)",
          fontWeight: 900,
          fontFamily: "var(--font-display)",
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 5,
        }}
      >
        AI ENGINEER · FULL STACK · GENAI · AI ENGINEER · FULL STACK
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "22px",
            height: "36px",
            borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "8px 0",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "2px",
              height: "6px",
              borderRadius: "999px",
              background: "var(--accent-cyan)",
              opacity: 0.6,
            }}
          />
        </div>
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
