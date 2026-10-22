"use client";

import { useContext } from "react";

import { useHistory } from "@/utils/navigation";

import { ProjectDetailsContext } from "../../contexts";
import { EcBreadcrumb } from "../../stories/components";
import { CommentsFilter } from "./CommentsFilter";
import { ProjectActions } from "./ProjectActions";
import { ProjectTitle } from "./ProjectTitle";
import { PrototypesFilter } from "./PrototypesFilter";
import { SubheaderToggle } from "./SubheaderToggle";

export const SubHeader = () => {
    const history = useHistory();
    const { view: viewBy, projectData } = useContext(ProjectDetailsContext);

    return (
        <>
            <section className="sub-header flex w-full justify-between px-5 pt-[23px] pb-2.5">
                <div className="flex w-full flex-col gap-4 md:gap-1">
                    <EcBreadcrumb
                        data={[
                            { title: "Projects", active: true, onClick: () => history.push("/projects") },
                            { title: projectData?.fileName || "" },
                        ]}
                    />
                    <div className="flex w-full flex-col items-start justify-between md:flex-row">
                        <div className="flex max-w-full min-w-[45%] flex-wrap items-start max-md:w-full">
                            <ProjectTitle />
                            <ProjectActions />
                        </div>
                        {viewBy === "comments" ? <CommentsFilter /> : <PrototypesFilter />}
                    </div>
                </div>
            </section>

            <SubheaderToggle />
        </>
    );
};
