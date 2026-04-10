"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  link?: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AIVA — 3D AI Virtual Assistant",
    subtitle: "Full-Stack AI Platform",
    description:
      "A real-time 3D AI receptionist powered by a RAG pipeline. Streams audio via WebSockets, performs STT, retrieves contextual knowledge from FAISS, and generates intelligent responses with lip-synced avatar interaction.",
    tags: ["React Three Fiber", "FastAPI", "FAISS", "Groq", "Gemini API"],
    color: "#00d8ff",
    link: "https://aiva-frontend-ecru.vercel.app/",
    icon: "⟐",
  },
  {
    id: 2,
    title: "AR Autism Learning App",
    subtitle: "AR + AI Application",
    description:
      "An interactive AR-based learning system for children with autism. Uses real-time vision models, adaptive TTS lessons, gamified XP system, and engagement tracking via emotion detection.",
    tags: ["React Native", "Firebase", "Groq Vision", "LLMs", "Expo Camera"],
    color: "#c084fc",
    link: "#",
    icon: "◈",
  },
  {
    id: 3,
    title: "Gen-AI Lab Report Examiner",
    subtitle: "Healthcare AI System",
    description:
      "An AI-powered clinical assistant that extracts, interprets, and simplifies medical lab reports. Uses vector search + LLM reasoning for patient-friendly insights with multi-modal document understanding.",
    tags: ["Llama 3.2", "LangGraph", "LlamaIndex", "FastAPI", "Docker"],
    color: "#ff6b35",
    link: "https://github.com/Hrithick25?tab=repositories",
    icon: "◇",
  },
  {
    id: 4,
    title: "Sentinel LLM Security",
    subtitle: "Enterprise LLM Security",
    description:
      "An enterprise-grade LLM security middleware that intercepts API traffic through a concurrent 19-agent mesh. Dynamically neutralizes prompt injections, data leakage, and jailbreaks using NLP models and FAISS.",
    tags: ["Python", "React", "FastAPI", "Kafka", "FAISS"],
    color: "#00ffaa",
    link: "https://sentinel-frontend-fouz.vercel.app/",
    icon: "⬡",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  /* GSAP stagger reveal for project cards */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".project-card");
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="parallax-section"
      style={{ paddingBlock: "var(--section-padding)" }}
    >
      <div className="container">
        {/* Header with parallax */}
        <motion.div
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: "clamp(48px, 5vw, 72px)" }}>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-tertiary)",
                marginTop: "16px",
                maxWidth: "500px",
                lineHeight: 1.7,
              }}
            >
              Building AI systems that solve real problems — from healthcare to
              education and beyond.
            </p>
          </div>
        </motion.div>

        {/* Project cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(16px, 2vw, 24px)",
          }}
          className="mobile-stack"
        >
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.link}
              target={p.link !== "#" ? "_blank" : undefined}
              rel={p.link !== "#" ? "noopener noreferrer" : undefined}
              className="project-card glass-card"
              style={{
                padding: "clamp(28px, 3vw, 44px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "340px",
                cursor: "pointer",
                textDecoration: "none",
                perspective: "1000px",
                opacity: 0,
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
              }}
            >
              {/* Top: icon + badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    lineHeight: 1,
                    color: p.color,
                    opacity: 0.5,
                    filter: `drop-shadow(0 0 12px ${p.color}40)`,
                  }}
                >
                  {p.icon}
                </span>
                <span
                  className="badge"
                  style={{
                    color: p.color,
                    background: `${p.color}0c`,
                    border: `1px solid ${p.color}18`,
                  }}
                >
                  {p.subtitle}
                </span>
              </div>

              {/* Title + description */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-tertiary)",
                    lineHeight: 1.75,
                    marginBottom: "28px",
                  }}
                >
                  {p.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "15%",
                  right: "15%",
                  height: "2px",
                  borderRadius: "999px",
                  background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                }}
                className="card-accent"
              />

              {/* Arrow */}
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "28px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transform: "translateY(4px)",
                  transition: "all 0.4s var(--ease-out-expo)",
                }}
                className="card-arrow"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card:hover .card-accent {
          opacity: 1 !important;
        }
        .project-card:hover .card-arrow {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .project-card:hover h3 {
          color: white !important;
        }
        .project-card:hover .tag {
          color: var(--text-secondary) !important;
          border-color: var(--border-hover) !important;
        }
      `}</style>
    </section>
  );
}
