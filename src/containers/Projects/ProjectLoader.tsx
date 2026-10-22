"use client";

import LoaderFile from "../../assets/loader-file.svg";

const ProjectLoader = ({ title = "Gathering info" }: { title?: string }) => (
    <div className="mt-4 flex items-center justify-center text-sm font-medium text-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LoaderFile.src} alt="Loader" className="mr-2 inline-block size-[25px] animate-spin [animation-duration:2s]" />
        {title}
    </div>
);

export { ProjectLoader };
