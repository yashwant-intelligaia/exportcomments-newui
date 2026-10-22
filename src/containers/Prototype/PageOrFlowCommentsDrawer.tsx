"use client";

import React from "react";

import { Divider } from "@/components/ui/Display";

import { EcComment, EcDrawer } from "../../stories/components";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { CommentDataType } from "../../types/comment";
import { NoCommentsIcon } from "../../utils";

type PageOrFlowCommentsDrawerProps = {
    title: string;
    subTitle?: string;
    onClose: () => void;
    data: CommentDataType[];
};

const PageOrFlowCommentsDrawer: React.FC<PageOrFlowCommentsDrawerProps> = ({ title, subTitle, onClose, data }) => (
    <EcDrawer
        open
        onClose={onClose}
        direction="right"
        customeWidth
        title={
            <div>
                <h5 className="mb-1.5 font-sans text-xl font-medium tracking-normal">{title}</h5>
                {subTitle && <h6 className="mb-1.5 font-sans text-lg font-normal tracking-normal">{subTitle}</h6>}
            </div>
        }
    >
        {data.length ? (
            <div className="p-4">
                <p className="text-base font-bold">Recent Comments</p>
                {data
                    .slice()
                    .reverse()
                    .map(({ user: { imgUrl, handle }, createdAt, message }, index) => (
                        <React.Fragment key={`${createdAt}-${index}`}>
                            <EcComment name={handle} src={imgUrl} date={createdAt} message={message} />
                            <Divider className="my-4" />
                        </React.Fragment>
                    ))}
            </div>
        ) : (
            <div className="mt-20 flex flex-col items-center justify-center">
                <EcImage aria-label="No Comments">
                    <NoCommentsIcon />
                </EcImage>
                <p className="mt-10 text-xl font-normal">No Comment Found</p>
            </div>
        )}
    </EcDrawer>
);

export { PageOrFlowCommentsDrawer };
