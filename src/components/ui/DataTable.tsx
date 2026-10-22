"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { ReactNode, useMemo, useRef, useState } from "react";

import { cn } from "./cn";

export interface DataColumn<T> {
    key: string;
    name: string;
    /** Fixed width in px. Columns without a width share the remaining space (respecting minWidth). */
    width?: number;
    minWidth?: number;
    sortable?: boolean;
    headerClassName?: string;
    render?: (row: T) => ReactNode;
}

export interface SortState {
    columnKey: string;
    direction: "ASC" | "DESC";
}

interface DataTableProps<T> {
    columns: DataColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string;
    rowClassName?: (row: T) => string;
    sortColumns?: readonly SortState[];
    onSortColumnsChange?: (sort: SortState[]) => void;
    /** Total height of the scroll area in px. */
    height: number;
    headerHeight?: number;
    rowHeight?: number;
    className?: string;
    ariaLabel?: string;
}

const OVERSCAN = 6;

/**
 * Lightweight virtualised table (fixed row height) with sticky header and click-to-sort headers.
 * Replaces react-data-grid; columns/rows API intentionally mirrors the old grid usage.
 */
export function DataTable<T>({
    columns,
    rows,
    rowKey,
    rowClassName,
    sortColumns = [],
    onSortColumnsChange,
    height,
    headerHeight = 50,
    rowHeight = 82,
    className,
    ariaLabel,
}: DataTableProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const template = useMemo(
        () => columns.map((c) => (c.width ? `${c.width}px` : `minmax(${c.minWidth ?? 120}px, 1fr)`)).join(" "),
        [columns],
    );
    const minTableWidth = useMemo(() => columns.reduce((sum, c) => sum + (c.width ?? c.minWidth ?? 120), 0), [columns]);

    const viewport = Math.max(height - headerHeight, rowHeight);
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
    const end = Math.min(rows.length, Math.ceil((scrollTop + viewport) / rowHeight) + OVERSCAN);
    const visible = rows.slice(start, end);

    const toggleSort = (key: string) => {
        if (!onSortColumnsChange) return;
        const current = sortColumns.find((s) => s.columnKey === key);
        if (!current) onSortColumnsChange([{ columnKey: key, direction: "ASC" }]);
        else if (current.direction === "ASC") onSortColumnsChange([{ columnKey: key, direction: "DESC" }]);
        else onSortColumnsChange([]);
    };

    return (
        <div
            ref={scrollRef}
            role="table"
            aria-label={ariaLabel}
            aria-rowcount={rows.length}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            style={{ height }}
            className={cn("bg-surface-sunk overflow-auto", className)}
        >
            <div style={{ minWidth: minTableWidth }}>
                <div
                    role="row"
                    style={{ gridTemplateColumns: template, height: headerHeight }}
                    className="border-line bg-surface sticky top-0 z-10 grid border-b"
                >
                    {columns.map((c) => {
                        const sort = sortColumns.find((s) => s.columnKey === c.key);
                        const sortable = c.sortable ?? true;
                        return (
                            <div
                                key={c.key}
                                role="columnheader"
                                aria-sort={sort ? (sort.direction === "ASC" ? "ascending" : "descending") : "none"}
                                className={cn(
                                    "text-ink flex items-center px-2.5 text-sm font-semibold",
                                    c.headerClassName,
                                )}
                            >
                                {sortable ? (
                                    <button
                                        type="button"
                                        onClick={() => toggleSort(c.key)}
                                        className="flex items-center gap-2 text-left"
                                    >
                                        {c.name}
                                        {sort &&
                                            (sort.direction === "ASC" ? (
                                                <ArrowUp className="size-4" />
                                            ) : (
                                                <ArrowDown className="size-4" />
                                            ))}
                                    </button>
                                ) : (
                                    c.name
                                )}
                            </div>
                        );
                    })}
                </div>
                <div style={{ height: rows.length * rowHeight, position: "relative" }}>
                    {visible.map((row, i) => (
                        <div
                            key={rowKey(row)}
                            role="row"
                            aria-rowindex={start + i + 1}
                            style={{
                                gridTemplateColumns: template,
                                height: rowHeight,
                                transform: `translateY(${(start + i) * rowHeight}px)`,
                            }}
                            className={cn(
                                "border-line bg-surface text-ink hover:bg-blue-soft absolute top-0 left-0 grid w-full border-b",
                                rowClassName?.(row),
                            )}
                        >
                            {columns.map((c) => (
                                <div
                                    key={c.key}
                                    role="cell"
                                    className="flex min-w-0 items-center overflow-hidden px-2.5"
                                >
                                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
