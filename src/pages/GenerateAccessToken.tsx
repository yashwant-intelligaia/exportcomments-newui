"use client";

import { useEffect } from "react";

import { APP_CONSTANT } from "../constants/AppConstant";
import { useFetchUserDetails } from "../hooks";
import { saveGenerateAccessTokenStatus } from "../services/AuthService";
import { initOAuth } from "../utils";

export const GenerateAccessToken = () => {
    const { isFetching, isError } = useFetchUserDetails({ showError: false });

    useEffect(() => {
        if (isError) {
            saveGenerateAccessTokenStatus("true");
            initOAuth({
                redirectUri: APP_CONSTANT.figmaApp.redirectUri,
            });
        }
    }, [isError]);
    if (isFetching || isError) return <>Loading...</>;
    // TODO: Add Generate token functionality.
    return <>GenerateAccessToken</>;
};
