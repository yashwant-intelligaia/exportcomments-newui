"use client";

import { ChevronDown, MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Menu, MenuItem } from "@/components/ui/Popover";
import { Tooltip } from "@/components/ui/Tooltip";
import { useHistory } from "@/utils/navigation";

import { UserContext } from "../../../../contexts/UserContext";

export const CommonActionsCell = (props: any) => {
    const history = useHistory();
    const [actionOptions, setActionOptions] = React.useState<null | HTMLElement>(null);
    const { value, from, defaultLabel, defaultActions, onAction } = props;
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const { user } = UserContext();

    useEffect(() => {
        if (value.user) {
            setButtonDisabled(user.figmaUserId !== value.user.id);
        }
    }, [value]);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (!isButtonDisabled) {
            setActionOptions(event.currentTarget);
        }
    };

    const handleAction = (parameter: string) => () => {
        setActionOptions(null);
        if (value.column) {
            if (value.column.key === "figmaUserId" && parameter === "navigate-file") {
                history.push(`/projects/${value.row[value.column.key]}`);
            } else {
                onAction(parameter, props);
            }
        } else {
            onAction(parameter, value);
        }
    };

    return (
        <span className="flex items-center">
            {from === "comments" && (
                <button type="button" className="text-sm font-bold tracking-wide text-blue-ink" onClick={handleAction(defaultActions)}>
                    {defaultLabel}
                </button>
            )}
            <span className="mr-1 ml-2 inline-block h-5 w-px bg-line" />
            {defaultLabel !== "Go to My Files" && (
                <button type="button" className="mr-1 flex items-center rounded-sm p-1 text-blue-ink" aria-label="more action" onClick={handleProfileMenuOpen}>
                    <Tooltip title={isButtonDisabled ? "This Action Can't Be Performed" : undefined}>
                        {from === "drawer" ? <MoreVertical className="size-5" /> : <ChevronDown className="size-5" />}
                    </Tooltip>
                </button>
            )}

            <Menu open={Boolean(actionOptions)} anchorEl={actionOptions} onClose={() => setActionOptions(null)} placement="bottom-end">
                {defaultLabel !== "Reply" && from === "comments" && !value.row.parentId && (
                    <MenuItem onClick={handleAction("reply")}>Reply</MenuItem>
                )}
                {(from === "comments" || from === "drawer") && (
                    <MenuItem onClick={handleAction("delete")} disabled={isButtonDisabled}>
                        Delete
                    </MenuItem>
                )}
                {defaultLabel !== "Open Comments" && from === "userFiles" && (
                    <MenuItem onClick={handleAction("open-comments")}>Open Comments</MenuItem>
                )}
                {from === "userFiles" && (
                    <MenuItem onClick={handleAction("favorite")}>
                        {value.row.isFavorite ? "Mark as Non-Favorite" : "Mark as Favorite"}
                    </MenuItem>
                )}
                {defaultLabel !== "Reply" && from === "userFiles" && (
                    <MenuItem onClick={handleAction("share-sheet")}>Share Sheet</MenuItem>
                )}
                {defaultLabel !== "Go to My Files" && from === "all-user" && (
                    <MenuItem onClick={handleAction("navigate-file")}>Go to My Files</MenuItem>
                )}
            </Menu>
        </span>
    );
};
