import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import EmojiConvertor from "emoji-js";
import { useLocation } from "react-router-dom";

import { APP_CONSTANT } from "../constants/AppConstant";
import { FormattedResponseType, ResponseType } from "../types";

interface APIOptions extends AxiosRequestConfig {
    version?: "v1" | "v2"; // default v1
}

const uniqueKey = (prefix: string | number) => `${prefix}-${new Date().getTime()}`;

const emailValidation = (email: string) => {
    const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!email) {
        return false;
    }

    return pattern.test(email);
};

const api = (options: APIOptions): AxiosPromise<any> => {
    const baseURL = options.version === "v2" ? APP_CONSTANT.koa2BaseUrl : APP_CONSTANT.baseUrl;
    delete options.version;
    return axios({ baseURL, ...options });
};

const messages = {
    SOMETHING_WENT_WRONG: "Something went wrong!",
};

const useQueryParams = () => new URLSearchParams(useLocation().search);

const initOAuth = ({ target = "_self", redirectUri }: { target?: string; redirectUri: string }) => {
    const baseUrl = `${APP_CONSTANT.figmaUrl}/oauth?client_id=${
        APP_CONSTANT.figmaApp.clientId
    }&redirect_uri=${redirectUri}&scope=${
        APP_CONSTANT.figmaApp.scopes
    }&state=${null}&response_type=${APP_CONSTANT.figmaApp.code}`;
    window.open(baseUrl, target);
};
const copyToClipboard = (content: string) => navigator.clipboard.writeText(content);

const openLink = ({
    event,
    url,
    target,
}: {
    event?: React.MouseEvent<HTMLAnchorElement>;
    url: string | URL;
    target: string;
}) => {
    event && event.preventDefault();
    window.open(url, target);
};

const getFigjamLink = ({ fileKey, fileName }: { fileKey: string; fileName: string }) =>
    `https://www.figma.com/file/${fileKey}/${encodeURIComponent(fileName)}`;

const getMessagesWithEmojis = (message: string) => {
    const emoji = new EmojiConvertor();
    emoji.replace_mode = "unified";
    emoji.allow_native = true;
    return emoji.replace_colons(message);
};

function formattedResponse<T>(
    response: ResponseType<T>,
    statusMessage: string
): FormattedResponseType<T> {
    return {
        ...response.data,
        statusMessage,
    };
}

export {
    api,
    copyToClipboard,
    emailValidation,
    formattedResponse,
    getFigjamLink,
    getMessagesWithEmojis,
    initOAuth,
    messages,
    openLink,
    uniqueKey,
    useQueryParams,
};
