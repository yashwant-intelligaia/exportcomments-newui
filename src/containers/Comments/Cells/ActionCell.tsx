"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Menu, MenuItem } from "@/components/ui/Popover";

import { UserContext } from "../../../contexts";
import { EcTooltip } from "../../../stories/components";
import { CommentActionType, CommentRowType } from "../../../types";

interface ActionCellPropsType {
    data: CommentRowType;
    onAction: (type: CommentActionType) => void;
}

export const ActionCell = ({ data, onAction }: ActionCellPropsType) => {
    const { user } = UserContext();
    const [actionOptions, setActionOptions] = useState<null | HTMLElement>(null);
    const isButtonDisabled = user.figmaUserId !== data.user.id;

    return (
        <div className="flex items-center">
            <button
                type="button"
                className="text-blue-ink text-sm font-bold tracking-wide"
                onClick={() => onAction("reply")}
            >
                Reply
            </button>
            <span className="bg-line mr-1 ml-2 inline-block h-5 w-px" />
            <EcTooltip title={isButtonDisabled ? "This Action Can't Be Performed" : ""} placement="left-start" arrow>
                <button
                    type="button"
                    aria-label="more actions"
                    className="text-blue-ink mr-1 flex items-center rounded-sm py-1"
                    onClick={(event) => {
                        if (!isButtonDisabled) setActionOptions(event.currentTarget);
                    }}
                >
                    <ChevronDown className="size-5" />
                </button>
            </EcTooltip>

            <Menu
                open={Boolean(actionOptions)}
                anchorEl={actionOptions}
                onClose={() => setActionOptions(null)}
                placement="bottom-end"
            >
                <MenuItem
                    onClick={() => {
                        setActionOptions(null);
                        onAction("delete");
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};
