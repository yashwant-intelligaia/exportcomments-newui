"use client";

import ExcelJS from "exceljs";
import saveAs from "file-saver";
import { cloneDeep, sortBy as sort } from "lodash";
import moment from "moment";
import { SortColumn } from "react-data-grid";

import { APP_CONSTANT } from "../constants/AppConstant";
import {
    CommentDataType,
    CommentFilterType,
    CommentResponseDataType,
    CommentResponseFileInfoType,
    CommentRowType,
    ExportCommentRowType,
    FigmaUserType,
    ITreeRowType,
    IUserToken,
    ReactionActionType,
} from "../types";
import { EMOJIS_MAP } from "./emojis";

const exportCommentsToExcel = (
    originalComments: ExportCommentRowType[],
    filterType: CommentFilterType,
    user: IUserToken,
    commentsFileInfo: CommentResponseFileInfoType
) => {
    const fileInfoData = { ...commentsFileInfo };
    const exportComments = [...originalComments];
    let isNewComment = true;

    exportComments.forEach((comment) => {
        if (new Date(comment.createdAt) > new Date(fileInfoData.lastViewedAt)) {
            isNewComment = true;
        } else {
            isNewComment = false;
        }
        comment.isNew = !!isNewComment;
    });

    /* sorting comments */
    exportComments.sort((x, y) => {
        const firstDate = new Date(x.createdAt);
        const secondDate = new Date(y.createdAt);
        return firstDate.getTime() - secondDate.getTime();
    });

    const parentComments: CommentRowType[] = [];
    const childComments: ExportCommentRowType[] = [];
    const childCommentIds: string[] = [];
    const parentCommentIds: string[] = [];
    const parentOrderIds: string[] = [];

    exportComments.forEach((value) => {
        value.group = 0;
        if (value.parentId !== "") {
            childComments.push(value);
            childCommentIds.push(value.id);
        } else {
            parentComments.push(value);
            parentCommentIds.push(value.id);
            parentOrderIds.push(value.orderId);
        }
    });

    const allComments: CommentRowType[] = [];
    parentComments.forEach((value) => {
        allComments.push(value);
    });

    childComments.sort((x, y) => {
        const firstDate = new Date(x.createdAt);
        const secondDate = new Date(y.createdAt);
        return secondDate.getTime() - firstDate.getTime();
    });

    const parentGroupArray: string[] = [];
    let groupLevel = 0;
    childComments.forEach((value, index) => {
        const parentIndex = parentCommentIds.indexOf(value.parentId);
        const groupIndex = parentGroupArray.indexOf(value.parentId);
        if (index === 0) {
            groupLevel = 1; // if first comment
        }

        if (groupIndex === -1) {
            groupLevel = parentGroupArray.length + 1;
            parentGroupArray.push(value.parentId);
        } else {
            groupLevel = groupIndex + 1;
        }
        value.group = groupLevel;
        allComments.splice(parentIndex + 1, 0, value);
        parentCommentIds.splice(parentIndex + 1, 0, value.id);
        parentOrderIds.splice(parentIndex + 1, 0, value.orderId);
    });

    let filteredComments: ExportCommentRowType[] = [];
    const commentList = [...originalComments];

    switch (filterType) {
        case "all":
            filteredComments = allComments;
            break;
        case "resolved": {
            const resolvedParentCommentIds: string[] = [];
            allComments.forEach((value) => {
                if (value.parentId === "" && value.resolvedAt != null) {
                    resolvedParentCommentIds.push(value.id);
                    filteredComments.push(value);
                } else if (resolvedParentCommentIds.indexOf(value.parentId) !== -1) {
                    filteredComments.push(value);
                }
            });
            break;
        }
        case "unresolved": {
            const unresolvedParentCommentIds: string[] = [];
            allComments.forEach((value) => {
                if (value.parentId === "" && value.resolvedAt == null) {
                    unresolvedParentCommentIds.push(value.id);
                    filteredComments.push(value);
                } else if (unresolvedParentCommentIds.indexOf(value.parentId) !== -1) {
                    filteredComments.push(value);
                }
            });
            break;
        }
        case "unread-replies":
            filteredComments = getUnreadReplies(allComments, fileInfoData).filteredRows;
            break;
        case "unread":
            filteredComments = getUnreadComments(allComments, fileInfoData).filteredRows;
            break;
        case "my": {
            const myCommentIdList: string[] = [];
            if (user != null) {
                commentList.forEach((value) => {
                    if (user.userId === parseInt(value.user.id, 10)) {
                        myCommentIdList.push(value.id);
                        if (
                            value.parentId !== "" &&
                            myCommentIdList.indexOf(value.parentId) === -1
                        ) {
                            myCommentIdList.push(value.parentId);
                        }
                    }
                });

                allComments.forEach((value) => {
                    if (myCommentIdList.indexOf(value.id) !== -1) {
                        filteredComments.push(value);
                    }
                });
            }
            break;
        }
        default:
            filteredComments = allComments;
            break;
    }

    // Export to xlsx using exceljs
    const ExcelJSWorkbook = new ExcelJS.Workbook();
    const filename =
        fileInfoData.createdAt === undefined || fileInfoData.createdAt === null
            ? fileInfoData.fileName
            : fileInfoData.fileName;
    const worksheet: any = ExcelJSWorkbook.addWorksheet(filename);
    worksheet.headerFooter.differentFirst = true;
    worksheet.properties.outlineProperties = {
        summaryBelow: false,
    };
    worksheet.columns = [
        { header: "", key: "comment_number", width: 20 },
        { header: "", key: "created_by", width: 20 },
        { header: filename, key: "comment", width: 50 },
        { header: "", key: "comment_location", width: 20 },
        { header: "", key: "status", width: 20 },
        { header: "", key: "resolved_at", width: 20 },
        { header: "", key: "created_at", width: 20 },
        { header: "", key: "new", width: 20 },
        { header: "", key: "my", width: 20 },
    ];
    worksheet.mergeCells("A1:I1");
    worksheet.getCell("I1").value = `(${filename})`;
    worksheet.getCell("I1").fill = {
        type: "pattern",
        pattern: "darkVertical",
        fgColor: { argb: "FFC9DAF8" },
    };

    worksheet.addRow([
        "Comment Number",
        "Created By",
        "Comment",
        "Comment Location",
        "Resolved At",
        "Created At",
        "Unread Comment",
        "Unread Reply",
        "My Comment",
    ]);
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };

    worksheet.columns.forEach((col: any) => {
        worksheet.getCell(col.letter + 2).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FFC9DAF8" },
        };
    });
    const keys = [
        "orderId",
        "user_name",
        "message",
        "comment_location",
        "resolvedAt",
        "createdAt",
        "unreadComment",
        "unreadReply",
        "my",
    ];

    worksheet.getColumn("C").alignment = { wrapText: true };
    worksheet.getColumn("D").alignment = {
        wrapText: true,
        horizontal: "center",
    };
    worksheet.getColumn("H").alignment = { horizontal: "center" };
    worksheet.getColumn("I").alignment = { horizontal: "center" };
    worksheet.getRow(1).alignment = { horizontal: "center" };
    worksheet.getRow(2).alignment = { horizontal: "center" };

    const resolvedArray: string[] = [];
    const myCommentArray: string[] = [];
    const unreadCommentArray: string[] = [];
    const unreadReplyCommentArray: string[] = [];
    const groupColorArray: { group: number; cells: string[] }[] = [];
    const linksArray: { index: number; link: string }[] = [];
    const groupColorIndexArray: number[] = [];
    let lastGroup: number | undefined = 0;
    filteredComments.forEach((object, index: number) => {
        const valueArray: string[] = [];
        let isMyComment = false;
        let isUnreadComment = false;
        let isUnreadReplyComment = false;
        const is_resolved = false;
        keys.forEach((key) => {
            if (key === "user_name") {
                const user_name = object.user.handle;
                valueArray.push(user_name);
            } else if (key === "comment_location") {
                if (object.parentId === "") {
                    valueArray.push("");
                    linksArray.push({
                        index: index + 3, // index as number
                        link: `https://www.figma.com/design/${object.fileKey}?node-id=${object.clientMeta?.nodeId}#${object.id}`,
                    });
                } else {
                    valueArray.push("");
                }
            } else if (key === "resolvedAt") {
                if (!object[key]) valueArray.push("");
                else valueArray.push(moment(object[key]).format("MM/D/YYYY"));
            } else if (key === "createdAt") {
                if (!object[key]) valueArray.push("");
                else valueArray.push(moment(object[key]).format("MM/D/YYYY"));
            } else if (key === "unreadComment") {
                isUnreadComment = !!object[key];
                valueArray.push(isUnreadComment ? "Y" : "");
            } else if (key === "unreadReply") {
                isUnreadReplyComment = !!object[key];
                valueArray.push(isUnreadReplyComment ? "Y" : "");
            } else if (key === "my") {
                isMyComment = user?.figmaUserId === object.user.id;
                valueArray.push(isMyComment ? "Y" : "");
            } else if (key === "message" || key === "orderId") {
                const value = object[key] !== null && object[key] !== "" ? object[key] : "";
                valueArray.push(value);
            }
        });

        worksheet.addRow(valueArray);
        if (is_resolved) {
            resolvedArray.push(`E${index + 3}`);
        }

        if (isUnreadComment) {
            unreadCommentArray.push(`G${index + 3}`);
        }

        if (isUnreadReplyComment) {
            unreadReplyCommentArray.push(`H${index + 3}`);
        }

        if (isMyComment) {
            myCommentArray.push(`I${index + 3}`);
        }

        if (object.group && object.group > 0) {
            const groupColorIndex = groupColorIndexArray.indexOf(object.group);
            let cellArray: string[] = [];
            const cellPreviousArray: string[] = [];
            const avoidCellArray = ["E", "H", "I"];
            worksheet.columns.forEach((col: any) => {
                if (avoidCellArray.indexOf(col.letter) === -1) {
                    if (lastGroup === 0 && lastGroup !== object.group) {
                        cellPreviousArray.push(col.letter + (3 + index - 1));
                    }
                    cellArray.push(col.letter + (3 + index));
                    cellArray = cellPreviousArray.concat(cellArray);
                }
            });
            if (groupColorIndex === -1) {
                groupColorIndexArray.push(object.group);
                groupColorArray.push({
                    group: object.group,
                    cells: cellArray,
                });
            } else {
                groupColorArray[groupColorIndex].cells =
                    groupColorArray[groupColorIndex].cells.concat(cellArray);
            }
        }
        lastGroup = object.group;

        worksheet.getRow(index + 1 + 2).outlineLevel = object.group !== 0 ? 1 : 0;
    });

    groupColorArray.forEach((dataCell, index) => {
        const groupColor = (index + 1) % 2 === 0 ? "FFF2DCBB" : "FFF9F7CF";
        dataCell.cells.forEach((cell) => {
            worksheet.getCell(cell).fill = {
                type: "pattern",
                pattern: "darkVertical",
                fgColor: { argb: groupColor },
            };
        });
    });
    resolvedArray.forEach((value) => {
        worksheet.getCell(value).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FF00CA5F" },
        };
    });
    myCommentArray.forEach((value) => {
        worksheet.getCell(value).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FF18B7FB" },
        };
    });
    unreadCommentArray.forEach((value) => {
        worksheet.getCell(value).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FF70D8E7" },
        };
    });
    unreadReplyCommentArray.forEach((value) => {
        worksheet.getCell(value).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FF00FFBF" },
        };
    });

    linksArray.forEach((value) => {
        worksheet.getCell(`D${value.index}`).value = {
            text: "View In Figma",
            hyperlink: value.link,
            //  tooltip: "View In Figma",
        };
        worksheet.getCell(`D${value.index}`).font = {
            color: { argb: "FF0802FF" },
        };
    });

    worksheet.views = [{ state: "frozen", ySplit: 2, activeCell: "A3" }];
    ExcelJSWorkbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), `${filename}.xlsx`);
    });
};

