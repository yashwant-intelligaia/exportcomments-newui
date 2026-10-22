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
        <img src={src} alt={name} width={size} height={size} style={{ width: size, height: size }} className={cn("rounded-full object-cover", className)} />
    ) : (
        <span
            style={{ width: size, height: size, fontSize: size * 0.42 }}
            className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", hue, className)}
        >
            {initial}
        </span>
    );
};

export const Chip = ({ label, className, onDelete }: { label: ReactNode; className?: string; onDelete?: () => void }) => (
    <span className={cn("inline-flex items-center gap-1 rounded-pill bg-surface-sunk px-3 py-1 text-xs text-ink", className)}>
        {label}
        {onDelete && (
            <button type="button" aria-label="remove" onClick={onDelete} className="text-muted hover:text-ink">
                ×
            </button>
        )}
    </span>
);

export const Divider = ({ className }: { className?: string }) => <hr className={cn("border-0 border-t border-line", className)} />;

export const Card = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("rounded-lg bg-surface shadow-card", className)} {...rest} />
);
