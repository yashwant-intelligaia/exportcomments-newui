"use client";

import { cn } from "./cn";

export interface SegmentedOption<T extends string> {
    value: T;
    label: string;
}

/** Exclusive toggle group (replaces ToggleButtonGroup); selected segment is filled with ink. */
export function Segmented<T extends string>({
    value,
    options,
    onChange,
    disabled,
    ariaLabel,
}: {
    value: T;
    options: SegmentedOption<T>[];
    onChange: (value: T) => void;
    disabled?: boolean;
    ariaLabel?: string;
}) {
    return (
        <div role="group" aria-label={ariaLabel} className="inline-flex h-8 overflow-hidden rounded-pill border border-ink">
            {options.map((o) => (
                <button
                    key={o.value}
                    type="button"
                    aria-pressed={o.value === value}
                    disabled={disabled}
                    onClick={() => onChange(o.value)}
                    className={cn(
                        "px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                        o.value === value ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-surface-sunk"
                    )}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}
