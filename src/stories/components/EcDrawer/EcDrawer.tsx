"use client";

import { X } from "lucide-react";

import { Drawer } from "@/components/ui/Drawer";
import { cn } from "@/components/ui/cn";

interface EcDrawerPropsType {
    title: JSX.Element | string;
    open: boolean;
    direction: "left" | "right" | "top" | "bottom";
    onClose: () => void;
    children: JSX.Element | JSX.Element[];
    closeOnClickOutside?: boolean;
    customeWidth?: boolean;
    footer?: React.ReactNode;
}

const EcDrawer = ({ title, open, direction, children, closeOnClickOutside = true, onClose, customeWidth, footer }: EcDrawerPropsType) => (
    <Drawer
        open={open}
        onClose={closeOnClickOutside ? onClose : () => undefined}
        anchor={direction === "top" ? "bottom" : direction}
        className={cn("max-w-full", customeWidth && "w-full sm:w-[672px]")}
    >
        <div className="flex h-full flex-col px-4">
            <div className="flex items-center justify-between border-b border-line py-3">
                <h2 className="font-sans text-xl font-semibold tracking-normal">{title}</h2>
                <button aria-label="close drawer" onClick={onClose} className="rounded-full p-1.5 text-muted hover:text-ink">
                    <X className="size-5" />
                </button>
            </div>
            <div className="h-full max-w-full overflow-y-auto py-4">{children}</div>
            {footer && <div className="mt-2 pb-4">{footer}</div>}
        </div>
    </Drawer>
);

export { EcDrawer };
