"use client";

import { createContext, useEffect, useState } from "react";

import { SizeContextType } from "../types";

export const SizeContext = createContext({} as SizeContextType);

export const SizeContextProvider = ({ children }: any) => {
    const [width, setWidth] = useState<number>(1280);
    const [height, setHeight] = useState<number>(800);
    const value = {
        width,
        height,
    };

    useEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};
