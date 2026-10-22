import { ProjectEditorType } from "./project";

type CommentType = "total" | "resolved" | "unResolved" | "new" | "my";

type ReactionActionType = "add" | "delete";

interface UserType {
    handle: string;
    id: string;
    imgUrl: string;
}
interface CommentReactionResponseType {
    createdAt: string;
    emoji: string;
    user: UserType;
}

interface CommentReactionType {
    name: string;
    id: number;
}

interface ReactionUserType extends UserType {
    createdAt: string;
}

interface ProcessedReactionType {
    emoji: string;
    users: ReactionUserType[];
}

interface AddOrDeleteReactionRequestType {
    projectId: number;
    emoji: string;
    commentId: string;
    branchKey?: string;
}

interface CommentUserType {
    handle: string;
    imgUrl: string;
    id: string;
}

type ReactionUserType = CommentUserType;

interface CommentReactionType {
    emoji: string;
    createdAt: string;
    user: ReactionUserType;
}

interface CommentClientMetaType {
    nodeId: string;
    nodeOffset: {
        x: number;
        y: number;
    };
}

interface CommentResponseFileInfoType {
    fileName: string;
    figmaFileId: string;
    projectId: string;
    createdAt: string;
    lastViewedAt: string;
    isFavorite: boolean;
    editorType: ProjectEditorType;
}

interface CommentResponseCountType {
    allComments: number;
    myComments: number;
    newComments: number;
    unresolvedComments: number;
    resolvedComments: number;
}

interface CommentResponseDataType {
    fileInfo: CommentResponseFileInfoType;
    commentCount: CommentResponseCountType;
    comments: CommentDataType[];
}

interface CommentDataType {
    id: string;
    fileKey: string;
    parentId: string;
    orderId: string;
    createdAt: string;
    resolvedAt: string;
    user: CommentUserType;
    clientMeta?: CommentClientMetaType;
    message: string;
    reactions: CommentReactionType[];
    uuid: string;
}

interface CommentRowType {
    id: string;
    fileKey: string;
    parentId: string;
    orderId: string;
    createdAt: string;
    resolvedAt: string;
    user: CommentUserType;
    clientMeta?: CommentClientMetaType;
    message: string;
    reactions: CommentReactionType[];
    userName?: string;
    commentLocation?: string;
    status?: string;
    myComment?: string;
    unreadReply?: boolean;
    unreadComment?: boolean;
    // TODO: update children type
    children?: CommentRowType[];
    isExpanded?: boolean;
    markAsReadCreatedAt?: string;
    // TODO: update reactions type
}

interface ExportCommentRowType extends CommentRowType {
    isNew?: boolean;
    group?: number;
}

type CommentActionType = "delete" | "reply";

type CommentFilterType = "all" | "resolved" | "unresolved" | "unread" | "unread-replies" | "my";

export {
    AddOrDeleteReactionRequestType,
    CommentActionType,
    CommentDataType,
    CommentFilterType,
    CommentReactionResponseType,
    CommentReactionType,
    CommentResponseCountType,
    CommentResponseDataType,
    CommentResponseFileInfoType,
    CommentRowType,
    CommentType,
    ExportCommentRowType,
    ProcessedReactionType,
    ReactionActionType,
    ReactionUserType,
};
