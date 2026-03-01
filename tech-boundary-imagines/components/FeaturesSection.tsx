"use client";

/**
 * FeaturesSection — Asymmetric Technology Showcase Grid
 * ─────────────────────────────────────────────────────────────
 * LAYOUT (Desktop Asymmetric Grid):
 *
 *   ┌──────────────┬──────────────┬──────────────┐
 *   │              │  CARD B      │  CARD C      │
 *   │  CARD A      │  (tall)      │              │
 *   │  (wide)      ├──────────────┤  CARD D      │
 *   │              │  CARD E      │              │
 *   └──────────────┴──────────────┴──────────────┘
 *   ┌──────────────┬──────────────────────────────┐
 *   │  CARD F      │  CARD G (wide — featured)    │
 *   └──────────────┴──────────────────────────────┘
 *
 * Each card:
 *   • Glassmorphism background
 *   • Animated 3D-style icon (SVG with gradient + glow)
 *   • Technology name + description
 *   • Hover: translateY(-6px) + stronger glow + border brightens
 *   • Scroll-triggered entrance: staggered from bottom
 *
 * TECHNOLOGIES FEATURED:
 *   1. Artificial General Intelligence
 *   2. Quantum Entanglement Computing
 *   3. Neural Interface OS
 *   4. Decentralised Reality (Web3)
 *   5. Photonic Processing
 *   6. Bio-Digital Convergence
 *   7. Autonomous Reality Synthesis (featured/wide)
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface Feature {
  id: string;
  label: string;
  title: string;
  description: string;
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
  span?: "wide" | "tall" | "normal";
  featured?: boolean;
}

/* Pre-computed coords for angles [0,60,120,180,240,300] at radius 16, center 20 */
const AI_COORDS = [
  { x: 36, y: 20 },
  { x: 28, y: 33.86 },
  { x: 12, y: 33.86 },
  { x: 4, y: 20 },
  { x: 12, y: 6.14 },
  { x: 28, y: 6.14 },
];

const AIIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1.5" />
    <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
    {AI_COORDS.map((c, i) => (
      <line
        key={i}
        x1="20" y1="20"
        x2={c.x}
        y2={c.y}
        stroke={color} strokeWidth="1" opacity="0.5"
      />
    ))}
    {AI_COORDS.map((c, i) => (
      <circle
        key={i}
        cx={c.x}
        cy={c.y}
        r="2" fill={color} opacity="0.7"
      />
    ))}
  </svg>
);

const QuantumIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <ellipse cx="20" cy="20" rx="16" ry="6" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <ellipse cx="20" cy="20" rx="16" ry="6" stroke={color} strokeWidth="1.2" opacity="0.6" transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="20" rx="16" ry="6" stroke={color} strokeWidth="1.2" opacity="0.6" transform="rotate(120 20 20)" />
    <circle cx="20" cy="20" r="3" fill={color} />
  </svg>
);

const NeuralIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 5 C10 5, 5 12, 8 20 C5 28, 10 35, 20 35 C30 35, 35 28, 32 20 C35 12, 30 5, 20 5Z" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    <line x1="12" y1="15" x2="20" y2="20" stroke={color} strokeWidth="1" />
    <line x1="28" y1="15" x2="20" y2="20" stroke={color} strokeWidth="1" />
    <line x1="12" y1="25" x2="20" y2="20" stroke={color} strokeWidth="1" />
    <line x1="28" y1="25" x2="20" y2="20" stroke={color} strokeWidth="1" />
    <line x1="20" y1="8" x2="20" y2="20" stroke={color} strokeWidth="1" />
    <circle cx="20" cy="20" r="2.5" fill={color} />
    {[[12, 15], [28, 15], [12, 25], [28, 25], [20, 8], [20, 32]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill={color} opacity="0.7" />
    ))}
  </svg>
);

