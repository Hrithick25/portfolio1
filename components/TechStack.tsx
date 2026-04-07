"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const allSkills = [
  { label: "Python", slug: "python" },
  { label: "TypeScript", slug: "typescript" },
  { label: "React", slug: "react" },
  { label: "Next.js", slug: "nextdotjs" },
  { label: "FastAPI", slug: "fastapi" },
  { label: "Node.js", slug: "nodedotjs" },
  { label: "PostgreSQL", slug: "postgresql" },
  { label: "Docker", slug: "docker" },
  { label: "AWS", slug: "amazonaws" },
  { label: "Tailwind CSS", slug: "tailwindcss" },
  { label: "Framer Motion", slug: "framer" },
  { label: "Three.js", slug: "threedotjs" },
  { label: "Hugging Face", slug: "huggingface" },
  { label: "PyTorch", slug: "pytorch" },
  { label: "LangChain", slug: "langchain" },
];

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Triple the array to ensure flawless infinite marquee
  const items = [...allSkills, ...allSkills, ...allSkills];

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="parallax-section"
      style={{ paddingBlock: "clamp(80px, 10vw, 120px)", position: "relative", overflow: "hidden" }}
    >
      <motion.div style={{ y: headerY }} className="container">
        <div style={{ marginBottom: "60px", textAlign: "left" }}>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            Technologies & Tools
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              lineHeight: 1.1,
            }}
          >
            My <span>Arsenal</span>
          </h2>
        </div>
      </motion.div>

      {/* Infinite Horizontal Marquee moving left to right */}
      <div style={{ position: "relative", width: "100%", paddingBlock: "10px" }}>
        {/* Fade gradients on edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "100px",
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
            width: "100px",
            background: "linear-gradient(to left, var(--bg-primary), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
          <motion.div
            animate={{ x: ["-33.33%", "0%"] }} // Left to right motion!
            transition={{
              ease: "linear",
              duration: 30, // Adjust speed here
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              gap: "24px",
              width: "max-content",
              paddingLeft: "24px" // match gap
            }}
          >
            {items.map((skill, i) => (
              <div
                key={`${skill.label}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 32px 16px 20px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(0, 216, 255, 0.4)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 216, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={iconUrl(skill.slug)}
                    alt={skill.label}
                    loading="lazy"
                    style={{
                      width: "18px",
                      height: "18px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {skill.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
