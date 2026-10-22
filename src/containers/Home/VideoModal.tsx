"use client";

import { X } from "lucide-react";

import { Modal } from "@/components/ui/Modal";

interface IMediaInfoType {
    src: string;
    controls: boolean;
}

interface IVideoModalType {
    isMenuOpen: boolean;
    title?: string;
    mediaInfo: IMediaInfoType;
    handleClose: (index: any) => void;
}

const VideoModal = ({ isMenuOpen, handleClose, title, mediaInfo: { src, controls } }: IVideoModalType) => (
    <Modal open={isMenuOpen} onClose={() => handleClose(false)} size="xl" className="max-w-[950px] overflow-y-auto p-0">
        <button
            type="button"
            aria-label="close"
            onClick={() => handleClose(false)}
            className="hover:bg-surface-sunk absolute top-5 right-5 z-10 rounded-full p-1.5"
        >
            <X className="size-5" />
        </button>
        {title && (
            <h2 id="modal-title" className="my-5 pr-[60px] text-center font-sans text-[28px] font-bold tracking-normal">
                {title}
            </h2>
        )}
        <div className="mb-[30px] flex w-full px-[30px] pt-[30px]">
            <video src={src} controls={controls} className="w-full" />
        </div>
    </Modal>
);

export default VideoModal;
