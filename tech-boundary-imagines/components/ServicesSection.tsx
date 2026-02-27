"use client";

/**
 * ServicesSection — 6 Core Digital Transformation Services
 * ─────────────────────────────────────────────────────────
 * 3×2 grid of glassmorphism cards with animated SVG icons,
 * hover effects, and scroll-triggered staggered entrance.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
    accent: string;
    glow: string;
    icon: React.ReactNode;
}

/* ── SVG Icons ── */
const AIMLIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="8" stroke={color} strokeWidth="1.5" />
        <circle cx="22" cy="22" r="3" fill={color} opacity="0.8" />
        <path d="M22 6v6M22 32v6M6 22h6M32 22h6" stroke={color} strokeWidth="1" opacity="0.4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <circle
                key={i}
                cx={22 + 14 * Math.cos((a * Math.PI) / 180)}
                cy={22 + 14 * Math.sin((a * Math.PI) / 180)}
                r="1.5" fill={color} opacity="0.5"
            />
        ))}
    </svg>
);

const CloudIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M12 30a8 8 0 01-1-16 10 10 0 0119-3 6 6 0 014 11H12z" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
        <line x1="16" y1="34" x2="16" y2="38" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <line x1="22" y1="34" x2="22" y2="40" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <line x1="28" y1="34" x2="28" y2="37" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
    </svg>
);

const CodeIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <polyline points="14,16 6,22 14,28" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="30,16 38,22 30,28" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="12" x2="20" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const DataIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        {[8, 14, 20, 26, 32, 38].map((x, i) => {
            const h = [16, 24, 12, 28, 20, 22][i];
            return (
                <rect key={i} x={x - 2} y={44 - 6 - h} width="4" rx="1" height={h} fill={color} opacity={0.3 + i * 0.1} />
            );
        })}
        <line x1="4" y1="38" x2="40" y2="38" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
);

const StrategyIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="16" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
        <circle cx="22" cy="22" r="10" stroke={color} strokeWidth="1.2" opacity="0.5" />
        <circle cx="22" cy="22" r="4" fill={color} opacity="0.8" />
        <path d="M22 6v6M22 32v6M6 22h6M32 22h6" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
);

const SecurityIcon = ({ color }: { color: string }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M22 4L6 12v10c0 10 7 18 16 20 9-2 16-10 16-20V12L22 4z" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
        <polyline points="16,22 20,26 28,18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SERVICES: Service[] = [
    {
        id: "ai-ml",
        number: "01",
        title: "AI & Machine Learning",
        description:
            "Intelligent automation, predictive analytics, and natural language processing solutions that transform raw data into strategic business advantage.",
        accent: "#00f3ff",
        glow: "rgba(0,243,255,0.12)",
        icon: <AIMLIcon color="#00f3ff" />,
    },
    {
        id: "cloud",
        number: "02",
        title: "Cloud Architecture",
        description:
            "Multi-cloud, serverless, and Kubernetes orchestration strategies. We design infrastructure that scales infinitely while optimizing cost.",
        accent: "#b026ff",
        glow: "rgba(176,38,255,0.12)",
        icon: <CloudIcon color="#b026ff" />,
    },
    {
        id: "software",
        number: "03",
        title: "Custom Software Development",
        description:
            "Full-stack engineering with microservices, event-driven architectures, and real-time systems. Built to perform at enterprise scale.",
        accent: "#ff6b00",
        glow: "rgba(255,107,0,0.12)",
        icon: <CodeIcon color="#ff6b00" />,
    },
    {
        id: "data",
        number: "04",
        title: "Data Analytics & BI",
        description:
            "End-to-end data pipelines, interactive dashboards, and decision intelligence platforms that turn complexity into clarity.",
        accent: "#00f3ff",
        glow: "rgba(0,243,255,0.10)",
        icon: <DataIcon color="#00f3ff" />,
    },
    {
        id: "strategy",
        number: "05",
        title: "Digital Strategy Consulting",
        description:
            "Technology roadmapping, process optimization, and organizational change management for enterprises navigating digital transformation.",
        accent: "#b026ff",
        glow: "rgba(176,38,255,0.10)",
        icon: <StrategyIcon color="#b026ff" />,
    },
    {
        id: "security",
        number: "06",
        title: "Cybersecurity",
        description:
            "Zero-trust architecture, threat intelligence, penetration testing, and regulatory compliance. Protecting your digital frontier.",
        accent: "#ff6b00",
        glow: "rgba(255,107,0,0.10)",
        icon: <SecurityIcon color="#ff6b00" />,
    },
];

/* ── Service Card ── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="feature-card glass rounded-2xl p-7 group relative overflow-hidden"
            style={{
                background: `linear-gradient(145deg, ${service.glow} 0%, rgba(255,255,255,0.02) 100%)`,
                border: "1px solid rgba(255,255,255,0.07)",
            }}
            whileHover={{
                y: -6,
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${service.glow}`,
                borderColor: service.accent + "50",
                transition: { duration: 0.3 },
            }}
        >
            {/* Hover glow overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${service.glow} 0%, transparent 60%)`,
                }}
            />

            {/* Top: number + icon */}
            <div className="flex items-start justify-between mb-6 relative z-10">
                <span
                    className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm"
                    style={{
                        color: service.accent,
                        background: service.glow,
                        border: `1px solid ${service.accent}20`,
                    }}
                >
                    {service.number}
                </span>
                <div
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{
                        background: service.glow,
                        filter: `drop-shadow(0 0 12px ${service.accent}60)`,
                    }}
                >
                    {service.icon}
                </div>
            </div>

            {/* Title */}
            <h3
                className="text-xl font-bold leading-tight mb-3 relative z-10"
                style={{ color: "rgba(255,255,255,0.92)" }}
            >
                {service.title}
            </h3>

            {/* Description */}
            <p className="text-white/40 text-sm leading-relaxed relative z-10 mb-5">
                {service.description}
            </p>

            {/* CTA link */}
            <button
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:gap-3 relative z-10"
                style={{ color: service.accent }}
                data-cursor-hover
            >
                Learn More
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

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${service.accent}80, transparent)`,
                }}
            />

            {/* Corner decoration */}
            <div
                className="absolute top-0 right-0 w-20 h-20 opacity-15"
                style={{
                    background: `radial-gradient(circle at top right, ${service.accent}, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}

/* ── Section ── */
export default function ServicesSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true });

    return (
        <section
            id="services"
            className="relative py-28 md:py-36 bg-midnight-blue overflow-hidden"
            aria-label="Services — Digital Transformation Solutions"
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

            {/* Top fade */}
            <div
                className="absolute top-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(180deg, #050505, transparent)" }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div className="flex flex-col gap-4">
                        <span className="section-badge">Our Services</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-white">Digital Transformation</span>
                            <br />
                            <span className="gradient-text-cyan">Solutions</span>
                        </h2>
                    </div>
                    <p className="text-white/40 max-w-sm text-sm leading-relaxed md:text-right">
                        End-to-end technology services that accelerate innovation,
                        optimize operations, and create measurable business impact.
                    </p>
                </motion.div>

                {/* 3×2 Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    style={{
                        display: "grid",
                        gap: "1.25rem",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    }}
                >
                    {SERVICES.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
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
