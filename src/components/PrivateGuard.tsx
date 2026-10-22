"use client";

import { ReactNode } from "react";

import { useFetchUserDetails } from "@/hooks/usersHook";

/* Access itself is enforced by src/proxy.ts; this keeps the user profile fresh like PrivateRoute did. */
export const PrivateGuard = ({ children }: { children: ReactNode }) => {
    useFetchUserDetails({ showError: true });
    return <>{children}</>;
};
