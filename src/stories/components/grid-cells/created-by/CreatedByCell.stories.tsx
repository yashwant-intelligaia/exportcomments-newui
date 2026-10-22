import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreatedByCell } from "../../../../containers/Comments/Cells";

export default {
    title: "Atomic/CreatedByCell",
    component: CreatedByCell,
    argTypes: {},
} as ComponentMeta<typeof CreatedByCell>;

const Template: ComponentStory<typeof CreatedByCell> = (args) => <CreatedByCell {...args} />;

export const Default = Template.bind({});

Default.args = {
    value: {
        column: {
            key: "userName",
        },
        row: {
            userName: "Sagar Kumar",
            user: {
                handle: "sagar kumar",
                id: "sagar.kumar@intelligaia.com",
                imgUrl: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
            },
        },
    },
};
