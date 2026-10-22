"use client";

import { Box, Slide, Snackbar, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

import { SnackbarPropsType } from "../../../types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const EcSnackbar = (props: SnackbarPropsType) => {
    const { title, message, duration, open, severity, onClose } = props;
    return (
        <Snackbar
            autoHideDuration={duration}
            open={open}
            onClose={onClose}
            TransitionComponent={Slide}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Alert severity={severity} onClose={onClose}>
                <Box sx={{ pl: 1, pr: 3, maxWidth: 600 }}>
                    {title && <Typography variant="body1">{title}</Typography>}
                    <Typography variant="body2" sx={title ? { pt: 1 } : undefined}>
                        {message}
                    </Typography>
                </Box>
            </Alert>
        </Snackbar>
    );
};

export { EcSnackbar };
