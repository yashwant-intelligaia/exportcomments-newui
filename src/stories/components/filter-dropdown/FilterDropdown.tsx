"use client";

import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

import { UserContext } from "../../../contexts/UserContext";
import { uniqueKey } from "../../../utils";

export const FilterDropdown = ({ filterOptions, handleFilterClick }: any) => {
    const { commentType = "All Comments", setCommentType, setIsDisable } = UserContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = filterOptions.find((item: any) => item.name === event.target.value);
        setCommentType(event.target.value);
        if (selected) handleFilterClick(selected.id);
    };

    useEffect(() => {
        let numberOfNewComments = 0;
        filterOptions.forEach((item: any) => {
            if (item.name === "Unread Comments" || item.name === "Unread Replies") numberOfNewComments += item.record;
        });
        if (numberOfNewComments === 0) {
            setIsDisable(true);
        }
    }, [filterOptions]);

    return (
        <div className="relative flex min-w-[180px] items-center">
            <select
                aria-label="Filter comments"
                value={commentType}
                onChange={handleChange}
                className="text-blue-ink focus:ring-ink h-9 w-full appearance-none rounded-sm bg-transparent py-0 pr-8 pl-2 text-sm font-semibold focus:ring-2 focus:outline-none"
            >
                {filterOptions.map((item: any, index: number) => (
                    <option key={uniqueKey(`filter-option-${index}`)} value={item.name}>
                        {item.name} ({item.record})
                    </option>
                ))}
            </select>
            <ChevronDown className="text-blue-ink pointer-events-none absolute right-2 size-4" />
        </div>
    );
};
