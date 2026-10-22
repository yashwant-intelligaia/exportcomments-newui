"use client";

import { useContext, useEffect, useMemo, useState } from "react";

import { DataColumn, DataTable, SortState } from "@/components/ui/DataTable";

import { ProjectDetailsContext, SizeContext, UserContext } from "../../contexts";
import {
    processfilteredComments,
    useDeleteComment,
    useFetchComments,
    useFetchFigmaUserData,
    useFetchProjectUsers,
    useReactionMutation,
} from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { Loader } from "../../stories/components/Loader/Loader";
import { CommentActionType, CommentRowType, IFileUser, IUserFile, ReactionActionType } from "../../types";
import { getLoadingImage, getLoadingMessage, processCommentsData } from "../../utils";
import { isEmpty } from "../../utils/object";
import { PageNotFound } from "../Common";
import { ActionCell, CommentCell, CreatedByCell, DateCell, StatusCell } from "./Cells";
import { NoCommentsFound } from "./NoCommentsFound";
import ReplyCommentsDrawer from "./ReplyCommentsDrawer";

export const CommentsList = () => {
    const { width, height } = useContext(SizeContext);
    const {
        projectId,
        searchInput,
        commentfilter,
        sortedComments,
        setSortedComments,
        setProjectCommentInfo,
        projectData,
        setProjectData,
        setOriginalComments,
        selectedBranch,
    } = useContext(ProjectDetailsContext);
    const { user } = UserContext();

    const [comments, setComments] = useState<CommentRowType[]>([]);
    const [drawer, setDrawer] = useState<JSX.Element | null>(null);
    const [projectUsers, setProjectUsers] = useState([] as IFileUser[]);
    const [sortColumns, setSortColumns] = useState<readonly SortState[]>([]);
    const branchKey = selectedBranch?.key || "";

    const { data: projectUsersData, isFetched: isFetchedProjectUsers } = useFetchProjectUsers(projectId);

    useEffect(() => {
        if (isFetchedProjectUsers && projectUsersData) {
            const userResponse: IFileUser[] = projectUsersData.map((obj) => ({
                ...obj,
                userId: obj.userId.toString(),
                selected: false,
                editValue: false,
                tempEmail: "",
                validEmail: obj.email ? "valid" : "",
                iseditable: !obj.email,
            }));
            setProjectUsers(userResponse);
        }
    }, [isFetchedProjectUsers]);

    useEffect(() => {
        if (searchInput.trim() === "") {
            setComments(sortedComments);
        } else {
            const filteredComments = processfilteredComments(searchInput, sortedComments);
            setComments(filteredComments);
        }
    }, [searchInput, sortedComments]);

    const { isFetching: isFetchingFigmaUser, isError: isFetchFigmaUserError } = useFetchFigmaUserData();
    const {
        data: commentsData,
        isLoading: isFetchingComments,
        refetch: refetchComments,
    } = useFetchComments(projectId, branchKey);

    useEffect(() => {
        if (commentsData && commentfilter && !isEmpty(user)) {
            const { sortedResponse, originalResponse, projectCommentInfo, projectCommentCount } = processCommentsData(
                commentfilter,
                user,
                commentsData,
            );
            setComments(sortedResponse);
            setSortedComments(sortedResponse);
            setOriginalComments(originalResponse);
            setProjectCommentInfo(projectCommentInfo);
            if (projectData) {
                const updatedProjectData: IUserFile = {
                    ...projectData,
                    allComments: projectCommentCount.allComments,
                    myComments: projectCommentCount.myComments,
                    newComments: projectCommentCount.newComments,
                    resolvedComments: projectCommentCount.resolvedComments,
                    unresolvedComments: projectCommentCount.unresolvedComments,
                };
                setProjectData(updatedProjectData);
            }
        }
    }, [commentsData, commentfilter, user]);

    const {
        mutateAsync: mutateDeleteComment,
        isSuccess: isDeleteCommmentSuccess,
        // reset: resetDelete,
    } = useDeleteComment();

    const { addReaction, deleteReaction } = useReactionMutation();
    const { mutate: addReactionToComment } = addReaction;
    const { mutate: deleteReactionFromComment } = deleteReaction;

    useEffect(() => {
        if (isDeleteCommmentSuccess) {
            refetchComments();
        }
    }, [isDeleteCommmentSuccess]);

    const handleOpenCommentsReplyDrawer = (row: CommentRowType) => {
        setDrawer(
            <EcDrawer
                open
                direction="right"
                closeOnClickOutside={false}
                onClose={() => setDrawer(null)}
                title={<span className="text-xl font-medium">All Replies</span>}
                customeWidth
            >
                <ReplyCommentsDrawer
                    users={projectUsers}
                    onCommentsDrawer={(type, data, callback) => {
                        handleCommentActions(type, data, () => callback && callback());
                    }}
                    onAddOrRemoveReaction={handleAddOrRemoveReaction}
                    data={row}
                    onCancel={() => setDrawer(null)}
                />
            </EcDrawer>,
        );
    };

    const handleCommentActions = (action: CommentActionType, row: CommentRowType, callback?: () => void) => {
        if (action === "delete" && projectId) {
            mutateDeleteComment({
                projectId,
                commentId: row.id,
                branchKey,
            }).then(() => {
                callback && callback();
            });
        }
        if (action === "reply" && projectId) {
            handleOpenCommentsReplyDrawer(row);
        }
    };

    const handleAddOrRemoveReaction = (reaction: string, action: ReactionActionType, commentId: string) => {
        switch (action) {
            case "add":
                if (projectId) {
                    addReactionToComment({
                        projectId,
                        commentId,
                        emoji: reaction,
                        branchKey,
                    });
                }
                break;

            default:
                if (projectId) {
                    deleteReactionFromComment({
                        projectId,
                        commentId,
                        emoji: reaction,
                        branchKey,
                    });
                }
                break;
        }
    };
    const sortedRows = useMemo(() => {
        if (sortColumns.length === 0) return comments;
        const sortedData = [...comments];

        sortColumns.forEach(({ columnKey, direction }) => {
            if (columnKey === "orderId" || columnKey === "action") return;

            sortedData.sort((a, b) => {
                const aVal = a[columnKey as keyof CommentRowType];
                const bVal = b[columnKey as keyof CommentRowType];
                if (
                    aVal === undefined ||
                    aVal === null ||
                    aVal === "" ||
                    bVal === undefined ||
                    bVal === null ||
                    bVal === ""
                ) {
                    if (
                        (aVal === undefined || aVal === null || aVal === "") &&
                        (bVal === undefined || bVal === null || bVal === "")
                    ) {
                        return 0; // both are empty or undefined, keep them in the same order
                    }
                    return aVal === undefined || aVal === null || aVal === "" ? 1 : -1;
                }

                if (aVal > bVal) return direction === "ASC" ? 1 : -1;
                if (aVal < bVal) return direction === "ASC" ? -1 : 1;

                return 0;
            });
        });

        return sortedData;
    }, [comments, sortColumns]);

    const findRowClass = (row: CommentRowType) => (row.unreadComment ? "!bg-blue-soft" : "");

    const cell = (row: CommentRowType, key: string) => ({ row, column: { key } });

    const columns: DataColumn<CommentRowType>[] = [
        {
            key: "orderId",
            name: width > 767 ? "Comment Number" : "#",
            width: width > 767 ? 80 : 50,
            sortable: false,
            headerClassName: "max-w-20 leading-tight whitespace-normal",
        },
        {
            key: "message",
            name: "Comments",
            minWidth: 400,
            render: (row) => (
                <CommentCell
                    row={row}
                    onReplyClick={() => handleOpenCommentsReplyDrawer(row)}
                    onAddOrRemoveReaction={handleAddOrRemoveReaction}
                />
            ),
        },
        {
            key: "userName",
            name: "Created By",
            width: 165,
            render: (row) => <CreatedByCell value={cell(row, "userName")} />,
        },
        {
            key: "createdAt",
            name: "Created at",
            width: 110,
            render: (row) => <DateCell value={cell(row, "createdAt")} />,
        },
        { key: "status", name: "Status", width: 110, render: (row) => <StatusCell value={cell(row, "status")} /> },
        {
            key: "resolvedAt",
            name: "Resolved at",
            width: 150,
            render: (row) => <DateCell value={cell(row, "resolvedAt")} />,
        },
        {
            key: "action",
            name: "Actions",
            width: 100,
            sortable: false,
            render: (row) => <ActionCell onAction={(type) => handleCommentActions(type, row)} data={row} />,
        },
    ];

    if (isFetchFigmaUserError) {
        return <PageNotFound />;
    }

    if (isFetchingComments || isFetchingFigmaUser) {
        return <Loader message={getLoadingMessage("comments")} image={getLoadingImage("comments")} />;
    }

    return (
        <>
            <div className="w-full px-5 py-2.5">
                <DataTable
                    ariaLabel="Comments"
                    className={comments.length === 0 ? "!h-[60px]" : ""}
                    height={Math.max(height - 210, 200)}
                    headerHeight={50}
                    rowHeight={82}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    columns={columns}
                    rows={sortedRows}
                    rowKey={(row) => row.id}
                    rowClassName={findRowClass}
                />
                {comments.length === 0 && <NoCommentsFound />}
            </div>
            {drawer}
        </>
    );
};
