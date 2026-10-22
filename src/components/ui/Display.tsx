import { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

const hues = ["bg-blue-soft text-blue-ink", "bg-purple-soft text-purple-ink", "bg-mint text-ink", "bg-yellow text-ink"];

export const Avatar = ({
    src,
    name = "",
    size = 32,
    className,
}: {
    src?: string;
    name?: string;
    size?: number;
    className?: string;
}) => {
    const initial = name.trim().charAt(0).toUpperCase();
    const hue = hues[(name.charCodeAt(0) || 0) % hues.length];
    return src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={name}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            className={cn("rounded-full object-cover", className)}
        />
    ) : (
        <span
            style={{ width: size, height: size, fontSize: size * 0.42 }}
            className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
                hue,
                className,
            )}
        >
            {initial}
        </span>
    );
};

export const Chip = ({
    label,
    className,
    onDelete,
}: {
    label: ReactNode;
    className?: string;
    onDelete?: () => void;
}) => (
    <span
        className={cn(
            "rounded-pill bg-surface-sunk text-ink inline-flex items-center gap-1 px-3 py-1 text-xs",
            className,
        )}
    >
        {label}
        {onDelete && (
            <button type="button" aria-label="remove" onClick={onDelete} className="text-muted hover:text-ink">
                ×
            </button>
        )}
    </span>
);

export const Divider = ({ className }: { className?: string }) => (
    <hr className={cn("border-line border-0 border-t", className)} />
);

export const Card = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("bg-surface shadow-card rounded-lg", className)} {...rest} />
);

/** Overlapping avatars; extra children beyond `max` collapse to a "+N" bubble. */
export const AvatarGroup = ({ max = 4, size = 24, children }: { max?: number; size?: number; children: ReactNode }) => {
    const items = Array.isArray(children) ? children : [children];
    const shown = items.slice(0, max);
    const extra = items.length - shown.length;
    return (
        <div className="inline-flex -space-x-2">
            {shown.map((child, i) => (
                <span key={i} className="ring-surface inline-flex rounded-full ring-2">
                    {child}
                </span>
            ))}
            {extra > 0 && (
                <span
                    style={{ width: size, height: size, fontSize: size * 0.4 }}
                    className="bg-surface-sunk text-ink ring-surface inline-flex items-center justify-center rounded-full ring-2"
                >
                    +{extra}
                </span>
            )}
        </div>
    );
};
