import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
    Box,
    Button,
    CardMedia,
    Chip,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Carousel } from "react-responsive-carousel";
import MaskedInput from "react-text-mask";
import styled from "styled-components";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { NewFeatures, PluginBanner } from "../containers";
import VideoModal from "../containers/Home/VideoModal";
import { GlobalFooter } from "../stories/components/global-footer/GlobalFooter";
import { ISnackBarMessage } from "../types";
import { snackbar } from "../utils";
import { validateEmail, validateName } from "../utils/validation";

interface Ifaq {
    title: string;
    type: "img" | "video";
    url: string;
}

const MainContainer = styled.div`
    padding: 10px 0;
    background: #ffffff;
    .landing-page h1 {
        font-size: 40px;
        font-weight: 700;
        margin: 0;
    }

    .landing-page h1 .thin-txt {
        font-weight: 300;
    }
    .landing-page h1 .version {
        margin-left: 0.5rem;
        font-weight: 300;
    }
    .landing-page {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        direction: column;
    }
    .landing-page .main-img {
        margin-bottom: -15px;
    }
    .downloads-count .count {
        font-size: 3.125rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        width: 100%;
        letter-spacing: unset;
    }
    .downloads-count {
        font-size: 0.625rem;
        font-weight: 700;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 268px;
        min-width: 478px;
        margin-right: 50px;
        background-color: #fff;
        position: relative;
        top: 20px;
        background: url("../../images/count-animation.gif");
        background-position: 0 0;
    }
    .downloads-count .count-top-row {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 125px;
        flex-wrap: wrap;
        line-height: 1;
        padding-right: 20px;
    }
    .downloads-count .count-bottom-row {
        display: flex;
        justify-content: center;
        align-self: end;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 0;
        line-height: 1.5;
        width: 100%;
        padding-right: 17px;
    }

    .get-plugin-btn {
        background: #2979ff;
        font-size: 0.875rem !important;
        text-transform: none !important;
    }

    .login-page-btns {
        position: fixed;
        top: 7px;
        right: 15px;
        z-index: 101;
    }
    .login-page-btns .login-with-figma {
        background: transparent;
        box-shadow: none;
        color: #2979ff;
        border: 1px solid #2979ff;
        font-size: 0.875rem;
        text-transform: none;
        padding: 7px 15px;
        margin-left: 15px;
    }

    .login-page-btns .login-with-figma .katUps {
        height: 16px;
    }

    .login-page-btns .login-with-figma:hover {
        background: transparent;
        border: 1px solid #2979ff;
    }

    .login-page-btns .link-dashboard {
        padding: 7px 15px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #212121;
        margin-left: 15px;
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

const HelpContainer = styled.div`
    display: flex;
    width: 1128px;
    max-width: 95%;
    flex-wrap: wrap;

    &.roadmap-bg {
        background: url("../../images/road.svg");
        background-repeat: no-repeat;
        background-position: 96px 45px;
        padding-bottom: 30px;
        max-width: 100%;
    }

    @media screen and (max-width: 1140px) {
        &.roadmap-bg {
            background: none;
        }
    }
`;

const HelpRoadmap = styled.section`
    background-color: #f8f8f8;
    padding-top: 45px;
    width: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        h5 {
            margin-bottom: 20px;
        }
    }

    @media screen and (max-width: 767px) {
        padding-top: 30px;
        h5 {
            margin-bottom: 0px;
        }
    }
`;

const RoadmapRow = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 25px 0;
    @media screen and (max-width: 767px) {
        flex-wrap: wrap;
        margin: 15px 0;
    }
`;

