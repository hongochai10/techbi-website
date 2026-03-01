"use client";

import React from "react";

export function Logo({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-8 lg:h-9 drop-shadow-neon-emerald"
            >
                <defs>
                    <linearGradient id="primary-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(var(--emerald-neon))" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="rgb(var(--emerald-neon))" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(var(--blue-neon))" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="secondary-flow" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(var(--purple-electric))" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="rgb(var(--blue-deep))" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(var(--purple-electric))" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Shadow Layer for 3D depth */}
                <g opacity="0.4" transform="translate(1, 2)">
                    {/* Main Infinity Loop - Outer Track Shadow */}
                    <path
                        d="M 25 10 C 15 10, 10 15, 10 25 C 10 35, 15 40, 25 40 C 35 40, 40 30, 50 25 C 60 20, 65 10, 75 10 C 85 10, 90 15, 90 25 C 90 35, 85 40, 75 40 C 65 40, 60 30, 50 25"
                        stroke="black"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 25 10 C 35 10, 40 20, 50 25"
                        stroke="black"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 50 25 C 40 30, 35 40, 25 40"
                        stroke="black"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                </g>

                {/* Base Track (Subtle glowing background lane) */}
                <path
                    d="M 25 10 C 15 10, 10 15, 10 25 C 10 35, 15 40, 25 40 C 35 40, 40 30, 50 25 C 60 20, 65 10, 75 10 C 85 10, 90 15, 90 25 C 90 35, 85 40, 75 40 C 65 40, 60 30, 50 25 M 25 10 C 35 10, 40 20, 50 25 M 50 25 C 40 30, 35 40, 25 40"
                    stroke="rgba(var(--emerald-neon), 0.15)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Primary Circuit Path (Front overpass) */}
                <path
                    d="M 50 25 C 40 30, 35 40, 25 40 C 15 40, 10 35, 10 25 C 10 15, 15 10, 25 10 C 35 10, 40 20, 46 23.5"
                    stroke="url(#primary-flow)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Secondary Circuit Path (Back underpass) */}
                <path
                    d="M 25 10 C 35 10, 40 20, 50 25 C 60 30, 65 40, 75 40 C 85 40, 90 35, 90 25 C 90 15, 85 10, 75 10 C 65 10, 60 20, 54 23.5"
                    stroke="url(#secondary-flow)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                {/* Digital Nodes (Circuit Dots) */}
                {/* Left cluster */}
                <circle cx="20" cy="12" r="2.5" fill="rgb(var(--emerald-neon))" filter="url(#glow)" />
                <circle cx="12" cy="20" r="1.5" fill="rgb(var(--emerald-neon))" />
                <circle cx="15" cy="35" r="2" fill="rgb(var(--blue-neon))" />
                <circle cx="32" cy="14" r="1.5" fill="rgb(var(--emerald-neon))" />

                {/* Right cluster */}
                <circle cx="80" cy="12" r="2.5" fill="rgb(var(--purple-electric))" filter="url(#glow)" />
                <circle cx="88" cy="20" r="1.5" fill="rgb(var(--blue-deep))" />
                <circle cx="85" cy="35" r="2" fill="rgb(var(--purple-electric))" />
                <circle cx="68" cy="14" r="1.5" fill="rgb(var(--purple-electric))" />

                {/* Center connection nodes */}
                <circle cx="43" cy="21.5" r="1.2" fill="rgb(var(--emerald-neon))" />
                <circle cx="57" cy="28.5" r="1.2" fill="rgb(var(--blue-neon))" />

                {/* Inner Traces (Sharp circuit lines branching) */}
                {/* Left inside trace */}
                <path d="M 20 12 L 23 15 L 29 15 L 32 14" stroke="rgb(var(--emerald-neon))" strokeWidth="1" fill="none" opacity="0.7" />
                <path d="M 12 20 L 15 20 L 18 25 L 15 35" stroke="rgb(var(--blue-neon))" strokeWidth="1" fill="none" opacity="0.6" />

                {/* Right inside trace */}
                <path d="M 80 12 L 77 15 L 71 15 L 68 14" stroke="rgb(var(--purple-electric))" strokeWidth="1" fill="none" opacity="0.7" />
                <path d="M 88 20 L 85 20 L 82 25 L 85 35" stroke="rgb(var(--blue-deep))" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
            <div className="flex flex-col leading-none">
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase transition-colors duration-300 opacity-60" style={{ color: "var(--text-base)" }}>
                    Tech Boundary
                </span>
                <span
                    className="text-base font-bold tracking-tight transition-all duration-300"
                    style={{ color: "var(--text-base)" }}
                >
                    Imagination
                </span>
            </div>
        </div>
    );
}
