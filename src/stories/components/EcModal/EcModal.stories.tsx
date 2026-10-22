/* eslint-disable no-alert */
import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ActionButtonType } from "../../../types";
import { CheckIcon } from "../../../utils";
import { EcImage } from "../EcImage/EcImage";
import { EcModal } from "./EcModal";

export default {
    title: "Atomic/EcModal",
    component: EcModal,
    argTypes: {} as any,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const StepsPanel = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        height: 300,
        overflow: "scroll",
    },
}));
const label = (
    <Box sx={{ display: "inline-flex" }}>
        I agree to <Link href="#">Terms &amp; Conditions</Link>
    </Box>
);

const ModalContent = () => (
    <Box sx={{ my: 2 }}>
        <StepsPanel>
            <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={12} sm={4} spacing={{ xs: 3 }}>
                    <Item elevation={0}>
                        <EcImage
                            sx={(theme: any) =>
                                ({
                                    [theme.breakpoints.down(360)]: {
                                        display: "none",
                                    },
                                } as any)
                            }
                        >
                            <img width="100%" src="./step1.svg" alt="" />
                        </EcImage>
                        <Typography align="center" variant="body2" component="p" mt={1}>
                            Create a workspace on Notion and name it “Export Comment Workspace”.
                        </Typography>
                        <Link href="#" aria-labelledby="See Demo">
                            See Demo
                        </Link>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} spacing={{ xs: 3 }}>
                    <Item elevation={0}>
                        <EcImage
                            sx={(theme: any) =>
                                ({
                                    [theme.breakpoints.down(360)]: {
                                        display: "none",
                                    },
                                } as any)
                            }
                        >
                            <img width="100%" src="./step2.svg" alt="" />
                        </EcImage>
                        <Typography align="center" variant="body2" component="p" mt={1}>
                            Create a page under this workspace and name it “Export Comment page”.
                        </Typography>
                        <Link href="#" aria-labelledby="See Demo">
                            See Demo
                        </Link>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} spacing={{ xs: 3 }}>
                    <Item elevation={0}>
                        <EcImage
                            sx={(theme: any) =>
                                ({
                                    [theme.breakpoints.down(360)]: {
                                        display: "none",
                                    },
                                } as any)
                            }
                        >
                            <img width="100%" src="./step3.svg" alt="" />
                        </EcImage>
                        <Typography align="center" variant="body2" component="p" mt={1}>
                            Now you can connect your “Export Comment” account with Notion.
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </StepsPanel>
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label={label} />
            </FormGroup>
        </Box>
    </Box>
);

/*
 * Example EcModal story with React Hooks.
 */

export const BasicModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actionButtons: ActionButtonType = {
        label: "Button",
        onClick: () => {
            alert("An Alert Message");
            handleClose();
        },
        variant: "contained",
    };

    return (
        <Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <EcModal
                open={open}
                onClose={handleClose}
                title={
                    <Typography variant="h4" fontWeight="700" mb={1.5}>
                        Title Placeholder for Modal
                    </Typography>
                }
                subtitle="A description placeholder for modal window. Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
                actionButtons={actionButtons}
            />
        </Box>
    );
};

export const SuccessModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actionButtons: ActionButtonType = {
        label: "Let's Start Working",
        onClick: () => {
            alert("Let's Start Working");
            handleClose();
        },
        variant: "contained",
    };

    return (
        <Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <EcModal
                icon={<CheckIcon sx={{ fontSize: 60, color: "#00ca5f" }} />}
                open={open}
                onClose={handleClose}
                title={
                    <Typography variant="h4" fontWeight="700" mb={1.5}>
                        Connected successfully with Notion
                    </Typography>
                }
                subtitle="Now your comments data can be effortlessly synced from the Export Comments Dashboard to Notion."
                actionButtons={actionButtons}
            />
        </Box>
    );
};

export const LetsStartModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actionButtons: ActionButtonType = {
        label: "Connect Now",
        onClick: () => {
            alert("Connect Now");
        },
        variant: "contained",
    };

    return (
        <Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <EcModal
                size="md"
                open={open}
                onClose={handleClose}
                title={
                    <Typography variant="h4" fontWeight="700" mb={1.5}>
                        Enjoy seamless integration with Notion
                    </Typography>
                }
                subtitle="Utilize our integration to view your Figma comments data on Notion"
                actionButtons={actionButtons}
            >
                <ModalContent />
            </EcModal>
        </Box>
    );
};

export const CopyAccessTokenModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [token, setToken] = useState("FHEmefO3DrXuNbXuNqhLkd/Export-Comment1");

    const actionButtons: ActionButtonType = {
        label: "Copy token",
        onClick: () => {
            alert("Connect Now");
        },
        variant: "contained",
        startIcon: <ContentCopyIcon />,
    };

    return (
        <Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <EcModal
                size="sm"
                open={open}
                onClose={handleClose}
                title={
                    <Typography variant="h4" fontWeight="700" mb={1.5}>
                        Copy new access token
                    </Typography>
                }
                subtitle="To connect securely to Figma, Export comments needs an API key with permission to access the files and resources."
                actionButtons={actionButtons}
            >
                <Box
                    sx={{
                        background: "#F1F3F7",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        margin: "20px 10px",
                    }}
                >
                    {token}
                </Box>
            </EcModal>
        </Box>
    );
};
