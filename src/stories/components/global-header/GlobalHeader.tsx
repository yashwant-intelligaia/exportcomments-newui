"use client";

import "../../../index.scss";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { APP_CONSTANT } from "../../../constants/AppConstant";
import { AddButtons, AddProjectDrawer, AddUserDrawer } from "../../../containers";
import { AddProjectContext } from "../../../contexts";
import { UserContext } from "../../../contexts/UserContext";
import { useAuthMutations } from "../../../hooks/authHook";
import { AddButtonsOptionType } from "../../../types";
import { initOAuth } from "../../../utils";
import { SbLogo } from "../branding-logo/BrandingLogo";
import { EcTooltip } from "../EcTooltip";
import { Utilities } from "../utilities/Utilities";

type Anchor = "top" | "left" | "bottom" | "right";
const defaultPosition: Anchor = "left";

const LoginFigmaWrapper = styled.div`
    .login-page-btns {
        position: fixed;
        top: 7px;
        right: 15px;
        z-index: 101;
    }
    .login-page-btns .login-with-figma {
        background: transparent;
        box-shadow: none;
        color: #2979ff;
        border: 1px solid #2979ff;
        font-size: 0.875rem;
        text-transform: none;
        padding: 7px 15px;
        margin-left: 15px;
    }

    .login-page-btns .login-with-figma .katUps {
        height: 16px;
    }

    .login-page-btns .login-with-figma:hover {
        background: transparent;
        border: 1px solid #2979ff;
    }

    .login-page-btns .link-dashboard {
        padding: 7px 15px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #212121;
        margin-left: 15px;
    }

    @media screen and (max-width: 640px) {
        .login-page-btns {
            top: 9px;
        }
        .login-with-figma {
            font-size: 0.75rem !important;
            padding: 5px 10px !important;

            & > span:first-child {
                margin-right: 5px;
                img {
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
`;
const Icon = styled.img`
    height: 22px;
    width: 22px;
`;

const GlobalHeaderWarpper = styled.div`
    .navbar {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
    }

    .global-header .navbar-nav .nav-item {
        margin-left: 0.5rem;
    }

    .navbar-nav {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }

    .global-header .navbar-nav .nav-link {
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        border-radius: 5.625rem;
        padding: 0.375rem 1.125rem;
    }

    .global-header .utilities .dropdown-right .show {
        right: 0;
    }

    .mob-toggle {
        display: none;
    }

    @media (max-width: 1024px) {
        .global-header .navbar-nav .nav-link {
            padding: 0.375rem 0.875rem;
            font-size: 0.75rem;
        }
    }

    .global-header .navbar-nav .active .nav-link {
        background-color: #fff;
        color: #000;
    }
    .header-action-link li {
        display: inline-block;
    }

    @media (max-width: 991px) {
        .user-name-val {
            margin-left: 0;
        }
        .sidebar {
            position: absolute;
        }
    }

    .shadow-sm {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    }

    .user-name-val {
        font-size: 0.75rem;
        color: #fff;
        margin-left: 0.625rem;
    }

    li {
        list-style: none;
    }

    ml-auto,
    .mx-auto {
        margin-left: auto !important;
    }

    .list-unstyled {
        padding-left: 0;
        list-style: none;
    }
    .header-action-link {
        margin: 0;
        position: relative;
        display: flex;
    }

    .top-rightnav-links {
        position: absolute;
        right: 1rem;
    }
    .icon-action-arrow:before {
        content: "\e900";
        color: #fff;
    }

    .header-action-link li > a i.icon-action-arrow {
        font-size: 0.3125rem;
        margin-left: 0.5rem;
        color: #fff;
    }
    .user-dropdown {
        display: "flex";
        justify-content: center;
        align-items: center;
        padding-right: 0;
        .dropdown-menu {
            padding-top: 0.8rem;
            min-width: 14.5rem;
            margin-top: 0;
        }
    }

    .user-detail .avatar-name {
        color: #1a1a1a;
        font-weight: 700;
    }

    .show {
        right: 0 !important;
        left: auto !important;
    }

    .main-header {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px 10px 20px;
        background-color: #fff;
        position: fixed;
        top: 0;
        z-index: 100;
        -webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
        -moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
        box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
    }

    .brand-name {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
    }

    @media (max-width: 640px) {
        .main-header {
            padding-top: 12px;
            padding-right: 20px;
            padding-bottom: 10px;
            padding-left: 20px;
            height: 50px;
        }
    }

    @media (max-width: 767px) {
        .utilities {
            display: none;
        }
        .mob-toggle {
            display: block;
            position: absolute;
            left: 2px;
            top: 3px;
            button {
                border-radius: 50%;
                min-width: 40px;
                min-height: 40px;
            }
        }
    }
`;

