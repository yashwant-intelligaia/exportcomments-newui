"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "./cn";

const widths = { xs: "max-w-sm", sm: "max-w-lg", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
    size?: keyof typeof widths;
    showCloseIcon?: boolean;
    className?: string;
    children: ReactNode;
}

/** Centered dialog. Escape / backdrop dismiss only when `onClose` is provided. */
export const Modal = ({ open, onClose, size = "sm", showCloseIcon, className, children }: ModalProps) => (
    <Dialog open={open} onClose={() => onClose?.()} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-ink/50" />
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
            <DialogPanel className={cn("relative w-full rounded-lg bg-surface p-8 shadow-card", widths[size], className)}>
                {showCloseIcon && (
                    <button aria-label="close" onClick={onClose} className="absolute top-3 right-3 rounded-full p-1.5 text-muted hover:bg-surface-sunk">
                        <X className="size-5" />
                    </button>
                )}
                {children}
            </DialogPanel>
        </div>
    </Dialog>
);