const TextContent = styled.section`
    width: 324px;
    border: 1px solid #e0e0e0;
    border-radius: 14px;
    background-color: #fff;
    padding: 15px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-right: 70px;
    margin-left: -40px;

    &::before {
        content: "";
        position: absolute;
        left: -46px;
        width: 11px;
        height: 11px;
        border: 4px solid #212121;
        border-radius: 50%;
        background-color: #f8f8f8;
    }
    &::after {
        content: "";
        position: absolute;
        left: -31px;
        width: 31px;
        height: 1px;
        border-bottom: 2px dashed #212121;
    }

    &.mr-50 {
        margin-right: 50px;
    }

    &.right {
        margin-left: 33px;
        margin-right: 248px;

        &::before {
            left: auto;
            right: -46px;
        }
        &::after {
            left: auto;
            right: -31px;
        }

        @media screen and (max-width: 1024px) {
            margin-right: auto;
        }
    }

    @media screen and (max-width: 1140px) {
        margin-right: 30px;
        padding-left: 20px;
        padding-right: 20px;
        &.mr-50 {
            margin-right: 30px;
        }
        &::before,
        &::after {
            display: none;
        }
    }

    @media screen and (max-width: 1024px) {
        margin-left: auto;
    }

    @media screen and (max-width: 858px) {
        margin-left: 30px;
        &.right {
            margin-right: 30px;
        }
    }

    @media screen and (max-width: 767px) {
        width: 100%;
        order: 1;
        border: none;
        border-radius: 0;
        background-color: transparent;
        margin-left: 0;
        &.mr-50 {
            margin-right: 0;
        }

        &.right {
            margin: 0;
        }

        .MuiTypography-root {
            width: 100%;
        }
    }
`;

const ImageContent = styled.section`
    display: inline-block;
    width: 426px;
    box-shadow: 0px 0px 40px rgba(109, 109, 109, 0.25);
    &.step-2 {
        width: 456px;
    }
    &.step-last {
        width: 446px;
    }

    @media screen and (max-width: 767px) {
        width: calc(80% - 40px);
        order: 2;
        display: flex;
        justify-content: center;
        min-height: auto;
        margin: 0 20px;
        &.step-2 {
            width: calc(80% - 40px);
        }
        &.step-last {
            width: calc(80% - 40px);
        }
    }

    @media screen and (max-width: 568px) {
        width: calc(100% - 40px);
        &.step-2 {
            width: calc(100% - 40px);
        }
        &.step-last {
            width: calc(100% - 40px);
        }
        img {
            width: 100%;
        }
    }
`;

