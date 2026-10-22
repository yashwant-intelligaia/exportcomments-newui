"use client";

import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
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
    top: 100px;
    @media screen and (max-width: 767px) {
        top: 100px;
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
    .nocommentdata {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const NoCommentsFound = () => (
    <NoRow>
        <span className="commentWrap">
            <InsertCommentOutlinedIcon className="commentIcon" />
        </span>
        <div className="nocommentdata">
            No Comments Found
            <p className="smallText">
                There seems to be no comments available to show
                <span>Try in some other time.</span>
            </p>
        </div>
    </NoRow>
);
