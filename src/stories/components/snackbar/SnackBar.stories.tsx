// TODO: remove this story once ToasterContext implemented at all places.
// We need to use EcSnackbar component in future
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SnackBar } from "./SnackBar";

export default {
    title: "Example/SnackBar",
    component: SnackBar,
    argTypes: {
        severity: {
            options: ["info", "error", "success", "warning"],
            control: { type: "radio" },
        },
    },
} as ComponentMeta<typeof SnackBar>;

const Template: ComponentStory<typeof SnackBar> = (args) => <SnackBar {...args} />;

export const Default = Template.bind({});

Default.args = {
    message: "test",
    duration: 2000,
    severity: "success",
    open: true,
    onClose: () => {
        // Default.args open: false;
    },
};
