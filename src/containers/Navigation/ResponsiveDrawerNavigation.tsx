import {
    Avatar,
    Box,
    Divider,
    List,
    // ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { UserContext } from "../../contexts";
import { useAuthMutations } from "../../hooks/authHook";

// import { Dashboardicon, Projecticon, TaskIcon } from "../../utils";

const ResponsiveDrawerNavigation = () => {
    const { user: userDetail } = UserContext();
    const { logoutUserSession } = useAuthMutations();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {isMobile && (
                <Box sx={{ width: "100%" }} role="presentation" className="m-slide-menu">
                    <header>
                        <Box className="menu-avatar">
                            <Avatar
                                style={{ width: "80px", height: "80px" }}
                                alt="user"
                                src={userDetail.avatar}
                            />
                        </Box>
                        <Box className="avatar-name"> {userDetail.name} </Box>
                        <Box className="avatar-email"> {userDetail.email}</Box>
                    </header>
                </Box>
            )}

            {/* TODO: uncomment below code to enable navigation links in responsive drawer */}
            {/* <Box sx={{ flexGrow: 1 }}>
                <List
                    sx={{
                        ".MuiListItemButton-root:hover,.Mui-selected": {
                            background: "#EBF2FF",
                            color: "#5494FF",
                            ".MuiListItemIcon-root svg path": {
                                stroke: "#5494FF",
                            },
                        },
                        ".MuiListItemIcon-root": {
                            minWidth: "35px",
                            "& svg path": {
                                stroke: "#3A3A44",
                            },
                        },
                    }}
                >
                    <ListItem disablePadding onClick={() => {}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Dashboardicon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => {}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Projecticon />
                            </ListItemIcon>
                            <ListItemText primary="Project" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => {}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="Task" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box> */}

            {isMobile && (
                <footer style={{ marginTop: "auto" }}>
                    <Divider />
                    <List>
                        <ListItemButton key="logout" onClick={logoutUserSession}>
                            <ListItemText sx={{ textAlign: "center" }} primary="Logout" />
                        </ListItemButton>
                    </List>
                </footer>
            )}
        </Box>
    );
};

export { ResponsiveDrawerNavigation };
