/* eslint-disable no-alert */
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { ActionButtonType } from "../../../types";
import { EcDialog } from "./EcDialog";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcDialog",
    component: EcDialog,
};

/*
 * Example EcDialog story with React Hooks.
 */
export const ConfirmationDialog = () => {
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
            label: "Cancel",
            onClick: () => {
                alert("Cancel");
                handleClose();
            },
            variant: "outlined",
        },
        {
            label: "Yes, I'm Sure",
            onClick: () => {
                alert("Yes, I'm Sure");
                handleClose();
            },
            variant: "contained",
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleClick}>
                Confirm
            </Button>
            <EcDialog
                title="Disconnect Project"
                description="You will no longer able to sync yourr comments from this project to Notion. Are you sure you want to disconnect the project."
                open={open}
                actionButtons={actionButtons}
                onClose={handleClose}
            />
        </Box>
    );
};
