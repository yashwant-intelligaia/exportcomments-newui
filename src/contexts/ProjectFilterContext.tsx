"use client";

import { createContext, useState } from "react";

import { FilterType, ProjectFilterContextType } from "../types";

const Context = createContext({} as ProjectFilterContextType);
export const ProjectFilterContext = Context;
export const ProjectFilterContextProvider = ({ children }: any) => {
    const [filter, setFilter] = useState<FilterType>("");
    const [range, setRange] = useState<{ startDate: string; endDate: string }>(
        {} as { startDate: string; endDate: string },
    );
    return <Context.Provider value={{ filter, setFilter, range, setRange }}>{children}</Context.Provider>;
};
