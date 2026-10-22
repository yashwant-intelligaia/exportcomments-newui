"use client";

/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";

import { useFetchedPrivacyPolicyContent } from "../hooks/contentHook";
import { GlobalFooter } from "../stories/components/global-footer/GlobalFooter";

export const PrivacyPolicy = () => {
    const { data } = useFetchedPrivacyPolicyContent();
    const [htmlContent, setHtmlContent] = useState<string>("");

    useEffect(() => {
        if (data) {
            setHtmlContent(data.description);
        }
    }, [data]);

    return (
        <div className="mx-auto block w-[1128px] max-w-[95%] p-2.5">
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <GlobalFooter />
        </div>
    );
};
