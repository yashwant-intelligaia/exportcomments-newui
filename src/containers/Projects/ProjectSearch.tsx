"use client";

import { Search } from "lucide-react";
import { ChangeEventHandler, useEffect, useRef } from "react";

interface ProjectSearchType {
    placeholder: string;
    searchChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

export const ProjectSearch = ({ placeholder, searchChange, value }: ProjectSearchType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <div className="relative flex min-h-[50px] w-full items-center sm:w-[400px]">
            <input
                ref={inputRef}
                value={value}
                onChange={searchChange}
                className="border-ink/60 bg-surface text-ink placeholder:text-muted hover:border-ink focus:border-ink focus:ring-ink h-12 w-full rounded-md border py-2 pr-11 pl-3 text-lg focus:ring-2 focus:outline-none"
                placeholder={placeholder}
                aria-label={placeholder}
                type="text"
            />
            <Search className="text-muted pointer-events-none absolute right-3 size-5" />
        </div>
    );
};