const processTreeData = (newData: ITreeRowType[], expandId: any[]): ITreeRowType[] => {
    if (!newData.length) {
        return [] as ITreeRowType[];
    }
    if (expandId.length) {
        expandId.forEach((comment: ITreeRowType) => {
            const rowIndex = newData.findIndex(
                (expandedComment: ITreeRowType) =>
                    comment.id === expandedComment.id && !comment.parentId
            );
            if (rowIndex > -1) {
                const { children } = newData[rowIndex];
                newData[rowIndex].isExpanded = true;
                newData.splice(rowIndex + 1, 0, ...children);
            }
        });
        return newData;
    }
    return newData;
};

function toggleSubRow(rows: ITreeRowType[], id: string): ITreeRowType[] {
    if (!id) {
        return rows;
    }
    const rowIndex = rows.findIndex((r) => r.id === id);
    const row = rows[rowIndex];
    const { children } = row;
    if (!children) return rows;

    const newRows = [...rows];
    newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
    if (!row.isExpanded) {
        newRows.splice(rowIndex + 1, 0, ...children);
    } else {
        newRows.splice(rowIndex + 1, children.length);
    }

    return newRows;
}

const sortingTreeData = (
    rows: ITreeRowType[],
    sortColumn: readonly SortColumn[],
    expandId: any[],
    filterText: string
) => {
    const v = sortColumn[0].direction === "ASC" ? 1 : -1;
    const key = sortColumn[0].columnKey;
    let sortedRows = rows.sort((a: any, b: any) => (a[key] > b[key] ? v : -v));
    sortedRows = processTreeData(cloneDeep(sortedRows), expandId);
    sortedRows = sortedRows.filter((comment: ITreeRowType) => rowMatched(comment, filterText));
    return sortedRows;
};
const rowMatched = (row: any, searchText: string): boolean => {
    let assumeNotMatch = false;
    Object.keys(row).forEach((key: string) => {
        if (key !== "children") {
            if (row[key] && row[key].toString().toLowerCase().includes(searchText.toLowerCase())) {
                assumeNotMatch = true;
            }
        }
    });
    return assumeNotMatch;
};

