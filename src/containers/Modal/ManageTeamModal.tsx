"use client";

import { useState } from "react";

import { UserEmailSelect } from "@/components/UserEmailSelect";
import { Button } from "@/components/ui/Button";

import { UserContext } from "../../contexts";
import {
    useDeleteProjectMember,
    useFetchInviteeUsers,
    useFetchProjectUsers,
    useFilterInviteesData,
    useProjectMutations,
} from "../../hooks";
import { EcDialog } from "../../stories/components/EcDialog/EcDialog";
import { FilteredUserResponseType } from "../../types";
import { PeopleList, PersonRow, ShareInviteRow, ShareModal } from "./ShareModal";

interface ManageTeamModalPropsType {
    projectId: number;
    onClose: () => void;
}

const ManageTeamModal = (props: ManageTeamModalPropsType) => {
    const { user } = UserContext();
    const { projectId, onClose } = props;
    const [values, setValues] = useState<FilteredUserResponseType[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<JSX.Element>();
    const { data: projectUsers = [], refetch: refetchProjectUsers } =
        useFetchProjectUsers(projectId);
    const projectOwnerData = projectUsers.find((value) => value.projectOwner);

    const { deleteProjectMember } = useDeleteProjectMember(refetchProjectUsers);
    const { mutate: mutateDeleteProjectMember } = deleteProjectMember;

    const { sendInvite } = useProjectMutations();
    const { mutate: mutateSendInvite, isPending: isSendingInvite } = sendInvite;

    const { data: invitees = [] } = useFetchInviteeUsers();
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1
    );

    const handleSendInvite = () => {
        if (projectId) {
            mutateSendInvite({
                projectId,
                emails: values.map(({ email }) => email),
            });
        }
        onClose();
    };

    const confirmRemove = (userId: number) =>
        setConfirmDialog(
            <EcDialog
                title="Remove User"
                description="Are you sure you want to remove user from this Project."
                open
                actionButtons={[
                    { label: "Cancel", onClick: () => setConfirmDialog(undefined), variant: "outlined" },
                    {
                        label: "Yes, I'm Sure",
                        onClick: async () => {
                            await mutateDeleteProjectMember({ projectId, userId });
                            setConfirmDialog(undefined);
                        },
                        variant: "contained",
                    },
                ]}
                onClose={() => setConfirmDialog(undefined)}
            />
        );

    return (
        <>
            <ShareModal
                title={<h2 id="parent-modal-title">Share with people</h2>}
                actionButtons={
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                }
            >
                <ShareInviteRow
                    field={<UserEmailSelect options={filteredInvitees} value={values} onChange={setValues} />}
                    action={
                        <Button size="large" onClick={handleSendInvite} disabled={isSendingInvite || !values.length}>
                            Send Invite
                        </Button>
                    }
                />
                <PeopleList>
                    {projectUsers.map(({ userId, avatar, email, name, projectOwner }) => (
                        <PersonRow
                            key={userId}
                            avatar={avatar}
                            name={name}
                            email={email}
                            divider={projectOwner && projectUsers.length > 1}
                            trailing={
                                projectOwner ? (
                                    "Project Owner"
                                ) : projectOwnerData?.userId === user.userId ? (
                                    <button type="button" className="text-blue-ink hover:underline" onClick={() => confirmRemove(userId)}>
                                        Remove User
                                    </button>
                                ) : undefined
                            }
                        />
                    ))}
                </PeopleList>
            </ShareModal>
            {confirmDialog}
        </>
    );
};

export { ManageTeamModal };
