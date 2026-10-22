/* eslint-disable no-alert */
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import { projectData } from "../../../mocks/projectMocks";
import { ActionButtonType } from "../../../types";
import { NotionDisconnectIcon, SyncCommentIcon } from "../../../utils/icons";
import { EcMetaInfo } from "../EcMetaInfo/EcMetaInfo";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { EcDrawer } from "./EcDrawer";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcDrawer",
    component: EcDrawer,
};

const actionButtonsContent: ActionButtonType[] = [
    {
        icon: <NotionDisconnectIcon sx={{ fontSize: 20 }} />,
        label: "Disconnect from Notion",
        onClick: () => alert("Disconnect from Notion"),
    },
    {
        icon: <SyncCommentIcon sx={{ fontSize: 20 }} />,
        label: "Sync Comments",
        onClick: () => alert("Sync Comments"),
    },
];

const drawerContent = projectData.map(({ title, data }) => (
    <ProjectCard
        actionButtons={actionButtonsContent}
        title={<Typography sx={{ fontSize: 18, fontWeight: 500 }}>{title}</Typography>}
    >
        <EcMetaInfo data={data} />
    </ProjectCard>
));

/*
 * Example EcDrawer story with React Hooks.
 */
export const RightDrawer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleClick}>
                Open
            </Button>
            <EcDrawer
                title={
                    <Typography variant="h6" fontWeight="500" mb={1.5}>
                        All Projects
                    </Typography>
                }
                open={open}
                direction="right"
                onClose={handleClose}
            >
                {drawerContent}
            </EcDrawer>
        </Box>
    );
};
