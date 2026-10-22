"use client";

import styled from "styled-components";

export const Cell = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
    span {
        margin-left: 8px;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // width: 6.25rem;
        height: 100%;
    }
`;
