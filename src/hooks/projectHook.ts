"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { useHistory, useParams } from "@/utils/navigation";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { getCustomRange } from "../services/ProjectService";
import {
    BranchResponseType,
    InviteFlowRequestType,
    InvitePageRequestType,
    InviteVersionRequestType,
    IUserFile,
    PageType,
    ProjectInviteRequestType,
    ProjectUserResponseType,
    UpdateProjectDataType,
} from "../types";
import { api, formattedResponse, messages } from "../utils";
import { get } from "../utils/object";
import { useQueryWithSettled } from "./queryUtils";
import { FILES, INVITEES } from "./usersHook";

interface FetchProjectListParams {
    startDate?: string;
    endDate?: string;
    key: string;
    enabled?: boolean;
}

const VERSIONS = "versions";
const ProjectUsers = "project-users";
const PROTOTYPES = "prototypes";
const BRANCH_LIST = "branch-list";
const PROJECT_LIST = "project";

const useProjectMutations = () => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    const queryClient = useQueryClient();

    const updateProject = useMutation({
        mutationFn: async (formData: UpdateProjectDataType) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.updateProjectTitle,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: formData,
            });
            return get(data, "data", {});
        },
        onError: (error: AxiosError) => {
            const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
            showToast({ message, severity: "error" });
        },
        onSuccess: () => {
            showToast({ message: "Project Title Updated Successfully" });
        },
    });

    const verifyUserInvite = useMutation({
        mutationFn: async (formData: { inviteToken: string }) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.verifyUserInvite,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: formData,
            });
            return get(data, "data", {});
        },
        onError: (error: AxiosError) => {
            const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
            showToast({ message, severity: "error" });
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [FILES] });
            showToast({ message: "User invitation verified successfully" });
        },
    });

    const sendInvite = useMutation({
        mutationFn: async (formData: ProjectInviteRequestType) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.inviteProjectUser}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        },
        onSettled: (response, error) => {
            if (error) return { type: "error", message: error };
            queryClient.refetchQueries({ queryKey: [INVITEES] });
            showToast({ message: "Invite sent successfully" });
            return response;
        },
    });

    const invitePage = useMutation({
        mutationFn: async (formData: InvitePageRequestType) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.invitePage}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        },
        onSettled: (response, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                return showToast({ message, severity: "error" });
            }
            queryClient.refetchQueries({ queryKey: [INVITEES] });
            showToast({ message: "Page Link sent successfully" });
            return response;
        },
    });

    const inviteFlow = useMutation({
        mutationFn: async (formData: InviteFlowRequestType) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.inviteFlow}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        },
        onSettled: (response, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
            queryClient.refetchQueries({ queryKey: [INVITEES] });
            showToast({ message: "Flow Link sent successfully" });
            return response;
        },
    });

    const inviteVersion = useMutation({
        mutationFn: async (formData: InviteVersionRequestType) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.inviteVersion}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        },
        onSettled: (response, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                return showToast({ message, severity: "error" });
            }
            queryClient.refetchQueries({ queryKey: [VERSIONS] });
            showToast({ message: "Version Link sent successfully" });
            return response;
        },
    });

    const markAsFavourite = useMutation({
        mutationFn: async (formData: { projectId: number; status: boolean }) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.userFavorite}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const response = get(data, "data", {});
            const statusMessage = get(data, "message", "");
            return formattedResponse<any>(response, statusMessage);
        },
        onSettled: (response, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return;
            }
            queryClient.refetchQueries({ queryKey: [VERSIONS] });
            const { statusMessage } = response || { statusMessage: "" };
            showToast({ message: statusMessage });
        },
    });

    return {
        updateProject,
        sendInvite,
        invitePage,
        inviteFlow,
        inviteVersion,
        verifyUserInvite,
        markAsFavourite,
    };
};

