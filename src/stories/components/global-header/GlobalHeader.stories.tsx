import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GlobalHeader } from "./GlobalHeader";

export default {
    title: "Example/GlobalHeader",
    component: GlobalHeader,

    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof GlobalHeader>;

const Template: ComponentStory<typeof GlobalHeader> = () => <GlobalHeader />;

export const Primary = Template.bind({});

// Primary.args = {
//     userInfo: {
//         avatar: "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
//         createdAt: {},
//         email: "sagar.kumar@intelligaia.com",
//         figmaToken: "0Yt79XhbZuLs7ukM0RD3y_GehkVuHXAxZlcSPm9B",
//         figmaUserId: "598827437866843058",
//         name: "Sagar Kumar",
//         refreshToken: "X4hmxnW8-EcmxtA0o77iRGS1GEGr8EPffuaoeq0-EnC_h8NhLCjH3w",
//         tokenExpiresIn: "7776000",
//         userId: 38,
//     },
// };