const Web3Icon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <polygon points="20,4 36,14 36,26 20,36 4,26 4,14" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
    <polygon points="20,10 30,16 30,24 20,30 10,24 10,16" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    <circle cx="20" cy="20" r="3" fill={color} opacity="0.9" />
    {[[20, 4], [36, 14], [36, 26], [20, 36], [4, 26], [4, 14]].map(([cx, cy], i) => (
      <line key={i} x1={cx} y1={cy} x2="20" y2="20" stroke={color} strokeWidth="0.6" opacity="0.3" />
    ))}
  </svg>
);

const PhotonicIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="17" width="24" height="6" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    {[10, 14, 18, 22, 26, 30].map((x, i) => (
      <line key={i} x1={x} y1="4" x2={x + (i % 2 === 0 ? 2 : -2)} y2="36" stroke={color} strokeWidth="0.8" opacity={0.2 + i * 0.08} />
    ))}
    <circle cx="20" cy="20" r="2" fill={color} />
  </svg>
);

const BioDigitalIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 4 Q28 12, 20 20 Q12 28, 20 36" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M20 4 Q12 12, 20 20 Q28 28, 20 36" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
    {[8, 12, 16, 20, 24, 28, 32].map((y, i) => (
      <line key={i} x1={20 - 5} y1={y} x2={20 + 5} y2={y} stroke={color} strokeWidth="1" opacity="0.4" />
    ))}
    <circle cx="20" cy="20" r="2" fill={color} />
  </svg>
);

/* Pre-computed coords for angles [0,45,90,135,180,225,270,315] at radii 6 & 18, center 24 */
const SYNTH_INNER = [
  { x: 30, y: 24 },
  { x: 28.24, y: 28.24 },
  { x: 24, y: 30 },
  { x: 19.76, y: 28.24 },
  { x: 18, y: 24 },
  { x: 19.76, y: 19.76 },
  { x: 24, y: 18 },
  { x: 28.24, y: 19.76 },
];
const SYNTH_OUTER = [
  { x: 42, y: 24 },
  { x: 36.73, y: 36.73 },
  { x: 24, y: 42 },
  { x: 11.27, y: 36.73 },
  { x: 6, y: 24 },
  { x: 11.27, y: 11.27 },
  { x: 24, y: 6 },
  { x: 36.73, y: 11.27 },
];

const SynthesisIcon = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
    <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5" opacity="0.8" />
    <circle cx="24" cy="24" r="2.5" fill={color} />
    {SYNTH_INNER.map((inner, i) => (
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={SYNTH_OUTER[i].x}
        y2={SYNTH_OUTER[i].y}
        stroke={color} strokeWidth="0.7" opacity="0.35"
      />
    ))}
  </svg>
);

const getFeatures = (tItems: (key: string) => string): Feature[] => [
  {
    id: "agi",
    label: tItems("agi.label"),
    title: tItems("agi.title"),
    description: tItems("agi.description"),
    accentColor: "rgb(var(--emerald-neon))",
    glowColor: "rgba(var(--emerald-neon), 0.15)",
    icon: <AIIcon color="rgb(var(--emerald-neon))" />,
    span: "wide",
  },
  {
    id: "quantum",
    label: tItems("quantum.label"),
    title: tItems("quantum.title"),
    description: tItems("quantum.description"),
    accentColor: "rgb(var(--purple-electric))",
    glowColor: "rgba(var(--purple-electric), 0.15)",
    icon: <QuantumIcon color="rgb(var(--purple-electric))" />,
    span: "tall",
  },
  {
    id: "neural",
    label: tItems("neural.label"),
    title: tItems("neural.title"),
    description: tItems("neural.description"),
    accentColor: "rgb(var(--blue-neon))",
    glowColor: "rgba(var(--blue-neon), 0.15)",
    icon: <NeuralIcon color="rgb(var(--blue-neon))" />,
    span: "normal",
  },
  {
    id: "web3",
    label: tItems("web3.label"),
    title: tItems("web3.title"),
    description: tItems("web3.description"),
    accentColor: "rgb(var(--emerald-neon))",
    glowColor: "rgba(var(--emerald-neon), 0.15)",
    icon: <Web3Icon color="rgb(var(--emerald-neon))" />,
    span: "normal",
  },
  {
    id: "photonic",
    label: tItems("photonic.label"),
    title: tItems("photonic.title"),
    description: tItems("photonic.description"),
    accentColor: "rgb(var(--purple-electric))",
    glowColor: "rgba(var(--purple-electric), 0.15)",
    icon: <PhotonicIcon color="rgb(var(--purple-electric))" />,
    span: "normal",
  },
  {
    id: "bio",
    label: tItems("bio.label"),
    title: tItems("bio.title"),
    description: tItems("bio.description"),
    accentColor: "rgb(var(--blue-neon))",
    glowColor: "rgba(var(--blue-neon), 0.15)",
    icon: <BioDigitalIcon color="rgb(var(--blue-neon))" />,
    span: "normal",
  },
  {
    id: "synthesis",
    label: tItems("synthesis.label"),
    title: tItems("synthesis.title"),
    description: tItems("synthesis.description"),
    accentColor: "#00FF9D",
    glowColor: "rgba(0,255,157,0.15)",
    icon: <SynthesisIcon color="#00FF9D" />,
    span: "wide",
    featured: true,
  },
];

