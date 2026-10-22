"use client";

import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { TextField } from "@/components/ui/Form";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { NewFeatures, PluginBanner } from "../containers";
import VideoModal from "../containers/Home/VideoModal";
import { GlobalFooter } from "../stories/components/global-footer/GlobalFooter";
import { ISnackBarMessage } from "../types";
import { snackbar } from "../utils";
import { formatPhoneNumber, validateEmail, validateName } from "../utils/validation";

interface Ifaq {
    title: string;
    type: "img" | "video";
    url: string;
}

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <h2
        className={`font-display text-ink w-full text-center text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.15] font-light tracking-[-0.025em] ${className}`}
    >
        {children}
    </h2>
);

const STEPS = [
    {
        label: "Step 1",
        image: "/images/step-1.jpg",
        text: "Open Figma file and Export Comments Plugin from the plugin section.",
    },
    {
        label: "Step 2",
        image: "/images/step-2.jpg",
        text: "Get access token and copy/paste the link. Also enter the Figma file link and then click on 'Export comments to Dashboard' button.",
    },
    {
        label: "Step 3",
        image: "/images/step-3.jpg",
        text: "All comments will be exported to the Dashboard which can be accessed for reference.",
    },
];

const SLIDES = [
    {
        image: "/images/bookmark-slide.jpg",
        alt: "Bookmark",
        text: (
            <>
                <strong>Bookmark&nbsp;</strong>your projects and have them categorised as a separate section.
            </>
        ),
    },
    {
        image: "/images/share-slide.jpg",
        alt: "Share",
        text: (
            <>
                Easily&nbsp;<strong>share&nbsp;</strong>file with team members and be on the same page.
            </>
        ),
    },
    {
        image: "/images/reply-slide.jpg",
        alt: "Reply",
        text: (
            <>
                <strong>Reply&nbsp;</strong>to other people&apos;s&nbsp;<strong>comments&nbsp;</strong>and let your
                thoughts be heard.
            </>
        ),
    },
    {
        image: "/images/filter-slide.jpg",
        alt: "Filter",
        text: (
            <>
                <strong>Filter comments&nbsp;</strong>according to your choice
            </>
        ),
    },
];

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
    const phoneField = register("phonenumber");
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

    return (
        <div className="bg-surface py-2.5">
            <div className="flex flex-wrap justify-center">
                <PluginBanner />

                <div className="bg-purple-soft w-full">
                    <div className="mx-auto my-1 mt-4 max-w-[1173px] px-4">
                        <NewFeatures />
                    </div>
                </div>

                <section className="bg-paper flex w-full justify-center pt-11 max-md:pt-8">
                    <div className="flex w-[1128px] max-w-[95%] flex-wrap pb-8">
                        <SectionTitle className="mb-12 max-md:mb-4">
                            Get started to iterate faster by downloading the plugin
                        </SectionTitle>
                        {STEPS.map((step, i) => (
                            <div
                                key={step.label}
                                className={`my-6 flex w-full items-center justify-center gap-8 max-md:my-4 max-md:flex-wrap ${i === 1 ? "flex-row-reverse" : ""}`}
                            >
                                <div className="border-line bg-surface shadow-card w-[324px] max-w-full rounded-md border p-4">
                                    <span className="bg-blue-soft text-blue-ink mb-2.5 inline-block rounded-sm px-2.5 py-0.5 text-sm font-semibold">
                                        {step.label}
                                    </span>
                                    <p className="text-sm">{step.text}</p>
                                </div>
                                <div className="border-line bg-surface w-[500px] max-w-full overflow-hidden rounded-lg border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={step.image} alt={step.label} className="w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-surface flex w-full justify-center py-12">
                    <div className="w-[1128px] max-w-[95%]">
                        <SectionTitle className="mb-4">Features that will accelerate your everyday tasks.</SectionTitle>
                        <Carousel label="Features">
                            {SLIDES.map((slide) => (
                                <div
                                    key={slide.alt}
                                    className="flex flex-col items-center gap-6 px-4 py-6 md:flex-row md:justify-center"
                                >
                                    <div className="border-line max-w-[560px] overflow-hidden rounded-lg border">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={slide.image} alt={slide.alt} className="w-full" />
                                    </div>
                                    <p className="text-ink max-w-sm text-[22px] leading-[33px] font-normal [&_strong]:font-semibold">
                                        {slide.text}
                                    </p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </section>

                <section className="bg-paper flex w-full justify-center py-12">
                    <div className="w-[1128px] max-w-[95%]">
                        <SectionTitle>Do you have more questions on your mind?</SectionTitle>
                        <div className="mt-12 flex w-full flex-wrap justify-start px-0 md:px-24">
                            {faq.map((question, index) => (
                                <button
                                    type="button"
                                    key={`action-${index + 1}`}
                                    id={`LP-faq-question-${index}`}
                                    onClick={() => handleOpen(question)}
                                    className="border-muted text-blue-ink w-full border-b py-4 text-left text-xl hover:underline"
                                >
                                    {question.title}
                                </button>
                            ))}
                            {currentQuestion && (
                                <VideoModal
                                    isMenuOpen={open}
                                    handleClose={handleClose}
                                    title={currentQuestion.title}
                                    mediaInfo={{ src: currentQuestion.url, controls: currentQuestion.type === "video" }}
                                />
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-surface-sunk flex w-full justify-center py-12">
                    <div className="w-[640px] max-w-[92%]">
                        <SectionTitle className="mb-3.5">Do you have any feedback?</SectionTitle>
                        <p className="text-muted mb-6 w-full text-center text-lg">
                            Send us a brief note about your thoughts and we can try to get back to you as soon as
                            possible.
                        </p>
                        <div className="bg-surface shadow-card rounded-lg p-[30px] pb-6">
                            <h3 className="text-ink mb-3 w-full text-left font-sans text-2xl font-normal tracking-normal">
                                We&apos;d love to hear from you
                            </h3>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                id="LP-feedback-submit"
                                className="flex flex-col gap-3"
                            >
                                <TextField
                                    id="LP-feedback-fullname"
                                    placeholder="Full Name"
                                    aria-label="Full Name"
                                    {...register("name", {
                                        required: { value: true, message: "Name cannot be empty." },
                                        validate: validateName,
                                    })}
                                    helperText={errors.name && (errors.name.message as string)}
                                    error={Boolean(errors.name)}
                                />
                                <TextField
                                    id="LP-feedback-email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    {...register("email", {
                                        required: { value: true, message: "Email cannot be empty." },
                                        validate: validateEmail,
                                    })}
                                    helperText={errors.email && (errors.email.message as string)}
                                    error={Boolean(errors.email)}
                                />
                                <TextField
                                    id="LP-feedback-phone-number"
                                    placeholder="Phone Number (Optional)"
                                    aria-label="Phone Number"
                                    inputMode="tel"
                                    {...phoneField}
                                    onChange={(e) => {
                                        e.target.value = formatPhoneNumber(e.target.value);
                                        phoneField.onChange(e);
                                    }}
                                />
                                <TextField
                                    id="LP-feedback-description"
                                    placeholder="Any message for us?"
                                    aria-label="Feedback"
                                    multiline
                                    rows={4}
                                    maxLength={1000}
                                    {...register("feedback", {
                                        required: { value: true, message: "Feedback cannot be empty." },
                                        validate: {
                                            noSpaces: (value) =>
                                                value.trim().length !== 0 || "Feedback cannot be empty.",
                                        },
                                    })}
                                    helperText={errors.feedback && (errors.feedback.message as string)}
                                    error={Boolean(errors.feedback)}
                                    endAdornment={
                                        <span className="self-end text-xs">{`${feedbackLength && feedbackLength.trim().length ? feedbackLength.length : 0}/1000`}</span>
                                    }
                                />
                                <div className="mt-6 flex justify-center">
                                    <Button type="submit" endIcon={<ArrowRight className="size-4" />}>
                                        Send this feedback
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            <GlobalFooter />
        </div>
    );
});
