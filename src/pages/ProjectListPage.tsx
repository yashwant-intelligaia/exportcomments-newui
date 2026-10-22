"use client";

import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    // IconButton,
    Popover,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "@/utils/navigation";
import styledComponent from "styled-components";

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

const GridWrapper = styledComponent.div`
    display: block;
    h3 {
        position: relative;
        font-size: 1.125rem;
        z-index: 1;
        overflow: hidden;
        text-align: center;
        font-weight: 400;
        color: #212121;
        margin:0;
        margin-bottom:1rem;
        &:after,
        &:before {
            position: absolute;
            top: 51%;
            overflow: hidden;
            width: 50%;
            height: 1px;
            content: " ";
            background-color: #e0e0e0;
            margin-left: 1%;
        }
        &:before {
            margin-left: -51%;
            text-align: right;
        }
    }
    .unmark {
        display: inline-flex;
        margin: 0 0.48rem 1rem 0.48rem;
        width: 32%;
        &:nth-child(3n) {
            margin-right: 0;
        }
        div {
            width: 100%;
        }
    }

    @media screen and (max-width: 1200px) {
        .m-cards-outer {
            .unmark {
                margin-left: 0 0.45rem !important;
                margin-right: 0 0.45rem !important;
            }
        }
    }

    @media screen and (max-width: 1140px) {
        .m-cards-outer {
            .unmark {
                margin: 0 0.4rem 1rem 0.4rem !important;
            }
        }
    }

    @media screen and (max-width: 1023px) {
        .m-cards-outer {
            justify-content: center;
            .unmark {
                width: 360px !important;
            }
        }
    }

    @media screen and (max-width: 858px) {
        .m-cards-outer {
            .unmark {
                width: 47% !important;
                margin-inline: 0.5rem !important;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .m-cards-outer {
            .unmark {
                width: 400px !important;
            }
        }
    }

    @media screen and (max-width: 458px) {
        .m-cards-outer {
        justify-content: flex-start;
            .unmark {
                width: 90% !important;
            }
        }
    }

    @media screen and (max-width: 1210px) {
        &.sub-header .filter-w-search {
            flex-wrap: wrap;
        }
        &.sub-header .filter-w-search .seperator {
            display: none;
        }
        &.sub-header .filter-w-search .w-287 {
            width: 330px;
        }
    }

    @media screen and (max-width: 1023px) {
        &.sub-header {
            align-items: flex-start !important;
        }
    }

    @media screen and (max-width: 767px) {
        &.sub-header {
            flex-wrap: wrap;
            .m-640 {
                min-width: 100%;
            }
            .filter-w-search {
                min-width: 100%;
                flex-wrap: nowrap;
                margin-top: 15px;
                justify-content: flex-start;

                .searchwrap.w-287 {
                    display: none;
                }
            }
        }
    }

    @media (max-width: 380px) {
        .filter-w-search .muicustSelect .MuiSelect-select {
                font-size: 13px !important;
            }
        }
    }
`;

const CardOuter = styledComponent.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const StickyHeader = styledComponent.div`
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    justify-content: flex-start;
    align-items: flex-start;
    position: static;
    top: 58px;
    background-color: #f9f9fa;
    z-index: 1;
    width: 100%;
    padding: 20px 0px;

    @media screen and (min-width: 2560px) {
        /* Your large screen styles */
    }

    /* Styles for laptop screens (1024px and above) */
    @media screen and (max-width: 1440px) {
        padding: 20px 24px;
    }

    /* Styles for tablet screens (768px and above) */
    @media screen and (max-width: 1024px) {
        padding: 20px 10px;
    }

    /* Styles for mobile screens (425px and above) */
    @media screen and (max-width: 768px) {
        margin: 0px 0px;
        background: transparent !important;
    }

    /* Additional styles for smaller screens if necessary */
    @media screen and (max-width: 425px) {
        padding: 0px 0px;
    }
`;

