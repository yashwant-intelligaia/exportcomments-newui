"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getUser, getUserToken, saveUserToken, TOKEN_COOKIE } from "../services/AuthService";
import { IUserToken, UserContextType } from "../types";

const Context = createContext({} as UserContextType);
export const UserContext = () => useContext(Context);
export const UserContextProvider = ({ children, initialToken = "" }: any) => {
    const [user, setUser] = useState({} as IUserToken);
    const [figmaUser, setFigmaUser] = useState({} as any);
    const [token, setToken] = useState((initialToken || "") as string);
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

    /* Restore the session after hydration (localStorage does not exist on the server). */
    useEffect(() => {
        const localToken = getUserToken();
        if (localToken) {
            setToken(localToken);
            /* Sessions created before the cookie existed: mirror the token, then enter the app. */
            if (!document.cookie.includes(`${TOKEN_COOKIE}=`)) {
                saveUserToken(localToken);
                if (window.location.pathname === "/") window.location.replace("/projects");
            }
        }
        const userdetail = getUser();
        if (userdetail) {
            setUser(JSON.parse(userdetail));
        }
    }, []);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
