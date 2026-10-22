import { Avatar, AvatarGroup, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

import { PageUserType } from "../../types";

interface UserAccessMenuPropsType {
    max: number;
    pageUsers: PageUserType[];
    avatarSize: number;
}

export const UserAccessMenu = ({ max, pageUsers, avatarSize }: UserAccessMenuPropsType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {pageUsers.length ? (
                <AvatarGroup
                    max={max}
                    sx={{
                        "& .MuiAvatar-root": {
                            width: 26.5,
                            height: 26.5,
                            fontSize: 13,
                            border: "none",
                        },
                        cursor: "pointer",
                    }}
                    onClick={handleMenuOpen}
                >
                    {pageUsers.map((user) => (
                        <Avatar
                            key={user.user_id}
                            src={user.avatar}
                            style={{
                                width: avatarSize,
                                height: avatarSize,
                                border: `1px solid transparent`,
                                boxSizing: "content-box",
                            }}
                        />
                    ))}
                </AvatarGroup>
            ) : (
                <Typography variant="body2" color="gray">
                    There are no users
                </Typography>
            )}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        width: "230px",
                        maxHeight: "200px",
                        paddingTop: "10px",
                    },
                }}
                sx={{ overflowY: "auto" }}
            >
                {pageUsers.map((user) => (
                    <MenuItem
                        key={user.user_id}
                        sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            pointerEvents: "none",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                        }}
                    >
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{
                                marginRight: "5px",
                                width: "25px",
                                height: "25px",
                            }}
                        />
                        <Typography fontSize="16px">{user.name || user.email}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
