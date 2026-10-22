"use client";

import { InsertDriveFileOutlined as InsertDriveFileOutlinedIcon } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar, AvatarGroup, Divider, Link, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import styled from "styled-components";

import prototypeIcon from "../../../assets/Prototype-icon.svg";
import { ProjectDetailsContext } from "../../../contexts";
import { useFetchPrototypeList } from "../../../hooks";
import { EcDrawer } from "../EcDrawer";
import { EcTooltip } from "../EcTooltip";

const PrototypeContainer = styled.div`
    border-radius: 8px;
    border: 1px solid #d2d2d6;
    margin-bottom: 15px;
    padding: 0px 10px;
`;

const PrototypeInner = styled.div`
    display: flex;
    align-items: flex-start;
    margin-right: 2%;
    padding: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const PrototypeName = styled(Typography)`
    font-weight: 500;
    height: 25px;
    margin-right: 14%;
    width: 40%;
    font-size: 1rem;
    @media (max-width: 600px) {
        margin-right: 0;
    }
`;

const DividerStyled = styled(Divider)`
    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
`;

const ShareIconStyled = styled(ShareIcon)`
    margin-right: 2%;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
`;

const FigmaLink = styled(Link)`
    margin-right: 2%;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
`;

const styles = {
    prototypeContainer: {
        borderRadius: "5px",
        border: "1px solid lightgrey",
        marginBottom: "15px",
        padding: "0px 0px",
    },
};

interface PrototypeDrawerPropsType {
    open: boolean;
    onClose: () => void;
    title: string;
    row: any; // TODO: update type definition
    onShare: (id: number, data: any[]) => void; // TODO: update type definition
}

function PrototypeDrawer(props: PrototypeDrawerPropsType) {
    const { open, onClose, title, row, onShare } = props;
    const { selectedBranch } = useContext(ProjectDetailsContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>, flowId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedFlow(flowId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { data: prototypeData } = useFetchPrototypeList(selectedBranch?.key || "");

    const updateRowWithPrototype = (rows: any, prototype: any) => {
        const updatedRow = { ...rows };

        prototype.forEach((proto: any) => {
            if (proto.page_id === updatedRow.page_id) {
                updatedRow.name = proto.name;
                updatedRow.node_id = proto.node_id;
                updatedRow.flows = proto.flows;
                updatedRow.page_users = proto.page_users;
            }
        });

        return updatedRow;
    };

    const updatedRow = updateRowWithPrototype(row, prototypeData);
    return (
        <EcDrawer
            title={
                <>
                    <InsertDriveFileOutlinedIcon
                        sx={{ marginRight: "0.3rem", marginBottom: "14px" }}
                    />
                    <Typography variant="h6" fontWeight="500" mb={1.5}>
                        {title}
                    </Typography>
                </>
            }
            open={open}
            direction="right"
            onClose={onClose}
            closeOnClickOutside={false}
        >
            <div>
                {updatedRow?.flows.map((prototype: any) => (
                    <PrototypeContainer style={styles.prototypeContainer}>
                        <PrototypeInner>
                            <div>
                                <img
                                    src={prototypeIcon}
                                    alt="Prototype Icon"
                                    style={{
                                        marginRight: "2px",
                                        marginTop: "2px",
                                        width: "18px",
                                        color: "black",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "65%",
                                    padding: "0px 5px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    {prototype.name.length > 10 ? (
                                        <EcTooltip title={prototype.name} placement="top" arrow>
                                            <PrototypeName
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    marginRight: "75px",
                                                }}
                                            >
                                                {`${prototype.name}`}
                                            </PrototypeName>
                                        </EcTooltip>
                                    ) : (
                                        <PrototypeName
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                marginRight: "75px",
                                            }}
                                        >
                                            {`${prototype.name}`}
                                        </PrototypeName>
                                    )}
                                    <ShareIconStyled
                                        style={{
                                            color: "rgb(41, 121, 255)",
                                            fontSize: "22px",
                                        }}
                                        onClick={() =>
                                            onShare(prototype?.flow_id, prototype?.flow_users)
                                        }
                                        sx={{ cursor: "pointer" }}
                                    />
                                    <FigmaLink
                                        onClick={() =>
                                            onShare(prototype?.flow_id, prototype?.flow_users)
                                        }
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            color: "rgb(41, 121, 255)",
                                        }}
                                    >
                                        Share
                                    </FigmaLink>
                                </div>
                            </div>
                            <DividerStyled
                                orientation="vertical"
                                flexItem
                                sx={{
                                    marginRight: "10px",
                                    height: "25px",
                                    marginTop: "2px",
                                }}
                            />
                            {prototype.flow_users.length ? (
                                <>
                                    <AvatarGroup
                                        max={4}
                                        sx={{
                                            "& .MuiAvatar-root": {
                                                width: 24,
                                                height: 24,
                                                fontSize: 12,
                                            },
                                            cursor: "pointer",
                                        }}
                                    >
                                        {prototype.flow_users.map((user: any) => (
                                            <Avatar
                                                key={user.user_id}
                                                src={user.avatar}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    border: `1px solid transparent`,
                                                    boxSizing: "content-box",
                                                }}
                                                onClick={(event) =>
                                                    handleClick(event, prototype.flow_id)
                                                }
                                            />
                                        ))}
                                    </AvatarGroup>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(
                                            anchorEl && selectedFlow === prototype.flow_id
                                        )}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                width: "230px",
                                                maxHeight: "200px",
                                                paddingTop: "10px",
                                            },
                                        }}
                                        sx={{ overflowY: "auto" }}
                                    >
                                        {prototype.flow_users.map((user: any) => (
                                            <MenuItem key={user.user_id}>
                                                <Avatar
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    sx={{
                                                        marginRight: "10px",
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {user.name || user.email}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <Typography
                                    style={{
                                        fontSize: "12px",
                                        paddingTop: "2px",
                                    }}
                                    color="gray"
                                >
                                    There are no users
                                </Typography>
                            )}
                        </PrototypeInner>
                    </PrototypeContainer>
                ))}
            </div>
        </EcDrawer>
    );
}

export default PrototypeDrawer;
