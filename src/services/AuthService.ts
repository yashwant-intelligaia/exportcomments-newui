"use client";

const DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION = "DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION";

export const TOKEN_COOKIE = "userToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/* The token is mirrored in a cookie so Next.js middleware and server components can read it. */
export const saveUserToken = (tokenDetail: any) => {
    localStorage.setItem("userToken", tokenDetail);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(tokenDetail)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
};
export const removeUserToken = () => {
    localStorage.removeItem("userToken");
    document.cookie = `${TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
};
export const getUserToken = () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("userToken");
    if (token) {
        return token;
    }
    return null;
};

export const saveUser = (detail: any) => {
    localStorage.setItem("user", detail);
};

export const removeUser = () => {
    localStorage.removeItem("user");
};
export const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return user;
    }
    return null;
};

export const fetchGenerateAccessTokenStatus = () => sessionStorage.getItem("GenerateAccessToken");

export const saveGenerateAccessTokenStatus = (status: string) => {
    sessionStorage.setItem("GenerateAccessToken", status);
};

export const fetchDoNotShowAddProjectInstruction = () =>
    localStorage.getItem(DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION);

export const saveDoNotShowAddProjectInstruction = () => {
    localStorage.setItem(DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION, "true");
};
