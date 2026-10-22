"use client";

import { useHistory } from "@/utils/navigation";

export const SbLogo = () => {
    const history = useHistory();

    return (
        <div>
            <button type="button" onClick={() => history.push("/")} className="flex items-center leading-none max-sm:[&_img]:w-[140px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/export-comment.svg" alt="Export Comment" />
            </button>
        </div>
    );
};
