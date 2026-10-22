import { Button } from "@mui/material";
import styled from "styled-components";

import noProjectsImg from "../../assets/no-projects.svg";

const NoProjectsContainer = styled.div`
    display: flex;
    min-height: 400px;
    height: calc(100vh - 60px);
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const NoProjectsHeading = styled.h1`
    font-size: 1.25rem;
    color: #212121;
    font-weight: 500;
    margin: 0;
    margin-top: 20px;
`;

const NoProjectsContent = styled.p`
    font-size: 1rem;
    color: #616161;
    margin-top: 5px;
    text-align: center;
`;

interface ProjectNotFoundPropsType {
    onAddNewProject: () => void;
}

const ProjectNotFound = (props: ProjectNotFoundPropsType) => {
    const { onAddNewProject } = props;
    return (
        <NoProjectsContainer>
            <img src={noProjectsImg} alt="No Projects" />
            <NoProjectsHeading>No Projects Found</NoProjectsHeading>
            <NoProjectsContent>
                Set up a new project by clicking the button below.
            </NoProjectsContent>
            <Button variant="contained" sx={{ marginTop: "15px" }} onClick={onAddNewProject}>
                Add new project
            </Button>
        </NoProjectsContainer>
    );
};

export { ProjectNotFound };
