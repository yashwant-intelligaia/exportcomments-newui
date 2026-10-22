import { Play } from "lucide-react";

export const NoPrototypesFound = () => (
    <div className="relative top-1/2 flex h-[calc(100vh-145px)] flex-wrap content-center justify-center text-lg leading-[25px] font-medium text-ink max-md:h-[calc(100vh-180px)]">
        <span className="mb-5 flex size-[150px] items-center justify-center rounded-full bg-surface-sunk">
            <Play className="size-16 text-muted" />
        </span>
        <div className="flex w-full flex-wrap justify-center">
            No Prototypes Found
            <p className="mt-1 w-full text-center text-sm leading-5 font-normal text-muted">
                There seems to be no prototypes available to show
                <span className="block">Try in some other time.</span>
            </p>
        </div>
    </div>
);
