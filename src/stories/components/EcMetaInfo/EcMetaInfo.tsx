"use client";

import { MetaInfoType } from "../../../types";
import { uniqueKey } from "../../../utils";

const EcMetaInfo = ({ data }: { data: MetaInfoType[] }) => (
    <div className="flex flex-wrap justify-between">
        {data.map(({ label, value }, index) => (
            <div key={`meta-info-${uniqueKey(index)}`}>
                <div className="mb-1 text-sm text-muted">{label}</div>
                <div className="mb-1 text-sm font-medium text-ink">{value}</div>
            </div>
        ))}
    </div>
);

export { EcMetaInfo };
