import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Cards } from "./Cards";

export default {
    title: "Example/Card",
    component: Cards,
    argTypes: {},
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args) => <Cards {...args} />;

export const Default = Template.bind({});

Default.args = {
    filterType: "demo",
};
