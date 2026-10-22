"use client";

import Link from "next/link";

import { InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

import DribbleIcon from "../../../assets/dribble.svg";
import Intelligaia from "../../../assets/logo-intelligaia.svg";
import MediumIcon from "../../../assets/medium.svg";
import XIcon from "../../../assets/x-social.svg";
import { APP_CONSTANT } from "../../../constants/AppConstant";

const socialClass =
    "inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-sunk hover:text-ink";

export const GlobalFooter = () => (
    <footer id="footer" className="mx-auto mt-11 w-[1128px] max-w-[95%] max-sm:mt-2.5">
        <div className="flex justify-center">
            <div className="flex w-[70%] justify-center max-lg:w-[90%]">
                <div className="w-1/3 max-w-[280px] text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={Intelligaia.src} alt="Intelligaia" className="inline-block h-[30px] w-[119px]" />
                    <span className="text-muted mt-2 block text-sm font-medium">Get to know us!</span>
                    <div className="mt-5 flex justify-center gap-2">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={APP_CONSTANT.social.twitter}
                            className={socialClass}
                            id="LP-twitter-link"
                            aria-label="X"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={XIcon.src} alt="" width={14} height={14} />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={APP_CONSTANT.social.dribble}
                            className={socialClass}
                            id="LP-dribble-link"
                            aria-label="Dribbble"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={DribbleIcon.src} alt="" width={20} height={20} />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={APP_CONSTANT.social.medium}
                            className={socialClass}
                            id="LP-medium-link"
                            aria-label="Medium"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={MediumIcon.src} alt="" width={20} height={20} />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={APP_CONSTANT.social.instagram}
                            className={socialClass}
                            id="LP-instagram-link"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={APP_CONSTANT.social.linkedIn}
                            className={socialClass}
                            id="LP-linkedin-link"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-muted mx-auto my-4 flex max-w-[1536px] flex-col items-center gap-2 pt-3 text-sm font-medium sm:flex-row sm:justify-between">
            <span>&copy; 2024 Intelligaia. All rights reserved.</span>
            <span>
                <Link href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                </Link>
                &nbsp;|&nbsp;
                <Link href="/terms-of-use" className="hover:underline">
                    Terms Of Use
                </Link>
            </span>
        </div>
    </footer>
);
