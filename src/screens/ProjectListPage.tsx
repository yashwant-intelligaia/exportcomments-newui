"use client";

import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Popover } from "@/components/ui/Popover";
import { useHistory } from "@/utils/navigation";

import filterIcon from "../assets/filter.svg";
import { APP_CONSTANT } from "../constants/AppConstant";
import {
    AddProjectDrawer,
    ConsentFormModal,
    FilterProjects,
    ManageTeamModal,
    ProjectNotFound,
    ProjectSearch,
} from "../containers";
import { NoProjectsFound } from "../containers/Projects/NoProjectsFound";
import { ProjectFilterContext } from "../contexts/ProjectFilterContext";
import { UserContext } from "../contexts/UserContext";
import {
    getFilterDateRange,
    useCommonPost,
    useDeleteProject,
    useFetchCommentsForDashboard,
    useFetchProjectList,
} from "../hooks";
import { useDebounce } from "../hooks/commonHook";
import { Cards } from "../stories/components/Cards/Cards";
import { EcDialog } from "../stories/components/EcDialog/EcDialog";
import { Loader } from "../stories/components/Loader/Loader";
import { IFavoriteRequestType, ISnackBarMessage, IUserFile } from "../types";
import {
    // CollapseIcon,
    // ExpendedIcon,
    exportCommentsToExcel,
    getLoadingImage,
    getLoadingMessage,
    snackbar,
} from "../utils";

type ProjectFilterType = "all" | "figma" | "figjam";

