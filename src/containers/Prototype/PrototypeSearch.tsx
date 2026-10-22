"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface PrototypeSearchType {
    placeholder: string;
    searchChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const SearchWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 30px;
    &.w-287 {
        width: 287px;
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
            right: 0;
        }
        .search-input {
            padding: 8px 4px;
        }
    }
    .search-input {
        border: none;
        background-color: transparent;
        box-shadow: 0 1px 0 #616161;
        -webkit-box-shadow: 0 1px 0 #616161;
        padding: 8px 4px;
        line-height: 1;
        position: absolute;
        left: 0;
        width: 100%;
        box-sizing: border-box;

        &:hover {
            box-shadow: 0 2px 0 #616161;
            -webkit-box-shadow: 0 2px 0 #616161;
        }
        &:active,
        &:focus {
            box-shadow: 0 2px 0 #2979ff;
            -webkit-box-shadow: 0 2px 0 #2979ff;
        }

        &::placeholder {
            color: #9e9e9e;
        }
        &::-webkit-input-placeholder {
            color: #9e9e9e;
        }
        &:-ms-input-placeholder {
            color: #9e9e9e;
        }
    }
`;

export const PrototypeSearch = (props: PrototypeSearchType) => {
    const { placeholder, searchChange, value } = props;
    return (
        <SearchWrap className="icon-left w-287">
            <SearchRoundedIcon className="search-inline-ic" />
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
        </SearchWrap>
    );
};
