"use client";

import { useEffect } from "react";

import { useHistory } from "@/utils/navigation";

import { usePageMutations } from "../../hooks";
import { Loader } from "../../stories/components/Loader/Loader";
import { getLoadingImage, getLoadingMessage, useQueryParams } from "../../utils";

export const InviteProjectPage = () => {
    const query = useQueryParams();
    const history = useHistory();
    const token = query.get("token");
    const { verifyPage } = usePageMutations();
    const { mutate: mutateVerifyPage, data, isPending: isVerifyPageLoading, isError } = verifyPage;
    useEffect(() => {
        mutateVerifyPage({ token });
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
            {isVerifyPageLoading && (
                <Loader message={getLoadingMessage("project")} image={getLoadingImage("project")} />
            )}
        </>
    );
};
