"use client";

import { useContext, useEffect } from "react";

import { AddProjectContext } from "../../../contexts";
import { fetchDoNotShowAddProjectInstruction } from "../../../services/AuthService";
import { ConnectIcon, Downloadplugin, Generatetoken } from "../../../utils";

const STEP_COPY = "Download export comments plug-in from the figma community and run the plug-in";

const AddProjectInstructions = () => {
    const { onChangeStep } = useContext(AddProjectContext);

    useEffect(() => {
        if (fetchDoNotShowAddProjectInstruction() === "true") {
            onChangeStep(2);
        }
    }, []);

    const steps = [
        { icon: <Downloadplugin className="mr-2 min-w-6" />, title: "Download Export comments plug-in" },
        { icon: <ConnectIcon className="mr-2 min-w-6" />, title: "Connect your Figma account with Export comments" },
        { icon: <Generatetoken className="mr-2 min-w-6" />, title: "Generate access token" },
    ];

    return (
        <div className="max-w-[400px]">
            <h6 className="text-ink text-xl font-medium">Steps to connect your Figma project</h6>
            {steps.map(({ icon, title }, i) => (
                <div key={title} className={`flex items-start ${i === 0 ? "my-6" : "mt-4"}`}>
                    {icon}
                    <div>
                        <p className="text-ink text-lg leading-[21px] font-medium tracking-[0.25px]">{title}</p>
                        <p>{STEP_COPY}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { AddProjectInstructions };
