import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../../../contexts/UserContext";

const ActionwithDrop = styled.span`
    display: flex;
    align-items: center;

    .seperator {
        background-color: #e0e0e0;
        height: 20px;
        width: 1px;
        display: inline-block;
        margin-inline: 8px 4px;
    }

    .actiondown-wrap {
        cursor: pointer;
        display: flex;
        align-self: center;
        line-height: 1;
        margin-right: 4px;
        .actiondown-icon,
        .actionup-icon {
            color: #2979ff;
        }
        .drawer-more-action {
            padding: 4px 0;
            border-radius: 4px;
        }
    }
`;

const DefaultAction = styled.span`
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.5px;
    text-align: left;
    color: #2979ff;
    cursor: pointer;
`;

export const CommonActionsCell = (props: any) => {
    const history = useHistory();
    const [actionOptions, setActionOptions] = React.useState<null | HTMLSpanElement>(null);
    const { value, from, defaultLabel, defaultActions, onAction } = props;
    const menuId = "primary-search-account-menu";
    const handleMenuClose = () => {
        setActionOptions(null);
    };
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const { user } = UserContext();

    useEffect(() => {
        if (value.user) {
            if (user.figmaUserId === value.user.id) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }
    }, [value]);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!isButtonDisabled) {
            setActionOptions(event.currentTarget);
        }
    };

    const handleAction = (parameter: string) => () => {
        if (value.column) {
            if (value.column.key === "figmaUserId" && parameter === "navigate-file") {
                const userfiles = "../projects/";
                if (history) {
                    history.push(`${userfiles}${value.row[value.column.key]}`);
                }
            } else {
                onAction(parameter, props);
            }
        } else {
            onAction(parameter, value);
        }
    };

    const isMenuOpen = Boolean(actionOptions);
    const actionMenu = (
        <div className="test">
            <Menu
                className="mui-dropdown"
                anchorEl={actionOptions}
                id={menuId}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
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
        </div>
    );

    return (
        <>
            <ActionwithDrop>
                {from === "comments" && (
                    <DefaultAction
                        className="child-action-disable"
                        role="presentation"
                        onClick={handleAction(defaultActions)}
                    >
                        {defaultLabel}
                    </DefaultAction>
                )}
                <span className="seperator" />
                {defaultLabel !== "Go to My Files" && (
                    <span
                        className="actiondown-wrap"
                        role="presentation"
                        onClick={handleProfileMenuOpen}
                    >
                        {from === "drawer" ? (
                            <Tooltip
                                disableHoverListener={!isButtonDisabled}
                                title="This Action Can't Be Performed"
                                placement="left-start"
                            >
                                <IconButton
                                    color="primary"
                                    className="drawer-more-action"
                                    aria-label="more action"
                                    component="span"
                                >
                                    <MoreVertIcon className="actiondown-icon" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                disableHoverListener={!isButtonDisabled}
                                title="This Action Can't Be Performed"
                                placement="left-start"
                            >
                                <KeyboardArrowDownIcon className="actiondown-icon" />
                            </Tooltip>
                        )}
                    </span>
                )}

                {actionMenu}
            </ActionwithDrop>
        </>
    );
};
