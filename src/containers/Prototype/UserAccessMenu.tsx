"use client";

import { useState } from "react";

import { Avatar, AvatarGroup } from "@/components/ui/Display";
import { Popover } from "@/components/ui/Popover";

import { PageUserType } from "../../types";

interface UserAccessMenuPropsType {
    max: number;
    pageUsers: PageUserType[];
    avatarSize: number;
}

export const UserAccessMenu = ({ max, pageUsers, avatarSize }: UserAccessMenuPropsType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <>
            {pageUsers.length ? (
                <button type="button" aria-label="Users with access" className="cursor-pointer" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <AvatarGroup max={max} size={avatarSize}>
                        {pageUsers.map((user) => (
                            <Avatar key={user.user_id} src={user.avatar} name={user.name || user.email} size={avatarSize} />
                        ))}
                    </AvatarGroup>
                </button>
            ) : (
                <span className="text-sm text-muted">There are no users</span>
            )}
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} className="max-h-[200px] w-[230px] overflow-y-auto pt-2.5">
                <ul>
                    {pageUsers.map((user) => (
                        <li key={user.user_id} className="flex items-center gap-1.5 px-4 py-2 break-words whitespace-normal">
                            <Avatar src={user.avatar} name={user.name || user.email} size={25} />
                            <span className="text-base">{user.name || user.email}</span>
                        </li>
                    ))}
                </ul>
            </Popover>
        </>
    );
};
