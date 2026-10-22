"use client";

import { CheckCircle2, ChevronDown, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import { Avatar } from "@/components/ui/Display";
import { Checkbox } from "@/components/ui/Form";

import { get } from "../../utils/object";
import { ToasterContext } from "../../contexts";
import {
    useAddUserToProject,
    useFetchFiles,
    useFetchInviteeUsers,
    useProcessInviteesData,
} from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { AddUserFormDataType, IUserFile, ProcessedInviteesDataType } from "../../types";
import { emailValidation, uniqueKey } from "../../utils";

const AddUserDrawer = (props: { onClose: () => void }) => {
    const [error, setError] = useState("");
    const { onClose } = props;
    const { showToast } = useContext(ToasterContext);
    const [selectedUsers, setSelectedUsers] = useState<ProcessedInviteesDataType[]>([]);
    const { data: invitees = [], isFetching: isFetchingInvitees } = useFetchInviteeUsers();
    const { data: projects = [], isFetching: isFetchingProjects } = useFetchFiles(props as any);
    const processedProjectsData = get(projects, "data.data", []) as IUserFile[];
    const processedProjectsDataIds = processedProjectsData.map(({ projectId }) => projectId);

    const processedInviteesData = useProcessInviteesData(invitees);
    const { addUserToProject } = useAddUserToProject();
    const { mutate: mutateAddUser, isPending: isAddingUserToProject, isSuccess } = addUserToProject;

    const getSelectedUser = (option: ProcessedInviteesDataType) =>
        selectedUsers.some((user) => user.email === option.email);

    const handleCheckAllProjects = (userIndex: number) => {
        const newSelectedUsers = selectedUsers.map((selectedUser, selectedUserIndex) => {
            if (userIndex === selectedUserIndex) {
                if (selectedUser.selectedProjectIds.length === processedProjectsDataIds.length) {
                    selectedUser.selectedProjectIds = [];
                } else {
                    selectedUser.selectedProjectIds = processedProjectsDataIds;
                }
            }
            return selectedUser;
        });
        setSelectedUsers(newSelectedUsers);
    };

    const handleRemoveSelectedUser = (index: number) => {
        const newSelectedUsers: any = [];
        selectedUsers.forEach((addedUser, selectedUserIndex) => {
            if (index !== selectedUserIndex) {
                newSelectedUsers.push(addedUser);
            }
        });

        setSelectedUsers(newSelectedUsers);
    };

    const handleProjectCheckChange = (userIndex: number, projectId: number) => {
        const newSelectedUsers = selectedUsers.map((selectedUser, selectedUserIndex) => {
            if (userIndex === selectedUserIndex) {
                const index = selectedUser.selectedProjectIds.indexOf(projectId);
                // remove if already exists
                if (index !== -1) {
                    selectedUser.selectedProjectIds.splice(index, 1);
                } else {
                    // add if not exists
                    selectedUser.selectedProjectIds.push(projectId);
                }
            }
            return selectedUser;
        });
        setSelectedUsers(newSelectedUsers);
    };

    const handleShowUserProjects = (index: number) => {
        const newSelectedUsers = selectedUsers.map((addedUser, selectedUserIndex) => {
            if (index === selectedUserIndex) {
                addedUser.showProject = !addedUser.showProject;
            }
            return addedUser;
        });
        setSelectedUsers(newSelectedUsers);
    };

    const submitForm = () => {
        let isValid = true;
        const formData: AddUserFormDataType[] = [];
        selectedUsers.forEach(({ email, selectedProjectIds }) => {
            formData.push({
                email,
                projectIds: selectedProjectIds,
            });
            if (selectedProjectIds.length === 0) {
                isValid = false;
            }
        });
        if (!isValid) {
            showToast({
                message: `You must select atleast one project for each selected user`,
                severity: "warning",
            });
        } else {
            mutateAddUser(formData);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setSelectedUsers([]);
            onClose();
        }
    }, [isSuccess]);

    const handlePick = (newValue: ProcessedInviteesDataType | null) => {
        let userAlreadyAdded = false;
        if (newValue && typeof newValue === "object") {
            selectedUsers.forEach((selectedUser) => {
                if (selectedUser.email === newValue.email) {
                    userAlreadyAdded = true;
                }
            });
            setError("");
        }
        if (newValue && typeof newValue === "object" && newValue?.inputValue) {
            // Create a new value from the user input
            if (emailValidation(newValue.inputValue)) {
                setError("");
                setSelectedUsers((selectedUser) => [
                    ...selectedUser,
                    {
                        inputValue: "",
                        name: "",
                        email: newValue.inputValue || "",
                        avatar: "",
                        showProject: false,
                        selectedProjectIds: processedProjectsDataIds,
                    },
                ]);
            } else {
                setError("Email is not valid");
            }
        } else if (!userAlreadyAdded && newValue) {
            setError("");
            const updatedNewValue = newValue as ProcessedInviteesDataType;
            updatedNewValue.selectedProjectIds = processedProjectsDataIds;
            setSelectedUsers((selectedUser) => [...selectedUser, updatedNewValue]);
        }
    };

    const allSelected = (ids: number[]) => ids.length === processedProjectsDataIds.length;

    return (
        <EcDrawer
            open
            direction="right"
            closeOnClickOutside={false}
            onClose={onClose}
            title={<span className="text-xl font-medium">Add Users</span>}
        >
            <div className="mt-4 pr-4">
                <Combobox<ProcessedInviteesDataType>
                    id="NB-enter-name-or-email"
                    label="Enter name or email"
                    options={processedInviteesData}
                    disabled={isFetchingInvitees || isFetchingProjects}
                    keepOpenOnSelect
                    getKey={(o) => o.inputValue || o.email}
                    getLabel={(o) => o.email}
                    getOptionDisabled={getSelectedUser}
                    onChange={handlePick}
                    filterOptions={(pool, inputValue) => {
                        const q = inputValue.trim().toLowerCase();
                        const filtered = q ? pool.filter((o) => `${o.name} ${o.email}`.toLowerCase().includes(q)) : [...pool];
                        // Suggest the creation of a new value
                        const isExisting = pool.some((option) => option.email.includes(inputValue));
                        if (inputValue !== "" && !isExisting) {
                            filtered.push({
                                inputValue,
                                name: "",
                                email: `Add "${inputValue}"`,
                                avatar: "",
                                showProject: false,
                                selectedProjectIds: processedProjectsDataIds,
                            } as ProcessedInviteesDataType);
                        }
                        return filtered;
                    }}
                    renderOption={(option) => (
                        <div className="flex items-center justify-between py-1">
                            <div className="flex w-[70%] grow items-center gap-2">
                                <Avatar src={option.avatar} name={option.name || option.email} size={36} />
                                <div className="min-w-0 grow">
                                    <div className="text-base">{option.name}</div>
                                    <div className="truncate text-sm text-muted">{option.email}</div>
                                </div>
                            </div>
                            {getSelectedUser(option) ? <CheckCircle2 className="size-5 text-[#65b168]" /> : null}
                        </div>
                    )}
                />
                {error && <p className="mt-1 text-xs text-danger">{error}</p>}
            </div>
            <div className="h-[calc(100vh-190px)] w-[350px] max-w-full overflow-x-hidden overflow-y-scroll pr-2">
                <p className="mt-6 text-base font-bold">Selected User(s)</p>
                {!selectedUsers && <p className="mt-4 text-sm text-muted">No users have been selected</p>}
                {selectedUsers.map(({ name, email, avatar, selectedProjectIds, showProject }, userIndex) => (
                    <div key={`selected-user-${uniqueKey(userIndex)}`} className="mt-4 rounded-md border border-line p-4 pb-2">
                        <div className="flex items-center">
                            <Avatar src={avatar} name={name || email} size={36} />
                            <div className="relative ml-2 w-full">
                                <div className="text-base">{name}</div>
                                <div className="w-[90%] truncate text-sm text-muted">{email}</div>
                                <IconButton
                                    aria-label="remove user"
                                    size="small"
                                    className="absolute top-1/2 right-0 -translate-y-1/2 text-muted"
                                    onClick={() => handleRemoveSelectedUser(userIndex)}
                                >
                                    <X className="size-5" />
                                </IconButton>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-line pt-2">
                            <div className="flex items-center">
                                <div className="grow hover:bg-blue-soft">
                                    <Checkbox
                                        checked={allSelected(selectedProjectIds)}
                                        onChange={() => handleCheckAllProjects(userIndex)}
                                        label="All Projects"
                                        className="w-full p-1"
                                    />
                                </div>
                                <IconButton
                                    size="small"
                                    aria-label="toggle projects"
                                    onClick={() => handleShowUserProjects(userIndex)}
                                >
                                    <ChevronDown className="size-5" />
                                </IconButton>
                            </div>
                            {showProject &&
                                processedProjectsData.map(({ fileName: projectName, projectId }, projectIndex) => (
                                    <div
                                        key={`user-${uniqueKey(userIndex)}-project-${uniqueKey(projectIndex)}`}
                                        className="flex flex-col border-t border-dashed border-line hover:bg-blue-soft"
                                    >
                                        <Checkbox
                                            checked={selectedProjectIds.includes(projectId)}
                                            onChange={() => handleProjectCheckChange(userIndex, projectId)}
                                            label={projectName}
                                            className="w-full p-1"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex w-[350px] max-w-full justify-end gap-2.5">
                {/* TODO: In future, we need to add functionality to cancel query, api request and promise as well */}
                <Button variant="text" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    id="NB-add-user-button"
                    disabled={isAddingUserToProject || selectedUsers.length === 0}
                    onClick={submitForm}
                >
                    Add
                </Button>
            </div>
        </EcDrawer>
    );
};

export { AddUserDrawer };
