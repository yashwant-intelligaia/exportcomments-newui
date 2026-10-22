"use client";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { IconButton, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

import figJamIcon from "../../../assets/figjamIcon.svg";
import figmaIcon from "../../../assets/figmaIcon.svg";
import { useProjectMutations } from "../../../hooks";
import { ActionMenuItemType } from "../../../types";
import { getFigjamLink, openLink } from "../../../utils";
import { EcActionMenu } from "../EcActionMenu/EcActionMenu";
import { EcEditMode } from "../EcEditMode";
import { EcTooltip } from "../EcTooltip";

const CardsStyled = styled.div`
    .card-wrap {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        background: #ffffff;
        display: inline-flex;
        .card-header {
            .card-header-left {
                max-width: calc(100% - 80px);
                flex-grow: 1;
                form {
                    width: 100%;
                }
            }
            h6 {
                font-size: 1rem;
                color: #383874;
                line-height: 24px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                @media (max-width: 600px) {
                    max-width: 134px;
                }
            }
            .share-detail {
                svg {
                    font-size: 1.25rem;
                }
            }
            a {
                cursor: pointer;
            }
            .bookmarkIconWrap {
                svg {
                    font-size: 1.425rem;
                    color: #2979ff;
                }
            }
        }
        .disable {
            color: #9e9e9e;
            cursor: not-allowed !important;
        }
        .dateUpdate {
            font-size: 0.75rem;
            color: #383874;
            line-height: 16px;
            opacity: 0.6;
        }
        .MuiTypography-body2 {
            color: #818181;
            font-size: 0.75rem;
            margin-bottom: 0.375rem;
        }
    }
    .comment-wrap {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        li {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin-right: 0;
            min-width: 46px;
            padding: 0.5rem;
            transition: background 0.5s;
            border-radius: 0.5rem;
            @media (max-width: 600px) {
                padding: 0.5rem 0.325rem;
                min-width: inherit;
            }
            &:hover {
                background: #d8e6ff;
            }
            .comment-list {
                width: 48px;
                height: 48px;
                display: inline-flex;
                font-size: 12px;
                font-weight: 700;
                font-family: arial;
                position: relative;
                color: #fff;
                border-radius: 50%;
                transform: rotate(-45deg);
                justify-content: center;
                align-items: center;
                // border: solid 1px #ffff;
                cursor: pointer;
                &:hover {
                    // box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
                    // transition: 0.5s;
                    // scale: 1.15;
                }
                &-number {
                    transform: rotate(45deg);
                    font-size: 1rem;
                    font-weight: 600;
                    color: #000;
                }
                &-text {
                    position: static;
                    color: #3b457b;
                    font-size: 0.75rem;
                    line-height: 18px;
                    margin-top: 0.75rem;
                    transition: all 0.05s ease 0s;
                    font-weight: 500;
                }
                &.all-comment {
                    background: #ebf2ff;
                }
                &.new-comment {
                    background: #f0f0f1;
                    color: #18b7fb;
                }
                &.my-comment {
                    background: #f0f1f9;
                }
                &.resolved-comment {
                    background: #edf6ee;
                }
                &.unresolved-comment {
                    background: #feedec;
                }
            }
            .comment-list-side {
                width: 45px;
                height: 45px;
                display: inline-flex;
                font-size: 12px;
                font-weight: 700;
                font-family: arial;
                position: relative;
                color: #fff;
                border-radius: 50%;
                //border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                justify-content: center;
                align-items: center;
                //border: solid 1px #ffff;
                // cursor: pointer;
                &:hover {
                    // box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
                    // transition: 0.5s;
                    // scale: 1.15;
                }
                &-number {
                    transform: rotate(45deg);
                    font-size: 0.75rem;
                    font-weight: 400;
                }
                &-text {
                    position: static;
                    color: #818181;
                    font-size: 0.75rem;
                    line-height: 18px;
                    margin-top: 0.75rem;
                    transition: all 0.05s ease 0s;
                }
                // &.all-comment {
                //     background: #18b7fb;
                // }
                // &.new-comment {
                //     background: #fff;
                //     color: #18b7fb;
                // }
                // &.my-comment {
                //     background: #70d8e6;
                // }
                // &.resolved-comment {
                //     background: #00ca5f;
                // }
                // &.unresolved-comment {
                //     background: #f4b511;
                // }
                &.all-comment {
                    background: #ebf2ff;
                }
                &.new-comment {
                    background: #f0f0f1;
                    color: #18b7fb;
                }
                &.my-comment {
                    background: #f0f1f9;
                }
                &.resolved-comment {
                    background: #edf6ee;
                }
                &.unresolved-comment {
                    background: #feedec;
                }
            }
            &:hover {
                .comment-list-text {
                    font-weight: 500;
                }
            }
            &:nth-last-child(2) {
                min-width: 50px;
            }
            &:last-child {
                margin-right: 0;
                min-width: 62px;
            }
        }
    }
    .line-divider {
        margin-top: 25px;
        border: none;
        border-top: 2px dashed #ccc;
    }
    .associated-prototypes {
        display: flex;
        align-items: flex-start;
        margin-top: 15px;
    }

    .vertical-line {
        width: 1px;
        height: 14px;
        background-color: #ccc;
        margin: 0 10px;
        display: inline-block;
    }

    .view-all-link {
        display: flex;
        align-items: center;
    }

    .view-all-link a {
        color: blue;
        font-size: 12px;
        margin-left: 10px;
    }
`;

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: "#212121",
        fontSize: 12,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.25)",
        padding: "10px",
        lineHeight: "16px",
        letterSpacing: "0.5px",
    },
}));

