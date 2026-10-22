"use client";

import { HTMLAttributes } from "react";

const EcImage = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div {...rest}>{children}</div>
);

export { EcImage };
