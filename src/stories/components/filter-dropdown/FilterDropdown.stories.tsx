import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { FilterDropdown } from "./FilterDropdown";

export default {
    title: "Atomic/FilterDropdown",
    component: FilterDropdown,
    argTypes: {},
} as ComponentMeta<typeof FilterDropdown>;

const Template: ComponentStory<typeof FilterDropdown> = (args) => <FilterDropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
    searchText: "",
    filterType: "total",
    filterOptions: [
        {
            id: "total",
            name: "Total",
            record: 5,
        },
    ],
    handleFilterClick: (item: string) => () => {
        if (Default?.args) {
            Default.args.filterType = item;
        }
    },
    searchChange: (searchEvent: React.ChangeEvent<HTMLInputElement>) => {
        if (Default?.args) {
            Default.args.searchText = searchEvent.target.value;
        }
    },
};
