import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import { SubHeader } from "../../../containers/ProjectDetails";
import { UserContextProvider } from "../../../contexts";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atomic/SubHeader",
    component: SubHeader,
};

/*
 * Example SubHeader story with React Hooks.
 */
export const SubHeaderExample = () => {
    const queryClient: any = new QueryClient();
    return (
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <Box>
                    <SubHeader />
                </Box>
            </QueryClientProvider>
        </UserContextProvider>
    );
};
