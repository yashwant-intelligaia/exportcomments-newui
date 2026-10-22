import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Popover, { PopoverOrigin } from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface EcPopoverPropsType {
    title: string;
    description: string;
    open: boolean;
    handleClose: () => void;
    anchorEl?: HTMLButtonElement;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    actionButtons?: ActionButtonType[];
}

const StyledButton = styled(Button)(`
    text-transform: none;
    justify-content: flex-start;
`);

const EcPopover = (props: EcPopoverPropsType) => {
    const {
        title,
        description,
        open,
        anchorEl,
        anchorOrigin,
        transformOrigin,
        actionButtons,
        handleClose,
    } = props;
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            <Box sx={{ p: 2, maxWidth: 296 }}>
                <Typography variant="subtitle1" fontWeight={500} sx={{ pb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="subtitle2" fontWeight={400} sx={{ pb: 1 }}>
                    {description}
                </Typography>
                {actionButtons && actionButtons.length > 0 && (
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                        sx={{ pt: 1 }}
                    >
                        {actionButtons.map(({ label, onClick, size, variant }, index) => (
                            <StyledButton
                                variant={variant}
                                size={size || "small"}
                                key={uniqueKey(index)}
                                onClick={onClick}
                            >
                                {label}
                            </StyledButton>
                        ))}
                    </Stack>
                )}
            </Box>
        </Popover>
    );
};

EcPopover.defaultProps = {
    anchorEl: undefined,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "right",
    },
    actionButtons: [],
};

export { EcPopover };
