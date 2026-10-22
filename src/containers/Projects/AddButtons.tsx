"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";

import { useFetchProjectList } from "../../hooks";
import { AddButtonsOptionType } from "../../types";
import { uniqueKey } from "../../utils";

interface AddButtonsPropsType {
    options: AddButtonsOptionType[];
    prefix?: string;
    ariaLabel?: string;
    onOptionClick?: (index: number) => void;
    onButtonClick?: (index: number) => void;
}

const AddButtons = ({ options, onOptionClick }: AddButtonsPropsType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const { data: projectListData } = useFetchProjectList({ key: "all" });

    return (
        <>
            <Button
                id="NB-add-new-button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={(event) => setAnchorEl(open ? null : event.currentTarget)}
                endIcon={open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            >
                Add New
            </Button>
            <Popover open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <div role="menu" className="py-1">
                    {options.map(({ title }, index) => {
                        const disabled = title === "Users" && projectListData?.length === 0;
                        return (
                            <button
                                key={`add-option-${uniqueKey(index)}`}
                                type="button"
                                role="menuitem"
                                disabled={disabled}
                                onClick={() => {
                                    onOptionClick?.(index);
                                    setAnchorEl(null);
                                }}
                                className="block w-36 px-4 py-2 text-left text-sm text-ink hover:bg-surface-sunk disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent"
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            </Popover>
        </>
    );
};

export { AddButtons };
