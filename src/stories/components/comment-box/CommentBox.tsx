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
                <p className="text-muted mb-5 text-sm">Your reply will also be added in the Figma file.</p>
                <button
                    aria-label="close"
                    onClick={handleAction("cancel-pop")}
                    className="text-muted hover:text-ink absolute top-0 right-0 rounded-full p-1"
                >
                    <X className="size-5" />
                </button>
            </div>

            <div className="relative">
                <label htmlFor="reply" className="text-blue-ink absolute top-2.5 left-3 text-xs">
                    Add your reply here
                </label>
                <textarea
                    id="reply"
                    rows={7}
                    placeholder="Reply here.."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border-ink/60 bg-surface-sunk text-ink placeholder:text-muted focus:ring-ink max-h-[145px] w-full resize-none rounded-sm border px-3 pt-7 pb-2 text-sm focus:ring-2 focus:outline-none"
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
