import { ContentCopy as ContentCopyIcon, Done as DoneIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
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

export const PrototypeNameCell = (props: PrototypeNameCellPropsType) => {
    const { onClick, projectId, data } = props;
    const { name, nodeId, prototypeLink } = data;
    const [isCopied, setIsCopied] = useState(false);
    const { data: figmaImage, isLoading: figmaImageLoading } = useFetchFigmaImage(
        [nodeId],
        parseInt(projectId, 10)
    );
    const handleCopyLink = () => {
        copyToClipboard(prototypeLink).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    const getPreviewImgSrc = (id?: string) => {
        if (figmaImageLoading) return previewLoaderImg;
        if (!figmaImageLoading && !figmaImage) return placeHolderImg;
        if (id && figmaImage[id]) return figmaImage[id];
        return placeHolderImg;
    };
    return (
        <Cell>
            <EcImage
                style={{
                    cursor: figmaImageLoading ? "not-allowed" : "pointer",
                    width: "148px",
                    height: "88px",
                    border: "2px solid #B4B4BB",
                    borderRadius: "5px",
                }}
                onClick={() => (figmaImageLoading ? {} : onClick(figmaImage[nodeId]))}
                id={`${projectId}-${name}-${nodeId}`}
            >
                <img src={getPreviewImgSrc(nodeId)} alt={name} />
            </EcImage>
            <img src={desktopIcon} alt="desktop" style={{ margin: "0px 10px" }} />
            <Typography
                sx={{
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#2979FF",
                    marginRight: "10px",
                    fontSize: "14px",
                }}
                component="a"
                target="_blank"
                href={prototypeLink}
            >
                {name}
            </Typography>
            {isCopied ? (
                <EcTooltip title="Link Copied" placement="top" arrow>
                    <DoneIcon sx={{ color: "#2979FF", fontSize: "20px" }} />
                </EcTooltip>
            ) : (
                <ContentCopyIcon
                    sx={{
                        color: "#2979FF",
                        cursor: "pointer",
                        fontSize: "20px",
                    }}
                    onClick={handleCopyLink}
                />
            )}
        </Cell>
    );
};
