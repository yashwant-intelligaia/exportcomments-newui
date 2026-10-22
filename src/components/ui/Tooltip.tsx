import { ReactNode } from "react";

import { cn } from "./cn";

/** CSS-only tooltip: shows on hover and keyboard focus of the wrapped element. */
export const Tooltip = ({
    title,
    placement = "top",
    className,
    children,
}: {
    title?: ReactNode;
    placement?: "top" | "bottom";
    className?: string;
    children: ReactNode;
}) => {
    if (!title) return <>{children}</>;
    return (
        <span className={cn("group/tip relative inline-flex", className)}>
            {children}
            <span
                role="tooltip"
                className={cn(
                    "bg-ink pointer-events-none absolute left-1/2 z-[70] hidden max-w-xs -translate-x-1/2 rounded-sm px-2 py-1 text-xs font-normal text-white group-focus-within/tip:block group-hover/tip:block",
                    placement === "top" ? "bottom-full mb-1" : "top-full mt-1",
                )}
            >
                {title}
            </span>
        </span>
    );
};
