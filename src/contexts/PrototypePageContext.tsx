"use client";

import { createContext, useState } from "react";

import { PrototypePageContextType } from "../types/prototype";

const PrototypePageContext = createContext<PrototypePageContextType>({} as PrototypePageContextType);

const PrototypePageContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const [isVersionUpdated, setVersionUpdated] = useState<boolean>();

    const value: PrototypePageContextType = {
        drawerContent,
        setDrawerContent,
        isVersionUpdated,
        setVersionUpdated,
    };

    return <PrototypePageContext.Provider value={value}>{children}</PrototypePageContext.Provider>;
};

export { PrototypePageContext, PrototypePageContextProvider };
