"use client";

/**
 * Footer — Minimalist Sci-Fi Grid Footer
 * ─────────────────────────────────────────────────────────────
 * LAYOUT:
 *   ┌────────────────────────────────────────────┐
 *   │  [Logo + tagline]       [4-col link grid]  │
 *   │                                            │
 *   │  [Newsletter input]     [Social icons]     │
 *   ├────────────────────────────────────────────┤
 *   │  © 2025  ·  Privacy  ·  Terms  ·  Contact  │
 *   └────────────────────────────────────────────┘
 *
 * Background: bg-midnight-blue with faint bg-grid lines.
 * Top border: full-width neon gradient divider line.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: ["AI & ML", "Cloud Architecture", "Custom Software", "Data Analytics", "Digital Strategy", "Cybersecurity"],
  },
  {
    heading: "Company",
    links: ["About Us", "Case Studies", "Careers", "Press"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Documentation", "Open Source", "Events"],
  },
  {
    heading: "Connect",
    links: ["Contact Us", "Partnership", "Support", "Schedule Demo"],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      id="footer"
      className="relative bg-midnight-blue overflow-hidden"
      aria-label="Footer"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      {/* Top neon divider */}
      <div className="divider-gradient" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 max-w-sm"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <div className="absolute inset-0 rounded-sm border border-emerald-neon/40 animate-rotate-slow" />
                <div className="absolute inset-[3px] rounded-sm border border-purple-electric/35 animate-counter-rotate" />
                <div className="absolute inset-[7px] bg-emerald-neon/80 rounded-sm shadow-neon-emerald" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-mono text-emerald-neon/60 tracking-[0.24em] uppercase">Tech Boundary</span>
                <span
                  className="text-base font-bold tracking-tight text-white"
                >
                  Imagination
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed transition-colors" style={{ color: "var(--text-muted)" }}>
              A leading digital transformation company architecting the future of enterprise technology. From strategy to deployment — we build what moves businesses forward.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-widest uppercase font-mono transition-colors opacity-60" style={{ color: "var(--text-base)" }} htmlFor="newsletter-email">
                Join the Frontier
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@thefuture.com"
                  className="flex-1 bg-glass border border-glass-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-neon/50 transition-colors duration-300"
                  style={{ backdropFilter: "blur(10px)", color: "var(--text-base)" }}
                />
                <button className="btn-cyber text-xs px-5 py-2.5" data-cursor-hover>
                  →
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 glass border border-glass-border rounded-lg flex items-center justify-center hover:border-emerald-neon/40 hover:shadow-neon-emerald transition-all duration-300"
                  style={{ color: "var(--text-muted)" }}
                  data-cursor-hover
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right — Link Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h4 className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase transition-colors opacity-60" style={{ color: "var(--text-base)" }}>
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm hover:opacity-100 transition-opacity duration-300"
                        style={{ color: "var(--text-muted)", opacity: 0.8 }}
                        data-cursor-hover
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gradient mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono transition-colors opacity-40" style={{ color: "var(--text-base)" }}>
            © 2025 Tech Boundary Imagination. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs transition-opacity duration-300 font-mono hover:opacity-100"
                style={{ color: "var(--text-muted)", opacity: 0.6 }}
                data-cursor-hover
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Corner glow decoration */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(0,255,157,0.04), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom right, rgba(176,38,255,0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </footer>
  );
}
