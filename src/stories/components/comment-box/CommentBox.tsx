"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export const CommentBox = ({ onAction }: any) => {
    const [comment, setComment] = useState("");
    const handleAction = (parameter: string) => () => onAction(parameter, comment);

    return (
        <Modal open size="md">
            <div className="relative pr-4">
                <h2 id="parent-modal-title" className="font-sans text-lg font-semibold tracking-normal">
                    Reply
                </h2>
                <p className="mb-5 text-sm text-muted">Your reply will also be added in the Figma file.</p>
                <button aria-label="close" onClick={handleAction("cancel-pop")} className="absolute top-0 right-0 rounded-full p-1 text-muted hover:text-ink">
                    <X className="size-5" />
                </button>
            </div>

            <div className="relative">
                <label htmlFor="reply" className="absolute top-2.5 left-3 text-xs text-blue-ink">
                    Add your reply here
                </label>
                <textarea
                    id="reply"
                    rows={7}
                    placeholder="Reply here.."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="max-h-[145px] w-full resize-none rounded-sm border border-ink/60 bg-surface-sunk px-3 pt-7 pb-2 text-sm text-ink placeholder:text-muted focus:ring-2 focus:ring-ink focus:outline-none"
                />
            </div>

            <div className="mt-3 flex justify-end gap-2.5">
                <Button variant="outlined" onClick={handleAction("cancel-pop")}>
                    Close
                </Button>
                <Button onClick={handleAction("submit")}>Submit</Button>
            </div>
        </Modal>
    );
};
