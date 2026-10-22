"use client";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useParams } from "@/utils/navigation";

import placeHolderImg from "../../assets/imagePlaceholder.svg";
import previewLoaderImg from "../../assets/previewLoader.gif";
import { EcModal } from "../../stories/components";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { CommentDataType, ProcessedPrototypeDataType, VersionDataType } from "../../types";
import { CommentIcon, PlayIcon, VersionIcon } from "../../utils/icons";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
        fontSize: "14px",
        fontWeight: "500",
        "&.Mui-expanded": {
            margin: "12px 0 12px 8px",
        },
        ".MuiTypography-caption": {
            color: "#3A3A44",
            lineHeight: "1.75rem",
            letterSpacing: "inherit",
        },
    },
}));

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

const PrototypeAccordionSummary = (props: PrototypeAccordionSummaryPropsType) => {
    const {
        data: { nodeId, pageTitle, comments = [], prototypes = [], totalVersions, expanded },
        onExpandToggle,
        figmaImage,
        figmaImageLoading,
    } = props;
    const {
        projectId,
    }: {
        projectId: string;
    } = useParams();
    const [previewModal, setPreviewModal] = useState<JSX.Element | undefined>(undefined);

    const handlePreviewImageClick = (imageUrl: string, title: string) => {
        setPreviewModal(
            <EcModal
                size="md"
                open
                onClose={() => {
                    setPreviewModal(undefined);
                }}
                title={
                    <Typography variant="h4" fontWeight="700" mb={1.5}>
                        {title}
                    </Typography>
                }
                showCloseIcon
                textAlign="left"
            >
                <Box
                    marginTop={3}
                    sx={{
                        maxHeight: "550px",
                        overflowY: "scroll",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt="Large flow"
                        width="976px"
                        style={{
                            display: "block",
                            maxWidth: "100%",
                        }}
                    />
                </Box>
            </EcModal>
        );
    };

    const getPreviewImgSrc = (id?: string) => {
        if (figmaImageLoading) return previewLoaderImg;
        if (!figmaImageLoading && !figmaImage) return placeHolderImg;
        if (id && figmaImage?.[id]) return figmaImage[id];
        return placeHolderImg;
    };

    return (
        <>
            {previewModal}
            <AccordionSummary
                expandIcon={
                    prototypes.length > 0 ? (
                        <IconButton
                            sx={{ "&:hover": { svg: { color: "rgb(41, 121, 255)" } } }}
                            onClick={(event) => {
                                event.stopPropagation();
                                if (prototypes.length > 0) {
                                    onExpandToggle(!expanded);
                                }
                            }}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ArrowForwardIosSharpIcon sx={{ fontSize: "1rem", color: "#000" }} />
                        </IconButton>
                    ) : (
                        <IconButton
                            sx={{ pointerEvents: "none", svg: { color: "#ccc" } }}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ArrowForwardIosSharpIcon sx={{ fontSize: "1rem", color: "#000" }} />
                        </IconButton>
                    )
                }
                aria-controls={pageTitle}
                sx={{ width: "100%", cursor: "default" }}
            >
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={1}
                    alignItems="center"
                    sx={{ cursor: "default" }}
                >
                    <Grid item lg={1} md={1} sm={1} xs={3}>
                        <EcImage
                            style={{
                                cursor: figmaImageLoading ? "not-allowed" : "pointer",
                                width: "3.25rem",
                                height: "3.25rem",
                                border: "2px solid #B4B4BB",
                                borderRadius: "0",
                            }}
                            onClick={() =>
                                figmaImageLoading
                                    ? {}
                                    : handlePreviewImageClick(figmaImage?.[nodeId] || "", pageTitle)
                            }
                            id={`${projectId}-${pageTitle}-${nodeId}`}
                        >
                            <img src={getPreviewImgSrc(nodeId)} alt={pageTitle} />
                        </EcImage>
                    </Grid>

                    <Grid item md={2} sm={11} xs={9}>
                        <Typography variant="caption">Page Name</Typography>
                        <Typography variant="subtitle2">{pageTitle}</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} xs={4}>
                        <Typography variant="caption">Total Prototypes</Typography>
                        <Typography variant="subtitle2" display="flex" alignItems="center" gap={1}>
                            <PlayIcon /> {prototypes.length}
                        </Typography>
                    </Grid>
                    <Grid item lg={2} md={2} xs={4}>
                        <Typography variant="caption">Total Comments</Typography>
                        <Typography variant="subtitle2" display="flex" alignItems="center" gap={1}>
                            <CommentIcon /> {comments.length}
                        </Typography>
                    </Grid>
                    <Grid item lg={2} md={3} xs={4}>
                        <Typography variant="caption">Total Versions</Typography>
                        <Typography
                            variant="subtitle2"
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                                cursor: "default",
                            }}
                        >
                            <VersionIcon />
                            {totalVersions?.length}
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
        </>
    );
};

export { PrototypeAccordionSummary };
