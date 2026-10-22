"use client";

import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { ProjectDetailsContext } from "../../contexts";
import { useDebounce } from "../../utils";

const SearchField = ({ id, value, onChange }: { id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="flex w-full items-center border-b border-ink/60 focus-within:border-ink">
        <Search className="mr-2 size-5 shrink-0 text-muted" />
        <input
            id={id}
            value={value}
            placeholder="Search"
            aria-label="Search prototypes"
            autoComplete="off"
            onChange={onChange}
            className="w-full bg-transparent py-1.5 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
    </div>
);

export const PrototypesFilter = () => {
    const [value, setValue] = useState("");
    const { setSearchInput } = useContext(ProjectDetailsContext);
    const searchInputValue = useDebounce(value, 1000);

    useEffect(() => {
        setSearchInput(searchInputValue);
    }, [searchInputValue]);

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <>
            <div>
                <div className="mt-[15px] mb-[5px] flex max-w-full min-w-[55%] flex-wrap items-center justify-end gap-2 sm:my-0 xl:-mt-2.5">
                    <div className="hidden w-full sm:block sm:w-80 md:w-[330px]">
                        <SearchField id="input-with-icon-adornment" value={value} onChange={handleInputOnChange} />
                    </div>
                </div>
            </div>
            {/* Search Box for Mobile Screens */}
            <div className="block w-full sm:hidden">
                <SearchField id="mobile-input-with-icon-adornment" value={value} onChange={handleInputOnChange} />
            </div>
        </>
    );
};
