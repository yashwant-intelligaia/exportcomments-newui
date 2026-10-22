import { Box, Button, List, ListItem, ListItemButton, Popover, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import sortIcon from "../../assets/sort-by.svg";
import { ProjectFilterContext } from "../../contexts/ProjectFilterContext";
import { getFilter, saveCustomRange, saveFilter } from "../../services/ProjectService";
import { FilterType, IUserFile } from "../../types";
import { CustomRangeFilter } from "./CustomRangeFilter";

export const FilterProjects = ({ data }: { data?: IUserFile[] }) => {
    const [isOpenCustomRange, setOpenCustomRange] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const {
        filter,
        setFilter: setFilterCtxValue,
        setRange: setRangeCtxValue,
    } = useContext(ProjectFilterContext);

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleCancelCustomRange = () => {
        handleClosePopover();
        setOpenCustomRange(false);
    };

    const handleCloseCustomRange = () => {
        setOpenCustomRange(false);
    };

    const handleOpenPopover = (event: any) => {
        setOpenCustomRange(false);
        setAnchorEl(event.currentTarget);
    };

    const handleSelectFilter = (value: FilterType) => {
        if (value === "Custom Range") {
            setOpenCustomRange(true);
        } else {
            setOpenCustomRange(false);
            setFilterCtxValue(value);
            saveFilter(value);
            handleClosePopover();
        }
    };

    const handleApplyCustomRange = ({
        startDate,
        endDate,
    }: {
        startDate: string;
        endDate: string;
    }) => {
        setRangeCtxValue({ startDate, endDate });
        setFilterCtxValue("Custom Range");
        saveFilter("Custom Range");
        saveCustomRange(startDate, endDate);
        setOpenCustomRange(false);
    };

    // Side effect to be executed when component is mounted
    useEffect(() => {
        const selectedFilter = getFilter();
        if (selectedFilter) {
            setFilterCtxValue(selectedFilter);
        } else {
            setFilterCtxValue("View All");
        }
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingRight: {
                    xl: "30px",
                    lg: "30px",
                    md: "30px",
                    sm: "0px",
                    xs: "0px",
                },

                marginLeft: "auto",
            }}
        >
            <Box
                sx={{
                    display: "flex",
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
                }}
            >
                <Button
                    endIcon={<img src={sortIcon} alt="sortIcon" />}
                    sx={{ textTransform: "none", color: "inherit" }}
                    onClick={handleOpenPopover}
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
                        Sort By : {filter || "Select Date Range"}
                    </Typography>
                </Button>

                {!isOpenCustomRange && (
                    // TODO: Use EcPopover instead
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        {data?.length ? (
                            <List
                                sx={{
                                    width: {
                                        xl: "170px",
                                        lg: "170px",
                                        md: "170px",
                                        sm: "370px",
                                        xs: "370px",
                                    },
                                }}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleSelectFilter("View All")}>
                                        View All
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleSelectFilter("This Week")}>
                                        This Week
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => handleSelectFilter("Last 30 Days")}
                                    >
                                        Last 30 Days
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => handleSelectFilter("Last 6 Months")}
                                    >
                                        Last 6 Months
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleSelectFilter("This Year")}>
                                        This Year ({new Date().getFullYear()})
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleSelectFilter("Last Year")}>
                                        Last Year ({new Date().getFullYear() - 1})
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => handleSelectFilter("Custom Range")}
                                    >
                                        Custom Range
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        ) : (
                            <List
                                sx={{
                                    width: "170px",
                                }}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleSelectFilter("View All")}>
                                        View All
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        )}
                    </Popover>
                )}
                {isOpenCustomRange && (
                    <CustomRangeFilter
                        open={isOpenCustomRange}
                        onClose={handleCloseCustomRange}
                        onApply={handleApplyCustomRange}
                        onCancel={handleCancelCustomRange}
                        anchorEl={anchorEl}
                        handleClosePopover={handleClosePopover}
                    />
                )}
            </Box>
        </Box>
    );
};
