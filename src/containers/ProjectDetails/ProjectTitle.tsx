"use client";

import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { cn } from "@/components/ui/cn";
import { Menu, MenuItem } from "@/components/ui/Popover";
import { useHistory } from "@/utils/navigation";

import checkCircle from "../../assets/check_circle.svg";
import figJamIcon from "../../assets/figjamIcon.svg";
import figmaIcon from "../../assets/figmaIcon.svg";
import { ProjectDetailsContext } from "../../contexts";

export const ProjectTitle = () => {
    const { projectId, projectData, projectList, setSelectedBranch } = useContext(ProjectDetailsContext);
    const projectMenuOptions = projectList.map(({ projectId: id, fileName }) => ({ id, title: fileName }));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeProject, setActiveProject] = useState<number>();
    const history = useHistory();
    const openMenu = Boolean(anchorEl);

    const handleSelectProject = (id: number) => {
        setSelectedBranch(undefined);
        setAnchorEl(null);
        history.push(`/project/${id}/details`);
    };

    useEffect(() => {
        if (projectId) {
            setActiveProject(projectId);
        }
    }, [projectId]);

    return (
        <>
            <div className="flex items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={(projectData?.editorType === "figjam" ? figJamIcon : figmaIcon).src}
                    alt="icon"
                    className="mr-2.5 size-6"
                />
                <div className="flex flex-col gap-2">
                    <button
                        id="Select-Project"
                        type="button"
                        aria-haspopup="listbox"
                        aria-controls="project-menu"
                        aria-label="Project"
                        aria-expanded={openMenu}
                        onClick={(event) => setAnchorEl(openMenu ? null : event.currentTarget)}
                        className="group flex items-start text-left"
                    >
                        <h4 className="text-ink m-0 h-[30px] max-w-[300px] truncate font-sans text-xl font-medium tracking-normal md:text-[26px]">
                            {projectData?.fileName}
                        </h4>
                        <ChevronDown
                            className={cn(
                                "group-hover:text-blue-ink mt-1 size-5 transition-transform",
                                openMenu && "text-blue-ink rotate-180",
                            )}
                        />
                    </button>
                    <div className="text-muted block w-full pl-[5px] text-sm font-medium md:pl-0">
                        Last updated on{" "}
                        {projectData?.createdAt ? format(new Date(projectData.createdAt), "MMM d, yyyy") : "-"}
                    </div>
                </div>
            </div>
            <Menu open={openMenu} onClose={() => setAnchorEl(null)} anchorEl={anchorEl} placement="bottom-start">
                {projectMenuOptions.map(({ id, title }) => (
                    <MenuItem
                        key={`project-menu-option-${id}`}
                        onClick={() => handleSelectProject(id)}
                        disabled={activeProject === id}
                        selected={activeProject === id}
                    >
                        <h4 className="m-0 mr-10 max-w-[300px] grow font-sans text-base font-normal tracking-normal break-words whitespace-normal">
                            {title}
                        </h4>
                        {activeProject === id && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={checkCircle.src} alt="checkCircle" />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
