"use client";

import {
    Clear,
    CreateOutlined as CreateOutlinedIcon,
    Done as DoneIcon,
    PriorityHigh,
} from "@mui/icons-material";
import { Box, FormControl, IconButton, Input, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { EcTooltip } from "../EcTooltip";

interface EcEditModePropsType {
    editable?: boolean;
    // TODO: need to update type
    name?: any;
    title: any;
    placeholder?: string;
    error?: string;
    variant?: Variant | "inherit";
    size?: string | number;
    className?: string;
    showTooltip?: boolean;
    onSubmit: (title: string) => Promise<boolean>;
    icon?: JSX.Element;
    isLoading?: boolean;
}

const EcEditMode = (props: EcEditModePropsType) => {
    const {
        editable,
        name,
        title,
        placeholder,
        icon,
        variant,
        size,
        className,
        showTooltip,
        isLoading,
        onSubmit,
    } = props;
    const [isEditable, setIsEditable] = useState(false);
    const inputRef = useRef(name);

    const { register, formState, handleSubmit, setValue } = useForm();
    const { project: titleError } = formState.errors;
    const handleSubmitTitle = async (formData: any) => {
        const { project } = formData;
        if (!isEditable) {
            setIsEditable(!isEditable);
        } else {
            const isTitleUpdated = await onSubmit(project.trim());
            if (isTitleUpdated) setIsEditable(!isEditable);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitTitle)}>
            <Box
                display="flex"
                alignItems="center"
                sx={{ gap: isEditable ? 0 : 0.5, paddingRight: 1 }}
            >
                {icon && (
                    <IconButton disableRipple disableFocusRipple aria-label="Edit" size="small">
                        {icon}
                    </IconButton>
                )}

                {isEditable && (
                    <FormControl>
                        <Input
                            autoComplete="off"
                            inputRef={inputRef}
                            defaultValue={title}
                            autoFocus
                            sx={{ fontSize: 16 }}
                            inputProps={{ style: { width: "100vh" } }}
                            placeholder={placeholder}
                            aria-describedby="error"
                            className={className}
                            error={titleError}
                            {...register(name, {
                                required: {
                                    value: true,
                                    message: "Project title cannot be empty",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Project title cannot exceed 100 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]*$/,
                                    message: "Project title cannot contain special characters",
                                },
                                validate: {
                                    noLeadingTrailingSpaces: (value) =>
                                        value.trim().length !== 0 ||
                                        "Project title cannot be whitespace only",
                                    noLeadingSpaces: (value) =>
                                        value === value.trim() ||
                                        "Project title cannot start or end with spaces",
                                },
                            })}
                        />
                    </FormControl>
                )}

                {!isEditable && showTooltip && (
                    <EcTooltip title={title} placement="top" arrow>
                        {/* Todo need to implement line-height in next release using theme */}
                        <Typography variant={variant} noWrap style={{ lineHeight: "2.25rem" }}>
                            {title}
                        </Typography>
                    </EcTooltip>
                )}

                {isEditable && (
                    <IconButton
                        aria-label="Cancel"
                        onClick={() => {
                            setIsEditable(false);
                            setValue(name, title);
                        }}
                        style={{ marginLeft: "5px" }}
                        disabled={!editable || isLoading}
                        size="small"
                    >
                        <Clear style={{ fontSize: size }} />
                    </IconButton>
                )}

                <IconButton
                    aria-label="Edit"
                    type="submit"
                    size="small"
                    disabled={!editable || isLoading}
                    sx={{
                        margin: "0px 20px 0px 0px",
                    }}
                >
                    {isEditable && titleError && (
                        <EcTooltip title={titleError?.message} placement="top" arrow>
                            <PriorityHigh style={{ fontSize: 18, color: "red" }} />
                        </EcTooltip>
                    )}
                    {isEditable && !titleError && <DoneIcon style={{ fontSize: size }} />}
                    {!isEditable && (
                        <EcTooltip title="Edit Title" placement="top" arrow>
                            <CreateOutlinedIcon style={{ fontSize: size }} />
                        </EcTooltip>
                    )}
                </IconButton>
            </Box>
        </form>
    );
};

EcEditMode.defaultProps = {
    placeholder: "Enter title",
    editable: true,
    variant: "h6",
    size: 18,
    className: undefined,
    showTooltip: true,
    icon: undefined,
    isLoading: undefined,
};

export { EcEditMode };
