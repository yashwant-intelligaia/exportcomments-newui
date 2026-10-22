"use client";

import { format } from "date-fns";
import { Download, MoreVertical, Play, Share2, Star, Trash2, X } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/Display";
import { IconButton } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Tooltip } from "@/components/ui/Tooltip";

import figJamIcon from "../../../assets/figjamIcon.svg";
import figmaIcon from "../../../assets/figmaIcon.svg";
import { useProjectMutations } from "../../../hooks";
import { ActionMenuItemType } from "../../../types";
import { getFigjamLink, openLink } from "../../../utils";
import { EcActionMenu } from "../EcActionMenu/EcActionMenu";
import { EcEditMode } from "../EcEditMode";
import { EcTooltip } from "../EcTooltip";

const bubbleTone = {
    all: "bg-blue-soft",
    new: "bg-surface-sunk text-blue-ink",
    my: "bg-purple-soft",
    resolved: "bg-mint",
    unresolved: "bg-danger-soft",
};

const CommentStat = ({
    tone,
    count,
    label,
    side,
    onClick,
}: {
    tone: keyof typeof bubbleTone;
    count: number;
    label: string;
    side: boolean;
    onClick: () => void;
}) => (
    <li className="group inline-flex min-w-[46px] flex-col items-center rounded-md p-2 transition-colors hover:bg-blue-soft max-sm:px-1.5">
        <button
            type="button"
            onClick={onClick}
            aria-label={`${label} comments`}
            className={cn(
                "inline-flex items-center justify-center rounded-full font-bold text-ink",
                side ? "size-[45px] text-xs font-normal" : "size-12 text-base font-semibold",
                bubbleTone[tone]
            )}
        >
            {count}
        </button>
        <span className="mt-3 text-xs text-muted group-hover:font-medium">{label}</span>
    </li>
);

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
    const side = usedIn === "sideDrawer";
    const items: ActionMenuItemType[] = [
        {
            label: "Share",
            onClick: () => {
                onShareProject();
                setAnchorEl(undefined);
            },
            icon: <Share2 className="size-4" />,
        },
        {
            label: "Download",
            onClick: () => {
                if (allComments) handleDownloadExcel();
            },
            icon: <Download className="size-4" />,
            disabled: allComments === 0,
        },
        {
            label: "Remove",
            onClick: () => {
                onDeleteProject();
                setAnchorEl(undefined);
            },
            icon: <Trash2 className="size-4" />,
        },
    ];
    const { updateProject } = useProjectMutations();
    const { mutateAsync: mutateUpdateProject, isPending: isUpdatingTitle } = updateProject;
    const handleUpdateTitle = async (value: string) => {
        try {
            setProjectTitle(value);
            await mutateUpdateProject({ name: value, projectId: item.projectId });
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleViewFigjamLink = () => {
        const url = getFigjamLink({ fileKey: item.fileId, fileName: item.fileName });
        openLink({ url, target: "_blank" });
    };

    const typeIcon = (
        <EcTooltip title={editorType === "figma" ? "Design file" : "FigJam board"} arrow placement="top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={(editorType === "figma" ? figmaIcon : figJamIcon).src} alt="Figma" className="mr-2.5 size-5" />
        </EcTooltip>
    );

    return (
        <Card className="inline-flex">
            <div className="p-4 pb-2.5">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[calc(100%-80px)] grow items-center [&_form]:w-full">
                        {(usedIn === "sideDrawer" || usedIn === "projectList") && typeIcon}
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
                            <Tooltip title={projectTitle} placement="top">
                                <h6 className="truncate text-base leading-6 font-medium text-navy max-sm:max-w-[134px]">{projectTitle}</h6>
                            </Tooltip>
                        )}
                    </div>
                    {usedIn === "projectList" && (
                        <>
                            <EcTooltip title={isFavorite ? "Remove From Favourite" : "Add To Favourite"} placement="top" arrow>
                                <IconButton size="small" aria-label="favourite" onClick={handleMarkAsFavourite}>
                                    <Star className={cn("size-[22px]", isFavorite && "fill-yellow text-ink")} />
                                </IconButton>
                            </EcTooltip>
                            <div className="flex max-w-6 items-center justify-end">
                                <IconButton
                                    size="small"
                                    aria-label="expand-feature"
                                    className={cn("size-6", isMenuOpen && "text-blue-ink")}
                                    onClick={(event) => setAnchorEl(event.currentTarget)}
                                >
                                    <MoreVertical className="size-5" />
                                </IconButton>
                                <EcActionMenu
                                    open={isMenuOpen}
                                    anchorEl={anchorEl}
                                    items={items}
                                    onClose={() => setAnchorEl(undefined)}
                                />
                            </div>
                        </>
                    )}
                    {side && (
                        <div className="flex flex-[0_0_50px] items-center justify-end">
                            <button type="button" aria-label="close" onClick={handleCardClose}>
                                <X className="size-5" />
                            </button>
                        </div>
                    )}
                </div>
                <p className="mb-6 text-xs leading-4 text-muted">Last updated on {format(new Date(createdAt), "MMM d, yyyy")}</p>
                <p className="mb-1.5 text-xs text-muted">Comments</p>
                <ul className="m-0 flex justify-between p-0">
                    <CommentStat tone="all" label="All" count={allComments} side={side} onClick={openAllComments} />
                    <CommentStat tone="new" label="Unread" count={newComments} side={side} onClick={openUnreadComments} />
                    <CommentStat tone="my" label="My" count={myComments} side={side} onClick={openOwnComments} />
                    <CommentStat tone="resolved" label="Resolved" count={resolvedComments} side={side} onClick={openResolvedComments} />
                    <CommentStat tone="unresolved" label="Unresolved" count={unresolvedComments} side={side} onClick={openUnresolvedComments} />
                </ul>
                {usedIn === "projectList" && (
                    <>
                        <hr className="mt-6 border-0 border-t-2 border-dashed border-line" />
                        <div className="mt-4 flex items-start whitespace-nowrap">
                            <button
                                type="button"
                                className="flex items-center text-sm font-medium text-blue-ink"
                                onClick={item.editorType === "figma" ? handleViewPrototypeLink : handleViewFigjamLink}
                            >
                                <Play className="size-5" />
                                <span className="underline">{item.editorType === "figma" ? "View Prototypes" : "View FigJam"}</span>
                                {item.editorType === "figma" && <span className="pl-1">({prototypeCount})</span>}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};
