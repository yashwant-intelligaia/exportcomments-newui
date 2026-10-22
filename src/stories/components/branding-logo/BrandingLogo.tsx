import { Box } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Brand = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bolder;
    text-decoration: unset;
    :hover {
        color: #fff;
    }
    span {
        padding-left: 12px;
    }
`;

const BrandLogo = styled.a`
    color: #000;
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;

    @media screen and (max-width: 640px) {
        img {
            width: 140px;
        }
    }
`;

export const SbLogo = () => {
    const history = useHistory();

    const redirectToDashbaord = () => {
        history.push("/");
    };
    return (
        <Box>
            <Brand>
                <BrandLogo onClick={redirectToDashbaord}>
                    <img src="/export-comment.svg" alt="Export Comment" />
                </BrandLogo>
            </Brand>
        </Box>
    );
};
