import { Done as DoneIcon } from "@mui/icons-material";
import {
    AccordionDetails,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Fragment, useContext, useState } from "react";

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
            />
        );
    };
    const handleCreateNewVersion = (
        prototypeId: number,
        nodeId: string,
        prototypeTitle: string
    ) => {
        setDrawerContent(
            <NewCreateVersionDrawer
                title="Create New Version"
                prototypeId={prototypeId}
                nodeId={nodeId}
                prototypeTitle={prototypeTitle}
                open
                onClose={() => setDrawerContent(undefined)}
            />
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
            />
        );
    };

    if (prototypes.length === 0) return <></>;

    return (
        <>
            <AccordionDetails
                sx={{
                    paddingLeft: {
                        xl: "62px",
                        lg: "62px",
                        md: "62px",
                        sm: "2.5rem",
                        xs: "1rem",
                    },
                }}
            >
                <Grid container rowSpacing={4} columnSpacing={1} alignItems="center">
                    {prototypes.map(
                        ({
                            prototypeId,
                            prototypeTitle,
                            versions = [],
                            prototypeLink,
                            prototypeComments = [],
                            nodeId,
                        }) => (
                            <Fragment key={uniqueKey(`prototype-detail-${prototypeId}`)}>
                                <Grid item xs={12} md={3} />
                                <Grid item xs={12} md={4}>
                                    <Typography
                                        variant="subtitle2"
                                        display="flex"
                                        alignItems="center"
                                        gap={0.2}
                                    >
                                        <IconButton
                                            onClick={() => {
                                                if (prototypeLink) {
                                                    openLink({
                                                        url: prototypeLink,
                                                        target: "_blank",
                                                    });
                                                }
                                            }}
                                        >
                                            <PlayIcon />
                                        </IconButton>
                                        <Box>{prototypeTitle}</Box>
                                        {copiedPrototype[prototypeId] ? (
                                            <EcTooltip title="Link Copied" placement="top" arrow>
                                                <IconButton>
                                                    <DoneIcon
                                                        sx={{
                                                            color: "black",
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </IconButton>
                                            </EcTooltip>
                                        ) : (
                                            <IconButton
                                                onClick={() =>
                                                    handleCopyLink(prototypeId, prototypeLink)
                                                }
                                            >
                                                {" "}
                                                <CopyIcon style={{ cursor: "pointer" }} />
                                            </IconButton>
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Typography
                                        variant="subtitle2"
                                        display="flex"
                                        alignItems="center"
                                        gap={0.2}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                handleViewPrototypeComments(
                                                    prototypeComments,
                                                    prototypeTitle
                                                )
                                            }
                                        >
                                            {" "}
                                            <CommentIcon />
                                        </IconButton>{" "}
                                        {prototypeComments.length}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography
                                        variant="subtitle2"
                                        display="flex"
                                        alignItems="center"
                                        gap={0.2}
                                    >
                                        <Box
                                            sx={{
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                            }}
                                            onClick={() =>
                                                handleViewVersionList(
                                                    prototypeId,
                                                    nodeId,
                                                    prototypeTitle
                                                )
                                            }
                                        >
                                            <IconButton
                                                sx={{
                                                    "&:hover": {
                                                        svg: {
                                                            path: {
                                                                stroke: "inherit!important",
                                                                fill: "rgb(41, 121, 255)",
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                {" "}
                                                <VersionIcon />
                                            </IconButton>{" "}
                                            {versions.length}
                                        </Box>
                                        <Divider
                                            sx={{
                                                height: "1rem",
                                                margin: "auto 0.325rem",
                                                borderColor: "rgba(210, 210, 214, 1",
                                            }}
                                            orientation="vertical"
                                            variant="middle"
                                            flexItem
                                        />
                                        <Button
                                            variant="text"
                                            className="create-new"
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "inherit",
                                            }}
                                            sx={{
                                                color: "#4A4B57",
                                                svg: {
                                                    path: {
                                                        stroke: "#4A4B57",
                                                    },
                                                },
                                                " &:hover": {
                                                    color: "rgb(41, 121, 255)",
                                                },
                                            }}
                                            onClick={() =>
                                                handleCreateNewVersion(
                                                    prototypeId,
                                                    nodeId,
                                                    prototypeTitle
                                                )
                                            }
                                        >
                                            <PlusIcon /> Create new version
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Fragment>
                        )
                    )}
                </Grid>
            </AccordionDetails>
        </>
    );
};

export { PrototypeAccordionDetails };
