"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/components/ui/cn";

export const Cell = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "my-1 flex items-center [&_span]:ml-2 [&_span]:h-full [&_span]:truncate [&_span]:leading-none",
            className,
        )}
        {...rest}
    />
);
