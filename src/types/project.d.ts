type ProjectViewByType = "comments" | "prototypes";
type ProjectEditorType = "figma" | "figjam";

interface ProjectUserResponseType {
    userId: number;
    name: string;
    email: string;
    avatar: string;
    projectOwner: boolean;
}
interface BranchResponseType {
    key: string;
    name: string;
    thumbnailUrl?: string;
    lastModified?: string;
}

interface DeleteProjectMemberDataType {
    projectId: number;
    userId: number;
}

interface ProjectInviteRequestType {
    projectId: number;
    emails: string[];
}

interface InvitePageRequestType {
    pageId: any;
    projectId: number;
    emails: string[];
    branchName: string;
    pageNodeId: string;
}
interface InviteFlowRequestType {
    pageId: any;
    projectId: number;
    emails: string[];
    flowId: any;
}

interface InviteVersionRequestType {
    pageId: any;
    flowId: any;
    versionId: any;
    projectId: number;
    emails: string[];
    branchName: string;
    flowNodeId: string;
}
interface UserType {
    user_id: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface FlowType {
    flow_id: number;
    name: string;
    node_id: string;
    flow_users: UserType[];
}

interface PageUserType {
    user_id: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface PageType {
    page_id: number;
    name: string;
    node_id: string;
    flows: FlowType[];
    page_users: PageUserType[];
}

type FilterType =
    "View All" | "This Week" | "Last 30 Days" | "Last 6 Months" | "This Year" | "Last Year" | "Custom Range" | "";

interface ProjectFilterContextType {
    filter: FilterType;
    range?: { startDate: string; endDate: string };
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    setRange: React.Dispatch<React.SetStateAction<{ startDate: string; endDate: string }>>;
}

interface ProjectCardDataType {
    projectId: number;
    fileId: string;
    title: string;
    subTitle: string;
    allComments: number;
    myComments: number;
    unreadComments: number;
    resolvedComments: number;
    unresolvedComments: number;
    prototypeCount: number;
    isFavourite?: boolean;
}

interface AddProjectDataType {
    projectId: string;
    fileName: string;
    allComments: number;
    myComments: number;
    resolvedComments: number;
    unresolvedComments: number;
    newComments: number;
    editorType: ProjectEditorType;
}

interface ProjectDetailsDataType {
    projectId: string;
    fileName: string;
    allComments: number;
    myComments: number;
    resolvedComments: number;
    unresolvedComments: number;
    newComments: number;
    editorType: ProjectEditorType;
}

interface ProjectCardContextType {
    data: ProjectCardDataType;
    setData: React.Dispatch<React.SetStateAction<ProjectCardDataType>>;
}

interface AddUserFormDataType {
    email: string;
    projectIds: number[];
}

export {
    AddProjectDataType,
    AddUserFormDataType,
    BranchResponseType,
    DeleteProjectMemberDataType,
    FilterType,
    InviteFlowRequestType,
    InvitePageRequestType,
    InviteVersionRequestType,
    PageUserType,
    ProjectCardContextType,
    ProjectCardDataType,
    ProjectDetailsDataType,
    ProjectEditorType,
    ProjectFilterContextType,
    ProjectInviteRequestType,
    ProjectUserResponseType,
    ProjectViewByType,
    UserType,
};
