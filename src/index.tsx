import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { App } from "./App";
import {
    AddProjectContextProvider,
    ProjectDetailsContextProvider,
    PrototypePageContextProvider,
    ToasterContextProvider,
} from "./contexts";
import { ProjectFilterContextProvider } from "./contexts/ProjectFilterContext";
import { SizeContextProvider } from "./contexts/SizeContext";
import { UserContextProvider } from "./contexts/UserContext";

const UNAUTHORIZED = 401;

/* Global Request Error handler */

const handleError = (error: any) => {
    if (error.response.status === UNAUTHORIZED) {
        setTimeout(() => {
            clearUserSession().then(queryClient.clear(), (window.location.href = "/"));
        }, 3000);
    }
};

const queryClient: any = new QueryClient({
    mutationCache: new MutationCache({
        onError: (error: any) => handleError(error),
    }),
    queryCache: new QueryCache({
        onError: (error: any) => handleError(error),
    }),
});

const clearUserSession: any = async () => {
    localStorage.clear();
};

ReactDOM.render(
    <React.StrictMode>
        <ToasterContextProvider>
            <UserContextProvider>
                <SizeContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <PrototypePageContextProvider>
                            <ProjectFilterContextProvider>
                                <AddProjectContextProvider>
                                    <ProjectDetailsContextProvider>
                                        <App />
                                    </ProjectDetailsContextProvider>
                                </AddProjectContextProvider>
                            </ProjectFilterContextProvider>
                        </PrototypePageContextProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </SizeContextProvider>
            </UserContextProvider>
        </ToasterContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
