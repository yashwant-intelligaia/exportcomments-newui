"use client";

import { useEffect } from "react";

import { useHistory } from "@/utils/navigation";

import { useFlowMutations } from "../../hooks";
import { Loader } from "../../stories/components/Loader/Loader";
import { getLoadingImage, getLoadingMessage, useQueryParams } from "../../utils";

export const InvitePageFlow = () => {
    const query = useQueryParams();
    const history = useHistory();
    const token = query.get("token");
    const { verifyFeedbackVersion } = useFlowMutations();
    const { mutate: mutateVerifyFlow, data, isPending: isVerifyFlowLoading, isError } = verifyFeedbackVersion;

    useEffect(() => {
        mutateVerifyFlow({ token });
    }, [token]);

    useEffect(() => {
        if (isError) {
            setTimeout(() => history.push("/"), 1000);
        }
    }, [isError]);

    if (data) {
        const { link } = data;
        window.location.href = link;
    }
    return (
        <>
            {isVerifyFlowLoading && (
                <Loader message={getLoadingMessage("comment")} image={getLoadingImage("comment")} />
            )}
        </>
    );
};
