"use client";

import { Check } from "lucide-react";
import { useContext, useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";

import { PrototypePageContext } from "../../contexts/PrototypePageContext";
import { EcTooltip } from "../../stories/components";
import { CommentDataType, ProcessedPrototypeDataType } from "../../types";
import { copyToClipboard, openLink, uniqueKey } from "../../utils";
import { CommentIcon, CopyIcon, PlayIcon, PlusIcon, VersionIcon } from "../../utils/icons";
import { NewCreateVersionDrawer } from "./NewCreateVersionDrawer";
import { NewFlowVersionDrawer } from "./NewFlowVersionDrawer";
import { PageOrFlowCommentsDrawer } from "./PageOrFlowCommentsDrawer";

interface PrototypeAccordionDetailsPropsType {
    prototypes: ProcessedPrototypeDataType[];
    pageId: number;
}

const PrototypeAccordionDetails = (props: { data: PrototypeAccordionDetailsPropsType }) => {
    const {
        data: { prototypes = [], pageId },
    } = props;

    const { setDrawerContent } = useContext(PrototypePageContext);

    const [copiedPrototype, setCopiedPrototype] = useState<{
        [key: string]: boolean;
    }>({});

    const handleCopyLink = (prototypeId: number, prototypeLink?: string) => {
        if (prototypeLink) {
            copyToClipboard(prototypeLink)
                .then(() => {
                    setCopiedPrototype((prevState) => ({
                        ...prevState,
                        [prototypeId]: true,
                    }));
                    setTimeout(() => {
                        setCopiedPrototype((prevState) => ({
                            ...prevState,
                            [prototypeId]: false,
                        }));
                    }, 2000);
                })
                .catch(() => {});
        }
    };

    const handleViewPrototypeComments = (prototypeComments: CommentDataType[], name: string) => {
        setDrawerContent(
            <PageOrFlowCommentsDrawer
                title="Comments"
                subTitle={name}
                onClose={() => setDrawerContent(undefined)}
                data={prototypeComments}
            />,
        );
    };
    const handleCreateNewVersion = (prototypeId: number, nodeId: string, prototypeTitle: string) => {
        setDrawerContent(
            <NewCreateVersionDrawer
                title="Create New Version"
                prototypeId={prototypeId}
                nodeId={nodeId}
                prototypeTitle={prototypeTitle}
                open
                onClose={() => setDrawerContent(undefined)}
            />,
        );
    };
    const handleViewVersionList = (prototypeId: number, nodeId: string, prototypeTitle: string) => {
        setDrawerContent(
            <NewFlowVersionDrawer
                open
                data={{
                    prototypeId,
                    nodeId,
                    prototypeTitle,
                    pageId,
                }}
                onClose={() => setDrawerContent(undefined)}
            />,
        );
    };

    if (prototypes.length === 0) return <></>;

    return (
        <div className="mt-6 pr-4 pb-4 pl-4 sm:pl-10 md:pl-[62px]">
            <div className="border-line grid max-h-[220px] grid-cols-12 items-center gap-x-2 gap-y-8 overflow-y-auto border-t border-dashed pt-4">
                {prototypes.map(
                    ({ prototypeId, prototypeTitle, versions = [], prototypeLink, prototypeComments = [], nodeId }) => (
                        <div
                            key={uniqueKey(`prototype-detail-${prototypeId}`)}
                            className="col-span-12 grid grid-cols-12 items-center gap-x-2 gap-y-4"
                        >
                            <div className="col-span-12 md:col-span-3" />
                            <div className="text-ink col-span-12 flex items-center gap-0.5 text-sm font-medium md:col-span-4">
                                <IconButton
                                    aria-label="Open prototype"
                                    onClick={() => prototypeLink && openLink({ url: prototypeLink, target: "_blank" })}
                                >
                                    <PlayIcon />
                                </IconButton>
                                <span>{prototypeTitle}</span>
                                {copiedPrototype[prototypeId] ? (
                                    <EcTooltip title="Link Copied" placement="top" arrow>
                                        <IconButton aria-label="Link copied">
                                            <Check className="size-5" />
                                        </IconButton>
                                    </EcTooltip>
                                ) : (
                                    <IconButton
                                        aria-label="Copy link"
                                        onClick={() => handleCopyLink(prototypeId, prototypeLink)}
                                    >
                                        <CopyIcon />
                                    </IconButton>
                                )}
                            </div>
                            <div className="text-ink col-span-12 flex items-center gap-0.5 text-sm font-medium md:col-span-2">
                                <IconButton
                                    aria-label="View comments"
                                    onClick={() => handleViewPrototypeComments(prototypeComments, prototypeTitle)}
                                >
                                    <CommentIcon />
                                </IconButton>
                                {prototypeComments.length}
                            </div>
                            <div className="text-ink col-span-12 flex items-center gap-0.5 text-sm font-medium md:col-span-3">
                                <button
                                    type="button"
                                    className="hover:text-blue-ink flex items-center gap-1"
                                    onClick={() => handleViewVersionList(prototypeId, nodeId, prototypeTitle)}
                                >
                                    <span className="p-2">
                                        <VersionIcon />
                                    </span>
                                    {versions.length}
                                </button>
                                <span className="bg-line mx-1.5 h-4 w-px" />
                                <Button
                                    variant="text"
                                    size="small"
                                    className="text-body hover:text-blue-ink text-xs"
                                    onClick={() => handleCreateNewVersion(prototypeId, nodeId, prototypeTitle)}
                                >
                                    <PlusIcon /> Create new version
                                </Button>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export { PrototypeAccordionDetails };
