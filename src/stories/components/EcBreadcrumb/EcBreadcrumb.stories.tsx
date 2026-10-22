import { Box } from "@mui/material";

import { EcBreadcrumb, EcBreadcrumbDataType } from "./EcBreadcrumb";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/EcBreadcrumb",
    component: EcBreadcrumb,
};

/*
 * Example EcBreadcrumb story with React Hooks.
 */
export const EcBreadcrumbExample = () => {
    const sampleData: EcBreadcrumbDataType[] = [
        {
            title: "Projects",
            active: true,
            onClick: () => {
                // eslint-disable-next-line no-console
                console.log("test");
            },
        },
        {
            title: "Test Project 1",
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <EcBreadcrumb data={sampleData} />
        </Box>
    );
};
