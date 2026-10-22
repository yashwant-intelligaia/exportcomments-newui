import { Accordion } from "@mui/material";

import { ProcessedPageDataType } from "../../types/prototype";
import { PrototypeAccordionDetails } from "./PrototypeAccordionDetails";
import { PrototypeAccordionSummary } from "./PrototypeAccordionSummary";

interface PrototypeAccordionPropsType {
    data: ProcessedPageDataType;
    onExpandToggle: (status: boolean) => void;
    figmaImage?: Record<string, string>;
    figmaImageLoading: boolean;
}

const PrototypeAccordion = (props: PrototypeAccordionPropsType) => {
    const { data, onExpandToggle, figmaImage, figmaImageLoading } = props;
    return (
        <Accordion
            sx={{
                marginBottom: 2,
                "&.MuiAccordion-root": {
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
                    "&:before": {
                        display: "none",
                    },
                },
                ".MuiAccordionDetails-root": {
                    marginTop: "1.5rem",
                    ".MuiGrid-container": {
                        borderTop: "1px dashed #E1E1E3",
                        maxHeight: "220px",
                        overflowY: "auto",
                    },
                    svg: {
                        cursor: "pointer",
                        minWidth: "20px",
                    },
                    ".MuiIconButton-root:hover": {
                        svg: {
                            path: {
                                stroke: "rgb(41, 121, 255)",
                            },
                        },
                    },
                    ".create-new": {
                        fontSize: "0.75rem",
                        svg: {
                            width: "22px",
                            height: "22px",
                        },
                        "&:hover": {
                            svg: {
                                path: {
                                    stroke: "rgb(41, 121, 255)",
                                },
                            },
                        },
                    },
                    a: {
                        textDecoration: "underline",
                        transition: "all  0.25s",
                        "&:hover": {
                            color: "rgb(41, 121, 255)",
                            cursor: "pointer",
                        },
                    },
                },
            }}
            expanded={data.expanded}
        >
            <PrototypeAccordionSummary
                data={data}
                onExpandToggle={onExpandToggle}
                figmaImage={figmaImage}
                figmaImageLoading={figmaImageLoading}
            />
            <PrototypeAccordionDetails
                data={{ prototypes: data.prototypes, pageId: data.pageId }}
            />
        </Accordion>
    );
};

export { PrototypeAccordion };
