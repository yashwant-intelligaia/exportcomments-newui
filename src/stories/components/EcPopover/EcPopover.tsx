"use client";

import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface EcPopoverPropsType {
    title: string;
    description: string;
    open: boolean;
    handleClose: () => void;
    anchorEl?: HTMLButtonElement;
    /** Kept for call-site compatibility; placement is derived from horizontal origin. */
    anchorOrigin?: { vertical: string; horizontal: string };
    transformOrigin?: { vertical: string; horizontal: string };
    actionButtons?: ActionButtonType[];
}

const EcPopover = ({ title, description, open, anchorEl, anchorOrigin, actionButtons = [], handleClose }: EcPopoverPropsType) => (
    <Popover
        open={open}
        anchorEl={anchorEl ?? null}
        onClose={handleClose}
        placement={anchorOrigin?.horizontal === "left" ? "bottom-start" : "bottom-end"}
    >
        <div className="max-w-[296px] p-4">
            <p className="pb-1 text-base font-medium text-ink">{title}</p>
            <p className="pb-2 text-sm text-muted">{description}</p>
            {actionButtons.length > 0 && (
                <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                    {actionButtons.map(({ label, onClick, size, variant }, index) => (
                        <Button key={uniqueKey(index)} variant={variant} size={size || "small"} onClick={onClick}>
                            {label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    </Popover>
);

export { EcPopover };
