"use client";

import { useEffect, useState } from "react";

import { useHistory } from "@/utils/navigation";

import { APP_CONSTANT } from "../constants/AppConstant";
import { PageNotFound } from "../containers";
import { UserContext } from "../contexts";
import { useAuthMutations } from "../hooks/authHook";
import { saveUserToken } from "../services/AuthService";
import { GlobalHeader } from "../stories/components/global-header/GlobalHeader";
import { Loader } from "../stories/components/Loader/Loader";
import { getLoadingImage, getLoadingMessage, useQueryParams } from "../utils";

export const FigmaAuth = () => {
    const history = useHistory();
    const query = useQueryParams();
    const [loadingMessage, setLoadingMessage] = useState("");
    const [loadingImage, setLoadingImage] = useState("");
    const { setToken } = UserContext();

    const { saveFigmaAccessToken } = useAuthMutations();
    const { mutate, isPending: isLoading, data, isError } = saveFigmaAccessToken;

    useEffect(() => {
        setLoadingMessage(getLoadingMessage("login"));
        setLoadingImage(getLoadingImage("login"));
        mutate({
            code: query.get("code"),
            state: query.get("state"),
            callbackUrl: APP_CONSTANT.figmaApp.redirectUri,
        });
    }, []);

    useEffect(() => {
        if (data) {
            setToken(data.accessToken);
            saveUserToken(data.accessToken);
            // TODO: uncomment below code for Generate access token functionality.
            // if (fetchGenerateAccessTokenStatus() === "true") {
            //     history.push("/generate-access-token");
            // }
        }
    }, [data]);

    if (isLoading && !data) {
        return <Loader message={loadingMessage} image={loadingImage} />;
    }
    if (isError) {
        return (
            <>
                <GlobalHeader />
                <PageNotFound />
            </>
        );
    }

    if (data) {
        history.push("/projects");
    }

    return <></>;
};
