"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface EcDialogPropsType {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
    actionButtons?: ActionButtonType[];
}

const EcDialog = ({ title, description, closeOnClickOutside = false, open, onClose, actionButtons = [] }: EcDialogPropsType) => (
    <Modal open={open} onClose={closeOnClickOutside ? onClose : undefined} size="sm">
        <button aria-label="close" onClick={onClose} className="absolute top-3 right-3 rounded-full p-1.5 text-muted hover:bg-surface-sunk">
            <X className="size-5" />
        </button>
        <h2 className="font-sans text-xl font-semibold tracking-normal">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
            {actionButtons.map(({ label, onClick, variant, size }, i) => (
                <Button key={uniqueKey(i)} variant={variant} size={size} onClick={onClick}>
                    {label}
                </Button>
            ))}
        </div>
    </Modal>
);

export { EcDialog };
