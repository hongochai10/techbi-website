"use client";

/**
 * ImagineCanvas — Horizontal Scroll "Breakthrough Concepts" Section
 * ─────────────────────────────────────────────────────────────────
 * UX FLOW:
 *   • Section title + CTA appear from bottom on scroll enter.
 *   • Below: a horizontally scrollable rail of "concept cards".
 *   • Each concept card is 360px wide × 480px tall with:
 *       - Full-bleed background (dark gradient + accent color splash)
 *       - A glowing concept number top-left
 *       - Title (large, bold)
 *       - 2-line teaser description
 *       - A "Read Concept →" ghost link
 *   • Drag-to-scroll via pointer events (no external lib needed).
 *   • CSS scroll-snap for crisp stopping.
 *   • Arrow navigation buttons on desktop (prev/next).
 *
 * ANIMATION:
 *   • Section header: slide-up on IntersectionObserver.
 *   • Cards: staggered fade from right on first scroll into view.
 *   • Active card (center of viewport): subtle scale-up + brighter border.
 *   • Drag: cursor changes to grab/grabbing.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface Concept {
  id: string;
  number: string;
  title: string;
  teaser: string;
  accent: string;
  glow: string;
  tag: string;
}

const CONCEPTS: Concept[] = [
  {
    id: "c1",
    number: "001",
    title: "The Conscious Cloud",
    teaser: "Distributed AGI instances that share a unified self-awareness across global compute nodes. Consciousness as infrastructure.",
    accent: "#00FF9D",
    glow: "rgba(0,255,157,0.2)",
    tag: "AI × Infrastructure",
  },
  {
    id: "c2",
    number: "002",
    title: "Quantum Memory Fabric",
    teaser: "Storing petabytes inside individual molecules. Cold-atom arrays that retain data for centuries without power.",
    accent: "#b026ff",
    glow: "rgba(176,38,255,0.2)",
    tag: "Quantum × Storage",
  },
  {
    id: "c3",
    number: "003",
    title: "Neural Sovereignty",
    teaser: "The legal and technical framework for owning your own neural data. End-to-end encrypted thought. Inalienable cognitive rights.",
    accent: "#0055FF",
    glow: "rgba(0,85,255,0.2)",
    tag: "Neural × Ethics",
  },
  {
    id: "c4",
    number: "004",
    title: "Morphic Interfaces",
    teaser: "UIs that reshape themselves in real time based on biometric signals, context, and predictive intent modelling.",
    accent: "#00FF9D",
    glow: "rgba(0,255,157,0.15)",
    tag: "UX × AI",
  },
  {
    id: "c5",
    number: "005",
    title: "Synthetic Ecosystems",
    teaser: "Procedurally grown digital environments that follow emergent evolutionary rules. Ecosystems that outlive their creators.",
    accent: "#b026ff",
    glow: "rgba(176,38,255,0.15)",
    tag: "Bio × Digital",
  },
  {
    id: "c6",
    number: "006",
    title: "Zero-Latency Civilisation",
    teaser: "Planetary communication networks built on entangled photon pairs. Information that arrives before it is sent.",
    accent: "#0055FF",
    glow: "rgba(0,85,255,0.15)",
    tag: "Quantum × Comms",
  },
  {
    id: "c7",
    number: "007",
    title: "The Post-Scarcity Stack",
    teaser: "Open-source molecular manufacturing protocols. When any device can print any material, scarcity becomes a policy choice.",
    accent: "#00FF9D",
    glow: "rgba(0,255,157,0.15)",
    tag: "Manufacturing × Web3",
  },
];

/* ── Concept Card ── */
function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="horizontal-scroll-item group relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: "clamp(280px, 75vw, 360px)",
        height: "clamp(380px, 55vw, 480px)",
        background: `linear-gradient(145deg, ${concept.glow.replace(/[\d.]+\)$/g, '0.1)')} 0%, var(--card-bg) 100%)`,
        border: `1px solid var(--card-border)`,
        cursor: "grab",
      }}
      whileHover={{
        scale: 1.02,
        borderColor: concept.accent + "50",
        boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${concept.glow}`,
        transition: { duration: 0.3 }
      }}
    >
      {/* Background glow blob */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 80% 20%, ${concept.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-7">
        {/* Number + tag */}
        <div className="flex items-center justify-between mb-auto">
          <span
            className="text-5xl font-bold font-mono opacity-20"
            style={{ color: concept.accent }}
          >
            {concept.number}
          </span>
          <span
            className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: concept.accent,
              background: concept.glow,
              border: `1px solid ${concept.accent}20`,
            }}
          >
            {concept.tag}
          </span>
        </div>

        {/* Main content — bottom aligned */}
        <div className="mt-auto">
          {/* Accent bar */}
          <div
            className="w-8 h-0.5 mb-4 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${concept.accent}, transparent)`,
              boxShadow: `0 0 10px ${concept.accent}80`,
            }}
          />

          <h3 className="text-2xl font-bold leading-tight mb-3 transition-colors" style={{ color: "var(--text-base)" }}>
            {concept.title}
          </h3>

          <p className="text-sm leading-relaxed mb-6 transition-colors" style={{ color: "var(--text-muted)" }}>
            {concept.teaser}
          </p>

          <button
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:gap-3"
            style={{ color: concept.accent }}
            data-cursor-hover
          >
            Explore Concept
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function ImagineCanvas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollability();
  }, [checkScrollability]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  // Drag-to-scroll handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    checkScrollability();
  };

  return (
    <section
      id="imagine"
      className="relative py-28 md:py-36 bg-void overflow-hidden"
      aria-label="Imagine Canvas — Breakthrough Concepts"
    >
      {/* Bg atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(176,38,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      {/* ── Section Header ── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="section-badge" style={{ color: "#b026ff", borderColor: "rgba(176,38,255,0.3)", background: "rgba(176,38,255,0.06)" }}>
              Imagine Canvas
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold transition-colors" style={{ color: "var(--text-base)" }}>
              <span>Breakthrough</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #b026ff, #00FF9D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Concepts
              </span>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              data-cursor-hover
              className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 disabled:opacity-20 hover:border-emerald-neon/50 hover:shadow-neon-emerald"
              aria-label="Scroll left"
              style={{ color: "var(--text-base)", borderColor: "var(--glass-border)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              data-cursor-hover
              className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 disabled:opacity-20 hover:border-emerald-neon/50 hover:shadow-neon-emerald"
              aria-label="Scroll right"
              style={{ color: "var(--text-base)", borderColor: "var(--glass-border)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Horizontal Scroll Rail ── */}
      <div
        ref={scrollRef}
        className="horizontal-scroll-container px-6 md:px-[calc((100vw-80rem)/2+1.5rem)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onScroll={checkScrollability}
        style={{ cursor: "grab", userSelect: "none" }}
      >
        {CONCEPTS.map((concept, i) => (
          <ConceptCard key={concept.id} concept={concept} index={i} />
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-6 md:w-[calc((100vw-80rem)/2+1.5rem)]" />
      </div>

      {/* Fade edges */}
      <div
        className="absolute top-0 left-0 w-24 h-full pointer-events-none z-10 transition-colors"
        style={{ background: "linear-gradient(90deg, var(--void), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-24 h-full pointer-events-none z-10 transition-colors"
        style={{ background: "linear-gradient(-90deg, var(--void), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
