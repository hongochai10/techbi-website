"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "vi" : "en";
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="p-2 mr-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur text-xs font-mono font-semibold uppercase hover:bg-white/10 dark:hover:bg-white/5 transition-all outline-none"
            aria-label="Toggle language"
        >
            {locale}
        </button>
    );
}
