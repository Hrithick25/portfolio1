"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── GSAP Word-by-word scroll reveal ── */
function ScrollRevealParagraph({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll('.word-span');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.15, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={containerRef} style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0 6px" }}>
      {words.map((word, i) => (
        <span key={i} className="word-span" style={{ display: "inline-block", willChange: "opacity, transform" }}>
          {word}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax with GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !orbRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        yPercent: 30,
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3D Glass Card Tilt Effect (Vanilla JS)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        id="about"
        className="parallax-section"
        style={{ paddingBlock: "var(--section-padding)" }}
      >
        {/* Parallax orb */}
        <div
          ref={orbRef}
          className="orb orb-cyan"
          aria-hidden
          style={{ willChange: "transform" }}
        >
          <div style={{ width: "500px", height: "500px" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ marginBottom: "clamp(48px, 5vw, 72px)" }}
          >
            <p className="section-label">Get to Know Me</p>
            <h2 className="section-title">
              About <span>Me</span>
            </h2>
          </motion.div>

          {/* Content grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "clamp(32px, 4vw, 64px)",
            }}
            className="mobile-stack"
          >
            {/* Bio with word reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <ScrollRevealParagraph
                text="I am an AI Systems Engineer architecting robust solutions at the intersection of machine learning, scalable backend infrastructure, and high-impact real-world applications."
                style={{
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}
              />
              <ScrollRevealParagraph
                text="My focus lies in building enterprise-grade Generative AI systems — ranging from complex RAG pipelines and conversational agents to AI-driven healthcare and AR ecosystems. I engineer intelligent automation that solves meaningful problems in accessibility and healthcare technology."
                style={{
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  color: "var(--text-tertiary)",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "15px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  marginBottom: "48px",
                  background:
                    "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.7,
                }}
              >
                &quot;Engineering elegant solutions that blend robust architecture with beautiful design.&quot;
              </motion.p>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div
                ref={cardRef}
                className="glass-card"
                style={{ padding: "clamp(24px, 2.5vw, 36px)", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease" }}
              >
                <h4
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "28px",
                  }}
                >
                  Quick Facts
                </h4>
                {[
                  { label: "Location", value: "India (Tamil Nadu) · UAE" },
                  {
                    label: "Speciality",
                    value: "AI Engineering · GenAI Systems",
                  },
                  { label: "Languages", value: "English, Tamil, Hindi" },
                  {
                    label: "Availability",
                    value: "Open to Internships & Full-Time",
                  },
                  {
                    label: "Focus",
                    value: "Generative AI + Backend Systems",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      paddingBlock: "14px",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
