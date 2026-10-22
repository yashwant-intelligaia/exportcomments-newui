"use client";

import { Children, ReactNode, useCallback, useEffect, useRef, useState, KeyboardEvent } from "react";

import { cn } from "./cn";

/**
 * Minimal looping carousel: one slide at a time, optional autoplay, dot navigation,
 * arrow-key control and touch swipe. Replaces react-responsive-carousel.
 */
export const Carousel = ({
    children,
    autoPlay = true,
    interval = 3000,
    className,
    label = "Carousel",
}: {
    children: ReactNode;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    label?: string;
}) => {
    const slides = Children.toArray(children);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchX = useRef<number | null>(null);
    const count = slides.length;

    const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

    useEffect(() => {
        if (!autoPlay || paused || count < 2) return undefined;
        const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
        return () => clearInterval(id);
    }, [autoPlay, paused, interval, count]);

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
    };

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
                touchX.current = null;
            }}
            className={cn("relative overflow-hidden", className)}
        >
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                {slides.map((slide, i) => (
                    <div key={i} className="w-full shrink-0" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== index}>
                        {slide}
                    </div>
                ))}
            </div>
            {count > 1 && (
                <div className="flex justify-center gap-1.5 pt-4 pb-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                            onClick={() => go(i)}
                            className={cn("size-2 rounded-full transition-colors", i === index ? "bg-ink" : "bg-ink/25")}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
