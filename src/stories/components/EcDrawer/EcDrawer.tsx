"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface EcDrawerPropsType {
    title: JSX.Element | string;
    open: boolean;
    direction: "left" | "right" | "top" | "bottom";
    onClose: () => void;
    children: JSX.Element | JSX.Element[];
    closeOnClickOutside?: boolean;
    customeWidth?: boolean;
    footer?: React.ReactNode;
}
const useStyles = makeStyles(() => ({
    drawer: {
        width: "672px",
    },

    "@media (max-width: 600px)": {
        drawer: {
            width: "400px",
            maxWidth: "100%",
        },
    },
}));
const EcDrawer = (props: EcDrawerPropsType) => {
    const classes = useStyles();
    const { title, open, direction, children, closeOnClickOutside, onClose, customeWidth, footer } =
        props;

    return (
        <Drawer
            anchor={direction}
            open={open}
            onClose={closeOnClickOutside ? onClose : undefined}
            sx={{ maxWidth: "100%", height: "100%" }}
        >
            <Box
                sx={{
                    padding: "0 1rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
                className={customeWidth ? classes.drawer : ""}
            >
                <Box
                    sx={{
                        borderBottom: "1px solid",
                        borderBottomColor: (theme) => theme.palette.grey[300],
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem 0rem",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5"> {title}</Typography>

                    <IconButton
                        aria-label="close drawer"
                        component="span"
                        onClick={onClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                            "&:hover": {
                                color: "#000",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        padding: "1rem 0",
                        overflowY: "auto",
                        maxWidth: "100%",
                        height: "100%",
                    }}
                >
                    {children}
                </Box>

                {footer && <Box mt={2}>{footer}</Box>}
            </Box>
        </Drawer>
    );
};

EcDrawer.defaultProps = {
    closeOnClickOutside: true,
};

export { EcDrawer };
