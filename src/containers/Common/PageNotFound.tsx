"use client";

import { Button } from "@/components/ui/Button";
import { useHistory } from "@/utils/navigation";

export const PageNotFound = () => {
    const history = useHistory();

    return (
        <div
            className="relative flex min-h-[400px] h-[calc(100vh-60px)] w-full items-start justify-start bg-cover bg-no-repeat pt-[50px] pl-[50px] text-white lg:pt-[100px] lg:pl-[100px] min-[1600px]:pt-[150px] min-[1600px]:pl-[150px]"
            style={{ backgroundImage: 'url("/error-404.png")' }}
        >
            <section className="flex w-[490px] max-w-full flex-wrap tracking-wide">
                <h1 className="mb-2.5 text-[28px] font-normal text-white sm:text-[34px] lg:text-[42px] min-[1140px]:text-[50px]">
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
            <footer className="absolute bottom-[30px] left-[50px] text-sm sm:text-[17px] lg:fixed lg:bottom-[100px] lg:left-[100px] min-[1600px]:bottom-[150px] min-[1600px]:left-[150px]">
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
