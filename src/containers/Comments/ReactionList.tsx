"use client";

import { UserContext } from "../../contexts";
import { useProcessCommentReactions } from "../../hooks";
import { EcTooltip } from "../../stories/components";
import { ReactionUserType } from "../../types";
import { getReactionImage, uniqueKey } from "../../utils";

interface ReactionListPropsType {
    onClick: (value: string) => void;
    data: any[]; // reactions list
}

interface ReactionTooltipPropsType {
    emoji: string;
    users: ReactionUserType[];
    children: JSX.Element;
}

const ReactionTooltip = ({ emoji, users, children }: ReactionTooltipPropsType) => {
    const { figmaUser } = UserContext();
    let displayString = ``;
    const myUserIndex = users.findIndex((value) => value.id === figmaUser.id);
    if (myUserIndex !== -1) displayString = `You`;
    else if (users.length >= 1) displayString = users[0].handle;
    const plusCount = users.length - 1;

    return (
        <EcTooltip
            title={
                <>
                    {displayString}
                    {plusCount > 0 ? ` +${plusCount}` : ``}
                </>
            }
            description={
                <span className="flex items-center">
                    Reacted with&nbsp;
                    {emoji && getReactionImage(emoji)}
                </span>
            }
            placement="bottom"
            arrow
        >
            {children}
        </EcTooltip>
    );
};

export const ReactionList = ({ onClick, data }: ReactionListPropsType) => {
    const processedReactions = useProcessCommentReactions(data || []);
    return (
        <>
            {processedReactions.map(({ emoji, users }, index) => (
                <ReactionTooltip key={uniqueKey(`reaction-${index}`)} emoji={emoji} users={users}>
                    <button
                        type="button"
                        onClick={() => onClick(`:${emoji}:`)}
                        className="m-1 inline-flex min-h-[2.125rem] items-center gap-2 rounded-sm border border-ink/50 px-2.5 text-base leading-none text-ink hover:bg-surface-sunk"
                    >
                        {emoji && getReactionImage(emoji)}
                        {users.length}
                    </button>
                </ReactionTooltip>
            ))}
        </>
    );
};
