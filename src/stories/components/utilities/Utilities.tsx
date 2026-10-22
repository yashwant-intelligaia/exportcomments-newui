"use client";

import { useEffect, useRef, useState } from "react";

import { useHistory, useLocation } from "@/utils/navigation";

import { APP_CONSTANT, TIME_ZONE } from "../../../constants/AppConstant";
import { UserContext } from "../../../contexts/UserContext";
import { useAuthMutations } from "../../../hooks";
import { api } from "../../../utils";

export const Utilities = ({ user, userOptions }: any) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const { token } = UserContext();
    const [isActive, setIsActive] = useState(false);
    const { logoutUserSession } = useAuthMutations();
    const wrapRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!isActive) return;
        const onDown = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setIsActive(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [isActive]);

    const handleMenuItemClick = (parameter: string) => async () => {
        if (parameter === "Logout" && history) {
            await api({
                url: `${APP_CONSTANT.webApi.userLogout}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}`, Timezone: TIME_ZONE },
                version: "v2",
            });
            logoutUserSession();
        }
    };

    if (pathname === "/") return null;
    return (
        <ul className="m-0 flex list-none items-center p-0">
            <li ref={wrapRef} className="relative z-[99] px-2">
                <button
                    type="button"
                    aria-label="Open profile menu"
                    onClick={() => setIsActive(!isActive)}
                    id="NB-user-avatar"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="profile" src={user?.avatar} className="size-9 rounded-full object-cover" />
                </button>

                {isActive && (
                    <div className="border-line bg-surface shadow-card absolute top-[calc(100%+8px)] right-0 z-[1000] min-w-56 overflow-hidden rounded-md border pb-1">
                        <div className="border-line bg-paper border-b px-4 py-3">
                            <span className="text-ink block font-semibold">{user?.name}</span>
                            <p className="text-muted m-0 text-sm">{user?.email}</p>
                        </div>
                        {userOptions.map((item: string, index: number) => (
                            <button
                                key={`option${index + 1}`}
                                type="button"
                                onClick={handleMenuItemClick(item)}
                                id={`NB-user-profile-option-${index}`}
                                className="text-ink hover:bg-surface-sunk flex w-full px-4 py-2.5 text-left text-sm"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </li>
        </ul>
    );
};
