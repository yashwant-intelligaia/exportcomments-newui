"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { UserEmailSelect } from "@/components/UserEmailSelect";

import { useFetchInviteeUsers, useFetchProjectUsers, useFilterInviteesData, useProjectMutations } from "../../hooks";
import { FilteredUserResponseType, PageUserType } from "../../types";
import { PeopleList, PersonRow, ShareInviteRow, ShareModal } from "../Modal/ShareModal";

interface ShareLinkModalPropsType {
    projectId: number;
    onClose: () => void;
    pageId: number;
    pageInfos?: {
        node_id: any;
        page_users: PageUserType[];
    };
    branchName: string;
}

const SharePageLinkModel = (props: ShareLinkModalPropsType) => {
    const { projectId, onClose, pageId, pageInfos, branchName } = props;
    const pageNodeId = pageInfos?.node_id;
    const [values, setValues] = useState<FilteredUserResponseType[]>([]);
    const { data: projectUsers = [] } = useFetchProjectUsers(projectId);
    const { invitePage } = useProjectMutations();
    const { mutate: mutateInvitePage, isPending: isSendingInvite, data: inviteData } = invitePage;
    const { data: invitees = [] } = useFetchInviteeUsers();
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1,
    );

    const handleSendInvite = () => {
        if (projectId) {
            mutateInvitePage({
                projectId,
                emails: values.map(({ email }) => email),
                pageId,
                branchName,
                pageNodeId,
            });
        }
    };

    const [pageInfo, setPageInfo] = useState(pageInfos);

    useEffect(() => {
        if (inviteData) {
            setPageInfo((prevPageInfos: any) => {
                const updatedPageUsers = [
                    ...prevPageInfos.page_users,
                    ...inviteData.map((invitee: any) => ({
                        user_id: invitee.user_id,
                        avatar: invitee.avatar,
                        email: invitee.email,
                        name: invitee.name,
                    })),
                ];

                return {
                    ...prevPageInfos,
                    page_users: updatedPageUsers,
                };
            });
            onClose();
        }
    }, [inviteData]);

    return (
        <ShareModal
            title={<h2 id="parent-modal-title">Share Page with people</h2>}
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
                        loading={isSendingInvite}
                        disabled={isSendingInvite || !values.length}
                    >
                        Send Link
                    </Button>
                }
            />
            <PeopleList>
                {(pageInfo?.page_users || []).map(({ user_id, avatar, email, name }) => (
                    <PersonRow key={user_id} avatar={avatar} name={name} email={email} />
                ))}
            </PeopleList>
        </ShareModal>
    );
};

export { SharePageLinkModel };
