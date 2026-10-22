"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";

import { UserEmailSelect } from "@/components/UserEmailSelect";
import { Button } from "@/components/ui/Button";

import {
    useFetchInviteeUsers,
    useFetchProjectUsers,
    useFilterInviteesData,
    useProjectMutations,
} from "../../hooks";
import { FilteredUserResponseType, UserType } from "../../types";
import { PeopleList, PersonRow, ShareInviteRow, ShareModal } from "../Modal/ShareModal";

interface ShareVersionLinkModalPropsType {
    projectId: number;
    onClose: () => void;
    pageId: number;
    flowId: number;
    versionId: number;
    versionUsers: UserType[];
    branchName: string;
    flowNodeId: string;
}

const ShareFlowVersionModal = (props: ShareVersionLinkModalPropsType) => {
    const { projectId, onClose, pageId, flowId, versionId, versionUsers, branchName, flowNodeId } =
        props;
    const [values, setValues] = useState<FilteredUserResponseType[]>([]);

    const { data: projectUsers = [] } = useFetchProjectUsers(projectId);

    const { inviteVersion } = useProjectMutations();
    const {
        mutate: mutateInviteVersion,
        isPending: isLoadingFlow,
        data: inviteData,
    } = inviteVersion;
    const { data: invitees = [] } = useFetchInviteeUsers();
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1
    );
    const handleSendInvite = () => {
        if (projectId) {
            mutateInviteVersion({
                projectId,
                versionId,
                emails: values.map(({ email }) => email),
                pageId,
                flowId,
                branchName,
                flowNodeId,
            });
        }
    };
    const [versionUser, setVersionUser] = useState(versionUsers);

    useEffect(() => {
        if (inviteData) {
            setVersionUser((prevVersionUser: any) => {
                const updatedVersionUsers = [
                    ...(prevVersionUser || []),
                    ...inviteData.map((invitee: any) => ({
                        user_id: invitee.user_id,
                        avatar: invitee.avatar,
                        email: invitee.email,
                        name: invitee.name,
                    })),
                ];

                return updatedVersionUsers;
            });
            onClose();
        }
    }, [inviteData]);

    return (
        <ShareModal
            title={<h2 id="parent-modal-title">Share Flow with people</h2>}
            actionButtons={
                <Button variant="outlined" onClick={onClose}>
                    Close
                </Button>
            }
        >
            <ShareInviteRow
                field={<UserEmailSelect options={filteredInvitees} value={values} onChange={setValues} />}
                action={
                    <Button
                        onClick={handleSendInvite}
                        size="large"
                        endIcon={<Send className="size-4" />}
                        loading={isLoadingFlow}
                        disabled={isLoadingFlow || !values.length}
                    >
                        Send Link
                    </Button>
                }
            />
            <PeopleList>
                {(versionUser || []).map(({ user_id, avatar, email, name }) => (
                    <PersonRow key={user_id} avatar={avatar} name={name} email={email} />
                ))}
            </PeopleList>
        </ShareModal>
    );
};

export { ShareFlowVersionModal };
