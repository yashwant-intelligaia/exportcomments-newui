"use client";

import { useEffect, useMemo, useRef } from "react";

import { debounce } from "../utils/object";

const useDebounce = (callback: any, time?: number) => {
    const ref = useRef<any>(undefined);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, time || 1000);
    }, []);

    return debouncedCallback;
};

export { useDebounce };