const useFetchProjectUsers = (projectId?: number) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<ProjectUserResponseType[], AxiosError>(
        {
            queryKey: [ProjectUsers, projectId],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.userFiles}`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                    data: {
                        projectId,
                    },
                });
                return get(data, "data", {}) as ProjectUserResponseType[];
            },
            enabled: !!projectId,
            retryDelay: 3,
            staleTime: 60 * 1000,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
        },
    );
};

const useFetchProjectBranch = (projectId?: number) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<BranchResponseType[], AxiosError>(
        {
            queryKey: [BRANCH_LIST, projectId],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `project/${projectId}/branch`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                });

                return get(data, "data", {}) as any;
            },
            enabled: !!projectId,
            retryDelay: 3,
            staleTime: Infinity,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
            return data;
        },
    );
};

const useFetchPrototypeList = (branchKey: string) => {
    const { showToast } = useContext(ToasterContext);
    const history = useHistory();
    const { token } = UserContext();
    const {
        projectId,
    }: {
        projectId: string;
    } = useParams();
    return useQueryWithSettled<PageType[], AxiosError>(
        {
            queryKey: [PROTOTYPES, projectId, branchKey],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.prototypes}`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                    data: {
                        projectId,
                        branchKey,
                    },
                });
                return get(data, "data", {}) as PageType[];
            },
            retry: 3,
            retryDelay: 3,
            gcTime: 60 * 5 * 1000,
            staleTime: 60 * 5 * 1000,
            refetchInterval: 60 * 5 * 1000,
            refetchOnMount: false,
        },
        (prototypeResponse, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                history.push("/");
            }
            return prototypeResponse;
        },
    );
};

const useFetchProjectList = ({ startDate, endDate, key, enabled = true }: FetchProjectListParams) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<IUserFile[], AxiosError>(
        {
            queryKey: [PROJECT_LIST, key],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.fetchProject}${
                        startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ``
                    }`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                });
                return get(data, "data", {}) as IUserFile[];
            },
            retryDelay: 3,
            staleTime: 60 * 5 * 1000,
            enabled,
        },
        (prototypeResponse, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
            return prototypeResponse;
        },
    );
};

const getFilterDateRange = ({
    filter,
    startDate,
    endDate,
}: {
    filter: string;
    startDate?: string;
    endDate?: string;
}) => {
    const scurrentDate = new Date();
    const ecurrentDate = new Date();
    let startDates;
    let endDates;

    const formatDateToISOString = (date: Date | string) => {
        if (typeof date === "string") {
            const dateObject = new Date(date);
            return dateObject.toISOString().slice(0, 19).replace("T", " ");
        }
        return date.toISOString().slice(0, 19).replace("T", " ");
    };
    switch (filter) {
        case "View All":
            return {};

        case "Last 30 Days":
            startDates = new Date(scurrentDate);
            startDates.setDate(scurrentDate.getDate() - 29);
            startDates.setHours(0, 0, 0, 0);

            endDates = new Date(ecurrentDate);
            endDates.setHours(23, 59, 59, 999);
            return {
                startDate: formatDateToISOString(startDates),
                endDate: formatDateToISOString(endDates),
            };

        case "Last 6 Months":
            startDates = new Date(scurrentDate);
            startDates.setMonth(scurrentDate.getMonth() - 6);
            startDates.setHours(0, 0, 0, 0);

            endDates = new Date(ecurrentDate);
            endDates.setHours(23, 59, 59, 999);
            return {
                startDate: formatDateToISOString(startDates),
                endDate: formatDateToISOString(endDates),
            };

        case "This Year":
            startDates = new Date(scurrentDate.getFullYear(), 0, 2);
            startDates.setHours(0, 0, 0, 0);

            endDates = new Date(ecurrentDate.getFullYear(), ecurrentDate.getMonth(), ecurrentDate.getDate());
            endDates.setHours(23, 59, 59, 999);
            return {
                startDate: formatDateToISOString(startDates),
                endDate: formatDateToISOString(endDates),
            };

        case "Last Year":
            startDates = new Date(scurrentDate.getFullYear() - 1, 0, 2);
            startDates.setHours(0, 0, 0, 0);

            endDates = new Date(ecurrentDate.getFullYear() - 1, 11, 31);
            endDates.setHours(23, 59, 59, 999);
            return {
                startDate: formatDateToISOString(startDates),
                endDate: formatDateToISOString(endDates),
            };
        case "Custom Range": {
            if (startDate && endDate) {
                return {
                    startDate: formatDateToISOString(startDate),
                    endDate: formatDateToISOString(endDate),
                };
            }
            const { startDate: customStartDate, endDate: customEndDate } = getCustomRange();
            if (customStartDate && customEndDate) {
                return { startDate: customStartDate, endDate: customEndDate };
            }
            return {};
        }

        case "This Week":
        default:
            startDates = new Date(scurrentDate);
            startDates.setDate(scurrentDate.getDate() - 6);
            startDates.setHours(0, 0, 0, 0);

            endDates = new Date(ecurrentDate);
            endDates.setHours(23, 59, 59, 999);
            return {
                startDate: formatDateToISOString(startDates),
                endDate: formatDateToISOString(endDates),
            };
    }
};

export {
    getFilterDateRange,
    useFetchProjectBranch,
    useFetchProjectList,
    useFetchProjectUsers,
    useFetchPrototypeList,
    useProjectMutations,
};
