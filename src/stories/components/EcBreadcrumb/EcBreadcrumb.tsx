"use client";

import { uniqueKey } from "../../../utils";

export interface EcBreadcrumbDataType {
    title: string;
    active?: boolean;
    onClick?: () => void;
}

interface EcBreadcrumbPropsType {
    data: EcBreadcrumbDataType[];
}

export const EcBreadcrumb = ({ data }: EcBreadcrumbPropsType) => (
    <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center">
            {data.map(({ title, active, onClick }, index) => (
                <li key={uniqueKey(`${title}-breadcrumb-${index}`)} className="flex items-center">
                    {index > 0 && (
                        <span aria-hidden="true" className="mx-1.5 text-sm text-muted">
                            /
                        </span>
                    )}
                    {active ? (
                        <button type="button" onClick={onClick} className="text-blue-ink hover:underline">
                            {title}
                        </button>
                    ) : (
                        <span className="text-ink">{title}</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);
