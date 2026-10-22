"use client";

import { ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

import { cn } from "@/components/ui/cn";
import { useParams } from "@/utils/navigation";

import placeHolderImg from "../../assets/imagePlaceholder.svg";
import previewLoaderImg from "../../assets/previewLoader.gif";
import { EcModal } from "../../stories/components";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { CommentDataType, ProcessedPrototypeDataType, VersionDataType } from "../../types";
import { CommentIcon, PlayIcon, VersionIcon } from "../../utils/icons";

interface PrototypeAccordionSummaryDataType {
    nodeId: string;
    pageTitle: string;
    comments: CommentDataType[];
    prototypes: ProcessedPrototypeDataType[];
    totalVersions: VersionDataType[];
    expanded: boolean;
}

interface PrototypeAccordionSummaryPropsType {
    data: PrototypeAccordionSummaryDataType;
    onExpandToggle: (status: boolean) => void;
    figmaImage?: Record<string, string>;
    figmaImageLoading: boolean;
}

const Stat = ({ label, className, children }: { label: string; className: string; children: ReactNode }) => (
    <div className={className}>
        <span className="text-body block text-xs leading-7">{label}</span>
        <span className="text-ink flex items-center gap-2 text-sm font-medium">{children}</span>
    </div>
);

const PrototypeAccordionSummary = ({
    data: { nodeId, pageTitle, comments = [], prototypes = [], totalVersions, expanded },
    onExpandToggle,
    figmaImage,
    figmaImageLoading,
}: PrototypeAccordionSummaryPropsType) => {
    const { projectId }: { projectId: string } = useParams();
    const [previewModal, setPreviewModal] = useState<JSX.Element | undefined>(undefined);
    const canExpand = prototypes.length > 0;

    const handlePreviewImageClick = (imageUrl: string, title: string) => {
        setPreviewModal(
            <EcModal
                size="md"
                open
                onClose={() => setPreviewModal(undefined)}
                title={<h4 className="mb-3 font-sans text-2xl font-bold tracking-normal">{title}</h4>}
                showCloseIcon
                textAlign="left"
            >
                <div className="mt-6 max-h-[550px] overflow-y-scroll">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Large flow" width={976} className="block max-w-full" />
                </div>
            </EcModal>,
        );
    };

    const getPreviewImgSrc = (id?: string): string => {
        if (figmaImageLoading) return previewLoaderImg.src;
        if (!figmaImage) return placeHolderImg.src;
        if (id && figmaImage?.[id]) return figmaImage[id];
        return placeHolderImg.src;
    };

    return (
        <>
            {previewModal}
            <div className="flex w-full cursor-default items-center gap-2 px-4 py-3" aria-controls={pageTitle}>
                <button
                    type="button"
                    aria-expanded={expanded}
                    aria-label="show more"
                    disabled={!canExpand}
                    onClick={() => onExpandToggle(!expanded)}
                    className={cn(
                        "hover:text-blue-ink rounded-full p-2 transition-transform",
                        expanded && "rotate-90",
                        !canExpand && "text-line pointer-events-none",
                    )}
                >
                    <ChevronRight className="size-4" />
                </button>
                <div className="grid w-full grid-cols-12 items-center gap-x-2 gap-y-4">
                    <div className="col-span-3 lg:col-span-1">
                        <EcImage
                            className={cn(
                                "size-[3.25rem] overflow-hidden border-2 border-[#b4b4bb]",
                                figmaImageLoading ? "cursor-not-allowed" : "cursor-pointer",
                            )}
                            onClick={() =>
                                figmaImageLoading
                                    ? undefined
                                    : handlePreviewImageClick(figmaImage?.[nodeId] || "", pageTitle)
                            }
                            id={`${projectId}-${pageTitle}-${nodeId}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={getPreviewImgSrc(nodeId)} alt={pageTitle} />
                        </EcImage>
                    </div>
                    <Stat label="Page Name" className="col-span-9 sm:col-span-11 md:col-span-2">
                        {pageTitle}
                    </Stat>
                    <Stat label="Total Prototypes" className="col-span-4">
                        <PlayIcon /> {prototypes.length}
                    </Stat>
                    <Stat label="Total Comments" className="col-span-4 lg:col-span-2">
                        <CommentIcon /> {comments.length}
                    </Stat>
                    <Stat label="Total Versions" className="col-span-4 md:col-span-3 lg:col-span-2">
                        <VersionIcon />
                        {totalVersions?.length}
                    </Stat>
                </div>
            </div>
        </>
    );
};

export { PrototypeAccordionSummary };