export const ProjectListPage = snackbar((props: ISnackBarMessage) => {
    const { user, setFileList } = UserContext();
    const { filter, range } = useContext(ProjectFilterContext);
    const history = useHistory();
    const location = useLocation();
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

    const [projectFilterAnchorEl, setProjectFilterAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );
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
        isLoading: fetchingComments,
        isSuccess: isFetchCommentDataSuccess,
    } = useFetchCommentsForDashboard(props);

    const { deleteProject } = useDeleteProject();

    const { mutate: mutateDeleteProject } = deleteProject;

    useEffect(() => {
        if (
            user.acceptTermsOfUseAndPrivacyPolicy !== undefined &&
            user.acceptTermsOfUseAndPrivacyPolicy === false
        ) {
            setopenConsentModal(true);
        } else {
            setopenConsentModal(false);
        }
    }, [user.acceptTermsOfUseAndPrivacyPolicy]);

    useEffect(() => {
        if (isFetchCommentDataSuccess) {
            exportCommentsToExcel(
                commentsData?.data?.data?.comments,
                "all",
                user,
                commentsData?.data?.data?.fileInfo
            );
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
            />
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
                    file.fileName.toString().toLowerCase().includes(searchText.trim().toLowerCase())
                )
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
            file.fileName.toLowerCase().includes(searchText.trim().toLowerCase())
        );

        const filteredData =
            projectFilter === "all"
                ? searchFilteredProjects
                : searchFilteredProjects.filter((file) => file.editorType === projectFilter);

        // setFilteredProjects(filteredData);
        setFavouriteProjects(filteredData.filter((file) => file.isFavorite === 1));
        setNonFavouriteProjects(filteredData.filter((file) => file.isFavorite === 0));
    }, [searchText, projectFilter, projects]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                padding: {
                    xl: "0 1rem",
                    lg: "0",
                    md: "0",
                    sm: "0",
                    xs: "0",
                },
            }}
        >
            {projectList && !fetchingComments && (
                <StickyHeader>
                    {/* Project title on the first line */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 500,
                            paddingBottom: "14px",
                        }}
                    >
                        Projects
                    </Typography>

                    <Box display="flex" flexDirection="column" width="100%" marginTop="1rem">
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            sx={{
                                flexDirection: {
                                    xl: "row",
                                    lg: "row",
                                    md: "row",
                                    sm: "column",
                                    xs: "column",
                                },
                                alignItems: {
                                    xl: "center",
                                    lg: "center",
                                    md: "center",
                                    xs: "flex-start",
                                },
                                gap: "1rem",
                            }}
                        >
                            {/* Left-aligned Search and Filter */}
                            <Box
                                display="flex"
                                gap="2rem"
                                sx={{
                                    flexDirection: {
                                        xl: "row",
                                        lg: "row",
                                        md: "row",
                                        sm: "column",
                                        xs: "column",
                                    },
                                    alignItems: {
                                        xl: "center",
                                        lg: "center",
                                        md: "center",
                                        sm: "flex-start",
                                        xs: "flex-start",
                                    },
                                    width: "100%",
                                }}
                            >
                                <ProjectSearch
                                    placeholder="Search..."
                                    value={searchText}
                                    searchChange={handleProjectSearch}
                                />
                                <Button
                                    startIcon={<img src={filterIcon} alt="sortIcon" />}
                                    sx={{ textTransform: "none", color: "inherit" }}
                                    onClick={handleClick}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Roboto",
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                            lineHeight: "18px",
                                            letterSpacing: "0.0025em",
                                            textAlign: "center",
                                        }}
                                    >
                                        Filter
                                    </Typography>
                                </Button>
                            </Box>

                            {/* Right-aligned Icons */}
                            {/* <Box display="flex" alignItems="center" pr={3}>
                                    <IconButton>
                                        <CollapseIcon />
                                    </IconButton>
                                    <IconButton>
                                        <ExpendedIcon />
                                    </IconButton>
                                </Box> */}
                        </Box>

                        {/* Second line: Sort by on the left; Total projects on the right */}
                        <Box
                            display="flex"
                            alignItems="center"
                            gap="1rem"
                            sx={{
                                flexDirection: "row",
                                flex: 1,
                                pt: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Roboto",
                                    fontSize: "1rem",
                                    fontWeight: 400,
                                    lineHeight: "18px",
                                    letterSpacing: "0.0025em",
                                    textAlign: "left",
                                }}
                            >
                                Total {projects.length} project(s)
                            </Typography>
                            <FilterProjects data={userAllProjects} />
                            <Popover
                                id={projectFilterAnchorEl ? "simple-popover" : undefined}
                                open={Boolean(projectFilterAnchorEl)}
                                anchorEl={projectFilterAnchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Typography
                                    sx={{ p: 2, fontSize: "20px", fontWeight: 500, pr: 24 }}
                                >
                                    Filter
                                </Typography>
                                <RadioGroup
                                    onChange={(e) =>
                                        setSelectedFilter(e.target.value as ProjectFilterType)
                                    }
                                    value={selectedFilter}
                                    sx={{ padding: 2 }}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio />}
                                        label="All Files"
                                    />
                                    <FormControlLabel
                                        value="figma"
                                        control={<Radio />}
                                        label="Figma"
                                    />
                                    <FormControlLabel
                                        value="figjam"
                                        control={<Radio />}
                                        label="FigJam"
                                    />
                                </RadioGroup>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        margin: 1,
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSelectedFilter("all");
                                            // setFilteredProjects(projects);
                                            setFavouriteProjects(
                                                projects.filter((file) => file.isFavorite === 1)
                                            );
                                            setNonFavouriteProjects(
                                                projects.filter((file) => file.isFavorite === 0)
                                            );

                                            setSelectedFilter("all");
                                            setProjectFilter("all");
                                            handleClose();
                                        }}
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleChangeFilter}
                                    >
                                        Apply Filter
                                    </Button>
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                </StickyHeader>
            )}

            {(projectListLoading || fetchingComments) && (
                <Loader message={loadingMessage} image={loadingImage} />
            )}
            <GridWrapper className="">
                {projectList &&
                    projectList?.length !== 0 &&
                    !projectListLoading &&
                    !fetchingComments && (
                        <>
                            <Box>
                                {favouriteProjects.length > 0 && (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt="1.5rem"
                                        sx={{
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center",
                                            },
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                                md: "row",
                                                lg: "row",
                                                xl: "row",
                                            },
                                            paddingX: {
                                                xs: "0rem",
                                                sm: "0",
                                            },
                                            marginBottom: {
                                                xs: "1.5rem",
                                            },
                                        }}
                                    >
                                        <Box display="flex" margin="0px -8px">
                                            <StarIcon
                                                color="primary"
                                                style={{
                                                    paddingBottom: "10px",
                                                    fontSize: "34px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Favourite ({favouriteProjects.length})
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {favouriteProjects.length > 0 && (
                                    <CardOuter className="m-cards-outer">
                                        {favouriteProjects.map((item) => (
                                            <Box
                                                className="onlyFavMarked unmark"
                                                key={item.projectId}
                                            >
                                                <Cards
                                                    usedIn="projectList"
                                                    editorType={item.editorType}
                                                    item={item}
                                                    isFavorite={item.isFavorite}
                                                    onShareProject={() => {
                                                        setOpenShareModal(
                                                            <ManageTeamModal
                                                                projectId={item.projectId}
                                                                onClose={() =>
                                                                    setOpenShareModal(undefined)
                                                                }
                                                            />
                                                        );
                                                    }}
                                                    handleMarkAsFavourite={() =>
                                                        handleMarkAsFavourite(
                                                            item.projectId,
                                                            item.isFavorite
                                                        )
                                                    }
                                                    onDeleteProject={() =>
                                                        handleRemoveProject(item.projectId)
                                                    }
                                                    filterType={item.fileName}
                                                    createdAt={item.createdAt}
                                                    openAllComments={() => openAllComments(item)}
                                                    openResolvedComments={() =>
                                                        openResolvedComments(item)
                                                    }
                                                    openUnresolvedComments={() =>
                                                        openUnresolvedComments(item)
                                                    }
                                                    openUnreadComments={() =>
                                                        handleOpenUnreadComments(item)
                                                    }
                                                    // openNewComments={() =>
                                                    //     openNewComments(item)
                                                    // }
                                                    openOwnComments={() => openOwnComments(item)}
                                                    allComments={item.allComments}
                                                    myComments={item.myComments}
                                                    newComments={item.newComments}
                                                    resolvedComments={item.resolvedComments}
                                                    unresolvedComments={item.unresolvedComments}
                                                    handleDownloadExcel={() =>
                                                        handleDownloadExcel(item)
                                                    }
                                                    fetchingComments={fetchingComments}
                                                    loadingFiles={projectListLoading}
                                                    prototypeCount={item.prototypeCount || 0}
                                                    handleViewPrototypeLink={() =>
                                                        handleViewPrototypeLink(item)
                                                    }
                                                />
                                            </Box>
                                        ))}
                                    </CardOuter>
                                )}
                            </Box>
                            <Box>
                                {projects.length > 0 ? (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt="1.5rem"
                                        sx={{
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center",
                                            },
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                                md: "row",
                                                lg: "row",
                                                xl: "row",
                                            },
                                            paddingX: {
                                                xs: "0",
                                                sm: "0",
                                            },
                                            marginBottom: {
                                                xs: "1.5rem",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                            }}
                                        >
                                            All Projects ({nonFavouriteProjects.length})
                                        </Typography>
                                    </Box>
                                ) : (
                                    ""
                                )}
                            </Box>
                            <CardOuter className="m-cards-outer">
                                {nonFavouriteProjects.map((item) => (
                                    <Box className="unmark" key={item.projectId}>
                                        <Cards
                                            usedIn="projectList"
                                            editorType={item.editorType}
                                            item={item}
                                            isFavorite={item.isFavorite}
                                            onShareProject={() => {
                                                setOpenShareModal(
                                                    <ManageTeamModal
                                                        projectId={item.projectId}
                                                        onClose={() => setOpenShareModal(undefined)}
                                                    />
                                                );
                                            }}
                                            handleMarkAsFavourite={() =>
                                                handleMarkAsFavourite(
                                                    item.projectId,
                                                    item.isFavorite
                                                )
                                            }
                                            filterType={item.fileName}
                                            createdAt={item.createdAt}
                                            openAllComments={() => openAllComments(item)}
                                            openResolvedComments={() => openResolvedComments(item)}
                                            openUnresolvedComments={() =>
                                                openUnresolvedComments(item)
                                            }
                                            openUnreadComments={() =>
                                                handleOpenUnreadComments(item)
                                            }
                                            openOwnComments={() => openOwnComments(item)}
                                            onDeleteProject={() =>
                                                handleRemoveProject(item.projectId)
                                            }
                                            allComments={item.allComments}
                                            myComments={item.myComments}
                                            newComments={item.newComments}
                                            resolvedComments={item.resolvedComments}
                                            unresolvedComments={item.unresolvedComments}
                                            handleDownloadExcel={() => handleDownloadExcel(item)}
                                            fetchingComments={fetchingComments}
                                            loadingFiles={projectListLoading}
                                            prototypeCount={item.prototypeCount || 0}
                                            handleViewPrototypeLink={() =>
                                                handleViewPrototypeLink(item)
                                            }
                                        />
                                    </Box>
                                ))}
                            </CardOuter>
                        </>
                    )}
                {userAllProjects?.length === 0 ? (
                    <ProjectNotFound onAddNewProject={handleAddNewProject} />
                ) : (
                    (projectList?.length === 0 || searchText.length > 0) && <NoProjectsFound />
                )}
            </GridWrapper>

            {drawerContent && drawerContent}
            {confirmDialog && confirmDialog}
            {openShareModal && openShareModal}
            {openConsentModal && (
                <ConsentFormModal
                    open={openConsentModal}
                    onClose={() => setopenConsentModal(!openConsentModal)}
                    showCloseIcon={false}
                />
            )}
        </Container>
    );
});
