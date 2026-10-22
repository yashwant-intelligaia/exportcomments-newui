import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Box, List, ListItemButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import checkCircle from "../../assets/check_circle.svg";
import figJamIcon from "../../assets/figjamIcon.svg";
import figmaIcon from "../../assets/figmaIcon.svg";
import { ProjectDetailsContext } from "../../contexts";

const useStyles: any = makeStyles({
    selectProject: {
        margin: "0",
        padding: "0",
    },
});

export const ProjectTitle = () => {
    const { projectId, projectData, projectList, setSelectedBranch } =
        useContext(ProjectDetailsContext);
    const projectMenuOptions = projectList.map(({ projectId: id, fileName }) => ({
        id,
        title: fileName,
    }));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [activeProject, setActiveProject] = useState<number>();
    const classes: any = useStyles();
    const history = useHistory();

    const handleCloseMenu = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    };

    const handleSelectProject = (id: number) => {
        setSelectedBranch(undefined);
        handleCloseMenu();
        history.push(`/project/${id}/details`);
    };

    useEffect(() => {
        if (projectId) {
            setActiveProject(projectId);
        }
    }, [projectId]);

    return (
        <>
            <List style={{ display: "flex", alignItems: "flex-start" }} disablePadding>
                <img
                    src={projectData?.editorType === "figjam" ? figJamIcon : figmaIcon}
                    alt="icon"
                    style={{
                        marginRight: "10px",
                        height: "24px",
                        width: "24px",
                    }}
                />
                <Box display="flex" flexDirection="column" gap={1}>
                    <ListItemButton
                        id="Select-Project"
                        aria-haspopup="listbox"
                        aria-controls="project-menu"
                        aria-label="Project"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={(event: any) => {
                            setAnchorEl(event.currentTarget);
                            setOpenMenu(!openMenu);
                        }}
                        className={classes.selectProject}
                        alignItems="flex-start"
                        sx={{
                            background: "none",
                            "&:hover,&:active,&:focus,&.Mui-focusVisible,&[aria-expanded='true']": {
                                background: "none",
                                boxShadow: "none",
                            },
                            "&:hover": {
                                background: "none",
                                svg: {
                                    color: "#2979ff",
                                },
                            },
                            "&[aria-expanded='true']": {
                                svg: {
                                    transform: "rotate(180deg)",
                                    color: "#2979ff",
                                },
                            },
                            ".MuiTouchRipple-root": {
                                display: "none",
                            },
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={1}>
                            <h4
                                className="heading--h4"
                                style={{
                                    maxWidth: "300px",
                                    height: "30px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    wordWrap: "break-word",
                                }}
                            >
                                {projectData?.fileName}
                            </h4>
                        </Box>
                        <ExpandMoreIcon />
                    </ListItemButton>
                    <Box
                        sx={{
                            display: "block",
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#616161",
                            paddingLeft: {
                                xl: 0,
                                lg: 0,
                                md: 0,
                                sm: "5px",
                                xs: "5px",
                            },
                        }}
                    >
                        Last updated on {moment(projectData?.createdAt).format("ll")}
                    </Box>
                </Box>
                {/* <Box className="lastdate">Last updated on {moment(fileInfo?.createdAt).format("ll")}</Box> */}
            </List>
            <Menu
                id="ProjectName"
                open={openMenu}
                onClose={() => handleCloseMenu()}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                {projectMenuOptions.map(({ id, title }) => (
                    <MenuItem
                        key={`project-menu-option-${id}`}
                        onClick={() => {
                            handleSelectProject(id);
                        }}
                        disabled={activeProject === id}
                        selected={activeProject === id}
                    >
                        <h4
                            style={{
                                margin: "0px 40px 0px 0px",
                                padding: "0px",
                                flexGrow: 1,
                                fontWeight: "normal",
                                maxWidth: "300px",
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                            }}
                        >
                            {title}
                        </h4>
                        {activeProject === id && <img src={checkCircle} alt="checkCircle" />}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
