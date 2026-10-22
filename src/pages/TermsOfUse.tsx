"use client";

/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useFetchedTermsOfUseContent } from "../hooks/contentHook";
import { GlobalFooter } from "../stories/components/global-footer/GlobalFooter";

const MainContainer = styled.div`
    padding: 10px;
    display: block;
    width: 1128px;
    max-width: 95%;
    margin: auto;
`;

export const TermsOfUse = () => {
    const { data } = useFetchedTermsOfUseContent();
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
