/* eslint-disable no-alert */
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ActionButtonType } from "../../../types";
import {
    GREY_700,
    GREY_900,
    NotionDisconnectIcon,
    NotionIcon,
    SyncCommentIcon,
} from "../../../utils";
import { ProjectCard } from "./ProjectCard";

export default {
    title: "Atomic/ProjectCard",
    component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

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

const cardContent = (
    <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
        }}
    >
        <Box>
            <Typography variant="body2" gutterBottom component="div" color={GREY_700}>
                Last Synced
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" color={GREY_900}>
                30 min ago
            </Typography>
        </Box>
        <Box>
            <Typography variant="body2" gutterBottom component="div" color={GREY_700}>
                Synced By
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" color={GREY_900}>
                Joe Smith
            </Typography>
        </Box>
        <Box>
            <Typography variant="body2" gutterBottom component="div" color={GREY_700}>
                Total Comments
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" color={GREY_900}>
                24
            </Typography>
        </Box>
    </Box>
);

export const Default = Template.bind({});

Default.args = {
    title: <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Scrumbooster-v2.0</Typography>,
    children: cardContent,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
    icon: <NotionIcon sx={{ fontSize: 20 }} />,
    title: <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Scrumbooster-v2.0</Typography>,
    children: cardContent,
};

export const WithAction = Template.bind({});

WithAction.args = {
    icon: <NotionIcon sx={{ fontSize: 20 }} />,
    title: <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Scrumbooster-v2.0</Typography>,
    children: cardContent,
    action: (
        <IconButton aria-label="settings">
            <MoreVertIcon />
        </IconButton>
    ),
};

export const WithActionButtons = Template.bind({});

WithActionButtons.args = {
    icon: <NotionIcon sx={{ fontSize: 20 }} />,
    title: <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Scrumbooster-v2.0</Typography>,
    children: cardContent,
    action: (
        <IconButton aria-label="settings">
            <MoreVertIcon />
        </IconButton>
    ),
    actionButtons: actionButtonsContent,
};
