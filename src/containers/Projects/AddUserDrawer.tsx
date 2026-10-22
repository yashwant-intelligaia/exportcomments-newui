"use client";

import {
    ArrowDropDown as ArrowDropDownIcon,
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Checkbox,
    createFilterOptions,
    FormControlLabel,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { get } from "../../utils/object";
import { useContext, useEffect, useState } from "react";

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
    const filter = createFilterOptions<ProcessedInviteesDataType>({
        stringify: ({ name, email }) => `${name} ${email}`,
    });
    const { data: invitees = [], isFetching: isFetchingInvitees } = useFetchInviteeUsers();
    const { data: projects = [], isFetching: isFetchingProjects } = useFetchFiles(props as any);
    const processedProjectsData = get(projects, "data.data", []) as IUserFile[];
    const processedProjectsDataIds = processedProjectsData.map(({ projectId }) => projectId);

    const processedInviteesData = useProcessInviteesData(invitees);
    const { addUserToProject } = useAddUserToProject();
    const { mutate: mutateAddUser, isLoading: isAddingUserToProject, isSuccess } = addUserToProject;

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
    return (
        <EcDrawer
            open
            direction="right"
            closeOnClickOutside={false}
            onClose={onClose}
            title={
                <Typography variant="h6" fontWeight="500" mb={1.5}>
                    Add Users
                </Typography>
            }
        >
            <Box mt={2} pr={2}>
                <Autocomplete
                    id="users"
                    sx={{ width: "100%" }}
                    options={processedInviteesData}
                    getOptionDisabled={getSelectedUser}
                    disableCloseOnSelect
                    autoHighlight
                    disabled={isFetchingInvitees || isFetchingProjects}
                    freeSolo
                    getOptionLabel={() => ""}
                    clearOnBlur
                    onChange={(event, newValue) => {
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
                    }}
                    filterOptions={(filterOption, params) => {
                        const filtered = filter(filterOption, params);
                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = filterOption.some((option) =>
                            option.email.includes(inputValue)
                        );
                        if (inputValue !== "" && !isExisting) {
                            filtered.push({
                                inputValue,
                                name: "",
                                email: `Add "${inputValue}"`,
                                avatar: "",
                                showProject: false,
                                selectedProjectIds: processedProjectsDataIds,
                            });
                        }
                        return filtered;
                    }}
                    renderOption={(renderProps, option) => (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={2}
                            m={0}
                            sx={{
                                cursor: "pointer",
                                width: "100%",
                                "&:hover": {
                                    background: "#EBF2FF !important",
                                },
                            }}
                            component="li"
                            key={option.email}
                            {...renderProps}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                component="li"
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: "transparent !important",
                                    flexGrow: 1,
                                    width: "70%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: "36px",
                                        height: "36px",
                                        bgcolor: "#efefef",
                                        color: "#000",
                                        fontSize: "18px",
                                    }}
                                    src={option.avatar}
                                />
                                <Box ml={1} fontWeight={400} width="100%">
                                    <Box fontSize={16}>
                                        <Typography variant="inherit">{option.name}</Typography>
                                    </Box>
                                    <Box fontSize={14} color="#616161" width="90%">
                                        <Typography
                                            variant="inherit"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "block",
                                            }}
                                        >
                                            {option.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {getSelectedUser(option) ? (
                                <CheckCircleIcon
                                    sx={{
                                        fill: "#65B168 !important",
                                    }}
                                />
                            ) : null}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!error}
                            label="Enter name or email"
                            variant="standard"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off", // disable autocomplete and autofill
                            }}
                            onChange={(event) => {
                                if (!!error && event.target.value.trim() !== "") {
                                    setError("");
                                }
                            }}
                            helperText={error || ""}
                            id="NB-enter-name-or-email"
                        />
                    )}
                />
            </Box>
            <Box
                width={350}
                height="calc(100vh - 190px)"
                overflow="scroll"
                pr={1}
                sx={{
                    overflowX: "hidden",
                }}
            >
                <Box fontSize={16} fontWeight={700} mt={3}>
                    <Typography variant="inherit">Selected User(s)</Typography>
                </Box>
                {!selectedUsers && (
                    <Box fontSize={14} color=" #444444" mt={2}>
                        <Typography variant="inherit">No users have been selected</Typography>
                    </Box>
                )}
                {selectedUsers.map(
                    ({ name, email, avatar, selectedProjectIds, showProject }, userIndex) => (
                        <Box
                            p={2}
                            pb={1}
                            mt={2}
                            border={1}
                            borderColor="#e0e0e0"
                            borderRadius="12px"
                            key={`selected-user-${uniqueKey(userIndex)}`}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Avatar
                                    sx={{
                                        width: "36px",
                                        height: "36px",
                                        bgcolor: "#efefef",
                                        color: "#000",
                                        fontSize: "18px",
                                    }}
                                    src={avatar}
                                />
                                <Box ml={1} fontWeight={400} position="relative" width="100%">
                                    <Box fontSize={16}>
                                        <Typography variant="inherit">{name}</Typography>
                                    </Box>
                                    <Box fontSize={14} color="#616161" width="90%">
                                        <Typography
                                            variant="inherit"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "block",
                                            }}
                                        >
                                            {email}
                                        </Typography>
                                    </Box>
                                    <Box
                                        position="absolute"
                                        sx={{
                                            top: "50%",
                                            right: "0",
                                            transform: "translateY(-50%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <IconButton
                                            aria-label="close drawer"
                                            component="span"
                                            onClick={onClose}
                                            sx={{
                                                color: (theme) => theme.palette.grey[500],
                                                "&:hover": {
                                                    color: "#000",
                                                },
                                            }}
                                        >
                                            <CloseIcon
                                                onClick={() => handleRemoveSelectedUser(userIndex)}
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>

                            <Box borderTop={1} borderColor="#e0e0e0" mt={2} pt={1}>
                                <FormControlLabel
                                    label=""
                                    control={
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            width="100%"
                                            alignItems="center"
                                        >
                                            <Box display="flex" alignItems="center" width="100%">
                                                <Checkbox
                                                    // indeterminate={addedUser.checkAll}
                                                    // checked={addedUser.checkAll}
                                                    indeterminate={
                                                        selectedProjectIds.length ===
                                                        processedProjectsDataIds.length
                                                    }
                                                    checked={
                                                        selectedProjectIds.length ===
                                                        processedProjectsDataIds.length
                                                    }
                                                    onChange={() =>
                                                        handleCheckAllProjects(userIndex)
                                                    }
                                                />
                                                <Box>All Projects</Box>
                                            </Box>
                                        </Box>
                                    }
                                    sx={{
                                        width: "calc(100% - 35px)",
                                        margin: "0px",
                                        background: "#fff",
                                        "&:hover": {
                                            background: "#EBF2FF",
                                        },
                                    }}
                                />
                                <IconButton
                                    sx={{
                                        display: "inline-flex",
                                        padding: "0",
                                    }}
                                    onClick={() => handleShowUserProjects(userIndex)}
                                >
                                    <ArrowDropDownIcon
                                        sx={{
                                            width: "35px",
                                            height: "35px",
                                        }}
                                    />
                                </IconButton>
                                {showProject &&
                                    processedProjectsData.map(
                                        ({ fileName: projectName, projectId }, projectIndex) => (
                                            <Box
                                                key={`user-${uniqueKey(
                                                    userIndex
                                                )}-project-${uniqueKey(projectIndex)}`}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    borderTop: "1px dashed #e0e0e0",
                                                }}
                                            >
                                                <FormControlLabel
                                                    label={projectName}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedProjectIds.includes(
                                                                projectId
                                                            )}
                                                            onChange={() =>
                                                                handleProjectCheckChange(
                                                                    userIndex,
                                                                    projectId
                                                                )
                                                            }
                                                        />
                                                    }
                                                    sx={{
                                                        margin: "0px",
                                                        background: "#fff",
                                                        "&:hover": {
                                                            background: "#EBF2FF",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        )
                                    )}
                            </Box>
                        </Box>
                    )
                )}
            </Box>
            <Box width={350} display="flex" justifyContent="flex-end" mt={1}>
                <Button
                    variant="text"
                    sx={{ marginRight: "10px", textTransform: "inherit" }}
                    onClick={onClose}
                >
                    {/* TODO: In future, we need to add functionality to cancel query, api request and promise as well */}
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{ marginRight: "10px", textTransform: "inherit" }}
                    disabled={isAddingUserToProject || selectedUsers.length === 0}
                    onClick={submitForm}
                    id="NB-add-user-button"
                >
                    Add
                </Button>
            </Box>
        </EcDrawer>
    );
};

export { AddUserDrawer };
