"use client";

import { ChevronDown } from "lucide-react";
import { KeyboardEvent, ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "./cn";

export interface ComboboxProps<T> {
    options: T[];
    /** Selected values (multi mode). Ignored in pick mode. */
    value?: T[];
    /** Multi mode: called with the new list. Pick mode: called with the picked option. */
    onChange: (next: any) => void;
    /** `multiple` keeps chips for the selection; otherwise each pick fires onChange and the input clears. */
    multiple?: boolean;
    getKey: (option: T) => string;
    getLabel: (option: T) => string;
    getOptionDisabled?: (option: T) => boolean;
    /** Return the options to show for the typed text (defaults to a case-insensitive "contains" on the label). */
    filterOptions?: (options: T[], inputValue: string) => T[];
    renderOption?: (option: T, state: { highlighted: boolean }) => ReactNode;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    limitTags?: number;
    /** Keep the list open after a pick (pick mode). */
    keepOpenOnSelect?: boolean;
    className?: string;
    id?: string;
}

/**
 * Accessible type-ahead select (WAI-ARIA combobox/listbox) with optional multi-selection chips.
 * Replaces MUI Autocomplete; styled with design-system tokens only.
 */
export function Combobox<T>({
    options,
    value = [],
    onChange,
    multiple,
    getKey,
    getLabel,
    getOptionDisabled,
    filterOptions,
    renderOption,
    label,
    placeholder,
    disabled,
    limitTags = 2,
    keepOpenOnSelect,
    className,
    id,
}: ComboboxProps<T>) {
    const uid = useId();
    const inputId = id ?? `${uid}-input`;
    const listId = `${uid}-list`;
    const wrapRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [active, setActive] = useState(0);

    const selectedKeys = useMemo(() => new Set(value.map(getKey)), [value, getKey]);

    const visible = useMemo(() => {
        const pool = multiple ? options.filter((o) => !selectedKeys.has(getKey(o))) : options;
        if (filterOptions) return filterOptions(pool, input);
        const q = input.trim().toLowerCase();
        return q ? pool.filter((o) => getLabel(o).toLowerCase().includes(q)) : pool;
    }, [options, selectedKeys, input, multiple, filterOptions, getKey, getLabel]);

    useEffect(() => setActive(0), [input, open]);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) {
                setOpen(false);
                setInput("");
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    const pick = (option: T) => {
        if (getOptionDisabled?.(option)) return;
        if (multiple) {
            onChange([...value, option]);
        } else {
            onChange(option);
        }
        setInput("");
        if (!keepOpenOnSelect) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((i) => Math.min(i + 1, visible.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && open && visible[active]) {
            e.preventDefault();
            pick(visible[active]);
        } else if (e.key === "Escape") {
            setOpen(false);
        } else if (e.key === "Backspace" && multiple && !input && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    const chips = multiple ? (focused || value.length <= limitTags ? value : value.slice(0, limitTags)) : [];
    const hidden = multiple ? value.length - chips.length : 0;

    return (
        <div ref={wrapRef} className={cn("relative w-full", className)}>
            {label && (
                <label htmlFor={inputId} className="mb-1 block text-xs font-semibold text-ink">
                    {label}
                </label>
            )}
            <div
                className={cn(
                    "flex min-h-10 flex-wrap items-center gap-1.5 rounded-sm border border-ink/60 bg-surface px-2 py-1 focus-within:ring-2 focus-within:ring-ink",
                    disabled && "opacity-50"
                )}
                onClick={() => !disabled && setOpen(true)}
            >
                {chips.map((option) => (
                    <span key={getKey(option)} className="inline-flex max-w-full items-center gap-1 rounded-pill bg-surface-sunk py-0.5 pr-1 pl-3 text-xs text-ink">
                        <span className="truncate">{getLabel(option)}</span>
                        <button
                            type="button"
                            aria-label={`Remove ${getLabel(option)}`}
                            disabled={disabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(value.filter((v) => getKey(v) !== getKey(option)));
                            }}
                            className="rounded-full px-1.5 text-muted hover:text-ink"
                        >
                            ×
                        </button>
                    </span>
                ))}
                {hidden > 0 && <span className="text-xs text-muted">+{hidden}</span>}
                <input
                    id={inputId}
                    role="combobox"
                    aria-expanded={open}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    autoComplete="off"
                    disabled={disabled}
                    value={input}
                    placeholder={chips.length ? undefined : placeholder}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={onKeyDown}
                    className="min-w-24 flex-1 bg-transparent py-1 text-sm text-ink placeholder:text-muted focus:outline-none"
                />
                <ChevronDown className="size-4 shrink-0 text-muted" aria-hidden="true" />
            </div>
            {open && visible.length > 0 && (
                <ul
                    id={listId}
                    role="listbox"
                    className="absolute z-[70] mt-1 max-h-60 w-full overflow-auto rounded-md border border-line bg-surface py-1 shadow-card"
                >
                    {visible.map((option, index) => {
                        const isDisabled = getOptionDisabled?.(option);
                        return (
                            <li
                                key={getKey(option)}
                                role="option"
                                aria-selected={selectedKeys.has(getKey(option))}
                                aria-disabled={isDisabled}
                                onMouseEnter={() => setActive(index)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => pick(option)}
                                className={cn(
                                    "cursor-pointer px-3 py-2 text-sm",
                                    index === active && "bg-blue-soft",
                                    isDisabled && "cursor-not-allowed opacity-50"
                                )}
                            >
                                {renderOption ? renderOption(option, { highlighted: index === active }) : getLabel(option)}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
