"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext } from "../contexts";
import { UserContext } from "../contexts/UserContext";
import {
    AddUserFormDataType,
    DeleteProjectMemberDataType,
    FigmaUserType,
    FilteredUserResponseType,
    ISnackBarMessage,
    IUserInformationResponse,
    ProcessedInviteesDataType,
    UserDataType,
    UserResponseType,
} from "../types";
import { api, messages } from "../utils";
import { get } from "../utils/object";
import { useQueryWithSettled } from "./queryUtils";

const USER = "User";
const USER_LIST = "User-list";
const INVITEES = "invitees";
const FIGMA_USER = "figma-user";
const FILES = "files";

axios.defaults.baseURL = APP_CONSTANT.baseUrl;

const useFetchUsers = (props: ISnackBarMessage) =>
    useQueryWithSettled<IUserInformationResponse, AxiosError>(
        {
            queryKey: [USER_LIST],
            queryFn: () => axios.get(`${APP_CONSTANT.webApi.getUserList}`),
            retry: 3,
            retryDelay: 3,
        },
        (
            usersResponse: IUserInformationResponse | undefined,
            error: AxiosError | null,
        ): IUserInformationResponse | null | AxiosError => {
            if (usersResponse) {
                return usersResponse;
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

const useFetchUserDetails = ({ showError = true, enabled = true }: { showError?: boolean; enabled?: boolean }) => {
    const { token, setUser } = UserContext();
    const { showToast } = useContext(ToasterContext);
    return useQueryWithSettled<any, AxiosError>(
        {
            queryKey: [USER],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: APP_CONSTANT.webApi.getUser,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                });
                return get(data, "data", {});
            },
            retry: false,
            enabled,
            // staleTime: 5 * 1000,
            staleTime: Infinity,
            refetchOnMount: false,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                if (showError) {
                    showToast({ message, severity: "error" });
                }
            }
            if (data) {
                setUser(data);
            }
        },
    );
};

const useFetchFigmaUserData = () => {
    const { token, setFigmaUser } = UserContext();
    const { showToast } = useContext(ToasterContext);
    return useQueryWithSettled<FigmaUserType, AxiosError>(
        {
            queryKey: [FIGMA_USER],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: APP_CONSTANT.webApi.getUserFigmaDetails,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                });
                return get(data, "data", {});
            },
            retry: 3,
            retryDelay: 3,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
            if (data) {
                setFigmaUser(data);
            }
        },
    );
};

const useFetchInviteeUsers = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    return useQueryWithSettled<UserResponseType[], AxiosError>(
        {
            queryKey: [INVITEES],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: APP_CONSTANT.webApi.getAllUsers,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Timezone: TIME_ZONE,
                    },
                });
                return get(data, "data", {});
            },
            retry: 3,
            retryDelay: 3,
            staleTime: 0,
            refetchOnMount: false,
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

const useProcessInviteesData = (data: UserResponseType[]): ProcessedInviteesDataType[] => {
    const processedData: ProcessedInviteesDataType[] = [];
    data.forEach(({ name, email, avatar }) => {
        if (email) {
            processedData.push({
                inputValue: "",
                avatar,
                name,
                email,
                showProject: false,
                selectedProjectIds: [],
            });
        }
    });
    return processedData;
};

const useAddUserToProject = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);

    const addUserToProject = useMutation({
        mutationFn: async (formData: AddUserFormDataType[]) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.addUser,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: formData,
            });
            return get(data, "data", {});
        },
        onSettled: (response, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            showToast({ message: response?.data?.message });
            return response;
        },
    });
    return { addUserToProject };
};

const useDeleteProjectMember = (callback: () => void) => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    const queryClient = useQueryClient();
    const deleteProjectMember = useMutation({
        mutationFn: async (formData: DeleteProjectMemberDataType) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.deleteProjectMember,
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
            callback();
            showToast({
                message: "User removed from project successfully",
                severity: "success",
            });
            queryClient.refetchQueries({ queryKey: [FILES] });
        },
    });
    return { deleteProjectMember };
};
const useUnsubscribeMutation = () => {
    const { showToast } = useContext(ToasterContext);
    const releaseEmail = useMutation({
        mutationFn: (payloadData: { token: string }) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.unsubscribeReleaseEmail,
                method: "POST",
                data: payloadData,
                headers: {
                    Timezone: TIME_ZONE,
                },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            showToast({
                message: "You have successfully unsubscribed to future release emails",
            });
            return response;
        },
    });
    return { releaseEmail };
};

const useFilterInviteesData = (data: UserResponseType[]) => {
    const filteredData: FilteredUserResponseType[] = [];
    data.forEach(({ name, email, avatar }) => {
        if (email) {
            filteredData.push({
                inputValue: "",
                avatar,
                name,
                email,
            });
        }
    });
    return filteredData;
};

const useUserMutation = () => {
    const queryClient = useQueryClient();
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);

    const acceptTermsOfUseAndPrivacyPolicy = useMutation({
        mutationFn: () =>
            axios.get(APP_CONSTANT.webApi.acceptTermsOfUseAndPrivacyPolicy, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            queryClient.setQueryData<UserDataType | undefined>([USER], (userDetail) => {
                if (!userDetail) {
                    return undefined;
                }
                return {
                    ...userDetail,
                    acceptTermsOfUseAndPrivacyPolicy: true,
                };
            });
            return response;
        },
    });

    return { acceptTermsOfUseAndPrivacyPolicy };
};

export {
    FILES,
    INVITEES,
    useAddUserToProject,
    useDeleteProjectMember,
    useFetchFigmaUserData,
    useFetchInviteeUsers,
    useFetchUserDetails,
    useFetchUsers,
    useFilterInviteesData,
    useProcessInviteesData,
    USER,
    useUnsubscribeMutation,
    useUserMutation,
};
