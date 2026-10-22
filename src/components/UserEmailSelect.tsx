"use client";

import { Combobox } from "@/components/ui/Combobox";
import { Avatar } from "@/components/ui/Display";

import { FilteredUserResponseType } from "@/types";
import { emailValidation } from "@/utils";

interface UserEmailSelectProps {
    options: FilteredUserResponseType[];
    value: FilteredUserResponseType[];
    onChange: (next: FilteredUserResponseType[]) => void;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
}

/** Multi-select of users by email; typed text that matches nobody becomes a new (validated) entry. */
export const UserEmailSelect = ({ options, value, onChange, disabled, label = "Email", placeholder = "Search Users" }: UserEmailSelectProps) => (
    <Combobox<FilteredUserResponseType>
        multiple
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        value={value}
        onChange={onChange}
        getKey={(o) => o.email}
        getLabel={(o) => o.email}
        getOptionDisabled={(o) => !emailValidation(o.email)}
        filterOptions={(pool, inputValue) => {
            const q = inputValue.trim().toLowerCase();
            const filtered = q ? pool.filter((o) => `${o.name} ${o.email}`.toLowerCase().includes(q)) : pool;
            const isExisting = pool.some((o) => o.email.includes(inputValue));
            if (inputValue !== "" && !isExisting) {
                return [...filtered, { inputValue, name: "", email: inputValue, avatar: "" } as FilteredUserResponseType];
            }
            return filtered;
        }}
        renderOption={(option) => (
            <div className="flex items-center gap-2">
                <Avatar src={option.avatar} name={option.name || option.email} size={36} />
                <div className="flex min-w-0 flex-col">
                    <span className="truncate text-base text-ink">{option.name}</span>
                    <span className="truncate text-xs text-muted">{option.email}</span>
                </div>
            </div>
        )}
    />
);
