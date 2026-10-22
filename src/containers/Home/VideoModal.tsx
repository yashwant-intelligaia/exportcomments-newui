import { Close as CloseIcon } from "@mui/icons-material";
import { Box, CardMedia, IconButton, Modal, Typography } from "@mui/material";
import styled from "styled-components";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const VideoWrap = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    padding: 0 30px;

    img {
        width: 100%;
    }
`;

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

const VideoModal = (props: IVideoModalType) => {
    const {
        isMenuOpen,
        handleClose,
        title,
        mediaInfo: { src, controls },
    } = props;
    return (
        <Modal
            open={isMenuOpen}
            onClose={() => handleClose(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                "& > :not(MuiBackdrop-root)": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
            }}
        >
            <Box
                sx={{
                    ...style,
                    maxWidth: 950,
                    width: "100%",
                    overflowY: "auto",
                    padding: "0",
                    border: "0",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                        zIndex: "1",
                    }}
                    component="span"
                    onClick={() => handleClose(false)}
                >
                    <CloseIcon />
                </IconButton>
                {title && (
                    <Typography
                        variant="h5"
                        id="modal-title"
                        sx={{
                            textAlign: "center",
                            fontSize: "28px",
                            fontWeight: "700",
                            margin: "20px 0",
                            paddingRight: "60px",
                        }}
                    >
                        {title}
                    </Typography>
                )}
                <VideoWrap>
                    <CardMedia component="video" src={src} controls={controls} />
                </VideoWrap>
            </Box>
        </Modal>
    );
};

export default VideoModal;
