import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CommentsList } from "../containers";
import { SubHeader } from "../containers/ProjectDetails";
import { PrototypesList } from "../containers/Prototypes";
import { ProjectDetailsContext } from "../contexts";
import { useFetchProjectList } from "../hooks";
import { CommentFilterType } from "../types";

export const ProjectDetailsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const viewByParam = queryParams.get("view");
    const filterByParam = queryParams.get("filter");

    const {
        view,
        setProjectId,
        setProjectData,
        setProjectList,
        onChangeView,
        setCommentFilter,
        setSelectedBranch,
    } = useContext(ProjectDetailsContext);

    const {
        projectId,
    }: {
        projectId: string;
    } = useParams();
    const parsedProjectId = parseInt(projectId, 10);

    const { data: projectListData } = useFetchProjectList({
        key: "all",
    });

    useEffect(() => {
        if (parsedProjectId) {
            setProjectId(parsedProjectId);
        }
        if (projectListData) {
            setProjectList(projectListData);
        }
        if (parsedProjectId && projectListData) {
            const filteredProjectDetail = projectListData.find(
                ({ projectId: id }) => id === parseInt(projectId, 10)
            );
            setProjectData(filteredProjectDetail);
        }
    }, [projectListData, parsedProjectId]);

    useEffect(() => {
        // Reset selected branch on component mount
        setSelectedBranch(undefined);
        if (viewByParam) {
            const value = viewByParam === "prototypes" ? "prototypes" : "comments";
            onChangeView(value);
        }
        const filters = ["all", "resolved", "unresolved", "unread", "unread-replies", "my"];
        if (filterByParam && viewByParam !== "prototypes" && filters.includes(filterByParam)) {
            setCommentFilter(filterByParam as CommentFilterType);
        }
    }, []);

    return (
        <>
            <SubHeader />
            {view === "prototypes" ? <PrototypesList /> : <CommentsList />}
        </>
    );
};
