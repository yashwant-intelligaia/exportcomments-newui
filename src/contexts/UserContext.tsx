import { createContext, useContext, useState } from "react";

import { getUser, getUserToken } from "../services/AuthService";
import { IUserToken, UserContextType } from "../types";

const Context = createContext({} as UserContextType);
export const UserContext = () => useContext(Context);
export const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState({} as IUserToken);
    const [figmaUser, setFigmaUser] = useState({} as any);
    const [token, setToken] = useState("" as string);
    const [fileName, setFileName] = useState("" as string);
    const [fileList, setFileList] = useState([] as any);
    const [commentType, setCommentType] = useState("All Comments" as string);
    const [isDisable, setIsDisable] = useState(false as boolean);
    const value = {
        user,
        setUser,
        token,
        setToken,
        fileName,
        setFileName,
        fileList,
        setFileList,
        commentType,
        setCommentType,
        isDisable,
        setIsDisable,
        figmaUser,
        setFigmaUser,
    };
    if (!token && getUserToken()) {
        const localToken = getUserToken();
        if (localToken) {
            setToken(localToken);
        }

        const userdetail = getUser();
        if (userdetail) {
            setUser(JSON.parse(userdetail));
        }
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
