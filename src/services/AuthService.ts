const DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION = "DO_NOT_SHOW_ADD_PROJECT_INSTRUCTION";

export const saveUserToken = (tokenDetail: any) => {
    localStorage.setItem("userToken", tokenDetail);
};
export const removeUserToken = () => {
    localStorage.removeItem("userToken");
};
export const getUserToken = () => {
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
