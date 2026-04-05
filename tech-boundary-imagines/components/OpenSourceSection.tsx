"use client";

/**
 * OpenSourceSection — Showcase 3 Open Source Projects
 * ────────────────────────────────────────────────────
 * Grid of 3 cards, each with:
 *   • Project name + description + tag
 *   • Live Demo link + GitHub source link
 *   • Glassmorphism style matching other sections
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface OpenSourceProject {
  id: string;
  title: string;
  description: string;
  tag: string;
  demoUrl: string;
  githubUrl: string;
  accent: string;
  glow: string;
}

const getProjects = (tItems: (key: string) => string): OpenSourceProject[] => [
  {
    id: "crypto-timeline",
    title: tItems("cryptoTimeline.title"),
    description: tItems("cryptoTimeline.description"),
    tag: tItems("cryptoTimeline.tag"),
    demoUrl: "https://crypto-timeline.techbi.org/",
    githubUrl: "https://github.com/hongochai10/crypto-timeline",
    accent: "rgb(var(--emerald-neon))",
    glow: "rgba(var(--emerald-neon), 0.15)",
  },
  {
    id: "pqc-playground",
    title: tItems("pqcPlayground.title"),
    description: tItems("pqcPlayground.description"),
    tag: tItems("pqcPlayground.tag"),
    demoUrl: "https://pqc-playground.vercel.app/",
    githubUrl: "https://github.com/hongochai10/PQC-Playground",
    accent: "rgb(var(--purple-electric))",
    glow: "rgba(var(--purple-electric), 0.15)",
  },
  {
    id: "why-quantum-breaks-rsa",
    title: tItems("whyQuantumBreaksRSA.title"),
    description: tItems("whyQuantumBreaksRSA.description"),
    tag: tItems("whyQuantumBreaksRSA.tag"),
    demoUrl: "https://whyquantumbreaksrsa.techbi.org/",
    githubUrl: "https://github.com/hongochai10/Why-Quantum-Breaks-RSA",
    accent: "rgb(var(--blue-neon))",
    glow: "rgba(var(--blue-neon), 0.15)",
  },
];

function ProjectCard({ project, index, liveDemo, viewSource }: { project: OpenSourceProject; index: number; liveDemo: string; viewSource: string }) {
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
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(145deg, ${project.glow.replace(/[\d.]+\)$/g, "0.08)")} 0%, var(--card-bg) 100%)`,
        border: "1px solid var(--card-border)",
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 25px 70px rgba(0,0,0,0.6), 0 0 50px ${project.glow}`,
        borderColor: project.accent + "40",
        transition: { duration: 0.35 },
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Background glow blob */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${project.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
        {/* Tag badge */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{
              color: project.accent,
              background: project.glow,
              border: `1px solid ${project.accent}25`,
            }}
          >
            {project.tag}
          </span>
          {/* GitHub icon */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
            style={{
              color: "var(--text-muted)",
              background: project.glow.replace(/[\d.]+\)$/g, "0.1)"),
            }}
            aria-label={`GitHub — ${project.title}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold leading-tight mb-3 transition-colors"
          style={{ color: "var(--text-base)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-8 flex-1 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:gap-3"
            style={{ color: project.accent }}
            data-cursor-hover
          >
            {liveDemo}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase transition-opacity duration-300 opacity-60 hover:opacity-100"
            style={{ color: "var(--text-muted)" }}
            data-cursor-hover
          >
            {viewSource}
          </a>
        </div>
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function OpenSourceSection() {
  const t = useTranslations("OpenSource");
  const tItems = useTranslations("OpenSource.items");
  const PROJECTS = getProjects(tItems);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="open-source"
      className="relative py-28 md:py-36 bg-void overflow-hidden"
      aria-label="Open Source Projects"
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(var(--purple-electric), 0.1) 0%, transparent 70%)",
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
            <span className="section-badge">
              {t("header.badge")}
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors"
              style={{ color: "var(--text-base)" }}
            >
              <span>{t("header.p1")}</span>
              <br />
              <span className="gradient-text-warm">{t("header.p2")}</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed md:text-right transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            {t("header.description")}
          </p>
        </motion.div>

        {/* Project cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              liveDemo={t("liveDemo")}
              viewSource={t("viewSource")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
