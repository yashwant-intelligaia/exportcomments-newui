import { Redirect, Route, useLocation } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { useFetchUserDetails } from "../hooks/usersHook";

export const PrivateRoute = (props: any) => {
    const { token } = UserContext();
    useFetchUserDetails({ showError: true });

    const location = useLocation();

    return token ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/",
                state: { from: location },
            }}
        />
    );
};
