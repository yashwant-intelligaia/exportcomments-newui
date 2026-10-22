interface FigmaUserType {
    email: string;
    handle: string;
    id: string;
    img_url: string;
}

interface UserContextType {
    user: IUserToken;
    token: string;
    fileName: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
    setUser: React.Dispatch<React.SetStateAction<IUserToken>>;
    commentType: string;
    setCommentType: React.Dispatch<React.SetStateAction<IUserToken>>;
    isDisable: boolean;
    setIsDisable: React.Dispatch<React.SetStateAction<boolean>>;
    figmaUser: FigmaUserType;
    setFigmaUser: React.Dispatch<React.SetStateAction<FigmaUserType>>;
    setFileList: React.Dispatch<React.SetStateAction<IUserFile>>;
    fileList: IUserFile;
}

interface UserResponseType {
    name: string;
    email: string;
    avatar: string;
}

interface UserDataType {
    userId: number;
    name: string;
    figmaUserId: string;
    email: string;
    avatar: string;
    acceptTermsOfUseAndPrivacyPolicy: boolean;
    isSubscribed: boolean;
    notionConnected: boolean;
}

interface FilteredUserResponseType extends UserResponseType {
    inputValue: string;
}

export { FigmaUserType, FilteredUserResponseType, UserContextType, UserDataType, UserResponseType };
