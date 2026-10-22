"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface EcModalPropsType {
    open: boolean;
    children?: JSX.Element;
    title: JSX.Element;
    onClose: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    icon?: JSX.Element;
    subtitle?: string;
    closeOnClickOutside?: boolean;
    actionButtons?: ActionButtonType | ActionButtonType[];
    showCloseIcon?: boolean;
    textAlign?: "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";
}

const EcModal = (props: EcModalPropsType) => {
    const {
        icon,
        size = "xs",
        children,
        open,
        title,
        subtitle,
        onClose,
        actionButtons = [],
        closeOnClickOutside = false,
        showCloseIcon,
        textAlign,
    } = props;
    return (
        <Modal open={open} onClose={closeOnClickOutside ? onClose : undefined} size={size} showCloseIcon={showCloseIcon}>
            <div style={{ textAlign }}>
                {icon && <div className="my-2 flex h-[85px] justify-center">{icon}</div>}
                {title}
                {subtitle && <p className="text-sm">{subtitle}</p>}
                {children}
                {actionButtons && (
                    <div className="flex flex-col items-center justify-center">
                        {Array.isArray(actionButtons) ? (
                            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                                {actionButtons.map(({ label, onClick, size: btnSize, variant }, index) => (
                                    <Button
                                        key={uniqueKey(index)}
                                        variant={variant}
                                        size={btnSize || "small"}
                                        onClick={onClick}
                                        aria-label={label}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                className="mt-4"
                                {...actionButtons}
                                aria-label={actionButtons.label}
                            >
                                {actionButtons.label}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export { EcModal };
