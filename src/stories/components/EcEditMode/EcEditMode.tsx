"use client";

import { AlertCircle, Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { IconButton } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

import { EcTooltip } from "../EcTooltip";

interface EcEditModePropsType {
    editable?: boolean;
    name?: any;
    title: any;
    placeholder?: string;
    error?: string;
    variant?: string;
    size?: string | number;
    className?: string;
    showTooltip?: boolean;
    onSubmit: (title: string) => Promise<boolean>;
    icon?: JSX.Element;
    isLoading?: boolean;
}

const variantClass: Record<string, string> = {
    h4: "text-2xl",
    h5: "text-xl",
    h6: "text-lg",
    subtitle1: "text-base",
    body1: "text-base",
    body2: "text-sm",
};

const EcEditMode = ({
    editable = true,
    name,
    title,
    placeholder = "Enter title",
    icon,
    variant = "h6",
    size = 18,
    className,
    showTooltip = true,
    isLoading,
    onSubmit,
}: EcEditModePropsType) => {
    const [isEditable, setIsEditable] = useState(false);

    const { register, formState, handleSubmit, setValue } = useForm();
    const { project: titleError } = formState.errors;
    const iconSize = { width: Number(size), height: Number(size) };

    const handleSubmitTitle = async (formData: any) => {
        const { project } = formData;
        if (!isEditable) {
            setIsEditable(true);
        } else {
            const isTitleUpdated = await onSubmit(project.trim());
            if (isTitleUpdated) setIsEditable(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitTitle)}>
            <div className={cn("flex items-center pr-2", !isEditable && "gap-1")}>
                {icon && <span className="inline-flex p-1">{icon}</span>}

                {isEditable && (
                    <input
                        autoComplete="off"
                        defaultValue={title}
                        autoFocus
                        placeholder={placeholder}
                        aria-describedby="error"
                        aria-invalid={!!titleError}
                        className={cn(
                            "text-ink w-[min(60vw,32rem)] border-b bg-transparent py-1 text-base focus:outline-none",
                            titleError ? "border-danger" : "border-ink",
                            className,
                        )}
                        {...register(name, {
                            required: { value: true, message: "Project title cannot be empty" },
                            maxLength: { value: 100, message: "Project title cannot exceed 100 characters" },
                            pattern: {
                                value: /^[a-zA-Z0-9\s]*$/,
                                message: "Project title cannot contain special characters",
                            },
                            validate: {
                                noLeadingTrailingSpaces: (value) =>
                                    value.trim().length !== 0 || "Project title cannot be whitespace only",
                                noLeadingSpaces: (value) =>
                                    value === value.trim() || "Project title cannot start or end with spaces",
                            },
                        })}
                    />
                )}

                {!isEditable && showTooltip && (
                    <EcTooltip title={title} placement="top" arrow>
                        <span className={cn("text-ink truncate leading-9", variantClass[variant] ?? "text-lg")}>
                            {title}
                        </span>
                    </EcTooltip>
                )}

                {isEditable && (
                    <IconButton
                        aria-label="Cancel"
                        size="small"
                        className="ml-1"
                        disabled={!editable || isLoading}
                        onClick={() => {
                            setIsEditable(false);
                            setValue(name, title);
                        }}
                    >
                        <X style={iconSize} />
                    </IconButton>
                )}

                <IconButton
                    aria-label="Edit"
                    type="submit"
                    size="small"
                    className="mr-5"
                    disabled={!editable || isLoading}
                >
                    {isEditable && titleError && (
                        <EcTooltip title={titleError?.message as string} placement="top" arrow>
                            <AlertCircle className="text-danger size-[18px]" />
                        </EcTooltip>
                    )}
                    {isEditable && !titleError && <Check style={iconSize} />}
                    {!isEditable && (
                        <EcTooltip title="Edit Title" placement="top" arrow>
                            <Pencil style={iconSize} />
                        </EcTooltip>
                    )}
                </IconButton>
            </div>
        </form>
    );
};

export { EcEditMode };
