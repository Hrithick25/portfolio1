"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const ctaY = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      style={{
        paddingTop: "var(--section-padding)",
        paddingBottom: "clamp(20px, 2vw, 40px)",
      }}
    >
      <div className="container">
        <div className="section-divider" style={{ marginBottom: "clamp(60px, 8vw, 100px)" }} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "clamp(60px, 8vw, 100px)",
          }}
        >
          <h2
            className="section-title"
            style={{ marginBottom: "24px", lineHeight: 1.15, fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            Let&apos;s Work <span>Together</span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              lineHeight: 1.75,
              marginBottom: "48px",
            }}
          >
            Currently open to GenAI Engineer, AI Backend, and Applied ML roles.
            If you have an enterprise project or a creative vision to bring to life, 
            I&apos;d love to hear from you.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a 
              href="mailto:hello@hrithick.dev" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "999px",
                background: "white",
                color: "black",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.02em",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              SEND A MESSAGE
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "4px" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            
            <a
              href="/resume.pdf"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "999px",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.02em",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              DOWNLOAD CV
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="section-divider" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            paddingBottom: "8px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} Hrithick. Crafted with precision.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "GitHub", href: "https://github.com/Hrithick25" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/hrithick-m-1b213a262/" },
              { label: "LeetCode", href: "https://leetcode.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontWeight: 300,
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--text-tertiary)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
