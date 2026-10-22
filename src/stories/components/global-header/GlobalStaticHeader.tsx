"use client";

import { SbLogo } from "../branding-logo/BrandingLogo";

export const GlobalStaticHeader = () => (
    <header className="fixed top-0 z-[100] flex h-[60px] w-full items-center justify-between border-b border-line bg-surface px-5 max-sm:h-[50px]">
        <SbLogo />
    </header>
);
