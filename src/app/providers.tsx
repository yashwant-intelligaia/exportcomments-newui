"use client";

import { isServer, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import {
    AddProjectContextProvider,
    ProjectDetailsContextProvider,
    PrototypePageContextProvider,
    ToasterContextProvider,
} from "@/contexts";
import { ProjectFilterContextProvider } from "@/contexts/ProjectFilterContext";
import { SizeContextProvider } from "@/contexts/SizeContext";
import { UserContextProvider } from "@/contexts/UserContext";
import { removeUser, removeUserToken } from "@/services/AuthService";

const UNAUTHORIZED = 401;

const handleError = (error: any) => {
    if (error?.response?.status === UNAUTHORIZED) {
        setTimeout(() => {
            removeUserToken();
            removeUser();
            localStorage.clear();
            window.location.href = "/";
        }, 3000);
    }
};

const makeQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { staleTime: 30 * 1000 } },
        mutationCache: new MutationCache({ onError: handleError }),
        queryCache: new QueryCache({ onError: handleError }),
    });

let browserQueryClient: QueryClient | undefined;
const getQueryClient = () => {
    if (isServer) return makeQueryClient();
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
};

export function Providers({ children, initialToken }: { children: ReactNode; initialToken: string }) {
    const queryClient = getQueryClient();
    return (
        <ToasterContextProvider>
            <UserContextProvider initialToken={initialToken}>
                <SizeContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <PrototypePageContextProvider>
                            <ProjectFilterContextProvider>
                                <AddProjectContextProvider>
                                    <ProjectDetailsContextProvider>{children}</ProjectDetailsContextProvider>
                                </AddProjectContextProvider>
                            </ProjectFilterContextProvider>
                        </PrototypePageContextProvider>
                    </QueryClientProvider>
                </SizeContextProvider>
            </UserContextProvider>
        </ToasterContextProvider>
    );
}
