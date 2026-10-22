"use client";

import { Box } from "@mui/material";
import styled from "styled-components";

import LoaderFile from "../../assets/loader-file.svg";

const LoaderWrapper = styled.div`
    .loader-file {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 0.5rem;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .gather-info {
        color: #000;
        font-size: 14px;
        font-weight: 500;
    }
`;

const ProjectLoader = (props: { title?: string }) => {
    const { title } = props;
    return (
        <LoaderWrapper>
            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                <Box
                    className="gather-info"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <img src={LoaderFile} alt="Loader" className="loader-file" />
                    {title}
                </Box>
            </Box>
        </LoaderWrapper>
    );
};

ProjectLoader.defaultProps = {
    title: "Gathering info",
};

export { ProjectLoader };
