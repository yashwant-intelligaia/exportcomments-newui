import { useState } from "react";

import { EcEditMode } from "./EcEditMode";

export default {
    title: "Atomic/EcEditMode",
    component: EcEditMode,
};

export const Default = () => {
    const [title, setTitle] = useState("Sample Project");
    const [error, setError] = useState("");

    const handleError = (value: string) => {
        if (value.length > 100) return "Note: Title name cannot exceed 100 characters";
        if (!value.trim().length) return "Note: Title name cannot be empty";
        return "";
    };

    const handleSubmit = async (value: string) => {
        const errorMsg = handleError(value);
        if (errorMsg) {
            setError(errorMsg);
            return false;
        }
        setError("");
        setTitle(value);
        return true;
    };

    return (
        <EcEditMode
            placeholder="Enter project title"
            title={title}
            error={error}
            onSubmit={(value) => handleSubmit(value)}
            name="project"
            size={20}
        />
    );
};
