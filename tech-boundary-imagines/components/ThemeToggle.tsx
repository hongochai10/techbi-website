"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render a placeholder with the same dimensions to avoid layout shift
        return <div className="w-10 h-10" aria-hidden="true" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 glass border border-glass-border rounded-lg flex items-center justify-center hover:text-emerald-neon hover:border-emerald-neon/40 hover:shadow-neon-emerald transition-all duration-300 relative overflow-hidden opacity-70 hover:opacity-100"
            style={{ color: "var(--text-base)" }}
            aria-label="Toggle theme"
            data-cursor-hover
        >
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === "dark" ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                    }`}
            />
            <Moon
                className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
