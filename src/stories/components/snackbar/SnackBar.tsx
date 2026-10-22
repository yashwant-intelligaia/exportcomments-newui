"use client";

// TODO: remove this component once ToasterContext implemented at all places.
// We need to use EcSnackbar component in future
import { Slide, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";

import { ISnackBar } from "../../../types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const SnackBar = (props: ISnackBar) => {
    const { message, duration, severity, open, onClose } = props;
    const [active, setActive] = useState(open);
    const handleClose = () => {
        setActive(false);
        onClose();
    };
    return (
        <>
            <Snackbar
                autoHideDuration={duration}
                open={active}
                onClose={handleClose}
                TransitionComponent={Slide}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert severity={severity} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
