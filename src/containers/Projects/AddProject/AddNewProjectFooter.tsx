"use client";

import { useContext } from "react";

import { Button } from "@/components/ui/Button";

import { AddProjectContext } from "../../../contexts";

interface AddNewProjectFooterPropsType {
    onClose: () => void;
}

const AddNewProjectFooter = ({ onClose }: AddNewProjectFooterPropsType) => {
    const { onSubmit, projectData, isLoading } = useContext(AddProjectContext);

    return (
        <div className="flex w-full shrink justify-end gap-2.5 bg-surface pb-4">
            <Button variant="text" onClick={onClose}>
                Cancel
            </Button>
            <Button id="NB-add-project-button" onClick={() => onSubmit(true)} disabled={projectData.length === 0 || isLoading}>
                Add
            </Button>
        </div>
    );
};

export { AddNewProjectFooter };
