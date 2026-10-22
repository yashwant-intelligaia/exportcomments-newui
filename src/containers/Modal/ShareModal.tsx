"use client";

import { ReactNode } from "react";

import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Display";
import { cn } from "@/components/ui/cn";

interface ShareModalPropsType {
    title: string | JSX.Element;
    children: JSX.Element | JSX.Element[];
    actionButtons: JSX.Element | JSX.Element[];
}

export const ShareModal = ({ title, children, actionButtons }: ShareModalPropsType) => (
    <Modal open size="sm" className="share-modal">
        <div className="pr-4 [&_h2]:mb-2.5 [&_h2]:font-sans [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-normal">{title}</div>
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
        <p className="mb-2 font-medium text-ink">People with access</p>
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
    <div className={cn("flex items-center pt-4", divider && "mb-3 border-b border-line pb-3")}>
        <div className="flex w-full items-center">
            <Avatar src={avatar} name={name || email} size={40} className="mr-2" />
            <div className="flex grow flex-wrap items-center leading-5">
                <div className="flex grow flex-col">
                    <span className="text-sm font-medium text-ink">{name}</span>
                    {email && <span className="text-xs text-muted">{email}</span>}
                </div>
                {trailing && <div className="flex min-w-24 items-center text-xs text-muted">{trailing}</div>}
            </div>
        </div>
    </div>
);
