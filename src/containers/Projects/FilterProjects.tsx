"use client";

import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";

import sortIcon from "../../assets/sort-by.svg";
import { ProjectFilterContext } from "../../contexts/ProjectFilterContext";
import { getFilter, saveCustomRange, saveFilter } from "../../services/ProjectService";
import { FilterType, IUserFile } from "../../types";
import { CustomRangeFilter } from "./CustomRangeFilter";

export const FilterProjects = ({ data }: { data?: IUserFile[] }) => {
    const [isOpenCustomRange, setOpenCustomRange] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { filter, setFilter: setFilterCtxValue, setRange: setRangeCtxValue } = useContext(ProjectFilterContext);

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

    const handleApplyCustomRange = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
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
    const year = new Date().getFullYear();
    const options: { value: FilterType; label: string }[] = data?.length
        ? [
              { value: "View All", label: "View All" },
              { value: "This Week", label: "This Week" },
              { value: "Last 30 Days", label: "Last 30 Days" },
              { value: "Last 6 Months", label: "Last 6 Months" },
              { value: "This Year", label: `This Year (${year})` },
              { value: "Last Year", label: `Last Year (${year - 1})` },
              { value: "Custom Range", label: "Custom Range" },
          ]
        : [{ value: "View All", label: "View All" }];

    return (
        <div className="ml-auto flex flex-col items-end pr-0 md:pr-[30px]">
            <div className="flex flex-col items-start md:flex-row md:items-center">
                <Button
                    variant="text"
                    onClick={handleOpenPopover}
                    endIcon={
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={sortIcon.src} alt="sortIcon" />
                    }
                >
                    Sort By : {filter || "Select Date Range"}
                </Button>

                {!isOpenCustomRange && (
                    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
                        <ul className={data?.length ? "w-[170px] py-2 max-md:w-[370px]" : "w-[170px] py-2"}>
                            {options.map(({ value, label }) => (
                                <li key={value}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectFilter(value)}
                                        className="text-ink hover:bg-surface-sunk w-full px-4 py-2 text-left text-sm"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
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
            </div>
        </div>
    );
};
