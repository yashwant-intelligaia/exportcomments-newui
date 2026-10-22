"use client";

import { ReactNode } from "react";

import { Tooltip } from "@/components/ui/Tooltip";

interface EcTooltipProps {
    title: string | ReactNode;
    description?: string | ReactNode;
    titleFontWeight?: string | ReactNode;
    placement?: string;
    arrow?: boolean;
    children: ReactNode;
}

const EcTooltip = ({ title, description, titleFontWeight, placement, children }: EcTooltipProps) => !title ? (
    <>{children}</>
) : (
    <Tooltip
        placement={placement?.startsWith("bottom") ? "bottom" : "top"}
        title={
            <>
                <span className="block text-sm" style={{ fontWeight: (titleFontWeight as string) || "bold" }}>
                    {title}
                </span>
                {description && <span className="block font-normal">{description}</span>}
            </>
        }
    >
        {children}
    </Tooltip>
);

export { EcTooltip };
