"use client";

import { AddReactionOutlined as AddReactionOutlinedIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";

import { FILTERED_EMOJIS } from "../../utils";

interface ReactionPopoverPropsType {
    onClickReaction: (reaction: string) => void;
}

const ReactionPopover = (props: ReactionPopoverPropsType) => {
    const { onClickReaction } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <AddReactionOutlinedIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box
                    sx={{
                        width: 250,
                        height: 200,
                        overflow: "auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(35px, 1fr))",
                        gap: 0.1,
                        padding: 0.1,
                    }}
                >
                    {FILTERED_EMOJIS.map(({ key, name, emoji }) => (
                        <Box key={key} display="flex" justifyContent="center" alignItems="center">
                            <Button
                                aria-label={name}
                                sx={{
                                    minWidth: "auto",
                                    fontSize: "18px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}
                                variant="text"
                                onClick={() => {
                                    onClickReaction(`:${key}:`);
                                    setAnchorEl(null);
                                }}
                            >
                                {emoji}
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export { ReactionPopover };
