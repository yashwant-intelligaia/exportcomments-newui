"use client";

import { AxiosError } from "axios";
import { get } from "../utils/object";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { feedbackRatingType } from "../types/flow";
import { api, messages } from "../utils";

const VERSIONS = "versions";
const useFlowMutations = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    const queryClient = useQueryClient();
    const verifyFlow = useMutation({ mutationFn: async (formData: any) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.verifyFlow}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        }, onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
                return response;
            } });
    const verifyFeedbackVersion = useMutation({ mutationFn: async (formData: any) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.verifyFeedbackVersion}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        }, onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
                return response;
            } });
    const flowVersion = useMutation({ mutationFn: async (formData: any) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.flowVersion}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        }, onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );

                    return showToast({ message, severity: "error" });
                }
                showToast({ message: "Flow version created successfully" });
                return response;
            } });
    const flowVersionList = useMutation({ mutationFn: async (formData: any) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.flowVersionList}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        }, onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );

                    showToast({ message, severity: "error" });
                }
                return response;
            } });
    const feedbackRating = useMutation({ mutationFn: async (formData: feedbackRatingType) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.feedbackRating}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        }, onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );

                    showToast({ message, severity: "error" });
                }
                queryClient.refetchQueries({ queryKey: [VERSIONS] });
                return response;
            } });

    return {
        verifyFlow,
        flowVersion,
        flowVersionList,
        feedbackRating,
        verifyFeedbackVersion,
    };
};
const useFetchFlowList = (flowId: any) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQuery<any, AxiosError>({ queryKey: [VERSIONS, flowId], queryFn: async () => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.flowVersionList}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: { flowId },
            });
            return get(data, "data", {}) as any;
        }, retry: 3,
            retryDelay: 3,
            refetchOnMount: false,
            staleTime: Infinity,
            // staleTime: 60 * 5 * 10000,
            // refetchInterval: 60 * 5 * 1000,

            onSettled: (versionResponse, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
                return versionResponse;
            } });
};

export { useFetchFlowList, useFlowMutations };
