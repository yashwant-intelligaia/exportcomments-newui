"use client";

import { useContext, useEffect, useState } from "react";

import { TextField } from "@/components/ui/Form";

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
    const { onSubmit, isSubmit, projectData, addProject, removeProject, setLoading } = useContext(AddProjectContext);
    const [projectUrl, setProjectUrl] = useState("");
    const [urlError, setUrlError] = useState("");
    const [projectKey, setProjectKey] = useState("");
    const { fetchProjectDetails } = useFetchProjectDetails();
    const {
        mutate: mutateProjectDetails,
        data: projectDetailsResponse,
        isPending: isLoadingProjectDetails,
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
            const { fileName, myComments, allComments, resolvedComments, unresolvedComments, newComments, editorType } =
                projectDetailsResponse.data.data;
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
        <div className="flex h-full w-[360px] flex-col justify-between sm:w-[400px]">
            <div className="my-2 shrink">
                <TextField
                    id="NB-add-figma-file-url"
                    label="Add Figma File URL"
                    onChange={(event) => handleAddProjectUrl(event.target.value)}
                    value={projectUrl}
                    error={!!urlError}
                    helperText={urlError}
                    disabled={isLoadingProjectDetails}
                    startAdornment={<FigmaIcon fontSize="small" />}
                />
            </div>
            <div className="flex h-full max-h-full flex-col overflow-x-visible overflow-y-auto">
                <div>
                    {isLoadingProjectDetails && <ProjectLoader />}
                    {projectData && projectData.length > 0 && (
                        <>
                            <p className="mt-2 mb-4 text-base font-bold">Added Projects</p>
                            <div className="flex flex-col items-center justify-center gap-6 pl-1">
                                {projectData.map((file, index) => (
                                    <div
                                        key={`add-project-card-${uniqueKey(file.projectId)}`}
                                        className="w-full pb-1 [&>div]:w-[97%] [&>div>div]:w-full"
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
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export { AddNewProject };
