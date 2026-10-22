"use client";

interface LoaderPropsType {
    image: string;
    message: string;
}

export const Loader = ({ image, message }: LoaderPropsType) => (
    <div className="absolute inset-x-0 top-[calc(50%-75px)] text-center">
        <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Loader" className="size-[200px]" />
            <p className="text-muted my-2 text-xl font-light">{message}</p>
        </div>
    </div>
);
