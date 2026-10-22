"use client";

import { format, parseISO } from "date-fns";

import { Avatar } from "@/components/ui/Display";

import { getMessagesWithEmojis } from "../../../utils/common";

interface EcCommentPropsType {
    name: string;
    src: string;
    date: string;
    message: string;
}

const EcComment = ({ name, src, date, message }: EcCommentPropsType) => (
    <>
        <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <Avatar src={src} name={name} size={25} />
                <span>{name}</span>
            </div>
            <span className="text-xs font-normal">{format(parseISO(date), "MMM d, yyyy")}</span>
        </div>
        <p className="mt-2.5 pl-1 text-sm">{getMessagesWithEmojis(message)}</p>
    </>
);

export { EcComment };
