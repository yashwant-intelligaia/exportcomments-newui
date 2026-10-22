"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "./cn";

export interface PopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    /** Where the popover sits relative to the anchor. */
    placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end" | "right-start";
    className?: string;
    children: ReactNode;
}

/** Anchored floating panel (portal, click-outside + Escape to close, viewport clamped). */
export const Popover = ({ open, anchorEl, onClose, placement = "bottom-start", className, children }: PopoverProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    useLayoutEffect(() => {
        if (!open || !anchorEl || !ref.current) return;
        const a = anchorEl.getBoundingClientRect();
        const p = ref.current.getBoundingClientRect();
        let top = placement.startsWith("top") ? a.top - p.height - 4 : a.bottom + 4;
        let left = placement.endsWith("end") ? a.right - p.width : a.left;
        if (placement === "right-start") {
            top = a.top;
            left = a.right + 4;
        }
        left = Math.max(8, Math.min(left, window.innerWidth - p.width - 8));
        top = Math.max(8, Math.min(top, window.innerHeight - p.height - 8));
        setPos({ top, left });
    }, [open, anchorEl, placement, children]);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node) && !anchorEl?.contains(e.target as Node)) onClose();
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open, anchorEl, onClose]);

    useEffect(() => {
        if (!open) setPos(null);
    }, [open]);

    if (!open || typeof document === "undefined") return null;
    return createPortal(
        <div
            ref={ref}
            style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, visibility: pos ? "visible" : "hidden" }}
            className={cn("border-line bg-surface shadow-card fixed z-[60] min-w-40 rounded-md border", className)}
        >
            {children}
        </div>,
        document.body,
    );
};

export const Menu = ({ className, children, ...rest }: PopoverProps) => (
    <Popover className={cn("py-1", className)} {...rest}>
        <ul role="menu">{children}</ul>
    </Popover>
);

export const MenuItem = ({
    onClick,
    disabled,
    selected,
    className,
    children,
}: {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    selected?: boolean;
    className?: string;
    children: ReactNode;
}) => (
    <li role="menuitem">
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "text-ink hover:bg-surface-sunk flex w-full items-center gap-2 px-4 py-2 text-left text-sm disabled:opacity-50",
                selected && "bg-surface-sunk font-semibold",
                className,
            )}
        >
            {children}
        </button>
    </li>
);
