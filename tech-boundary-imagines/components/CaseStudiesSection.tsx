"use client";

/**
 * CaseStudiesSection — 3 Featured Client Success Stories
 * ───────────────────────────────────────────────────────
 * Large cards with gradient backgrounds, key metrics,
 * industry badges, and hover glassmorphism overlay.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface CaseStudy {
    id: string;
    industry: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    accent: string;
    glow: string;
}

const getCaseStudies = (tItems: (key: string) => string): CaseStudy[] => [
    {
        id: "fintech",
        industry: tItems("fintech.industry"),
        title: tItems("fintech.title"),
        description: tItems("fintech.description"),
        metric: "300%",
        metricLabel: tItems("fintech.metricLabel"),
        accent: "rgb(var(--emerald-neon))",
        glow: "rgba(var(--emerald-neon), 0.15)",
    },
    {
        id: "healthcare",
        industry: tItems("healthcare.industry"),
        title: tItems("healthcare.title"),
        description: tItems("healthcare.description"),
        metric: "85%",
        metricLabel: tItems("healthcare.metricLabel"),
        accent: "rgb(var(--purple-electric))",
        glow: "rgba(var(--purple-electric), 0.15)",
    },
    {
        id: "ecommerce",
        industry: tItems("ecommerce.industry"),
        title: tItems("ecommerce.title"),
        description: tItems("ecommerce.description"),
        metric: "$2.4M",
        metricLabel: tItems("ecommerce.metricLabel"),
        accent: "rgb(var(--blue-neon))",
        glow: "rgba(var(--blue-neon), 0.15)",
    },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative rounded-2xl overflow-hidden"
            style={{
                background: `linear-gradient(145deg, ${study.glow.replace(/[\d.]+\)$/g, '0.08)')} 0%, var(--card-bg) 100%)`,
                border: "1px solid var(--card-border)",
                minHeight: "380px",
            }}
            whileHover={{
                y: -8,
                boxShadow: `0 25px 70px rgba(0,0,0,0.6), 0 0 50px ${study.glow}`,
                borderColor: study.accent + "40",
                transition: { duration: 0.35 },
            }}
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            {/* Background glow blob */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${study.glow} 0%, transparent 70%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-8 lg:p-10">
                {/* Top: industry badge + metric */}
                <div className="flex items-start justify-between mb-8">
                    <span
                        className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                        style={{
                            color: study.accent,
                            background: study.glow,
                            border: `1px solid ${study.accent}25`,
                        }}
                    >
                        {study.industry}
                    </span>
                </div>

                {/* Metric hero */}
                <div className="mb-6">
                    <span
                        className="text-5xl md:text-6xl font-bold font-mono block mb-1"
                        style={{
                            background: `linear-gradient(135deg, ${study.accent}, var(--text-base))`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {study.metric}
                    </span>
                    <span className="text-xs tracking-widest uppercase font-mono transition-colors" style={{ color: "var(--text-muted)" }}>
                        {study.metricLabel}
                    </span>
                </div>

                {/* Title + description at bottom */}
                <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 transition-colors" style={{ color: "var(--text-base)" }}>
                        {study.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5 max-w-lg transition-colors" style={{ color: "var(--text-muted)" }}>
                        {study.description}
                    </p>
                    <button
                        className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:gap-3"
                        style={{ color: study.accent }}
                        data-cursor-hover
                    >
                        Read Case Study
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M2 7h10M7 2l5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Hover accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${study.accent}, transparent)`,
                }}
            />
        </motion.div>
    );
}

export default function CaseStudiesSection() {
    const t = useTranslations("CaseStudies");
    const tItems = useTranslations("CaseStudies.items");
    const CASE_STUDIES = getCaseStudies(tItems);

    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });

    return (
        <section
            id="case-studies"
            className="relative py-28 md:py-36 bg-void overflow-hidden"
            aria-label="Case Studies — Proven Results"
        >
            {/* Atmosphere */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(var(--emerald-neon), 0.15) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div className="flex flex-col gap-4">
                        <span
                            className="section-badge"
                            style={{
                                color: "#0055FF",
                                borderColor: "rgba(0,85,255,0.3)",
                                background: "rgba(0,85,255,0.06)",
                            }}
                        >
                            {t("header.badge")}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors" style={{ color: "var(--text-base)" }}>
                            <span>{t("header.p1")}</span>
                            <br />
                            <span className="gradient-text-warm">{t("header.p2")}</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed md:text-right transition-colors" style={{ color: "var(--text-muted)" }}>
                        {t("header.description")}
                    </p>
                </motion.div>

                {/* Case study cards */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                    style={{
                        display: "grid",
                        gap: "1.25rem",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    }}
                >
                    {CASE_STUDIES.map((study: CaseStudy, i: number) => (
                        <CaseStudyCard key={study.id} study={study} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
