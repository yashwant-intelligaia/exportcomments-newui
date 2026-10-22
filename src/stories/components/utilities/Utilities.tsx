"use client";

import "../../../index.scss";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import { useHistory } from "@/utils/navigation";
import styled from "styled-components";

import { APP_CONSTANT, TIME_ZONE } from "../../../constants/AppConstant";
import { UserContext } from "../../../contexts/UserContext";
import { useAuthMutations } from "../../../hooks";
import { api } from "../../../utils";

const MenuSpan = styled.span`
    cursor: pointer;
`;

const Avatar = styled.img`
    cursor: pointer;
    height: 28px;
    width: 28px;
    border-radius: 50%;
`;

const List = styled.ul`
    display: flex;
    align-itesms: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    &.utilities {
        li {
            display: flex;
            a {
                color: #9e9e9e;
                align-self: center;
            }
        }
        .display-none {
            display: none;
        }
    }
    li {
        padding: 0 7px;
        a {
            text-decoration: none;
        }
    }
`;

const ProfileList = styled.li`
    padding-top: 0.8rem;
    /*min-width: 14.5rem;*/
    margin-top: 0;
    &.pl-0 {
        padding-left: 0;
    }
    .user-name {
        color: #1a1a1a;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 5px;
        display: flex;
    }

    .show {
        /*right: 0;*/
    }

    &.user-dropdown {
        position: relative;
        z-index: 99;

        .user-detail {
            padding: 10px;
            color: #666;
            p {
                margin: 0;
            }
        }
        &.dropdown-right {
            .drop-menu {
                left: auto;
                right: 0;
            }
        }

        .drop-menu {
            border-radius: 4px;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: auto;
            z-index: 2;
            background-color: #fff;
            padding-bottom: 5px;

            .dropdown-item {
                display: flex;
                width: 100%;
                padding: 10px;
                margin-bottom: 1px;
                line-height: 1;
                box-sizing: border-box;
                transition: all 0.5s ease 0s;
                color: #678ecf;
                &:active,
                &:focus {
                    background-color: #e5efff;
                    color: #678ecf;
                }
            }
        }
    }
    .user-detail {
        border-bottom: 0.0625rem solid #e0e0e0;
        border-bottom: 0.0625rem solid #e0e0e0;
        background-color: #f9f9f9;
        background-color: #f9f9f9;
        padding: 0.8rem 1rem;
        /*margin-bottom: 0.5rem;*/
        position: relative;
    }
`;
export const Utilities = ({ user, userOptions }: any) => {
    const history = useHistory();
    const { token } = UserContext();
    const [isActive, setIsActive] = useState(false);
    const { logoutUserSession } = useAuthMutations();

    const handleUserState = () => {
        setIsActive(!isActive);
    };

    const handleMenuItemClick = (parameter: string) => async () => {
        if (parameter === "Logout" && history) {
            await api({
                url: `${APP_CONSTANT.webApi.userLogout}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
                version: "v2",
            });
            logoutUserSession();
        }
    };

    const handleClickAway = () => {
        setIsActive(false);
    };

    return (
        <>
            {history.location.pathname !== "/" && (
                <List className="inline-listing utilities">
                    <li className="display-none">
                        <a href="">
                            <SearchIcon />
                        </a>
                    </li>
                    <li className="display-none">
                        <a href="">
                            <NotificationsNoneOutlinedIcon />
                        </a>
                    </li>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <ProfileList className="user-dropdown pl-0">
                            <span className="user" role="presentation" id="tooltipUser" />

                            <Avatar
                                alt="profile"
                                src={user?.avatar}
                                onClick={handleUserState}
                                id="NB-user-avatar"
                            />

                            {isActive && (
                                <div
                                    className="drop-menu show"
                                    style={{
                                        zIndex: 1000,
                                    }}
                                >
                                    <div className="user-detail">
                                        <span className="user-name">{user?.name}</span>
                                        <p style={{ color: "black" }}>{user?.email}</p>
                                    </div>

                                    {userOptions.map((item: string, index: number) => (
                                        <MenuSpan
                                            key={`option${index + 1}`}
                                            className="dropdown-item"
                                            role="presentation"
                                            onClick={handleMenuItemClick(item)}
                                            id={`NB-user-profile-option-${index}`}
                                            style={{
                                                color: "black",
                                            }}
                                        >
                                            {item}
                                        </MenuSpan>
                                    ))}
                                </div>
                            )}
                        </ProfileList>
                    </ClickAwayListener>
                </List>
            )}
        </>
    );
};
