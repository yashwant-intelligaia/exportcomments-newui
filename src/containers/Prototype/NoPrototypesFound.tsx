import { Play } from "lucide-react";

export const NoPrototypesFound = () => (
    <div className="text-ink relative top-1/2 flex h-[calc(100vh-145px)] flex-wrap content-center justify-center text-lg leading-[25px] font-medium max-md:h-[calc(100vh-180px)]">
        <span className="bg-surface-sunk mb-5 flex size-[150px] items-center justify-center rounded-full">
            <Play className="text-muted size-16" />
        </span>
        <div className="flex w-full flex-wrap justify-center">
            No Prototypes Found
            <p className="text-muted mt-1 w-full text-center text-sm leading-5 font-normal">
                There seems to be no prototypes available to show
                <span className="block">Try in some other time.</span>
            </p>
        </div>
    </div>
);
