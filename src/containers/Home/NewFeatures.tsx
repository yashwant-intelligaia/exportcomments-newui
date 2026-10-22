import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

import { SizeContext } from "../../contexts/SizeContext";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { ExportCommentLightIcon, NewProjectIcon, NewUserIcon } from "../../utils";
import VideoModal from "./VideoModal";

const blue300 = blue[300];
const CarouselWrapper = styled.section`
    .carousel .control-dots {
        margin-bottom: 0;
    }
    .carousel .control-dots .dot {
        background-color: #5393ff;
        opacity: 0.3;
        box-shadow: none;
        height: 7px;
        width: 7px;
        margin: 0 3px;
    }
    .carousel .control-dots .dot.selected {
        opacity: 0.8;
        box-shadow: none;
        height: 8px;
        width: 8px;
    }
    .carousel-slider {
        padding-bottom: 30px;
    }
`;

const NewFeatures = () => {
    const [modal, setModal] = useState<JSX.Element>();
    const WindowContext = () => useContext(SizeContext);
    const { width } = WindowContext();
    const NEW_FEATURES = [
        {
            image: "../../../images/add-project.svg",
            videoTitle: "Add New Projects",
            videoSrc: "https://export-comments.s3.ap-south-1.amazonaws.com/create-new-project.mp4",
            icon: <NewProjectIcon sx={{ fontSize: width > 768 ? 25 : 16 }} />,
            tag: true,
            title: "Connect new figma project directly from ‘Export Comment’ dashboard.",
            subtitle:
                "With our new integration, you can directly connect to a Figma project from the dashboard by providing the valid figma file url. This feature provides the additional capability to connect your new projects to ‘Export Comments’ both ways.",
        },
        {
            image: "../../../images/add-users.svg",
            videoTitle: "Invite New Users",
            videoSrc: "https://export-comments.s3.ap-south-1.amazonaws.com/add-new-user.mp4",
            icon: <NewUserIcon sx={{ fontSize: width > 768 ? 25 : 16 }} />,
            tag: true,
            title: "Invite new users to collaborate",
            subtitle:
                "Now Comment Export allows you to invite new users to collaborate for different projects. You just need to provide the valid email ids associated with a figma account. It also allows you to manage the access for different projects.",
        },
    ];

    const handleOpenModal = (index: number) => {
        setModal(
            <VideoModal
                isMenuOpen
                handleClose={() => setModal(undefined)}
                title={NEW_FEATURES[index].videoTitle}
                mediaInfo={{
                    src: NEW_FEATURES[index].videoSrc,
                    controls: true,
                }}
            />
        );
    };

    return (
        <>
            <CarouselWrapper className="carousel-wrapper">
                <Carousel
                    emulateTouch
                    autoPlay
                    infiniteLoop
                    useKeyboardArrows
                    showStatus={false}
                    showArrows={false}
                >
                    {NEW_FEATURES.map((feature, index) => (
                        <>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    backgroundRepeat: "repeat-x",
                                    //  backgroundColor: "#BBDEDB",
                                    p: width > 768 ? 6.25 : 3.25,
                                    borderRadius: 1,
                                    mt: 2.5,
                                    height: "100%",
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <EcImage
                                            id={`LP-modal-button-${index}`}
                                            onClick={() => handleOpenModal(index)}
                                            style={{
                                                cursor: "pointer",
                                                marginRight: width > 600 ? "5%" : "0",
                                                width: width > 600 ? "95%" : "100%",
                                            }}
                                        >
                                            <img
                                                src={feature.image}
                                                width="100%"
                                                alt="Banner Placeholder"
                                            />
                                        </EcImage>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        sx={{
                                            position: "relative",
                                            pt: width > 768 ? 2 : 0,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: width > 768 ? "-30px" : "5px",
                                                right: "5px",
                                                zIndex: "10",
                                            }}
                                        >
                                            {feature.tag && (
                                                <img
                                                    src="../../images/new-button.svg"
                                                    width={width > 768 ? "70" : "50"}
                                                    alt="New Button"
                                                />
                                            )}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                alignItems: "flex-start",
                                                mt: width > 600 ? 0 : 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: width > 768 ? "45px" : "35px",
                                                    height: width > 768 ? "45px" : "35px",
                                                    borderRadius: "50%",
                                                    background: blue300,
                                                    p: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <ExportCommentLightIcon sx={{ fontSize: 25 }} />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    height: width > 768 ? "45px" : "35px",
                                                    p: width > 768 ? 1 : 0.5,
                                                    gap: 0.5,
                                                }}
                                            >
                                                <FiberManualRecordIcon sx={{ fontSize: 7 }} />
                                                <FiberManualRecordIcon sx={{ fontSize: 7 }} />
                                                <FiberManualRecordIcon sx={{ fontSize: 7 }} />
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: width > 768 ? "45px" : "35px",
                                                    height: width > 768 ? "45px" : "35px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background:
                                                        index === 2 ? "#000" : "transparent",
                                                    borderRadius: index === 2 ? "50%" : "0",
                                                    p: index === 2 ? "1" : "0",
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                pr: width > 600 ? 0 : 4,
                                                gap: 1.5,
                                                mt: 1.5,
                                                textAlign: "left",
                                            }}
                                        >
                                            <Typography
                                                variant={width > 820 ? "h5" : "subtitle1"}
                                                fontWeight="700"
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                variant={width > 820 ? "body1" : "body2"}
                                                fontWeight="500"
                                            >
                                                {feature.subtitle}
                                            </Typography>
                                            <Button
                                                sx={{
                                                    textTransform: "none",
                                                    background: "#2979ff",
                                                }}
                                                variant="contained"
                                                onClick={() => handleOpenModal(index)}
                                                id={`LP-learn-more-button-${index}`}
                                            >
                                                Learn More
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    ))}
                </Carousel>
            </CarouselWrapper>
            {modal && modal}
        </>
    );
};

export { NewFeatures };
