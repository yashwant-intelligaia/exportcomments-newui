"use client";

import { ChevronDown, Download, MoreVertical, Share2, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { IconButton } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Menu, MenuItem } from "@/components/ui/Popover";

import branchIcons from "../../assets/branch-icon-black.svg";
import checkCircle from "../../assets/check_circle.svg";
import { ProjectDetailsContext, UserContext } from "../../contexts";
import { useFetchProjectBranch, useProjectMutations } from "../../hooks";
import { EcTooltip } from "../../stories/components";
import { BranchIcon, exportCommentsToExcel } from "../../utils";
import { ManageTeamModal } from "../Modal";

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
    const favouriteLabel = isFavourite ? "Remove from Favourite" : "Add to Favourite";
    const separator = "relative after:absolute after:top-1/2 after:right-0 after:-mt-[7px] after:h-3.5 after:w-px after:bg-muted last:after:hidden";
    const downloadDisabled = projectData?.allComments === 0;

    return (
        <>
            {/* Actions for Mobile screens */}
            <div className="ml-auto block sm:hidden">
                <IconButton className="ml-auto" aria-label="more actions" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVertical className="size-7" />
                </IconButton>
                <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} placement="bottom-end">
                    <MenuItem
                        onClick={() => {
                            handleMarkAsFavorite(!isFavourite);
                            setAnchorEl(null);
                        }}
                    >
                        <Star className={cn("size-5", isFavourite && "fill-yellow")} />
                        {favouriteLabel}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleDownloadComments();
                            setAnchorEl(null);
                        }}
                    >
                        <Download className="size-5" />
                        Download
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleShareProject();
                            setAnchorEl(null);
                        }}
                    >
                        <Share2 className="size-5" /> Share
                    </MenuItem>
                    {branchOptions.length > 0 && (
                        <MenuItem
                            onClick={() => {
                                setAnchorElBranch(anchorEl);
                                setAnchorEl(null);
                            }}
                        >
                            <BranchIcon /> Select Branch
                        </MenuItem>
                    )}
                </Menu>
            </div>

            {/* Actions for other screens */}
            <div className="hidden sm:block">
                <ul className="-mt-2.5 flex list-none flex-wrap items-center p-0 max-[1366px]:py-2.5">
                    <li className={separator}>
                        <EcTooltip title={favouriteLabel} placement="top" arrow>
                            <IconButton aria-label={favouriteLabel} onClick={() => handleMarkAsFavorite(!isFavourite)}>
                                <Star className={cn("size-5", isFavourite && "fill-yellow")} />
                            </IconButton>
                        </EcTooltip>
                    </li>
                    <li className={separator}>
                        {downloadDisabled ? (
                            <IconButton aria-label="Download" disabled>
                                <Download className="size-5" />
                            </IconButton>
                        ) : (
                            <EcTooltip title="Download" placement="top" arrow>
                                <IconButton aria-label="Download" onClick={handleDownloadComments}>
                                    <Download className="size-5" />
                                </IconButton>
                            </EcTooltip>
                        )}
                    </li>
                    <li className={separator}>
                        <EcTooltip title="Share" placement="top" arrow>
                            <IconButton aria-label="Share" onClick={handleShareProject}>
                                <Share2 className="size-5" />
                            </IconButton>
                        </EcTooltip>
                    </li>

                    {/* Branch List */}
                    {branchOptions?.length > 0 && (
                        <li className="flex items-start">
                            <IconButton aria-label="Branches">
                                <BranchIcon />
                            </IconButton>
                            <button
                                id="Select-Branch"
                                type="button"
                                aria-haspopup="listbox"
                                aria-controls="branch-menu"
                                aria-label="Branch"
                                aria-expanded={anchorElBranch ? "true" : undefined}
                                onClick={(event) => setAnchorElBranch(event.currentTarget)}
                                className="flex h-[30px] items-center text-sm font-medium text-blue-ink"
                            >
                                <span className="mt-1">
                                    {selectedBranch?.name || "Main"}
                                    {!selectedBranch && ` (${branchOptions.length})`}
                                </span>
                                <ChevronDown className="mt-1 size-4" />
                            </button>
                            <Menu open={!!anchorElBranch} onClose={() => setAnchorElBranch(null)} anchorEl={anchorElBranch} placement="bottom-start" className="mt-2.5">
                                {/* Default Menu Item */}
                                <MenuItem
                                    selected={!selectedBranch?.key}
                                    className="h-[45px] min-w-[180px] border-b border-line bg-surface-sunk px-2.5 py-1 text-sm"
                                    onClick={() => handleSelectMenuOption("")}
                                >
                                    <span className="pr-2 text-sm font-medium">{projectData?.fileName}</span>
                                    <span className="text-xs">Main</span>
                                </MenuItem>

                                {/* Branch Options */}
                                {branchOptions.map(({ id, title }) => (
                                    <MenuItem
                                        key={`project-branch-${id}`}
                                        onClick={() => handleSelectMenuOption(id)}
                                        selected={selectedBranch?.key === id}
                                        className="relative h-10 hover:bg-blue-soft"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={branchIcons.src} alt="prototypeIcon" className="pr-2.5" />
                                        <span className="mr-12 max-w-[300px] text-sm font-medium">{title}</span>
                                        {selectedBranch?.key === id && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={checkCircle.src} alt="selected" className="absolute right-4" />
                                        )}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </li>
                    )}
                </ul>
            </div>
            {modal}
        </>
    );
};
