"use client";

import { MessageSquare } from "lucide-react";

export const NoCommentsFound = () => (
    <div className="relative top-[100px] flex flex-wrap content-center justify-center text-lg leading-[25px] font-medium text-ink">
        <span className="mb-5 flex size-[150px] items-center justify-center rounded-full bg-surface-sunk">
            <MessageSquare className="size-10 text-muted" />
        </span>
        <div className="flex w-full flex-wrap justify-center">
            No Comments Found
            <p className="mt-1 w-full text-center text-sm leading-5 font-normal text-muted">
                There seems to be no comments available to show
                <span className="block">Try in some other time.</span>
            </p>
        </div>
    </div>
);