export const Cards = ({
    item,
    isFavorite,
    createdAt,
    filterType,
    editorType,
    onShareProject,
    handleCardClose,
    handleMarkAsFavourite,
    openAllComments,
    usedIn,
    openResolvedComments,
    openUnresolvedComments,
    openUnreadComments,
    openOwnComments,
    allComments,
    myComments,
    newComments,
    resolvedComments,
    unresolvedComments,
    handleDownloadExcel,
    onDeleteProject,
    prototypeCount,
    handleViewPrototypeLink,
}: any) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const [projectTitle, setProjectTitle] = useState(decodeURIComponent(filterType));
    const isMenuOpen = Boolean(anchorEl);
    const items: ActionMenuItemType[] = [
        {
            label: "Share",
            onClick: () => {
                onShareProject();
                setAnchorEl(undefined);
            },
            icon: <ShareIcon fontSize="small" />,
        },
        {
            label: "Download",
            onClick: () => {
                if (allComments) handleDownloadExcel();
            },
            icon: <FileDownloadOutlinedIcon fontSize="small" />,
            disabled: allComments === 0,
        },
        {
            label: "Remove",
            onClick: () => {
                onDeleteProject();
                setAnchorEl(undefined);
            },
            icon: <DeleteIcon fontSize="small" />,
        },
    ];
    const { updateProject } = useProjectMutations();
    const { mutate: mutateUpdateProject, isLoading: isUpdatingTitle } = updateProject;
    const handleUpdateTitle = async (value: string) => {
        try {
            setProjectTitle(value);
            await mutateUpdateProject({
                name: value,
                projectId: item.projectId,
            });
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleViewFigjamLink = () => {
        const url = getFigjamLink({ fileKey: item.fileId, fileName: item.fileName });
        openLink({ url, target: "_blank" });
    };

    return (
        <CardsStyled>
            <Card className="card-wrap">
                <CardContent component="div" style={{ paddingBottom: "10px" }}>
                    <Box
                        className="card-header"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            className="card-header-left"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {usedIn === "sideDrawer" && (
                                <EcTooltip
                                    title={editorType === "figma" ? "Design file" : "FigJam board"}
                                    arrow
                                    placement="top"
                                >
                                    <img
                                        src={editorType === "figma" ? figmaIcon : figJamIcon}
                                        alt="Figma"
                                        style={{
                                            marginRight: "10px",
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </EcTooltip>
                            )}
                            {usedIn === "projectList" && (
                                <EcTooltip
                                    title={editorType === "figma" ? "Design file" : "FigJam board"}
                                    arrow
                                    placement="top"
                                >
                                    <img
                                        src={editorType === "figma" ? figmaIcon : figJamIcon}
                                        alt="Figma"
                                        style={{
                                            marginRight: "10px",
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </EcTooltip>
                            )}

                            {usedIn === "projectList" ? (
                                <EcEditMode
                                    placeholder="Enter project title"
                                    title={projectTitle}
                                    onSubmit={handleUpdateTitle}
                                    name="project"
                                    showTooltip
                                    isLoading={isUpdatingTitle}
                                />
                            ) : (
                                <LightTooltip title={projectTitle} placement="top" arrow>
                                    <Typography variant="h6">{projectTitle}</Typography>
                                </LightTooltip>
                            )}
                        </Box>
                        {usedIn === "projectList" && (
                            <>
                                {isFavorite ? (
                                    <EcTooltip title="Remove From Favourite" placement="top" arrow>
                                        <IconButton
                                            sx={{
                                                padding: "4px",
                                            }}
                                            onClick={handleMarkAsFavourite}
                                        >
                                            <StarIcon color="primary" />
                                        </IconButton>
                                    </EcTooltip>
                                ) : (
                                    <EcTooltip title="Add To Favourite" placement="top" arrow>
                                        <IconButton
                                            sx={{
                                                padding: "4px",
                                            }}
                                            onClick={handleMarkAsFavourite}
                                        >
                                            <StarOutlineIcon />
                                        </IconButton>
                                    </EcTooltip>
                                )}
                                <Box
                                    className="card-header-right"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        maxWidth: "1.5rem",
                                    }}
                                >
                                    <IconButton
                                        component="a"
                                        aria-label="expand-feature"
                                        style={isMenuOpen ? { color: "#2979ff" } : {}}
                                        sx={{
                                            padding: "0px",
                                        }}
                                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                                            setAnchorEl(event.currentTarget)
                                        }
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <EcActionMenu
                                        open={isMenuOpen}
                                        anchorEl={anchorEl}
                                        items={items}
                                        onClose={() => setAnchorEl(undefined)}
                                    />
                                </Box>
                            </>
                        )}

                        {usedIn === "sideDrawer" && (
                            <Box
                                className="card-header-right"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    flex: "0 0 50px",
                                }}
                            >
                                <CloseIcon cursor="pointer" onClick={handleCardClose} />
                            </Box>
                        )}
                    </Box>
                    <Typography sx={{ mb: 3 }} className="dateUpdate" color="text.secondary">
                        Last updated on {moment(new Date(createdAt)).format("ll")}
                    </Typography>
                    <Typography variant="body2">Comments</Typography>
                    <ul className="comment-wrap">
                        <li>
                            <Box
                                className={`all-comment comment-list${
                                    usedIn === "sideDrawer" ? "-side" : ""
                                }`}
                                onClick={openAllComments}
                            >
                                <span className="comment-list-number">{allComments}</span>
                            </Box>
                            <span className="comment-list-text">All</span>
                        </li>
                        <li>
                            <Box
                                className={`new-comment comment-list${
                                    usedIn === "sideDrawer" ? "-side" : ""
                                }`}
                                onClick={openUnreadComments}
                            >
                                <span className="comment-list-number">{newComments}</span>
                            </Box>

                            <span className="comment-list-text">Unread</span>
                        </li>
                        <li>
                            <Box
                                className={`my-comment comment-list${
                                    usedIn === "sideDrawer" ? "-side" : ""
                                }`}
                                onClick={openOwnComments}
                            >
                                <span className="comment-list-number">{myComments}</span>
                            </Box>

                            <span className="comment-list-text">My</span>
                        </li>
                        <li>
                            <Box
                                className={`resolved-comment comment-list${
                                    usedIn === "sideDrawer" ? "-side" : ""
                                }`}
                                onClick={openResolvedComments}
                            >
                                <span className="comment-list-number">{resolvedComments}</span>
                            </Box>

                            <span className="comment-list-text">Resolved</span>
                        </li>
                        <li>
                            <Box
                                className={`unresolved-comment comment-list${
                                    usedIn === "sideDrawer" ? "-side" : ""
                                }`}
                                onClick={openUnresolvedComments}
                            >
                                <span className="comment-list-number">{unresolvedComments}</span>
                            </Box>

                            <span className="comment-list-text">Unresolved</span>
                        </li>
                    </ul>
                    {usedIn === "projectList" && <div className="line-divider" />}

                    {usedIn === "projectList" && (
                        <div className="associated-prototypes" style={{ whiteSpace: "nowrap" }}>
                            <Link
                                style={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={
                                    item.editorType === "figma"
                                        ? handleViewPrototypeLink
                                        : handleViewFigjamLink
                                }
                            >
                                <PlayArrowRoundedIcon
                                    style={{
                                        color: "var(--Blue-60, #2979FF)",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: "var(--Blue-60, #2979FF)",
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "21px",
                                        letterSpacing: "0.035px",
                                        textDecoration: "underline",
                                    }}
                                >
                                    {item.editorType === "figma"
                                        ? "View Prototypes"
                                        : "View FigJam"}
                                </Typography>
                                {item.editorType === "figma" && (
                                    <Typography
                                        sx={{
                                            color: "var(--Blue-60, #2979FF)",
                                            fontFamily: "Roboto",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "21px",
                                            letterSpacing: "0.035px",
                                            paddingLeft: "4px",
                                        }}
                                    >
                                        ({prototypeCount})
                                    </Typography>
                                )}
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </CardsStyled>
    );
};
