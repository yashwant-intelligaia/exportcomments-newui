import { useState } from "react";

import { EcSnackbar } from "./EcSnackbar";

export default {
    title: "Atomic/EcSnackbar",
    component: EcSnackbar,
};

/*
 * Example EcSnackbar story with React Hooks.
 */
export const Default = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <EcSnackbar
            message="Project Connected successfully"
            severity="success"
            onClose={handleClose}
            open={open}
            duration={2000}
        />
    );
};

export const Success = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <EcSnackbar
            title="Connect Project"
            message="You have successfully connected to the project with Notion"
            severity="success"
            onClose={handleClose}
            open={open}
            duration={2000}
        />
    );
};

export const Error = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <EcSnackbar
            title="Connect Project"
            message="Something went wrong!"
            severity="error"
            onClose={handleClose}
            open={open}
            duration={2000}
        />
    );
};

export const Warning = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <EcSnackbar
            title="Connect Project"
            message="You're not authorized to perform this action"
            severity="warning"
            onClose={handleClose}
            open={open}
            duration={2000}
        />
    );
};

export const Information = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <EcSnackbar
            title="Connect Project"
            message="Project has already been connected"
            severity="info"
            onClose={handleClose}
            open={open}
            duration={2000}
        />
    );
};
