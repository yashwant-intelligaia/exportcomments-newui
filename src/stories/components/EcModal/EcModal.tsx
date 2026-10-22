"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Breakpoint, Container, IconButton, Modal, Stack, Typography } from "@mui/material";
import { isArray } from "lodash";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";
import { EcButton } from "../EcButton/EcButton";

interface EcModalPropsType {
    open: boolean;
    children?: JSX.Element;
    title: JSX.Element;
    onClose: () => void;
    size?: Breakpoint;
    icon?: JSX.Element;
    subtitle?: string;
    closeOnClickOutside?: boolean;
    actionButtons?: ActionButtonType | ActionButtonType[];
    showCloseIcon?: boolean;
    textAlign?: "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";
}

const EcModal = (props: EcModalPropsType) => {
    const {
        icon,
        size,
        children,
        open,
        title,
        subtitle,
        onClose,
        actionButtons,
        closeOnClickOutside,
        showCloseIcon,
        textAlign,
    } = props;
    return (
        <Modal
            open={open}
            onClose={closeOnClickOutside ? onClose : undefined}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container
                maxWidth={size}
                sx={{
                    p: 4,
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign,
                    borderRadius: 1,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {showCloseIcon && <CloseIcon />}
                </IconButton>
                {icon && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            height: "85px",
                            my: 2,
                        }}
                    >
                        {icon}
                    </Box>
                )}
                {title && title}
                {subtitle && <Typography variant="body2">{subtitle}</Typography>}

                {children && children}
                {/* TODO: check gap between content and actionButton for success modal */}
                {actionButtons && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {isArray(actionButtons) && (
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={{ xs: 1, sm: 2, md: 1 }}
                                sx={{ pt: 1 }}
                            >
                                {actionButtons.map(
                                    (
                                        {
                                            label: buttonLabel,
                                            onClick,
                                            size: actionButtonSize,
                                            variant,
                                        },
                                        index
                                    ) => (
                                        <EcButton
                                            variant={variant}
                                            size={actionButtonSize || "small"}
                                            key={uniqueKey(index)}
                                            onClick={onClick}
                                            aria-label={buttonLabel}
                                        >
                                            {buttonLabel}
                                        </EcButton>
                                    )
                                )}
                            </Stack>
                        )}

                        {!isArray(actionButtons) && (
                            <EcButton
                                variant="contained"
                                {...actionButtons}
                                aria-label={actionButtons?.label}
                                sx={{ mt: 2 }}
                            >
                                {actionButtons?.label}
                            </EcButton>
                        )}
                    </Box>
                )}
            </Container>
        </Modal>
    );
};

EcModal.defaultProps = {
    size: "xs",
    closeOnClickOutside: false,
    actionButtons: [],
    textAlign: undefined,
};

export { EcModal };
