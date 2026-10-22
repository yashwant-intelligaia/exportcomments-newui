"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Modal } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState } from "react";
import styled from "styled-components";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
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

const ModalTitle = styled.div`
    position: relative;
    padding-right: 16px;
    #parent-modal-title {
        font-size: 18px;
        color: #212121;
        margin: 0 0 10px 0;
    }
    p {
        font-size: 14px;
        color: #616161;
        margin: 0 0 20px 0;
    }
`;

const CloseModal = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`;

const TextareaWrap = styled.div`
    position: relative;
    color: #212121;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    .reply-textarea {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        border-radius: 0;
        border: 0;
        padding: 28px 10px 8px 10px;
        background-color: #f5f5f5;
        box-shadow: 0 2px 0 #2979ff;
        margin-bottom: 10px;
        max-height: 145px;
        resize: none;

        &::placeholder {
            font-size: 14px;
            color: #212121;
            font-family: "Roboto", sans-serif;
            font-weight: 400;
        }
    }
    .lable-text {
        font-size: 12px;
        font-weight: 400;
        color: #2979ff;
        position: absolute;
        top: 10px;
        left: 10px;
        letter-spacing: 0.5px;
    }
`;

const ModalFooter = styled.div`
    &.footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .marginR-10 {
            margin-right: 10px;
        }

        button {
            text-transform: none;
        }
    }
`;

export const CommentBox = (props: any) => {
    const { onAction } = props;
    const [comment, setComment] = useState("" as string);
    const handleAction = (parameter: string) => () => {
        onAction(parameter, comment);
    };
    const changeValue = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <Modal
            open
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 800, maxWidth: "90%" }}>
                <ModalTitle>
                    <h2 id="parent-modal-title">Reply</h2>
                    <p>Your reply will also be added in the Figma file.</p>
                    <CloseModal onClick={handleAction("cancel-pop")}>
                        <CloseRoundedIcon />
                    </CloseModal>
                </ModalTitle>

                <TextareaWrap>
                    <span className="lable-text">Add your reply here</span>
                    <TextareaAutosize
                        aria-label="minimum height"
                        className="reply-textarea"
                        minRows={7}
                        placeholder="Reply here.."
                        style={{ width: "100%" }}
                        value={comment}
                        onChange={changeValue}
                    />
                </TextareaWrap>

                <ModalFooter className="footer">
                    <Button
                        className="marginR-10"
                        onClick={handleAction("cancel-pop")}
                        variant="outlined"
                    >
                        Close
                    </Button>
                    <Button onClick={handleAction("submit")} variant="contained">
                        Submit
                    </Button>
                </ModalFooter>
            </Box>
        </Modal>
    );
};
