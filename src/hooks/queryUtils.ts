"use client";

import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

/**
 * react-query v5 removed per-query `onSettled`. This keeps the old behaviour: `onSettled` runs
 * every time a fetch settles (success or error) with the latest data/error.
 */
export function useQueryWithSettled<TData = unknown, TError = Error, TKey extends QueryKey = QueryKey>(
    options: UseQueryOptions<TData, TError, TData, TKey>,
    onSettled?: (data: TData | undefined, error: TError | null) => void,
): UseQueryResult<TData, TError> {
    const query = useQuery<TData, TError, TData, TKey>(options);
    const callback = useRef(onSettled);
    callback.current = onSettled;

    const { dataUpdatedAt, errorUpdatedAt, isFetching, isSuccess, isError, data, error } = query;
    useEffect(() => {
        if (!isFetching && (isSuccess || isError)) {
            callback.current?.(data, error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdatedAt, errorUpdatedAt, isFetching]);

    return query;
}
