"use client";

/**
 * TestimonialsSection — Client Testimonial Carousel
 * ──────────────────────────────────────────────────
 * Auto-rotating quotes with manual navigation dots.
 * Glassmorphism cards with accent borders.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    accent: string;
}

const getTestimonials = (tItems: (key: string) => string): Testimonial[] => [
    {
        id: "t1",
        quote: tItems("t1.quote"),
        author: tItems("t1.author"),
        role: tItems("t1.role"),
        company: tItems("t1.company"),
        accent: "rgb(var(--emerald-neon))",
    },
    {
        id: "t2",
        quote: tItems("t2.quote"),
        author: tItems("t2.author"),
        role: tItems("t2.role"),
        company: tItems("t2.company"),
        accent: "rgb(var(--purple-electric))",
    },
    {
        id: "t3",
        quote: tItems("t3.quote"),
        author: tItems("t3.author"),
        role: tItems("t3.role"),
        company: tItems("t3.company"),
        accent: "rgb(var(--blue-neon))",
    },
];

export default function TestimonialsSection() {
    const t = useTranslations("Testimonials");
    const tItems = useTranslations("Testimonials.items");
    const TESTIMONIALS = getTestimonials(tItems);

    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true });
    const [active, setActive] = useState(0);

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, [TESTIMONIALS.length]);

    // Auto-rotate every 6s
    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const currentTestimonial = TESTIMONIALS[active];

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
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(var(--purple-electric), 0.15) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Top fade */}
            <div
                className="absolute top-0 left-0 right-0 h-32 transition-colors"
                style={{ background: "linear-gradient(180deg, var(--void), transparent)" }}
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
                        {t("header.badge")}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 transition-colors" style={{ color: "var(--text-base)" }}>
                        <span>{t("header.p1")}</span>{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #b026ff, #00FF9D)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {t("header.p2")}
                        </span>
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative min-h-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial.id}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-strong rounded-2xl p-10 md:p-14 relative overflow-hidden"
                            style={{
                                borderLeft: `3px solid ${currentTestimonial.accent}`,
                            }}
                        >
                            {/* Background glow */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-30"
                                style={{
                                    background: `radial-gradient(ellipse 40% 50% at 0% 50%, rgba(var(${currentTestimonial.id === 't1' ? '--emerald-neon' : currentTestimonial.id === 't2' ? '--purple-electric' : '--blue-neon'}), 0.15) 0%, transparent 70%)`,
                                }}
                            />

                            {/* Quote mark */}
                            <div
                                className="text-6xl md:text-7xl font-serif leading-none mb-6 opacity-20"
                                style={{ color: currentTestimonial.accent }}
                            >
                                &ldquo;
                            </div>

                            {/* Quote text */}
                            <p className="text-lg md:text-xl leading-relaxed mb-10 relative z-10 transition-colors" style={{ color: "var(--text-base)" }}>
                                {currentTestimonial.quote}
                            </p>

                            {/* Author info */}
                            <div className="flex items-center gap-4 relative z-10">
                                {/* Avatar placeholder */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${currentTestimonial.accent}30, ${currentTestimonial.accent}10)`,
                                        border: `1px solid ${currentTestimonial.accent}40`,
                                        color: currentTestimonial.accent,
                                    }}
                                >
                                    {currentTestimonial.author.split(" ").map((n: string) => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm transition-colors" style={{ color: "var(--text-base)" }}>{currentTestimonial.author}</div>
                                    <div className="text-xs transition-colors" style={{ color: "var(--text-muted)" }}>
                                        {currentTestimonial.role}, {currentTestimonial.company}
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
                                : "bg-glass border border-glass-border hover:border-emerald-neon/40"
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
                className="absolute bottom-0 left-0 right-0 h-32 transition-colors"
                style={{ background: "linear-gradient(0deg, var(--void), transparent)" }}
                aria-hidden="true"
            />
        </section>
    );
}
