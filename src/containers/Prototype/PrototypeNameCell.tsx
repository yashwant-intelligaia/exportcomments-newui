"use client";

import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import desktopIcon from "../../assets/desktop-icon.svg";
import placeHolderImg from "../../assets/imagePlaceholder.svg";
import previewLoaderImg from "../../assets/previewLoader.gif";
import { useFetchFigmaImage } from "../../hooks";
import { EcTooltip } from "../../stories/components";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { copyToClipboard } from "../../utils";
import { Cell } from "./Cell";

interface PrototypeNameCellPropsType {
    data: {
        name: string;
        nodeId: string;
        prototypeLink: string;
    };
    projectId: string;
    onClick: (imageUrl: string) => void;
}

export const PrototypeNameCell = ({ onClick, projectId, data }: PrototypeNameCellPropsType) => {
    const { name, nodeId, prototypeLink } = data;
    const [isCopied, setIsCopied] = useState(false);
    const { data: figmaImage, isLoading: figmaImageLoading } = useFetchFigmaImage([nodeId], parseInt(projectId, 10));
    const handleCopyLink = () => {
        copyToClipboard(prototypeLink).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const getPreviewImgSrc = (id?: string): string => {
        if (figmaImageLoading) return previewLoaderImg.src;
        if (!figmaImage) return placeHolderImg.src;
        if (id && figmaImage[id]) return figmaImage[id];
        return placeHolderImg.src;
    };

    return (
        <Cell>
            <EcImage
                className={`h-[88px] w-[148px] overflow-hidden rounded-[5px] border-2 border-[#b4b4bb] ${figmaImageLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => (figmaImageLoading ? undefined : onClick(figmaImage[nodeId]))}
                id={`${projectId}-${name}-${nodeId}`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getPreviewImgSrc(nodeId)} alt={name} />
            </EcImage>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={desktopIcon.src} alt="desktop" className="mx-2.5" />
            <a target="_blank" rel="noreferrer" href={prototypeLink} className="mr-2.5 cursor-pointer text-sm font-medium text-blue-ink">
                {name}
            </a>
            {isCopied ? (
                <EcTooltip title="Link Copied" placement="top" arrow>
                    <Check className="size-5 text-blue-ink" />
                </EcTooltip>
            ) : (
                <button type="button" aria-label="Copy link" onClick={handleCopyLink}>
                    <Copy className="size-5 cursor-pointer text-blue-ink" />
                </button>
            )}
        </Cell>
    );
};
