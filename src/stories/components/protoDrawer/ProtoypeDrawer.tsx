"use client";

import { FileText, Share2 } from "lucide-react";
import React, { useContext, useState } from "react";

import { Avatar, AvatarGroup } from "@/components/ui/Display";
import { Menu, MenuItem } from "@/components/ui/Popover";

import prototypeIcon from "../../../assets/Prototype-icon.svg";
import { ProjectDetailsContext } from "../../../contexts";
import { useFetchPrototypeList } from "../../../hooks";
import { EcDrawer } from "../EcDrawer";
import { EcTooltip } from "../EcTooltip";

interface PrototypeDrawerPropsType {
    open: boolean;
    onClose: () => void;
    title: string;
    row: any; // TODO: update type definition
    onShare: (id: number, data: any[]) => void; // TODO: update type definition
}

function PrototypeDrawer({ open, onClose, title, row, onShare }: PrototypeDrawerPropsType) {
    const { selectedBranch } = useContext(ProjectDetailsContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>, flowId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedFlow(flowId);
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
    const nameClass = "mr-16 h-6 w-2/5 truncate text-base font-medium text-ink max-sm:mr-0";

    return (
        <EcDrawer
            title={
                <span className="inline-flex items-center gap-2">
                    <FileText className="size-5" />
                    {title}
                </span>
            }
            open={open}
            direction="right"
            onClose={onClose}
            closeOnClickOutside={false}
        >
            <div>
                {updatedRow?.flows.map((prototype: any) => (
                    <div key={prototype.flow_id} className="mb-4 rounded-sm border border-line px-2.5">
                        <div className="flex items-start p-5 max-sm:flex-col">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={prototypeIcon.src} alt="Prototype Icon" className="mt-0.5 mr-0.5 w-[18px]" />
                            <div className="flex w-[65%] items-center px-1.5">
                                {prototype.name.length > 10 ? (
                                    <EcTooltip title={prototype.name} placement="top" arrow>
                                        <span className={nameClass}>{prototype.name}</span>
                                    </EcTooltip>
                                ) : (
                                    <span className={nameClass}>{prototype.name}</span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => onShare(prototype?.flow_id, prototype?.flow_users)}
                                    className="mr-[2%] flex items-center gap-1.5 text-sm font-medium text-blue-ink"
                                >
                                    <Share2 className="size-[18px]" />
                                    Share
                                </button>
                            </div>
                            <span className="mt-0.5 mr-2.5 h-6 w-px self-stretch bg-line max-sm:hidden" />
                            {prototype.flow_users.length ? (
                                <>
                                    <AvatarGroup max={4}>
                                        {prototype.flow_users.map((user: any) => (
                                            <button key={user.user_id} type="button" onClick={(e) => handleClick(e, prototype.flow_id)}>
                                                <Avatar src={user.avatar} name={user.name} size={24} />
                                            </button>
                                        ))}
                                    </AvatarGroup>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl && selectedFlow === prototype.flow_id)}
                                        onClose={() => setAnchorEl(null)}
                                        className="max-h-52 w-[230px] overflow-y-auto pt-2.5"
                                    >
                                        {prototype.flow_users.map((user: any) => (
                                            <MenuItem key={user.user_id}>
                                                <Avatar src={user.avatar} name={user.name} size={25} />
                                                <span className="text-sm">{user.name || user.email}</span>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <span className="pt-0.5 text-xs text-muted">There are no users</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </EcDrawer>
    );
}

export default PrototypeDrawer;
