"use client";

import { get } from "lodash";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { api, messages } from "../utils";

const usePageMutations = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);

    const verifyPage = useMutation({ mutationFn: async (formData: any) => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.verifyPage}`,
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
    return {
        verifyPage,
    };
};

export { usePageMutations };
