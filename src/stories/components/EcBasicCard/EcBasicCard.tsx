"use client";

import React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Display";

interface CardComponentProps {
    heading: string;
    subheading: string;
    buttonText: string;
    onClick: () => void;
    imageUrl?: string;
    svgicon?: JSX.Element;
    buttonicon?: string;
    buttonsvgicon?: JSX.Element;
}

const EcBasicCard: React.FC<CardComponentProps> = ({
    heading,
    subheading,
    buttonText,
    onClick,
    imageUrl,
    svgicon,
    buttonicon,
    buttonsvgicon,
}) => (
    <Card className="flex h-full flex-col justify-between">
        <div className="flex-auto p-4">
            <div className="mb-4 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {imageUrl && <img src={imageUrl} alt="icon" />}
                {svgicon}
                <h3 className="font-sans text-xl font-semibold tracking-normal">{heading}</h3>
            </div>
            <p className="text-muted">{subheading}</p>
        </div>
        <div className="p-4">
            <Button variant="outlined" onClick={onClick}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {buttonicon && <img src={buttonicon} alt="icon" />}
                {buttonsvgicon}
                {buttonText}
            </Button>
        </div>
    </Card>
);

export { EcBasicCard };
