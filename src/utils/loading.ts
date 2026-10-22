"use client";

import defaultLoader from "../assets/loader.gif";

const loadingMessagesForComments = [
    "The bits are flowing slowly today...",
    "A computer will do what you tell it to do, but that may be much different from what you had in mind.",
    "Doing the heavy lifting...",
    "Grabbing extra minions...",
    "Swapping time and space...",
    "I swear it's almost done.",
    "Where did all the internets go",
];

const loadingMessagesForProjects = [
    "Mining some bitcoins...",
    "Bored of slow loading spinner, buy more RAM!",
    "Digested cookies being baked again.",
    "Please wait, while we purge the Decepticons for you. Yes, You can thanks us later!",
    "Don't worry, a few bits tried to escape, but we caught them",
];

const loadingImagesForComments = [
    "https://export-comments.s3.ap-south-1.amazonaws.com/load-anim-01.gif",
    "https://export-comments.s3.ap-south-1.amazonaws.com/load-anim-02.gif",
    "https://export-comments.s3.ap-south-1.amazonaws.com/load-anim-03.gif",
];
const loadingImagesForProjects = [defaultLoader.src];

/*
 * Random picks would differ between the server render and hydration, so the first
 * element is used until the page has hydrated; afterwards the choice is random again.
 */
let hydrated = false;
if (typeof window !== "undefined") {
    setTimeout(() => {
        hydrated = true;
    }, 1500);
}
const pick = <T>(list: T[]) => (hydrated ? list[Math.floor(Math.random() * list.length)] : list[0]);

const getLoadingMessage = (type: string) => {
    let message: string[] = [""];
    switch (type) {
        case "comments":
        case "prototypes":
            message = loadingMessagesForComments;
            break;
        case "projects":
            message = loadingMessagesForProjects;
            break;
        default:
            message = ["Please wait while we are fetching your project list"];
    }

    return pick(message);
};

const getLoadingImage = (type: string) => {
    let image: string[] = [""];
    switch (type) {
        case "comments":
        case "prototypes":
            image = loadingImagesForComments;
            break;
        case "projects":
            image = loadingImagesForProjects;
            break;
        default:
            image = [defaultLoader.src];
    }

    return pick(image);
};

export { getLoadingImage, getLoadingMessage };
