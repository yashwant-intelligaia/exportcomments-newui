"use client";

import { useContext, useEffect } from "react";

import { AddProjectContext } from "../../../contexts";
import { fetchDoNotShowAddProjectInstruction } from "../../../services/AuthService";
import { EcDrawer } from "../../../stories/components";
import { AddNewProject } from "./AddNewProject";
import { AddNewProjectFooter } from "./AddNewProjectFooter";
import { AddProjectInstructions } from "./AddProjectInstructions";
import { AddProjectInstructionsFooter } from "./AddProjectInstructionsFooter";

interface AddProjectDrawerPropsType {
    onClose: () => void;
}

const AddProjectDrawer = (props: AddProjectDrawerPropsType) => {
    const { onClose } = props;
    const { step, onChangeStep } = useContext(AddProjectContext);

    useEffect(() => {
        onChangeStep(fetchDoNotShowAddProjectInstruction() === "true" ? 2 : 1);
    }, []);

    return (
        <EcDrawer
            title="Add Project"
            open
            direction="right"
            onClose={onClose}
            footer={step === 1 ? <AddProjectInstructionsFooter /> : <AddNewProjectFooter onClose={onClose} />}
        >
            {step === 1 ? <AddProjectInstructions /> : <AddNewProject onClose={onClose} />}
        </EcDrawer>
    );
};

export { AddProjectDrawer };
