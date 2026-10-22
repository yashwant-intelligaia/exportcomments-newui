import { MetaInfoType } from "../types";

interface ProjectDataType {
    title: string;
    data: MetaInfoType[];
}

const projectData: ProjectDataType[] = [
    {
        title: "Scrumbooster-v2.0",
        data: [
            { label: "Last Synced", value: "30 min ago" },
            { label: "Synced By", value: "Joe Smith" },
            { label: "Total Comments", value: 24 },
        ],
    },
    {
        title: "Export-Comments-v3.0",
        data: [
            { label: "Last Synced", value: "2 min ago" },
            { label: "Synced By", value: "John Doe" },
            { label: "Total Comments", value: 100 },
        ],
    },
];

export { projectData };
