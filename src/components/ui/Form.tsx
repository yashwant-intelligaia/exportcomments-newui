"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { cn } from "./cn";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: ReactNode;
    error?: boolean;
    helperText?: ReactNode;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
    inputClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        label,
        error,
        helperText,
        startAdornment,
        endAdornment,
        multiline,
        rows = 3,
        fullWidth = true,
        className,
        inputClassName,
        id,
        ...rest
    },
    ref,
) {
    const base = cn(
        "w-full bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none",
        inputClassName,
    );
    return (
        <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
            {label && (
                <label htmlFor={id} className="text-ink mb-1 block text-xs font-semibold">
                    {label}
                </label>
            )}
            <div
                className={cn(
                    "bg-surface focus-within:ring-ink flex items-center rounded-sm border focus-within:ring-2",
                    error ? "border-danger" : "border-ink/60",
                )}
            >
                {startAdornment && <span className="text-muted pl-3">{startAdornment}</span>}
                {multiline ? (
                    <textarea
                        id={id}
                        ref={ref as unknown as React.Ref<HTMLTextAreaElement>}
                        rows={rows}
                        className={cn(base, "resize-y")}
                        {...(rest as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input id={id} ref={ref} className={base} {...rest} />
                )}
                {endAdornment && <span className="text-muted pr-3">{endAdornment}</span>}
            </div>
            {helperText && <p className={cn("mt-1 text-xs", error ? "text-danger" : "text-muted")}>{helperText}</p>}
        </div>
    );
});

export const Checkbox = ({
    checked,
    onChange,
    label,
    disabled,
    className,
    ...rest
}: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: ReactNode;
    disabled?: boolean;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "disabled" | "className">) => (
    <label
        className={cn(
            "text-ink inline-flex cursor-pointer items-center gap-2 text-sm",
            disabled && "cursor-not-allowed opacity-50",
            className,
        )}
    >
        <input
            type="checkbox"
            checked={!!checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="border-ink accent-ink size-4 rounded-[4px]"
            {...rest}
        />
        {label}
    </label>
);

export const Select = ({
    value,
    onChange,
    options,
    className,
    ...rest
}: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value">) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("border-ink/60 bg-surface text-ink h-10 rounded-sm border px-3 text-sm", className)}
        {...rest}
    >
        {options.map((o) => (
            <option key={o.value} value={o.value}>
                {o.label}
            </option>
        ))}
    </select>
);
