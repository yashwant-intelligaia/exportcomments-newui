"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/components/ui/cn";

import { UserContext } from "../../../contexts/UserContext";

export const Search = (props: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { isDisable } = UserContext();
    const { placeholder, searchChange, value, mobSearch, setMobSearch, handleMarkAsReadClick } = props;

    useEffect(() => {
        inputRef.current?.focus();
    }, [value]);

    return (
        <>
            <div className="relative flex min-h-[30px] w-full items-center sm:w-[287px]">
                <SearchIcon className="text-muted pointer-events-none absolute left-0 size-5" />
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => searchChange(e)}
                    className="border-ink/60 text-ink placeholder:text-muted hover:border-ink focus:border-ink w-full border-b bg-transparent py-2 pr-1 pl-6 text-sm leading-none focus:border-b-2 focus:outline-none"
                    placeholder={placeholder}
                    type="text"
                    aria-label={placeholder}
                />
            </div>
            <div className="text-muted absolute right-6 flex items-center md:hidden">
                <button
                    type="button"
                    className={cn(
                        "mr-3 text-sm font-semibold whitespace-nowrap",
                        isDisable ? "text-muted/60 cursor-not-allowed" : "text-blue-ink",
                    )}
                    disabled={isDisable}
                    onClick={handleMarkAsReadClick}
                >
                    Mark as Read
                </button>
                <button
                    type="button"
                    aria-label={mobSearch ? "close search" : "open search"}
                    onClick={() => setMobSearch(!mobSearch)}
                >
                    {mobSearch ? <X className="size-5" /> : <SearchIcon className="size-5" />}
                </button>
            </div>
        </>
    );
};
