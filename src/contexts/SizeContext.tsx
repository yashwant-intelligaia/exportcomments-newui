import { createContext, useLayoutEffect, useState } from "react";

import { SizeContextType } from "../types";

export const SizeContext = createContext({} as SizeContextType);

export const SizeContextProvider = ({ children }: any) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const value = {
        width,
        height,
    };

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        window.addEventListener("resize", updateSize);
        // updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};
