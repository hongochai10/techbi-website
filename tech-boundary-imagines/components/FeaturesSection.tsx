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
 *   1. AI & Machine Learning
 *   2. Quantum Computing & PQC
 *   3. Cloud Native Architecture
 *   4. Data Engineering & Analytics
 *   5. Cybersecurity & Compliance
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

const CloudIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M10 28c-3.3 0-6-2.7-6-6s2.7-6 6-6c.5-4.4 4.2-8 8.8-8 4 0 7.3 2.6 8.4 6.2C28 13.5 29 13 30 13c3.3 0 6 2.7 6 6s-2.7 6-6 6H10z" stroke={color} strokeWidth="1.3" fill="none" opacity="0.6" />
    <circle cx="20" cy="22" r="2" fill={color} opacity="0.8" />
    <line x1="14" y1="22" x2="20" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <line x1="20" y1="22" x2="26" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <line x1="20" y1="17" x2="20" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const DataIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="6" y="24" width="6" height="12" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    <rect x="14" y="16" width="6" height="20" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
    <rect x="22" y="8" width="6" height="28" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
    <rect x="30" y="12" width="6" height="24" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.8" />
    <line x1="4" y1="36" x2="38" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

const SecurityIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 4 L34 10 V22 C34 30 28 36 20 38 C12 36 6 30 6 22 V10 L20 4Z" stroke={color} strokeWidth="1.3" fill="none" opacity="0.6" />
    <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
    <circle cx="20" cy="20" r="1.5" fill={color} opacity="0.9" />
    <line x1="20" y1="24" x2="20" y2="28" stroke={color} strokeWidth="1.2" opacity="0.5" />
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
    span: "normal",
  },
  {
    id: "cloud",
    label: tItems("cloud.label"),
    title: tItems("cloud.title"),
    description: tItems("cloud.description"),
    accentColor: "rgb(var(--blue-neon))",
    glowColor: "rgba(var(--blue-neon), 0.15)",
    icon: <CloudIcon color="rgb(var(--blue-neon))" />,
    span: "normal",
  },
  {
    id: "data",
    label: tItems("data.label"),
    title: tItems("data.title"),
    description: tItems("data.description"),
    accentColor: "rgb(var(--emerald-neon))",
    glowColor: "rgba(var(--emerald-neon), 0.15)",
    icon: <DataIcon color="rgb(var(--emerald-neon))" />,
    span: "normal",
  },
  {
    id: "security",
    label: tItems("security.label"),
    title: tItems("security.title"),
    description: tItems("security.description"),
    accentColor: "rgb(var(--purple-electric))",
    glowColor: "rgba(var(--purple-electric), 0.15)",
    icon: <SecurityIcon color="rgb(var(--purple-electric))" />,
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
