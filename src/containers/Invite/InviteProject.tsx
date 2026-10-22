"use client";

import { useEffect } from "react";
import { useHistory } from "@/utils/navigation";

import { useProjectMutations } from "../../hooks";
import { Loader } from "../../stories/components/Loader/Loader";
import { getLoadingImage, getLoadingMessage, useQueryParams } from "../../utils";
import { PageNotFound } from "../Common";

const InviteProject = () => {
    const history = useHistory();
    const query = useQueryParams();
    const token = query.get("token");

    const { verifyUserInvite } = useProjectMutations();
    const { mutate, data, isPending: isLoading, error } = verifyUserInvite;

    useEffect(() => {
        if (token) {
            mutate({
                inviteToken: token,
            });
        }
    }, [token]);

    useEffect(() => {
        if (data) {
            history.push("/projects");
        } else if (error) {
            history.push("/projects");
        }
    }, [data, error]);

    if (!token) return <PageNotFound />;
    if (isLoading)
        return <Loader message={getLoadingMessage("project")} image={getLoadingImage("project")} />;
    return <></>;
};
export { InviteProject };
