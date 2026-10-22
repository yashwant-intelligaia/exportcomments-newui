"use client";

import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";

interface ShareModalPropsType {
    title: string | JSX.Element;
    children: JSX.Element | JSX.Element[];
    actionButtons: JSX.Element | JSX.Element[];
}

export const useStyles = makeStyles({
    option: {
        padding: 0,
    },
});
export const ModalWrapper = styled.div`
    width: 700px;
`;
export const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 640,
    maxWidth: "90%",
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

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;

    .marginR-10 {
        margin-right: 10px;
    }

    button {
        text-transform: none;
    }
`;

export const DivRow = styled.div`
padding - left: 0;
padding - top: 16px;
margin: 0;
`;

export const ShareModalDivWrapper = styled.div`
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
    margin: 20px 0 10px 0;
    .flextable-row {
        display: flex;
        align-items: center;
        justify-content: ;
        .inner-cell {
            display: flex;
            width: 100%;
            .input-wrapper {
                display: flex;
                width: 100%;
                align-items: center;
                flex-wrap: wrap;
                position: relative input {
                    height: 30px;
                    line-height: 1;
                }
                .email-done {
                    position: absolute;
                    right: 5px;
                    z-index: 9;
                    margin-top: 5px;
                    cursor: pointer;
                    color: #2979ff;
                    font-size: 1rem;
                }
            }
            .edit-email {
                font-size: 1rem;
                color: #2979ff;
                margin-left: 5px;
                cursor: pointer;
                position: relative;
                top: 2px;
            }
        }
        .flexlist-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            position: relative;
            width: 100%;
            label {
                margin-right: 0;
            }
        }

        &.product-owner {
            border-bottom: solid 1px #ccc;
            margin-bottom: 0.75rem;
        }
    }
`;

export const ModalTitle = styled.div`
    position: relative;
    padding-right: 16px;
    #parent-modal-title {
        font-size: 18px;
        color: #212121;
        margin: 0 0 10px 0;
    }
`;

export const UserAvtarInfo = styled.div`
    display: flex;
    align-items: center;

    .u-info {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        line-height: 20px;
        flex-grow: 1;

        span.u-name {
            width: 100%;
            font-weight: 500;
            font-size: 14px;
            color: #212121;
        }
        span.u-email {
            width: 100%;
            font-weight: 400;
            font-size: 12px;
            color: #616161;
        }
    }

    @media (max-width: 340px) {
        img {
            width: 30px;
            height: 30px;
        }
    }
`;

export const ShareModal = (props: ShareModalPropsType) => {
    const { title, children, actionButtons } = props;
    return (
        <ModalWrapper>
            <Modal
                open
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style} className="share-modal">
                    <ModalTitle>{title}</ModalTitle>
                    {children}
                    <ModalFooter>{actionButtons}</ModalFooter>
                </Box>
            </Modal>
        </ModalWrapper>
    );
};
