"use client";

export const NoProjectsFound = () => (
    <div className="flex h-[calc(100vh-145px)] flex-wrap content-center justify-center text-lg leading-[25px] font-medium text-ink max-md:h-[calc(100vh-180px)]">
        <div className="flex w-full flex-wrap justify-center">
            No Projects Found
            <p className="mt-1 w-full text-center text-sm leading-5 font-normal text-muted">
                There seems to be no project available to show.
                <span className="block">You may either re-apply the filter or search a new project.</span>
            </p>
        </div>
    </div>
);
