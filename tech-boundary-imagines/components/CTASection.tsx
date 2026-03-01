"use client";

/**
 * CTASection — Full-width conversion-focused call-to-action
 * ──────────────────────────────────────────────────────────
 * Dramatic gradient background with particle-like dot pattern,
 * compelling headline, and dual CTA buttons.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CTASection() {
    const t = useTranslations("CTA");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            ref={ref}
            id="cta"
            className="relative py-28 md:py-40 overflow-hidden"
            aria-label="Call to Action"
        >
            {/* Dramatic gradient background */}
            <div
                className="absolute inset-0 transition-colors"
                style={{
                    background:
                        "linear-gradient(135deg, var(--void) 0%, var(--midnight) 30%, var(--card-bg) 50%, var(--midnight) 70%, var(--void) 100%)",
                }}
            />

            {/* Central glow orb */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(var(--emerald-neon), 0.15) 0%, rgba(var(--purple-electric), 0.10) 40%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Grid lines */}
            <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />

            {/* Scan line */}
            <div className="scan-line-overlay" aria-hidden="true" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="section-badge inline-flex mb-8">
                        {t("badge")}
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 transition-colors"
                    style={{ color: "var(--text-base)" }}
                >
                    <span>{t("p1")} </span>
                    <span
                        style={{
                            background: "linear-gradient(135deg, #00FF9D 0%, #b026ff 50%, #0055FF 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {t("p2")}
                    </span>
                    <br />
                    <span> {t("p3")}</span>
                </motion.h2>

                {/* Sub-heading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-colors"
                    style={{ color: "var(--text-muted)" }}
                >
                    {t("description")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="btn-cyber" data-cursor-hover>
                        <span className="relative z-10 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M2 6l6 3.5L14 6" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            {t("button1")}
                        </span>
                    </button>
                    <button className="btn-cyber-secondary" data-cursor-hover>
                        <span className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                    d="M2 7h10M7 2l5 5-5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {t("button2")}
                        </span>
                    </button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-14 flex flex-wrap justify-center gap-8"
                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}
                >
                    {[
                        { value: t("stats.s1.value"), label: t("stats.s1.label") },
                        { value: t("stats.s2.value"), label: t("stats.s2.label") },
                        { value: t("stats.s3.value"), label: t("stats.s3.label") },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold font-mono gradient-text-emerald">
                                {stat.value}
                            </span>
                            <span className="text-[10px] tracking-widest uppercase font-mono transition-colors opacity-40" style={{ color: "var(--text-base)" }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Decorative corner glows */}
            <div
                className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at top left, rgba(var(--emerald-neon), 0.10), transparent 60%)",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at bottom right, rgba(var(--purple-electric), 0.10), transparent 60%)",
                }}
                aria-hidden="true"
            />
        </section>
    );
}
