import { Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import DataGrid, { Column, FormatterProps, SortColumn } from "react-data-grid";
import styled from "styled-components";

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
import {
    CommentActionType,
    CommentRowType,
    IFileUser,
    IUserFile,
    ReactionActionType,
} from "../../types";
import { getLoadingImage, getLoadingMessage, processCommentsData } from "../../utils";
import { PageNotFound } from "../Common";
import { ActionCell, CommentCell, CreatedByCell, DateCell, StatusCell } from "./Cells";
import { NoCommentsFound } from "./NoCommentsFound";
import ReplyCommentsDrawer from "./ReplyCommentsDrawer";

const GridContainer = styled.div`
    padding: 10px 20px;
    width: 100%;
    .rdg {
        border: 0;
        resize: none !important;
        background-color: #f5f5f5 !important;
        &.grid {
            &.noData {
                height: 60px !important;
            }
        }
    }
    .rdg-header-row {
        .rdg-cell {
            background-color: #fff;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #e0e0e0;
            padding: 0 10px;
            &.orderId {
                white-space: normal;
                line-height: 1.2;
                max-width: 5rem;
            }
            .rdg-sort-arrow {
                margin-left: 8px;
            }
            &:hover {
                &::after {
                    background-color: #e0e0e0;
                    height: 26px;
                    top: 12px;
                    width: 2px;
                }
            }
        }
    }
    .parent {
        background-color: #fff;
        color: #212121;
        border-bottom: 1px solid #e0e0e0;
        &:hover,
        &:active {
            background-color: rgb(206, 221, 247) !important;
        }
    }
    .highlighted-row {
        background-color: rgb(206, 221, 247) !important;
        .highlight-icon {
            display: inline-flex;
        }
    }
    .rdg-cell {
        box-shadow: none !important;
        border-right: 0;
        border-bottom: 0;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }
`;

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
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set());
    const branchKey = selectedBranch?.key || "";

    const { data: projectUsersData, isFetched: isFetchedProjectUsers } =
        useFetchProjectUsers(projectId);

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

    const { isFetching: isFetchingFigmaUser, isError: isFetchFigmaUserError } =
        useFetchFigmaUserData();
    const {
        data: commentsData,
        isLoading: isFetchingComments,
        refetch: refetchComments,
    } = useFetchComments(projectId, branchKey);

    useEffect(() => {
        if (commentsData && commentfilter && !isEmpty(user)) {
            const { sortedResponse, originalResponse, projectCommentInfo, projectCommentCount } =
                processCommentsData(commentfilter, user, commentsData);
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

    const rowKeyGetter = (row: CommentRowType) => row.id;

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
                title={
                    <Typography variant="h6" fontWeight="500" mb={1.5}>
                        All Replies
                    </Typography>
                }
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
            </EcDrawer>
        );
    };

    const handleCommentActions = (
        action: CommentActionType,
        row: CommentRowType,
        callback?: () => void
    ) => {
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

    const handleAddOrRemoveReaction = (
        reaction: string,
        action: ReactionActionType,
        commentId: string
    ) => {
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

    const findRowClass = (row: CommentRowType) => {
        let rowClasses = "parent";
        if (row.unreadComment) {
            rowClasses += " highlighted-row";
        }
        return rowClasses;
    };

    const columns: Column<CommentRowType>[] = [
        {
            key: "orderId",
            name: width > 767 ? "Comment Number" : "#",
            width: width > 767 ? 80 : 50,
            minWidth: width > 767 ? 80 : 50,
            resizable: false,
            headerCellClass: "orderId",
        },
        {
            key: "message",
            name: "Comments",
            minWidth: 400,
            resizable: true,
            formatter({ row, isCellSelected }) {
                return (
                    <CommentCell
                        row={row}
                        isCellSelected={isCellSelected}
                        onReplyClick={() => {
                            handleOpenCommentsReplyDrawer(row);
                        }}
                        onAddOrRemoveReaction={handleAddOrRemoveReaction}
                    />
                );
            },
        },
        {
            key: "userName",
            name: "Created By",
            width: 165,
            resizable: true,
            formatter: (row: React.PropsWithChildren<FormatterProps<CommentRowType, unknown>>) => (
                <CreatedByCell value={row} />
            ),
        },

        {
            key: "createdAt",
            name: "Created at",
            width: 110,
            formatter: (row: React.PropsWithChildren<FormatterProps<CommentRowType, unknown>>) => (
                <DateCell value={row} />
            ),
        },
        {
            key: "status",
            name: "Status",
            width: 110,
            formatter: (row: React.PropsWithChildren<FormatterProps<CommentRowType, unknown>>) => (
                <StatusCell value={row} />
            ),
        },
        {
            key: "resolvedAt",
            name: "Resolved at",
            width: 150,
            formatter: (row: React.PropsWithChildren<FormatterProps<CommentRowType, unknown>>) => (
                <DateCell value={row} />
            ),
        },

        {
            key: "action",
            name: "Actions",
            width: 100,
            resizable: false,
            formatter: ({ row }) => (
                <ActionCell
                    onAction={(type) => {
                        handleCommentActions(type, row);
                    }}
                    data={row}
                />
            ),
        },
    ];

    if (isFetchFigmaUserError) {
        return <PageNotFound />;
    }

    if (isFetchingComments || isFetchingFigmaUser) {
        return (
            <Loader message={getLoadingMessage("comments")} image={getLoadingImage("comments")} />
        );
    }

    return (
        <>
            <GridContainer>
                <DataGrid
                    className={comments.length === 0 ? "grid noData" : "grid"}
                    style={{
                        height: `${height - 210}px`,
                        resize: "both",
                    }}
                    defaultColumnOptions={{
                        sortable: true,
                        resizable: true,
                    }}
                    headerRowHeight={50}
                    rowHeight={82}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    columns={columns}
                    rows={sortedRows}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    rowKeyGetter={rowKeyGetter}
                    rowClass={(row) => findRowClass(row)}
                />
                {comments.length === 0 && <NoCommentsFound />}
            </GridContainer>
            {drawer && drawer}
        </>
    );
};
