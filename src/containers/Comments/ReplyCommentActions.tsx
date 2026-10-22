"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";

import { Menu, MenuItem } from "@/components/ui/Popover";

import { UserContext } from "../../contexts";
import { EcTooltip } from "../../stories/components";
import { CommentActionType, CommentRowType } from "../../types";

interface ReplyCommentActionsPropsType {
    data: CommentRowType;
    onAction: (type: CommentActionType) => void;
}

export const ReplyCommentActions = ({ data, onAction }: ReplyCommentActionsPropsType) => {
    const { user } = UserContext();
    const [actionOptions, setActionOptions] = useState<null | HTMLElement>(null);
    const isButtonDisabled = user.figmaUserId !== data.user.id;

    return (
        <div className="flex items-center">
            <EcTooltip title={isButtonDisabled ? "This Action Can't Be Performed" : ""} placement="left-start" arrow>
                <button
                    type="button"
                    aria-label="more actions"
                    className="mr-1 flex items-center rounded-sm py-1 text-blue-ink"
                    onClick={(event) => {
                        if (!isButtonDisabled) setActionOptions(event.currentTarget);
                    }}
                >
                    <MoreVertical className="size-5" />
                </button>
            </EcTooltip>
            <Menu open={Boolean(actionOptions)} anchorEl={actionOptions} onClose={() => setActionOptions(null)} placement="bottom-end">
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
