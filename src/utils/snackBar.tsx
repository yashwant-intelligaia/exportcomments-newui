// TODO: remove this HOC once ToasterContext implemented at all places.
// We need to use EcSnackbar component in future
import { AlertColor } from "@mui/material";
import { useState } from "react";

import { SnackBar } from "../stories/components/snackbar/SnackBar";

export const snackbar =
    (WrappedComponent: any) =>
    (props: any): JSX.Element => {
        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState("I'm a custom snackbar");
        const [duration, setDuration] = useState(5000);
        const [severity, setSeverity] =
            useState<AlertColor>("success"); /** error | warning | info */

        const showMessage = (msg: string, SeverityType: AlertColor = "success", d = 5000) => {
            setMessage(msg);
            setSeverity(SeverityType);
            setDuration(d);
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <>
                <WrappedComponent {...props} snackbarShowMessage={showMessage} />
                {open && (
                    <SnackBar
                        message={message}
                        onClose={handleClose}
                        severity={severity}
                        open={open}
                        duration={duration}
                    />
                )}
            </>
        );
    };
