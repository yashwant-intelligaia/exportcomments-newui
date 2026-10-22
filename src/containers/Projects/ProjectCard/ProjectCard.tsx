"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import styled from "styled-components";

import { ProjectCardContext } from "../../../contexts/ProjectCardContext";
import { ProjectCardDataType } from "../../../types/project";

interface ProjectCardPropsType {
    data: ProjectCardDataType;
    header: JSX.Element;
    footer?: JSX.Element;
}
const Wrapper = styled.div`
    .card-container {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        background: #ffffff;
        display: inline-flex;

        .MuiTypography-body2 {
            color: #818181;
            font-size: 0.75rem;
            margin-bottom: 0.375rem;
        }
    }
    .comment-container {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        li {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin-right: 0;
            min-width: 46px;
            padding: 0.5rem;
            transition: background 0.5s;
            border-radius: 0.5rem;
            &:hover {
                background: #d1ebec;
            }
            .comment-list {
                width: 48px;
                height: 48px;
                display: inline-flex;
                font-size: 12px;
                font-weight: 700;
                font-family: arial;
                position: relative;
                color: #fff;
                border-radius: 50%;
                transform: rotate(-45deg);
                justify-content: center;
                align-items: center;
                // border: solid 1px #ffff;
                cursor: pointer;
                &:hover {
                    // box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
                    // transition: 0.5s;
                    // scale: 1.15;
                }
                &-number {
                    transform: rotate(45deg);
                    font-size: 1rem;
                    font-weight: 600;
                    color: #000;
                }
                &-text {
                    position: static;
                    color: #3b457b;
                    font-size: 0.75rem;
                    line-height: 18px;
                    margin-top: 0.75rem;
                    transition: all 0.05s ease 0s;
                    font-weight: 500;
                }
                &.all-comment {
                    background: #ebf2ff;
                }
                &.unread-comment {
                    background: #f0f0f1;
                    color: #18b7fb;
                }
                &.my-comment {
                    background: #f0f1f9;
                }
                &.resolved-comment {
                    background: #edf6ee;
                }
                &.unresolved-comment {
                    background: #feedec;
                }
                &.active {
                    border: 2px solid #18b7fb;
                }
            }
            &:hover {
                .comment-list-text {
                    font-weight: 500;
                }
            }
            &:nth-last-child(2) {
                min-width: 50px;
            }
            &:last-child {
                margin-right: 0;
                min-width: 62px;
            }
        }
    }
`;

const ProjectCard = (props: ProjectCardPropsType) => {
    const { data, header, footer } = props;

    const {
        data: { allComments, unreadComments, myComments, resolvedComments, unresolvedComments },
        setData: setProjectCardData,
    } = useContext(ProjectCardContext);

    useEffect(() => {
        setProjectCardData(data);
    }, []);

    return (
        <Wrapper>
            <Card className="card-container">
                <CardContent component="div" style={{ paddingBottom: "10px" }}>
                    {/* Header Section */}
                    {header && header}
                    {/* Comments Section */}
                    <Typography variant="body2">Comments</Typography>
                    <ul className="comment-container">
                        <li>
                            <Box className="all-comment comment-list" onClick={() => {}}>
                                <Box className="comment-list-number">{allComments}</Box>
                            </Box>
                            <Box className="comment-list-text">All</Box>
                        </li>
                        <li>
                            <Box className="unread-comment comment-list" onClick={() => {}}>
                                <Box className="comment-list-number">{unreadComments}</Box>
                            </Box>
                            <Box className="comment-list-text">Unread</Box>
                        </li>
                        <li>
                            <Box className="my-comment comment-list active" onClick={() => {}}>
                                <Box className="comment-list-number">{myComments}</Box>
                            </Box>
                            <Box className="comment-list-text">My</Box>
                        </li>
                        <li>
                            <Box className="resolved-comment comment-list" onClick={() => {}}>
                                <Box className="comment-list-number">{resolvedComments}</Box>
                            </Box>
                            <Box className="comment-list-text">Resolved</Box>
                        </li>
                        <li>
                            <Box className="unresolved-comment comment-list" onClick={() => {}}>
                                <Box className="comment-list-number">{unresolvedComments}</Box>
                            </Box>
                            <Box className="comment-list-text">Unresolved</Box>
                        </li>
                    </ul>
                    {/* Divider */}
                    <Box
                        sx={{
                            marginTop: "25px",
                            border: "none",
                            borderTop: "2px dashed #ccc",
                        }}
                    />
                    {/* Prototypes Section */}
                    {footer && footer}
                </CardContent>
            </Card>
        </Wrapper>
    );
};

ProjectCard.defaultProps = {
    // closeOnClickOutside: true,
};

export { ProjectCard };
