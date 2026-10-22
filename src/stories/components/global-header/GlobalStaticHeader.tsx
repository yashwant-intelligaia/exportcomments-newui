import "../../../index.scss";

import Box from "@mui/material/Box";
import styled from "styled-components";

import { SbLogo } from "../branding-logo/BrandingLogo";

const GlobalHeaderWarpper = styled.div`
    .main-header {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px 10px 20px;
        background-color: #fff;
        position: fixed;
        top: 0;
        z-index: 100;
        -webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
        -moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
        box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
    }

    @media (max-width: 640px) {
        .main-header {
            padding-top: 12px;
            padding-right: 20px;
            padding-bottom: 10px;
            padding-left: 20px;
            height: 50px;
        }
    }
`;

export const GlobalStaticHeader = () => (
    <GlobalHeaderWarpper>
        <Box
            className="main-header"
            sx={{
                pl: {
                    xs: "20px !important",
                    sm: "20px !important",
                    md: "20px !important",
                    lg: "20px !important",
                    xl: "20px !important",
                },
            }}
        >
            <SbLogo />
        </Box>
    </GlobalHeaderWarpper>
);
