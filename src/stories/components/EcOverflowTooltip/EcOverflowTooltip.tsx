"use client";

import { MutableRefObject, ReactNode, useEffect, useState } from "react";

import { Tooltip } from "@/components/ui/Tooltip";

interface EcOverflowTooltipProps {
    title: string | ReactNode;
    childRef?: MutableRefObject<any>;
    description?: string | ReactNode;
    titleFontWeight?: string | ReactNode;
    placement?: string;
    arrow?: boolean;
    children: ReactNode;
}

/* Only shows the tooltip when the referenced child's text is truncated. */
const EcOverflowTooltip = ({ title, description, titleFontWeight, childRef, placement, children }: EcOverflowTooltipProps) => {
    const [showHover, setShowHover] = useState(false);

    useEffect(() => {
        const compareSize = () => {
            const el = childRef?.current;
            setShowHover(!!el && el.scrollWidth > el.clientWidth);
        };
        compareSize();
        window.addEventListener("resize", compareSize);
        return () => window.removeEventListener("resize", compareSize);
    }, [childRef]);

    if (!showHover) return <>{children}</>;
    return (
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
};

export { EcOverflowTooltip };
