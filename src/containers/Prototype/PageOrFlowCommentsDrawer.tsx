"use client";

import { Box, CardContent, Divider, Typography } from "@mui/material";
import React from "react";

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

const PageOrFlowCommentsDrawer: React.FC<PageOrFlowCommentsDrawerProps> = ({
    title,
    subTitle,
    onClose,
    data,
}) => (
    <EcDrawer
        open
        onClose={onClose}
        direction="right"
        customeWidth
        title={
            <Box>
                <Typography variant="h5" fontWeight="500" mb={1.6}>
                    {title}
                </Typography>
                {subTitle && (
                    <Typography variant="h6" fontWeight="400" mb={1.5}>
                        {subTitle}
                    </Typography>
                )}
            </Box>
        }
    >
        {data.length ? (
            <Box>
                <CardContent>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Recent Comments
                        </Typography>
                    </Box>

                    {data
                        .slice()
                        .reverse()
                        .map(({ user: { imgUrl, handle }, createdAt, message }) => (
                            <>
                                <EcComment
                                    name={handle}
                                    src={imgUrl}
                                    date={createdAt}
                                    message={message}
                                />

                                <Divider sx={{ borderColor: "#f3f3f3", margin: "16px 0" }} />
                            </>
                        ))}
                </CardContent>
            </Box>
        ) : (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <EcImage aria-label="No Comments">
                    <NoCommentsIcon />
                </EcImage>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 400,
                        marginTop: "40px",
                    }}
                >
                    No Comment Found
                </Typography>
            </Box>
        )}
    </EcDrawer>
);

export { PageOrFlowCommentsDrawer };
