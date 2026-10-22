"use client";

import { CommentResponseDataType, PageType, ProcessedPageDataType, ProcessedPrototypeDataType } from "../types";

export const processPrototypeData = (
    data: CommentResponseDataType,
    pageData: PageType[],
    expandMap: Map<number, boolean>,
): ProcessedPageDataType[] =>
    pageData.map((page) => {
        const filteredComments = data?.comments.filter((comment) => comment?.clientMeta?.nodeId === page.node_id) || [];
        const allFlowVersions = page.flows.flatMap((flow) => flow.versions);
        const expanded = expandMap.get(page.page_id);
        return {
            pageId: page.page_id,
            pageTitle: page.name,
            nodeId: page.node_id,
            link: page.pageLink,
            totalVersions: allFlowVersions,
            prototypes: page.flows.map((flow) => {
                const flowComments =
                    data?.comments.filter((comment) => comment?.clientMeta?.nodeId === flow.node_id) || [];
                return {
                    prototypeId: parseInt(flow.flow_id, 10),
                    prototypeTitle: flow.name,
                    nodeId: flow.node_id,
                    versions: flow.versions,
                    prototypeLink: flow.flowLink,
                    prototypeComments: flowComments, // Filtered comments based on flow.node_id
                    users: [],
                } as ProcessedPrototypeDataType;
            }) as ProcessedPrototypeDataType[],
            comments: filteredComments,
            users: page.page_users,
            expanded: expanded || false,
        };
    });
