"use client";

import { useContext, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Form";

import { AddProjectContext } from "../../../contexts";
import { saveDoNotShowAddProjectInstruction } from "../../../services/AuthService";

const AddProjectInstructionsFooter = () => {
    const { onChangeStep } = useContext(AddProjectContext);
    const [isChecked, setChecked] = useState(false);

    const handleContinueClick = () => {
        if (isChecked) {
            saveDoNotShowAddProjectInstruction();
        }
        onChangeStep(2);
    };
    return (
        <div className="bg-surface flex w-full shrink items-center justify-between pb-4">
            <Checkbox checked={isChecked} onChange={setChecked} label="Don't show this again" />
            <Button onClick={handleContinueClick}>Continue</Button>
        </div>
    );
};

export { AddProjectInstructionsFooter };
