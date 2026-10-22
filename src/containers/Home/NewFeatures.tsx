"use client";

import { useContext, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { cn } from "@/components/ui/cn";

import { SizeContext } from "../../contexts/SizeContext";
import { EcImage } from "../../stories/components/EcImage/EcImage";
import { ExportCommentLightIcon, NewProjectIcon, NewUserIcon } from "../../utils";
import VideoModal from "./VideoModal";

const NewFeatures = () => {
    const [modal, setModal] = useState<JSX.Element>();
    const { width } = useContext(SizeContext);
    const iconSize = width > 768 ? 25 : 16;
    const NEW_FEATURES = [
        {
            image: "/images/add-project.svg",
            videoTitle: "Add New Projects",
            videoSrc: "https://export-comments.s3.ap-south-1.amazonaws.com/create-new-project.mp4",
            icon: <NewProjectIcon style={{ width: iconSize, height: iconSize }} />,
            tag: true,
            title: "Connect new figma project directly from ‘Export Comment’ dashboard.",
            subtitle:
                "With our new integration, you can directly connect to a Figma project from the dashboard by providing the valid figma file url. This feature provides the additional capability to connect your new projects to ‘Export Comments’ both ways.",
        },
        {
            image: "/images/add-users.svg",
            videoTitle: "Invite New Users",
            videoSrc: "https://export-comments.s3.ap-south-1.amazonaws.com/add-new-user.mp4",
            icon: <NewUserIcon style={{ width: iconSize, height: iconSize }} />,
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
                mediaInfo={{ src: NEW_FEATURES[index].videoSrc, controls: true }}
            />
        );
    };

    return (
        <>
            <section className="carousel-wrapper">
                <Carousel label="New features">
                    {NEW_FEATURES.map((feature, index) => (
                        <div key={feature.videoTitle} className="mt-5 h-full rounded-md p-[13px] sm:p-6 md:p-[50px]">
                            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
                                <EcImage
                                    id={`LP-modal-button-${index}`}
                                    onClick={() => handleOpenModal(index)}
                                    className={cn("cursor-pointer", width > 600 ? "mr-[5%] w-[95%]" : "w-full")}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={feature.image} width="100%" alt="Banner Placeholder" />
                                </EcImage>
                                <div className={cn("relative", width > 768 && "pt-4")}>
                                    <div className={cn("absolute right-1 z-10", width > 768 ? "-top-[30px]" : "top-1")}>
                                        {feature.tag && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src="/images/new-button.svg" width={width > 768 ? 70 : 50} alt="New Button" />
                                        )}
                                    </div>
                                    <div className={cn("flex items-start justify-start", width <= 600 && "mt-4")}>
                                        <div className="flex size-[35px] items-center justify-center rounded-full bg-blue p-2 md:size-[45px]">
                                            <ExportCommentLightIcon style={{ width: 25, height: 25 }} />
                                        </div>
                                        <div className="flex h-[35px] items-center justify-center gap-1 p-1 md:h-[45px] md:p-2">
                                            {[0, 1, 2].map((dot) => (
                                                <span key={dot} className="size-[7px] rounded-full bg-ink" />
                                            ))}
                                        </div>
                                        <div className="flex size-[35px] items-center justify-center md:size-[45px]">{feature.icon}</div>
                                    </div>
                                    <div className={cn("mt-3 flex flex-col items-start justify-center gap-3 text-left", width <= 600 && "pr-8")}>
                                        <h3 className={cn("font-sans font-bold tracking-normal text-ink", width > 820 ? "text-2xl" : "text-base")}>{feature.title}</h3>
                                        <p className={cn("font-medium", width > 820 ? "text-base" : "text-sm")}>{feature.subtitle}</p>
                                        <Button id={`LP-learn-more-button-${index}`} onClick={() => handleOpenModal(index)}>
                                            Learn More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>
            {modal}
        </>
    );
};

export { NewFeatures };
