"use client";

import { MetaInfoType } from "../../../types";
import { uniqueKey } from "../../../utils";

const EcMetaInfo = ({ data }: { data: MetaInfoType[] }) => (
    <div className="flex flex-wrap justify-between">
        {data.map(({ label, value }, index) => (
            <div key={`meta-info-${uniqueKey(index)}`}>
                <div className="text-muted mb-1 text-sm">{label}</div>
                <div className="text-ink mb-1 text-sm font-medium">{value}</div>
            </div>
        ))}
    </div>
);

export { EcMetaInfo };
