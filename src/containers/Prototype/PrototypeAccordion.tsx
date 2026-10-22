"use client";

import { ProcessedPageDataType } from "../../types/prototype";
import { PrototypeAccordionDetails } from "./PrototypeAccordionDetails";
import { PrototypeAccordionSummary } from "./PrototypeAccordionSummary";

interface PrototypeAccordionPropsType {
    data: ProcessedPageDataType;
    onExpandToggle: (status: boolean) => void;
    figmaImage?: Record<string, string>;
    figmaImageLoading: boolean;
}

const PrototypeAccordion = ({ data, onExpandToggle, figmaImage, figmaImageLoading }: PrototypeAccordionPropsType) => (
    <div className="mb-4 rounded-md bg-surface shadow-card">
        <PrototypeAccordionSummary data={data} onExpandToggle={onExpandToggle} figmaImage={figmaImage} figmaImageLoading={figmaImageLoading} />
        {data.expanded && <PrototypeAccordionDetails data={{ prototypes: data.prototypes, pageId: data.pageId }} />}
    </div>
);

export { PrototypeAccordion };
