"use client";

import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { AddProjectContext } from "../../../contexts";
import { useAddProject, useFetchProjectDetails } from "../../../hooks";
import { Cards } from "../../../stories/components/Cards/Cards";
import { FigmaIcon, uniqueKey } from "../../../utils";
import { defaultMessages } from "../../../utils/messages";
import { ProjectLoader } from "../ProjectLoader";

interface AddNewProjectPropsType {
    onClose: () => void;
}

const AddNewProject = ({ onClose }: AddNewProjectPropsType) => {
    const { onSubmit, isSubmit, projectData, addProject, removeProject, setLoading } =
        useContext(AddProjectContext);
    const [projectUrl, setProjectUrl] = useState("");
    const [urlError, setUrlError] = useState("");
    const [projectKey, setProjectKey] = useState("");
    const { fetchProjectDetails } = useFetchProjectDetails();
    const {
        mutate: mutateProjectDetails,
        data: projectDetailsResponse,
        isLoading: isLoadingProjectDetails,
        isSuccess: isProjectDetailsFetched,
        isError: isFetchProjectDetailsError,
        error: projectDetailsError,
    } = fetchProjectDetails;
    const { addProject: addProjectMutation } = useAddProject();
    const { mutate: mutateAddProjectData, isSuccess } = addProjectMutation;

    const handleAddProjectUrl = (url: string) => {
        setProjectUrl(url);
        if (url === "") {
            setUrlError("");
            return;
        }
        let filteredUrl: string[] = url.split("?");
        const designUrlPrefix = "https://www.figma.com/design/";
        const protoUrlPrefix = "https://www.figma.com/proto/";
        const boardUrlPrefix = "https://www.figma.com/board/";
        if (filteredUrl.length >= 1) {
            const [newfilteredUrl] = filteredUrl;
            let splittedUrl: string[] = [];
            if (newfilteredUrl.search(designUrlPrefix) !== -1) {
                splittedUrl = newfilteredUrl.split(designUrlPrefix);
            } else if (newfilteredUrl.search(protoUrlPrefix) !== -1) {
                splittedUrl = newfilteredUrl.split(protoUrlPrefix);
            } else if (newfilteredUrl.search(boardUrlPrefix) !== -1) {
                splittedUrl = newfilteredUrl.split(boardUrlPrefix);
            }
            if (splittedUrl.length > 1) {
                filteredUrl = splittedUrl[1].split("/");
                const fileKey = filteredUrl[0];
                const existingProject = projectData.find(({ projectId }) => projectId === fileKey);
                if (existingProject) {
                    setUrlError(defaultMessages.PROJECT_ALREADY_EXISTS);
                    return;
                }
                setProjectKey(fileKey);
                if (fileKey) {
                    mutateProjectDetails({ projectKey: fileKey });
                }
                setUrlError("");
            } else {
                // invalid file url
                setUrlError(defaultMessages.ADD_PROJECT_URL_ERROR);
            }
        } else {
            // invalid file url
            setUrlError(defaultMessages.ADD_PROJECT_URL_ERROR);
        }
    };

    useEffect(() => {
        if (isSubmit === true) {
            mutateAddProjectData(projectData);
            onSubmit(false);
        }
    }, [onSubmit]);

    useEffect(() => {
        if (isFetchProjectDetailsError) {
            if (projectDetailsError.response.status === 403) {
                setUrlError(projectDetailsError.response.data.message);
            } else {
                setUrlError(defaultMessages.ADD_PROJECT_URL_ERROR);
            }
        }
    }, [isFetchProjectDetailsError]);

    useEffect(() => {
        setLoading(isLoadingProjectDetails);
    }, [isLoadingProjectDetails]);

    const handleRemoveProject = (index: number) => {
        removeProject(index);
    };

    useEffect(() => {
        if (projectDetailsResponse) {
            const {
                fileName,
                myComments,
                allComments,
                resolvedComments,
                unresolvedComments,
                newComments,
                editorType,
            } = projectDetailsResponse.data.data;
            const tempProjectData = {
                projectId: projectKey,
                fileName,
                myComments,
                allComments,
                resolvedComments,
                unresolvedComments,
                newComments,
                editorType,
            };
            addProject(tempProjectData);
        }
    }, [projectDetailsResponse]);

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess, onClose]);

    useEffect(() => {
        if (isProjectDetailsFetched) {
            setProjectUrl("");
            setProjectKey("");
        }
    }, [isProjectDetailsFetched]);

    return (
        <>
            <Box
                sx={{
                    width: {
                        xl: "400px",
                        lg: "400px",
                        md: "400px",
                        sm: "400px",
                        xs: "360px",
                    },
                }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
            >
                <Box my={1} sx={{ flexShrink: "1" }}>
                    <TextField
                        label="Add Figma File URL"
                        variant="standard"
                        sx={{ width: "100%" }}
                        onChange={(event) => handleAddProjectUrl(event.target.value)}
                        value={projectUrl}
                        id="NB-add-figma-file-url"
                        error={!!urlError}
                        helperText={urlError}
                        disabled={isLoadingProjectDetails}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FigmaIcon style={{ marginRight: 8 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        overflowX: "visible",
                        overflowY: "auto",
                        height: "100%",
                        maxHeight: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Box>
                        {isLoadingProjectDetails && <ProjectLoader />}
                        {projectData && projectData.length > 0 && (
                            <>
                                <Box mt={1} fontSize={16} fontWeight={700} mb={2}>
                                    <Typography variant="inherit">Added Projects</Typography>
                                </Box>
                                <Grid
                                    container
                                    rowSpacing={3}
                                    alignItems="center"
                                    justifyContent="center"
                                    paddingLeft={0.6}
                                >
                                    {projectData.map((file, index) => (
                                        <Grid
                                            width="100%"
                                            item
                                            xs={12}
                                            sx={{
                                                paddingBottom: "0.25rem",
                                                ".card-wrap": {
                                                    width: "97%",
                                                    "&>div": {
                                                        width: "100%",
                                                    },
                                                },
                                            }}
                                            key={`add-project-card-${uniqueKey(file.projectId)}`}
                                        >
                                            <Cards
                                                filterType={file?.fileName}
                                                editorType={file?.editorType}
                                                createdAt="Last updated on Dec 14, 2022"
                                                allComments={file.allComments}
                                                myComments={file.myComments}
                                                newComments={file.newComments}
                                                resolvedComments={file.resolvedComments}
                                                unresolvedComments={file.unresolvedComments}
                                                usedIn="sideDrawer"
                                                handleCardClose={() => handleRemoveProject(index)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export { AddNewProject };
