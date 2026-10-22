import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    createFilterOptions,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

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
import { emailValidation } from "../../utils";
import { DivRow, ShareModal, ShareModalDivWrapper, UserAvtarInfo, useStyles } from "./ShareModal";

interface ManageTeamModalPropsType {
    projectId: number;
    onClose: () => void;
}

const ManageTeamModal = (props: ManageTeamModalPropsType) => {
    const classes = useStyles();
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
    const { mutate: mutateSendInvite, isLoading: isSendingInvite } = sendInvite;

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
            mutateSendInvite({
                projectId,
                emails: values.map(({ email }) => email),
            });
        }
        onClose();
    };

    return (
        <>
            <ShareModal
                title={<h2 id="parent-modal-title">Share with people</h2>}
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
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        ml={1}
                                        fontWeight={400}
                                    >
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
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ textTransform: "inherit" }}
                            onClick={handleSendInvite}
                            disabled={isSendingInvite || !values.length}
                        >
                            Send Invite
                        </Button>
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
                        {projectUsers.map(({ userId, avatar, email, name, projectOwner }) => (
                            <DivRow
                                className={`flextable-row ${
                                    projectOwner && projectUsers.length > 1 ? "product-owner" : ""
                                }`}
                                key={userId}
                            >
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
                                            {projectOwner && (
                                                <Box
                                                    minWidth="6rem"
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <span className="u-email">Project Owner</span>
                                                </Box>
                                            )}
                                            {!projectOwner &&
                                                projectOwnerData?.userId === user.userId && (
                                                    <Box
                                                        minWidth="6rem"
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <span className="u-email">
                                                            <Link
                                                                underline="none"
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    setConfirmDialog(
                                                                        <EcDialog
                                                                            title="Remove User"
                                                                            description="Are you sure you want to remove user from this Project."
                                                                            open
                                                                            actionButtons={[
                                                                                {
                                                                                    label: "Cancel",
                                                                                    onClick: () => {
                                                                                        setConfirmDialog(
                                                                                            undefined
                                                                                        );
                                                                                    },
                                                                                    variant:
                                                                                        "outlined",
                                                                                },
                                                                                {
                                                                                    label: "Yes, I'm Sure",
                                                                                    onClick:
                                                                                        async () => {
                                                                                            await mutateDeleteProjectMember(
                                                                                                {
                                                                                                    projectId,
                                                                                                    userId,
                                                                                                }
                                                                                            );
                                                                                            setConfirmDialog(
                                                                                                undefined
                                                                                            );
                                                                                        },
                                                                                    variant:
                                                                                        "contained",
                                                                                },
                                                                            ]}
                                                                            onClose={() => {
                                                                                setConfirmDialog(
                                                                                    undefined
                                                                                );
                                                                            }}
                                                                        />
                                                                    )
                                                                }
                                                            >
                                                                Remove User
                                                            </Link>
                                                        </span>
                                                    </Box>
                                                )}
                                        </div>
                                    </UserAvtarInfo>
                                </div>
                            </DivRow>
                        ))}
                    </>
                </ShareModalDivWrapper>
            </ShareModal>
            {confirmDialog && confirmDialog}
        </>
    );
};

export { ManageTeamModal };
