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

/* ── SVG Icons ── */
const AIIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1.5" />
    <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <line
        key={i}
        x1="20" y1="20"
        x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
        y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
        stroke={color} strokeWidth="1" opacity="0.5"
      />
    ))}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <circle
        key={i}
        cx={20 + 16 * Math.cos((angle * Math.PI) / 180)}
        cy={20 + 16 * Math.sin((angle * Math.PI) / 180)}
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

const SynthesisIcon = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
    <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5" opacity="0.8" />
    <circle cx="24" cy="24" r="2.5" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1={24 + 6 * Math.cos((angle * Math.PI) / 180)}
        y1={24 + 6 * Math.sin((angle * Math.PI) / 180)}
        x2={24 + 18 * Math.cos((angle * Math.PI) / 180)}
        y2={24 + 18 * Math.sin((angle * Math.PI) / 180)}
        stroke={color} strokeWidth="0.7" opacity="0.35"
      />
    ))}
  </svg>
);

const FEATURES: Feature[] = [
  {
    id: "agi",
    label: "01 — AI",
    title: "Artificial General Intelligence",
    description: "Self-evolving neural architectures that reason, create, and adapt beyond human cognitive baselines. AGI isn't a destination — it's the departure point.",
    accentColor: "#00f3ff",
    glowColor: "rgba(0,243,255,0.15)",
    icon: <AIIcon color="#00f3ff" />,
    span: "wide",
  },
  {
    id: "quantum",
    label: "02 — QUANTUM",
    title: "Quantum Entanglement Computing",
    description: "Harness superposition and entanglement to solve computations that classical machines would take millennia to resolve.",
    accentColor: "#b026ff",
    glowColor: "rgba(176,38,255,0.12)",
    icon: <QuantumIcon color="#b026ff" />,
    span: "tall",
  },
  {
    id: "neural",
    label: "03 — NEURAL",
    title: "Neural Interface OS",
    description: "Direct brain-to-machine communication. Thought becomes command. Reality becomes programmable.",
    accentColor: "#00f3ff",
    glowColor: "rgba(0,243,255,0.1)",
    icon: <NeuralIcon color="#00f3ff" />,
    span: "normal",
  },
  {
    id: "web3",
    label: "04 — WEB3",
    title: "Decentralised Reality",
    description: "Ownership without intermediaries. Identity without borders. Economy without gatekeepers.",
    accentColor: "#ff6b00",
    glowColor: "rgba(255,107,0,0.12)",
    icon: <Web3Icon color="#ff6b00" />,
    span: "normal",
  },
  {
    id: "photonic",
    label: "05 — PHOTONIC",
    title: "Photonic Processing",
    description: "Light-speed data transmission through silicon photonics. Zero latency. Infinite bandwidth.",
    accentColor: "#b026ff",
    glowColor: "rgba(176,38,255,0.1)",
    icon: <PhotonicIcon color="#b026ff" />,
    span: "normal",
  },
  {
    id: "bio",
    label: "06 — BIO",
    title: "Bio-Digital Convergence",
    description: "The merger of biological and digital substrates. Living processors. Organic memory. Synthetic cognition.",
    accentColor: "#00f3ff",
    glowColor: "rgba(0,243,255,0.1)",
    icon: <BioDigitalIcon color="#00f3ff" />,
    span: "normal",
  },
  {
    id: "synthesis",
    label: "07 — SYNTHESIS",
    title: "Autonomous Reality Synthesis",
    description: "AI-generated persistent universes. Procedural physics. Worlds that evolve, adapt, and breathe without human intervention. The ultimate convergence of all preceding technologies into a single coherent experiential layer.",
    accentColor: "#ff6b00",
    glowColor: "rgba(255,107,0,0.15)",
    icon: <SynthesisIcon color="#ff6b00" />,
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
        feature-card glass rounded-2xl p-6 
        ${isFeatured ? "md:col-span-2 lg:p-8" : ""}
        ${isTall ? "row-span-2" : ""}
        group relative overflow-hidden
      `}
      style={{
        background: `linear-gradient(135deg, ${feature.glowColor} 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${feature.glowColor}`,
        borderColor: feature.accentColor + "50",
        transition: { duration: 0.3 }
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
          className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-sm"
          style={{
            color: feature.accentColor,
            background: feature.glowColor,
            border: `1px solid ${feature.accentColor}20`,
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
        className={`font-bold leading-tight mb-3 relative z-10 ${isFeatured ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        style={{ color: "rgba(255,255,255,0.92)" }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className={`text-white/45 leading-relaxed relative z-10 ${isFeatured ? "text-base max-w-2xl" : "text-sm"
          }`}
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
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(180deg, #050505, transparent)" }}
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
            <span className="section-badge">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Technology</span>
              <br />
              <span className="gradient-text-cyan">Stack</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed md:text-right">
            Seven paradigm-shifting technologies we master to deliver transformative solutions across industries and verticals.
          </p>
        </motion.div>

        {/* ── Asymmetric Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(0deg, #050505, transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
