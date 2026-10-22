import { SVGProps } from "react";

import { cn } from "./cn";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
    fontSize?: "small" | "medium" | "large" | "inherit";
    htmlColor?: string;
}

const sizes = { small: "1.25rem", medium: "1.5rem", large: "2.1875rem", inherit: "1em" };

/** Inline-SVG wrapper: sized in em, inherits text colour via `currentColor`. */
export const SvgIcon = ({ fontSize = "medium", htmlColor, className, style, children, fill = "currentColor", ...rest }: SvgIconProps) => (
    <svg
        aria-hidden="true"
        focusable="false"
        fill={htmlColor ?? fill}
        className={cn("inline-block shrink-0 select-none", className)}
        style={{ width: sizes[fontSize], height: sizes[fontSize], ...style }}
        {...rest}
    >
        {children}
    </svg>
);