const getResolvedFilteredComments = (comments: CommentRowType[]) => {
    const filteredComments: CommentRowType[] = [];
    const resolvedParent: string[] = comments
        .filter((comment: CommentRowType) => comment.resolvedAt)
        .map((comment) => comment.id);

    comments.forEach((comment: CommentRowType) => {
        if (resolvedParent.indexOf(comment.id) !== -1) {
            filteredComments.push(comment);
        } else if (resolvedParent.indexOf(comment.parentId) !== -1) {
            filteredComments.push(comment);
        }
    });

    return filteredComments;
};

const getUnResolvedFilteredComments = (comments: CommentRowType[]) => {
    const resolvedParent: string[] = comments
        .filter((comment: CommentRowType) => comment.resolvedAt)
        .map((comment) => comment.id);

    const filteredComments: CommentRowType[] = comments.filter(
        (comment: CommentRowType) =>
            (!comment.parentId && resolvedParent.indexOf(comment.id) === -1) ||
            (comment.parentId && resolvedParent.indexOf(comment.parentId) === -1)
    );

    return filteredComments;
};

const getMyOwnComments = (comments: CommentRowType[], userId: string) => {
    const myCommentIdList: string[] = [];
    const filteredComments: CommentRowType[] = [];
    comments.forEach((comment: CommentRowType) => {
        if (userId === comment.user.id) {
            myCommentIdList.push(comment.id);
            if (comment.parentId !== "" && myCommentIdList.indexOf(comment.parentId) === -1) {
                myCommentIdList.push(comment.parentId);
            }
        }
    });
    comments.forEach((comment: CommentRowType) => {
        if (myCommentIdList.indexOf(comment.id) !== -1) {
            filteredComments.push(comment);
        }
    });
    return filteredComments;
};

