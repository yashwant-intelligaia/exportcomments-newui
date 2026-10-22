"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

import { ProjectDetailsContext, UserContext } from "../../contexts";
import { useCommentMutation } from "../../hooks";
import { SbAvatar } from "../../stories/components/avatar/Avatar";
import { CommentActionType, CommentReactionType, CommentRowType, IFileUser, ReactionActionType } from "../../types";
import { getMessagesWithEmojis, getReactionAction } from "../../utils";
import { CreatedByCell, DateCell } from "./Cells";
import { ReactionList } from "./ReactionList";
import { ReactionPopover } from "./ReactionPopover";
import { ReplyCommentActions } from "./ReplyCommentActions";

interface ReplyCommentsDrawerPropsType {
    users: IFileUser[];
    onCommentsDrawer: (type: CommentActionType, data: CommentRowType, callback?: () => void) => void;
    data: CommentRowType;
    onAddOrRemoveReaction: (reaction: string, action: ReactionActionType, commentId: string) => void;
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
        replyComment: { mutateAsync: mutateReplyComment, isPending: isLoadingReplyComment },
    } = useCommentMutation();

    useEffect(() => {
        if (commentData.children) {
            setChildrenComment(commentData.children);
        }
    }, [commentData]);

    useEffect(() => {
        if (originalComments && commentData.id) {
            const updatedChildren = originalComments.filter((comment) => comment.parentId === commentData.id).reverse();
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
                        option.name.toString().toLowerCase().startsWith(slicedReply.toString().toLowerCase()) ||
                        option.selected,
                ),
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
        const replyComment3 = replyComment.substring(lastIndex + typedName.length, replyComment.length);
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
    const reactTo = (reaction: string, index: number) => {
        if (commentData.children) {
            const target = commentData.children[index];
            onAddOrRemoveReaction(
                reaction,
                getReactionAction((target.reactions as CommentReactionType[]) || [], reaction, figmaUser),
                target.id,
            );
        }
    };

    return (
        <div className="drawer-body">
            <div ref={dropdownRef} className="border-line rounded-md border p-4">
                <textarea
                    name="comment"
                    id="fullwidth"
                    rows={3}
                    placeholder="Add a Reply..."
                    aria-invalid={error}
                    value={replyComment}
                    onChange={handleChangeComment}
                    className={cn(
                        "text-ink placeholder:text-muted w-full resize-y border-b bg-transparent py-1 text-sm focus:outline-none",
                        error ? "border-danger" : "border-ink/60 focus:border-ink",
                    )}
                />
                {error && <p className="text-danger mt-1 text-xs">Comment cannot be empty</p>}
                <div className="flex w-full items-center justify-between pt-2.5">
                    <button
                        type="button"
                        aria-label="Mention a user"
                        onClick={handleClick}
                        className="hover:bg-surface-sunk size-10 rounded-full text-xl"
                    >
                        @
                    </button>
                    <Button disabled={isLoadingReplyComment} onClick={handleSubmitReply}>
                        Reply
                    </Button>
                </div>
            </div>
            {filteredOption && filteredOption.length > 0 && showSearch && (
                <div className="bg-surface shadow-card absolute top-[60px] z-[9] h-[180px] w-full overflow-y-auto rounded-b-sm">
                    {filteredOption.map((option) => (
                        <button
                            type="button"
                            key={option.userId}
                            onClick={() => handleOptionSelect(option)}
                            className="group hover:bg-ink flex w-full items-center px-5 py-2.5 text-left transition-colors hover:text-white"
                        >
                            <SbAvatar imageAlt="profile" size="medium" imageSrc={option.avatar} />
                            <span className="ml-2 flex flex-wrap">
                                <span className="w-full text-sm font-medium">{option.name}</span>
                                <span className="text-muted w-full text-xs group-hover:text-white">{option.email}</span>
                            </span>
                        </button>
                    ))}
                </div>
            )}
            <div className="h-[calc(100vh-250px)] w-full overflow-y-auto">
                {childrenComment.map((comment, commentIndex) => (
                    <div
                        key={comment.id}
                        className="border-line flex w-full flex-wrap items-center justify-between border-b py-5"
                    >
                        <div className="mb-1 flex w-full items-center justify-between">
                            <div>
                                <CreatedByCell value={comment} />
                            </div>
                            <div className="flex items-center text-xs">
                                <span>
                                    <DateCell value={comment} />
                                </span>
                                <ReplyCommentActions
                                    data={comment}
                                    onAction={(value: CommentActionType) => {
                                        onCommentsDrawer(value, comment, () => handleRefreshRepliesData(comment));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <p className="text-sm break-all">{getMessagesWithEmojis(comment.message)}</p>
                        </div>
                        <div className="flex w-full flex-wrap items-center justify-start">
                            <ReactionPopover onClickReaction={(reaction) => reactTo(reaction, commentIndex)} />
                            <ReactionList
                                data={comment?.reactions || []}
                                onClick={(reaction: string) => reactTo(reaction, commentIndex)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReplyCommentsDrawer;
