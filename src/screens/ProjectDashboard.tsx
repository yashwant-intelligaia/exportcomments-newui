"use client";

import { useState } from "react";

import { AddProjectDrawer } from "../containers";
import { useFetchProjectList } from "../hooks";
import { EcBasicCard } from "../stories/components";
import {
    // CircleplayIcon,
    FigmaIcon,
    PlusIcon,
    // TourplayIcon
} from "../utils";
import { ProjectListPage } from "./ProjectListPage";

const ProjectDashboard = () => {
    const { data: projectList } = useFetchProjectList({
        key: `all`,
    });
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const handleDrawerClose = () => {
        setDrawerContent(undefined);
    };
    return (
        <>
            {projectList?.length === 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <EcBasicCard
                        svgicon={<FigmaIcon className="mr-2" />}
                        heading="Add New Project"
                        subheading="Import your Figma projects to start comment statistics."
                        buttonText="Add Project"
                        onClick={() => {
                            setDrawerContent(<AddProjectDrawer onClose={handleDrawerClose} />);
                        }}
                        buttonsvgicon={<PlusIcon />}
                    />
                    {/* TODO: add the "Take a Quick Tour" card once the demo video is available. */}
                </div>
            ) : (
                <ProjectListPage />
            )}
            {drawerContent}
        </>
    );
};

export { ProjectDashboard };
