"use client";

import { Avatar } from "@/components/ui/Display";

import { UserContext } from "../../contexts";
import { useAuthMutations } from "../../hooks/authHook";

const ResponsiveDrawerNavigation = () => {
    const { user: userDetail } = UserContext();
    const { logoutUserSession } = useAuthMutations();
    return (
        <div className="flex h-full flex-col">
            <header className="border-line bg-paper flex flex-col items-center gap-1 border-b px-4 py-6 text-center">
                <Avatar src={userDetail.avatar} name={userDetail.name} size={80} />
                <span className="text-ink font-semibold">{userDetail.name}</span>
                <span className="text-muted text-sm">{userDetail.email}</span>
            </header>
            <footer className="border-line mt-auto border-t p-2">
                <button
                    type="button"
                    onClick={logoutUserSession}
                    className="text-ink hover:bg-surface-sunk w-full rounded-sm px-3 py-2.5 text-center"
                >
                    Logout
                </button>
            </footer>
        </div>
    );
};

export { ResponsiveDrawerNavigation };
