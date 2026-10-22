import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export const PageNotFound = () => {
    const PageNotFoundContainer = styled.div`
        display: flex;
        min-height: 400px;
        height: calc(100vh - 60px);
        align-items: flex-start;
        justify-content: flex-start;
        background: url("/error-404.png");
        width: 100%;
        padding-top: 90px;
        padding-left: 100px;
        background-size: cover;
        background-repeat: no-repeat;

        a {
            color: #fff;
            text-decoration: underline;
        }

        @media screen and (min-width: 1600px) {
            padding-top: 150px;
            padding-left: 150px;
        }

        @media screen and (max-width: 1140px) {
            padding-top: 100px;
            padding-left: 100px;
        }
        @media screen and (max-width: 992px) {
            padding-top: 50px;
            padding-left: 50px;
        }
    `;

    const PageTopRow = styled.section`
        width: 490px;
        display: flex;
        flex-wrap: wrap;
        color: #fff;
        letter-spacing: 0.03em;

        @media screen and (max-width: 767px) {
            h5 {
                font-size: 18px;
                margin-top: 10px;

                button {
                    font-size: 17px;
                }
            }
        }
        @media screen and (max-width: 480px) {
            h5 {
                font-size: 16px;
                margin-top: 10px;

                button {
                    font-size: 15px;
                }
            }
        }
    `;

    const PageNotFoundTitle = styled.h1`
        font-size: 50px;
        font-weight: 700;
        margin-bottom: 10px;

        @media screen and (max-width: 992px) {
            font-size: 42px;
            margin-top: 0;
        }

        @media screen and (max-width: 767px) {
            font-size: 34px;
        }

        @media screen and (max-width: 480px) {
            font-size: 28px;
        }
    `;

    const FooterText = styled.footer`
        position: fixed;
        bottom: 90px;
        color: #fff;
        left: 100px;
        @media screen and (min-width: 1600px) {
            bottom: 150px;
            left: 150px;
        }
        @media screen and (max-width: 1140px) {
            bottom: 100px;
            left: 100px;
        }
        @media screen and (max-width: 992px) {
            bottom: 30px;
            left: 50px;
            position: absolute;
        }
        @media screen and (max-width: 767px) {
            p {
                font-size: 14px;
            }
        }
    `;

    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    };
    return (
        <PageNotFoundContainer>
            <PageTopRow>
                <PageNotFoundTitle>
                    Oops, looks like <br />
                    you are lost in space!
                </PageNotFoundTitle>
                <Typography
                    variant="h5"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "26px",
                        marginTop: "20px",
                    }}
                >
                    Lets take you back
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            marginLeft: "8px",
                            textTransform: "capitalize",
                            fontSize: "24px",
                            padding: "0 10px",
                        }}
                    >
                        Home
                    </Button>
                </Typography>
            </PageTopRow>
            <FooterText>
                <Typography variant="body2" sx={{ fontSize: "17px" }}>
                    Image rights by &nbsp;
                    <Link href="https://spacetantra.com/">Spacetantra</Link>
                    <br />
                    &copy; 2024 Intelligaia. All Rights Reserved.
                </Typography>
            </FooterText>
        </PageNotFoundContainer>
    );
};
