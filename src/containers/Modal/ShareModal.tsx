"use client";

import { ReactNode } from "react";

import { cn } from "@/components/ui/cn";
import { Avatar } from "@/components/ui/Display";
import { Modal } from "@/components/ui/Modal";

interface ShareModalPropsType {
    title: string | JSX.Element;
    children: JSX.Element | JSX.Element[];
    actionButtons: JSX.Element | JSX.Element[];
}

export const ShareModal = ({ title, children, actionButtons }: ShareModalPropsType) => (
    <Modal open size="sm" className="share-modal">
        <div className="pr-4 [&_h2]:mb-2.5 [&_h2]:font-sans [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-normal">
            {title}
        </div>
        {children}
        <div className="flex justify-end gap-2.5">{actionButtons}</div>
    </Modal>
);

/** Invite field on the left, primary action on the right (stacked on mobile). */
export const ShareInviteRow = ({ field, action }: { field: ReactNode; action: ReactNode }) => (
    <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex grow flex-col">{field}</div>
        <div className="flex min-w-40 justify-end">{action}</div>
    </div>
);

/** "People with access" list shell. */
export const PeopleList = ({ children }: { children: ReactNode }) => (
    <div className="my-5 mb-2.5 max-h-[250px] min-h-[150px] overflow-y-auto">
        <p className="text-ink mb-2 font-medium">People with access</p>
        {children}
    </div>
);

export const PersonRow = ({
    avatar,
    name,
    email,
    trailing,
    divider,
}: {
    avatar?: string;
    name?: string;
    email?: string;
    trailing?: ReactNode;
    divider?: boolean;
}) => (
    <div className={cn("flex items-center pt-4", divider && "border-line mb-3 border-b pb-3")}>
        <div className="flex w-full items-center">
            <Avatar src={avatar} name={name || email} size={40} className="mr-2" />
            <div className="flex grow flex-wrap items-center leading-5">
                <div className="flex grow flex-col">
                    <span className="text-ink text-sm font-medium">{name}</span>
                    {email && <span className="text-muted text-xs">{email}</span>}
                </div>
                {trailing && <div className="text-muted flex min-w-24 items-center text-xs">{trailing}</div>}
            </div>
        </div>
    </div>
);
