"use client";

import { Button } from "@/components/ui/Button";
import { useHistory } from "@/utils/navigation";

export const PageNotFound = () => {
    const history = useHistory();

    return (
        <div
            className="relative flex h-[calc(100vh-60px)] min-h-[400px] w-full items-start justify-start bg-cover bg-no-repeat pt-[50px] pl-[50px] text-white min-[1600px]:pt-[150px] min-[1600px]:pl-[150px] lg:pt-[100px] lg:pl-[100px]"
            style={{ backgroundImage: 'url("/error-404.png")' }}
        >
            <section className="flex w-[490px] max-w-full flex-wrap tracking-wide">
                <h1 className="mb-2.5 text-[28px] font-normal text-white min-[1140px]:text-[50px] sm:text-[34px] lg:text-[42px]">
                    Oops, looks like <br />
                    you are lost in space!
                </h1>
                <div className="mt-5 flex items-center text-base sm:text-xl lg:text-[26px]">
                    Lets take you back
                    <Button onClick={() => history.push("/")} className="ml-2">
                        Home
                    </Button>
                </div>
            </section>
            <footer className="absolute bottom-[30px] left-[50px] text-sm min-[1600px]:bottom-[150px] min-[1600px]:left-[150px] sm:text-[17px] lg:fixed lg:bottom-[100px] lg:left-[100px]">
                <p>
                    Image rights by &nbsp;
                    <a href="https://spacetantra.com/" className="underline">
                        Spacetantra
                    </a>
                    <br />
                    &copy; 2024 Intelligaia. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
};
