import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Autocomplete,
    autocompleteClasses,
    Avatar,
    Box,
    createFilterOptions,
    Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
    useFetchInviteeUsers,
    useFetchProjectUsers,
    useFilterInviteesData,
    useFlowMutations,
} from "../../hooks";
import { EcDrawer } from "../../stories/components";
import { FilteredUserResponseType } from "../../types";
import { FlowType } from "../../types/prototype";
import { emailValidation } from "../../utils";

const FeedbackContainer = styled.div`
    border-radius: 8px;
    margin-bottom: 35px;
    padding: 0px 0px;
    width: 500px;
    max-width: 750px;
    margin-top: 20px;
    @media (max-width: 600px) {
        width: 330px;
    }
`;

const versionNameLabelStyle = {
    marginBottom: "10px",
    fontWeight: "bold",
};

const versionNameInputStyle = {
    width: "100%",
};

const contributorHeadingStyle = {
    marginBottom: "10px",
    fontWeight: 600,
};

const contributorsBoxStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
};
const avatarStyle = {
    width: "36px",
    height: "36px",
    bgcolor: "#efefef",
    color: "#000",
    fontSize: "18px",
};

const CreateVersionButtonWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
`;
interface CreateVersionDrawerType {
    openCreateFeedbackDrawer: boolean;
    title: string;
    setOpenCreateFeedbackDrawer: (open: boolean) => void;
    flowInfo?: FlowType;
    projectId: number;
    pageId: number;
    closeFeedbackDrawer: () => void;
    branchName: string;
}

export const CreateVersionDrawer = (props: CreateVersionDrawerType) => {
    const {
        openCreateFeedbackDrawer,
        title,
        setOpenCreateFeedbackDrawer,
        flowInfo,
        projectId,
        closeFeedbackDrawer,
        branchName,
    } = props;
    const [state, setState] = useState(false);
    const toggleDrawer = (open: boolean) => {
        setOpenCreateFeedbackDrawer(open);
        setState(open);
    };
    useEffect(() => {
        setState(openCreateFeedbackDrawer);
    }, [openCreateFeedbackDrawer]);
    const [values, setValues] = useState<FilteredUserResponseType[]>([]);
    const { data: projectUsers = [] } = useFetchProjectUsers(projectId);
    const { data: invitees = [] } = useFetchInviteeUsers();
    const processedInvitees = useFilterInviteesData(invitees);

    const filteredInvitees = processedInvitees.filter(
        (invitee) => projectUsers.findIndex((users) => users.email === invitee.email) === -1
    );

    const filter = createFilterOptions<FilteredUserResponseType>({
        stringify: ({ name, email }) => `${name} ${email}`,
    });
    const { register, handleSubmit, formState, reset, watch } = useForm();
    const { errors } = formState;
    const { flowVersion } = useFlowMutations();
    const { mutate: mutateFlowVersion, isLoading, data } = flowVersion;
    const onSubmit = ({ name }: any) => {
        mutateFlowVersion({
            projectId,
            flowId: flowInfo?.flow_id,
            name,
            emails: values.map(({ email }) => email),
            branchName,
            flowNodeId: flowInfo?.node_id,
        });
        setValues([]);
        reset();
    };
    useEffect(() => {
        if (data !== undefined) {
            closeFeedbackDrawer();
        }
    }, [data]);

    return (
        <EcDrawer
            title={
                <Typography variant="h6" fontWeight="500" mb={1.5}>
                    {title}
                </Typography>
            }
            open={state}
            direction="right"
            onClose={() => toggleDrawer(false)}
        >
            <FeedbackContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Box sx={versionNameLabelStyle}>Version Name</Box>
                        <TextField
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Version can't be empty",
                                },
                                maxLength: {
                                    value: 45,
                                    message: "Version name cannot exceed 45 characters",
                                },
                            })}
                            helperText={errors?.name?.message}
                            error={errors?.name}
                            placeholder="Enter Version Name"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={1}
                            style={versionNameInputStyle}
                            size="small"
                        />
                    </Box>

                    <Box sx={contributorsBoxStyle}>
                        <Box display="flex" flexDirection="column" flexGrow={1}>
                            <div style={contributorHeadingStyle}>Contributors</div>
                            <Autocomplete
                                limitTags={2}
                                popupIcon={<SearchIcon />}
                                sx={{
                                    [`& .${autocompleteClasses.popupIndicator}`]: {
                                        transform: "none",
                                    },
                                }}
                                isOptionEqualToValue={(option: any, value: any) =>
                                    option.email === value.email
                                }
                                multiple
                                id="tags-standard"
                                filterSelectedOptions
                                getOptionLabel={(option) => option.email}
                                options={filteredInvitees}
                                getOptionDisabled={(option) => {
                                    // check if the email is valid
                                    const isValidEmail = emailValidation(option.email);
                                    // disable the option if the email is not valid
                                    return !isValidEmail;
                                }}
                                value={values}
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
                                            autoComplete: "off",
                                        }}
                                    />
                                )}
                                filterOptions={(filterOption: any, params) => {
                                    const filtered = filter(filterOption, params);
                                    const { inputValue } = params;

                                    const isExisting = filterOption.some((options: any) =>
                                        options.email.includes(inputValue)
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
                                renderOption={(prop, option, states) => (
                                    <Box
                                        key={option.email}
                                        display="flex"
                                        alignItems="center"
                                        component="li"
                                        p={0}
                                        m={0}
                                        sx={{
                                            cursor: "pointer",
                                            background: states.selected ? "#EBF2FF" : "#fff",
                                        }}
                                        {...prop}
                                    >
                                        <Avatar sx={avatarStyle} src={option.avatar || undefined} />
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            ml={1}
                                            fontWeight={400}
                                        >
                                            <Typography
                                                variant="inherit"
                                                style={{
                                                    fontSize: "1rem",
                                                }}
                                            >
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
                    </Box>
                    <CreateVersionButtonWrapper>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            size="medium"
                            loading={isLoading}
                            style={{ textTransform: "none" }}
                            type="submit"
                            disabled={watch("name")?.trim()?.length <= 0}
                        >
                            Create Version
                        </LoadingButton>
                    </CreateVersionButtonWrapper>
                </form>
            </FeedbackContainer>
        </EcDrawer>
    );
};