const HelpFeatures = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 60px;

    @media screen and (max-width: 767px) {
        padding-top: 30px;

        h5 {
            font-size: 24px;
        }
    }

    .carousel-wrapper {
        width: 1128px;
        max-width: 100%;
    }

    .carousel + .carousel,
    .control-arrow,
    .carousel-status {
        display: none !important;
    }

    .carousel .control-dots {
        margin: 0 !important;
        bottom: 100px !important;
        right: 320px;
        width: 55px;
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

    @media screen and (max-width: 1160px) {
        .carousel .control-dots {
            bottom: 20px !important;
            right: 0;
            left: 0;
            margin: 0 auto !important;
        }
    }

    @media screen and (max-width: 1024px) {
        .carousel {
            padding-bottom: 30px;
        }
        .carousel .control-dots {
            bottom: 10px !important;
        }
    }
`;

const CarouselItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 480px) {
        flex-wrap: wrap;
    }
`;

const CarouselImage = styled.div`
    width: 674px;
    margin-right: 80px;
    height: 380px;

    img {
        box-shadow: 0 0 40px rgba(109, 109, 109, 0.25);
        margin: 40px;
        width: calc(100% - 80px) !important;

        @media screen and (max-width: 1024px) {
            box-shadow: 0 0 20px rgba(109, 109, 109, 0.25);
            margin: 20px;
            width: calc(100% - 40px) !important;
        }

        @media screen and (max-width: 767px) {
            box-shadow: 0 0 10px rgba(109, 109, 109, 0.25);
            margin: 10px;
            width: calc(100% - 20px) !important;
        }
    }

    @media screen and (max-width: 1160px) {
        height: auto;
        margin-right: 40px;
    }

    @media screen and (max-width: 767px) {
        flex-shrink: 1;
        width: 48%;
        margin-right: 30px;
    }

    @media screen and (max-width: 480px) {
        flex-grow: 1;
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

const CarouselText = styled.div`
    text-align: left;
    width: 374px;
    flex-shrink: 0;

    .bold {
        font-weight: 700;
        display: inline-block;
    }

    @media screen and (max-width: 767px) {
        flex-shrink: 1;
        width: 48%;

        p {
            font-size: 16px;
            line-height: 1.5;
        }
    }

    @media screen and (max-width: 480px) {
        flex-grow: 1;
        width: 100%;
        margin-right: 0;
        padding: 0 15px 10px 15px;
        margin-bottom: 0;
    }
`;

const Helpfaq = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 40px;
    padding-bottom: 70px;
    background-color: #ebf2ff;

    @media screen and (max-width: 980px) {
        .faq-mob {
            padding-inline: 10px;
        }
    }

    @media screen and (max-width: 767px) {
        padding-top: 30px;

        h5 {
            font-size: 24px;
        }

        .faq-mob {
            margin-top: 30px;
        }
    }

    @media screen and (max-width: 640px) {
        .faq-mob {
            button {
                font-size: 16px;
            }
        }
    }
`;

const HelpContact = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 50px;
    background-color: #fff;

    @media screen and (max-width: 767px) {
        padding-top: 30px;

        h5 {
            font-size: 24px;
        }
    }
`;

const FormContainer = styled.div`
    display: flex;
    width: 744px;
    max-width: 95%;
    flex-wrap: wrap;
    background-color: #ebf2ff;
    padding: 34px 96px 63px 96px;
    border-radius: 6px;
    border: 1px solid #9e9e9e;

    @media screen and (max-width: 767px) {
        padding-inline: 15px;
    }
`;

export const Main = snackbar((props: ISnackBarMessage) => {
    const handleClose = () => {
        setOpen(false);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm();
    const feedbackLength = watch("feedback", "");
    const onSubmit = (data: FieldValues) => {
        if (data.name.trim() !== "" && data.email.trim() !== "" && data.feedback.trim() !== "") {
            data = {
                name: data.name.trim(),
                email: data.email.trim(),
                phonenumber: data.phonenumber.trim(),
                feedback: data.feedback.trim(),
            };
            axios
                .post(APP_CONSTANT.webApi.feedback, data, {
                    headers: {
                        Timezone: TIME_ZONE,
                    },
                })
                .then((response) => {
                    if (props.snackbarShowMessage) {
                        props.snackbarShowMessage(response.data.message, "success", 5000);
                    }
                })
                .catch((error) => {
                    if (props.snackbarShowMessage) {
                        props.snackbarShowMessage(error.response.data.message, "error", 5000);
                    }
                });
            reset();
        }
    };
    const [currentQuestion, setCurrentQuestion] = useState<Ifaq>();
    const [open, setOpen] = useState(false);
    const handleOpen = (question: Ifaq) => {
        setCurrentQuestion(question);
        setOpen(true);
    };

    const faq: Ifaq[] = [
        {
            title: "How To Get Access Token",
            type: "video",
            url: "https://export-comments.s3.ap-south-1.amazonaws.com/exportcomments-how-to-get-access-token.webm",
        },
        {
            title: "Login Demo",
            type: "video",
            url: "https://export-comments.s3.ap-south-1.amazonaws.com/login-demo-formatted.mp4",
        },
        {
            title: "Onboarding Demo",
            type: "video",
            url: "https://export-comments.s3.ap-south-1.amazonaws.com/export-comments-e2e-demo.mp4",
        },
    ];

    function TextMaskCustom(prop: any) {
        const { inputRef, ...other } = prop;

        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    if (typeof inputRef === "function") {
                        inputRef(ref ? ref.inputElement : null);
                    }
                }}
                mask={[
                    "(",
                    /\d/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                ]}
                placeholderChar={"\u2000"}
                guide={false}
                keepCharPositions
            />
        );
    }
    return (
        <MainContainer>
            <div className="landing-page">
                <PluginBanner />

                <Container
                    sx={{ mt: 4, my: 1, maxWidth: "1173px !important" }}
                    style={{ background: "#EDE8F4", display: "none" }}
                >
                    <NewFeatures />
                </Container>

                {/* New version start  */}
                <Container maxWidth={false} style={{ background: "#EDE8F4" }}>
                    <Container sx={{ mt: 4, my: 1 }}>
                        <NewFeatures />
                    </Container>
                </Container>
                {/* New version end  */}

                <HelpRoadmap>
                    <HelpContainer className="roadmap-bg">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "28px",
                                textAlign: "center",
                                width: "100%",
                                marginBottom: "60px",
                                fontWeight: 700,
                            }}
                        >
                            Get started to iterate faster by downloading the plugin
                        </Typography>
                        <RoadmapRow>
                            <TextContent>
                                <Chip
                                    label="Step 1"
                                    sx={{
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        backgroundColor: "#ebf2ff",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        height: "24px",
                                    }}
                                />
                                <Typography variant="body2">
                                    Open Figma file and Export Comments Plugin from the plugin
                                    section.
                                </Typography>
                            </TextContent>
                            <ImageContent>
                                <CardMedia
                                    component="img"
                                    image="../../images/step-1.jpg"
                                    alt="Step 1"
                                />
                            </ImageContent>
                        </RoadmapRow>

                        <RoadmapRow>
                            <ImageContent className="step-2">
                                <CardMedia
                                    component="img"
                                    image="../../images/step-2.jpg"
                                    alt="Step 2"
                                />
                            </ImageContent>
                            <TextContent className="right">
                                <Chip
                                    label="Step 2"
                                    sx={{
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        backgroundColor: "#ebf2ff",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        height: "24px",
                                    }}
                                />
                                <Typography variant="body2">
                                    Get access token and copy/paste the link. Also enter the Figma
                                    file link and then click on &apos;Export comments to
                                    Dashboard&apos; button.
                                </Typography>
                            </TextContent>
                        </RoadmapRow>

                        <RoadmapRow>
                            <TextContent className="mr-50">
                                <Chip
                                    label="Step 3"
                                    sx={{
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        backgroundColor: "#ebf2ff",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        height: "24px",
                                    }}
                                />
                                <Typography variant="body2">
                                    All comments will be exported to the Dashboard which can be
                                    accessed for reference.
                                </Typography>
                            </TextContent>
                            <ImageContent className="step-last">
                                <CardMedia
                                    component="img"
                                    image="../../images/step-3.jpg"
                                    alt="Step 3"
                                />
                            </ImageContent>
                        </RoadmapRow>
                    </HelpContainer>
                </HelpRoadmap>

                <HelpFeatures>
                    <HelpContainer>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "28px",
                                textAlign: "center",
                                width: "100%",
                                marginBottom: "10px",
                                fontWeight: 700,
                            }}
                        >
                            Features that will accelerate your everyday tasks.
                        </Typography>
                        <div className="carousel-wrapper">
                            <Carousel
                                autoPlay
                                infiniteLoop
                                useKeyboardArrows
                                showStatus={false}
                                showArrows={false}
                            >
                                <CarouselItem>
                                    <CarouselImage>
                                        <CardMedia
                                            component="img"
                                            image="../../images/bookmark-slide.jpg"
                                            alt="Bookmark"
                                        />
                                    </CarouselImage>
                                    <CarouselText>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "22px",
                                                lineHeight: "33px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            <span className="bold">Bookmark&nbsp;</span>
                                            your projects and have them categorised as a separate
                                            section.
                                        </Typography>
                                    </CarouselText>
                                </CarouselItem>
                                <CarouselItem>
                                    <CarouselImage>
                                        <CardMedia
                                            component="img"
                                            image="../../images/share-slide.jpg"
                                            alt="Share"
                                        />
                                    </CarouselImage>
                                    <CarouselText>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "22px",
                                                lineHeight: "33px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            Easily&nbsp;
                                            <span className="bold">share&nbsp;</span>
                                            file with team members and be on the same page.
                                        </Typography>
                                    </CarouselText>
                                </CarouselItem>
                                <CarouselItem>
                                    <CarouselImage>
                                        <CardMedia
                                            component="img"
                                            image="../../images/reply-slide.jpg"
                                            alt="Reply"
                                        />
                                    </CarouselImage>
                                    <CarouselText>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "22px",
                                                lineHeight: "33px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            <span className="bold">Reply&nbsp;</span>
                                            to other people&apos;s&nbsp;
                                            <span className="bold">comments&nbsp;</span>
                                            and let your thoughts be heard.
                                        </Typography>
                                    </CarouselText>
                                </CarouselItem>
                                <CarouselItem>
                                    <CarouselImage>
                                        <CardMedia
                                            component="img"
                                            image="../../images/filter-slide.jpg"
                                            alt="Filter"
                                        />
                                    </CarouselImage>
                                    <CarouselText>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "22px",
                                                lineHeight: "33px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            <span className="bold">Filter comments&nbsp;</span>
                                            according to your choice
                                        </Typography>
                                    </CarouselText>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </HelpContainer>
                </HelpFeatures>

                <Helpfaq>
                    <HelpContainer>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "28px",
                                textAlign: "center",
                                width: "100%",
                                fontWeight: 700,
                            }}
                        >
                            Do you have more questions on your mind?
                        </Typography>

                        <Box
                            className="faq-mob"
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                marginTop: "50px",
                                paddingInline: "95px",
                                justifyContent: "flex-start",
                                typography: "h5",
                                "& > :not(style)": {
                                    py: 2,
                                    borderBottom: "1px solid #9e9e9e",
                                    width: "100%",
                                    textAlign: "left",
                                },
                            }}
                        >
                            {faq.map((question, index) => (
                                <Button
                                    onClick={() => {
                                        handleOpen(question);
                                    }}
                                    id={`LP-faq-question-${index}`}
                                    sx={{
                                        borderRadius: "0",
                                        justifyContent: "start",
                                        fontSize: "20px",
                                        color: "#2979ff",
                                        textTransform: "none",
                                    }}
                                    key={`action-${index + 1}`}
                                >
                                    {question.title}
                                </Button>
                            ))}
                            {currentQuestion && (
                                <VideoModal
                                    isMenuOpen={open}
                                    // setIsMenuOpen={setOpen}
                                    handleClose={handleClose}
                                    title={currentQuestion.title}
                                    mediaInfo={{
                                        src: currentQuestion.url,
                                        controls: currentQuestion.type === "video",
                                    }}
                                />
                            )}
                        </Box>
                    </HelpContainer>
                </Helpfaq>

                <HelpContact>
                    <FormContainer>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "28px",
                                textAlign: "center",
                                width: "100%",
                                marginBottom: "14px",
                                color: "#000",
                                fontWeight: 700,
                            }}
                        >
                            Do you have any feedback?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                textAlign: "center",
                                width: "100%",
                                fontWeight: "400",
                                marginBottom: "26px",
                                color: "#616161",
                            }}
                        >
                            Send us a brief note about your thoughts and we can try to get back to
                            you as soon as possible.
                        </Typography>
                        <Box
                            sx={{
                                "& .MuiTextField-root": {
                                    mb: 1,
                                    width: "100%",
                                },
                                ".MuiInput-input": { paddingBlock: "15px" },
                                padding: "30px 30px 24px 30px",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "24px",
                                    textAlign: "left",
                                    width: "100%",
                                    marginBottom: "12px",
                                    color: "#212121",
                                    fontWeight: "400",
                                }}
                            >
                                We&apos;d love to hear from you
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} id="LP-feedback-submit">
                                <TextField
                                    id="LP-feedback-fullname"
                                    hiddenLabel
                                    placeholder="Full Name"
                                    variant="standard"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name cannot be empty.",
                                        },
                                        validate: validateName,
                                    })}
                                    helperText={errors.name && errors.name.message}
                                    error={Boolean(errors.name)}
                                />
                                <TextField
                                    // error={emailValue.invalid}
                                    id="LP-feedback-email"
                                    hiddenLabel
                                    placeholder="Email"
                                    variant="standard"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email cannot be empty.",
                                        },
                                        validate: validateEmail,
                                    })}
                                    helperText={errors.email && errors.email.message}
                                    error={Boolean(errors.email)}
                                />
                                <TextField
                                    id="LP-feedback-phone-number"
                                    hiddenLabel
                                    placeholder="Phone Number (Optional)"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    InputProps={{
                                        inputComponent: TextMaskCustom,
                                    }}
                                    {...register("phonenumber", {})}
                                />

                                <TextField
                                    id="LP-feedback-description"
                                    hiddenLabel
                                    placeholder="Any message for us?"
                                    multiline
                                    variant="standard"
                                    {...register("feedback", {
                                        required: {
                                            value: true,
                                            message: "Feedback cannot be empty.",
                                        },
                                        validate: {
                                            noSpaces: (value) =>
                                                value.trim().length !== 0 ||
                                                "Feedback cannot be empty.",
                                        },
                                    })}
                                    helperText={errors.feedback && errors.feedback.message}
                                    error={Boolean(errors.feedback)}
                                    inputProps={{
                                        maxLength: 1000,
                                    }}
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    InputProps={{
                                        endAdornment: (
                                            <>{`${
                                                feedbackLength && feedbackLength.trim().length
                                                    ? feedbackLength.length
                                                    : 0
                                            }/1000`}</>
                                        ),
                                    }}
                                    rows={4}
                                />

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: "center",
                                        marginTop: "25px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        type="submit"
                                    >
                                        Send this feedback
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </FormContainer>
                </HelpContact>
            </div>

            <GlobalFooter />
        </MainContainer>
    );
});
