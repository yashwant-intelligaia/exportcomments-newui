"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { APP_CONSTANT } from "../../../constants/AppConstant";
import { useCommonPost } from "../../../hooks/filesHook";
import { ICreateGitTicketSnackBarMessage } from "../../../types";
import { getLoadingImage, getLoadingMessage, snackbar } from "../../../utils";
import { Loader } from "../Loader/Loader";

export const CreateIssue = snackbar((props: ICreateGitTicketSnackBarMessage) => {
    const { row, projectId, handleAction: onHandleAction } = props;
    const [title, setTitle] = useState(row.message as string);

    const { mutate, data, isPending } = useCommonPost();
    const handleAction = (parameter: string) => () => {
        if (parameter === "submit-issue" && projectId) {
            mutate({
                body: { issueTitle: title, projectId, commentNumber: row.id },
                url: APP_CONSTANT.webApi.createTicket,
            });
        } else {
            onHandleAction(parameter, "");
        }
    };

    useEffect(() => {
        if (data) {
            onHandleAction("cancel-pop", "");
        }
    }, [data]);

    return (
        <Modal open size="md">
            <div className="relative pr-4">
                <h2 id="parent-modal-title" className="mb-2.5 font-sans text-lg font-semibold tracking-normal">
                    Create a git issue.
                </h2>
                <button
                    aria-label="close"
                    onClick={handleAction("cancel-pop")}
                    className="text-muted hover:text-ink absolute top-0 right-0 rounded-full p-1"
                >
                    <X className="size-5" />
                </button>
            </div>

            {isPending && <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />}
            <input
                type="search"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Issue Title"
                className="border-ink/60 bg-surface text-ink placeholder:text-muted focus:ring-ink h-11 w-full rounded-sm border px-3 text-sm focus:ring-2 focus:outline-none"
            />

            <div className="mt-3 flex justify-end gap-2.5">
                <Button variant="outlined" onClick={handleAction("cancel-pop")}>
                    Cancel
                </Button>
                <Button onClick={handleAction("submit-issue")}>Create</Button>
            </div>
        </Modal>
    );
});
