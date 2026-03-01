"use client";

/**
 * Header — Floating Glassmorphism Navigation
 * ─────────────────────────────────────────────────────────────
 * UX FLOW:
 * • Starts transparent on page load (merges with the Hero void bg).
 * • After scrolling 60px it gains a glass backdrop (blur + border).
 * • The logo uses a gradient shimmer that plays on hover.
 * • Nav links have an animated underline indicator.
 * • A neon accent line runs below the entire header when scrolled.
 *
 * ANIMATION:
 * • scroll threshold → framer-motion opacity/blur transition
 * • Logo hover → gradient sweep
 * • Link hover → underline grows left-to-right via CSS pseudo-element
 * • "Launch App" CTA → cyberpunk clip-path button with glow on hover
 */

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Capabilities", href: "#features" },
  { label: "Contact", href: "#cta" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Subtle Y offset for parallax logo nudge
  const logoY = useTransform(scrollY, [0, 200], [0, -4]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "glass border-b border-glass-border py-3"
        : "bg-transparent py-5"
        }`}
    >
      {/* Neon accent line — appears when scrolled */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,157,0.5) 30%, rgba(176,38,255,0.5) 70%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* ── LOGO ── */}
        <motion.div style={{ y: logoY }}>
          <Link href="/" className="flex items-center gap-3 group" aria-label="Tech Boundary Imagines Home">
            {/* Abstract logo mark */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <motion.div
                className="absolute inset-0 rounded-sm border border-emerald-neon/50 group-hover:border-emerald-neon transition-colors duration-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[3px] rounded-sm border border-purple-electric/40 group-hover:border-purple-electric/70 transition-colors duration-300"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[7px] bg-emerald-neon/80 rounded-sm group-hover:bg-emerald-neon transition-colors duration-300 shadow-neon-emerald" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-mono text-emerald-neon/60 tracking-[0.22em] uppercase group-hover:text-emerald-neon/90 transition-colors duration-300">
                Tech Boundary
              </span>
              <span
                className="text-[15px] font-bold tracking-tight text-white group-hover:gradient-text-emerald transition-all duration-300"
              >
                Imagination
              </span>
            </div>
          </Link>
        </motion.div>

        {/* ── DESKTOP NAV ── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white/95 transition-colors duration-300 group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0.5 left-4 right-4 h-px bg-gradient-to-r from-emerald-neon to-purple-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ── CTA + MOBILE TOGGLE ── */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden md:block"
          >
            <button className="btn-cyber text-xs">
              Get Started
            </button>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-px bg-emerald-neon transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-4 h-px bg-emerald-neon/60 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-6 h-px bg-emerald-neon transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden glass-strong border-t border-glass-border"
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-medium text-white/70 hover:text-emerald-neon transition-colors duration-300 border-b border-glass-border last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <button className="btn-cyber mt-4 text-xs w-full">
            Get Started
          </button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
