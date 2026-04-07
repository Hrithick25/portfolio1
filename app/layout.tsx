import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Hrithick — AI Engineer & GenAI Developer",
  description:
    "Building production-ready AI systems — from RAG pipelines and conversational agents to healthcare and AR-based solutions. Portfolio of Hrithick, AI Engineer.",
  keywords: [
    "AI engineer",
    "GenAI developer",
    "portfolio",
    "LLM engineering",
    "RAG pipeline",
    "full-stack AI",
    "machine learning",
    "Hrithick",
  ],
  openGraph: {
    title: "Hrithick — AI Engineer & GenAI Developer",
    description:
      "Building production-ready AI systems that deliver impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Cursor />
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
