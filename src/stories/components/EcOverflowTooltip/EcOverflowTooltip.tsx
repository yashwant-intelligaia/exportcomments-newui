import { Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import { MutableRefObject, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type EcOverflowTooltipProps = TooltipProps & {
    childRef?: MutableRefObject<any>;
    description?: string | ReactNode;
    titleFontWeight?: string | ReactNode;
};
const EcOverflowTooltip = styled(
    ({ className, titleFontWeight, childRef, ...props }: EcOverflowTooltipProps) => {
        const [showHover, setShowHover] = useState(false);

        const compareSize = () => {
            setShowHover(childRef?.current.scrollWidth > childRef?.current.clientWidth);
        };

        // compare once and add resize listener on componentDidMount phase
        useEffect(() => {
            compareSize();
            window.addEventListener("resize", compareSize);
        }, []);

        // remove resize listener on componentWillUnmount phase
        useEffect(
            () => () => {
                window.removeEventListener("resize", compareSize);
            },
            []
        );
        return (
            <Tooltip
                {...props}
                disableHoverListener={!showHover}
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
                disableTouchListener={!showHover}
            />
        );
    }
)(() => ({
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

export { EcOverflowTooltip };
