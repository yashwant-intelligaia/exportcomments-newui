"use client";

import dynamic from "next/dynamic";

import { Button } from "@/components/ui/Button";

import loaderJson from "../../animations/sparkinsRounded.json";
import designToolProductOfWeek from "../../assets/design-tool-product-of-week.svg";
import countBg from "../../assets/export-comments-bg.png";
import figma from "../../assets/figma-small.svg";
import heroBg from "../../assets/hero-bg.png";
import star from "../../assets/star.svg";
import ueProductOfWeek from "../../assets/ue-product-of-week.svg";
import { APP_CONSTANT } from "../../constants/AppConstant";
import { processPluginDownloadCount, useFetchPluginCount } from "../../hooks";

// Decorative animation: client-only, keeps the Lottie runtime out of the server render.
const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), { ssr: false });

const PluginBanner = () => {
    const { data: pluginDownloadResponse } = useFetchPluginCount();
    const downloadCount = processPluginDownloadCount(pluginDownloadResponse);

    return (
        <div
            className="flex w-full flex-col items-center justify-start bg-cover"
            style={{ backgroundImage: `url(${heroBg.src})` }}
        >
            <div className="flex w-full max-w-[47rem] flex-col items-center lg:mt-6">
                <p className="mb-2 text-lg leading-[1.562rem] font-semibold text-muted">Export Comments Plugin 5.0</p>
                <h1 className="mb-4 px-4 text-center font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.15] font-light tracking-[-0.025em] text-ink sm:mb-6 sm:px-8 md:mb-8 md:px-0 lg:mb-10 xl:mb-12">
                    Supercharge your figma comments and streamline your entire feedback process
                </h1>
                <Button
                    id="LP-get-plugin-button"
                    size="large"
                    onClick={() => {
                        window.open(APP_CONSTANT.pluginLink, "_blank");
                    }}
                    startIcon={
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="Figma Plugin" src="/dw-plugin-icon.svg" height={22} width={22} />
                    }
                >
                    Get this Plugin Free
                </Button>
            </div>
            <div className="relative mt-4 flex min-h-[40rem] w-full max-w-[61rem] flex-col items-end md:min-h-[30rem] md:flex-row">
                <div className="right-1/2 top-[5%] flex w-4/5 flex-col items-center gap-4 max-md:static max-md:w-full md:absolute md:top-[13%] md:w-[95%] md:translate-x-1/2 lg:w-[117%]">
                    <div
                        className="relative flex size-32 flex-col items-center justify-center rounded-full text-white md:size-36 lg:size-[10.5rem]"
                        style={{ background: "linear-gradient(90deg, #F6D365 0%, #FDA085 100%)" }}
                    >
                        <div className="absolute top-0 left-0 w-44 max-md:left-1/2 max-md:w-52 max-md:-translate-x-1/2">
                            <Lottie src={loaderJson} autoplay loop />
                        </div>
                        <div id="LP-download-count" className="mt-3 text-2xl leading-5 font-bold text-ink md:text-[2rem] lg:text-[2.5rem]">
                            {downloadCount}
                        </div>
                        <div className="mt-2 text-xs leading-5 font-bold tracking-[0.5px] text-ink lg:text-base">Total Downloads</div>
                        <div className="text-[0.65rem] leading-5 font-medium text-ink lg:mt-1 lg:text-xs">and still counting...</div>
                        <div className="absolute top-[0.45rem] -left-3 w-14">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={star.src} alt="Star Icon" />
                        </div>
                        <div className="absolute -top-2 -right-5 w-[4.25rem] sm:top-0 md:top-20 lg:top-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={figma.src} alt="Figma Icon" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start max-md:static md:absolute md:top-0 md:-right-6">
                        <button
                            type="button"
                            id="LP-product-hunt-link"
                            onClick={() => {
                                window.open(APP_CONSTANT.productHuntLink, "_blank");
                            }}
                            className="mb-3 flex size-32 cursor-pointer flex-col items-center justify-center rounded-full bg-[#fe6155] text-white"
                        >
                            <span className="-mt-1 flex w-full justify-center text-5xl leading-[3rem] font-bold">P</span>
                            <span className="flex w-full justify-center text-base leading-6 font-bold">Product Hunt</span>
                        </button>
                        <div className="w-52 lg:w-60 xl:w-[17.5rem]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={ueProductOfWeek.src} alt="User Experience product of the week" width="100%" />
                        </div>
                        <div className="w-52 lg:w-60 xl:w-[17.5rem]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={designToolProductOfWeek.src} alt="Design tool product of the week" width="100%" />
                        </div>
                        <div className="absolute top-72 right-1/2 w-52 translate-x-1/2 md:top-36 md:right-2 md:translate-x-0 lg:right-4 lg:w-60">
                            <Lottie src={loaderJson} autoplay loop />
                        </div>
                    </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={countBg.src} alt="export comments" className="max-w-full" />
            </div>
        </div>
    );
};

export { PluginBanner };
