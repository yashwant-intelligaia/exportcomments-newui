import { Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

type EcTooltipProps = TooltipProps & {
    description?: string | ReactNode;
    titleFontWeight?: string | ReactNode;
};
const EcTooltip = styled(({ className, titleFontWeight, ...props }: EcTooltipProps) => (
    <Tooltip
        {...props}
        classes={{ popper: className }}
        title={
            <>
                <Typography
                    style={
                        {
                            fontWeight: titleFontWeight || "bold",
                            fontSize: "14px",
                            marginBottom: "0",
                        } as React.CSSProperties
                    }
                >
                    {props.title}
                </Typography>
                {props.description && (
                    <p style={{ fontWeight: "normal", margin: "0" }}>{props.description}</p>
                )}
            </>
        }
    />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: "#212121",
        fontSize: 12,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.25)",
        padding: "8px 10px 8px",
        lineHeight: "16px",
        letterSpacing: "0.5px",
        maxWidth: "250px",
    },
}));

export { EcTooltip };
