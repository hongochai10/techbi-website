import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--text-base)",
        void: "var(--void)",
        "midnight-blue": "var(--midnight)",
        "deep-navy": "#0A0F2A",
        emerald: {
          neon: "rgba(var(--emerald-neon), <alpha-value>)",
          dim: "#00cc7d",
          muted: "rgba(var(--emerald-neon), 0.15)",
        },
        blue: {
          deep: "#0033FF",
          neon: "#0055FF",
          muted: "rgba(0,51,255,0.15)",
        },
        cyan: {
          neon: "#00f3ff",
          dim: "#00c8d4",
          muted: "rgba(0,243,255,0.15)",
        },
        purple: {
          electric: "rgba(var(--purple-electric), <alpha-value>)",
          dim: "#8a1fcc",
          muted: "rgba(var(--purple-electric), 0.15)",
        },
        glass: "rgba(255,255,255,0.03)",
        "glass-border": "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-clash-display)", "var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(176,38,255,0.15) 0%, rgba(0,255,157,0.08) 40%, transparent 70%)",
        "noise-overlay": "url('/noise.png')",
        "grid-lines": "linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)",
        "mesh-fluid": "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "neon-emerald": "0 0 20px rgba(0,255,157,0.4), 0 0 60px rgba(0,255,157,0.15)",
        "neon-blue": "0 0 20px rgba(0,51,255,0.4), 0 0 60px rgba(0,51,255,0.15)",
        "neon-cyan": "0 0 20px rgba(0,243,255,0.4), 0 0 60px rgba(0,243,255,0.15)",
        "neon-purple": "0 0 20px rgba(176,38,255,0.4), 0 0 60px rgba(176,38,255,0.15)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,157,0.1)",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "border-flow": {
          "0%, 100%": { borderColor: "rgba(0,255,157,0.4)" },
          "50%": { borderColor: "rgba(0,51,255,0.4)" },
        },
        "particle-drift": {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(40px) scale(0)", opacity: "0" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "counter-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "fluid-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "scan-line": "scan-line 8s linear infinite",
        "border-flow": "border-flow 4s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "counter-rotate": "counter-rotate 15s linear infinite",
        "fluid-flow": "fluid-flow 15s ease infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
