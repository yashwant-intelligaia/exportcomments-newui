"use client";

import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ProjectDetailsContext, UserContext } from "../../contexts";
import { useCommentMutation } from "../../hooks";
import { SbAvatar } from "../../stories/components/avatar/Avatar";
import {
    CommentActionType,
    CommentReactionType,
    CommentRowType,
    IFileUser,
    ReactionActionType,
} from "../../types";
import { getMessagesWithEmojis, getReactionAction } from "../../utils";
import { CreatedByCell, DateCell } from "./Cells";
import { ReactionList } from "./ReactionList";
import { ReactionPopover } from "./ReactionPopover";
import { ReplyCommentActions } from "./ReplyCommentActions";

const TextAreaOuter = styled.div`
    border-radius: 8px;
    border: 1px solid #e1e1e3;
    padding: 15px;
`;
const TextareaFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 0 0;

    .icon-btn {
        height: 40px;
        width: 40px;
        font-size: 1.25rem;
    }

    button {
        text-transform: capitalize;
    }

    .mr-2 {
        margin-right: 10px;
    }
`;
const Customdropdown = styled.div`
    position: absolute;
    width: 100%;
    top: 60px;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    height: 180px;
    overflow-y: auto;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    z-index: 9;
`;
const SearchReplyUser = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transition: all 0.5s ease 0s;
    cursor: pointer;

    &:hover,
    &:active,
    &.active {
        background-color: rgba(13, 153, 255, 1);
        color: #fff;
        p {
            color: #fff;
        }
    }
    p {
        transition: all 0.5s ease 0s;
    }
`;
const UserInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 8px;
`;
const Scroll = styled.div`
    width: 100%;
    height: calc(100vh - 250px);
    overflow-y: auto;
`;
const CommentItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 0;
    border-bottom: 1px solid #f3f3f3;

    .comment-head {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;

        .action-wrap {
            display: flex;
            align-items: center;
            font-size: 12px;
        }
    }

    .comment-desc {
        display: flex;
        width: 100%;

        a {
            text-decoration: none;
        }
    }
`;

interface ReplyCommentsDrawerPropsType {
    users: IFileUser[];
    onCommentsDrawer: (
        type: CommentActionType,
        data: CommentRowType,
        callback?: () => void
    ) => void;
    data: CommentRowType;
    onAddOrRemoveReaction: (
        reaction: string,
        action: ReactionActionType,
        commentId: string
    ) => void;
    onCancel: () => void;
}

