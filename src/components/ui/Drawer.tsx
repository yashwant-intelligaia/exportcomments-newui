"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";

import { cn } from "./cn";

export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    anchor?: "left" | "right" | "bottom";
    className?: string;
    children: ReactNode;
}

const anchors = {
    left: "left-0 inset-y-0 h-full data-[closed]:-translate-x-full",
    right: "right-0 inset-y-0 h-full data-[closed]:translate-x-full",
    bottom: "inset-x-0 bottom-0 max-h-[90vh] rounded-t-lg data-[closed]:translate-y-full",
};

/** Slide-in panel (side or bottom sheet). */
export const Drawer = ({ open, onClose, anchor = "right", className, children }: DrawerProps) => (
    <Dialog open={open} onClose={onClose} className="relative z-50">
        <DialogBackdrop transition className="fixed inset-0 bg-ink/40 transition-opacity duration-200 data-[closed]:opacity-0" />
        <DialogPanel
            transition
            className={cn("fixed overflow-y-auto bg-surface shadow-card transition-transform duration-200", anchors[anchor], className)}
        >
            {children}
        </DialogPanel>
    </Dialog>
);
