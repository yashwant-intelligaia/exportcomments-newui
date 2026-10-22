import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { useUserMutation } from "../../hooks";
import { EcModal } from "../../stories/components/EcModal/EcModal";
import { ActionButtonType } from "../../types";
import { EclogoIcon } from "../../utils";
import { ConsentPreview } from "../Common/ConsentPreview";

const StepsPanel = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        height: "auto",
        overflow: "scroll",
    },
}));

interface IConsentFormModal {
    onClose: () => void;
    open: boolean;
    showCloseIcon: boolean;
}

const ConsentFormModal = (props: IConsentFormModal) => {
    const { onClose, open } = props;
    const [isTermsCondition, setIsTermsCondition] = useState(false as boolean);
    const { acceptTermsOfUseAndPrivacyPolicy } = useUserMutation();
    const { mutate, isSuccess, isLoading } = acceptTermsOfUseAndPrivacyPolicy;

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const ModalContent = () => (
        <Box sx={{ my: 2 }}>
            <StepsPanel>
                <Grid item spacing={{ xs: 4, sm: 2, md: 1 }}>
                    <Box>
                        Protecting your privacy and ensuring your data security are our top
                        priorities. Review our Privacy Policy and Terms of Use to understand how we
                        handle your information and outline your rights and responsibilities while
                        using our website. Your trust and compliance are essential to us.
                    </Box>
                    <Box
                        mb={2}
                        mt={2}
                        flexDirection="column"
                        style={{
                            background: "rgba(249, 249, 250, 1)",
                            textAlign: "left",
                            borderRadius: "8px",
                            padding: "1rem 1rem 1rem 1rem",
                        }}
                    >
                        <Box
                            height="400px"
                            style={{
                                overflow: "hidden",
                                overflowY: "scroll",
                                textAlign: "left",
                                paddingRight: "0.25rem",
                            }}
                        >
                            <ConsentPreview />
                        </Box>
                    </Box>
                </Grid>
            </StepsPanel>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    borderTop: "2px solid LightGrey",
                    paddingTop: "0.25rem",
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        checked={isTermsCondition}
                        onChange={() => setIsTermsCondition(!isTermsCondition)}
                        control={<Checkbox />}
                        label={
                            <Box sx={{ display: "inline-flex" }}>
                                I agree that I have read the above info and I agree to &nbsp;
                                <Link target="_blank" href="/terms-of-use">
                                    Terms of Use
                                </Link>
                                &nbsp; and &nbsp;
                                <Link target="_blank" href="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </Box>
                        }
                    />
                </FormGroup>
            </Box>
        </Box>
    );
    const LetsStartActionButtons: ActionButtonType = {
        label: "Submit",
        onClick: () => mutate(),
        variant: "contained",
        disabled: !isTermsCondition || isLoading,
    };
    return (
        <EcModal
            size="md"
            open={open}
            onClose={onClose}
            title={
                <Typography
                    variant="h4"
                    sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "20px" }}
                    fontWeight="700"
                    mb={1.5}
                >
                    <EclogoIcon /> Export Comments privacy policy and terms of use
                </Typography>
            }
            actionButtons={LetsStartActionButtons}
            showCloseIcon={false}
        >
            <ModalContent />
        </EcModal>
    );
};

export { ConsentFormModal };
