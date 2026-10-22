interface IRowType {
    orderId: string;
    userName: string;
    message: string;
    commentLocation: string;
    status: string;
    user: IUser;
    resolvedAt: string;
    createdAt: string;
    myComment: string;
    unreadReply?: string;
    unreadComment?: string;
    id: string;
    clientMeta: Inode;
    fileKey: string;
    parentId: string;
}

interface Inode {
    nodeId: string;
    nodeOffset: {
        x: number;
        y: number;
    };
}

interface ICommentResponse {
    data: {
        comments: {
            comments: IRowType[];
        };
    };
}

interface IUser {
    handle: string;
    id: string;
    imgUrl: string;
}

interface CommentsRequestType {
    userId: number;
    projectId: string;
}

export { CommentsRequestType, ICommentResponse, Inode, IRowType, IUser };
