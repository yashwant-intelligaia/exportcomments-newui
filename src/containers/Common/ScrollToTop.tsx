import { ArrowUpward as ArrowUpwardIcon } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return function cleanup() {
            window.removeEventListener("scroll", checkScrollTop);
        };
    });

    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 100) {
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 100) {
            setShowScroll(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Box
                className="scroll-to-top"
                onClick={handleScrollToTop}
                style={{
                    display: showScroll ? "flex" : "none",
                }}
                sx={{
                    position: "fixed",
                    cursor: "pointer",
                    bottom: "20px",
                    right: "20px",
                    color: "#fff",
                    background: "#fff",
                    width: "40px",
                    textAlign: "center",
                    height: "40px",
                    lineHeight: "40px",
                    borderRadius: "50%",
                    border: "2px solid #1976d2",
                    fontSize: "22px",
                    transition: "all 0.5s",
                    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
                    zIndex: "999999",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:active": {
                        boxShadow:
                            "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
                    },
                    svg: {
                        color: "#1976d2",
                    },
                }}
            >
                <ArrowUpwardIcon />
            </Box>
        </>
    );
};
