"use client";

/**
 * TrustBar — Infinite auto-scrolling client logo bar
 * ─────────────────────────────────────────────────────
 * Builds instant credibility with recognizable partner logos.
 * Uses CSS animation for smooth infinite scroll (no JS needed).
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Placeholder logos as SVG components ── */
const logos = [
    { name: "Nexus Corp", text: "NEXUS" },
    { name: "Quantum Labs", text: "QUANTUM" },
    { name: "Vertex AI", text: "VERTEX" },
    { name: "Prism Tech", text: "PRISM" },
    { name: "Helix Systems", text: "HELIX" },
    { name: "Orbit Cloud", text: "ORBIT" },
    { name: "Synapse IO", text: "SYNAPSE" },
    { name: "Cipher Security", text: "CIPHER" },
    { name: "Nova Finance", text: "NOVA" },
    { name: "Echo Health", text: "ECHO" },
];

function LogoItem({ name, text }: { name: string; text: string }) {
    return (
        <div
            className="flex-shrink-0 flex items-center gap-2 px-8 opacity-30 hover:opacity-70 transition-opacity duration-500"
            title={name}
        >
            {/* Abstract logo mark */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 transition-colors" style={{ stroke: "var(--text-base)", opacity: 0.4 }}>
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" fill="var(--cyan-neon)" opacity="0.5" />
            </svg>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase whitespace-nowrap font-mono transition-colors" style={{ color: "var(--text-base)", opacity: 0.5 }}>
                {text}
            </span>
        </div>
    );
}

export default function TrustBar() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            ref={ref}
            className="relative py-12 md:py-16 bg-void overflow-hidden border-y border-glass-border"
            aria-label="Trusted by leading companies"
        >
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
            >
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase transition-colors" style={{ color: "var(--text-base)", opacity: 0.3 }}>
                    Trusted by innovative companies worldwide
                </span>
            </motion.div>

            {/* Infinite scroll track */}
            <div className="relative">
                {/* Fade edges */}
                <div
                    className="absolute top-0 left-0 w-32 h-full pointer-events-none z-10 transition-colors"
                    style={{ background: "linear-gradient(90deg, var(--void), transparent)" }}
                />
                <div
                    className="absolute top-0 right-0 w-32 h-full pointer-events-none z-10 transition-colors"
                    style={{ background: "linear-gradient(-90deg, var(--void), transparent)" }}
                />

                {/* Scrolling track — duplicated for seamless loop */}
                <div className="flex animate-trust-scroll">
                    {[...logos, ...logos].map((logo, i) => (
                        <LogoItem key={`${logo.name}-${i}`} name={logo.name} text={logo.text} />
                    ))}
                </div>
            </div>
        </section>
    );
}
