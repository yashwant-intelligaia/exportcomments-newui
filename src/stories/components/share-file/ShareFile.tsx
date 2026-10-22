"use client";

import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Display";
import { Checkbox, TextField } from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";

import Fail from "../../../assets/error.svg";
import Success from "../../../assets/success.svg";
import { APP_CONSTANT } from "../../../constants/AppConstant";
import { useCommonPost } from "../../../hooks/filesHook";
import { IFileUser, IShareFileRequestType, ISharesheetSnackBarMessage } from "../../../types";
import { emailValidation, getLoadingImage, getLoadingMessage } from "../../../utils";
import { cloneDeep } from "../../../utils/object";
import { Loader } from "../Loader/Loader";

const emailInputClass =
    "h-9 w-full rounded-sm border border-ink/60 bg-surface px-2.5 text-sm text-ink placeholder:text-muted focus:ring-2 focus:ring-ink focus:outline-none";

const StatusBanner = ({ image, message, tone }: { image: string; message: string; tone: "ok" | "error" }) => (
    <div role="alert" className={`my-3 rounded-md p-3 ${tone === "ok" ? "bg-mint" : "bg-danger-soft"}`}>
        <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="status" src={image} className="size-8 rounded-full" />
        </div>
        <div className="mt-2 flex justify-center text-sm">{message}</div>
    </div>
);

export const ShareFile = (props: ISharesheetSnackBarMessage) => {
    const { users, projectId, close: onClose } = props;
    const [emailError, setEmailError] = useState("");
    const [userInput, setUserInput] = useState("" as string);
    const [options, setOptions] = useState(cloneDeep(users) as IFileUser[]);
    const [filteredOption, setFilterOption] = useState(cloneDeep(users) as IFileUser[]);
    const [selectedOption, setSelectedOption] = useState([] as IFileUser[]);
    const [invite, setInvite] = useState(false);
    const [message, setMessage] = useState("");
    const { mutate, data, isPending, error, reset } = useCommonPost({
        alertRequired: true,
    });
    useEffect(() => {
        if (data) {
            setInvite(true);
            setMessage(data.data.message);
        } else if (error) {
            setMessage((error as any)?.response?.data?.message);
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
        <>
            {isPending && <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />}
            <Modal open size="sm" className="share-modal">
                <div className="relative pr-4">
                    <h2 id="parent-modal-title" className="mb-2.5 font-sans text-lg font-semibold tracking-normal">
                        Share with people
                    </h2>
                    <button aria-label="close" onClick={close} className="absolute top-0 right-0 rounded-full p-1 text-muted hover:text-ink">
                        <X className="size-5" />
                    </button>
                </div>

                {error && <StatusBanner image={Fail.src} message={message} tone="error" />}
                {!invite && (
                    <TextField
                        value={userInput}
                        label="Search Users"
                        onChange={onChange}
                        helperText={emailError || ""}
                        error={!!emailError}
                    />
                )}
                {filteredOption && filteredOption.length > 0 && (
                    <div className="my-5 max-h-[250px] min-h-[150px] overflow-y-auto">
                        {filteredOption.map((option, index) => (
                            <div className="flex items-center pt-4" key={option.userId}>
                                <div className="relative my-2.5 flex items-center">
                                    <Checkbox
                                        checked={option.selected}
                                        disabled={!option.email}
                                        onChange={(checked) => optionChange(option)({ target: { checked } })}
                                        className="mr-2"
                                        aria-label={`select-${index}`}
                                    />
                                    <Avatar src={option.avatar} name={option.name || option.email} size={40} className="mr-2" />
                                    <div className="flex flex-wrap leading-5">
                                        <span className="w-full text-sm font-medium text-ink">{option.name}</span>
                                        <span className="w-full text-xs text-muted">
                                            <div className="flex w-full items-center">
                                                {option.iseditable && option.editValue && (
                                                    <div className="relative flex w-full flex-wrap items-center">
                                                        <input
                                                            type="text"
                                                            value={option.tempEmail}
                                                            onChange={editEmailValueChange(option)}
                                                            onKeyDown={emailKeyPress(option)}
                                                            placeholder="enter email"
                                                            className={emailInputClass}
                                                        />
                                                        {option.validEmail === "invalid" ? (
                                                            <span className="ml-1 flex w-full text-[10px] text-danger capitalize">
                                                                invalid email.
                                                            </span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                aria-label="confirm email"
                                                                className="absolute right-1 text-blue-ink"
                                                                onClick={doneEmail(option)}
                                                            >
                                                                <Check className="size-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                {option.email && !option.editValue && <span>{option.email}</span>}
                                                {!option.email && !option.editValue && (
                                                    <button type="button" className="flex items-center" onClick={editValueChange(option)}>
                                                        Add an email
                                                        <Pencil className="relative top-0.5 ml-1 size-4 text-blue-ink" />
                                                    </button>
                                                )}
                                                {option.email && option.iseditable && !option.editValue && (
                                                    <button type="button" aria-label="edit email" onClick={editValueChange(option)}>
                                                        <Pencil className="ml-1 size-4 text-blue-ink" />
                                                    </button>
                                                )}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {filteredOption && filteredOption.length === 0 && (
                    <button type="button" className="flex w-full items-center gap-2 bg-surface p-4 text-left hover:bg-blue-soft" onClick={addNewUser}>
                        <Avatar name="" size={36} />
                        <span className="text-sm text-muted">{`Add ${userInput}`}</span>
                    </button>
                )}

                {invite && <StatusBanner image={Success.src} message={message} tone="ok" />}

                <div className="flex justify-end gap-2.5">
                    <Button variant="outlined" onClick={close}>
                        Close
                    </Button>
                    {!invite && (
                        <Button disabled={!selectedOption.length} onClick={handleAction}>
                            Share
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    );
};
