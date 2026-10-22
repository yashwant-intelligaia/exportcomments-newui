"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowScroll(window.scrollY > 100);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!showScroll) return null;
    return (
        <button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-5 bottom-5 z-[999] flex size-10 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink shadow-card transition-shadow hover:shadow-lg"
        >
            <ArrowUp className="size-5" />
        </button>
    );
};
