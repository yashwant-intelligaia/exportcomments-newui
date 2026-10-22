"use client";

import { Box, Typography } from "@mui/material";

import { MetaInfoType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface EcMetaInfoPropsType {
    data: MetaInfoType[];
}

const EcMetaInfo = (props: EcMetaInfoPropsType) => {
    const { data } = props;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
            }}
        >
            {data.map(({ label, value }, index) => (
                <Box key={`meta-info-${uniqueKey(index)}`}>
                    <Typography color="#616161" component="div" gutterBottom variant="body2">
                        {label}
                    </Typography>
                    <Typography color="#212121" component="div" gutterBottom variant="subtitle2">
                        {value}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export { EcMetaInfo };
