"use client";

import { useQueryWithSettled } from "./queryUtils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { get } from "../utils/object";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext } from "../contexts";
import { UserContext } from "../contexts/UserContext";
import { ISnackBarMessage, IUserFile, IUserFileResponse, PluginCountResponseType } from "../types";
import { api, messages } from "../utils";

interface CommonPostPropsType {
    title?: string;
    alertRequired?: boolean;
}

const Projects = "project";
const PluginCount = "plugin-count";
axios.defaults.baseURL = APP_CONSTANT.baseUrl;

interface IFetchProject {
    projectKey: string;
}

const useFetchPluginCount = () => {
    const { showToast } = useContext(ToasterContext);
    return useQueryWithSettled<PluginCountResponseType, AxiosError>(
        {
            queryKey: [PluginCount],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.pluginCount}`,
                    method: "GET",
                    headers: {
                        Timezone: TIME_ZONE,
                    },
                });
                return get(data, "data", {}) as PluginCountResponseType;
            },
            retry: 3,
            retryDelay: 3,
            staleTime: 0,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
        },
    );
};

const processPluginDownloadCount = (data?: PluginCountResponseType) => {
    if (data && data.installCount) {
        const count = data.installCount;
        let finalCount;
        if (count < 10000) {
            finalCount = parseInt((count / 100).toFixed(2), 10) / 10;
            return `${finalCount}K`;
        }
        if (count < 100000) {
            finalCount = parseInt((count / 100).toFixed(3), 10) / 10;
            return `${finalCount}K`;
        }
        if (count < 1000000) {
            finalCount = parseInt((count / 100).toFixed(4), 10) / 10;
            return `${finalCount}K`;
        }
        finalCount = parseInt((count / 100000).toFixed(2), 10) / 10;
        return `${finalCount}M`;
    }

    return " ";
};

const useFetchFiles = (props: ISnackBarMessage & { isEnabled?: boolean }) => {
    const { token } = UserContext();

    return useQueryWithSettled<IUserFileResponse, AxiosError>(
        {
            queryKey: [Projects],
            queryFn: async () => {
                const response = await api({
                    version: "v2",
                    url: APP_CONSTANT.webApi.getFileList,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                    data: {},
                });
                // Normalise before the data reaches components (v5 has no per-query onSettled that runs first).
                (response as any)?.data?.data?.forEach((file: IUserFile) => {
                    file.allComments = file.allComments === null ? 0 : file.allComments;
                    file.myComments = file.myComments === null ? 0 : file.myComments;
                    file.newComments = file.newComments === null ? 0 : file.newComments;
                    file.resolvedComments = file.resolvedComments === null ? 0 : file.resolvedComments;
                    file.unresolvedComments = file.unresolvedComments === null ? 0 : file.unresolvedComments;
                    file.checkedProject = true;
                });
                (response as any)?.data?.data?.sort((fileA: IUserFile, fileB: IUserFile) => fileB.isFavorite - fileA.isFavorite);
                return response as any;
            },
            retry: 3,
            retryDelay: 3,
            staleTime: 30 * 1000,
            refetchInterval: 30 * 1000,
            enabled: props.isEnabled,
        },
        (
            userFilesResponse: IUserFileResponse | undefined,
            error: AxiosError | null,
        ): IUserFileResponse | null | AxiosError => {
            if (userFilesResponse) {
                userFilesResponse.data.data.forEach((file: IUserFile) => {
                    file.allComments = file.allComments === null ? 0 : file.allComments;
                    file.myComments = file.myComments === null ? 0 : file.myComments;
                    file.newComments = file.newComments === null ? 0 : file.newComments;
                    file.resolvedComments = file.resolvedComments === null ? 0 : file.resolvedComments;
                    file.unresolvedComments = file.unresolvedComments === null ? 0 : file.unresolvedComments;
                    file.checkedProject = true;
                });

                userFilesResponse.data.data.sort(
                    (fileA: IUserFile, fileB: IUserFile) => fileB.isFavorite - fileA.isFavorite,
                );
                return userFilesResponse;
            }
            if (error) {
                if (props.snackbarShowMessage) {
                    props.snackbarShowMessage((error as any)?.response?.data?.message, "error");
                }

                return error;
            }
            return null;
        },
    );
};

const postApiCall = (token: string, request: any) =>
    axios.post(<string>request.url, request.body, {
        headers: {
            Authorization: `Bearer ${token}`,
            Timezone: TIME_ZONE,
        },
    });

// TODO: need to remove this common post mutation function
// we need to keep separate hook function for all API calls
const useCommonPost = <G>(props?: CommonPostPropsType) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useMutation({
        mutationFn: (body: G) => postApiCall(token, body),
        onSettled: (response: AxiosResponse | undefined, error: AxiosError | null): any => {
            if (response) {
                if (props?.alertRequired) {
                    showToast({ message: response.data.message });
                }

                return response;
            }
            if (error) {
                showToast({
                    title: props?.title,
                    severity: "error",
                    message: get(error, "response.data.message", messages.SOMETHING_WENT_WRONG),
                });
                return error;
            }
            return null;
        },
    });
};

const postApiCallForFetchComments = (token: string, request: any) =>
    axios.post(<string>request.url, request.body, {
        headers: {
            Authorization: `Bearer ${token}`,
            Timezone: TIME_ZONE,
        },
    });

const useFetchCommentsForDashboard = <G>(props: ISnackBarMessage, alertRequired?: boolean) => {
    const { token } = UserContext();
    return useMutation({
        mutationFn: (body: G) => postApiCallForFetchComments(token, body),
        onSettled: (response: AxiosResponse | undefined, error: AxiosError | null): any => {
            if (response) {
                if (props.snackbarShowMessage && alertRequired) {
                    props.snackbarShowMessage(response.data.message, "success");
                }

                return response;
            }
            if (error) {
                if (props.snackbarShowMessage) {
                    props.snackbarShowMessage((error as any)?.response?.data?.message, "error");
                }
                return error;
            }
            return null;
        },
    });
};

const useAddProject = () => {
    const { token } = UserContext();
    const queryClient = useQueryClient();
    const { showToast } = useContext(ToasterContext);

    const addProject = useMutation({
        mutationFn: (fileDetails: any) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.addProject,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: { fileDetails },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                return error;
            }
            queryClient.invalidateQueries({
                queryKey: [Projects],
            });
            showToast({ message: response?.data?.message });
            return response;
        },
    });
    return { addProject };
};

const useDeleteProject = () => {
    const { token } = UserContext();
    const queryClient = useQueryClient();
    const { showToast } = useContext(ToasterContext);
    const deleteProject = useMutation({
        mutationFn: (projectId: number) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.deleteProject,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: { projectId },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            queryClient.invalidateQueries({
                queryKey: [Projects],
            });
            showToast({ message: response?.data?.message });
            return response;
        },
    });
    return { deleteProject };
};

const useFetchProjectDetails = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    const fetchProjectDetails = useMutation({
        mutationFn: (projectDetails: IFetchProject) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.fetchProjectDetails,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: {
                    projectKey: projectDetails.projectKey,
                },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                return error;
            }
            showToast({ message: response?.data?.message });
            return response;
        },
    });
    return { fetchProjectDetails };
};

export {
    processPluginDownloadCount,
    Projects,
    useAddProject,
    useCommonPost,
    useDeleteProject,
    useFetchCommentsForDashboard,
    useFetchFiles,
    useFetchPluginCount,
    useFetchProjectDetails,
};