export const ProjectListPage = snackbar((props: ISnackBarMessage) => {
    const { user, setFileList } = UserContext();
    const { filter, range } = useContext(ProjectFilterContext);
    const history = useHistory();
    const [openShareModal, setOpenShareModal] = useState<JSX.Element>();
    const [projects, setProjects] = useState<IUserFile[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [loadingImage, setLoadingImage] = useState<string>("");
    const [openConsentModal, setopenConsentModal] = useState(false);
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const [confirmDialog, setConfirmDialog] = useState<JSX.Element>();
    const [searchText, setSearchText] = useState("" as string);
    const [favouriteProjects, setFavouriteProjects] = useState<IUserFile[]>([]);

    const [nonFavouriteProjects, setNonFavouriteProjects] = useState<IUserFile[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<ProjectFilterType>("all");

    const [projectFilterAnchorEl, setProjectFilterAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [projectFilter, setProjectFilter] = useState<ProjectFilterType>("all");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProjectFilterAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setProjectFilterAnchorEl(null);
    };

    const handleChangeFilter = () => {
        setProjectFilter(selectedFilter);

        let filteredData: IUserFile[] = [];

        if (selectedFilter === "all") {
            filteredData = projects;
        } else {
            filteredData = projects.filter((file: IUserFile) => file.editorType === selectedFilter);
        }
        setFavouriteProjects(filteredData.filter((file) => file.isFavorite === 1));
        setNonFavouriteProjects(filteredData.filter((file) => file.isFavorite === 0));
        handleClose();
    };

    const { mutate: markAsFavourite, data: favouriteResponse } = useCommonPost({
        title: "Favourite Project",
        alertRequired: true,
    });

    const {
        mutate: mutateFetchComments,
        data: commentsData,
        isPending: fetchingComments,
        isSuccess: isFetchCommentDataSuccess,
    } = useFetchCommentsForDashboard(props);

    const { deleteProject } = useDeleteProject();

    const { mutate: mutateDeleteProject } = deleteProject;

    useEffect(() => {
        if (user.acceptTermsOfUseAndPrivacyPolicy !== undefined && user.acceptTermsOfUseAndPrivacyPolicy === false) {
            setopenConsentModal(true);
        } else {
            setopenConsentModal(false);
        }
    }, [user.acceptTermsOfUseAndPrivacyPolicy]);

    useEffect(() => {
        if (isFetchCommentDataSuccess) {
            exportCommentsToExcel(commentsData?.data?.data?.comments, "all", user, commentsData?.data?.data?.fileInfo);
        }
    }, [isFetchCommentDataSuccess, commentsData]);

    useEffect(() => {
        if (favouriteResponse) {
            projectListRefetch();
        }
    }, [favouriteResponse]);

    const handleRemoveProject = (projectId: number) => {
        setConfirmDialog(
            <EcDialog
                title="Remove Project"
                description="Are you sure you want to remove the project."
                open
                actionButtons={[
                    {
                        label: "Cancel",
                        onClick: () => {
                            setConfirmDialog(undefined);
                        },
                        variant: "outlined",
                    },
                    {
                        label: "Yes, I'm Sure",
                        onClick: () => {
                            mutateDeleteProject(projectId);
                            setConfirmDialog(undefined);
                        },
                        variant: "contained",
                    },
                ]}
                onClose={() => {
                    setConfirmDialog(undefined);
                }}
            />,
        );
    };

    const handleMarkAsFavourite = (item: any, favId: any) => {
        const obj: IFavoriteRequestType = {} as IFavoriteRequestType;
        obj.projectId = parseInt(item, 10);
        obj.status = parseInt(favId, 10) ? 0 : 1;
        markAsFavourite({
            body: obj,
            url: APP_CONSTANT.webApi.userFavorite,
        });
    };

    const openAllComments = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=comments&filter=all`);
    };

    const openResolvedComments = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=comments&filter=resolved`);
    };
    const openUnresolvedComments = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=comments&filter=unresolved`);
    };
    const handleOpenUnreadComments = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=comments&filter=unread`);
    };
    const openOwnComments = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=comments&filter=my`);
    };

    const handleDownloadExcel = (item: any) => {
        mutateFetchComments({
            body: { projectId: item.projectId },
            url: `${APP_CONSTANT.koa2BaseUrl}${APP_CONSTANT.webApi.comments}`,
        });
    };

    const handleAddNewProject = () => {
        // TODO: check if this functionality is in use, remove if not required
        setDrawerContent(<AddProjectDrawer onClose={() => setDrawerContent(undefined)} />);
    };

    const debounceFilterProjects = useDebounce(() => {
        if (projectList)
            setProjects(
                projectList.filter((file: IUserFile) =>
                    file.fileName.toString().toLowerCase().includes(searchText.trim().toLowerCase()),
                ),
            );
    }, 1000);

    const handleProjectSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        debounceFilterProjects();
    };

    const handleViewPrototypeLink = (item: any) => {
        history.push(`/project/${item.projectId}/details?view=prototypes`);
    };

    const { startDate, endDate } = getFilterDateRange({ filter, ...range });
    const {
        data: projectList,
        isLoading: projectListLoading,
        refetch: projectListRefetch,
    } = useFetchProjectList({
        startDate,
        endDate,
        enabled: !!startDate && !!endDate,
        key: !!startDate && !!endDate ? `${startDate}-to-${endDate}` : `all`,
    });
    const { data: userAllProjects } = useFetchProjectList({
        key: `all`,
    });

    useEffect(() => {
        setLoadingMessage(getLoadingMessage("project"));
        setLoadingImage(getLoadingImage("project"));
        if (projectList) {
            setFileList(projectList);
            setProjects(projectList);
        }
    }, [projectList]);
    useEffect(() => {
        const searchFilteredProjects = projects.filter((file) =>
            file.fileName.toLowerCase().includes(searchText.trim().toLowerCase()),
        );

        const filteredData =
            projectFilter === "all"
                ? searchFilteredProjects
                : searchFilteredProjects.filter((file) => file.editorType === projectFilter);

        // setFilteredProjects(filteredData);
        setFavouriteProjects(filteredData.filter((file) => file.isFavorite === 1));
        setNonFavouriteProjects(filteredData.filter((file) => file.isFavorite === 0));
    }, [searchText, projectFilter, projects]);

    const renderCard = (item: IUserFile) => (
        <div key={item.projectId} className="[&>div]:w-full">
            <Cards
                usedIn="projectList"
                editorType={item.editorType}
                item={item}
                isFavorite={item.isFavorite}
                onShareProject={() => {
                    setOpenShareModal(
                        <ManageTeamModal projectId={item.projectId} onClose={() => setOpenShareModal(undefined)} />,
                    );
                }}
                handleMarkAsFavourite={() => handleMarkAsFavourite(item.projectId, item.isFavorite)}
                onDeleteProject={() => handleRemoveProject(item.projectId)}
                filterType={item.fileName}
                createdAt={item.createdAt}
                openAllComments={() => openAllComments(item)}
                openResolvedComments={() => openResolvedComments(item)}
                openUnresolvedComments={() => openUnresolvedComments(item)}
                openUnreadComments={() => handleOpenUnreadComments(item)}
                openOwnComments={() => openOwnComments(item)}
                allComments={item.allComments}
                myComments={item.myComments}
                newComments={item.newComments}
                resolvedComments={item.resolvedComments}
                unresolvedComments={item.unresolvedComments}
                handleDownloadExcel={() => handleDownloadExcel(item)}
                fetchingComments={fetchingComments}
                loadingFiles={projectListLoading}
                prototypeCount={item.prototypeCount || 0}
                handleViewPrototypeLink={() => handleViewPrototypeLink(item)}
            />
        </div>
    );

    const cardGrid = "grid w-full grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 max-sm:grid-cols-1";
    const filterOptions: { value: ProjectFilterType; label: string }[] = [
        { value: "all", label: "All Files" },
        { value: "figma", label: "Figma" },
        { value: "figjam", label: "FigJam" },
    ];

    return (
        <div className="mx-auto w-full max-w-[1536px] xl:px-4">
            {projectList && !fetchingComments && (
                <div className="flex w-full flex-col items-start justify-start py-5 max-[1440px]:px-6 max-[1024px]:px-2.5 max-[768px]:bg-transparent max-[425px]:p-0">
                    {/* Project title on the first line */}
                    <h4 className="text-ink pb-3.5 font-sans text-3xl font-medium tracking-normal">Projects</h4>

                    <div className="mt-4 flex w-full flex-col">
                        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            {/* Left-aligned Search and Filter */}
                            <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-center">
                                <ProjectSearch
                                    placeholder="Search..."
                                    value={searchText}
                                    searchChange={handleProjectSearch}
                                />
                                <Button
                                    variant="text"
                                    onClick={handleClick}
                                    startIcon={
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={filterIcon.src} alt="" />
                                    }
                                >
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Second line: total on the left; sort on the right */}
                        <div className="flex flex-1 flex-row items-center gap-4 pt-4">
                            <span className="text-base">Total {projects.length} project(s)</span>
                            <FilterProjects data={userAllProjects} />
                            <Popover
                                open={Boolean(projectFilterAnchorEl)}
                                anchorEl={projectFilterAnchorEl}
                                onClose={handleClose}
                            >
                                <div className="text-ink p-4 pr-24 text-xl font-medium">Filter</div>
                                <fieldset className="flex flex-col gap-2 p-4 pt-0">
                                    <legend className="sr-only">Project type</legend>
                                    {filterOptions.map(({ value, label }) => (
                                        <label
                                            key={value}
                                            className="text-ink flex cursor-pointer items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="radio"
                                                name="project-filter"
                                                value={value}
                                                checked={selectedFilter === value}
                                                onChange={(e) => setSelectedFilter(e.target.value as ProjectFilterType)}
                                                className="accent-ink size-4"
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </fieldset>

                                <div className="m-2 flex justify-end gap-2">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setFavouriteProjects(projects.filter((file) => file.isFavorite === 1));
                                            setNonFavouriteProjects(projects.filter((file) => file.isFavorite === 0));
                                            setSelectedFilter("all");
                                            setProjectFilter("all");
                                            handleClose();
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button size="small" onClick={handleChangeFilter}>
                                        Apply Filter
                                    </Button>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </div>
            )}

            {(projectListLoading || fetchingComments) && <Loader message={loadingMessage} image={loadingImage} />}
            <div className="block">
                {projectList && projectList?.length !== 0 && !projectListLoading && !fetchingComments && (
                    <>
                        {favouriteProjects.length > 0 && (
                            <>
                                <div className="mt-6 mb-6 flex items-center sm:mb-0">
                                    <Star className="fill-yellow text-ink mr-1 size-7" />
                                    <span className="text-xl">Favourite ({favouriteProjects.length})</span>
                                </div>
                                <div className={cn(cardGrid, "mt-4")}>{favouriteProjects.map(renderCard)}</div>
                            </>
                        )}
                        {projects.length > 0 && (
                            <div className="mt-6 mb-6 flex items-center">
                                <span className="text-xl">All Projects ({nonFavouriteProjects.length})</span>
                            </div>
                        )}
                        <div className={cardGrid}>{nonFavouriteProjects.map(renderCard)}</div>
                    </>
                )}
                {userAllProjects?.length === 0 ? (
                    <ProjectNotFound onAddNewProject={handleAddNewProject} />
                ) : (
                    (projectList?.length === 0 || searchText.length > 0) && <NoProjectsFound />
                )}
            </div>

            {drawerContent}
            {confirmDialog}
            {openShareModal}
            {openConsentModal && (
                <ConsentFormModal
                    open={openConsentModal}
                    onClose={() => setopenConsentModal(!openConsentModal)}
                    showCloseIcon={false}
                />
            )}
        </div>
    );
});
