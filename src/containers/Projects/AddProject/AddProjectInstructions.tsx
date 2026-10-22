"use client";

import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";

// import playtutorial from "../../../assets/play-tutorial.png";
import { AddProjectContext } from "../../../contexts";
import { fetchDoNotShowAddProjectInstruction } from "../../../services/AuthService";
import { ConnectIcon, Downloadplugin, Generatetoken } from "../../../utils";

const AddProjectInstructions = () => {
    const { onChangeStep } = useContext(AddProjectContext);

    useEffect(() => {
        if (fetchDoNotShowAddProjectInstruction() === "true") {
            onChangeStep(2);
        }
    }, []);

    return (
        <Box maxWidth="400px" margin="0rem 0">
            <Typography variant="h6">Steps to connect your Figma project</Typography>
            <Box sx={{ my: 3, display: "flex", alignItems: "flex-start" }}>
                <Downloadplugin style={{ minWidth: "1.5rem", marginRight: "0.5rem" }} />
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Roboto",
                            fontWeight: 500,
                            fontSize: "18px",
                            lineHeight: "21px",
                            letterSpacing: "0.25px",
                        }}
                    >
                        Download Export comments plug-in
                    </Typography>
                    <Typography variant="body1">
                        Download export comments plug-in from the figma community and run the
                        plug-in
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <ConnectIcon style={{ minWidth: "1.5rem", marginRight: "0.5rem" }} />
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Roboto",
                            fontWeight: 500,
                            fontSize: "18px",
                            lineHeight: "21px",
                            letterSpacing: "0.25px",
                        }}
                    >
                        Connect your Figma account with Export comments
                    </Typography>
                    <Typography variant="body1">
                        Download export comments plug-in from the figma community and run the
                        plug-in
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <Generatetoken style={{ minWidth: "1.5rem", marginRight: "0.5rem" }} />
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Roboto",
                            fontWeight: 500,
                            fontSize: "18px",
                            lineHeight: "21px",
                            letterSpacing: "0.25px",
                        }}
                    >
                        Generate access token
                    </Typography>
                    <Typography variant="body1">
                        Download export comments plug-in from the figma community and run the
                        plug-in
                    </Typography>
                </Box>
            </Box>
            {/* TODO: uncomment below code once demo video will be available. */}
            {/* <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
                    <img src={playtutorial} alt="icon" style={{ marginRight: 8 }} />
                </Box> */}
        </Box>
    );
};

export { AddProjectInstructions };
