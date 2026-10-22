"use client";

import { Box, Button } from "@mui/material";
import { useContext } from "react";

import { AddProjectContext } from "../../../contexts";

interface AddNewProjectFooterPropsType {
    onClose: () => void;
}

const AddNewProjectFooter = ({ onClose }: AddNewProjectFooterPropsType) => {
    const { onSubmit, projectData, isLoading } = useContext(AddProjectContext);

    const handleSubmitAddProject = () => {
        onSubmit(true);
    };

    return (
        <Box
            sx={{ background: "#fff", flexShrink: "1" }}
            display="flex"
            justifyContent="flex-end"
            pb={2}
            width="100%"
        >
            <Button
                variant="text"
                sx={{ marginRight: "10px", textTransform: "inherit" }}
                onClick={onClose}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmitAddProject}
                id="NB-add-project-button"
                disabled={projectData.length === 0 || isLoading}
                sx={{ textTransform: "inherit" }}
            >
                Add
            </Button>
        </Box>
    );
};

export { AddNewProjectFooter };
