"use client";

// TODO: remove this component once ToasterContext implemented at all places.
import { useState } from "react";

import { Snackbar } from "@/components/ui/Snackbar";

import { ISnackBar } from "../../../types";

export const SnackBar = ({ message, duration, severity, open, onClose }: ISnackBar) => {
    const [active, setActive] = useState(open);
    const handleClose = () => {
        setActive(false);
        onClose();
    };
    return <Snackbar open={active} onClose={handleClose} duration={duration} severity={severity} message={message} />;
};
