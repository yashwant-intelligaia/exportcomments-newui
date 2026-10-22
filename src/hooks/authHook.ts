import { get } from "lodash";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import { removeUser, removeUserToken } from "../services/AuthService";
import { removeCustomRange, removeFilter } from "../services/ProjectService";
import { RequestTokenType } from "../types";
import { api, messages } from "../utils";

const useAuthMutations = () => {
    const { showToast } = useContext(ToasterContext);
    const history = useHistory();
    const { setToken, setUser } = UserContext();

    const saveFigmaAccessToken = useMutation(
        async (requestData: RequestTokenType) => {
            const { data } = await api({
                url: `${APP_CONSTANT.webApi.getToken}`,
                version: "v2",
                method: "POST",
                data: requestData,
                headers: {
                    Timezone: TIME_ZONE,
                },
            });
            return get(data, "data", {});
        },
        {
            onSettled: (response, error) => {
                if (error) {
                    const message = get(
                        error,
                        "response.data.message",
                        messages.SOMETHING_WENT_WRONG
                    );
                    showToast({ message, severity: "error" });
                }
                return response;
            },
        }
    );

    const logoutUserSession = () => {
        removeUserToken();
        removeUser();
        setUser({});
        setToken("");
        removeFilter();
        removeCustomRange();
        history.replace("/");
    };

    return {
        saveFigmaAccessToken,
        logoutUserSession,
    };
};

export { useAuthMutations };
