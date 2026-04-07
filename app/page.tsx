"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import ParallaxBand from "@/components/ParallaxBand";
import ParallaxStatements from "@/components/ParallaxStatements";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      <main>
        <Hero />

        <ParallaxBand
          texts={["AI ENGINEER", "FULL STACK", "GENAI", "MACHINE LEARNING"]}
          direction="left"
          speed={1.5}
        />

        <About />

        <ParallaxStatements />

        <div className="section-divider" />
        <Services />

        <ParallaxBand
          texts={["FASTAPI", "REACT", "NEXT.JS", "PYTHON", "LLM"]}
          direction="right"
          speed={1}
          accent={true}
        />

        <Projects />

        <div className="section-divider" />
        <Testimonials />

        <div className="section-divider" />
        <TechStack />
        
        <Footer />
      </main>

      <ScrollToTop />
    </SmoothScroll>
  );
}
