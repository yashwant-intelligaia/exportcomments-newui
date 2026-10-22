"use client";

import { Button } from "@/components/ui/Button";

import noProjectsImg from "../../assets/no-projects.svg";

interface ProjectNotFoundPropsType {
    onAddNewProject: () => void;
}

const ProjectNotFound = ({ onAddNewProject }: ProjectNotFoundPropsType) => (
    <div className="flex h-[calc(100vh-60px)] min-h-[400px] flex-col items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={noProjectsImg.src} alt="No Projects" />
        <h1 className="text-ink mt-5 font-sans text-xl font-medium tracking-normal">No Projects Found</h1>
        <p className="text-muted mt-1 text-center text-base">Set up a new project by clicking the button below.</p>
        <Button className="mt-4" onClick={onAddNewProject}>
            Add new project
        </Button>
    </div>
);

export { ProjectNotFound };
