/* eslint-disable no-alert */
import { Box } from "@mui/material";

import {
    ProjectCard,
    ProjectCardFooter,
    ProjectCardHeader,
    ProjectCardHeaderActions,
} from "../../../containers/Projects/ProjectCard";
import { ProjectCardContextProvider } from "../../../contexts/ProjectCardContext";
import { ProjectCardDataType } from "../../../types";
import { uniqueKey } from "../../../utils";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcProjectCard",
    component: ProjectCard,
};

const projectsData: ProjectCardDataType[] = [
    {
        projectId: 1,
        fileId: "xyz",
        title: "Project1",
        subTitle: "Last updated on today",
        allComments: 100,
        unreadComments: 40,
        myComments: 10,
        resolvedComments: 30,
        unresolvedComments: 20,
        prototypeCount: 1,
    },
    {
        projectId: 2,
        fileId: "abc",
        title: "Project2",
        subTitle: "Last updated on yesterday",
        allComments: 200,
        unreadComments: 50,
        myComments: 100,
        resolvedComments: 10,
        unresolvedComments: 40,
        prototypeCount: 2,
    },
];

/*
 * Example EcProjectCard story with React Hooks.
 */
export const ProjectCardExample = () => (
    <Box sx={{ display: "flex", justifyContent: "center" }} gap="20px">
        {projectsData.map((project) => {
            const { projectId } = project;
            return (
                <ProjectCardContextProvider key={uniqueKey(projectId)}>
                    <ProjectCard
                        data={project}
                        header={<ProjectCardHeader actions={<ProjectCardHeaderActions />} />}
                        footer={<ProjectCardFooter />}
                    />
                </ProjectCardContextProvider>
            );
        })}
    </Box>
);
