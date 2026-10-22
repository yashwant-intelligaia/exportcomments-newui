import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DateCell } from "../../../../containers/Comments/Cells";

export default {
    title: "Atomic/DateCell",
    component: DateCell,
    argTypes: {},
} as ComponentMeta<typeof DateCell>;

const Template: ComponentStory<typeof DateCell> = (args) => <DateCell {...args} />;

export const Default = Template.bind({});

Default.args = {
    value: {
        column: {
            key: "resolvedAt",
        },
        row: {
            userName: "Sagar Kumar",
            resolvedAt: "2022-01-19T07:49:44.030Z",
            user: {
                handle: "sagar kumar",
                id: "sagar.kumar@intelligaia.com",
                imgUrl: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
            },
        },
    },
};
