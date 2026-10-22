import { AxiosError } from "axios";
import { get } from "lodash";
import { useContext } from "react";
import { useQuery } from "react-query";

import { APP_CONSTANT } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { ContentType } from "../types";
import { api, messages } from "../utils";

const PRIVACY_POLICY = "privacy-policy";
const TERMS_OF_USE = "terms-of-use";

const useFetchedPrivacyPolicyContent = () => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQuery<ContentType, AxiosError>(
        [PRIVACY_POLICY],
        async () => {
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
        {
            retry: 3,
            retryDelay: 3,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            onSettled: (data, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
            },
        }
    );
};
const useFetchedTermsOfUseContent = () => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQuery<ContentType, AxiosError>(
        [TERMS_OF_USE],
        async () => {
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
        {
            retry: 3,
            retryDelay: 3,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            onSettled: (data, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
            },
        }
    );
};

export { useFetchedPrivacyPolicyContent, useFetchedTermsOfUseContent };
