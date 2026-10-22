"use client";

import { SbAvatar } from "../../../stories/components/avatar/Avatar";

/** Accepts either a grid cell ({ row }) or a plain comment row. */
export const CreatedByCell = ({ value }: { value: any }) => {
    const comment = value.row ?? value;
    return (
        <div className="my-1 flex items-center">
            <SbAvatar imageAlt="profile" size="small" imageSrc={comment?.user?.imgUrl} />
            <span className="ml-2 w-25 truncate leading-none">{comment?.userName}</span>
        </div>
    );
};
