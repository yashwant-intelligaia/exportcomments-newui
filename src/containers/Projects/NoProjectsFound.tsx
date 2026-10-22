"use client";

import styled from "styled-components";

const NoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 25px;
    position: relative;
    top: 50%;
    height: calc(100vh - 145px);
    @media screen and (max-width: 767px) {
        &.mob-norow {
            height: calc(100vh - 180px);
        }
    }
    .commentWrap {
        display: flex;
        justify-content: center;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        align-items: center;
        background-color: #e0e0e0;
        margin-bottom: 20px;
        .commentIcon {
            color: #b3babe;
            font-size: 42px;
        }
    }
    .smallText {
        display: block;
        color: #616161;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 5px;
        width: 100%;
        text-align: center;
        span {
            display: block;
        }
    }
    .noprojectdata {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const NoProjectsFound = () => (
    <NoRow>
        <div className="noprojectdata">
            No Projects Found
            <p className="smallText">
                There seems to be no project available to show.
                <span>You may either re-apply the filter or search a new project.</span>
            </p>
        </div>
    </NoRow>
);
