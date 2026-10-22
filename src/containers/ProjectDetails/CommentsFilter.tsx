import {
    CloseRounded as CloseRoundedIcon,
    SearchRounded as SearchRoundedIcon,
} from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ProjectDetailsContext } from "../../contexts";
import { useCommentMutation } from "../../hooks";
import { CommentFilterType } from "../../types";
import { uniqueKey, useDebounce } from "../../utils";

interface CommentFilterOptionType {
    id: CommentFilterType;
    name: string;
    record?: number;
}

export const CommentsFilter = () => {
    const history = useHistory();
    const [value, setValue] = useState("");
    const searchInputValue = useDebounce(value, 1000);
    const [openMobileInput, setOpenMobileInput] = useState(false);
    const [isMarkAsReadDisabled, setMarkAsReadDisabled] = useState<boolean>(true);
    const {
        projectId,
        projectData,
        setSearchInput,
        commentfilter,
        setCommentFilter,
        selectedBranch,
    } = useContext(ProjectDetailsContext);
    const {
        markAsRead: { mutate: mutateMarkAsRead },
    } = useCommentMutation();

    useEffect(() => {
        setSearchInput(searchInputValue);
    }, [searchInputValue]);

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleCommentsMarkAsRead = () => {
        mutateMarkAsRead({ projectId, branchKey: selectedBranch?.key || "" });
    };

    const handleSelectFilterOption = (id: CommentFilterType) => {
        setCommentFilter(id);
        history.push(`/project/${projectId}/details?view=comments&filter=${id}`);
    };

    const filterOptions: CommentFilterOptionType[] = [
        {
            id: "all",
            name: "All Comments",
            record: projectData?.allComments,
        },
        {
            id: "resolved",
            name: "Resolved Comments",
            record: projectData?.resolvedComments,
        },
        {
            id: "unresolved",
            name: "Unresolved Comments",
            record: projectData?.unresolvedComments,
        },
        {
            id: "unread",
            name: "Unread Comments",
            record: projectData?.newComments,
        },
        // {
        //     id: "unread-replies",
        //     name: "Unread Replies",
        //     record: projectData?.newComments,
        // },
        {
            id: "my",
            name: "My Comments",
            record: projectData?.myComments,
        },
    ];

    useEffect(() => {
        if (projectData) {
            setMarkAsReadDisabled(projectData.newComments === 0);
        }
    }, [projectData]);

    return (
        <>
            <Box>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "end",
                        minWidth: "55%",
                        maxWidth: "100%",
                        gap: "0.5rem",
                    }}
                    sx={{
                        marginTop: {
                            xs: "15px",
                            sm: "0px",
                            md: "0px",
                            lg: "0px",
                            xl: "-10px",
                        },
                        marginBottom: {
                            xs: "5px",
                            sm: "0px",
                            md: "0px",
                            lg: "0px",
                            xl: "0px",
                        },
                    }}
                >
                    {/* Search comments by comments category */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                            variant="body2"
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "block",
                                    md: "block",
                                    lg: "block",
                                    xl: "block",
                                },
                            }}
                        >
                            I want to view
                        </Typography>
                        <Box sx={{ minWidth: 180 }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={commentfilter}
                                    label="Select Comments Filter"
                                    onChange={() => {}}
                                    sx={{
                                        ".MuiOutlinedInput-notchedOutline": {
                                            border: "0px",
                                        },
                                        color: "#2979ff",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        paddingLeft: "5px",
                                        lineHeight: "1.4375em",
                                    }}
                                >
                                    {filterOptions.map((item, index: number) => (
                                        <MenuItem
                                            role="presentation"
                                            key={uniqueKey(`filter-option-${index}`)}
                                            value={item.id}
                                            className="mui-dropdown-list-item"
                                            onClick={() => {
                                                handleSelectFilterOption(item.id);
                                            }}
                                        >
                                            {item.name} ({item.record})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    {/* TODO: fix alignment for desktop view */}
                    <Box
                        sx={{
                            right: 25,
                            display: "flex",
                            alignItems: "center",
                            position: {
                                xl: "static",
                                lg: "static",
                                md: "static",
                                sm: "static",
                                xs: "absolute",
                            },
                        }}
                    >
                        <Box>
                            <Button
                                disabled={isMarkAsReadDisabled}
                                sx={{ textTransform: "inherit" }}
                                onClick={handleCommentsMarkAsRead}
                            >
                                Mark as Read
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: {
                                    xl: "none",
                                    lg: "none",
                                    md: "none",
                                    sm: "none",
                                    xs: "block",
                                },
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    setOpenMobileInput(!openMobileInput);
                                }}
                            >
                                {openMobileInput ? (
                                    <CloseRoundedIcon />
                                ) : (
                                    <SearchRoundedIcon className="search-inline-ic" />
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Separator */}
                    <Box
                        sx={{
                            backgroundColor: "#9e9e9e",
                            height: "23px",
                            width: "1px",
                            margin: "0 12px",
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "none",
                                lg: "inline-block",
                            },
                        }}
                    />
                    {/* Separator */}
                    <Box
                        sx={{
                            width: {
                                xs: "100%", // 0px - 600px
                                sm: "320px", // 600px - 960px
                                md: "330px", // 960px - 1280px
                            },
                        }}
                        display={{
                            xs: "none",
                            sm: "block",
                        }}
                    >
                        <Input
                            value={value}
                            style={{ width: "100%" }}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchRoundedIcon />
                                </InputAdornment>
                            }
                            placeholder="Search"
                            autoComplete="off"
                            onChange={handleInputOnChange}
                        />
                    </Box>
                </Box>
            </Box>
            {/* Search Box for Mobile Screens */}
            {openMobileInput && (
                <Box
                    sx={{
                        width: {
                            xs: "100%", // 0px - 600px
                        },
                    }}
                    display={{
                        xs: "block",
                        sm: "none",
                    }}
                >
                    <Input
                        value={value}
                        style={{ width: "100%" }}
                        id="mobile-input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        }
                        autoComplete="off"
                        placeholder="Search"
                        onChange={handleInputOnChange}
                    />
                </Box>
            )}
            {/* Search Box for Mobile Screens Ends */}
        </>
    );
};
