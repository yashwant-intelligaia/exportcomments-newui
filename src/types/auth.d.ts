interface IUserTokenResponse {
    data: {
        code: number;
        message: number;
        data: {
            accessToken: string;
            user: IUser;
        };
    };
}

interface IUserResponse {
    data: {
        code: number;
        message: number;
        data: IUserToken;
    };
}

interface IUserToken {
    avatar: string;
    createdAt: string;
    email: string;
    figmaUserId: string;
    name: string;
    refreshToken: string;
    figmaToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    userId: number;
}

interface RequestTokenType {
    code: string | null;
    state: string | null;
    callbackUrl: string;
}

interface RequestUserType {
    userId: number | undefined;
}

interface IUser {
    email: string;
    // figmaToken: string;
    handle: string;
    userId: number;
    avatar: string;
}

interface IUserInfo {
    user: IUserToken;
}

export {
    IUserInfo,
    IUserResponse,
    IUserToken,
    IUserTokenResponse,
    RequestTokenType,
    RequestUserType,
};
