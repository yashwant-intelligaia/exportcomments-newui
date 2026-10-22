import { FilterType } from "../types";

export const getFilter = () => sessionStorage.getItem("selectedFilter") as FilterType;

export const saveFilter = (filter: FilterType) => {
    sessionStorage.setItem("selectedFilter", filter);
};

export const removeFilter = () => {
    sessionStorage.removeItem("selectedFilter");
};

export const getCustomRange = () => ({
    startDate: sessionStorage.getItem("filterStartDate"),
    endDate: sessionStorage.getItem("filterEndDate"),
});

export const saveCustomRange = (startDate: string, endDate: string) => {
    sessionStorage.setItem("filterStartDate", startDate);
    sessionStorage.setItem("filterEndDate", endDate);
};

export const removeCustomRange = () => {
    sessionStorage.removeItem("filterStartDate");
    sessionStorage.removeItem("filterEndDate");
};
