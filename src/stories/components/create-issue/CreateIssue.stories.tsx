/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { CreateIssue } from "./CreateIssue";

export default {
    title: "Atomic/CreateIssue",
    component: CreateIssue,
    argTypes: {},
} as ComponentMeta<typeof CreateIssue>;

const Template: ComponentStory<typeof CreateIssue> = (args: any) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <CreateIssue {...args} />
        </QueryClientProvider>
    );
};

export const Default = Template.bind({});

Default.args = {
    projectId: 0,
    row: {},

    close: () => {
        alert("close");
    },
    handleAction: (parameter: string, value: string) => {
        if (parameter === "cancel-pop") {
            alert("Cancel button click");
        } else if (parameter === "submit-issue") {
            alert("Submit  button click");
        }
    },
};
