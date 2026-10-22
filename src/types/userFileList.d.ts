interface IUserFile {
    prototypeCount: number;
    fileName: string;
    createdAt: string;
    projectId: number;
    isFavorite: number;
    allComments: number;
    myComments: number;
    newComments: number;
    resolvedComments: number;
    unresolvedComments: number;
    checkedProject: boolean;
    editorType: string;
}

interface IUserFileResponse {
    data: {
        data: IUserFile[];
    };
}

interface ProjectListType {
    data: IUserFile[];
}

interface FilterProjectsProps {
    data: IUserFile[];
}

interface IFileUser {
    email: string;
    name: string;
    avatar: string;
    userId: string;
    selected: boolean;
    editValue: boolean;
    tempEmail: string;
    validEmail: string;
    iseditable: boolean;
    projectOwner?: boolean;
}

interface IFIleUsersResponse {
    data: {
        data: IFileUser[];
    };
}

interface IShareFileRequestType {
    projectId?: any;
    users: IShareUserType[];
}

interface IFavoriteRequestType {
    projectId: number;
    status: number;
}

interface IShareUserType {
    userId: number;
    email: string;
}

interface IInviteToken {
    inviteToken: string;
}

export {
    FilterProjectsProps,
    IBranchReponse,
    IFavoriteRequestType,
    IFileUser,
    IFIleUsersResponse,
    IInviteToken,
    IShareFileRequestType,
    IUserFile,
    IUserFileResponse,
    ProjectListType,
};
