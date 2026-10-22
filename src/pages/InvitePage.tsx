"use client";

import { useParams } from "@/utils/navigation";

import { InvitePageFlow, InviteProject, InviteProjectPage, PageNotFound } from "../containers";

const InvitePage = () => {
    const { type } = useParams<{ [key: string]: string }>();
    if (type === "project") {
        return <InviteProject />;
    }
    if (type === "page") {
        return <InviteProjectPage />;
    }
    if (type === "flow") {
        return <InvitePageFlow />;
    }
    return <PageNotFound />;
};
export { InvitePage };