/* ── Card Component ── */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isTall = feature.span === "tall";
  const isFeatured = feature.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        feature-card glass rounded-[24px] p-8 
        ${isFeatured ? "md:col-span-2 lg:p-12" : "md:p-10"}
        ${isTall ? "row-span-2" : ""}
        group relative overflow-hidden backdrop-blur-3xl
      `}
      style={{
        background: `linear-gradient(135deg, ${feature.glowColor.replace(/[\d.]+\)$/g, '0.05)')} 0%, var(--card-bg) 100%)`,
        borderColor: "var(--card-border)",
      }}
      whileHover={{
        y: -8,
        scale: 1.01,
        boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${feature.glowColor.replace(/[\d.]+\)$/g, '0.2)')}`,
        borderColor: feature.accentColor + "40",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${feature.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Top row: label + icon */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <span
          className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
          style={{
            color: feature.accentColor,
            background: feature.glowColor,
            border: `1px solid ${feature.accentColor}30`,
          }}
        >
          {feature.label}
        </span>
        <div
          className="p-2 rounded-xl flex-shrink-0"
          style={{
            background: feature.glowColor,
            filter: `drop-shadow(0 0 12px ${feature.accentColor}60)`,
          }}
        >
          {feature.icon}
        </div>
      </div>

      {/* Title */}
      <h3
        className={`font-semibold tracking-tight leading-tight mb-4 relative z-10 transition-colors ${isFeatured ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        style={{ color: "var(--text-base)" }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className={`leading-relaxed relative z-10 transition-colors ${isFeatured ? "text-lg max-w-2xl" : "text-[15px]"
          }`}
        style={{ color: "var(--text-muted)" }}
      >
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.accentColor}80, transparent)`,
        }}
      />

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20"
        style={{
          background: `radial-gradient(circle at top right, ${feature.accentColor}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/* ── Section Component ── */
export default function FeaturesSection() {
  const t = useTranslations("Features");
  const tItems = useTranslations("Features.items");
  const FEATURES = getFeatures(tItems);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="features"
      className="relative py-28 md:py-36 bg-midnight-blue overflow-hidden"
      aria-label="Features — Technology Domains"
    >
      {/* Bg grid */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      {/* Top gradient fade from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 transition-colors"
        style={{ background: "linear-gradient(180deg, var(--void), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <span className="section-badge">{t("header.badge")}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight transition-colors" style={{ color: "var(--text-base)" }}>
              <span>{t("header.p1")}</span>
              <br />
              <span className="gradient-text-emerald">{t("header.p2")}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed md:text-right transition-colors" style={{ color: "var(--text-muted)" }}>
            {t("header.description")}
          </p>
        </motion.div>

        {/* ── Asymmetric Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature: Feature, i: number) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom horizon fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 transition-colors"
        style={{ background: "linear-gradient(180deg, var(--void), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
