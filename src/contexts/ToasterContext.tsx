"use client";

import { AlertColor } from "@mui/material";
import { createContext, useState } from "react";

import { EcSnackbar } from "../stories/components";

interface ContentType {
    title?: string;
    message: string;
    duration?: number;
    severity?: AlertColor;
}

interface ToasterContextProviderPropsType {
    children: JSX.Element | JSX.Element[];
}

interface ToasterContextType {
    showToast: (props: ContentType) => void;
}

const ToasterContext = createContext({} as ToasterContextType);
function ToasterContextProvider({ children }: ToasterContextProviderPropsType) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<ContentType>({ message: "" });

    const showToast = ({ title, message, duration = 4000, severity = "success" }: ContentType) => {
        setContent({ title, severity, message, duration });
        setOpen(true);
    };

    return (
        <ToasterContext.Provider value={{ showToast }}>
            {children}
            <EcSnackbar onClose={() => setOpen(false)} open={open} {...content} />
        </ToasterContext.Provider>
    );
}

export { ToasterContext, ToasterContextProvider };
