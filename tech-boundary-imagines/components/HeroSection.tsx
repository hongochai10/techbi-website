"use client";

/**
 * HeroSection
 * ─────────────────────────────────────────────────────────────
 * LAYOUT (Desktop):
 *   ┌────────────────────────────────────────────┐
 *   │  [Left — 50%]          [Right — 50%]       │
 *   │  SECTION BADGE         ╔══ 3D CANVAS ════╗ │
 *   │  H1 TAGLINE            ║  EnergyCore +   ║ │
 *   │  SUB-COPY              ║  Particles      ║ │
 *   │  [CTA PRIMARY]         ║  (React Three   ║ │
 *   │  [CTA SECONDARY]       ║   Fiber)        ║ │
 *   │  STATS ROW             ╚═════════════════╝ │
 *   └────────────────────────────────────────────┘
 *
 * LAYOUT (Mobile): Stacked — 3D canvas appears above the copy.
 *
 * TAGLINE OPTIONS:
 *   1. "Where Imagination Becomes the Architecture of Tomorrow"
 *   2. "The Edge of Technology Is Where We Begin"
 *   3. "Beyond Boundaries. Beyond Time. Beyond Imagination."
 *
 * We use option 3 broken across 3 lines with gradient accent on key words.
 *
 * ANIMATIONS:
 *  • Initial load: copy fades + slides up (staggered, framer-motion).
 *  • Scroll: subtle parallax on text (useScroll + useTransform).
 *  • Background: hero-gradient + radial fog that slowly shifts hue.
 *  • Grid lines in bg for depth.
 *  • Scan line sweeps from top to bottom in a loop.
 *  • Stats counter ticks up on section enter (intersection observer).
 */

import dynamic from "next/dynamic";
import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

// Dynamic import — avoids SSR for Three.js canvas
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-emerald-neon animate-pulse-glow" />
    </div>
  ),
});

/* ── Animated counter ── */
function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start gap-1">
      <span className="text-3xl md:text-4xl font-bold font-mono gradient-text-emerald">
        {count}
        {suffix}
      </span>
      <span className="text-xs transition-opacity duration-300 tracking-widest uppercase font-medium opacity-50" style={{ color: "var(--text-base)" }}>{label}</span>
    </div>
  );
}

/* ── Animation helper — returns transition props directly ── */
const fadeUpProps = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    delay,
  },
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: text moves up slower than scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
      aria-label="Hero — Tech Boundary Imagines"
    >
      {/* ── Background Layers ── */}
      {/* 1. Grid */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* 2. Radial gradient atmosphere */}
      <motion.div
        className="absolute inset-0 bg-hero-gradient"
        style={{ opacity: bgOpacity }}
        aria-hidden="true"
      />

      {/* 3. Corner vignette */}
      <div
        className="absolute inset-0 transition-colors"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, var(--void) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 4. Scan line */}
      <div className="scan-line-overlay" aria-hidden="true" />

      {/* ── 3D Canvas (full section, right-biased on desktop) ── */}
      <motion.div
        className="absolute inset-0 md:left-[38%]"
        style={{ scale: canvasScale }}
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column — text */}
          <motion.div style={{ y: textY }} className="flex flex-col gap-8">
            {/* Section badge */}
            <motion.div {...fadeUpProps(0)}>
              <span className="section-badge">
                {t("badge")}
              </span>
            </motion.div>

            {/* H1 Tagline */}
            <motion.h1
              {...fadeUpProps(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight transition-colors"
              style={{ color: "var(--text-base)" }}
            >
              <span className="block">{t("tagline.p1")}</span>
              <span className="block gradient-text-emerald text-glow-emerald">
                {t("tagline.p2")}
              </span>
              <span className="block" style={{ opacity: 0.9 }}>{t("tagline.p3")}</span>
              <span className="block" style={{
                background: "linear-gradient(135deg, #00FF9D 0%, #b026ff 60%, #0033FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t("tagline.p4")}
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              {...fadeUpProps(0.2)}
              className="text-base md:text-lg leading-relaxed max-w-md font-light transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {t.rich("description", {
                ai: (chunks: ReactNode) => <span className="text-emerald-neon/80">{chunks}</span>,
                cloud: (chunks: ReactNode) => <span className="text-purple-electric/80">{chunks}</span>,
                software: (chunks: ReactNode) => <span className="text-blue-neon/80">{chunks}</span>,
                data: (chunks: ReactNode) => <span className="text-emerald-neon/80">{chunks}</span>
              })}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUpProps(0.3)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-cyber" data-cursor-hover>
                <span className="relative z-10 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="3" fill="currentColor" />
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                  {t("ctaPrimary")}
                </span>
              </button>
              <button className="btn-cyber-secondary" data-cursor-hover>
                <span className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t("ctaSecondary")}
                </span>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUpProps(0.4)}
              className="pt-4"
            >
              <div className="divider-gradient mb-6" />
              <div className="flex flex-wrap gap-10 md:gap-14" style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
                <Counter end={20} suffix="+" label={t("stats.projects")} />
                <Counter end={15} suffix="+" label={t("stats.clients")} />
                <Counter end={98} suffix="%" label={t("stats.satisfaction")} />
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — spacer for 3D (canvas is absolutely positioned) */}
          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono transition-colors opacity-30" style={{ color: "var(--text-base)" }}>
          {t("scroll")}
        </span>
        <div className="w-px h-10 overflow-hidden relative">
          <motion.div
            className="w-full bg-gradient-to-b from-emerald-neon to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ height: "100%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
