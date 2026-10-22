"use client";

import { MoreVert as MoreVertIcon, Star as StarIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useContext } from "react";

import { ProjectCardContext } from "../../../contexts/ProjectCardContext";
import { EcActionMenu } from "../../../stories/components/EcActionMenu/EcActionMenu";
import { EcTooltip } from "../../../stories/components/EcTooltip";

const ProjectCardHeaderActions = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = useContext(ProjectCardContext);
    return (
        <>
            <EcTooltip title="Remove From Favourite" placement="top" arrow>
                <IconButton
                    sx={{
                        padding: "4px",
                    }}
                    onClick={() => {}}
                >
                    <StarIcon />
                </IconButton>
            </EcTooltip>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    maxWidth: "1.5rem",
                }}
            >
                <IconButton
                    component="a"
                    aria-label="expand-feature"
                    style={{ color: "#2979ff" }}
                    sx={{
                        padding: "0px",
                    }}
                    onClick={() => {}}
                >
                    <MoreVertIcon />
                </IconButton>
                <EcActionMenu
                    open={false}
                    // anchorEl={anchorEl}
                    items={[]}
                    onClose={() => {}}
                />
            </Box>
        </>
    );
};

export { ProjectCardHeaderActions };
