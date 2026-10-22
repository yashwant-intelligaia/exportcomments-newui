"use client";

export const NoProjectsFound = () => (
    <div className="text-ink flex h-[calc(100vh-145px)] flex-wrap content-center justify-center text-lg leading-[25px] font-medium max-md:h-[calc(100vh-180px)]">
        <div className="flex w-full flex-wrap justify-center">
            No Projects Found
            <p className="text-muted mt-1 w-full text-center text-sm leading-5 font-normal">
                There seems to be no project available to show.
                <span className="block">You may either re-apply the filter or search a new project.</span>
            </p>
        </div>
    </div>
);
