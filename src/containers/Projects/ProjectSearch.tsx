"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface ProjectSearchType {
    placeholder: string;
    searchChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const SearchWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 50px;
    &.w-287 {
        width: 400px;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    .search-inline-ic {
        position: absolute;
        z-index: 1;
        top: 50%;
        margin-top: -11px;
        color: #616161;
    }
    &.icon-left {
        .search-inline-ic {
            left: 0;
        }
        .search-input {
            padding-left: 24px;
        }
    }

    &.icon-right {
        .search-inline-ic {
            right: 12px;
        }
        .search-input {
            padding-right: 44px;
        }
    }
    .search-input {
        border: none;
        background-color: white;
        border: 1px solid #616161;
        border-radius: 10px;
        box-shadow: none;
        padding: 8px 12px;
        line-height: 1;
        position: absolute;
        left: 0;
        width: 100%;
        height: 48px;
        box-sizing: border-box;
        font-size: 18px;

        &:hover {
            border: 1px solid #616161;
        }
        &:active,
        &:focus {
            border-color: grey;
        }

        &::placeholder {
            color: #b0b0b0;
            font-size: 20px;
        }
        &::-webkit-input-placeholder {
            color: #9e9e9e;
        }
        &:-ms-input-placeholder {
            color: #9e9e9e;
        }
    }
`;

export const ProjectSearch = (props: ProjectSearchType) => {
    const { placeholder, searchChange, value } = props;
    return (
        <SearchWrap className="icon-right w-287">
            {" "}
            <input
                ref={(input) => {
                    if (input) input.focus();
                }}
                value={value}
                onChange={searchChange}
                className="search-input"
                placeholder={placeholder}
                type="text"
            />
            <SearchRoundedIcon className="search-inline-ic" />
        </SearchWrap>
    );
};
