import { Box, Button } from "@mui/material";
import { styled as styledComponent } from "@mui/material/styles";
import Lottie from "lottie-react";

import loaderJson from "../../animations/sparkinsRounded.json";
import designToolProductOfWeek from "../../assets/design-tool-product-of-week.svg";
import countBg from "../../assets/export-comments-bg.png";
import figma from "../../assets/figma-small.svg";
import heroBg from "../../assets/hero-bg.png";
import star from "../../assets/star.svg";
import ueProductOfWeek from "../../assets/ue-product-of-week.svg";
import { APP_CONSTANT } from "../../constants/AppConstant";
import { processPluginDownloadCount, useFetchPluginCount } from "../../hooks";

const heroBackground = {
    paperContainer: {
        backgroundImage: `url(${heroBg})`,
        backgroungSize: `cover`,
    },
};

const downloadBackground = {
    paperContainer: {
        background: `linear-gradient(90deg, #F6D365 0%, #FDA085 100%)`,
        color: `#FFF`,
    },
};

const PluginBanner = () => {
    const { data: pluginDownloadResponse } = useFetchPluginCount();
    const downloadCount = processPluginDownloadCount(pluginDownloadResponse);

    const FigmaBannerWrapper = styledComponent("div")(({ theme }) => ({
        width: "100%",
        maxWidth: "61rem",
        display: "flex",
        alignItems: "flex-end",
        alignContent: "flex-end",
        position: "relative",
        marginTop: "1rem",
        [theme.breakpoints.down("md")]: {
            minHeight: "40rem",
            flexDirection: "column",
        },
        [theme.breakpoints.up("md")]: {
            minHeight: "30rem",
            flexDirection: "row",
        },
    }));

    const ProductHuntWrapper = styledComponent("div")(({ theme }) => ({
        right: "50%",
        width: "80%",
        transform: "translate(50%,0%)",

        [theme.breakpoints.down("md")]: {
            position: "static",
            top: "5%",
            width: "100%",
            transform: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
        },
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            top: "13%",
            width: "95%",
        },
        [theme.breakpoints.up("lg")]: {
            top: "13%",
            width: "117%",
        },
    }));
    const DownloadsBanner = styledComponent("div")(({ theme }) => ({
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        [theme.breakpoints.down("md")]: {
            width: "8rem",
            height: "8rem",
        },
        [theme.breakpoints.up("md")]: {
            width: "9rem",
            height: "9rem",
        },
        [theme.breakpoints.up("lg")]: {
            width: "10.5rem",
            height: "10.5rem",
        },
    }));
    const LottieProductCount = styledComponent("div")(({ theme }) => ({
        position: "absolute",
        top: "0",
        left: "0",
        width: "11rem",
        [theme.breakpoints.down("md")]: {
            left: "50%",
            width: "13rem",
            transform: "translate(-50%,0%)",
        },
    }));
    const ProductHuntBox = styledComponent("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        right: "-1.5rem",
        top: "0rem",
        [theme.breakpoints.down("md")]: {
            position: "static",
        },
        [theme.breakpoints.up("md")]: {
            position: "absolute",
        },
    }));
    const LottieProductHunt = styledComponent("div")(({ theme }) => ({
        position: "absolute",
        top: "9rem",
        right: ".5rem",
        width: "13rem",
        [theme.breakpoints.down("md")]: {
            right: "50%",
            width: "13rem",
            top: "18rem",
            transform: "translate(50%,0%)",
        },
        [theme.breakpoints.up("md")]: {
            right: ".5rem",
            width: "13rem",
        },
        [theme.breakpoints.up("lg")]: {
            width: "15rem",
            right: "1rem",
        },
    }));

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="center"
                width={1}
                style={heroBackground.paperContainer}
            >
                <Box
                    width={1}
                    maxWidth="47rem"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        mt: {
                            lg: "1.5rem",
                        },
                    }}
                >
                    <Box
                        fontSize="1.125rem"
                        lineHeight="1.562rem"
                        fontWeight="700"
                        color="#616161"
                        mb={1}
                    >
                        Export Comments Plugin 5.0
                    </Box>
                    <Box
                        fontSize="2.5rem"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.5rem",
                                md: "2rem",
                                lg: "2.5rem",
                                xl: "2.5rem",
                            },
                            lineHeight: {
                                xs: "2rem",
                                sm: "2rem",
                                md: "3rem",
                                lg: "3.5rem",
                                xl: "3.875rem",
                            },
                            mb: {
                                xs: "1rem",
                                sm: "1.5rem",
                                md: "2rem",
                                lg: "2.5rem",
                                xl: "3rem",
                            },

                            px: {
                                xs: "1rem",
                                sm: "2rem",
                                md: "0",
                                lg: "0",
                                xl: "0",
                            },
                        }}
                        fontWeight="700"
                        color="#19191D"
                        letterSpacing="0.5px"
                        textAlign="center"
                    >
                        Supercharge your figma comments and streamline your entire feedback process
                    </Box>
                    <Box>
                        <Button
                            size="large"
                            variant="contained"
                            startIcon={
                                <img
                                    alt="Figma Plugin"
                                    className="icon"
                                    src="dw-plugin-icon.svg"
                                    height={22}
                                    width={22}
                                />
                            }
                            onClick={() => {
                                window.open(APP_CONSTANT.pluginLink, "_blank");
                            }}
                            style={{ textTransform: "inherit" }}
                            id="LP-get-plugin-button"
                        >
                            Get this Plugin Free
                        </Button>
                    </Box>
                </Box>
                <FigmaBannerWrapper>
                    <ProductHuntWrapper>
                        <DownloadsBanner style={downloadBackground.paperContainer}>
                            <LottieProductCount>
                                <Lottie animationData={loaderJson} />
                            </LottieProductCount>
                            <Box
                                lineHeight="1.25rem"
                                fontWeight="700"
                                color="#212121"
                                mt=".75rem"
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "1.5rem",
                                        md: "2rem",
                                        lg: "2.5rem",
                                        xl: "2.5rem",
                                    },
                                }}
                                id="LP-download-count"
                            >
                                {downloadCount}
                            </Box>
                            <Box
                                lineHeight="1.25rem"
                                fontWeight="700"
                                color="#212121"
                                letterSpacing="0.5px"
                                mt=".5rem"
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: ".75rem",
                                        md: ".75rem",
                                        lg: "1rem",
                                        xl: "1rem",
                                    },
                                }}
                            >
                                Total Downloads
                            </Box>
                            <Box
                                lineHeight="1.25rem"
                                fontWeight="500"
                                color="#000"
                                sx={{
                                    fontSize: {
                                        xs: ".65rem",
                                        sm: ".65rem",
                                        md: ".65rem",
                                        lg: ".75rem",
                                        xl: ".75rem",
                                    },
                                    mt: {
                                        xs: "0",
                                        sm: "0",
                                        md: "0rem",
                                        lg: ".25rem",
                                        xl: ".25rem",
                                    },
                                }}
                            >
                                and still counting...
                            </Box>
                            <Box width="3.5rem" position="absolute" left="-.75rem" top=".45rem">
                                <img src={star} alt="Star Icon" />
                            </Box>
                            <Box
                                width="4.25rem"
                                position="absolute"
                                right="-1.25rem"
                                sx={{
                                    top: {
                                        xs: "-.5rem",
                                        sm: "0rem",
                                        md: "5rem",
                                        lg: ".75rem",
                                        xl: ".75rem",
                                    },
                                }}
                            >
                                <img src={figma} alt="Figma Icon" />
                            </Box>
                        </DownloadsBanner>

                        <ProductHuntBox>
                            <Box
                                width="8rem"
                                height="8rem"
                                borderRadius="50%"
                                style={{
                                    background: "#FE6155",
                                    color: "#fff",
                                }}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                component="button"
                                sx={{
                                    border: "none",
                                    cursor: "pointer",
                                    marginBottom: {
                                        xs: ".75rem",
                                        sm: ".75rem",
                                    },
                                }}
                                onClick={() => {
                                    window.open(APP_CONSTANT.productHuntLink, "_blank");
                                }}
                                id="LP-product-hunt-link"
                            >
                                <Box
                                    fontSize="3rem"
                                    lineHeight="3rem"
                                    fontWeight="700"
                                    color="#FFF"
                                    mt="-.25rem"
                                    display="flex"
                                    width={1}
                                    justifyContent="center"
                                >
                                    P
                                </Box>
                                <Box
                                    fontSize="1rem"
                                    lineHeight="1.5rem"
                                    fontWeight="700"
                                    color="#FFF"
                                    display="flex"
                                    width={1}
                                    justifyContent="center"
                                    letterSpacing="0.44 px"
                                >
                                    Product Hunt
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: {
                                        xs: "13rem",
                                        sm: "13rem",
                                        md: "13rem",
                                        lg: "15rem",
                                        xl: "17.5rem",
                                    },
                                }}
                            >
                                <img
                                    src={ueProductOfWeek}
                                    alt="User Experience product of the week"
                                    width="100%"
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: {
                                        xs: "13rem",
                                        sm: "13rem",
                                        md: "13rem",
                                        lg: "15rem",
                                        xl: "17.5rem",
                                    },
                                }}
                            >
                                <img
                                    src={designToolProductOfWeek}
                                    alt="Design tool product of the week"
                                    width="100%"
                                />
                            </Box>

                            <LottieProductHunt>
                                <Lottie animationData={loaderJson} />
                            </LottieProductHunt>
                        </ProductHuntBox>
                    </ProductHuntWrapper>
                    <img src={countBg} alt="export comments" style={{ maxWidth: "100%" }} />
                </FigmaBannerWrapper>
            </Box>
        </>
    );
};

export { PluginBanner };
