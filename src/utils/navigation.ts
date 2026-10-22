"use client";

import { useParams as useNextParams, usePathname, useRouter, useSearchParams } from "next/navigation";

/* Thin adapters so call sites keep a small, router-agnostic API on top of next/navigation. */

const absolute = (to: string) => (to.startsWith("/") ? to : `/${to}`);

export const useHistory = () => {
    const router = useRouter();
    return {
        push: (to: string) => router.push(absolute(to)),
        replace: (to: string) => router.replace(absolute(to)),
        goBack: () => router.back(),
    };
};

export const useParams = <T extends Record<string, string> = Record<string, string>>() =>
    useNextParams() as unknown as T;

export const useLocation = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();
    return { pathname, search: query ? `?${query}` : "" };
};
