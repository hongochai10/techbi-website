"use client";

/**
 * CaseStudiesSection — 3 Featured Client Success Stories
 * ───────────────────────────────────────────────────────
 * Large cards with gradient backgrounds, key metrics,
 * industry badges, and hover glassmorphism overlay.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CaseStudy {
    id: string;
    industry: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    accent: string;
    glow: string;
    gradient: string;
}

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "fintech",
        industry: "FinTech",
        title: "Next-Gen Payment Processing Platform",
        description:
            "Architected a microservices-based payment gateway handling 50M+ daily transactions with sub-100ms latency. Migrated from monolith to event-driven architecture on Kubernetes.",
        metric: "300%",
        metricLabel: "Processing Speed Increase",
        accent: "#00FF9D",
        glow: "rgba(0,255,157,0.15)",
        gradient: "linear-gradient(145deg, rgba(0,255,157,0.08) 0%, rgba(10,15,42,0.95) 100%)",
    },
    {
        id: "healthcare",
        industry: "Healthcare AI",
        title: "AI-Powered Diagnostic Intelligence",
        description:
            "Built a deep learning diagnostic platform that analyzes medical imaging with 97.3% accuracy. Integrated with hospital EHR systems across 200+ facilities nationwide.",
        metric: "85%",
        metricLabel: "Reduction in Diagnostic Time",
        accent: "#b026ff",
        glow: "rgba(176,38,255,0.15)",
        gradient: "linear-gradient(145deg, rgba(176,38,255,0.08) 0%, rgba(10,15,42,0.95) 100%)",
    },
    {
        id: "ecommerce",
        industry: "E-Commerce",
        title: "Enterprise Commerce Transformation",
        description:
            "End-to-end digital transformation of a Fortune 500 retail platform. Real-time inventory, AI recommendations, and omnichannel orchestration serving 12M monthly active users.",
        metric: "$2.4M",
        metricLabel: "Additional Revenue in 6 Months",
        accent: "#0055FF",
        glow: "rgba(0,85,255,0.15)",
        gradient: "linear-gradient(145deg, rgba(0,85,255,0.08) 0%, rgba(10,15,42,0.95) 100%)",
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
                background: study.gradient,
                border: "1px solid rgba(255,255,255,0.07)",
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
                            background: `linear-gradient(135deg, ${study.accent}, rgba(255,255,255,0.8))`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {study.metric}
                    </span>
                    <span className="text-xs text-white/40 tracking-widest uppercase font-mono">
                        {study.metricLabel}
                    </span>
                </div>

                {/* Title + description at bottom */}
                <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-3">
                        {study.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-lg">
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
                        "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,255,157,0.04) 0%, transparent 70%)",
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
                            Case Studies
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-white">Proven</span>
                            <br />
                            <span className="gradient-text-warm">Results</span>
                        </h2>
                    </div>
                    <p className="text-white/40 max-w-sm text-sm leading-relaxed md:text-right">
                        Real projects. Measurable impact. We deliver transformation
                        that moves the needle for enterprise clients.
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
                    {CASE_STUDIES.map((study, i) => (
                        <CaseStudyCard key={study.id} study={study} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
