import {
    ArrowDropDown as ArrowDropDownIcon,
    FileDownloadOutlined as FileDownloadOutlinedIcon,
    MoreVert as MoreVertIcon,
    Share as ShareIcon,
    Star as StarIcon,
    StarOutline as StarOutlineIcon,
} from "@mui/icons-material";
import { Box, IconButton, List, ListItemButton, Menu, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import branchIcons from "../../assets/branch-icon-black.svg";
import checkCircle from "../../assets/check_circle.svg";
import { ProjectDetailsContext, UserContext } from "../../contexts";
import { useFetchProjectBranch, useProjectMutations } from "../../hooks";
// import newIcon from "../../assets/new-icon.svg";
import { EcTooltip } from "../../stories/components";
import { BranchIcon, exportCommentsToExcel } from "../../utils";
import { ManageTeamModal } from "../Modal";

const Container = styled.div`
    .inline-listing {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        padding: 0;
        margin-top: -10px;

        @media (max-width: 1366px) {
            padding: 10px 0px;
        }
        @media (max-width: 480px) {
            margin: 0;
            padding: 0px 0px;
        }
        &.with-seprator {
            li {
                position: relative;
                &::before {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -7px;
                    width: 1px;
                    background-color: #9e9e9e;
                    height: 14px;
                }

                &:last-child {
                    &::before {
                        display: none;
                    }
                }
                @media (max-width: 480px) {
                    &:first-child {
                        padding-left: 0;
                    }
                }
            }
        }
        li {
            line-height: 1;
            padding: 0 5px;

            a {
                color: #2979ff;
                text-decoration: none;
                cursor: pointer;
                &.disable {
                    color: #9e9e9e;
                    cursor: not-allowed;
                }
            }
            &:last-child {
                @media (max-width: 480px) {
                    padding: 10px 0px;
                }
            }
        }
    }
`;

const useStyles = makeStyles({
    selectProject: {
        margin: "0",
        padding: "0",
    },
});

export const ProjectActions = () => {
    const {
        projectId,
        projectData,
        commentfilter,
        originalComments,
        projectCommentInfo,
        selectedBranch,
        setSelectedBranch,
    } = useContext(ProjectDetailsContext);

    const { user } = UserContext();
    const { data: branchList } = useFetchProjectBranch(projectId);
    const {
        markAsFavourite: { mutateAsync: mutateMarkAsRead },
    } = useProjectMutations();
    const branchOptions =
        branchList?.map(({ key, name }) => ({
            id: key,
            title: name,
        })) || [];
    const [anchorElBranch, setAnchorElBranch] = useState<null | HTMLElement>(null);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [modal, setModal] = useState<null | JSX.Element>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const classes = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelectMenuOption = (id?: string) => {
        const selectedBranchOption = branchOptions.find((branch) => branch.id === id);
        if (selectedBranchOption) {
            setSelectedBranch({
                key: selectedBranchOption.id,
                name: selectedBranchOption.title,
            });
        } else {
            setSelectedBranch(undefined);
        }
        setAnchorElBranch(null);
    };

    const handleMarkAsFavorite = (status: boolean) => {
        mutateMarkAsRead({ projectId, status }).then(() => {
            setIsFavourite(status);
        });
    };

    const handleShareProject = () => {
        setModal(<ManageTeamModal projectId={projectId} onClose={() => setModal(null)} />);
    };

    useEffect(() => {
        if (projectData) {
            setIsFavourite(projectData.isFavorite !== 0);
        }
    }, [projectData]);

    const handleDownloadComments = () => {
        if (projectData) {
            exportCommentsToExcel(originalComments, commentfilter, user, projectCommentInfo);
        }
    };
    return (
        <>
            {/* Actions for Mobile screens */}
            <Box
                marginLeft="auto"
                sx={{
                    display: {
                        xl: "none",
                        lg: "none",
                        md: "none",
                        sm: "none",
                        xs: "block",
                    },
                }}
            >
                <IconButton color="primary" sx={{ marginLeft: "auto" }} onClick={handleClick}>
                    <MoreVertIcon sx={{ fontSize: "1.75rem" }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem
                        onClick={() => {
                            handleMarkAsFavorite(!isFavourite);
                            setAnchorEl(null);
                        }}
                        sx={{ gap: 1 }}
                    >
                        {isFavourite ? (
                            <StarIcon color="primary" />
                        ) : (
                            <StarOutlineIcon color="primary" />
                        )}
                        {isFavourite ? "Remove from Favourite" : "Add to Favourite"}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleDownloadComments();
                            setAnchorEl(null);
                        }}
                        sx={{ gap: 1 }}
                    >
                        <FileDownloadOutlinedIcon color="primary" />
                        Download
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleShareProject();
                            setAnchorEl(null);
                        }}
                        sx={{ gap: 1 }}
                    >
                        <ShareIcon color="primary" style={{ fontSize: "1.25rem" }} /> Share
                    </MenuItem>
                    {branchOptions.length > 0 && (
                        <MenuItem
                            onClick={() => {
                                setAnchorElBranch(anchorEl);
                                setAnchorEl(null);
                            }}
                            sx={{ gap: 1 }}
                        >
                            <BranchIcon /> Select Branch
                        </MenuItem>
                    )}
                </Menu>
            </Box>
            {/* Actions for Mobile screens Ends */}

            {/* Actions for Other screens */}
            <Box
                sx={{
                    display: {
                        xl: "block",
                        lg: "block",
                        md: "block",
                        sm: "block",
                        xs: "none",
                    },
                }}
            >
                <Container>
                    <ul className="inline-listing with-seprator">
                        <li role="presentation">
                            <EcTooltip
                                title={isFavourite ? "Remove from Favourite" : "Add to Favourite"}
                                placement="top"
                                arrow
                            >
                                <IconButton
                                    color="primary"
                                    aria-label={
                                        isFavourite ? "Remove from Favourite" : "Add to Favourite"
                                    }
                                    onClick={() => handleMarkAsFavorite(!isFavourite)}
                                >
                                    {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
                                </IconButton>
                            </EcTooltip>
                        </li>
                        <li>
                            {projectData?.allComments === 0 ? (
                                <IconButton
                                    color="primary"
                                    aria-label="Download"
                                    disabled
                                    onClick={handleDownloadComments}
                                    aria-hidden={projectData?.allComments === 0}
                                >
                                    <FileDownloadOutlinedIcon />
                                </IconButton>
                            ) : (
                                <EcTooltip title="Download" placement="top" arrow>
                                    <IconButton
                                        color="primary"
                                        aria-label="Download"
                                        onClick={handleDownloadComments}
                                        aria-hidden={projectData?.allComments === 0}
                                    >
                                        <FileDownloadOutlinedIcon />
                                    </IconButton>
                                </EcTooltip>
                            )}
                        </li>
                        <li role="presentation" onClick={handleShareProject}>
                            <EcTooltip title="Share" placement="top" arrow>
                                <IconButton color="primary" aria-label="Share">
                                    <ShareIcon style={{ fontSize: "1.25rem" }} />
                                </IconButton>
                            </EcTooltip>
                        </li>

                        {/* Branch List */}
                        {branchOptions?.length > 0 && (
                            <li
                                role="presentation"
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <IconButton color="primary" aria-label="Share">
                                    <BranchIcon />
                                </IconButton>
                                <List disablePadding>
                                    <ListItemButton
                                        id="Select-Branch"
                                        aria-haspopup="listbox"
                                        aria-controls="branch-menu"
                                        aria-label="Branch"
                                        aria-expanded={anchorElBranch ? "true" : undefined}
                                        onClick={(event) => {
                                            setAnchorElBranch(event.currentTarget);
                                        }}
                                        className={classes.selectProject}
                                        disableRipple
                                        sx={{
                                            "&:hover": {
                                                background: "transparent",
                                            },
                                            height: "30px",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            fontSize={14}
                                            fontWeight={500}
                                            style={{
                                                marginTop: "5px",
                                                color: "#1976d2",
                                            }}
                                        >
                                            {selectedBranch?.name || "Main"}
                                            {!selectedBranch && ` (${branchOptions.length})`}
                                        </Typography>
                                        <ArrowDropDownIcon
                                            style={{
                                                marginTop: "5px",
                                            }}
                                        />
                                    </ListItemButton>
                                </List>
                                <Menu
                                    id="BranchName"
                                    open={!!anchorElBranch}
                                    onClose={() => {
                                        setAnchorElBranch(null);
                                    }}
                                    anchorEl={anchorElBranch}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                >
                                    {/* Default Menu Item */}
                                    <MenuItem
                                        sx={{
                                            minWidth: "180px",
                                            height: "45px",
                                            padding: "5px 10px",
                                            fontSize: "14px",
                                            border: "none",
                                            borderBottom: "1px solid #b8bbbf",
                                            cursor: "pointer",
                                            background: "#EFEFEF",
                                            "&:hover": {
                                                background: "#EFEFEF",
                                            },
                                        }}
                                        selected={!selectedBranch?.key}
                                        onClick={() => {
                                            handleSelectMenuOption("");
                                            setSelectedBranch(undefined);
                                            setAnchorElBranch(anchorEl);
                                        }}
                                    >
                                        <Box
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    paddingRight: "8px",
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    fontSize={14}
                                                    fontWeight={500}
                                                >
                                                    {projectData?.fileName}
                                                </Typography>
                                            </Box>
                                            <Box
                                                style={{
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Main
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                    {/* Default Menu Item Ends */}

                                    {/* Branch Options Lists */}
                                    {branchOptions.map(({ id, title }) => (
                                        <MenuItem
                                            key={`project-branch-${id}`}
                                            onClick={() => handleSelectMenuOption(id)}
                                            selected={selectedBranch?.key === id}
                                            sx={{
                                                "&:hover": {
                                                    background: "#EBF2FF !important",
                                                },
                                                height: "40px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={branchIcons}
                                                    alt="prototypeIcon"
                                                    style={{
                                                        paddingRight: "10px",
                                                    }}
                                                />
                                                <Typography
                                                    variant="h5"
                                                    fontSize={14}
                                                    fontWeight={500}
                                                    maxWidth={300}
                                                    style={{
                                                        margin: "0px 50px 0px 0px",
                                                    }}
                                                >
                                                    {title}
                                                </Typography>
                                            </Box>
                                            {selectedBranch?.key === id && (
                                                <img
                                                    src={checkCircle}
                                                    alt="selected"
                                                    style={{ position: "absolute", right: 15 }}
                                                />
                                            )}
                                        </MenuItem>
                                    ))}
                                    {/* Branch Options Lists Ends */}
                                </Menu>
                                {/* <img src={newIcon} alt="newIcon" /> */}
                            </li>
                        )}
                        {/* Branch List Ends */}
                    </ul>
                </Container>
            </Box>
            {/* Actions for Other screens Ends */}
            {modal && modal}
        </>
    );
};
