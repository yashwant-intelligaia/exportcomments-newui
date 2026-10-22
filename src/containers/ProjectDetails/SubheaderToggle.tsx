import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ProjectDetailsContext } from "../../contexts";
import { ProjectViewByType } from "../../types";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        h6 {
            font-size: 1rem !important;
        }
    }
`;

export const SubheaderToggle = () => {
    const { view, setSearchInput, projectData, onChangeView } = useContext(ProjectDetailsContext);
    const viewByValue = projectData?.editorType === "figjam" ? "comments" : view;
    const history = useHistory();

    const handleChangeView = (
        event: React.MouseEvent<HTMLElement>,
        newValue: ProjectViewByType
    ) => {
        event.preventDefault();
        if (view !== newValue) {
            setSearchInput("");
        }
        onChangeView(newValue);
        history.push(`/project/${projectData?.projectId}/details?view=${newValue}`);
    };

    return (
        <Container>
            <Typography
                variant="h6"
                style={{
                    fontSize: "1.25rem",
                    lineHeight: "30px",
                    letterSpacing: "0.25%",
                    margin: "0.325rem 0",
                }}
            >
                All {view === "prototypes" ? "Prototypes" : "Comments"}
            </Typography>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Typography
                    style={{
                        marginRight: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                    }}
                >
                    View by
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={viewByValue}
                    exclusive
                    onChange={handleChangeView}
                    aria-label="Platform"
                    sx={{
                        height: "30px",
                        ".MuiToggleButton-root": {
                            border: "1px solid #2979FF",
                            color: "#2979FF",
                            "&.MuiToggleButton-primary": {
                                color: "#2979FF",
                                "&.Mui-selected": {
                                    color: "#fff",
                                    background: "#2979FF",
                                },
                            },
                        },
                    }}
                    disabled={projectData?.editorType === "figjam"}
                >
                    <ToggleButton value="comments" sx={{ textTransform: "none" }}>
                        Comments
                    </ToggleButton>
                    {/* TODO: add disabled state for toggleButton */}
                    <ToggleButton value="prototypes" sx={{ textTransform: "none" }}>
                        Prototypes
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Container>
    );
};
