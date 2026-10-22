"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";
import { useHistory } from "@/utils/navigation";

import { ProjectDetailsContext } from "../../contexts";
import { useCommentMutation } from "../../hooks";
import { CommentFilterType } from "../../types";
import { uniqueKey, useDebounce } from "../../utils";

interface CommentFilterOptionType {
    id: CommentFilterType;
    name: string;
    record?: number;
}

export const CommentsFilter = () => {
    const history = useHistory();
    const [value, setValue] = useState("");
    const searchInputValue = useDebounce(value, 1000);
    const [openMobileInput, setOpenMobileInput] = useState(false);
    const [isMarkAsReadDisabled, setMarkAsReadDisabled] = useState<boolean>(true);
    const { projectId, projectData, setSearchInput, commentfilter, setCommentFilter, selectedBranch } =
        useContext(ProjectDetailsContext);
    const {
        markAsRead: { mutate: mutateMarkAsRead },
    } = useCommentMutation();

    useEffect(() => {
        setSearchInput(searchInputValue);
    }, [searchInputValue]);

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleCommentsMarkAsRead = () => {
        mutateMarkAsRead({ projectId, branchKey: selectedBranch?.key || "" });
    };

    const handleSelectFilterOption = (id: CommentFilterType) => {
        setCommentFilter(id);
        history.push(`/project/${projectId}/details?view=comments&filter=${id}`);
    };

    const filterOptions: CommentFilterOptionType[] = [
        {
            id: "all",
            name: "All Comments",
            record: projectData?.allComments,
        },
        {
            id: "resolved",
            name: "Resolved Comments",
            record: projectData?.resolvedComments,
        },
        {
            id: "unresolved",
            name: "Unresolved Comments",
            record: projectData?.unresolvedComments,
        },
        {
            id: "unread",
            name: "Unread Comments",
            record: projectData?.newComments,
        },
        // {
        //     id: "unread-replies",
        //     name: "Unread Replies",
        //     record: projectData?.newComments,
        // },
        {
            id: "my",
            name: "My Comments",
            record: projectData?.myComments,
        },
    ];

    useEffect(() => {
        if (projectData) {
            setMarkAsReadDisabled(projectData.newComments === 0);
        }
    }, [projectData]);

    const searchInput = (id: string, extraClass = "") => (
        <div className={`border-ink/60 focus-within:border-ink flex w-full items-center border-b ${extraClass}`}>
            <Search className="text-muted mr-2 size-5 shrink-0" />
            <input
                id={id}
                value={value}
                placeholder="Search"
                aria-label="Search comments"
                autoComplete="off"
                onChange={handleInputOnChange}
                className="text-ink placeholder:text-muted w-full bg-transparent py-1.5 text-sm focus:outline-none"
            />
        </div>
    );

    return (
        <>
            <div>
                <div className="mt-[15px] mb-[5px] flex max-w-full min-w-[55%] flex-wrap items-center justify-end gap-2 sm:my-0 xl:-mt-2.5">
                    {/* Search comments by comments category */}
                    <div className="flex items-center gap-2">
                        <span className="hidden text-sm sm:block">I want to view</span>
                        <div className="relative flex min-w-[180px] items-center">
                            <select
                                aria-label="Select Comments Filter"
                                value={commentfilter}
                                onChange={(e) => handleSelectFilterOption(e.target.value as CommentFilterType)}
                                className="text-blue-ink focus:ring-ink h-9 w-full appearance-none rounded-sm bg-transparent py-0 pr-8 pl-1.5 text-sm font-semibold focus:ring-2 focus:outline-none"
                            >
                                {filterOptions.map((item, index: number) => (
                                    <option key={uniqueKey(`filter-option-${index}`)} value={item.id}>
                                        {item.name} ({item.record})
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="text-blue-ink pointer-events-none absolute right-2 size-4" />
                        </div>
                    </div>
                    {/* TODO: fix alignment for desktop view */}
                    <div className="absolute right-6 flex items-center sm:static">
                        <Button variant="text" disabled={isMarkAsReadDisabled} onClick={handleCommentsMarkAsRead}>
                            Mark as Read
                        </Button>
                        <div className="block sm:hidden">
                            <IconButton
                                aria-label={openMobileInput ? "close search" : "open search"}
                                onClick={() => setOpenMobileInput(!openMobileInput)}
                            >
                                {openMobileInput ? <X className="size-5" /> : <Search className="size-5" />}
                            </IconButton>
                        </div>
                    </div>
                    {/* Separator */}
                    <span className="bg-muted mx-3 hidden h-[23px] w-px lg:inline-block" />
                    <div className="hidden w-full sm:block sm:w-80 md:w-[330px]">
                        {searchInput("input-with-icon-adornment")}
                    </div>
                </div>
            </div>
            {/* Search Box for Mobile Screens */}
            {openMobileInput && (
                <div className="block w-full sm:hidden">{searchInput("mobile-input-with-icon-adornment")}</div>
            )}
        </>
    );
};
