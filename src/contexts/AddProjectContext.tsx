import { createContext, ReactNode, useState } from "react";

import { AddProjectDataType } from "../types";

interface AddProjectContextProps {
    step: number;
    onChangeStep: (step: number) => void;
    isSubmit: boolean;
    onSubmit: (val: any) => void;
    projectData: AddProjectDataType[];
    setProjectData: React.Dispatch<React.SetStateAction<AddProjectDataType[]>>;
    addProject: (project: AddProjectDataType) => void;
    removeProject: (index: number) => void;
    isLoading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectContext = createContext<AddProjectContextProps>({} as AddProjectContextProps);

const AddProjectContextProvider = ({ children }: { children: ReactNode }) => {
    const [step, setStep] = useState(1);
    const [isSubmit, setSubmit] = useState(false);
    const [projectData, setProjectData] = useState<AddProjectDataType[]>([]);
    const [isLoading, setLoading] = useState(false);

    const onChangeStep = (value: number) => {
        setStep(value);
    };
    const onSubmit = (value: boolean) => {
        setSubmit(value);
    };

    const addProject = (project: AddProjectDataType) => {
        setProjectData((prevData) => [...prevData, project]);
    };

    const removeProject = (index: number) => {
        setProjectData((prevData) => prevData.filter((_, i) => i !== index));
    };
    return (
        <AddProjectContext.Provider
            value={{
                step,
                onChangeStep,
                isSubmit,
                onSubmit,
                projectData,
                setProjectData,
                addProject,
                removeProject,
                isLoading,
                setLoading,
            }}
        >
            {children}
        </AddProjectContext.Provider>
    );
};

export { AddProjectContext, AddProjectContextProvider };
