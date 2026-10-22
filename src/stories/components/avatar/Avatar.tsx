"use client";

import { Avatar } from "@/components/ui/Display";

const sizes = { small: 24, medium: 40, large: 56 };

export const SbAvatar = ({
    imageSrc = "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",
    imageAlt = "Remy Sharp",
    size = "medium",
    className,
}: {
    imageSrc?: string;
    imageAlt?: string;
    size?: "small" | "medium" | "large";
    className?: string;
}) => <Avatar src={imageSrc} name={imageAlt} size={sizes[size]} className={className} />;
