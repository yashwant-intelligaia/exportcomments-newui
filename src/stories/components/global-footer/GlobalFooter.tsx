"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Container, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import { useContext } from "react";
import { NavLink } from "@/utils/navigation";
import styled from "styled-components";

import DribbleIcon from "../../../assets/dribble.svg";
import Intelligaia from "../../../assets/logo-intelligaia.svg";
import MediumIcon from "../../../assets/medium.svg";
import XIcon from "../../../assets/x-social.svg";
import { APP_CONSTANT } from "../../../constants/AppConstant";
import { SizeContext } from "../../../contexts/SizeContext";

const GlobalFooterWrapper = styled.div`
    width: 1128px;
    max-width: 95%;
    display: block;
    margin: auto;
    #footer {
        margin-top: 45px;
    }

    #footer .footer-wrapper {
        display: flex;
        justify-content: center;
    }

    #footer .inner-footer {
        display: flex;
        width: 70%;
        justify-content: center;
    }
    #footer .inner-footer .col {
        width: 33%;
        max-width: 280px;
        text-align: center;
    }
    #footer .social-links {
        margin-top: 1.25rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    #footer .social-links .icon {
        margin-right: 0.5rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #222;
        border-radius: 50%;
        min-width: 24px;
        max-width: 24px;
        height: 24px;
        color: #fff;
    }
    #footer .social-links .icon.dribble-ic img {
        width: 16px;
        height: 16px;
    }
    #footer .social-links .icon svg {
        width: 0.875rem;
        height: 0.875rem;
    }

    #footer .link {
        font-size: 1rem;
        font-weight: 400;
        display: block;
        color: #616161;
        margin: 1.25rem 0;
    }

    #footer .link.first-link {
        margin-top: 10px;
    }

    #footer h2 {
        font-size: 1.125rem;
        margin: 0;
        font-weight: 700;
        color: #212121;
    }

    #footer .copyright-link {
        text-align: left;
    }
    #footer .footer-link {
        text-align: right;
        display: flex;
    }

    #footer .footer-bottom {
        margin-top: 15px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        font-weight: 500;
        color: #616161;
        padding-top: 0.75rem;
    }

    #footer .external-links {
        color: #616161;
        &:hover {
            color: none;
        }
    }

    @media only screen and (max-width: 1023px) {
        #footer .inner-footer {
            width: 90%;
        }
        #footer .link {
            font-size: 0.875rem;
        }
    }

    @media only screen and (max-width: 992px) {
        .downloads-count {
            height: 218px;
            min-width: 387px;
            background-size: 100%;
            position: absolute;
            bottom: -1px;
            left: 0;
            top: auto;
        }
        .downloads-count .count-top-row {
            margin-top: 100px;
        }
    }

    @media only screen and (max-width: 767px) {
        .downloads-count {
            height: 204px;
            min-width: 360px;
            background-size: 100%;
            position: absolute;
            bottom: -1px;
            left: 0;
            top: auto;
        }
    }

    @media screen and (max-width: 640px) {
        .login-page-btns {
            top: 9px;
        }
        .login-with-figma {
            font-size: 0.75rem !important;
            padding: 5px 10px !important;

            & > span:first-child {
                margin-right: 5px;
                img {
                    width: 15px;
                    height: 15px;
                }
            }
        }
        #footer {
            margin-top: 10px;
        }
        .downloads-count {
            position: static;
            height: 218px;
            min-width: 387px;
            margin: 0 30px 30px 30px;
        }
    }
    @media screen and (max-width: 480px) {
        .dwnload-vdo {
            height: 350px !important;
        }
    }
    @media screen and (max-width: 380px) {
        .dwnload-vdo {
            height: 300px !important;
        }
        .inner-footer .col {
            width: 45% !important;
        }
    }
`;

export const GlobalFooter = () => {
    const WindowContext = () => useContext(SizeContext);
    const { width } = WindowContext();
    return (
        <GlobalFooterWrapper>
            {/* TODO: Need to update html elements with MUI Components */}
            <footer id="footer">
                <div className="footer-wrapper">
                    <div className="inner-footer">
                        <div className="col">
                            <CardMedia
                                component="img"
                                image={Intelligaia}
                                alt="Intelligaia"
                                sx={{
                                    width: "119px",
                                    height: "30px",
                                    display: "inline-block",
                                }}
                            />
                            <span className="link first-link">Get to know us!</span>
                            <div className="social-links">
                                <Link
                                    target="_blank"
                                    href={APP_CONSTANT.social.twitter}
                                    underline="none"
                                    className="icon"
                                    id="LP-twitter-link"
                                >
                                    <img src={XIcon} alt="xIcon" width="14" height="14" />
                                </Link>
                                <Link
                                    target="_blank"
                                    href={APP_CONSTANT.social.dribble}
                                    underline="none"
                                    className="icon dribble-ic"
                                    id="LP-dribble-link"
                                >
                                    <CardMedia component="img" image={DribbleIcon} alt="dribble" />
                                </Link>
                                <Link
                                    target="_blank"
                                    href={APP_CONSTANT.social.medium}
                                    underline="none"
                                    className="icon"
                                    id="LP-medium-link"
                                >
                                    <CardMedia component="img" image={MediumIcon} alt="medium" />
                                </Link>
                                <Link
                                    target="_blank"
                                    href={APP_CONSTANT.social.instagram}
                                    underline="none"
                                    className="icon"
                                    id="LP-instagram-link"
                                >
                                    <InstagramIcon />
                                </Link>
                                <Link
                                    target="_blank"
                                    href={APP_CONSTANT.social.linkedIn}
                                    underline="none"
                                    className="icon"
                                    id="LP-linkedin-link"
                                >
                                    <LinkedInIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Container maxWidth="xl" sx={{ marginY: 2 }}>
                    <Box sx={{ flexGrow: 1 }} className="footer-bottom">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    style={{
                                        textAlign: width > 600 ? "left" : "center",
                                    }}
                                >
                                    &copy; 2024 Intelligaia. All rights reserved.
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    style={{
                                        textAlign: width > 600 ? "right" : "center",
                                    }}
                                >
                                    <NavLink to="/privacy-policy" className="external-links">
                                        Privacy Policy
                                    </NavLink>
                                    &nbsp;|&nbsp;
                                    <NavLink to="/terms-of-use" className="external-links">
                                        Terms Of Use
                                    </NavLink>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </footer>
        </GlobalFooterWrapper>
    );
};