export default function SwipeableTemporaryDrawer({ user }: any) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const { logoutUserSession } = useAuthMutations();

    const { token } = UserContext();
    const [isDrawer, setIsDrawer] = useState(true);

    useEffect(() => {
        if (token === "") {
            setIsDrawer(false);
        } else {
            setIsDrawer(true);
        }
    });
    const toggleDrawer =
        (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: 280,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="m-slide-menu"
        >
            <header>
                <div className="menu-avatar">
                    <Avatar alt="user" src={user.avatar} />
                </div>
                <span className="avatar-name"> {user.name} </span>
                <span className="avatar-email"> {user.email} </span>
            </header>
            <footer>
                <List>
                    <ListItem button key="item1" onClick={() => logoutUserSession()}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </footer>
        </Box>
    );

    return (
        <>
            {isDrawer && (
                <div className="mob-toggle">
                    <Button onClick={toggleDrawer(defaultPosition, true)}>
                        <MenuIcon />
                    </Button>
                    <SwipeableDrawer
                        anchor={defaultPosition}
                        open={state[defaultPosition]}
                        onClose={toggleDrawer(defaultPosition, false)}
                        onOpen={toggleDrawer(defaultPosition, true)}
                        className="md-none"
                    >
                        {list(defaultPosition)}
                    </SwipeableDrawer>
                </div>
            )}
        </>
    );
}
interface GlobalHeaderPropsType {
    headerValue?: string;
    onDrawerToggle?: () => void;
}
export const GlobalHeader = ({ headerValue, onDrawerToggle }: GlobalHeaderPropsType) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const { user: userDetail, token } = UserContext();
    const { setProjectData } = useContext(AddProjectContext);
    const { userOptions } = APP_CONSTANT;
    const svgIcon = <Icon alt="edit" className="icon" src="figma.svg" />;
    const handleDrawerClose = () => {
        setProjectData([]);
        setDrawerContent(undefined);
    };
    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const ADD_OPTIONS: AddButtonsOptionType[] = [
        {
            title: "Users",
            component: (
                <AddUserDrawer
                    onClose={() => {
                        setDrawerContent(undefined);
                    }}
                />
            ),
        },
        {
            title: "Projects",
            component: <AddProjectDrawer onClose={handleDrawerClose} />,
        },
    ];
    const handleButtonOptionClick = (index: number) => {
        setDrawerContent(ADD_OPTIONS[index].component);
    };

    return (
        <GlobalHeaderWarpper>
            {headerValue !== "responsiveDrawer" ? (
                <Box
                    className="main-header"
                    sx={{
                        pl: {
                            xs: token ? "50px !important" : "20px !important",
                            sm: token ? "50px !important" : "20px !important",
                            md: token ? "20px !important" : "20px !important",
                            lg: token ? "20px !important" : "20px !important",
                            xl: token ? "20px !important" : "20px !important",
                        },
                    }}
                >
                    <SwipeableTemporaryDrawer user={userDetail} />

                    <SbLogo />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        {token ? (
                            <>
                                <Box display="flex" flexDirection="row">
                                    <Box position="relative" minWidth="1.5rem" marginRight={2}>
                                        <Box
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    sm: "inline-flex",
                                                    md: "inline-flex",
                                                    lg: "inline-flex",
                                                    xl: "inline-flex",
                                                },
                                            }}
                                        >
                                            <AddButtons
                                                options={ADD_OPTIONS}
                                                onButtonClick={() => {}}
                                                onOptionClick={handleButtonOptionClick}
                                            />
                                        </Box>
                                        <EcTooltip
                                            title="Add New Users/Projects "
                                            description="New Users and Projects can be added from here."
                                            placement="left-start"
                                            arrow
                                        >
                                            <Box
                                                sx={{
                                                    display: {
                                                        xs: "inline-flex",
                                                        sm: "none",
                                                        md: "none",
                                                        lg: "none",
                                                        xl: "none",
                                                    },
                                                }}
                                            >
                                                <IconButton
                                                    aria-label="user-menu"
                                                    color="primary"
                                                    onClick={handleAddClick}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                <Menu
                                                    id="add-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={() => setAnchorEl(null)}
                                                >
                                                    {ADD_OPTIONS.map(({ title }, index) => (
                                                        <MenuItem
                                                            key={title}
                                                            onClick={() => {
                                                                handleButtonOptionClick(index);
                                                                setAnchorEl(null);
                                                            }}
                                                            id={`NB-select-option-${title}`}
                                                            style={{
                                                                minHeight: "1rem",
                                                            }}
                                                        >
                                                            {title}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Box>
                                        </EcTooltip>
                                    </Box>
                                    {Object.entries(userDetail).length > 0 && (
                                        <Utilities user={userDetail} userOptions={userOptions} />
                                    )}
                                </Box>
                            </>
                        ) : (
                            <LoginFigmaWrapper>
                                <div className="login-page-btns">
                                    <Button
                                        className="login-with-figma"
                                        size="large"
                                        onClick={() =>
                                            initOAuth({
                                                redirectUri: APP_CONSTANT.figmaApp.redirectUri,
                                            })
                                        }
                                        variant="contained"
                                        startIcon={svgIcon}
                                        id="LI-login-with-figma"
                                    >
                                        Login With Figma
                                    </Button>
                                </div>
                            </LoginFigmaWrapper>
                        )}
                    </div>
                </Box>
            ) : (
                <AppBar
                    position="fixed"
                    sx={{
                        background: "white",
                        boxShadow: " 0px 1px 1px 0px rgb(224, 224, 224)",
                    }}
                >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="outlined"
                                color="primary"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                sx={{
                                    mr: 2,
                                    display: { sm: "none" },
                                    minWidth: "inherit",
                                    padding: "2px 4px",
                                }}
                            >
                                <MenuIcon sx={{ fontSize: "1.25rem" }} />
                            </Button>
                            {/* <IconButton
                            color="primary"
                            aria-label="open drawer"
                            edge="start"
                            onClick={onDrawerToggle}
                            sx={{ mr:1,  display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                            <SbLogo />
                        </Box>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}
                        >
                            {token ? (
                                <>
                                    <Box display="flex" flexDirection="row">
                                        <Box position="relative" minWidth="1.5rem" marginRight={2}>
                                            <Box
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "inline-flex",
                                                        md: "inline-flex",
                                                        lg: "inline-flex",
                                                        xl: "inline-flex",
                                                    },
                                                }}
                                            >
                                                <AddButtons
                                                    options={ADD_OPTIONS}
                                                    onButtonClick={() => {}}
                                                    onOptionClick={handleButtonOptionClick}
                                                />
                                            </Box>
                                            <EcTooltip
                                                title="Add New Users/Projects "
                                                description="New Users and Projects can be added from here."
                                                placement="left-start"
                                                arrow
                                            >
                                                <Box
                                                    sx={{
                                                        display: {
                                                            xs: "inline-flex",
                                                            sm: "none",
                                                            md: "none",
                                                            lg: "none",
                                                            xl: "none",
                                                        },
                                                    }}
                                                >
                                                    <IconButton
                                                        aria-label="user-menu"
                                                        color="primary"
                                                        onClick={handleAddClick}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="add-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={() => setAnchorEl(null)}
                                                    >
                                                        {ADD_OPTIONS.map(({ title }, index) => (
                                                            <MenuItem
                                                                key={title}
                                                                onClick={() => {
                                                                    handleButtonOptionClick(index);
                                                                    setAnchorEl(null);
                                                                }}
                                                                id={`NB-select-option-${title}`}
                                                                style={{
                                                                    minHeight: "1rem",
                                                                }}
                                                            >
                                                                {title}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </Box>
                                            </EcTooltip>
                                        </Box>
                                        {Object.entries(userDetail).length > 0 && (
                                            <Utilities
                                                user={userDetail}
                                                userOptions={userOptions}
                                            />
                                        )}
                                    </Box>
                                </>
                            ) : (
                                <LoginFigmaWrapper>
                                    <div className="login-page-btns">
                                        <Button
                                            className="login-with-figma"
                                            size="large"
                                            onClick={() =>
                                                initOAuth({
                                                    redirectUri: APP_CONSTANT.figmaApp.redirectUri,
                                                })
                                            }
                                            variant="contained"
                                            startIcon={svgIcon}
                                            id="LI-login-with-figma"
                                        >
                                            Login With Figma
                                        </Button>
                                    </div>
                                </LoginFigmaWrapper>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            )}
            {drawerContent && drawerContent}
        </GlobalHeaderWarpper>
    );
};
