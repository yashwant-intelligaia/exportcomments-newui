"use client";

import { Snackbar } from "@/components/ui/Snackbar";

import { SnackbarPropsType } from "../../../types";

const EcSnackbar = ({ title, message, duration, open, severity, onClose }: SnackbarPropsType) => (
    <Snackbar open={open} onClose={onClose ?? (() => undefined)} duration={duration} severity={severity} title={title} message={message} />
);

export { EcSnackbar };
