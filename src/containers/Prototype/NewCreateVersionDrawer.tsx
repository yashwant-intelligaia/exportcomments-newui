"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { UserEmailSelect } from "@/components/UserEmailSelect";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Form";
import { useParams } from "@/utils/navigation";

import { ProjectDetailsContext, PrototypePageContext } from "../../contexts";
import {
    useFetchInviteeUsers,
    useFetchProjectUsers,
    useFetchPrototypeList,
    useFilterInviteesData,
    useFlowMutations,
} from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { FilteredUserResponseType } from "../../types";

interface CreateVersionDrawerType {
    open: boolean;
    onClose: () => void;
    title: string;
    prototypeId: number;
    nodeId: string;
    prototypeTitle: string;
}

export const NewCreateVersionDrawer = (props: CreateVersionDrawerType) => {
    const { title, prototypeId, nodeId, open, onClose } = props;
    const { selectedBranch } = useContext(ProjectDetailsContext);
    const { projectId: id }: { projectId: string } = useParams();
    const { setVersionUpdated } = useContext(PrototypePageContext);
    const projectId = Number(id);

    const [values, setValues] = useState<FilteredUserResponseType[]>([]);
    const { data: projectUsers = [] } = useFetchProjectUsers(projectId);
    const { data: invitees = [] } = useFetchInviteeUsers();
    const { refetch } = useFetchPrototypeList(selectedBranch?.key || "");
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1
    );

    const { register, handleSubmit, formState, reset, watch } = useForm();
    const { errors } = formState;
    const { flowVersion } = useFlowMutations();
    const { mutateAsync: mutateFlowVersion, isPending } = flowVersion;
    const onSubmit = ({ name }: any) => {
        mutateFlowVersion({
            projectId,
            flowId: prototypeId,
            name,
            emails: values.map(({ email }) => email),
            branchName: "",
            flowNodeId: nodeId,
        }).then(() => {
            setValues([]);
            reset();
            refetch().then(() => {
                setVersionUpdated(true);
            });
        });
    };

    return (
        <EcDrawer title={<span className="text-xl font-medium">{title}</span>} open={open} direction="right" onClose={onClose}>
            <div className="mt-5 mb-9 w-[330px] max-w-[750px] sm:w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2.5 font-bold">Version Name</div>
                        <TextField
                            {...register("name", {
                                required: { value: true, message: "Version can't be empty" },
                                maxLength: { value: 45, message: "Version name cannot exceed 45 characters" },
                            })}
                            helperText={errors?.name?.message as string | undefined}
                            error={!!errors?.name}
                            placeholder="Enter Version Name"
                        />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex grow flex-col">
                            <div className="mb-2.5 font-semibold">Contributors</div>
                            <UserEmailSelect options={filteredInvitees} value={values} onChange={setValues} />
                        </div>
                    </div>
                    <div className="fixed right-5 bottom-5 z-[9999]">
                        <Button type="submit" loading={isPending} disabled={!watch("name")?.trim()?.length}>
                            Create Version
                        </Button>
                    </div>
                </form>
            </div>
        </EcDrawer>
    );
};
