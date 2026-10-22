import { Redirect, Route, useLocation } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export const AuthRoute = (props: any) => {
    const { token } = UserContext();
    const location = useLocation();

    return token ? (
        <Redirect
            to={{
                pathname: "/projects",
                state: { from: location },
            }}
        />
    ) : (
        <Route {...props} />
    );
};
