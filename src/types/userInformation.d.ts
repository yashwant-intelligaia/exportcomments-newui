interface IUserInformation {
    avatar: string;
    createdAt: string;
    email: string;
    figmaUserId: string;
    name: string;
    refreshToken: string;
    token: string;
    tokenExpiresIn: string;
    userId: number;
}

interface IUserInformationResponse {
    data: {
        data: IUserInformation[];
    };
}

export { IUserInformation, IUserInformationResponse };
