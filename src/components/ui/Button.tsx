"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "./cn";
import { Spinner } from "./Spinner";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    /** contained = primary yellow pill, outlined = ink outline pill, text = quiet link-style */
    variant?: "contained" | "outlined" | "text";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    fullWidth?: boolean;
    color?: "primary" | "error";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const sizes = {
    small: "h-9 px-4 text-xs",
    medium: "h-11 px-6 text-sm",
    large: "h-[50px] px-6 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "contained", size = "medium", loading, fullWidth, color = "primary", startIcon, endIcon, className, children, disabled, type = "button", ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || loading}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold whitespace-nowrap transition-colors",
                "disabled:cursor-not-allowed disabled:opacity-50",
                sizes[size],
                variant === "contained" &&
                    (color === "error" ? "bg-danger text-white hover:opacity-90" : "bg-yellow text-ink hover:brightness-95"),
                variant === "outlined" &&
                    cn("border bg-transparent hover:bg-surface-sunk", color === "error" ? "border-danger text-danger" : "border-ink text-ink"),
                variant === "text" && cn("bg-transparent px-3 hover:bg-surface-sunk", color === "error" ? "text-danger" : "text-ink"),
                fullWidth && "w-full",
                className
            )}
            {...rest}
        >
            {loading ? <Spinner className="size-4" /> : startIcon}
            {children}
            {!loading && endIcon}
        </button>
    );
});

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { size?: "small" | "medium" }>(
    function IconButton({ size = "medium", className, type = "button", ...rest }, ref) {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(
                    "inline-flex items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-sunk disabled:opacity-50",
                    size === "small" ? "size-8" : "size-10",
                    className
                )}
                {...rest}
            />
        );
    }
);
