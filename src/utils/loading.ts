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
const loadingImagesForProjects = [defaultLoader];

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

    return message[Math.floor(Math.random() * message.length)];
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
            image = [defaultLoader];
    }

    return image[Math.floor(Math.random() * image.length)];
};

export { getLoadingImage, getLoadingMessage };
