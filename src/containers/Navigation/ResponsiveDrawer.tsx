"use client";

import { Box, CssBaseline, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

import { GlobalHeader } from "../../stories/components/global-header/GlobalHeader";
import { ResponsiveDrawerNavigation } from "./ResponsiveDrawerNavigation";

const DRAWER_WIDTH = 240;

const ResponsiveDrawer = ({ children }: { children: JSX.Element }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <GlobalHeader headerValue="responsiveDrawer" onDrawerToggle={handleDrawerToggle} />

            {/*
                NOTE: Added below condition to display responsive drawer for Mobile screens only.
                TODO: remove below condition to display navigation links for all screens.
            */}
            {isMobile && (
                <Box
                    component="nav"
                    sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* For Mobile screens */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: DRAWER_WIDTH,
                            },
                        }}
                    >
                        <ResponsiveDrawerNavigation />
                    </Drawer>

                    {/* For Tablet/Desktop screens */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: DRAWER_WIDTH,
                                padding: "80px 10px",
                                zIndex: "1000",
                            },
                        }}
                        open
                    >
                        <ResponsiveDrawerNavigation />
                    </Drawer>
                </Box>
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: {
                        xl: "2rem 1rem",
                        lg: "2rem 1rem",
                        md: "2rem 1rem",
                        sm: "2rem 1rem",
                        xs: "2rem 1rem",
                    },
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    bgcolor: "#f9f9fa",
                    maxWidth: "xxl",
                    minHeight: "calc(100vh - 3.75rem)",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export { ResponsiveDrawer };
