"use client";

import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    createFilterOptions,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
    useFetchInviteeUsers,
    useFetchProjectUsers,
    useFilterInviteesData,
    useProjectMutations,
} from "../../hooks";
import { FilteredUserResponseType, UserType } from "../../types";
import { emailValidation } from "../../utils";
import {
    DivRow,
    ShareModal,
    ShareModalDivWrapper,
    UserAvtarInfo,
    useStyles,
} from "../Modal/ShareModal";

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
    const classes = useStyles();
    const { projectId, onClose, pageId, flowId, versionId, versionUsers, branchName, flowNodeId } =
        props;
    const [values, setValues] = useState<FilteredUserResponseType[]>([]);

    const { data: projectUsers = [] } = useFetchProjectUsers(projectId);

    const { inviteVersion } = useProjectMutations();
    const {
        mutate: mutateInviteVersion,
        isLoading: isLoadingFlow,
        data: inviteData,
    } = inviteVersion;
    const { data: invitees = [] } = useFetchInviteeUsers();
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1
    );
    const filter = createFilterOptions<FilteredUserResponseType>({
        stringify: ({ name, email }) => `${name} ${email}`,
    });

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
                <Button className="marginR-10" variant="outlined" onClick={onClose}>
                    Close
                </Button>
            }
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "inherit",
                        sm: "center",
                        md: "center",
                        lg: "center",
                        xl: "center",
                    },
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                        xl: "row",
                    },
                    width: "100%",
                    gap: {
                        xs: "1rem",
                        sm: "0",
                        md: "0",
                        lg: "0",
                        xl: "0",
                    },
                }}
            >
                <Box display="flex" flexDirection="column" flexGrow={1}>
                    <Autocomplete
                        limitTags={2}
                        classes={{ option: classes.option }}
                        multiple
                        disabled={isLoadingFlow}
                        id="tags-standard"
                        filterSelectedOptions
                        isOptionEqualToValue={(option: any, value: any) =>
                            option.email === value.email
                        }
                        getOptionLabel={(option) => option.email}
                        options={filteredInvitees}
                        getOptionDisabled={(option) => {
                            // check if the email is valid
                            const isValidEmail = emailValidation(option.email);
                            // disable the option if the email is not valid
                            return !isValidEmail;
                        }}
                        onChange={(event, newValue) => setValues(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Email"
                                placeholder="Search Users"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                sx={{ width: "100%" }}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "off", // disable autocomplete and autofill
                                }}
                            />
                        )}
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
                                    email: `${inputValue}`,
                                    avatar: "",
                                });
                            }
                            return filtered;
                        }}
                        renderOption={(prop, option, state) => (
                            <Box
                                key={option.email}
                                display="flex"
                                alignItems="center"
                                component="li"
                                p={2}
                                m={0}
                                width="100%"
                                sx={{
                                    cursor: "pointer",
                                    background: state.selected ? "#EBF2FF" : "#fff",
                                }}
                                {...prop}
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
                                <Box display="flex" flexDirection="column" ml={1} fontWeight={400}>
                                    <Typography variant="inherit" style={{ fontSize: "1rem" }}>
                                        {option.name}
                                    </Typography>
                                    <Typography
                                        variant="inherit"
                                        style={{
                                            fontSize: ".8rem",
                                            color: "#616161",
                                        }}
                                    >
                                        {option.email}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    />
                </Box>

                <Box minWidth="10rem" display="flex" justifyContent="flex-end">
                    <LoadingButton
                        onClick={handleSendInvite}
                        endIcon={<SendIcon />}
                        loading={isLoadingFlow}
                        loadingPosition="end"
                        variant="contained"
                        disabled={isLoadingFlow || !values.length}
                        sx={{ textTransform: "inherit" }}
                    >
                        <span>Send Link</span>
                    </LoadingButton>
                </Box>
            </Box>
            <ShareModalDivWrapper>
                <div
                    style={{
                        marginRight: ".125rem",
                        marginBottom: ".5rem",
                    }}
                >
                    <Typography fontWeight="500">People with access</Typography>
                </div>
                <>
                    {versionUser?.map(({ user_id, avatar, email, name }) => (
                        <DivRow className="flextable-row" key={user_id}>
                            <div className="flexlist-item">
                                <UserAvtarInfo
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Avatar
                                        src={avatar}
                                        style={{
                                            display: "flex",
                                            marginRight: "8px",
                                        }}
                                    />
                                    <div className="u-info">
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            flexGrow={1}
                                            alignItems="center"
                                        >
                                            <span className="u-name">{name}</span>
                                            <span className="u-email">
                                                {email && <span>{email}</span>}
                                            </span>
                                        </Box>
                                    </div>
                                </UserAvtarInfo>
                            </div>
                        </DivRow>
                    ))}
                </>
            </ShareModalDivWrapper>
        </ShareModal>
    );
};

export { ShareFlowVersionModal };
