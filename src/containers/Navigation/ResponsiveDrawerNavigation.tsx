"use client";

import { Avatar } from "@/components/ui/Display";

import { UserContext } from "../../contexts";
import { useAuthMutations } from "../../hooks/authHook";

const ResponsiveDrawerNavigation = () => {
    const { user: userDetail } = UserContext();
    const { logoutUserSession } = useAuthMutations();
    return (
        <div className="flex h-full flex-col">
            <header className="flex flex-col items-center gap-1 border-b border-line bg-paper px-4 py-6 text-center">
                <Avatar src={userDetail.avatar} name={userDetail.name} size={80} />
                <span className="font-semibold text-ink">{userDetail.name}</span>
                <span className="text-sm text-muted">{userDetail.email}</span>
            </header>
            <footer className="mt-auto border-t border-line p-2">
                <button type="button" onClick={logoutUserSession} className="w-full rounded-sm px-3 py-2.5 text-center text-ink hover:bg-surface-sunk">
                    Logout
                </button>
            </footer>
        </div>
    );
};

export { ResponsiveDrawerNavigation };
