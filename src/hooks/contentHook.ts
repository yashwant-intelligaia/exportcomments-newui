"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { APP_CONSTANT } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { ContentType } from "../types";
import { api, messages } from "../utils";
import { get } from "../utils/object";
import { useQueryWithSettled } from "./queryUtils";

const PRIVACY_POLICY = "privacy-policy";
const TERMS_OF_USE = "terms-of-use";

const useFetchedPrivacyPolicyContent = () => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<ContentType, AxiosError>(
        {
            queryKey: [PRIVACY_POLICY],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.privacyPolicy}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
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
        },
    );
};
const useFetchedTermsOfUseContent = () => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<ContentType, AxiosError>(
        {
            queryKey: [TERMS_OF_USE],
            queryFn: async () => {
                const { data } = await api({
                    version: "v2",
                    url: `${APP_CONSTANT.webApi.termOfUse}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
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
        },
    );
};

export { useFetchedPrivacyPolicyContent, useFetchedTermsOfUseContent };
