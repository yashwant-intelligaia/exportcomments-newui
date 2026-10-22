import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetaInfoType } from "../../../types";
import { EcMetaInfo } from "./EcMetaInfo";

export default {
    title: "Atomic/EcMetaInfo",
    component: EcMetaInfo,
} as ComponentMeta<typeof EcMetaInfo>;

const Template: ComponentStory<typeof EcMetaInfo> = (args) => <EcMetaInfo {...args} />;

const content: MetaInfoType[] = [
    {
        label: "Last Synced",
        value: "30 min ago",
    },
    {
        label: "Synced By",
        value: "Joe Smith",
    },
    {
        label: "Total Comments",
        value: "100",
    },
];

export const Default = Template.bind({});

Default.args = {
    data: content,
};
