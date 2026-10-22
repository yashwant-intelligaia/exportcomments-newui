import type { ButtonProps } from "../components/ui/Button";

interface ActionMenuItemType {
    label: string;
    onClick: (event) => void;
    tooltipTitle?: string;
    icon?: JSX.Element;
    disabled?: boolean;
}

interface ActionButtonType extends ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: JSX.Element;
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
}

interface MetaInfoType {
    label: string;
    value: string | number;
}

interface ResponseType<T> {
    code: string;
    message: string;
    data: T;
}

interface FormattedResponseType<T> extends T {
    statusMessage: string;
}

export { ActionButtonType, ActionMenuItemType, FormattedResponseType, MetaInfoType, ResponseType };
