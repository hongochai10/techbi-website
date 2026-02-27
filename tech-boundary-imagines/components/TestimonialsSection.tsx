"use client";

/**
 * TestimonialsSection — Client Testimonial Carousel
 * ──────────────────────────────────────────────────
 * Auto-rotating quotes with manual navigation dots.
 * Glassmorphism cards with accent borders.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    accent: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: "t1",
        quote:
            "TechBI didn't just deliver a product — they architected a competitive advantage. Our platform now processes 10x the volume at half the cost. The engineering depth and strategic thinking are world-class.",
        author: "Sarah Chen",
        role: "CTO",
        company: "NovaPay Financial",
        accent: "#00f3ff",
    },
    {
        id: "t2",
        quote:
            "Working with TechBI felt like adding a senior engineering team overnight. Their AI diagnostic platform reduced our reporting cycle from weeks to hours, and their team understood healthcare compliance from day one.",
        author: "Dr. Marcus Rivera",
        role: "VP of Innovation",
        company: "MedCore Health Systems",
        accent: "#b026ff",
    },
    {
        id: "t3",
        quote:
            "From strategy to execution, TechBI is the real deal. They transformed our entire digital infrastructure — cloud migration, microservices, real-time analytics — all delivered ahead of schedule. Best tech partner we've ever had.",
        author: "James Whitfield",
        role: "CEO",
        company: "Vertex Commerce Group",
        accent: "#ff6b00",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true });
    const [active, setActive] = useState(0);

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    // Auto-rotate every 6s
    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const t = TESTIMONIALS[active];

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-28 md:py-36 bg-midnight-blue overflow-hidden"
            aria-label="Client Testimonials"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,38,255,0.05) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Top fade */}
            <div
                className="absolute top-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(180deg, #050505, transparent)" }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="section-badge mb-4 inline-flex" style={{ color: "#b026ff", borderColor: "rgba(176,38,255,0.3)", background: "rgba(176,38,255,0.06)" }}>
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4">
                        <span className="text-white">What Our</span>{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #b026ff, #00f3ff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Clients Say
                        </span>
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative min-h-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-strong rounded-2xl p-10 md:p-14 relative overflow-hidden"
                            style={{
                                borderLeft: `3px solid ${t.accent}`,
                            }}
                        >
                            {/* Background glow */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-30"
                                style={{
                                    background: `radial-gradient(ellipse 40% 50% at 0% 50%, ${t.accent}20 0%, transparent 70%)`,
                                }}
                            />

                            {/* Quote mark */}
                            <div
                                className="text-6xl md:text-7xl font-serif leading-none mb-6 opacity-20"
                                style={{ color: t.accent }}
                            >
                                &ldquo;
                            </div>

                            {/* Quote text */}
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 relative z-10">
                                {t.quote}
                            </p>

                            {/* Author info */}
                            <div className="flex items-center gap-4 relative z-10">
                                {/* Avatar placeholder */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${t.accent}30, ${t.accent}10)`,
                                        border: `1px solid ${t.accent}40`,
                                        color: t.accent,
                                    }}
                                >
                                    {t.author.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{t.author}</div>
                                    <div className="text-white/40 text-xs">
                                        {t.role}, {t.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            data-cursor-hover
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active
                                    ? "scale-125"
                                    : "bg-white/20 hover:bg-white/40"
                                }`}
                            style={
                                i === active
                                    ? {
                                        background: TESTIMONIALS[i].accent,
                                        boxShadow: `0 0 12px ${TESTIMONIALS[i].accent}80`,
                                    }
                                    : {}
                            }
                            aria-label={`Show testimonial ${i + 1}`}
                        />
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
