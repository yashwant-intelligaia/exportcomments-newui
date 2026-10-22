import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Loader } from "./Loader";

export default {
    title: "Atomic/Loader",
    component: Loader,
    argTypes: {},
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args: any) => <Loader {...args} />;

export const Default = Template.bind({});

Default.args = {};
