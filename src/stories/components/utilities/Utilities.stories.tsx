import { ComponentMeta, ComponentStory } from "@storybook/react";

import { APP_CONSTANT } from "../../../constants/AppConstant";
import { Utilities } from "./Utilities";

export default {
    title: "Atomic/Utilities",
    component: Utilities,

    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Utilities>;

const Template: ComponentStory<typeof Utilities> = (args) => <Utilities {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    user: {
        name: "Sagar Kumar",
        email: "sagar.kumar@intelligaia.com",
        avatar: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
    },
    userOptions: APP_CONSTANT.userOptions,
    setTokenMethod: () => 0,
};
