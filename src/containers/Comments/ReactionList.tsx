"use client";

import { Box, Button, Typography } from "@mui/material";

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

const ReactionTooltip = (props: ReactionTooltipPropsType) => {
    const { emoji, users, children } = props;
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
                    <Typography variant="subtitle2">
                        {displayString}
                        {plusCount > 0 ? ` +${plusCount}` : ``}
                    </Typography>
                </>
            }
            description={
                <Box display="flex" alignItems="center">
                    Reacted with&nbsp;
                    {emoji && getReactionImage(emoji)}
                </Box>
            }
            placement="bottom"
            arrow
        >
            {children}
        </EcTooltip>
    );
};

export const ReactionList = (props: ReactionListPropsType) => {
    const { onClick, data } = props;
    const processedReactions = useProcessCommentReactions(data || []);
    return (
        <>
            {processedReactions.map(({ emoji, users }, index) => (
                <ReactionTooltip key={uniqueKey(`reaction-${index}`)} emoji={emoji} users={users}>
                    <Button
                        sx={{
                            border: "1px solid #9E9E9E",
                            borderRadius: "5px",
                            minWidth: "auto",
                            minHeight: "2.125rem",
                            padding: "0px 10px",
                            fontSize: "16px",
                            lineHeight: "1",
                            color: "#000",
                            display: "inline-flex",
                            gap: ".5rem",
                            margin: "4px",
                        }}
                        variant="text"
                        onClick={() => onClick(`:${emoji}:`)}
                    >
                        {emoji && getReactionImage(emoji)}
                        {users.length}
                    </Button>
                </ReactionTooltip>
            ))}
        </>
    );
};
