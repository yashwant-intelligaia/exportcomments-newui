"use client";

import styled from "styled-components";

import { SbAvatar } from "../../../stories/components/avatar/Avatar";

const Cell = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
    span {
        margin-left: 8px;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 6.25rem;
        height: 100%;
    }
`;
export const CreatedByCell = (props: any) => {
    const { value } = props;
    return (
        <>
            {value.row ? (
                <Cell>
                    <SbAvatar imageAlt="profile" size="small" imageSrc={value?.row?.user?.imgUrl} />
                    <span>{value?.row?.userName}</span>
                </Cell>
            ) : (
                <Cell>
                    <SbAvatar imageAlt="profile" size="small" imageSrc={value.user?.imgUrl} />
                    <span>{value.userName}</span>
                </Cell>
            )}
        </>
    );
};
