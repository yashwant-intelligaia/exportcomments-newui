import { Grid } from "@mui/material";
import { useState } from "react";

import { AddProjectDrawer } from "../containers";
import { useFetchProjectList } from "../hooks";
import { EcBasicCard } from "../stories/components";
import {
    // CircleplayIcon,
    FigmaIcon,
    PlusIcon,
    // TourplayIcon
} from "../utils";
import { ProjectListPage } from "./ProjectListPage";

const ProjectDashboard = () => {
    const { data: projectList } = useFetchProjectList({
        key: `all`,
    });
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const handleDrawerClose = () => {
        setDrawerContent(undefined);
    };
    return (
        <>
            {projectList?.length === 0 ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        ".MuiCard-root": {
                            boxShadow: "0px 6px 12px 0px #0000001F",
                            padding: "10px",
                            borderRadius: "10px",
                            ".MuiButton-outlinedPrimary": {
                                padding: "0.5rem 1rem",
                            },
                        },
                    }}
                >
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                        <EcBasicCard
                            svgicon={<FigmaIcon style={{ marginRight: "0.5rem" }} />}
                            heading="Add New Project"
                            subheading="Import your Figma projects to start comment statistics."
                            buttonText="Add Project"
                            onClick={() => {
                                setDrawerContent(<AddProjectDrawer onClose={handleDrawerClose} />);
                            }}
                            buttonsvgicon={<PlusIcon />}
                        />
                    </Grid>
                    {/* TODO: uncomment below code once demo video will be available. */}
                    {/* <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        sx={{
                            ".MuiCard-root": {
                                background:
                                    "linear-gradient(52.86deg, #2979FF -207.53%, #F5FCFE 52.19%)",
                                border: "1px solid #A9C9FF",
                            },
                        }}
                    >
                        <EcBasicCard
                            svgicon={<TourplayIcon style={{ marginRight: "0.5rem" }} />}
                            heading="Take a Quick Tour"
                            subheading="Explore all the essential features by watching short videos which will help you to complete your first ever goal with Export comment."
                            buttonText="Watch Demo"
                            onClick={() => {}}
                            buttonsvgicon={<CircleplayIcon />}
                        />
                    </Grid> */}
                </Grid>
            ) : (
                <ProjectListPage />
            )}
            {drawerContent && drawerContent}
        </>
    );
};

export { ProjectDashboard };
