import { Box } from "@mui/material";
import { useRef } from "react";

import { EcOverflowTooltip } from "./EcOverflowTooltip";

export default {
    title: "Atomic/EcOverflowTooltip",
    component: EcOverflowTooltip,
};

/*
 * Example EcOverflowTooltip story with React Hooks.
 */
export const Default = () => {
    const textElementRef = useRef();
    const title =
        "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain";
    return (
        <EcOverflowTooltip childRef={textElementRef} title={title} placement="bottom" arrow>
            <Box
                ref={textElementRef}
                sx={{
                    fontSize: "1.375rem",
                    paddingRight: "5px",
                    display: "inline-block",
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {title}
            </Box>
        </EcOverflowTooltip>
    );
};
