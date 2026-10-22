"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneIcon from "@mui/icons-material/Done";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Fail from "../../../assets/error.svg";
import Success from "../../../assets/success.svg";
import { APP_CONSTANT } from "../../../constants/AppConstant";
import { useCommonPost } from "../../../hooks/filesHook";
import { IFileUser, IShareFileRequestType, ISharesheetSnackBarMessage } from "../../../types";
import { emailValidation, getLoadingImage, getLoadingMessage } from "../../../utils";
import { Loader } from "../Loader/Loader";

const ModalWrapper = styled.div`
    width: 700px;
`;
const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 640,
    maxWidth: "90%",
    bgcolor: "background.paper",
    borderRadius: 1,
    pt: 3,
    px: 3,
    pb: 3,
    boxShadow: 8,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.25,
};

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;

    .marginR-10 {
        margin-right: 10px;
    }

    button {
        text-transform: none;
    }
`;

const DivRow = styled.div`
padding - left: 0;
padding - top: 16px;
margin: 0;
`;

const SucessImg = styled.img`
    cursor: pointer;
    height: 32px;
    width: 32px;
    margin-left: 10px;
    border-radius: 50%;
`;

const DivWrapper = styled.div`
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
    margin: 20px 0 10px 0;
    .flextable-row {
        display: flex;
        align-items: center;
        justify-content: ;
        .inner-cell {
            display: flex;
            width: 100%;
            .input-wrapper {
                display: flex;
                width: 100%;
                align-items: center;
                flex-wrap: wrap;
                position: relative input {
                    height: 30px;
                    line-height: 1;
                }
                .email-done {
                    position: absolute;
                    right: 5px;
                    z-index: 9;
                    margin-top: 5px;
                    cursor: pointer;
                    color: #2979ff;
                    font-size: 1rem;
                }
            }
            .edit-email {
                font-size: 1rem;
                color: #2979ff;
                margin-left: 5px;
                cursor: pointer;
                position: relative;
                top: 2px;
            }
        }
        .flexlist-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            position: relative;
            label {
                margin-right: 0;
            }
        }
    }
`;

const Input = styled.input`
    background-color: #f9f9f9;
    border-radius: 4px 4px 0 0;
    border: 0.125rem solid transparent;
    color: #9e9e9e;
    font-size: 0.875rem;
    font-weight: 400;
    height: 2.25rem;
    padding: 8px 10px;
    width: 100%;
    letter-spacing: 0.1px;
    box-shadow: 0 1px 0 #616161;
    :hover {
        box-shadow: 0 2px 0 #616161;
        -webkit-box-shadow: 0 2px 0 #616161;
    }
    :active,
    :focus {
        box-shadow: 0 2px 0 #2979ff;
        -webkit-box-shadow: 0 2px 0 #2979ff;
    }
    ::placeholder {
        color: #9e9e9e;
        font-weight: 400;
        opacity: 1;
    }
`;
const EmailErrorSpan = styled.span`
    width: 100%;
    display: flex;
    color: #ea2227;
    font-size: 10px;
    margin-left: 5px;
    text-transform: capitalize;
`;

const CenterDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ModalTitle = styled.div`
    position: relative;
    padding-right: 16px;
    #parent-modal-title {
        font-size: 18px;
        color: #212121;
        margin: 0 0 10px 0;
    }
`;

const CloseModal = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`;

const UserAvtarInfo = styled.div`
    display: flex;
    align-items: center;

    .u-info {
        display: flex;
        flex-wrap: wrap;
        line-height: 20px;

        span.u-name {
            width: 100%;
            font-weight: 500;
            font-size: 14px;
            color: #212121;
        }
        span.u-email {
            width: 100%;
            font-weight: 400;
            font-size: 12px;
            color: #616161;
        }
    }

    @media (max-width: 340px) {
        img {
            width: 30px;
            height: 30px;
        }
    }
`;

