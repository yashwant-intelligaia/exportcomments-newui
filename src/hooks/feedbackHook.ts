"use client";

import { get } from "lodash";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { APP_CONSTANT } from "../constants/AppConstant";
import { ToasterContext } from "../contexts";
import { SurveyFeedbackPayload } from "../types";
import { api, messages } from "../utils";

const useFeedbackMutation = () => {
    const { showToast } = useContext(ToasterContext);
    const postFeedback = useMutation({ mutationFn: (payloadData: SurveyFeedbackPayload) =>
            api({
                url: APP_CONSTANT.webApi.postFeedback,
                method: "POST",
                data: payloadData,
                version: "v2",
            }), onSettled: (response: any, error: any) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                    return error;
                }
                return response;
            } });
    return { postFeedback };
};

export { useFeedbackMutation };
