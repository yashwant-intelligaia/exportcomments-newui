/* eslint-disable no-alert */
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { ActionButtonType } from "../../../types";
import { EcPopover } from "./EcPopover";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcPopover",
    component: EcPopover,
};

/*
 * Example EcPopover story with React Hooks.
 */
export const Default = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };
    const open = Boolean(anchorEl);
    const actionButtons: ActionButtonType[] = [
        {
            label: "Connect Now",
            onClick: () => {
                alert("Connect Now");
                handleClose();
            },
            variant: "contained",
        },
        {
            label: "Ok, got it",
            onClick: () => {
                alert("Ok, got it");
                handleClose();
            },
            variant: "outlined",
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleClick}>
                Open Popover
            </Button>
            <EcPopover
                title="Connect to Notion"
                description="You can connect anytime from here and sync your comments seamlessly."
                open={open}
                anchorEl={anchorEl}
                actionButtons={actionButtons}
                handleClose={handleClose}
            />
        </Box>
    );
};
