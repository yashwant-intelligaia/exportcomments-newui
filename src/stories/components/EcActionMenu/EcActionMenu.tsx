"use client";

import { Menu, MenuItem } from "@/components/ui/Popover";

import { ActionMenuItemType } from "../../../types";
import { uniqueKey } from "../../../utils";
import { EcTooltip } from "../EcTooltip";

interface EcActionMenuPropsType {
    open: boolean;
    onClose?: () => void;
    anchorEl?: HTMLElement;
    /** Kept for call-site compatibility; the menu opens beside its anchor. */
    anchorOrigin?: unknown;
    transformOrigin?: unknown;
    items?: ActionMenuItemType[];
    closeOnClickOutside?: boolean;
}

const EcActionMenu = ({ open, anchorEl, items = [], closeOnClickOutside = true, onClose }: EcActionMenuPropsType) => (
    <Menu
        open={open}
        anchorEl={anchorEl ?? null}
        onClose={closeOnClickOutside && onClose ? onClose : () => undefined}
        placement="right-start"
    >
        {items.map(({ label, onClick, icon, disabled, tooltipTitle }, index) => {
            const item = (
                <MenuItem key={uniqueKey(index)} onClick={disabled ? undefined : onClick} disabled={disabled}>
                    {icon && <span className="flex size-5 items-center">{icon}</span>}
                    <span className="text-sm">{label}</span>
                </MenuItem>
            );
            return tooltipTitle ? (
                <EcTooltip key={uniqueKey(index)} title={tooltipTitle} placement="right-start" titleFontWeight="normal">
                    {item}
                </EcTooltip>
            ) : (
                item
            );
        })}
    </Menu>
);

export { EcActionMenu };
