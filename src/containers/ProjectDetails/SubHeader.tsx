import { Box } from "@mui/material";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ProjectDetailsContext } from "../../contexts";
import { EcBreadcrumb } from "../../stories/components";
import { CommentsFilter } from "./CommentsFilter";
import { ProjectActions } from "./ProjectActions";
import { ProjectTitle } from "./ProjectTitle";
import { PrototypesFilter } from "./PrototypesFilter";
import { SubheaderToggle } from "./SubheaderToggle";

const FileNameContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    min-width: 45%;
    max-width: 100%;
    @media screen and (max-width: 767px) {
        width: 100%;
    }
    .heading--h4 {
        font-size: 26px;
        @media screen and (max-width: 767px) {
            font-size: 20px;
        }
        color: #212121;
        font-weight: 500;
        line-height: 25px;
        margin: 0;
        max-width: calc(100% - 5px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
            font-family: Roboto;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: 0.5px;
            text-align: left;
            display: block;
            color: #616161;
            position: relative;
            top: 2px;
        }
    }
`;

const SubHeaderSection = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-inline: 20px;
    padding-block: 23px 10px;
    box-sizing: border-box;

    @media screen and (max-width: 1023px) {
        .sub-header {
            align-items: flex-start !important;
        }
    }

    @media screen and (max-width: 767px) {
        .sub-header {
            flex-wrap: wrap;
        }
    }
`;

export const SubHeader = () => {
    const history = useHistory();
    const { view: viewBy, projectData } = useContext(ProjectDetailsContext);

    return (
        <>
            <SubHeaderSection className="sub-header">
                <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: { xl: 1, lg: 1, md: 0.2, sm: 2, xs: 2 } }}
                    width="100%"
                >
                    <EcBreadcrumb
                        data={[
                            {
                                title: "Projects",
                                active: true,
                                onClick: () => history.push("/projects"),
                            },
                            {
                                title: projectData?.fileName || "",
                            },
                        ]}
                    />
                    <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{
                            flexDirection: {
                                xl: "row",
                                lg: "row",
                                md: "row",
                                sm: "column",
                                xs: "column",
                            },
                        }}
                    >
                        <FileNameContainer>
                            <ProjectTitle />
                            <ProjectActions />
                        </FileNameContainer>
                        {viewBy === "comments" ? <CommentsFilter /> : <PrototypesFilter />}
                    </Box>
                </Box>
            </SubHeaderSection>

            <SubheaderToggle />
        </>
    );
};
