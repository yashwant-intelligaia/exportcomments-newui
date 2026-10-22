import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Icon from "../../assets/Icon.svg";
import { useFetchFlowList } from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { ChipType } from "../../types";
import { FlowVersionCard } from "./FlowVersionCard";

const FeedbackContainer = styled.div`
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 0px 10px;
    width: auto;
    max-width: 700px;
    margin-top: 20px;
    @media (max-width: 600px) {
        width: 330px;
    }
`;

interface FlowVersionDrawerPropsType {
    openChipDrawer: boolean;
    title: string;
    setOpenChipDrawer: (open: boolean) => void;
    chipInfo?: ChipType;
    projectId: number;
    pageId: number;
    flowInfo?: any;
    onShare: (versionInfo: any) => void;
    customWidth?: boolean;
}

export const FlowVersionDrawer = (props: FlowVersionDrawerPropsType) => {
    const { openChipDrawer, setOpenChipDrawer, flowInfo, onShare, customWidth } = props;
    const { id: flowId } = flowInfo;
    const { node_id } = flowInfo;
    const [state, setState] = useState(false);
    const toggleDrawer = (open: boolean) => {
        setOpenChipDrawer(open);
        setState(open);
    };
    useEffect(() => {
        setState(openChipDrawer);
    }, [openChipDrawer]);

    const { data: versionList = [], refetch: versionListRefetch } = useFetchFlowList(flowId);
    const [feedback, setFeedback] = useState(false);
    useEffect(() => {
        versionListRefetch();
    }, [feedback]);

    return (
        <EcDrawer
            title={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <img
                        src={Icon}
                        alt="Prototype Icon"
                        style={{
                            color: "black",
                            marginRight: "14px",
                            width: "20px",
                            height: "20px",
                        }}
                    />
                    <Typography variant="h6" fontWeight="500">
                        {flowInfo?.name}
                    </Typography>
                </Box>
            }
            open={state}
            direction="right"
            onClose={() => toggleDrawer(false)}
            customeWidth={customWidth}
        >
            <FeedbackContainer>
                {versionList?.map((version: any) => (
                    <FlowVersionCard
                        key={version.versionId}
                        version={version}
                        onShare={onShare}
                        setFeedback={setFeedback}
                        feedback={feedback}
                        node_id={node_id}
                    />
                ))}
            </FeedbackContainer>
        </EcDrawer>
    );
};
