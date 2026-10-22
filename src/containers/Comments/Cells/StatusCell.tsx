"use client";

import { cn } from "@/components/ui/cn";

export const StatusCell = ({ value }: { value: any }) => {
    const status = value.row[value.column.key];
    return (
        <div
            className={cn(
                "rounded-pill h-[26px] w-[85px] px-2.5 py-[5px] text-center text-xs leading-4 font-medium tracking-wide text-white capitalize",
                status === "resolved" ? "bg-[#2e7d32]" : "bg-[#b45309]",
            )}
        >
            <span>{status}</span>
        </div>
    );
};
