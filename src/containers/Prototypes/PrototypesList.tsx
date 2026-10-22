import { Box } from "@mui/material";
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { ProjectDetailsContext, PrototypePageContext } from "../../contexts";
import {
    processfilteredPrototypes,
    useFetchComments,
    useFetchFigmaImage,
    useFetchPrototypeList,
} from "../../hooks";
import { processPrototypeData } from "../../hooks/customHook";
import { Loader } from "../../stories/components/Loader/Loader";
import { ProcessedPageDataType } from "../../types";
import { getLoadingImage, getLoadingMessage, uniqueKey } from "../../utils";
import { PrototypeAccordion } from "../Prototype";

// Fires `onVisible(nodeId)` once when a row scrolls near the viewport, so we
// only render Figma thumbnails for pages the user actually reaches instead of
// requesting all pages up front (which trips Figma's rate limit on big files).
const LazyRow = ({
    nodeId,
    onVisible,
    children,
}: {
    nodeId: string;
    onVisible: (id: string) => void;
    children: ReactNode;
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    onVisible(nodeId);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // start fetching just before the row is visible
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [nodeId, onVisible]);
    return <div ref={ref}>{children}</div>;
};

export const PrototypesList = () => {
    const { projectId, searchInput, selectedBranch } = useContext(ProjectDetailsContext);
    const [processedPrototypeData, setProcessedPrototypeData] = useState<ProcessedPageDataType[]>(
        []
    );
    const [filteredPrototypeData, setFilteredPrototypeData] = useState<ProcessedPageDataType[]>([]);
    const [pageExpandMap, setPageExpandMap] = useState<Map<number, boolean>>(new Map());

    const { data: commentsData, isFetching: isFetchingComments } = useFetchComments(
        projectId,
        selectedBranch?.key || ""
    );
    const { data: prototypes = [], isFetching: isFetchingPrototypes } = useFetchPrototypeList(
        selectedBranch?.key || ""
    );

    const { drawerContent, isVersionUpdated, setVersionUpdated } = useContext(PrototypePageContext);

    // Track which page rows have scrolled into view; only those get fetched.
    const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(new Set());
    const visibleRef = useRef<Set<string>>(new Set());
    const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Batch rapid scroll reveals into a single state update: during fast
    // scrolling we accumulate node ids in a ref and only commit to state (which
    // triggers one re-render + one fetch) after scrolling settles — otherwise
    // every row entering view causes a re-render + refetch and the list janks.
    const markVisible = useCallback((nodeId: string) => {
        if (!nodeId || visibleRef.current.has(nodeId)) return;
        visibleRef.current.add(nodeId);
        if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
        flushTimerRef.current = setTimeout(() => {
            setVisibleNodeIds(new Set(visibleRef.current));
        }, 250);
    }, []);
    useEffect(
        () => () => {
            if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
        },
        []
    );

    const nodeIdsToFetch = useMemo(
        () =>
            filteredPrototypeData
                .map((page) => page.nodeId)
                .filter((nodeId) => nodeId && visibleNodeIds.has(nodeId)),
        [filteredPrototypeData, visibleNodeIds]
    );
    const { data: figmaImage, isLoading: figmaImageLoading } = useFetchFigmaImage(
        nodeIdsToFetch,
        projectId
    );

    const handleExpandToggle = (status: boolean, index: number) => {
        const updatedData = Array.from(filteredPrototypeData);
        updatedData[index].expanded = status;

        const updatedMap = pageExpandMap;
        updatedMap.set(updatedData[index].pageId, status);
        setPageExpandMap(updatedMap);

        setFilteredPrototypeData(updatedData);
    };

    const getProcessedPrototypeData = () => {
        if (commentsData && prototypes.length > 0) {
            const processedData = processPrototypeData(commentsData, prototypes, pageExpandMap);
            setProcessedPrototypeData(processedData);
            setFilteredPrototypeData(processedData);
        }
    };

    useEffect(() => {
        if (commentsData && prototypes) {
            getProcessedPrototypeData();
        }
    }, [commentsData, prototypes]);

    useEffect(() => {
        if (isVersionUpdated) {
            getProcessedPrototypeData();
            setVersionUpdated(false);
        }
    }, [isVersionUpdated]);

    useEffect(() => {
        const filteredPrototypes = processfilteredPrototypes(searchInput, processedPrototypeData);
        setFilteredPrototypeData(filteredPrototypes);
    }, [searchInput, processedPrototypeData]);

    if (isFetchingComments || isFetchingPrototypes) {
        return (
            <Loader
                message={getLoadingMessage("prototypes")}
                image={getLoadingImage("prototypes")}
            />
        );
    }

    return (
        <Box sx={{ overflowX: "auto", margin: "1rem 1rem" }}>
            {filteredPrototypeData.map((page, index) => (
                <LazyRow
                    key={uniqueKey(`page-${page.pageId}`)}
                    nodeId={page.nodeId}
                    onVisible={markVisible}
                >
                    <PrototypeAccordion
                        data={page}
                        onExpandToggle={(status) => handleExpandToggle(status, index)}
                        figmaImage={figmaImage}
                        figmaImageLoading={figmaImageLoading}
                    />
                </LazyRow>
            ))}
            {drawerContent && drawerContent}
        </Box>
    );
};
