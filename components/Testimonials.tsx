"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  initial: string;
  color: string;
  date: string;
}

const allTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Hrithick delivered a complete responsive website for us that perfectly captured our brand identity. The modern design, project portfolio showcase, and lead generation integration exceeded our expectations. His attention to detail and professional approach made the entire process smooth and efficient.",
    name: "Saravanan",
    title: "Arc Builders",
    initial: "S",
    color: "#00d8ff",
    date: "November 2023",
  },
  {
    id: 2,
    quote:
      "Working with Hrithick on our business profile and product display system was a game-changer. He focused on SEO optimization, responsive design, and delivered a seamless user experience that has significantly boosted our online presence and customer engagement. Highly recommended for any business looking to establish a strong digital footprint.",
    name: "Arun Mugavel M",
    title: "Ragana Traders",
    initial: "A",
    color: "#c084fc",
    date: "July 2024",
  },
  {
    id: 3,
    quote:
      "The custom AI dashboard Hrithick built transformed how we access our lab reports. His engineering allowed our team to query complex medical data instantly. Exceptionally profound technical capability and communication throughout.",
    name: "Dr. Karthick",
    title: "MedLife Solutions",
    initial: "K",
    color: "#ff6b35",
    date: "January 2025",
  },
  {
    id: 4,
    quote:
      "We needed a highly scalable real-time interface for our application. He shipped it ahead of schedule, with flawless code quality and an incredibly engaging user experience using Three.js and Framer motion.",
    name: "Sneha",
    title: "TechFlow Startup",
    initial: "S",
    color: "#00ffaa",
    date: "September 2024",
  }
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  // Duplicate for smooth marquee effect
  const repeated = [...allTestimonials, ...allTestimonials, ...allTestimonials];

  return (
    <section
      id="testimonials"
      className="parallax-section"
      style={{ paddingBlock: "var(--section-padding)", position: "relative", overflow: "hidden" }}
    >
      <div className="container" ref={ref} style={{ position: "relative", zIndex: 10 }}>
        {/* Header matching the reference's simple style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            marginBottom: "clamp(48px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <h2 
            className="section-title"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: "16px" }}
          >
            What People <span>Say</span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-tertiary)",
              maxWidth: "480px",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Real feedback from collaborations and freelance engagements.
          </p>
        </motion.div>
      </div>

      {/* Marquee Layout: auto-scrolling side by side wide cards */}
      <div style={{ position: "relative", width: "100%", paddingBlock: "20px" }}>
        {/* Gradients to fade edges cleanly */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "15vw",
            background: "linear-gradient(to right, var(--bg-primary), transparent)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "15vw",
            background: "linear-gradient(to left, var(--bg-primary), transparent)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              gap: "32px",
              width: "max-content",
              paddingLeft: "32px",
            }}
          >
            {repeated.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden",
                  width: "480px", // Fixed width to ensure smooth scrolling
                  minHeight: "360px",
                  flexShrink: 0
                }}
              >
                <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
                  <svg style={{ width: "32px", height: "32px", color: "rgba(255,255,255,0.05)", marginBottom: "20px", transform: "scaleX(-1)" }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                      marginBottom: "40px",
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                {/* Client info at the bottom */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    position: "relative",
                    zIndex: 2,
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "24px"
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                      background: `${t.color}15`,
                      color: t.color,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {t.name}
                      </p>
                      {/* LinkedIn icon mimicking the reference */}
                      <a href="#" style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        marginTop: "4px"
                      }}
                    >
                      {t.title}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: t.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginTop: "8px",
                        fontWeight: 600
                      }}
                    >
                      {t.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
