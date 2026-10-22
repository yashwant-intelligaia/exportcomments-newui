interface PluginCountResponseType {
    installCount: number;
    likeCount: number;
    viewCount: number;
}

interface ProcessedInviteesDataType {
    inputValue: string;
    avatar: string;
    name: string;
    email: string;
    showProject: boolean;
    selectedProjectIds: number[];
}

interface AddButtonsOptionType {
    title: string;
    component: JSX.Element;
}

interface UpdateProjectDataType {
    name: string;
    projectId: number;
}
interface FetchProjectListParams {
    startDate?: string;
    endDate?: string;
    key: string;
}

export {
    AddButtonsOptionType,
    FetchProjectListParams,
    PluginCountResponseType,
    ProcessedInviteesDataType,
    UpdateProjectDataType,
};
