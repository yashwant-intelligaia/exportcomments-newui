"use client";

import Icon from "../../assets/Icon.svg";
import { useFetchFlowList } from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { NewFlowVersionCard } from "./NewFlowVersionCard";

interface FlowVersionDrawerPropsType {
    data: {
        prototypeId: number;
        nodeId: string;
        prototypeTitle: string;
        pageId: number;
    };
    open: boolean;
    onClose: () => void;
}

export const NewFlowVersionDrawer = ({ data: { prototypeId, nodeId, prototypeTitle, pageId }, open, onClose }: FlowVersionDrawerPropsType) => {
    const { data: versionList = [], refetch: versionListRefetch } = useFetchFlowList(prototypeId);

    return (
        <EcDrawer
            title={
                <span className="mb-5 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={Icon.src} alt="Prototype Icon" className="mr-3.5 size-5" />
                    <span className="text-xl font-medium">{prototypeTitle}</span>
                </span>
            }
            open={open}
            direction="right"
            onClose={onClose}
            customeWidth
        >
            <div className="mt-5 mb-4 w-[330px] max-w-[700px] rounded-md px-2.5 sm:w-auto">
                {versionList?.map((version: any) => (
                    <NewFlowVersionCard key={version.versionId} data={{ version, nodeId, pageId }} refetchCallback={versionListRefetch} />
                ))}
            </div>
        </EcDrawer>
    );
};
