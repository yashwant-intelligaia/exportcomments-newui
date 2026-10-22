import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ShareFile } from "./ShareFile";

export default {
    title: "Example/ShareFile",
    component: ShareFile,
    argTypes: {},
} as ComponentMeta<typeof ShareFile>;

const Template: ComponentStory<typeof ShareFile> = (args) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ShareFile {...args} />;
        </QueryClientProvider>
    );
};

export const Default = Template.bind({});

Default.args = {
    users: [
        {
            userId: 38,
            name: "Sagar Kumar",
            email: "sagar.kumar@intelligaia.com",
            avatar: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
            selected: false,
            editValue: false,
            tempEmail: "",
            validEmail: "",
        },
    ],

    close: () => {
        // eslint-disable-next-line no-alert
        alert("button trigger");
    },
};