const getUnreadComments = (comments: CommentRowType[], fileInfo: CommentResponseFileInfoType) => {
    let filteredComments: CommentRowType[] = [];
    let commentsCount = 0 as number;

    // For identifying all replies corresponding to comments
    const commentsMap = new Map<string, CommentRowType[]>();
    comments.forEach((comment) => {
        if (comment.parentId !== "") {
            commentsMap.set(comment.parentId, [
                ...(commentsMap.get(comment.parentId) || []),
                {
                    ...comment,
                    unreadReply: new Date(comment.createdAt) > new Date(fileInfo.lastViewedAt),
                },
            ]);
        }
    });

    comments.forEach((comment) => {
        if (
            comment.parentId === "" &&
            new Date(comment.createdAt) > new Date(fileInfo.lastViewedAt)
        ) {
            commentsCount += 1;
            comment.unreadComment = true;
            filteredComments.push(comment);
            if (commentsMap.has(comment.id))
                filteredComments = [...filteredComments, ...(commentsMap.get(comment.id) || [])];
        }
    });

    return {
        filteredRows: filteredComments,
        count: commentsCount,
    };
};

const getUnreadReplies = (comments: CommentRowType[], fileInfo: CommentResponseFileInfoType) => {
    const filteredComments: CommentRowType[] = [];
    let repliesCount = 0 as number;

    // For identifying all comments corresponding to replies
    const commentsMap = new Map<string, CommentRowType>();
    comments.forEach((comment: CommentRowType) => {
        if (comment.parentId === "") {
            commentsMap.set(comment.id, {
                ...comment,
                unreadComment: new Date(comment.createdAt) > new Date(fileInfo.lastViewedAt),
            });
        }
    });

    comments.forEach((comment: CommentRowType) => {
        if (
            comment.parentId !== "" &&
            new Date(comment.createdAt) > new Date(fileInfo.lastViewedAt)
        ) {
            const commentsMapData = commentsMap.get(comment.parentId);
            if (commentsMapData) {
                filteredComments.push(commentsMapData);
                commentsMap.delete(comment.parentId);
            }
            repliesCount += 1;
            comment.unreadReply = true;
            filteredComments.push(comment);
        }
    });
    return {
        filteredRows: filteredComments,
        count: repliesCount,
    };
};

