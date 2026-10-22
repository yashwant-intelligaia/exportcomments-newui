"use client";

import { useEffect, useRef, useState } from "react";

import Figma from "../../../assets/figma.svg";
import { UserContext } from "../../../contexts";
import { EcTooltip } from "../../../stories/components";
import { CommentRowType, ReactionActionType } from "../../../types";
import { getMessagesWithEmojis, getReactionAction } from "../../../utils";
import { ReactionList } from "../ReactionList";
import { ReactionPopover } from "../ReactionPopover";

interface CommentCellPropsType {
    row: CommentRowType;
    onReplyClick: () => void;
    onAddOrRemoveReaction: (reaction: string, action: ReactionActionType, commentId: string) => void;
}

export const CommentCell = ({ row, onReplyClick, onAddOrRemoveReaction }: CommentCellPropsType) => {
    const { figmaUser } = UserContext();
    const commentsDomElement = useRef<HTMLSpanElement>(null);
    const [isTruncated, setTruncated] = useState(false);

    useEffect(() => {
        const el = commentsDomElement.current;
        if (el) setTruncated(el.offsetWidth < el.scrollWidth);
    }, []);

    const react = (reaction: string) =>
        onAddOrRemoveReaction(reaction, getReactionAction(row.reactions || [], reaction, figmaUser), row.id);

    const message = (
        <span ref={commentsDomElement} className="w-[70%] truncate leading-4">
            {getMessagesWithEmojis(row.message)}
        </span>
    );
    const replyCount = row?.children?.length ?? 0;

    return (
        <div className="relative flex w-full">
            {row.unreadComment && (
                <span
                    aria-label="unread"
                    className="bg-blue-ink absolute top-1/2 right-0 size-[11px] -translate-y-1/2 rounded-full"
                />
            )}
            <div className="flex min-w-[32rem] flex-col">
                <div className="flex h-[30px] items-center">
                    {isTruncated ? (
                        <EcTooltip title={row.message} placement="top-start" arrow>
                            {message}
                        </EcTooltip>
                    ) : (
                        message
                    )}
                </div>
                <div className="flex h-11 items-center">
                    <ReactionPopover onClickReaction={react} />
                    <ReactionList data={row.reactions} onClick={react} />
                </div>
            </div>
            <div className="absolute top-0 right-0 flex h-full w-40 items-center justify-end gap-6 px-4">
                {replyCount > 0 && (
                    <button
                        type="button"
                        onClick={onReplyClick}
                        className="text-blue-ink w-20 text-sm font-bold whitespace-nowrap"
                    >
                        {replyCount === 1 ? `${replyCount} Reply` : `${replyCount} Replies`}
                    </button>
                )}
                <EcTooltip title="Figma Location" placement="top" arrow>
                    <a target="_blank" rel="noreferrer" href={row.commentLocation} aria-label="Figma Location">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" src={Figma.src} className="size-[18px]" />
                    </a>
                </EcTooltip>
            </div>
        </div>
    );
};
