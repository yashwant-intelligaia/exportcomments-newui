"use client";

import { useContext } from "react";

import { Segmented } from "@/components/ui/Segmented";
import { useHistory } from "@/utils/navigation";

import { ProjectDetailsContext } from "../../contexts";
import { ProjectViewByType } from "../../types";

export const SubheaderToggle = () => {
    const { view, setSearchInput, projectData, onChangeView } = useContext(ProjectDetailsContext);
    const viewByValue = (projectData?.editorType === "figjam" ? "comments" : view) as ProjectViewByType;
    const history = useHistory();

    const handleChangeView = (newValue: ProjectViewByType) => {
        if (view !== newValue) {
            setSearchInput("");
        }
        onChangeView(newValue);
        history.push(`/project/${projectData?.projectId}/details?view=${newValue}`);
    };

    return (
        <div className="flex items-center justify-between px-5 max-md:flex-col max-md:items-start max-md:gap-2">
            <h6 className="my-[5px] font-sans text-xl leading-[30px] font-semibold tracking-normal text-ink max-md:text-base">
                All {view === "prototypes" ? "Prototypes" : "Comments"}
            </h6>
            <div className="flex items-center justify-end">
                <span className="mr-2.5 text-sm font-bold">View by</span>
                <Segmented<ProjectViewByType>
                    ariaLabel="View by"
                    value={viewByValue}
                    onChange={handleChangeView}
                    disabled={projectData?.editorType === "figjam"}
                    options={[
                        { value: "comments", label: "Comments" },
                        { value: "prototypes", label: "Prototypes" },
                    ]}
                />
            </div>
        </div>
    );
};