const ReplyCommentsDrawer = (props: ReplyCommentsDrawerPropsType) => {
    const { users, onCommentsDrawer, data: commentData, onAddOrRemoveReaction } = props;
    const { figmaUser, user } = UserContext();
    const { projectId, selectedBranch, originalComments } = useContext(ProjectDetailsContext);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [buttonClick, setButtonClick] = useState(false);
    const [typedName, setTypedName] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [filteredOption, setFilterOption] = useState(null as unknown as IFileUser[]);
    const [childrenComment, setChildrenComment] = useState<CommentRowType[]>([]);
    const [replyComment, setReplycomment] = useState("");
    const [error, setError] = useState(false);

    const {
        replyComment: { mutateAsync: mutateReplyComment, isLoading: isLoadingReplyComment },
    } = useCommentMutation();

    useEffect(() => {
        if (commentData.children) {
            setChildrenComment(commentData.children);
        }
    }, [commentData]);

    useEffect(() => {
        if (originalComments && commentData.id) {
            const updatedChildren = originalComments
                .filter((comment) => comment.parentId === commentData.id)
                .reverse();
            setChildrenComment(updatedChildren);
        }
    }, [originalComments, commentData.id]);

    const handleSubmitReply = () => {
        // refresh comments data in responsive drawer
        mutateReplyComment({
            message: replyComment,
            userId: user.id,
            projectId,
            branchKey: selectedBranch?.key || "",
            parentId: commentData.id,
        }).then(() => {
            setReplycomment("");
        });
    };

    const handleChangeComment = (e: any) => {
        setError(false);
        setButtonClick(false);
        const splittedArray = e.target.value.split("@");
        const slicedReply = splittedArray[splittedArray.length - 1];
        setTypedName(`@${slicedReply}`);
        if (e.target.value === "") {
            setShowSearch(false);
        } else if (slicedReply === "") {
            setFilterOption(users);
            setShowSearch(true);
        } else if (slicedReply && splittedArray.length > 1) {
            setFilterOption(
                users.filter(
                    (option: IFileUser) =>
                        option.name
                            .toString()
                            .toLowerCase()
                            .startsWith(slicedReply.toString().toLowerCase()) || option.selected
                )
            );
            setShowSearch(true);
        } else {
            setFilterOption(null as unknown as IFileUser[]);
        }
        setReplycomment(e.target.value);
    };

    const handleClick = () => {
        setShowSearch(true);
        setButtonClick(true);
        setFilterOption(users);
    };

    const handleOptionSelect = (option: any) => {
        setError(false);
        setShowSearch(false);
        const lastIndex = replyComment.lastIndexOf(typedName);
        const replyComment2 = replyComment.substring(0, lastIndex);
        const replyComment3 = replyComment.substring(
            lastIndex + typedName.length,
            replyComment.length
        );
        if (buttonClick) {
            setReplycomment(`${replyComment} @${option.name}`);
        } else {
            setReplycomment(`${replyComment2}@${option.name}${replyComment3}`);
        }

        setTypedName("");
    };

    const handleRefreshRepliesData = (prop: CommentRowType) => {
        const updatedChildrenComments = Array.from(childrenComment);
        setChildrenComment(updatedChildrenComments.filter(({ id }) => id !== prop.id));
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowSearch(false);
        }
    };
    return (
        <Box className="drawer-body">
            <TextAreaOuter ref={dropdownRef}>
                <TextField
                    name="comment"
                    error={error}
                    helperText={error ? "Comment cannot be empty" : ""}
                    fullWidth
                    hiddenLabel
                    id="fullwidth"
                    multiline
                    rows={3}
                    placeholder="Add a Reply..."
                    variant="standard"
                    value={replyComment}
                    onChange={handleChangeComment}
                />
                <TextareaFooter>
                    <IconButton className="icon-btn" aria-label="" onClick={handleClick}>
                        @
                    </IconButton>
                    <Box>
                        {/* <Button
                            className="mr-2"
                            variant="outlined"
                            disabled={isLoadingReplyComment}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button> */}
                        <Button
                            variant="contained"
                            disabled={isLoadingReplyComment}
                            onClick={handleSubmitReply}
                        >
                            Reply
                        </Button>
                    </Box>
                </TextareaFooter>
            </TextAreaOuter>
            {filteredOption && filteredOption.length > 0 && showSearch && (
                <Customdropdown>
                    {filteredOption.map((option) => (
                        <SearchReplyUser
                            onClick={() => {
                                handleOptionSelect(option);
                            }}
                        >
                            <SbAvatar imageAlt="profile" size="medium" imageSrc={option.avatar} />
                            <UserInfo>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        width: "100%",
                                        fontWeight: "500",
                                    }}
                                >
                                    {option.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        width: "100%",
                                        fontSize: "12px",
                                        color: "rgba(97, 97, 97, 1)",
                                    }}
                                >
                                    {option.email}
                                </Typography>
                            </UserInfo>
                        </SearchReplyUser>
                    ))}
                </Customdropdown>
            )}
            <Scroll>
                {childrenComment.map((comment, commentIndex) => (
                    <CommentItem>
                        <Box className="comment-head">
                            <Box>
                                <CreatedByCell value={comment} />
                            </Box>
                            <Box className="action-wrap">
                                <span>
                                    <DateCell value={comment} />
                                </span>
                                <ReplyCommentActions
                                    data={comment}
                                    onAction={(value: CommentActionType) => {
                                        onCommentsDrawer(value, comment, () => {
                                            handleRefreshRepliesData(comment);
                                        });
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className="comment-desc">
                            <Typography
                                variant="body2"
                                style={{
                                    wordBreak: "break-all",
                                    wordWrap: "break-word",
                                }}
                            >
                                {getMessagesWithEmojis(comment.message)}
                            </Typography>
                        </Box>
                        <Box
                            className="comment-desc"
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <ReactionPopover
                                onClickReaction={(reaction) => {
                                    if (commentData.children) {
                                        onAddOrRemoveReaction(
                                            reaction,
                                            getReactionAction(
                                                (commentData.children[commentIndex]
                                                    .reactions as CommentReactionType[]) || [],
                                                reaction,
                                                figmaUser
                                            ),
                                            commentData.children[commentIndex].id
                                        );
                                    }
                                }}
                            />
                            <ReactionList
                                data={comment?.reactions || []}
                                onClick={(reaction: string) => {
                                    if (commentData.children) {
                                        onAddOrRemoveReaction(
                                            reaction,
                                            getReactionAction(
                                                commentData.children[commentIndex].reactions || [],
                                                reaction,
                                                figmaUser
                                            ),
                                            commentData.children[commentIndex].id
                                        );
                                    }
                                }}
                            />
                        </Box>
                    </CommentItem>
                ))}
                {/* {!commentData.children &&
                    childrenComment.map((comment: any, commentIndex: number) => (
                        <CommentItem>
                            <div className="comment-head">
                                <div>
                                    <CreatedByCell value={comment} />
                                </div>
                                <div className="action-wrap">
                                    <span>
                                        <DateCell value={comment} />
                                    </span>
                                    <CommonActionsCell
                                        from="drawer"
                                        defaultLabel="Reply"
                                        defaultActions="reply"
                                        onAction={(value: string, prop: any) => {
                                            handle(value, prop);
                                        }}
                                        value={comment}
                                    />
                                </div>
                            </div>
                            <div className="comment-desc">
                                <Typography
                                    variant="body2"
                                    style={{
                                        wordBreak: "break-all",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {getMessagesWithEmojis(comment.message)}
                                </Typography>
                            </div>
                            <Box
                                className="comment-desc"
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <ReactionPopover
                                    onClickReaction={(reaction) => {
                                        if (commentData.children) {
                                            onAddOrRemoveReaction(
                                                reaction,
                                                getReactionAction(
                                                    commentData.children[commentIndex].reactions ||
                                                        [],
                                                    reaction,
                                                    figmaUser
                                                ),
                                                commentData.children[commentIndex].id
                                            );
                                        }
                                    }}
                                />
                                <ReactionList
                                    data={comment?.reactions || []}
                                    onClick={(reaction: ReactionType) => {
                                        if (commentData.children) {
                                            onAddOrRemoveReaction(
                                                reaction,
                                                getReactionAction(
                                                    commentData.children[commentIndex].reactions ||
                                                        [],
                                                    reaction,
                                                    figmaUser
                                                ),
                                                commentData.children[commentIndex].id
                                            );
                                        }
                                    }}
                                />
                            </Box>
                        </CommentItem>
                    ))} */}
            </Scroll>
        </Box>
    );
};

export default ReplyCommentsDrawer;
