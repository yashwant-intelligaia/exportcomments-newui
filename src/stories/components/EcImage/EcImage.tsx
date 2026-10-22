"use client";

import { ImageListItem, ImageListItemProps } from "@mui/material";

const EcImage = (props: ImageListItemProps) => {
    const { children, ...rest } = props;
    return <ImageListItem {...rest}>{children}</ImageListItem>;
};

export { EcImage };
