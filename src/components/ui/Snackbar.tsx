"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";

import { cn } from "./cn";

export type Severity = "success" | "error" | "info" | "warning";

const icons = { success: CheckCircle2, error: AlertCircle, info: Info, warning: AlertCircle };
const tones: Record<Severity, string> = {
    success: "bg-mint text-ink",
    error: "bg-danger-soft text-danger",
    info: "bg-blue-soft text-blue-ink",
    warning: "bg-yellow/30 text-ink",
};

export const Snackbar = ({
    open,
    onClose,
    duration = 4000,
    severity = "success",
    title,
    message,
}: {
    open: boolean;
    onClose: () => void;
    duration?: number;
    severity?: Severity;
    title?: string;
    message: string;
}) => {
    useEffect(() => {
        if (!open) return;
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [open, duration, onClose]);

    if (!open) return null;
    const Icon = icons[severity];
    return (
        <div
            role="alert"
            className={cn(
                "shadow-card fixed bottom-6 left-1/2 z-[80] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-md p-4",
                tones[severity],
            )}
        >
            <Icon className="mt-0.5 size-5 shrink-0" />
            <div className="min-w-0 flex-1 text-sm">
                {title && <p className="font-semibold">{title}</p>}
                <p>{message}</p>
            </div>
            <button aria-label="close" onClick={onClose} className="hover:bg-ink/10 rounded-full p-0.5">
                <X className="size-4" />
            </button>
        </div>
    );
};
