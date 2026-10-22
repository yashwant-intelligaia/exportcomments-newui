"use client";

import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";

import { UserContext } from "../../contexts";
import { EcTooltip } from "../../stories/components";
import { CommentActionType, CommentRowType } from "../../types";

interface ReplyCommentActionsPropsType {
    data: CommentRowType;
    onAction: (type: CommentActionType) => void;
}

export const ReplyCommentActions = (props: ReplyCommentActionsPropsType) => {
    const { data, onAction } = props;
    const { user } = UserContext();
    const [actionOptions, setActionOptions] = React.useState<null | HTMLSpanElement>(null);
    const isMenuOpen = Boolean(actionOptions);
    const isButtonDisabled = user.figmaUserId !== data.user.id;

    return (
        <>
            <Box style={{ display: "flex", alignItems: "center" }}>
                <EcTooltip
                    disableHoverListener={!isButtonDisabled}
                    title="This Action Can't Be Performed"
                    placement="left-start"
                    arrow
                >
                    <Box
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignSelf: "center",
                            lineHeight: 1,
                            marginRight: "4px",
                        }}
                        role="presentation"
                    >
                        <IconButton
                            color="primary"
                            aria-label="more actions"
                            component="span"
                            style={{
                                padding: "4px 0",
                                borderRadius: "4px",
                            }}
                            onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                                if (!isButtonDisabled) {
                                    setActionOptions(event.currentTarget);
                                }
                            }}
                        >
                            <MoreVertIcon className="actiondown-icon" />
                        </IconButton>
                    </Box>
                </EcTooltip>

                {/* Menu Options */}
                <Menu
                    className="mui-dropdown"
                    anchorEl={actionOptions}
                    id="primary-search-account-menu"
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
                    onClose={() => {
                        setActionOptions(null);
                    }}
                >
                    <MenuItem onClick={() => onAction("delete")}>Delete</MenuItem>
                </Menu>
            </Box>
        </>
    );
};
