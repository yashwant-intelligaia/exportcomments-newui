import { PlayArrowRounded as PlayArrowRoundedIcon } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { useContext } from "react";

import { ProjectCardContext } from "../../../contexts/ProjectCardContext";

const ProjectCardFooter = () => {
    const {
        data: { prototypeCount },
    } = useContext(ProjectCardContext);
    return (
        <Box
            style={{
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "flex-start",
                marginTop: "15px",
            }}
        >
            <Link
                style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                }}
                onClick={() => {}}
            >
                <PlayArrowRoundedIcon
                    style={{
                        color: "var(--Blue-60, #2979FF)",
                    }}
                />
                <Typography
                    sx={{
                        color: "var(--Blue-60, #2979FF)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "21px",
                        letterSpacing: "0.035px",
                        textDecoration: "underline",
                    }}
                >
                    View Prototypes
                </Typography>
                <Typography
                    sx={{
                        color: "var(--Blue-60, #2979FF)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "21px",
                        letterSpacing: "0.035px",
                        paddingLeft: "4px",
                    }}
                >
                    {prototypeCount}
                </Typography>
            </Link>
        </Box>
    );
};

export { ProjectCardFooter };
