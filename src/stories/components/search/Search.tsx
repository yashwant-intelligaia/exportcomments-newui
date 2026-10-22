"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { UserContext } from "../../../contexts/UserContext";

export const Search = (props: any) => {
    const SearchWrap = styled.div`
        position: relative;
        display: flex;
        align-items: center;
        min-height: 30px;
        &.w-287 {
            width: 287px;
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
                right: 0;
            }
            .search-input {
                padding-right: 24px;
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

    const MobSearch = styled.div`
        @media screen and (min-width: 768px) {
            &.msearch-wrap {
                display: none;
            }
            .mob-block {
                display: none;
            }
        }
        @media screen and (max-width: 767px) {
            &.msearch-wrap {
                position: absolute;
                right: 25px;
                color: #616161;
                cursor: pointer;
                transition: all 0.5s ease 0s;
                -webkit-transition: all 0.5s ease 0s;
                display: flex;
                align-items: center;

                &:hover,
                &:focus,
                &:active {
                    color: #2979ff;
                }

                .mob-block {
                    display: flex;
                    margin-right: 11px;
                }
            }
        }
        @media (max-width: 380px) {
            .msearch-wrap {
                .mob-block {
                    a {
                        font-size: 13px;
                    }
                }
            }
        }
    `;

    const MarkAsRead = styled.a`
        display: flex;
        white-space: nowrap;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        color: #2979ff;
        line-height: 1.4375em;

        &.disable {
            color: #9e9e9e;
            cursor: not-allowed;
        }
    `;

    const inputRef = useRef(null as any);

    const { isDisable } = UserContext();

    const { placeholder, searchChange, value, mobSearch, setMobSearch, handleMarkAsReadClick } =
        props;

    useEffect(() => {
        inputRef.current.focus();
    }, [value]);

    const openSearch = () => {
        if (mobSearch) {
            setMobSearch(false);
        } else {
            setMobSearch(true);
        }
    };

    return (
        <>
            <SearchWrap className="searchwrap icon-left w-287">
                <SearchRoundedIcon className="search-inline-ic" />
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e: any) => searchChange(e)}
                    className="search-input"
                    placeholder={placeholder}
                    type="text"
                />
            </SearchWrap>
            <MobSearch className="msearch-wrap">
                <span className="mob-block">
                    <MarkAsRead
                        className={isDisable ? "disable" : ""}
                        onClick={isDisable ? null : handleMarkAsReadClick}
                    >
                        Mark as Read
                    </MarkAsRead>
                </span>

                {!mobSearch && (
                    <SearchRoundedIcon className="search-inline-ic" onClick={openSearch} />
                )}
                {mobSearch && <CloseRoundedIcon onClick={openSearch} />}
            </MobSearch>
        </>
    );
};