export const ShareFile = (props: ISharesheetSnackBarMessage) => {
    const { users, projectId, close: onClose } = props;
    const [emailError, setEmailError] = useState("");
    const [userInput, setUserInput] = useState("" as string);
    const [options, setOptions] = useState(cloneDeep(users) as IFileUser[]);
    const [filteredOption, setFilterOption] = useState(cloneDeep(users) as IFileUser[]);
    const [selectedOption, setSelectedOption] = useState([] as IFileUser[]);
    const [invite, setInvite] = useState(false);
    const [message, setMessage] = useState("");
    const { mutate, data, isLoading, error, reset } = useCommonPost({
        alertRequired: true,
    });
    useEffect(() => {
        if (data) {
            setInvite(true);
            setMessage(data.data.message);
        } else if (error) {
            setMessage(error?.response?.data?.message);
        }
    }, [data, error]);

    useEffect(() => {
        if (userInput) {
            setFilterOption(
                options.filter((option: IFileUser) => {
                    if (option.name) {
                        return option?.name
                            ?.toString()
                            .toLowerCase()
                            .startsWith(userInput.toString().toLowerCase());
                    }

                    return option?.email
                        ?.toString()
                        .toLowerCase()
                        .startsWith(userInput.toString().toLowerCase());
                })
            );
            setSelectedOption(options.filter((user: IFileUser) => user.selected));
        } else {
            setFilterOption(cloneDeep(options));
        }
        setUserInput("");
    }, [options]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reset();
        setEmailError("");
        if (e.target.value) {
            setFilterOption(
                options.filter((option: IFileUser) => {
                    if (option.email) {
                        return option?.email
                            ?.toString()
                            .toLowerCase()
                            .startsWith(e.target.value.toString().toLowerCase());
                    }

                    return option?.name
                        ?.toString()
                        .toLowerCase()
                        .startsWith(e.target.value.toString().toLowerCase());
                })
            );
        } else {
            setFilterOption(cloneDeep(options));
        }

        setUserInput(e.target.value);
    };

    const optionChange = (item: IFileUser) => (event: any) => {
        reset();
        const pIndex = options.findIndex((option: IFileUser) => option.email === item.email);
        if (pIndex > -1) {
            options[pIndex].selected = event.target.checked;
        }

        const temp = cloneDeep(filteredOption);
        const fIndex = temp.findIndex((option: IFileUser) => option.email === item.email);
        if (fIndex > -1) {
            temp[fIndex].selected = event.target.checked;
        }

        setFilterOption(temp);
        setSelectedOption(options.filter((user: IFileUser) => user.selected));
    };

    const close = () => {
        onClose();
    };

    const editValueChange = (item: IFileUser) => () => {
        reset();
        const temp = cloneDeep(filteredOption);
        const fIndex = temp.findIndex((option: IFileUser) => option.userId === item.userId);
        if (fIndex > -1) {
            temp[fIndex].editValue = !temp[fIndex].editValue;
        }

        setFilterOption(temp);
        setSelectedOption(options.filter((user: IFileUser) => user.selected));
    };

    const editEmailValueChange = (item: IFileUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
        reset();
        const temp = cloneDeep(filteredOption);
        const fIndex = temp.findIndex((option: IFileUser) => option.userId === item.userId);
        if (fIndex > -1) {
            temp[fIndex].tempEmail = e.target.value;
            temp[fIndex].validEmail = "";
        }

        const pIndex = options.findIndex((option: IFileUser) => option.userId === item.userId);
        if (pIndex > -1) {
            options[pIndex].tempEmail = e.target.value;
            options[pIndex].validEmail = "";
        }

        setFilterOption(temp);
    };

    const emailChanges = (item: IFileUser) => {
        reset();
        const temp = cloneDeep(filteredOption);
        const fIndex = temp.findIndex((option: IFileUser) => option.userId === item.userId);
        if (fIndex > -1) {
            if (temp[fIndex].tempEmail) {
                if (emailValidation(temp[fIndex].tempEmail)) {
                    temp[fIndex].validEmail = "valid";
                    temp[fIndex].editValue = !temp[fIndex].editValue;
                    temp[fIndex].selected = true;
                    temp[fIndex].email = temp[fIndex].tempEmail;
                } else {
                    temp[fIndex].validEmail = "invalid";
                }
            } else {
                temp[fIndex].tempEmail = "";
                temp[fIndex].editValue = !temp[fIndex].editValue;
            }
        }

        const pIndex = options.findIndex((option: IFileUser) => option.userId === item.userId);
        if (pIndex > -1) {
            if (options[pIndex].tempEmail) {
                if (emailValidation(temp[fIndex].tempEmail)) {
                    options[pIndex].validEmail = "valid";
                    options[pIndex].email = options[pIndex].tempEmail;
                    options[pIndex].editValue = !options[pIndex].editValue;
                    options[pIndex].selected = true;
                } else {
                    options[pIndex].validEmail = "invalid";
                }
            } else {
                options[pIndex].tempEmail = "";
                options[pIndex].editValue = !options[pIndex].editValue;
            }
        }

        setFilterOption(temp);
        setSelectedOption(options.filter((user: IFileUser) => user.selected));
    };

    const emailKeyPress = (item: IFileUser) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            emailChanges(item);
        }
    };

    const doneEmail = (item: IFileUser) => () => {
        emailChanges(item);
    };

    const handleAction = () => {
        if (projectId) {
            reset();

            const obj: IShareFileRequestType = {} as IShareFileRequestType;
            obj.projectId = projectId;
            obj.users = [];
            selectedOption.forEach((e: any) => {
                obj.users.push({
                    email: e.email,
                    userId: e.userId,
                });
            });
            mutate({
                body: obj,
                url: APP_CONSTANT.webApi.shareFileWithUser,
            });
            onClose();
        } else {
            onClose();
        }
    };

    const addNewUser = () => {
        if (emailValidation(userInput)) {
            setEmailError("");
            let emailIdExist = false;
            options.forEach((option) => {
                if (option.email === userInput) {
                    emailIdExist = true;
                }
            });
            if (!emailIdExist) {
                setOptions((options2) => [
                    ...options2,
                    {
                        avatar: "",
                        editValue: false,
                        email: userInput,
                        iseditable: false,
                        name: "",
                        selected: true,
                        tempEmail: "",
                        userId: "",
                        validEmail: "valid",
                    },
                ]);
            }
        } else {
            setEmailError("Email is not valid");
        }
    };

    return (
        <ModalWrapper>
            {isLoading && <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />}
            <Modal
                open
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 640, maxWidth: "90%" }} className="share-modal">
                    <ModalTitle>
                        <h2 id="parent-modal-title">Share with people</h2>
                        <CloseModal onClick={close}>
                            <CloseRoundedIcon />
                        </CloseModal>
                    </ModalTitle>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <CenterDiv>
                                <SucessImg alt="profile" src={Fail} />
                            </CenterDiv>
                            <CenterDiv>{message}</CenterDiv>
                        </div>
                    )}
                    {!invite && (
                        <TextField
                            value={userInput}
                            label="Search Users"
                            variant="standard"
                            onChange={onChange}
                            sx={{ width: "100%" }}
                            helperText={emailError || ""}
                            error={!!emailError}
                        />
                    )}
                    {filteredOption && filteredOption.length > 0 && (
                        <DivWrapper>
                            {filteredOption.map((option, index) => (
                                <DivRow className="flextable-row" key={option.userId}>
                                    <div className="flexlist-item">
                                        <Checkbox
                                            id={`check - api - ${index} `}
                                            checked={option.selected}
                                            disabled={!option.email}
                                            onChange={optionChange(option)}
                                        />

                                        <UserAvtarInfo>
                                            <Avatar
                                                src={option.avatar}
                                                style={{
                                                    display: "flex",
                                                    marginRight: "8px",
                                                }}
                                            />
                                            <div className="u-info">
                                                <span className="u-name">{option.name}</span>
                                                <span className="u-email">
                                                    <div
                                                        className={
                                                            option && option.email
                                                                ? "inner-cell"
                                                                : "inner-cell with-out-email"
                                                        }
                                                    >
                                                        {!option.email && option.editValue && (
                                                            <div
                                                                className={
                                                                    option.validEmail === "invalid"
                                                                        ? "input-wrapper error"
                                                                        : "input-wrapper"
                                                                }
                                                            />
                                                        )}
                                                    </div>

                                                    <div
                                                        className={
                                                            option && option.email
                                                                ? "inner-cell"
                                                                : "inner-cell with-out-email"
                                                        }
                                                    >
                                                        {option.iseditable && option.editValue && (
                                                            <div
                                                                className={
                                                                    option.validEmail === "invalid"
                                                                        ? "input-wrapper error"
                                                                        : "input-wrapper"
                                                                }
                                                            >
                                                                <Input
                                                                    type="textbox"
                                                                    value={option.tempEmail}
                                                                    onChange={editEmailValueChange(
                                                                        option
                                                                    )}
                                                                    onKeyPress={emailKeyPress(
                                                                        option
                                                                    )}
                                                                    placeholder="enter email"
                                                                />
                                                                {option.validEmail ===
                                                                    "invalid" && (
                                                                    <EmailErrorSpan>
                                                                        invalid email.
                                                                    </EmailErrorSpan>
                                                                )}
                                                                {option.validEmail !==
                                                                    "invalid" && (
                                                                    <span
                                                                        role="presentation"
                                                                        className="email-done"
                                                                        onClick={doneEmail(option)}
                                                                    >
                                                                        <DoneIcon />
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                        {option.email && !option.editValue && (
                                                            <span>{option.email}</span>
                                                        )}
                                                        {!option.email && !option.editValue && (
                                                            <span
                                                                role="presentation"
                                                                onClick={editValueChange(option)}
                                                            >
                                                                Add an email
                                                                <EditOutlinedIcon
                                                                    onClick={editValueChange(
                                                                        option
                                                                    )}
                                                                    className="edit-email"
                                                                />
                                                            </span>
                                                        )}
                                                        {option.email &&
                                                            option.iseditable &&
                                                            !option.editValue && (
                                                                <span
                                                                    role="presentation"
                                                                    onClick={editValueChange(
                                                                        option
                                                                    )}
                                                                >
                                                                    <EditOutlinedIcon
                                                                        onClick={editValueChange(
                                                                            option
                                                                        )}
                                                                        className="edit-email"
                                                                    />
                                                                </span>
                                                            )}
                                                    </div>
                                                </span>
                                            </div>
                                        </UserAvtarInfo>
                                    </div>
                                </DivRow>
                            ))}
                        </DivWrapper>
                    )}
                    {filteredOption && filteredOption.length === 0 && (
                        <Box
                            key="id"
                            display="flex"
                            alignItems="center"
                            component="li"
                            p={2}
                            m={0}
                            sx={{
                                cursor: "pointer",
                                background: "#fff",
                                "&:hover": {
                                    background: "#EBF2FF !important",
                                },
                            }}
                            onClick={addNewUser}
                        >
                            <Avatar
                                sx={{
                                    width: "36px",
                                    height: "36px",
                                    bgcolor: "#efefef",
                                    color: "#000",
                                    fontSize: "18px",
                                }}
                                src=""
                            />
                            <Box ml={1} fontWeight={400}>
                                <Box fontSize={14} color="#616161">
                                    <Typography variant="inherit">{`Add ${userInput}`}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {invite && (
                        <div className="alert alert-success" role="alert">
                            <CenterDiv>
                                <SucessImg alt="profile" src={Success} />
                            </CenterDiv>
                            <CenterDiv>{message}</CenterDiv>
                        </div>
                    )}

                    <ModalFooter>
                        <Button className="marginR-10" variant="outlined" onClick={close}>
                            Close
                        </Button>
                        {!invite && (
                            <Button
                                variant="contained"
                                disabled={!selectedOption.length}
                                onClick={handleAction}
                            >
                                Share
                            </Button>
                        )}
                    </ModalFooter>
                </Box>
            </Modal>
        </ModalWrapper>
    );
};
