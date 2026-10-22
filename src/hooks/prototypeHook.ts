"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { UserContext } from "../contexts";
import { ProcessedPageDataType } from "../types";
import { api, messages } from "../utils";
import { get } from "../utils/object";

const FIGMA_IMG = "figma-image";

const useFetchFigmaImage = (nodeIds: string[], projectId: number) => {
    const { token } = UserContext();
    return useQuery({
        queryKey: [FIGMA_IMG, ...nodeIds],
        queryFn: async () => {
            const { data } = await api({
                version: "v2",
                url: `${APP_CONSTANT.webApi.fetchFigmaImage}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                data: { nodeIds, projectId },
            });

            return get(data, "data", {}) as any;
        },
        enabled: nodeIds.length > 0,
        // Keep already-loaded thumbnails visible while lazy-loading fetches
        // the newly-scrolled-in pages, instead of flashing all rows to the loader.
        placeholderData: keepPreviousData,
        retry: 2,
        // Exponential backoff (1s, 2s, capped at 15s) instead of hammering the rate-limited Figma images endpoint.
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 15000),
        refetchOnMount: false,
        staleTime: Infinity,
    });
};

const processfilteredPrototypes = (searchKey: string, data: ProcessedPageDataType[]) => {
    const lowerCaseSearchKey = searchKey.toLowerCase();

    const filteredData = data.filter((page) => {
        const matchesPageTitle = page.pageTitle.toLowerCase().includes(lowerCaseSearchKey);
        const matchesPrototypes = page.prototypes.some((prototype) =>
            prototype.prototypeTitle.toLowerCase().includes(lowerCaseSearchKey),
        );
        return matchesPageTitle || matchesPrototypes;
    });

    return filteredData;
};

export { processfilteredPrototypes, useFetchFigmaImage };
