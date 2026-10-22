import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

interface CardComponentProps {
    heading: string;
    subheading: string;
    buttonText: string;
    onClick: () => void;
    imageUrl?: string; // Optional image URL
    svgicon?: JSX.Element;
    buttonicon?: string; // Optional image URL
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
    <Card
        sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}
    >
        <CardContent sx={{ flex: "1 0 auto" }}>
            <Box display="flex" alignItems="center" mb={2}>
                {imageUrl && <img src={imageUrl} alt="icon" style={{ marginRight: 8 }} />}
                {svgicon}
                <Typography variant="h5" component="div">
                    {heading}
                </Typography>
            </Box>
            <Typography sx={{ flexGrow: 1 }} color="text.secondary">
                {subheading}
            </Typography>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
            <Button variant="outlined" sx={{ gap: "0.5rem" }} onClick={onClick}>
                {buttonicon && <img src={buttonicon} alt="icon" style={{ marginRight: 8 }} />}
                {buttonsvgicon}
                {buttonText}
            </Button>
        </CardActions>
    </Card>
);

export { EcBasicCard };
