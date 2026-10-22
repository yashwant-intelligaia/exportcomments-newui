interface ITreeRowType {
    orderId: string;
    userName: string;
    message: string;
    commentLocation: string;
    status: string;
    user: IUser;
    resolvedAt: string;
    createdAt: string;
    myComment: string;
    unreadReply: boolean;
    unreadComment: boolean;
    id: string;
    clientMeta: Inode;
    fileKey: string;
    parentId: string;
    children: any;
    isExpanded: boolean;
    reactions: any[];
}

interface ITreenode {
    nodeId: string;
    nodeOffset: {
        x: number;
        y: number;
    };
}

interface IFileInfo {
    createdAt: string;
    projectId: string;
    fileName: string;
    isFavorite: boolean;
    figmaFileId: string;
    editorType: string;
}

interface ITreeCommentResponse {
    data: {
        comments: {
            comments: {
                comments: IRowType[];
            };
            fileInfo: IFileInfo;
            originalResponse?: IRowType[];
            sortedResponse?: IRowType[];
        };
    };
}

interface ITreeUser {
    handle: string;
    id: string;
    imgUrl: string;
}

interface ITreeCommentsRequestType {
    projectId: string;
}

interface IDeleteRequestType {
    projectId: number;
    commentId: string;
    branchKey?: string;
}

interface IReplyRequestType {
    message: string;
    userId: string;
    projectId: number;
    branchKey?: string;
    parentId?: string;
}
interface IFiterTypeOption {
    name: string;
    id: string;
    record: number;
}

interface IReplyRequestResponse {
    data: {
        code: string;
        message: string;
        data: ITreeRowType;
    };
}

export {
    IDeleteRequestType,
    IFileInfo,
    IFiterTypeOption,
    IReplyRequestResponse,
    IReplyRequestType,
    ITreeCommentResponse,
    ITreeCommentsRequestType,
    ITreenode,
    ITreeRowType,
    ITreeUser,
};
