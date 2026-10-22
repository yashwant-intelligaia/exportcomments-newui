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
    { label, error, helperText, startAdornment, endAdornment, multiline, rows = 3, fullWidth = true, className, inputClassName, id, ...rest },
    ref
) {
    const base = cn(
        "w-full bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none",
        inputClassName
    );
    return (
        <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
            {label && (
                <label htmlFor={id} className="mb-1 block text-xs font-semibold text-ink">
                    {label}
                </label>
            )}
            <div
                className={cn(
                    "flex items-center rounded-sm border bg-surface focus-within:ring-2 focus-within:ring-ink",
                    error ? "border-danger" : "border-ink/60"
                )}
            >
                {startAdornment && <span className="pl-3 text-muted">{startAdornment}</span>}
                {multiline ? (
                    <textarea id={id} rows={rows} className={cn(base, "resize-y")} {...(rest as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
                ) : (
                    <input id={id} ref={ref} className={base} {...rest} />
                )}
                {endAdornment && <span className="pr-3 text-muted">{endAdornment}</span>}
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
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-sm text-ink", disabled && "cursor-not-allowed opacity-50", className)}>
        <input
            type="checkbox"
            checked={!!checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="size-4 rounded-[4px] border-ink accent-ink"
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
        className={cn("h-10 rounded-sm border border-ink/60 bg-surface px-3 text-sm text-ink", className)}
        {...rest}
    >
        {options.map((o) => (
            <option key={o.value} value={o.value}>
                {o.label}
            </option>
        ))}
    </select>
);