const processCommentsRowData = (data: CommentDataType[]) => {
    const commentsRowData: CommentRowType[] = data.map(
        ({
            id,
            fileKey,
            parentId,
            orderId,
            createdAt,
            resolvedAt,
            user,
            clientMeta,
            message,
            reactions,
        }) => ({
            id,
            fileKey,
            parentId,
            orderId,
            createdAt,
            resolvedAt,
            user,
            clientMeta,
            message,
            reactions,
        })
    );
    return commentsRowData;
};

const processCommentsData = (
    filterType: CommentFilterType,
    user: IUserToken,
    data: CommentResponseDataType
) => {
    const nodeId = "?node-id=";
    const commentsRowData = processCommentsRowData(data.comments);
    const originalResponse = cloneDeep(data.comments);
    let comments = cloneDeep(commentsRowData);
    switch (filterType) {
        case "all":
            // comments = comments;
            break;
        case "resolved":
            comments = getResolvedFilteredComments(commentsRowData);
            break;
        case "unresolved":
            comments = getUnResolvedFilteredComments(commentsRowData);
            break;
        case "my":
            comments = getMyOwnComments(commentsRowData, user.figmaUserId);
            break;
        case "unread":
            comments = getUnreadComments(commentsRowData, data.fileInfo).filteredRows;
            break;
        case "unread-replies":
            comments = getUnreadReplies(commentsRowData, data.fileInfo).filteredRows;
            break;
        default:
            break;
    }
    // O(1) parent-existence checks instead of a findIndex scan per comment (O(n^2)).
    const commentIdSet = new Set(comments.map((tempComment) => tempComment.id));
    comments.forEach((comment) => {
        comment.markAsReadCreatedAt = comment.createdAt;
        if (!comment.clientMeta) {
            if (commentIdSet.has(comment.parentId)) {
                comment.myComment =
                    user.figmaUserId.toString() === comment.user.id.toString() ? "Y" : "";
                comment.userName = comment.user.handle;
                comment.status = comment.resolvedAt ? "resolved" : "Unresolved";
            }
        } else {
            comment.commentLocation = `${APP_CONSTANT.figmaUrl}/file/${comment.fileKey}${nodeId}${comment.clientMeta.nodeId}#${comment.id}`;

            comment.myComment =
                user.figmaUserId.toString() === comment.user.id.toString() ? "Y" : "";
            comment.userName = comment.user.handle;
            comment.status = comment.resolvedAt ? "resolved" : "Unresolved";
            if (comment.parentId !== "")
                comment.unreadReply =
                    new Date(data.fileInfo.lastViewedAt) < new Date(comment.createdAt);
            else
                comment.unreadComment =
                    new Date(data.fileInfo.lastViewedAt) < new Date(comment.createdAt);
        }
    });
    comments = sort(comments, [(comment) => comment.createdAt]);

    // Group children by parentId once (O(n)) instead of filtering the whole
    // list for every parent comment (O(n^2)).
    const childrenByParent = new Map<CommentRowType["id"], CommentRowType[]>();
    comments.forEach((comment) => {
        if (comment.parentId) {
            const siblings = childrenByParent.get(comment.parentId);
            if (siblings) siblings.push(comment);
            else childrenByParent.set(comment.parentId, [comment]);
        }
    });

    comments.forEach((comment) => {
        if (!comment.parentId) {
            comment.children = childrenByParent.get(comment.id) || [];
            comment.isExpanded = false;
        }
    });

    comments = comments.filter((comment) => comment.parentId === "");
    const sortedResponse = cloneDeep(comments);
    return {
        originalResponse,
        sortedResponse,
        projectCommentInfo: data.fileInfo,
        projectCommentCount: data.commentCount,
    };
};
const getReactionImage = (emoji: string) => {
    const emojiId = emoji.replace(/:/g, "");
    return EMOJIS_MAP[emojiId] || null;
};

// TODO: update type definitions
const getReactionAction = (reactions: any[], reaction: string, figmaUser: FigmaUserType) => {
    let action: ReactionActionType = "add";
    if (reactions.length) {
        const userReactionExist = reactions.find(
            ({ emoji, user }: { emoji: string; user: any }) =>
                emoji === reaction && user.id === figmaUser.id
        );
        if (userReactionExist) {
            action = "delete";
        }
    }
    return action;
};

export {
    exportCommentsToExcel,
    getReactionAction,
    getReactionImage,
    processCommentsData,
    processTreeData,
    sortingTreeData,
    toggleSubRow,
};
