import { SbAvatar } from "./Avatar";

export default {
    title: "Atomic/Avatar",
    component: SbAvatar,
    argTypes: {
        imageSrc: { control: "file" },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

const Template = (args: any) => <SbAvatar {...args} />;

export const Avatar: any = Template.bind({} as any);
Avatar.args = {
    size: "medium",
    imageAlt: "Remy Sharp",
};

export const DefaultAvatar: any = Template.bind({});
DefaultAvatar.args = {
    size: "medium",
    imageAlt: "",
    imageSrc: "/broken-image.jpg",
};

export const LetterAvatar: any = Template.bind({});
LetterAvatar.args = {
    size: "medium",
    imageAlt: "Remy Sharp",
    imageSrc: "/broken-image.jpg",
};
