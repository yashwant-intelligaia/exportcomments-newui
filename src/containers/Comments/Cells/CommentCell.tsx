"use client";

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Figma from "../../../assets/figma.svg";
import { UserContext } from "../../../contexts";
import { useFocusRef } from "../../../hooks/useFocusRef";
import { EcTooltip } from "../../../stories/components";
import { CommentRowType, ReactionActionType } from "../../../types";
import { getMessagesWithEmojis, getReactionAction } from "../../../utils";
import { ReactionList } from "../ReactionList";
import { ReactionPopover } from "../ReactionPopover";

const Cell = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    .action-location {
        strong {
            color: #2979ff;
            width: 5rem;
            margin-right: 1.5rem;
            font-weight: 700;
            font-size: 0.875rem;
            cursor: pointer;
            align-items: center;
            & > span {
                white-space: nowrap;
            }
            .down-icon {
                margin-left: 2px;
                display: inline-flex;
                line-height: 1;
            }
        }
        a {
            cursor: pointer;
        }
        img {
            height: 18px;
            width: 18px;
            cursor: pointer;
            display: flex;
        }
    }
`;

const HighlightStatusIcon = styled.div`
    &.highlight-icon {
        background-color: #2979ff;
        height: 11px;
        width: 11px;
        display: none;
        border-radius: 50%;
        position: absolute;
        right: 0;
    }
`;

interface CommentCellPropsType {
    isCellSelected: boolean;
    row: CommentRowType;
    onReplyClick: () => void;
    onAddOrRemoveReaction: (
        reaction: string,
        action: ReactionActionType,
        commentId: string
    ) => void;
}

export const CommentCell = (props: CommentCellPropsType) => {
    const { figmaUser } = UserContext();
    const { isCellSelected, row, onReplyClick, onAddOrRemoveReaction } = props;
    const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);
    const commentsDomElement = useRef<any>(null);
    const [getEllips, hideEllips] = useState(false);
    useEffect(() => {
        if (commentsDomElement.current) {
            hideEllips(
                commentsDomElement.current.offsetWidth < commentsDomElement.current.scrollWidth
            );
        }
    }, []);

    return (
        <Cell>
            <Box display="flex" flexDirection="column" minWidth="32rem">
                <Box display="flex" alignItems="center" height="30px">
                    {getEllips ? (
                        <EcTooltip
                            className="comment-cell-tooltip"
                            title={row.message}
                            placement="top-start"
                            arrow
                        >
                            <span
                                className="cell"
                                ref={commentsDomElement}
                                style={{
                                    width: "70%",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    lineHeight: "1rem",
                                }}
                            >
                                {getMessagesWithEmojis(row.message)}
                            </span>
                        </EcTooltip>
                    ) : (
                        <span
                            className="cell"
                            ref={commentsDomElement}
                            style={{
                                width: "70%",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                lineHeight: "1rem",
                            }}
                        >
                            {getMessagesWithEmojis(row.message)}
                        </span>
                    )}
                </Box>
                <Box display="flex" alignItems="center" height="44px">
                    <ReactionPopover
                        onClickReaction={(reaction) => {
                            onAddOrRemoveReaction(
                                reaction,
                                getReactionAction(row.reactions || [], reaction, figmaUser),
                                row.id
                            );
                        }}
                    />
                    <ReactionList
                        data={row.reactions}
                        onClick={(reaction) => {
                            onAddOrRemoveReaction(
                                reaction,
                                getReactionAction(row.reactions || [], reaction, figmaUser),
                                row.id
                            );
                        }}
                    />
                </Box>
            </Box>
            <Box position="absolute" right="0" top="0" width="11rem" height="100%">
                <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    alignContent="center"
                    justifyContent="flex-end"
                    paddingLeft="1rem"
                    paddingRight="1rem"
                    position="relative"
                    className="action-location"
                    width="10rem"
                    height="100%"
                >
                    <strong
                        style={{
                            display: row.children && row.children.length ? "flex" : "none",
                        }}
                        role="presentation"
                        onClick={onReplyClick}
                    >
                        <span ref={ref} tabIndex={tabIndex}>
                            {row?.children?.length === 1
                                ? `${row?.children?.length} Reply`
                                : `${row?.children?.length} Replies`}
                        </span>
                    </strong>

                    <EcTooltip title="Figma Location" placement="top" arrow>
                        <a target="_blank" rel="noreferrer" href={row.commentLocation}>
                            <img alt="notification" src={Figma} />
                        </a>
                    </EcTooltip>

                    <HighlightStatusIcon className="highlight-icon" />
                </Box>
            </Box>
        </Cell>
    );
};
