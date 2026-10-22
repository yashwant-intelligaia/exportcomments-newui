"use client";

import { SmilePlus } from "lucide-react";
import { useState } from "react";

import { IconButton } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";

import { FILTERED_EMOJIS } from "../../utils";

interface ReactionPopoverPropsType {
    onClickReaction: (reaction: string) => void;
}

const ReactionPopover = ({ onClickReaction }: ReactionPopoverPropsType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <>
            <IconButton aria-label="Add reaction" onClick={(event) => setAnchorEl(event.currentTarget)}>
                <SmilePlus className="size-5" />
            </IconButton>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <div className="grid h-[200px] w-[250px] grid-cols-[repeat(auto-fill,minmax(35px,1fr))] gap-px overflow-auto p-px">
                    {FILTERED_EMOJIS.map(({ key, name, emoji }) => (
                        <div key={key} className="flex items-center justify-center">
                            <button
                                type="button"
                                aria-label={name}
                                className="inline-flex items-center rounded-sm px-1.5 py-1 text-lg hover:bg-surface-sunk"
                                onClick={() => {
                                    onClickReaction(`:${key}:`);
                                    setAnchorEl(null);
                                }}
                            >
                                {emoji}
                            </button>
                        </div>
                    ))}
                </div>
            </Popover>
        </>
    );
};

export { ReactionPopover };
