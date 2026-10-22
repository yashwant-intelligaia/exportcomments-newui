import { Box, Typography } from "@mui/material";
import styled from "styled-components";

import Icon from "../../assets/Icon.svg";
import { useFetchFlowList } from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { NewFlowVersionCard } from "./NewFlowVersionCard";

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
    data: {
        prototypeId: number;
        nodeId: string;
        prototypeTitle: string;
        pageId: number;
    };
    open: boolean;
    onClose: () => void;
}

export const NewFlowVersionDrawer = (props: FlowVersionDrawerPropsType) => {
    const {
        data: { prototypeId, nodeId, prototypeTitle, pageId },
        open,
        onClose,
    } = props;

    const { data: versionList = [], refetch: versionListRefetch } = useFetchFlowList(prototypeId);

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
                        {prototypeTitle}
                    </Typography>
                </Box>
            }
            open={open}
            direction="right"
            onClose={onClose}
            customeWidth
        >
            <FeedbackContainer>
                {versionList?.map((version: any) => (
                    <NewFlowVersionCard
                        key={version.versionId}
                        data={{
                            version,
                            nodeId,
                            pageId,
                        }}
                        refetchCallback={versionListRefetch}
                    />
                ))}
            </FeedbackContainer>
        </EcDrawer>
    );
};
