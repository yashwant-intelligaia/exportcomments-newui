import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommonActionsCell } from "./CommonActionsCell";

export default {
    title: "Atomic/CommonActionsCell",
    component: CommonActionsCell,
    argTypes: {},
} as ComponentMeta<typeof CommonActionsCell>;

const Template: ComponentStory<typeof CommonActionsCell> = (args: any) => (
    <CommonActionsCell {...args} />
);

export const Default = Template.bind({});

Default.args = {
    value: {
        row: {
            userName: "Sagar Kumar",
            message: "comment",
            user: {
                handle: "sagar kumar",
                id: "sagar.kumar@intelligaia.com",
                imgUrl: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
            },
            orderId: "1",

            commentLocation: "string",
            status: "string",

            resolvedAt: "string",
            createdAt: "string",
            myComment: "string",
            unreadReply: "string",
            unreadComment: "string",
            id: "string",
            clientMeta: {
                x: 3,
                y: 6,
            },
            fileKey: "string",
            parentId: "string",
            children: [
                {
                    userName: "Sagar Kumar",
                    message: "comment",
                    user: {
                        handle: "sagar kumar",
                        id: "sagar.kumar@intelligaia.com",
                        imgUrl: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
                    },
                    orderId: "2",
                    commentLocation: "string",
                    status: "string",
                    resolvedAt: "string",
                    createdAt: "string",
                    myComment: "string",
                    unreadReply: "string",
                    unreadComment: "string",
                    id: "string",
                    clientMeta: {
                        x: 3,
                        y: 6,
                    },
                    fileKey: "string",
                    parentId: "string",
                    children: [],
                    isExpanded: false,
                },
            ],
            isExpanded: false,
        },
    },
    from: "comments",
};
