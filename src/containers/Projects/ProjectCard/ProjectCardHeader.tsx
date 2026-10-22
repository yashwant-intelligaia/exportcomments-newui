import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";

import figmaIcon from "../../../assets/figmaIcon.svg";
import { ProjectCardContext } from "../../../contexts/ProjectCardContext";
import { EcEditMode } from "../../../stories/components/EcEditMode";
import { EcTooltip } from "../../../stories/components/EcTooltip";

export interface ProjectCardHeaderPropsType {
    isEditable?: boolean;
    actions?: JSX.Element;
}

const Wrapper = styled.div`
    .card-header {
        .card-header-left {
            max-width: calc(100% - 80px);
            flex-grow: 1;
            form {
                width: 100%;
            }
        }
        h6 {
            font-size: 1rem;
            color: #383874;
            line-height: 24px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        a {
            cursor: pointer;
        }
    }
`;

const ProjectCardHeader = (props: ProjectCardHeaderPropsType) => {
    const { isEditable, actions } = props;
    const {
        data: { title, subTitle },
    } = useContext(ProjectCardContext);
    return (
        <Wrapper>
            <Box
                className="card-header"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    className="card-header-left"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <EcTooltip title="Design file" arrow placement="top">
                        <img
                            src={figmaIcon}
                            alt="Figma"
                            style={{
                                marginRight: "10px",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                    </EcTooltip>

                    <EcTooltip title={title} placement="top" arrow>
                        {isEditable ? (
                            <EcEditMode
                                placeholder="Enter project title"
                                title={title}
                                onSubmit={async () => true}
                                name="project"
                                showTooltip
                                isLoading={false}
                            />
                        ) : (
                            <Typography variant="h6">{title}</Typography>
                        )}
                    </EcTooltip>
                </Box>

                {/* Header Actions */}
                {actions && actions}
            </Box>
            {subTitle && (
                <Typography
                    sx={{
                        mb: 3,
                        fontSize: "0.75rem",
                        color: "#383874",
                        lineHeight: "16px",
                        opacity: "0.6",
                    }}
                    color="text.secondary"
                >
                    {subTitle}
                </Typography>
            )}
        </Wrapper>
    );
};

export { ProjectCardHeader };
