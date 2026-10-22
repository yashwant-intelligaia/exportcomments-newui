/* eslint-disable no-alert */
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

import { ActionMenuItemType } from "../../../types";
import { EcActionMenu } from "./EcActionMenu";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcActionMenu",
    component: EcActionMenu,
};

/*
 * Example EcActionMenu story with React Hooks.
 */
export const Basic = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };
    const open = Boolean(anchorEl);
    const items: ActionMenuItemType[] = [
        {
            label: "Download Project",
            onClick: () => {
                alert("Download Project");
                handleClose();
            },
        },
        {
            label: "Remove from Favourite",
            onClick: () => {
                alert("Remove from Favourite");
                handleClose();
            },
        },
        {
            label: "Favourite Project",
            onClick: () => {
                alert("Favourite Project");
                handleClose();
            },
        },
        {
            label: "Remove Project",
            onClick: () => {
                alert("Remove Project");
                handleClose();
            },
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
                component="a"
                aria-label="expand-feature"
                style={{ color: "#2979ff" }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <EcActionMenu open={open} anchorEl={anchorEl} items={items} onClose={handleClose} />
        </Box>
    );
};

export const WithIcons = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };
    const open = Boolean(anchorEl);
    const items: ActionMenuItemType[] = [
        {
            label: "Download Project",
            onClick: () => {
                alert("Download Project");
                handleClose();
            },
            icon: <FileDownloadOutlinedIcon fontSize="small" />,
        },
        {
            label: "Remove from Favourite",
            onClick: () => {
                alert("Remove from Favourite");
                handleClose();
            },
            icon: <BookmarkRemoveRoundedIcon fontSize="small" />,
        },
        {
            label: "Favourite Project",
            onClick: () => {
                alert("Favourite Project");
                handleClose();
            },
            icon: <BookmarkBorderIcon fontSize="small" />,
        },
        {
            label: "Remove Project",
            onClick: () => {
                alert("Remove Project");
                handleClose();
            },
            icon: <DeleteIcon fontSize="small" />,
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
                component="a"
                aria-label="expand-feature"
                style={{ color: "#2979ff" }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <EcActionMenu open={open} anchorEl={anchorEl} items={items} onClose={handleClose} />
        </Box>
    );
};

export const WithDisabledOptions = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };
    const open = Boolean(anchorEl);
    const items: ActionMenuItemType[] = [
        {
            label: "Download Project",
            onClick: () => {
                alert("Download Project");
                handleClose();
            },
            icon: <FileDownloadOutlinedIcon fontSize="small" />,
        },
        {
            label: "Remove from Favourite",
            onClick: () => {
                alert("Remove from Favourite");
                handleClose();
            },
            icon: <BookmarkRemoveRoundedIcon fontSize="small" />,
            disabled: true,
        },
        {
            label: "Favourite Project",
            onClick: () => {
                alert("Favourite Project");
                handleClose();
            },
            icon: <BookmarkBorderIcon fontSize="small" />,
        },
        {
            label: "Remove Project",
            onClick: () => {
                alert("Remove Project");
                handleClose();
            },
            icon: <DeleteIcon fontSize="small" />,
            disabled: true,
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
                component="a"
                aria-label="expand-feature"
                style={{ color: "#2979ff" }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <EcActionMenu open={open} anchorEl={anchorEl} items={items} onClose={handleClose} />
        </Box>
    );
};
