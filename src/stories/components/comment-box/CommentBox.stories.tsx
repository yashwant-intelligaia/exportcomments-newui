import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentBox } from "./CommentBox";

export default {
    title: "Atomic/CommentBox",
    component: CommentBox,
    argTypes: {},
} as ComponentMeta<typeof CommentBox>;

const Template: ComponentStory<typeof CommentBox> = (args: any) => <CommentBox {...args} />;

export const Default = Template.bind({});

Default.args = {};
