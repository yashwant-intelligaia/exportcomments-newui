import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";

import { UserContext } from "../../../contexts";
import { EcTooltip } from "../../../stories/components";
import { CommentActionType, CommentRowType } from "../../../types";

interface ActionCellPropsType {
    data: CommentRowType;
    onAction: (type: CommentActionType) => void;
}

export const ActionCell = (props: ActionCellPropsType) => {
    const { data, onAction } = props;
    const { user } = UserContext();
    const [actionOptions, setActionOptions] = React.useState<null | HTMLSpanElement>(null);
    const isMenuOpen = Boolean(actionOptions);
    const isButtonDisabled = user.figmaUserId !== data.user.id;

    return (
        <>
            <Box style={{ display: "flex", alignItems: "center" }}>
                <Box
                    style={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "20px",
                        letterSpacing: "0.5px",
                        textAlign: "left",
                        color: "#2979ff",
                        cursor: "pointer",
                    }}
                    onClick={() => onAction("reply")}
                >
                    Reply
                </Box>

                {/* Separator line */}
                <Box
                    style={{
                        backgroundColor: "#e0e0e0",
                        height: "20px",
                        width: "1px",
                        display: "inline-block",
                        marginInline: "8px 4px",
                    }}
                />
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
                            <KeyboardArrowDownIcon style={{ color: "#2979ff" }} />
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
