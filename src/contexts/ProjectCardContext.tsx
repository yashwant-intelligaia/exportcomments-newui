"use client";

import { createContext, useState } from "react";

import { ProjectCardContextType, ProjectCardDataType } from "../types/project";

interface ProjectCardContextProviderPropsType {
    children: JSX.Element | JSX.Element[];
}

const ProjectCardContext = createContext<ProjectCardContextType>({} as ProjectCardContextType);
const ProjectCardContextProvider = ({ children }: ProjectCardContextProviderPropsType) => {
    const [data, setData] = useState<ProjectCardDataType>({} as ProjectCardDataType);
    const value: ProjectCardContextType = {
        data,
        setData,
    };

    return <ProjectCardContext.Provider value={value}>{children}</ProjectCardContext.Provider>;
};

export { ProjectCardContext, ProjectCardContextProvider };
