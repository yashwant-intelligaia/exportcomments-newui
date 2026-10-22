import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { APP_CONSTANT } from "../../../constants/AppConstant";
import { useCommonPost } from "../../../hooks/filesHook";
import { ICreateGitTicketSnackBarMessage } from "../../../types";
import { getLoadingImage, getLoadingMessage, snackbar } from "../../../utils";
import { Loader } from "../Loader/Loader";

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
`;

const CloseModal = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`;

const ModalFooter = styled.div`
    &.footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .marginR-10 {
            margin-right: 10px;
        }
    }
`;

const Input = styled.input`
    background-color: #f9f9f9;
    border-radius: 4px 4px 0 0;
    border: 0.125rem solid transparent;
    color: #9e9e9e;
    font-size: 0.875rem;
    font-weight: 400;
    height: 2.25rem;
    padding: 8px 10px;
    width: 100%;
    letter-spacing: 0.1px;
    box-shadow: 0 1px 0 #616161;
    transition: all 0.5s ease 0s;
    :hover,
    :focus {
        box-shadow: 0 1px 0 #2979ff;
    }
    ::placeholder {
        color: #9e9e9e;
        font-weight: 400;
        opacity: 1;
    }
`;

export const CreateIssue = snackbar((props: ICreateGitTicketSnackBarMessage) => {
    const { row, projectId, handleAction: onHandleAction } = props;
    const [title, setTitle] = useState(row.message as string);

    const { mutate, data, isLoading } = useCommonPost();
    const handleAction = (parameter: string) => () => {
        if (parameter === "submit-issue" && projectId) {
            mutate({
                body: {
                    issueTitle: title,
                    projectId,
                    commentNumber: row.id,
                },
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
    const changeValue = (name: string) => (e: any) => {
        if (name === "title") {
            setTitle(e.target.value);
        }
    };

    return (
        <Modal
            open
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 800 }}>
                <ModalTitle>
                    <h2 id="parent-modal-title"> Create a git issue.</h2>
                    <CloseModal onClick={handleAction("cancel-pop")}>
                        <CloseRoundedIcon />
                    </CloseModal>
                </ModalTitle>

                {isLoading && (
                    <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />
                )}
                <Input
                    className="form-control"
                    type="search"
                    value={title}
                    onChange={changeValue("title")}
                    placeholder="Enter Issue Title"
                />

                <ModalFooter className="footer">
                    <Button
                        className="marginR-10"
                        onClick={handleAction("cancel-pop")}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleAction("submit-issue")} variant="contained">
                        Create
                    </Button>
                </ModalFooter>
            </Box>
        </Modal>
    );
});
