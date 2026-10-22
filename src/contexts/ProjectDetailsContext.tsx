"use client";

import { createContext, ReactNode, useState } from "react";

import {
    BranchResponseType,
    CommentFilterType,
    CommentResponseFileInfoType,
    CommentRowType,
    IUserFile,
    ProjectViewByType,
} from "../types";

interface ProjectDetailsContextProps {
    projectId: number;
    setProjectId: React.Dispatch<React.SetStateAction<number>>;
    projectList: IUserFile[];
    setProjectList: React.Dispatch<React.SetStateAction<IUserFile[]>>;
    projectData: IUserFile | undefined;
    setProjectData: React.Dispatch<React.SetStateAction<IUserFile | undefined>>;
    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    view: ProjectViewByType;
    onChangeView: (value: ProjectViewByType) => void;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    commentfilter: CommentFilterType;
    setCommentFilter: React.Dispatch<React.SetStateAction<CommentFilterType>>;
    sortedComments: CommentRowType[];
    setSortedComments: React.Dispatch<React.SetStateAction<CommentRowType[]>>;
    projectCommentInfo: CommentResponseFileInfoType;
    setProjectCommentInfo: React.Dispatch<React.SetStateAction<CommentResponseFileInfoType>>;
    originalComments: CommentRowType[];
    setOriginalComments: React.Dispatch<React.SetStateAction<CommentRowType[]>>;
    selectedBranch: BranchResponseType | undefined;
    setSelectedBranch: React.Dispatch<React.SetStateAction<BranchResponseType | undefined>>;
}

const ProjectDetailsContext = createContext<ProjectDetailsContextProps>({} as ProjectDetailsContextProps);

const ProjectDetailsContextProvider = ({ children }: { children: ReactNode }) => {
    const [view, setView] = useState<ProjectViewByType>("comments");
    const [projectId, setProjectId] = useState<number>(0);
    const [projectList, setProjectList] = useState<IUserFile[]>([]);
    const [projectData, setProjectData] = useState<IUserFile>();
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [commentfilter, setCommentFilter] = useState<CommentFilterType>("all");
    const [sortedComments, setSortedComments] = useState<CommentRowType[]>([]);
    const [projectCommentInfo, setProjectCommentInfo] = useState({} as CommentResponseFileInfoType);
    const [originalComments, setOriginalComments] = useState<CommentRowType[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<BranchResponseType>();

    const onChangeView = (value: ProjectViewByType) => {
        setView(value);
    };

    return (
        <ProjectDetailsContext.Provider
            value={{
                projectList,
                setProjectList,
                projectData,
                setProjectData,
                projectId,
                view,
                onChangeView,
                setProjectId,
                isPageLoading,
                setIsPageLoading,
                searchInput,
                setSearchInput,
                commentfilter,
                setCommentFilter,
                sortedComments,
                setSortedComments,
                projectCommentInfo,
                setProjectCommentInfo,
                originalComments,
                setOriginalComments,
                selectedBranch,
                setSelectedBranch,
            }}
        >
            {children}
        </ProjectDetailsContext.Provider>
    );
};

export { ProjectDetailsContext, ProjectDetailsContextProvider };
