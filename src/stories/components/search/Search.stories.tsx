import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Search } from "./Search";

export default {
    title: "Atomic/Search",
    component: Search,
    argTypes: {},
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});

Default.args = {
    searchText: "",

    searchChange: (searchEvent: React.ChangeEvent<HTMLInputElement>) => {
        if (Default?.args) {
            Default.args.searchText = searchEvent.target.value;
        }
    },
};
