import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { ActionButtonType } from "../../../types";

interface EcDialogPropsType {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
    actionButtons?: ActionButtonType[];
}

const EcDialog = (props: EcDialogPropsType) => {
    const { title, description, closeOnClickOutside, open, onClose, actionButtons } = props;
    return (
        <Dialog
            open={open}
            onClose={closeOnClickOutside ? onClose : undefined}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogContent>
            <DialogActions>
                {actionButtons &&
                    actionButtons.map(({ label, onClick, variant, size }) => (
                        <Button variant={variant} size={size} onClick={onClick}>
                            {label}
                        </Button>
                    ))}
            </DialogActions>
        </Dialog>
    );
};

EcDialog.defaultProps = {
    closeOnClickOutside: false,
    actionButtons: [],
};

export { EcDialog };
