/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useFetchedPrivacyPolicyContent } from "../hooks/contentHook";
import { GlobalFooter } from "../stories/components/global-footer/GlobalFooter";

const MainContainer = styled.div`
    padding: 10px;
    display: block;
    width: 1128px;
    max-width: 95%;
    margin: auto;
`;

export const PrivacyPolicy = () => {
    const { data } = useFetchedPrivacyPolicyContent();
    const [htmlContent, setHtmlContent] = useState<string>("");

    useEffect(() => {
        if (data) {
            setHtmlContent(data.description);
        }
    }, [data]);

    return (
        <MainContainer>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <GlobalFooter />
        </MainContainer>
    );
};
